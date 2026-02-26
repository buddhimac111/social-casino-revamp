import MainLayout from "@/layouts/MainLayout";
import { ProfileBanner } from "@/app/profile/_components/profile-banner";
import { ProfileMainSection } from "@/app/profile/_components/profile-main-section";

export default function ProfilePage() {
  return (
    <MainLayout>
      <div className="space-y-6 md:space-y-8 lg:space-y-10">
        <ProfileBanner />
        <ProfileMainSection />
      </div>
    </MainLayout>
  );
}