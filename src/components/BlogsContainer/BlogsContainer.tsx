import BlogCard from "./BlogCard";
import { blogs } from "../../../public/data/data";

export default function BlogsContainer() {
  return (
    <div className="w-full flex flex-col gap-4 mt-10">
      {blogs.length > 0 ? (
        blogs.map((blog) => <BlogCard blog={blog} key={blog.id} />)
      ) : (
        <div className="flex flex-col gap-4 justify-center items-center">
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
