import FeedSelector from "../components/FeedSelector/FeedSelector";
import BlogsContainer from "../components/BlogsContainer/BlogsContainer";
import Navbar from "../components/Navbar/Navbar";

export default function App() {
  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <div className="w-full px-6">
        <FeedSelector />
        <BlogsContainer />
      </div>
    </div>
  );
}
