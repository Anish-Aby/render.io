import React from "react";
import BottomMenu from "../BottomMenu/BottomMenu";
import FeedAside from "../FeedAside/FeedAside";
import Navbar from "../Navbar/Navbar";
import GradientAccent from "../ui/GradientAccent";

type MainPageLayoutProps = {
  children: React.ReactNode;
};

export default function MainPageLayout({ children }: MainPageLayoutProps) {
  return (
    <div className="w-full min-h-screen font-primary flex flex-col items-center">
      <GradientAccent />
      <Navbar />
      <div className="flex w-full justify-center lg:justify-end xl:justify-center">
        <div className="w-full lg:w-fit flex justify-center xl:justify-end xl:w-full xl:mr-10 xl:max-w-4xl 2xl:max-w-5xl">
          <div className="max-w-2xl px-6 w-full">{children}</div>
        </div>
        <FeedAside />
      </div>
      <BottomMenu />
    </div>
  );
}
