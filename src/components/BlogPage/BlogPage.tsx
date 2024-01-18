import Navbar from "../Navbar/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import BlogCTAMenu from "./BlogCTAMenu";
import BlogAuthorDetails from "./BlogAuthorDetails";
import { useParams } from "react-router-dom";

import { blogs } from "./../../../public/data/data";
import { blogsTable } from "./../../../public/data/blogsTable";

// type BlogPageProps = {
//   author: string;
//   date: string;
//   readTime: string;
//   commentsCount: number;
//   likesCount: number;
//   blogTitle: string;
//   blogSubTitle: string;
//   blogImage: string;
//   body: string;
// };

export default function BlogPage() {
  const { blogId } = useParams();
  let blog = ``;

  blogId && (blog = blogs[blogId]);

  const blogBody = blogsTable[blogId].content;

  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <article className="flex flex-col items-center font-p1 max-w-4xl justify-center">
        <div className="w-11/12 min-h-svh">
          <div className="my-5">
            <img src={blog.blogImage} className="rounded-lg w-full" />
          </div>
          <div className="font-p2 text-3xl">{blog.blogTitle}</div>
          <div className="flex gap-4 items-center my-8">
            <Avatar className="h-14 aspect-square w-14">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h3 className="text-xl">{blog.author}</h3>
            <p className="opacity-50 text-lg">{blog.date}</p>
          </div>
          <div className="w-full text-xl font-primary leading-8 mb-5">
            {blogBody}
          </div>
        </div>
        <BlogCTAMenu />
      </article>
      <BlogAuthorDetails author={blog.author} />
    </div>
  );
}
