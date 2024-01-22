import { Button } from "../ui/button";

export default function UserProfileFeedSelector() {
  return (
    <div className="flex gap-4">
      <Button className="rounded-full">Blogs</Button>
      <Button variant={"ghost"} className="rounded-full">
        About
      </Button>
    </div>
  );
}
