import Navbar from "@/components/Navbar/Navbar";
import { Separator } from "@/components/ui/separator";
import FeedAside from "@/components/FeedAside/FeedAside";
import GradientAccent from "@/components/ui/GradientAccent";
// import { useParams } from "react-router-dom";
import UserProfileCTA from "@/components/UserProfilePage/UserProfileCTA";
import UserProfileFeedSelector from "@/components/UserProfilePage/UserProfileFeedSelector";
import UserProfileBlogsContainer from "@/components/UserProfilePage/UserProfileBlogsContainer";

export default function UserProfilePage() {
  // const userId = useParams();
  return (
    <div className="w-full flex flex-col items-center h-svh">
      <GradientAccent />
      <Navbar />
      <div className="w-full flex justify-center">
        <div className="w-full flex justify-center xl:justify-end xl:mr-10 xl:max-w-4xl 2xl:max-w-5xl">
          <div className="w-11/12 mt-8 font-p1 flex flex-col gap-5 xl:px-6 max-w-2xl">
            <UserProfileCTA />
            <h1 className="hidden xl:flex text-3xl font-p2">Anish Aby</h1>
            <UserProfileFeedSelector />
            <Separator />
            <UserProfileBlogsContainer />
          </div>
        </div>
        <FeedAside isUserFeed={true} />
      </div>
    </div>
  );
}
