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

export function SuggestionCard({ suggestion, index = 0 }: SuggestionCardProps) {
  const {
    displayName,
    handle,
    profileImageUrl,
    bannerImageUrl,
    loyaltyPoints,
    tierBadge,
    isOnline,
    recentGames,
    followedBy,
    followedByCount,
  } = suggestion;

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="rounded-2xl overflow-hidden bg-card border border-border-ash shadow-sm"
    >
      {/* Banner */}
      <div className="relative h-20 w-full overflow-hidden bg-header-blue/10">
        <Image
          src={bannerImageUrl}
          alt=""
          fill
          sizes="280px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />

        {/* Loyalty points badge - top right */}
        <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-accent-blue/95 px-2.5 py-1 text-[0.65rem] font-semibold text-header-blue backdrop-blur-sm">
          <Star className="size-3 fill-main-green text-main-green" />
          <span>{loyaltyPoints} Loyalty Points</span>
        </div>
      </div>

      {/* Profile row: avatar overlapping banner + name/handle */}
      <div className="relative px-3 pb-2">
        <div className="-mt-8 flex items-end gap-2">
          <div className="relative shrink-0">
            <div className="relative size-14 overflow-hidden rounded-full border-[3px] border-gold bg-card">
              <Image
                src={profileImageUrl}
                alt={displayName}
                width={56}
                height={56}
                className="object-cover"
              />
            </div>
            {/* Tier badge pill below avatar */}
            <div
              className={cn(
                "absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full px-2 py-0.5 text-[0.6rem] font-bold",
                tierBadge === "Gold" && "bg-gold text-header-blue",
                tierBadge === "Silver" && "bg-gray-400 text-white",
                tierBadge === "Bronze" && "bg-amber-700 text-white"
              )}
            >
              {tierBadge}
            </div>
            {/* Online indicator */}
            {isOnline && (
              <span
                className="absolute right-0 top-0 size-3 rounded-full border-2 border-card bg-main-green"
                aria-hidden
              />
            )}
          </div>
          <div className="min-w-0 flex-1 pb-0.5">
            <p className="truncate text-sm font-bold text-header-blue">
              {displayName}
            </p>
            <p className="truncate text-xs text-text-ash">{handle}</p>
          </div>
        </div>
      </div>

      {/* Recently Played Games */}
      <div className="px-3 pb-3">
        <p className="mb-2 text-[0.7rem] font-medium uppercase tracking-wide text-text-ash">
          Recently Played Games
        </p>
        <div className="flex gap-1.5">
          {recentGames.slice(0, 3).map((game) => (
            <motion.div
              key={game.id}
              className="relative aspect-3/4 min-w-0 flex-1 overflow-hidden rounded-xl bg-muted"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Image
                src={game.imageUrl}
                alt={game.name}
                fill
                sizes="80px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
              <p className="absolute bottom-1 left-1 right-1 truncate text-[0.6rem] font-medium text-white drop-shadow-md">
                {game.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 px-3 pb-3">
        <Button
          variant="default"
          size="sm"
          className="flex-1 h-8 bg-main-green text-white hover:bg-main-green/90"
        >
          Follow
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 shrink-0 border-border-ash p-0 text-main-green hover:bg-accent-blue hover:text-main-green"
          aria-label="Like"
        >
          <Heart className="size-4" />
        </Button>
      </div>

      {/* Followed By */}
      <div className="flex items-center gap-2 border-t border-border-ash px-3 py-2">
        <span className="text-xs font-medium text-text-ash">Followed By</span>
        <AvatarGroup className="ml-auto">
          {followedBy.slice(0, 4).map((f) => (
            <Avatar key={f.id} className="size-6 ring-2 ring-card">
              <AvatarImage src={f.imageUrl} alt={f.name} />
              <AvatarFallback className="text-[0.6rem] bg-accent-blue text-header-blue">
                {f.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          ))}
          {followedByCount > 0 && (
            <AvatarGroupCount className="size-6 text-[0.65rem] ring-2 ring-card bg-accent-blue/90 text-header-blue">
              {followedByCount}+
            </AvatarGroupCount>
          )}
        </AvatarGroup>
      </div>
    </motion.article>
  );
}
