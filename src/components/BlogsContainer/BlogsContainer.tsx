import BlogCard from "./BlogCard";
// import { blogs } from "../../../public/data/data";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import FeedLoadingComponent from "../FeedLoadingComponent/FeedLoadingComponent";

export default function BlogsContainer() {
  // query
  const { status, error, data } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchFeedBlogs,
  });

  async function fetchFeedBlogs() {
    return await axios.get(`https://render-api.netlify.app/api/blogs`);
  }

  if (status === "pending") {
    return (
      <>
        <FeedLoadingComponent />
        <FeedLoadingComponent />
        <FeedLoadingComponent />
      </>
    );
  } else if (status === "error") {
    return <p className="mt-10">There was an error: {error.message}</p>;
  } else if (status === "success") {
    console.log("container got called.");

    const blogs = data.data.data.blogs;
    return (
      <div className="w-full flex flex-col gap-4 mt-10">
        {data.data.results > 0 ? (
          blogs.map(
            (blog: {
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
            }) => <BlogCard blog={blog} key={blog._id} />
          )
        ) : (
          <div className="flex flex-col gap-4 justify-center items-center w-11/12">
            <h2 className="text-3xl text-center font-primary">Oops!</h2>
            <p className="text-center font-primary">
              Looks like there aren't any blogs yet.
            </p>
            <p className="text-center font-primary">Check back later again.</p>
          </div>
        )}
      </div>
    );
  }
}
