"use client";

import Image from "next/image";
import { Star, Heart } from "lucide-react";
import { motion } from "motion/react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { FriendSuggestion } from "@/lib/types/suggestion";

interface SuggestionCardProps {
  suggestion: FriendSuggestion;
  index?: number;
}

const AVATAR_SIZE = 64;
const AVATAR_RING = 4;
const HERO_HEIGHT = 90;

export function SuggestionCard({ suggestion, index = 0 }: SuggestionCardProps) {
  const {
    displayName,
    handle,
    profileImageUrl,
    bannerImageUrl,
    loyaltyPoints,
    tierBadge,
    recentGames,
    followedBy,
    followedByCount,
  } = suggestion;

  const avatarTotalSize = AVATAR_SIZE + AVATAR_RING * 2;
  const avatarOverlapY = HERO_HEIGHT - avatarTotalSize / 2;

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="relative rounded-2xl overflow-hidden bg-card shadow-sm w-full max-w-[320px]"
    >
      {/* Hero Banner Section */}
      <div 
        className="relative w-full overflow-hidden bg-linear-to-br from-header-blue/20 to-accent-blue/10"
        style={{ height: `${HERO_HEIGHT}px` }}
      >
        {bannerImageUrl && (
          <Image
            src={bannerImageUrl}
            alt=""
            fill
            sizes="320px"
            className="object-cover"
          />
        )}

        {/* Loyalty Points Badge - Top Right */}
        <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-accent-blue px-2.5 py-1 text-[0.65rem] font-bold text-main-green backdrop-blur-sm shadow-sm">
          <Star className="size-3 fill-main-green text-main-green" />
          <span>{loyaltyPoints.toLocaleString()} Loyalty Points</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="bg-accent-blue border-t border-border-ash px-4 pb-4 pt-10">
        {/* Name and Handle - Centered below avatar */}
        <div className="flex flex-col items-center mb-3">
          <h3 className="text-base font-semibold text-header-blue">
            {displayName}
          </h3>
          <p className="text-xs font-medium text-text-ash">
            {handle}
          </p>
        </div>

        {/* Recently Played Games - Centered */}
        <p className="text-center text-xs font-medium text-text-ash mb-3">
          Recently Played Games
        </p>

        {/* Game Thumbnails - Larger Cards with Rounded Corners */}
        <div className="flex items-center justify-center gap-3 mb-4">
          {recentGames.length === 0 ? (
            <>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-center rounded-2xl border-2 border-dashed border-border-ash bg-muted/20"
                  style={{ width: '80px', height: '100px' }}
                />
              ))}
              <div className="absolute text-xs text-text-ash">None</div>
            </>
          ) : (
            <>
              {recentGames.slice(0, 3).map((game, idx, arr) => (
                <motion.div
                  key={game.id}
                  className="relative overflow-hidden rounded-md bg-muted shrink-0 shadow-sm"
                  style={{ width: '60px', height: '80px' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src={game.imageUrl}
                    alt={game.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                  {/* Show tint and "+N" badge on the last card if there are more games */}
                  {idx === arr.length - 1 && recentGames.length > arr.length && (
                    <>
                      {/* Dark tint overlay */}
                      <div className="absolute inset-0 bg-black/40" />
                      {/* "+N" badge */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex items-center justify-center rounded-full bg-white shadow-lg" style={{ width: '36px', height: '36px' }}>
                          <span className="text-base font-bold text-header-blue">
                            {recentGames.length - arr.length}+
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </>
          )}
        </div>

        {/* Follow Button and Heart */}
        <div className="flex items-center gap-2 mb-3">
          <Button
            variant="default"
            size="sm"
            className="flex-1 h-9 bg-main-green text-white font-semibold hover:bg-main-green/90"
          >
            Follow
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-9 w-9 shrink-0 border-main-green p-0 hover:bg-accent-blue"
            aria-label="Like"
          >
            <Heart className="size-4 text-main-green" />
          </Button>
        </div>

        {/* Followed By Section */}
        {followedByCount > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-text-ash">Followed By</span>
            <AvatarGroup className="ml-auto">
              {followedBy.slice(0, 4).map((f) => (
                <Avatar key={f.id} className="size-7 ring-2 ring-card">
                  <AvatarImage src={f.imageUrl} alt={f.name} />
                  <AvatarFallback className="text-[0.6rem] bg-accent-blue text-header-blue">
                    {f.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              ))}
              {followedByCount > 4 && (
                <AvatarGroupCount className="size-7 text-[0.65rem] ring-2 ring-card bg-accent-blue/90 text-header-blue">
                  +{followedByCount - 4}
                </AvatarGroupCount>
              )}
            </AvatarGroup>
          </div>
        )}
      </div>

      {/* Avatar - Absolutely Positioned Overlapping Banner - Centered */}
      <div
        className="absolute pointer-events-none z-10 left-1/2 -translate-x-1/2"
        style={{
          top: `${avatarOverlapY}px`,
        }}
      >
        <div className="rounded-full border-4 border-card bg-card shadow-md">
          <Avatar className="pointer-events-auto" style={{ width: `${AVATAR_SIZE}px`, height: `${AVATAR_SIZE}px` }}>
            <AvatarImage src={profileImageUrl} alt={displayName} />
            <AvatarFallback className="text-lg font-bold bg-accent-blue text-header-blue">
              {displayName.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </motion.article>
  );
}
