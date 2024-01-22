import { Gem, Users } from "lucide-react";
import { Button } from "../ui/button";

export default function FeedSelector() {
  return (
    <div className="mt-10 flex gap-2 font-p1">
      <Button className="rounded-full text-base flex gap-2">
        <Gem className="h-4 hidden md:flex" />
        <p>Featured</p>
      </Button>
      <Button
        variant="ghost"
        className="rounded-full text-base bg-transparent flex gap-2"
      >
        <Users className="w-full h-4 hidden md:flex" />
        <p>Following</p>
      </Button>
    </div>
  );
}
