import FeedSelector from "../components/FeedSelector/FeedSelector";
import BlogsContainer from "../components/BlogsContainer/BlogsContainer";
import Navbar from "../components/Navbar/Navbar";
import GradientAccent from "@/components/ui/GradientAccent";
import BottomMenu from "@/components/BottomMenu/BottomMenu";
import FeedAside from "@/components/FeedAside/FeedAside";
import { useState } from "react";

export default function App() {
  const [currentFeed, setCurrentFeed] = useState("featured");

  console.log(`🅡🅔🅝🅓🅔🅡.🅘🅞`);

  return (
    <div className="w-full min-h-screen font-primary flex flex-col items-center mb-24">
      <GradientAccent />
      <Navbar />
      <div className="flex w-full justify-center">
        <div className="w-full flex justify-center xl:justify-end xl:mr-10 xl:max-w-4xl 2xl:max-w-5xl">
          <div className="max-w-2xl px-6 w-full">
            <FeedSelector
              currentFeed={currentFeed}
              setCurrentFeed={setCurrentFeed}
            />
            <BlogsContainer />
          </div>
        </div>
        <FeedAside />
      </div>
      <BottomMenu />
    </div>
  );
}
