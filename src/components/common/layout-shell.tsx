"use client";

import type { LucideIcon } from "lucide-react";
import {
  Bell,
  CirclePlus,
  Flame,
  Grid2X2,
  House,
  MessageCircleMore,
} from "lucide-react";

export type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
};

export const desktopNavItems: NavItem[] = [
  { id: "home", label: "Home", href: "/", icon: House, badge: 10 },
  { id: "create-post", label: "Create Post", href: "/create-post", icon: CirclePlus },
  {
    id: "notifications",
    label: "Notifications",
    href: "/notifications",
    icon: Bell,
    badge: 96,
  },
  {
    id: "messages",
    label: "Messages",
    href: "/messages",
    icon: MessageCircleMore,
    badge: 2,
  },
  { id: "games", label: "Games", href: "/games", icon: Flame },
  { id: "mini-apps", label: "Mini Apps", href: "/miniapp", icon: Grid2X2 },
];

export const mobileNavItems: NavItem[] = [
  { id: "home", label: "Home", href: "/", icon: House },
  { id: "games", label: "Games", href: "/games", icon: Flame },
  { id: "create-post", label: "Create Post", href: "/create-post", icon: CirclePlus },
  { id: "mini-apps", label: "Mini Apps", href: "/miniapp", icon: Grid2X2 },
];

export function isRouteActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
