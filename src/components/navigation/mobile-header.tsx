"use client";

import Link from "next/link";
import Image from "next/image";
import type { ComponentType } from "react";
import { Bell, MessageCircleMore, Search } from "lucide-react";

import { cn } from "@/lib/utils";

type HeaderAction = {
  id: string;
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  showDot?: boolean;
};

const headerActions: HeaderAction[] = [
  {
    id: "messages",
    label: "Messages",
    href: "/messages",
    icon: MessageCircleMore,
    showDot: true,
  },
  {
    id: "notifications",
    label: "Notifications",
    href: "/notifications",
    icon: Bell,
    showDot: true,
  },
  {
    id: "search",
    label: "Search",
    href: "/search",
    icon: Search,
  },
];

export function MobileHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border-ash bg-white backdrop-blur md:hidden">
      <div className="mx-auto flex h-14 w-full items-center justify-between px-3">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logos/logo_,main.png" alt="747 Social logo" width={28} height={28} priority />
          <span className="text-sm font-extrabold tracking-tight text-main-green">747 SOCIAL</span>
        </Link>

        <div className="flex items-center gap-2">
          {headerActions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.id}
                href={action.href}
                aria-label={action.label}
                className={cn(
                  "relative grid size-9 place-items-center rounded-full border border-border-ash bg-background text-text-ash transition-colors hover:text-main-green",
                )}
              >
                <Icon className="size-4" />
                {action.showDot ? (
                  <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-red" />
                ) : null}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}

export default MobileHeader;
