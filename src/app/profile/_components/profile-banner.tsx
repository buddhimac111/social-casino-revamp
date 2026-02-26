 "use client";

import { useEffect, useState } from "react";
import { ProfileBannerDesktop } from "./profile-banner-desktop";
import { ProfileBannerMobile } from "./profile-banner-mobile";

export function ProfileBanner() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 768px)");

    const update = () => {
      setIsDesktop(mq.matches);
    };

    update();
    mq.addEventListener("change", update);

    return () => {
      mq.removeEventListener("change", update);
    };
  }, []);

  // Fallback to mobile layout until we know the screen size on client.
  if (isDesktop === null) {
    return <ProfileBannerMobile />;
  }

  return isDesktop ? <ProfileBannerDesktop /> : <ProfileBannerMobile />;
}
