 "use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

export function ProfileRecentGamesSidebar() {
  // For now we use the same sample image for all game cards.
  const games = Array.from({ length: 20 }).map((_, index) => ({
    id: index,
    name: "Sample Game",
  }));

  return (
    <aside
      className="fixed inset-y-0 right-0 z-30 hidden h-screen w-[280px] shrink-0 flex-col gap-3 overflow-hidden border-l border-border-ash bg-white py-5 lg:flex xl:w-[300px] [@media_(max-height:900px)]:w-[260px] [@media_(max-height:900px)]:py-4"
      aria-label="Recent games"
    >
      <div className="flex items-center justify-between px-4">
        <h2 className="text-base font-semibold text-header-blue">My Recent Games</h2>
        <button
          type="button"
          className="inline-flex items-center gap-1 text-[0.7rem] font-semibold text-main-green transition-colors hover:text-main-green/80"
        >
          <span>See All</span>
          <ArrowUpRight className="size-3" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-2">
        <div className="grid grid-cols-2 gap-3">
          {games.map((game) => (
            <motion.div
              key={game.id}
              className="relative aspect-11/14 overflow-hidden rounded-2xl bg-card shadow-sm"
              whileHover={{ y: -4, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, mass: 0.6 }}
            >
              <Image
                src="/media/sample_game.png"
                alt={game.name}
                fill
                sizes="(min-width: 1024px) 160px, 50vw"
                className="object-cover"
                priority={game.id < 2}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </aside>
  );
}

