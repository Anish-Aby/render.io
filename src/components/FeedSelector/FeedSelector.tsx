import { Gem, Users } from "lucide-react";
import { Button } from "../ui/button";

type FeedSelectorProps = {
  currentFeed: string;
  setCurrentFeed: (option: string) => void;
};

export default function FeedSelector({
  currentFeed,
  setCurrentFeed,
}: FeedSelectorProps) {
  function handleOptionClick(option: string) {
    setCurrentFeed(option);
  }

  return (
    <div className="mt-10 flex gap-2 font-p1">
      <Button
        className="rounded-full text-base flex gap-2 duration-300"
        variant={currentFeed === "featured" ? "default" : "ghost"}
        onClick={() => handleOptionClick("featured")}
      >
        <Gem className="h-4 hidden md:flex" />
        <p>Featured</p>
      </Button>
      <Button
        variant={currentFeed === "following" ? "default" : "ghost"}
        onClick={() => handleOptionClick("following")}
        className="rounded-full text-base flex gap-2 duration-300"
      >
        <Users className="w-full h-4 hidden md:flex" />
        <p>Following</p>
      </Button>
    </div>
  );
}
