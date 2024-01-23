import { Bookmark, CircleUser, Home, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export default function BottomMenu() {
  return (
    <div className="fixed left-0 w-full flex justify-center bottom-5 lg:hidden">
      <div className="w-4/5 flex bg-background border-border border rounded-full p-4 justify-around text-foreground">
        <Button variant={"ghost"} asChild>
          <Link to="/">
            <Home />
          </Link>
        </Button>
        <Button variant={"ghost"} asChild>
          <Link to="/search">
            <Search />
          </Link>
        </Button>
        <Button variant={"ghost"}>
          <Bookmark />
        </Button>
        <Button variant={"ghost"}>
          <CircleUser />
        </Button>
      </div>
    </div>
  );
}
