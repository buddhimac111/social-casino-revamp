import MainLayout from "@/layouts/MainLayout";
import InfiniteScrollFeed from "./_components/InfiniteScroll";
import { FriendSuggestionsSidebar } from "./_components/friend-suggestions-sidebar";

export default function Home() {
  return (
    <MainLayout>
      <div className="lg:mr-[270px] xl:mr-[270px] 2xl:mr-[300px]">
        <InfiniteScrollFeed />
      </div>
      <FriendSuggestionsSidebar />
    </MainLayout>
  );
}
