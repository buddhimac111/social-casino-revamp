import { ProfileAboutCard } from "@/app/profile/_components/profile-about-card";
import { ProfileLoyaltyCard } from "@/app/profile/_components/profile-loyalty-card";

export function ProfileMainSection() {
  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1.1fr)] lg:gap-7 xl:gap-8">
      <ProfileAboutCard />
      <ProfileLoyaltyCard />
    </section>
  );
}

