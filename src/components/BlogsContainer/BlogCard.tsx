import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bookmark, MessageCircle } from "lucide-react";

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
    <article className="w-full border-b-2 border-border py-3 gap-4 flex flex-col">
      <div className="w-full flex gap-4">
        <Avatar className="h-14 aspect-square w-14">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="font-primary font-medium flex flex-col justify-around">
          <h3 className="text-md font-regular">{blog.name}</h3>
          <p className="opacity-50 font-regular text-sm">{blog.date}</p>
        </div>
      </div>
      <div>
        <h2 className="font-bold text-lg">{blog.title}</h2>
      </div>
      <div className="w-full aspect-video h-40 rounded-xl font-primary">
        <img
          className="flex w-full h-full rounded-xl object-cover "
          src={blog.image}
        />
      </div>
      <div className="grid grid-rows-1 grid-cols-3">
        <div className="flex gap-2 justify-self-center opacity-70">
          <MessageCircle className="text-primary" />
          <p className="font-primary">Comments</p>
        </div>
        <div className="justify-self-center opacity-70 font-primary">
          10 likes
        </div>
        <Bookmark className="justify-self-end opacity-70" />
      </div>
    </article>
  );
}
