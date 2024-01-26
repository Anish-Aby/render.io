import axios from "axios";
import BlogCard from "../BlogsContainer/BlogCard";
import { useQuery } from "@tanstack/react-query";
import FeedLoadingComponent from "../FeedLoadingComponent/FeedLoadingComponent";

export default function UserProfileBlogsContainer() {
  // query
  const { status, error, data } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchFeedBlogs,
  });

  async function fetchFeedBlogs() {
    const baseURL = import.meta.env.VITE_API_URI;
    return await axios.get(`${baseURL}/blogs/`);
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
    const blogs = data.data.data.blogs;
    return (
      <>
        {blogs.length > 0 ? (
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
            }) => <BlogCard blog={blog} key={blog._id} isUserFeed={true} />
          )
        ) : (
          <div className="flex flex-col gap-4 justify-center items-center">
            <h2 className="text-3xl text-center font-primary">Oops!</h2>
            <p className="text-center font-primary">
              Looks like there aren't any blogs yet.
            </p>
            <p className="text-center font-primary">Check back later again.</p>
          </div>
        )}
      </>
    );
  }
}
