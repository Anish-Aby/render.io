import Logo from "../Logo/Logo";
import { Button } from "../ui/button";
import { ModeToggle } from "./../Navbar/ModeToggle";
import { useEffect, useState } from "react";

type BlogDraftNavbarProps = {
  handleSave: () => void;
};

export default function BlogDraftNavbar({ handleSave }: BlogDraftNavbarProps) {
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
      } w-full px-5 py-5 bg-nav backdrop-blur-md border-b ease-in-out duration-500  border-border flex justify-between sticky top-0 z-50 font-p1`}
    >
      <Logo />
      <div className="flex gap-4 items-center">
        <ModeToggle />
        <Button
          onClick={handleSave}
          className="font-p2 font-semibold rounded-full bg-greenAccent text-black"
        >
          Publish
        </Button>
      </div>
    </nav>
  );
}
