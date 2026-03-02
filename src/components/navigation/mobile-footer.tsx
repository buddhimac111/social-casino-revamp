"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { isRouteActive, mobileNavItems } from "@/components/navigation/layout-shell";

export function MobileFooter() {
  const pathname = usePathname();

  return (
    <footer className="fixed inset-x-0 bottom-0 z-50 border-t border-border-ash bg-white backdrop-blur lg:hidden">
      <nav
        className="mx-auto flex h-14 w-full items-stretch justify-between px-2"
        aria-label="Mobile bottom navigation"
      >
        {mobileNavItems.map((item) => {
          const active = isRouteActive(pathname, item.href);
          const Icon = item.icon;
          const isCenterAction = item.id === "create-post";

          return (
            <Link
              key={item.id}
              href={item.href}
              aria-label={item.label}
              className={cn(
                "relative flex h-full w-12 items-center justify-center text-text-ash transition-colors",
                active && "text-main-green",
                isCenterAction && "w-14",
              )}
            >
              {active ? (
                <motion.span
                  layoutId="mobile-active-top-bar"
                  className="absolute top-0 h-1 w-6 rounded-full bg-main-green"
                  transition={{ type: "spring", stiffness: 520, damping: 38 }}
                />
              ) : null}

              {isCenterAction ? (
                <motion.div
                  whileTap={{ scale: 0.92 }}
                  className={cn(
                    "grid size-10 place-items-center rounded-full border border-border-ash bg-background",
                    active && "border-main-green/30",
                  )}
                >
                  <Icon className="size-5" />
                </motion.div>
              ) : (
                <motion.div whileTap={{ scale: 0.92 }}>
                  <Icon className="size-6" />
                </motion.div>
              )}
            </Link>
          );
        })}

        <Link
          href="/profile"
          aria-label="Profile"
          className={cn(
            "relative flex h-full w-12 items-center justify-center text-text-ash transition-colors",
            isRouteActive(pathname, "/profile") && "text-main-green",
          )}
        >
          {isRouteActive(pathname, "/profile") ? (
            <motion.span
              layoutId="mobile-active-top-bar"
              className="absolute top-0 h-1 w-6 rounded-full bg-main-green"
              transition={{ type: "spring", stiffness: 520, damping: 38 }}
            />
          ) : null}
          <motion.div whileTap={{ scale: 0.92 }}>
            <Avatar className="size-8 border border-border-ash">
              <AvatarFallback className="bg-main-green/15 text-xs font-semibold text-main-green">
                ID
              </AvatarFallback>
            </Avatar>
          </motion.div>
        </Link>
      </nav>
    </footer>
  );
}

export default MobileFooter;
