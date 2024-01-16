import { Button } from "../ui/button";

export default function FeedSelector() {
  return (
    <div className="my-10 flex gap-2">
      <Button className="rounded-full font-primary text-base">Following</Button>
      <Button variant="outline" className="rounded-full font-primary text-base">
        Featured
      </Button>
    </div>
  );
}
