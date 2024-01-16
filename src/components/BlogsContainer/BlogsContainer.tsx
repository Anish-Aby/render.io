import BlogCard from "./BlogCard";
import { blogs } from "../../../public/data/data";

export default function BlogsContainer() {
  return (
    <div className="w-full flex flex-col gap-4">
      {blogs.length > 0 ? (
        blogs.map((blog) => <BlogCard blog={blog} key={blog.id} />)
      ) : (
        <div className="flex flex-col gap-4 justify-center items-center">
          <h2 className="text-3xl text-center">Oops!</h2>
          <p className="text-center">Looks like there aren't any blogs yet.</p>
        </div>
      )}
    </div>
  );
}
