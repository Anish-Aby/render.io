import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bookmark, Gem, Heart, MessageCircle } from "lucide-react";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";

type BlogCardProps = {
  blog: {
    id: number;
    author: string;
    date: string;
    readTime: string;
    blogTitle: string;
    blogSubTitle: string;
    likesCount: number;
    commentsCount: number;
    category: string;
    isFeatured: boolean;
    blogImage: string;
    blogContent: number;
  };
};

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <article className="w-full border-b border-border py-4 gap-4 flex flex-col font-p1">
      <div className="w-full grid grid-cols-3 grid-rows-1 ">
        <div className="flex gap-4 col-span-2">
          <Avatar className="h-14 aspect-square w-14">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="font-medium flex flex-col justify-around mr-5">
            <h3 className="text-md">{blog.author}</h3>
            <p className="opacity-50 text-sm">{blog.date}</p>
          </div>
        </div>
        {blog.isFeatured && (
          <Badge
            variant="default"
            className="h-min py-1 font-p1 font-normal text-sm justify-self-end flex"
          >
            <Gem className="h-4 w-full" />
            <p className="hidden">Featured</p>
          </Badge>
        )}
      </div>
      <Link to={`/blog/${blog.id}`}>
        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
          <div className="md:w-2/3">
            <h2 className="text-lg font-p2 md:text-xl md:font-p3">
              {blog.blogTitle}
            </h2>
          </div>
          <div className="w-full aspect-video h-40 rounded-xl font-primary md:w-1/4 md:h-1/3">
            <img
              className="flex w-full h-full rounded-xl object-cover "
              src={blog.blogImage}
            />
          </div>
        </div>
      </Link>
      <div className="grid grid-rows-1 grid-cols-2">
        <div className="flex gap-5">
          <div className="flex gap-2 justify-self-start opacity-70 items-center justify-center">
            <Heart className="text-foreground w-full" />
            <p className="flex justify-center text-base font-primary">
              {blog.likesCount}
            </p>
          </div>
          <div className="flex gap-2 justify-self-center opacity-70 font-p1">
            <MessageCircle />
            <p className="flex justify-center items-center text-base font-primary">
              {blog.commentsCount}
            </p>
          </div>
        </div>
        <div className="flex w-full justify-end gap-5">
          <Badge variant="secondary">{blog.category}</Badge>
          <Bookmark className="justify-self-end opacity-70" />
        </div>
      </div>
    </article>
  );
}
