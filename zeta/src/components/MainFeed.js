import BlogCard from "./BlogCard";
import NewsContainer from "./NewsContainer";
import { blogs } from "../data/data";
import CategoryContainer from "./CategoryContainer";

export default function MainFeed() {
  return (
    <div className="main-feed-container">
      <div className="feed-blogs-container">
        <div className="feed-button-container">
          <CategoryContainer />
        </div>
        {blogs.map((blog, i) => (
          <BlogCard blog={blog} key={i} />
        ))}
      </div>
      <div className="feed-news-container">
        <NewsContainer />
      </div>
    </div>
  );
}
