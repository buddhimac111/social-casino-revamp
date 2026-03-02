"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00";
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}

const BARS = 48;
const INNER_RADIUS = 46;

type AudioSpectrumProps = {
  audioSrc?: string;
  title?: string;
  subtitle?: string;
  className?: string;
};

const DEFAULT_AUDIO_SRC = "/media/intro.mp3";
const DEFAULT_TITLE = "";
const DEFAULT_SUBTITLE = "";

export function AudioSpectrum({
  audioSrc = DEFAULT_AUDIO_SRC,
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  className,
}: AudioSpectrumProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const rafRef = useRef<number | null>(null);
  const barsRef = useRef<number[]>(new Array(BARS).fill(0.2));
  const animateBarsRef = useRef<(() => void) | null>(null);

  const [bars, setBars] = useState<number[]>(() => new Array(BARS).fill(0.2));
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);

  const setupAnalyser = useCallback(() => {
    if (analyserRef.current || !audioRef.current) return;

    const AudioCtx =
      window.AudioContext ||
      // @ts-expect-error webkit fallback
      window.webkitAudioContext;
    const ctx = new AudioCtx();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    const source = ctx.createMediaElementSource(audioRef.current);
    source.connect(analyser);
    analyser.connect(ctx.destination);

    const bufferLength = analyser.frequencyBinCount;
    dataArrayRef.current = new Uint8Array(bufferLength) as unknown as Uint8Array;

    audioContextRef.current = ctx;
    analyserRef.current = analyser;
  }, []);

  useEffect(() => {
    barsRef.current = bars;
  }, [bars]);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      audioContextRef.current?.close();
    };
  }, []);

  const animateBars = useCallback(() => {
    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;
    if (!analyser || !dataArray) return;

    analyser.getByteFrequencyData(
      dataArray as unknown as Uint8Array<ArrayBuffer>,
    );

    const slice = Math.floor(dataArray.length / BARS);
    const nextBars = new Array(BARS);

    for (let i = 0; i < BARS; i++) {
      let sum = 0;
      let count = 0;
      const start = i * slice;
      const end = Math.min(start + slice, dataArray.length);
      for (let j = start; j < end; j++) {
        sum += dataArray[j];
        count++;
      }
      const avg = count > 0 ? sum / count : 0;
      nextBars[i] = Math.max(0.15, Math.min(1, avg / 255));
    }

    barsRef.current = nextBars;
    setBars(nextBars);
    rafRef.current = requestAnimationFrame(() => {
      if (animateBarsRef.current) {
        animateBarsRef.current();
      }
    });
  }, []);

  useEffect(() => {
    animateBarsRef.current = animateBars;
  }, [animateBars]);

  const startVisualizer = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    rafRef.current = requestAnimationFrame(() => {
      if (animateBarsRef.current) {
        animateBarsRef.current();
      }
    });
  }, []);

  const startDecay = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    const base = 0.2;

    const decayStep = () => {
      const current = barsRef.current;
      let done = true;
      const next = current.map((value) => {
        const blended = value + (base - value) * 0.25;
        if (Math.abs(blended - base) > 0.01) {
          done = false;
        }
        return blended;
      });

      barsRef.current = next;
      setBars(next);

      if (!done) {
        rafRef.current = requestAnimationFrame(decayStep);
      } else {
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(decayStep);
  }, []);

  const handleTogglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audioContextRef.current) {
      setupAnalyser();
    }

    if (audioContextRef.current?.state === "suspended") {
      await audioContextRef.current.resume();
    }

    if (audio.paused) {
      await audio.play();
      setIsPlaying(true);
      startVisualizer();
    } else {
      audio.pause();
      setIsPlaying(false);
      startDecay();
    }
  }, [setupAnalyser, startDecay, startVisualizer]);

  const progress = duration > 0 ? Math.min(currentTime / duration, 1) : 0;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 text-center text-xs text-text-ash md:text-sm lg:text-[15px]",
        className,
      )}
    >
      <div className="relative w-40 md:w-44 lg:w-48">
        <svg
          viewBox="-100 -100 180 180"
          className="h-full w-full"
          aria-hidden="true"
        >
          {bars.map((value, index) => {
            const angle = (index / BARS) * Math.PI * 2 - Math.PI / 2;
            const barLength = INNER_RADIUS + value * 24;
            const x1 = Math.cos(angle) * INNER_RADIUS;
            const y1 = Math.sin(angle) * INNER_RADIUS;
            const x2 = Math.cos(angle) * barLength;
            const y2 = Math.sin(angle) * barLength;

            const hue = 140 + (index / BARS) * 160;
            const color = `hsl(${hue}, 80%, 55%)`;

            return (
              <line
                key={index}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={color}
                strokeWidth={4}
                strokeLinecap="round"
              />
            );
          })}
          <g onClick={handleTogglePlay} className="cursor-pointer">
            <circle
              cx={0}
              cy={0}
              r={32}
              fill="white"
              className="drop-shadow-sm"
            />
            {isPlaying ? (
              <>
                <rect x={-8} y={-14} width={5} height={28} fill="#05A37E" rx={2} />
                <rect x={3} y={-14} width={5} height={28} fill="#05A37E" rx={2} />
              </>
            ) : (
              <polygon
                points="-6,-14 10,0 -6,14"
                fill="#05A37E"
              />
            )}
          </g>
        </svg>
      </div>

      {(title || subtitle) && (
        <div className="space-y-1">
          {title && (
            <p className="text-md font-semibold uppercase tracking-[0.25em] text-main-green md:text-lg">
              {title}
            </p>
          )}
          {subtitle && (
            <p className="text-xs text-text-ash md:text-sm">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className="w-full max-w-xs space-y-1.5">
        <div
          className="relative h-2 w-full overflow-hidden rounded-full bg-[#E2EBF5] cursor-pointer"
          onClick={(event) => {
            const audio = audioRef.current;
            if (!audio || !duration || !Number.isFinite(duration)) return;

            const rect = (event.currentTarget as HTMLDivElement).getBoundingClientRect();
            const clickX = event.clientX - rect.left;
            const ratio = Math.min(Math.max(clickX / rect.width, 0), 1);

            const newTime = ratio * duration;
            audio.currentTime = newTime;
            setCurrentTime(newTime);
          }}
        >
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-main-green transition-[width] duration-150"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[11px] text-text-ash/80 md:text-xs">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={audioSrc}
        onLoadedMetadata={(event) => {
          const audio = event.currentTarget;
          if (audio.duration && Number.isFinite(audio.duration)) {
            setDuration(audio.duration);
          }
        }}
        onTimeUpdate={(event) => {
          setCurrentTime(event.currentTarget.currentTime || 0);
        }}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
          startDecay();
        }}
        className="hidden"
      />
    </div>
  );
}