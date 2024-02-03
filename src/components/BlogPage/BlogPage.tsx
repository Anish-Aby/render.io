import Navbar from "../Navbar/Navbar";
import BlogCTAMenu from "./BlogCTAMenu";
import BlogAuthorDetails from "./BlogAuthorDetails";
import Blocks from "editorjs-blocks-react-renderer";

import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BlogLoadingComponent from "../BlogLoadingComponent/BlogLoadingComponent";

export default function BlogPage() {
  const { blogId } = useParams();

  const apiURL = `https://render-api.netlify.app/api/blogs/${blogId}`;

  async function fetchBlog() {
    return await axios.get(apiURL);
  }

  const { status, data, error } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: fetchBlog,
  });

  if (status === "pending") {
    return (
      <div className="flex flex-col items-center">
        <Navbar />
        <div className="flex flex-col items-center font-p1 max-w-4xl justify-center w-full mb-10">
          <BlogLoadingComponent />
        </div>
      </div>
    );
  } else if (status === "error") {
    return <p>There was an error: {error.message}</p>;
  }

  if (status === "success") {
    const blog = data.data.data.blog;
    return (
      <div className="flex flex-col items-center">
        <Navbar />
        <article className="flex flex-col items-center font-p1 lg:max-w-3xl xl:max-w-4xl justify-center w-full mb-10">
          <div className="w-11/12 min-h-svh mb-10">
            <div className="my-5">
              <img src={blog.image} className="rounded-lg w-full" />
            </div>
            <div className="font-p2 text-3xl">{blog.title}</div>
            <div className="flex gap-4 items-center my-8">
              <Avatar className="h-14 aspect-square w-14">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h3 className="text-xl">{blog.authorId}</h3>
              <p className="opacity-50 text-lg">{blog.date}</p>
            </div>
            <div className="w-full text-xl lg:text-lg xl:text-xl break-words font-primary leading-8 mb-5 prose dark:prose-invert prose-img:w-full prose-img:max-w-screen-md prose-headings:font-normal prose-headings:font-p2">
              <Blocks data={blog.body.content} />
            </div>
          </div>
          <BlogCTAMenu likes={blog.likes} comments={blog.comments.length} />
        </article>
        <BlogAuthorDetails author={blog.authorId} />
      </div>
    );
  }
}
