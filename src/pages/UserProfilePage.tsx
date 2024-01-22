import BlogCard from "@/components/BlogsContainer/BlogCard";
import Navbar from "@/components/Navbar/Navbar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { blogs } from "./../../public/data/data";
import FeedAside from "@/components/FeedAside/FeedAside";
import GradientAccent from "@/components/ui/GradientAccent";
import { useParams } from "react-router-dom";
import UserProfileCTA from "@/components/UserProfilePage/UserProfileCTA";

export default function UserProfilePage() {
  const userId = useParams();
  console.log(userId);
  return (
    <div className="w-full flex flex-col items-center h-svh">
      <GradientAccent />
      <Navbar />
      <div className="w-full flex justify-center">
        <div className="w-full flex justify-center xl:justify-end xl:mr-10 xl:max-w-4xl 2xl:max-w-5xl">
          <div className="w-11/12 mt-8 font-p1 flex flex-col gap-5 xl:px-6 max-w-2xl">
            <UserProfileCTA />
            <h1 className="hidden xl:flex text-3xl font-p2">Anish Aby</h1>
            <div className="flex gap-4">
              <Button className="rounded-full">Blogs</Button>
              <Button variant={"ghost"} className="rounded-full">
                About
              </Button>
            </div>
            <Separator />
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <BlogCard blog={blog} key={blog.id} isUserFeed={true} />
              ))
            ) : (
              <div className="flex flex-col gap-4 justify-center items-center">
                <h2 className="text-3xl text-center font-primary">Oops!</h2>
                <p className="text-center font-primary">
                  Looks like there aren't any blogs yet.
                </p>
                <p className="text-center font-primary">
                  Check back later again.
                </p>
              </div>
            )}
          </div>
        </div>
        <FeedAside isUserFeed={true} />
      </div>
    </div>
  );
}
