import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import { Button } from "../ui/button";
import { ModeToggle } from "./ModeToggle";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../ui/navigation-menu";

export default function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > 100 && window.scrollY > lastScrollY) {
        setShow(false);
      } else {
        setShow(true);
      }

      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", controlNavbar);

    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <nav
      className={`${
        show ? "translate-y-0" : "-translate-y-20"
      } w-full py-5 bg-nav backdrop-blur-md border-b ease-in-out duration-500 flex justify-center border-border sticky top-0 z-50 font-p1`}
    >
      <div className="flex justify-between w-11/12 max-w-[1200px]">
        <Logo />
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="lg:gap-10 xl:gap-16">
            <NavigationMenuItem>
              <Button className="rounded-full" variant={"ghost"} asChild>
                <Link to={"/featured"}>Featured</Link>
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button className="rounded-full" variant={"ghost"} asChild>
                <Link to={"/following"}>Following</Link>
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button className="rounded-full" variant={"ghost"} asChild>
                <Link to={"/update-logs"}>Update Logs</Link>
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex gap-4 items-center">
          <Button
            className="font-p1 rounded-full hidden md:flex md:text-2xl md:font-normal"
            variant={"ghost"}
          >
            <IoIosSearch />
          </Button>
          <ModeToggle />
          <Button
            className="font-p1 rounded-full hidden md:flex md:text-lg md:font-normal"
            variant={"ghost"}
            asChild
          >
            <Link to={"/signup"}>Signup</Link>
          </Button>
          <Button
            className="font-p2 font-semibold rounded-full bg-greenAccent text-black md:text-lg md:font-normal md:font-p2 hover:text-primary-foreground"
            asChild
          >
            <Link to={"/login"}>Login</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
