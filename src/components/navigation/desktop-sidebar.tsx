"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Search, LogOut } from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { desktopNavItems, isRouteActive } from "@/components/navigation/layout-shell";

type DesktopSidebarProps = {
  className?: string;
};

export function DesktopSidebar({ className }: DesktopSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <aside
      className={cn(
        "hidden h-screen w-[320px] shrink-0 flex-col overflow-y-auto border-r border-border-ash bg-white px-6 py-8 md:flex scrollbar-glassy [@media_(max-height:900px)]:w-[304px] [@media_(max-height:900px)]:px-5 [@media_(max-height:900px)]:py-4.5",
        className,
      )}
    >
      <Link
        href="/"
        className="mb-8 flex items-center justify-center gap-2.5 text-center [@media_(max-height:900px)]:mb-5"
      >
        <Image
          src="/logos/logo_,main.png"
          alt="747 Social logo"
          width={42}
          height={42}
          priority
        />
        <span className="text-3xl font-semibold tracking-tight text-main-green [@media_(max-height:900px)]:text-[1.375rem]">
          747 SOCIAL
        </span>
      </Link>

      <div className="relative mb-10 [@media_(max-height:900px)]:mb-6">
        <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-text-ash-light [@media_(max-height:900px)]:size-4" />
        <Input
          placeholder="Search"
          className="h-12 rounded-full border-border-ash bg-background pl-11 text-base text-text-ash placeholder:text-text-ash-light [@media_(max-height:900px)]:h-10 [@media_(max-height:900px)]:pl-10 [@media_(max-height:900px)]:text-[0.9rem]"
        />
      </div>

      <nav aria-label="Sidebar" className="space-y-1">
        {desktopNavItems.map((item) => {
          const active = isRouteActive(pathname, item.href);
          const Icon = item.icon;

          return (
            <motion.div key={item.id} whileHover={{ x: 2 }} transition={{ duration: 0.16 }}>
              <Link
                href={item.href}
                className={cn(
                  "flex h-12 items-center gap-3 rounded-2xl px-4 text-xl font-semibold text-header-blue transition-colors [@media_(max-height:900px)]:h-10 [@media_(max-height:900px)]:gap-2.5 [@media_(max-height:900px)]:rounded-xl [@media_(max-height:900px)]:px-3.5 [@media_(max-height:900px)]:text-base",
                  active && "bg-accent-blue",
                )}
              >
                <Icon
                  className={cn(
                    "size-5 [@media_(max-height:900px)]:size-4",
                    active ? "text-main-green" : "text-text-ash",
                  )}
                />
                <span className="truncate text-header-blue">{item.label}</span>
                {item.badge ? (
                  <Badge className="ml-auto h-7 rounded-full bg-main-green px-3 text-sm text-background [@media_(max-height:900px)]:h-6 [@media_(max-height:900px)]:px-2.5 [@media_(max-height:900px)]:text-[0.72rem]">
                    {item.badge}
                  </Badge>
                ) : null}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <div className="mt-10 space-y-5 [@media_(max-height:900px)]:mt-6 [@media_(max-height:900px)]:space-y-3.5">
        <div className="rounded-3xl bg-accent-blue p-5 [@media_(max-height:900px)]:rounded-2xl [@media_(max-height:900px)]:p-4">
          <div className="mb-3 flex items-center gap-3 [@media_(max-height:900px)]:mb-2.5 [@media_(max-height:900px)]:gap-2.5">
            <div className="grid size-11 place-items-center rounded-full bg-main-green/15 text-main-green [@media_(max-height:900px)]:size-8 [@media_(max-height:900px)]:text-xs">
              20%
            </div>
            <p className="text-sm font-semibold leading-5 text-text-ash [@media_(max-height:900px)]:text-[0.9rem] [@media_(max-height:900px)]:leading-5">
              Complete your profile to obtain <span className="text-main-green">social credits</span>.
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-accent-blue p-5 [@media_(max-height:900px)]:rounded-2xl [@media_(max-height:900px)]:p-4">
          <p className="mb-4 text-sm font-semibold leading-5 text-text-ash [@media_(max-height:900px)]:mb-2.5 [@media_(max-height:900px)]:text-[0.9rem] [@media_(max-height:900px)]:leading-5">
            Get points prices when the timer hits 0.
          </p>
          <button
            type="button"
            className="h-10 w-full rounded-xl border border-main-green text-base font-semibold text-main-green transition-colors hover:bg-main-green hover:text-background [@media_(max-height:900px)]:h-9 [@media_(max-height:900px)]:rounded-lg [@media_(max-height:900px)]:text-sm"
          >
            Claim Points
          </button>
        </div>
      </div>

      <div className="mt-auto pt-6 [@media_(max-height:900px)]:pt-4">
        <Separator className="mb-4 bg-border-ash [@media_(max-height:900px)]:mb-3" />
        <div className="flex items-center gap-3 rounded-2xl px-1 py-2 [@media_(max-height:900px)]:gap-2.5 [@media_(max-height:900px)]:py-1.5">
          <Avatar className="size-11 border border-border-ash [@media_(max-height:900px)]:size-9 cursor-pointer" onClick={() => {
            router.push("/profile");
          }}>
            <AvatarFallback className="bg-main-green/15 font-semibold text-main-green">
              ID
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 cursor-pointer" onClick={() => {
            router.push("/profile");
          }}>
            <p className="truncate text-base font-bold text-header-blue [@media_(max-height:900px)]:text-sm">
              Iddhi Dassanayake
            </p>
            <p className="truncate text-sm text-text-ash [@media_(max-height:900px)]:text-[0.9rem]">
              @iddhikumara.social
            </p>
          </div>
          <div className="ml-auto cursor-pointer">
            <LogOut className="size-5 text-main-green hover:text-red" />
          </div>
        </div>
      </div>
    </aside>
  );
}

export default DesktopSidebar;
