import Navbar from "../Navbar/Navbar";
import BlogCTAMenu from "./BlogCTAMenu";
import BlogAuthorDetails from "./BlogAuthorDetails";
import Blocks from "editorjs-blocks-react-renderer";

import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
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
  const blogIndex = +blogId!;
  // let blog: BlogPageProps;

  const blog = blogs[blogIndex];

  const blogBody = blogsTable[blogIndex].content;

  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <article className="flex flex-col items-center font-p1 max-w-4xl justify-center w-full mb-10">
        <div className="w-11/12 min-h-svh mb-10">
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
          <div className="w-full text-xl break-words font-primary leading-8 mb-5 prose dark:prose-invert prose-img:w-full prose-img:max-w-screen-md prose-headings:font-normal prose-headings:font-p2">
            <Blocks data={blogBody} />
          </div>
        </div>
        <BlogCTAMenu />
      </article>
      <BlogAuthorDetails author={blog.author} />
    </div>
  );
}
