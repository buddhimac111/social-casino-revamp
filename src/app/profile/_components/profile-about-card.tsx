import { FaFacebook, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import Image from "next/image";
import { AudioSpectrum } from "@/components/common/AudioSpectrum";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { EllipsisVertical } from "lucide-react";

export function ProfileAboutCard() {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-border-ash bg-white p-5 shadow-sm md:p-0">
      <div className="flex items-start justify-between gap-3 px-2 md:px-7 py-2 md:pt-5 md:pb-3">
        <h2 className="text-md font-semibold text-header-blue md:text-xl">
          About Me
        </h2>
        <button
          type="button"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-text-ash md:text-icon-ash hover:bg-accent-blue/60"
          aria-label="More options"
        >
          <EllipsisVertical className="size-4 md:size-6" aria-hidden="true" />
        </button>
      </div>

      <div className="h-px bg-border-ash" />

      <div className="mt-5 flex flex-1 min-h-0 flex-col px-2 md:px-7 pb-5 md:pb-7">
        <Tabs
          defaultValue="text"
          className="flex flex-1 flex-col gap-4"
        >
          <TabsList className="rounded-full bg-accent-blue/80 text-xs font-semibold text-text-ash md:text-sm w-full">
            <div className="grid grid-cols-4 gap-1 w-full">
              <TabsTrigger
                value="text"
                className="rounded-full px-3 py-2 text-[11px] md:text-xs lg:text-sm data-[state=active]:bg-main-green data-[state=active]:text-white data-[state=active]:shadow-sm text-text-ash hover:bg-accent-blue"
              >
                Text
              </TabsTrigger>
              <TabsTrigger
                value="photo"
                className="rounded-full px-3 py-2 text-[11px] md:text-xs lg:text-sm data-[state=active]:bg-main-green data-[state=active]:text-white data-[state=active]:shadow-sm text-text-ash hover:bg-accent-blue"
              >
                Photo
              </TabsTrigger>
              <TabsTrigger
                value="video"
                className="rounded-full px-3 py-2 text-[11px] md:text-xs lg:text-sm data-[state=active]:bg-main-green data-[state=active]:text-white data-[state=active]:shadow-sm text-text-ash hover:bg-accent-blue"
              >
                Video
              </TabsTrigger>
              <TabsTrigger
                value="voice"
                className="rounded-full px-3 py-2 text-[11px] md:text-xs lg:text-sm data-[state=active]:bg-main-green data-[state=active]:text-white data-[state=active]:shadow-sm text-text-ash hover:bg-accent-blue"
              >
                Voice
              </TabsTrigger>
            </div>
          </TabsList>

          <TabsContent value="text" className="flex-1">
            <div className="mt-3 h-40 md:h-48 lg:h-60 rounded-3xl border border-border-ash bg-accent-blue/40 p-4 text-xs text-text-ash md:p-5 md:text-sm lg:text-[15px] overflow-y-auto scrollbar-glassy">
              <p className="leading-relaxed">
                Hi there! 👋 I&apos;m Iddhi Dassanayake, an AI enthusiast. When
                I&apos;m not crunching numbers or optimizing algorithms, you can
                find me staring at the sky. Lorem ipsum dolor sit amet
                consectetur adipiscing, elit mattis porta hendrerit eget
                parturient fusce, egestas netus habitasse iaculis aliquam.
                Natoque nostra laoreet aptent ornare nisi cubilia condimentum
                integer sem elit mattis porta hendrerit eget parturient fusce,
                egestas netus habitasse iaculis aliquam. Natoque nostra laoreet.
              </p>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <SocialPill label="@iddhidassanayake" platform="facebook" />
              <SocialPill label="@iddhidassanayake" platform="telegram" />
              <SocialPill label="@iddhidassanayake" platform="instagram" />
              <SocialPill label="@iddhidassanayake" platform="whatsapp" />
            </div>
          </TabsContent>

          <TabsContent value="photo" className="flex-1">
            <AspectRatio ratio={1} className="overflow-hidden rounded-2xl">
              <Image
                src="/media/image_intro.png"
                alt="Iddhi intro"
                fill
                priority
              />
            </AspectRatio>
          </TabsContent>

          <TabsContent value="video" className="flex-1">
            <AspectRatio ratio={1} className="overflow-hidden rounded-2xl">
              <video
                className="h-full w-full object-cover"
                src="/media/intro_vid.mp4"
                controls
                playsInline
                preload="metadata"
              />
            </AspectRatio>
          </TabsContent>

          <TabsContent value="voice" className="flex-1">

            <AudioSpectrum
              audioSrc="/media/intro_voice_2.mp3"
              title="Who Am I"
              subtitle="Know More About Iddhi Dasanayake"
            />

          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

type SocialPillProps = {
  label: string;
  platform: "facebook" | "telegram" | "instagram" | "whatsapp";
};

const socialPillIcons = {
  facebook: FaFacebook,
  telegram: FaTelegramPlane,
  instagram: FaInstagram,
  whatsapp: FaWhatsapp,
} as const;

function SocialPillIcon({ platform }: { platform: SocialPillProps["platform"] }) {
  const Icon = socialPillIcons[platform];
  return <Icon className="size-4 shrink-0 text-white" aria-hidden />;
}

function SocialPill({ label, platform }: SocialPillProps) {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-2.5 rounded-full bg-accent-blue px-3 py-2.5 text-sm font-medium text-text-ash shadow-sm md:px-4"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-main-green text-white">
        <SocialPillIcon platform={platform} />
      </span>
      <span className="truncate">{label}</span>
    </button>
  );
}

