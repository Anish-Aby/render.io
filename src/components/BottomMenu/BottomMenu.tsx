import { Bookmark, CircleUser, Home, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
// import { useSelector } from "react-redux";
// import { RootState } from "@/store";
import { isEmpty } from "@/utils/checkUserObjectisEmpty";
import { useUserInfo } from "@/hooks/useUserInfo";

export default function BottomMenu() {
  // const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const userInfo = useUserInfo();

  const isUserInfoEmpty = isEmpty(userInfo);

  return (
    <div className="fixed left-0 w-full flex justify-center bottom-5 lg:hidden">
      <div className="w-4/5 flex bg-background shadow-xl border-border border rounded-full p-4 justify-around text-foreground">
        <Button variant={"ghost"} asChild>
          <Link to="/">
            <Home />
          </Link>
        </Button>
        <div
          data-orientation="vertical"
          aria-orientation="vertical"
          role="separator"
          className="my-auto w-px bg-border mx-2 h-5"
        ></div>
        <Button variant={"ghost"} asChild>
          <Link to="/search">
            <Search />
          </Link>
        </Button>
        <div
          data-orientation="vertical"
          aria-orientation="vertical"
          role="separator"
          className="my-auto w-px bg-border mx-2 h-5"
        ></div>
        <Button variant={"ghost"}>
          <Bookmark />
        </Button>
        <div
          data-orientation="vertical"
          aria-orientation="vertical"
          role="separator"
          className="my-auto w-px bg-border mx-2 h-5"
        ></div>
        <Button variant={"ghost"} asChild>
          {isUserInfoEmpty ? (
            <Link to="/login">
              <CircleUser />
            </Link>
          ) : (
            <Link to="/profile">
              <CircleUser />
            </Link>
          )}
        </Button>
      </div>
    </div>
  );
}
