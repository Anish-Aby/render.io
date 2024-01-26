import { Heart, Link2, MessageCircle, Share2 } from "lucide-react";
import { FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { FiLinkedin } from "react-icons/fi";
import { AiOutlineReddit } from "react-icons/ai";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useState } from "react";
import BookMarkButton from "../CTAButtons/BookMarkButton/BookMarkButton";

export default function BlogCTAMenu() {
  const [isLiked, setIsLiked] = useState(false);

  async function handleCopyLinkClick() {
    await navigator.clipboard.writeText(location.href);
    toast.success("Link copied!");
  }

  function handleLikeClick() {
    setIsLiked((curIsLiked) => {
      return !curIsLiked;
    });
  }

  return (
    <div className="sticky left-0 w-full flex justify-center bottom-5 mb-5 lg:bottom-10">
      <div className="w-4/5 max-w-lg flex bg-background border-border border rounded-full p-4 justify-around text-foreground">
        <Button variant={"ghost"} onClick={handleLikeClick}>
          <Heart className={isLiked ? "fill-like stroke-like" : "fill-none"} />
        </Button>
        <Button variant={"ghost"}>
          <MessageCircle />
        </Button>
        <BookMarkButton />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"}>
              <Share2 />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="font-p1">
            <DropdownMenuItem
              className="my-3 text-lg flex gap-3"
              onClick={handleCopyLinkClick}
            >
              <Link2 />
              <p>Copy link</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="my-3 text-lg flex gap-3">
              <FaXTwitter />
              <p>Twitter / X</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="my-3 text-lg flex gap-3">
              <FiLinkedin />
              <p>LinkedIn</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="my-3 text-lg flex gap-3">
              <AiOutlineReddit />
              <p>Reddit</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="my-3 text-lg flex gap-3">
              <FaWhatsapp />
              <p>Whatsapp</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
