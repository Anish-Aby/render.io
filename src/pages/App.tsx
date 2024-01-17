import FeedSelector from "../components/FeedSelector/FeedSelector";
import BlogsContainer from "../components/BlogsContainer/BlogsContainer";
import Navbar from "../components/Navbar/Navbar";
import GradientAccent from "@/components/ui/GradientAccent";
import BottomMenu from "@/components/BottomMenu/BottomMenu";

export default function App() {
  return (
    <div className="w-full min-h-screen font-primary">
      <Navbar />
      <div className="max-w-2xl px-6">
        <FeedSelector />
        <BlogsContainer />
      </div>
      <GradientAccent />
      <BottomMenu />
    </div>
  );
}
