"use client";

import { ArrowUpRight } from "lucide-react";
import { SuggestionCard } from "./suggestion-card";
import suggestionsData from "@/data/suggestions.json";
import type { FriendSuggestion } from "@/lib/types/suggestion";

export function FriendSuggestionsSidebar() {
  return (
    <aside
      className="fixed inset-y-0 right-0 z-30 hidden h-screen w-[280px] shrink-0 flex-col gap-3 overflow-hidden border-l border-border-ash bg-white py-5 lg:flex xl:w-[300px] [@media_(max-height:900px)]:w-[260px] [@media_(max-height:900px)]:py-4"
      aria-label="Friend suggestions"
    >
      <div className="flex items-center justify-between px-4">
        <h2 className="text-base font-semibold text-header-blue">
          Friend Suggestions
        </h2>
        <button
          type="button"
          className="inline-flex items-center gap-1 text-[0.7rem] font-semibold text-main-green transition-colors hover:text-main-green/80"
        >
          <span>See All</span>
          <ArrowUpRight className="size-3" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-glassy px-4 py-2">
        <div className="flex flex-col gap-4">
          {(suggestionsData.suggestions as FriendSuggestion[]).map((suggestion, index) => (
            <SuggestionCard
              key={suggestion.id}
              suggestion={suggestion}
              index={index}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
