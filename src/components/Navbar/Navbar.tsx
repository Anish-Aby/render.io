import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import { Button } from "../ui/button";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  return (
    <nav className="w-full px-5 py-5 bg-nav backdrop-blur-md border-b  border-border flex justify-between sticky top-0 z-50 font-p1">
      <Logo />
      <div className="flex gap-4 items-center">
        <ModeToggle />
        <Button
          className="font-p2 font-semibold rounded-full bg-greenAccent text-black"
          asChild
        >
          <Link to={"/login"}>Login</Link>
        </Button>
      </div>
    </nav>
  );
}
