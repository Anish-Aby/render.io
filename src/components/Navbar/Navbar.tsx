import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import { Button } from "../ui/button";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  return (
    <nav className="w-full px-5 py-4 bg-nav backdrop-blur-md  border-b border-solid border-border  flex justify-between sticky top-0">
      <Logo />
      <div className="flex gap-4 items-center">
        <ModeToggle />
        <Button className="font-primary font-semibold rounded-full" asChild>
          <Link to={"/login"}>Login</Link>
        </Button>
      </div>
    </nav>
  );
}
