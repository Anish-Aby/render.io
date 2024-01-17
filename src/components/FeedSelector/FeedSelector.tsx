import { Button } from "../ui/button";

export default function FeedSelector() {
  return (
    <div className="my-10 flex gap-2 font-p1">
      <Button className="rounded-full text-base">Following</Button>
      <Button
        variant="outline"
        className="rounded-full text-base bg-transparent"
      >
        Featured
      </Button>
    </div>
  );
}
