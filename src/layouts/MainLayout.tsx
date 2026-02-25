"use client";

import React from "react";
import DesktopSidebar from "@/components/navigation/desktop-sidebar";
import MobileFooter from "@/components/navigation/mobile-footer";
import MobileHeader from "@/components/navigation/mobile-header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <DesktopSidebar className="fixed inset-y-0 left-0 z-40" />
      <MobileHeader />
      <MobileFooter />

      <main className="min-h-screen px-4 pb-16 pt-16 md:ml-[320px] md:px-8 md:pt-8 md:pb-8">
        {children}
      </main>
    </div>
  );
}
