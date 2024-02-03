import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Gem } from "lucide-react";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import BookMarkButton from "../CTAButtons/BookMarkButton/BookMarkButton";
import MoreOptionsButton from "../CTAButtons/MoreOptionsButton/MoreOptionsButton";
// import Blocks from "editorjs-blocks-react-renderer";

type BlogCardProps = {
  blog: {
    _id: string;
    authorId: string;
    date: string;
    title: string;
    body: object;
    likes: number;
    comments: [];
    category: string;
    isFeatured: boolean;
    image: string;
    summary: string;
  };
  isUserFeed?: boolean;
};

export default function BlogCard({ blog, isUserFeed = false }: BlogCardProps) {
  return (
    <article className="w-full border-b border-border py-4 gap-4 flex flex-col font-p1 lg:pb-6">
      <div
        className={`w-full grid grid-cols-3 grid-rows-1 ${
          isUserFeed && "hidden"
        }`}
      >
        <div className="flex gap-4 col-span-2">
          <Link to={`/${blog.authorId}`}>
            <Avatar className="h-14 aspect-square w-14">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
          <div className="font-medium flex flex-col justify-around mr-5">
            <Link to={`/${blog.authorId}`}>
              <h3 className="text-md">{blog.authorId}</h3>
            </Link>
            <p className="opacity-50 text-sm">{blog.date}</p>
          </div>
        </div>
        {blog.isFeatured && (
          <Badge
            variant="default"
            className="h-min py-1 font-p1 font-normal text-sm justify-self-end flex md:gap-2"
          >
            <Gem className="h-4 w-full" />
            <p className="hidden md:flex">Featured</p>
          </Badge>
        )}
      </div>
      <Link to={`/blogs/${blog._id}`}>
        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
          <div className="md:w-2/3">
            <h2 className="text-lg font-p2 md:text-xl md:font-p3">
              {blog.title}
            </h2>
            <p className="hidden opacity-60 md:line-clamp-3">
              {blog.summary}
              {/* <Blocks data={blog.body} /> */}
            </p>
          </div>
          <div className="w-full aspect-video h-40 rounded-xl font-primary md:w-1/4 md:h-1/3">
            <img
              className="flex w-full h-full rounded-xl object-cover md:w-[156px] md:h-[87.75px]"
              src={blog.image}
            />
          </div>
        </div>
      </Link>
      <div className="grid grid-rows-1 grid-cols-2">
        <div className="flex gap-5">
          <Button variant={"secondary"}>{blog.category}</Button>
        </div>
        <div className="flex w-full justify-end gap-3">
          <BookMarkButton />
          <MoreOptionsButton />
        </div>
      </div>
    </article>
  );
}
