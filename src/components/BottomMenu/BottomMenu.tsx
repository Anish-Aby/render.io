import { Bookmark, CircleUser, Home, Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function BottomMenu() {
  return (
    <div className="fixed left-0 w-full flex justify-center bottom-5">
      <div className="w-4/5 flex bg-background border-border border rounded-full p-4 justify-around text-foreground">
        <Link to="/">
          <Home />
        </Link>
        <Search />
        <Bookmark />
        <CircleUser />
      </div>
    </div>
  );
}
