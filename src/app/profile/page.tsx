import MainLayout from "@/layouts/MainLayout";
import { ProfileBanner } from "@/app/profile/_components/profile-banner";
import { ProfileMainSection } from "@/app/profile/_components/profile-main-section";
import { ProfileRecentGamesSidebar } from "@/app/profile/_components/profile-recent-games-sidebar";

export default function ProfilePage() {
  return (
    <MainLayout>
      <div className="lg:mr-[270px] xl:mr-[270px] 2xl:mr-[300px]">
        <div className="space-y-6 md:space-y-8 lg:space-y-10">
          <ProfileBanner />
          <ProfileMainSection />
        </div>
      </div>
      <ProfileRecentGamesSidebar />
    </MainLayout>
  );
}