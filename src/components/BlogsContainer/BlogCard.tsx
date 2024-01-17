import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bookmark, Heart, MessageCircle } from "lucide-react";
import { Badge } from "../ui/badge";

type BlogCardProps = {
  blog: {
    id: number;
    title: string;
    description: string;
    likes: number;
    comments: number;
    name: string;
    date: string;
    category: string;
    image: string;
  };
};

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <article className="w-full border-b border-border py-4 gap-4 flex flex-col font-p1">
      <div className="w-full flex gap-4">
        <Avatar className="h-14 aspect-square w-14">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="font-medium flex flex-col justify-around">
          <h3 className="text-md">{blog.name}</h3>
          <p className="opacity-50 text-sm">{blog.date}</p>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-p2">{blog.title}</h2>
      </div>
      <div className="w-full aspect-video h-40 rounded-xl font-primary">
        <img
          className="flex w-full h-full rounded-xl object-cover "
          src={blog.image}
        />
      </div>
      <div className="grid grid-rows-1 grid-cols-2">
        <div className="flex gap-5">
          <div className="flex gap-2 justify-self-start opacity-70 items-center justify-center">
            <Heart className="text-foreground w-full" />
            <p className="flex justify-center text-base font-primary">10</p>
          </div>
          <div className="flex gap-2 justify-self-center opacity-70 font-p1">
            <MessageCircle />
            <p className="flex justify-center items-center text-base font-primary">
              5
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
