"use client";

import { useState, useRef, useEffect } from "react";

interface SeeMoreProps {
  username: string;
  text: string;
}

export const SeeMore = ({ username, text }: SeeMoreProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current) {
        const lineHeight = parseInt(
          getComputedStyle(textRef.current).lineHeight,
        );
        const height = textRef.current.scrollHeight;
        setIsOverflowing(height > lineHeight * 2);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [text]);

  return (
    <div>
      <p
        ref={textRef}
        className={`text-sm font-light text-foreground ${!isExpanded ? "line-clamp-2" : ""}`}
      >
        {text}
      </p>
      {isOverflowing && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs font-normal text-text-ash-light mt-1 hover:text-text-ash transition-colors"
        >
          {isExpanded ? "See less" : "See more"}
        </button>
      )}
    </div>
  );
};
