import { Link2, MessageCircle, Share2 } from "lucide-react";
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
import BookMarkButton from "../CTAButtons/BookMarkButton/BookMarkButton";
import LikeButton from "../CTAButtons/LikeButton/LikeButton";

type BlogCTAMenuProps = {
  likes: number;
  comments: number;
};

export default function BlogCTAMenu({ likes, comments }: BlogCTAMenuProps) {
  async function handleCopyLinkClick() {
    await navigator.clipboard.writeText(location.href);
    toast.success("Link copied!");
  }

  return (
    <div className="sticky left-0 w-full flex justify-center bottom-5 mb-5 lg:bottom-10">
      <div className="w-4/5 max-w-sm shadow-xl flex bg-background border-border border rounded-full p-4 justify-around text-foreground">
        <div className="flex items-center gap-1">
          <LikeButton />
          <p>{likes}</p>
        </div>
        <div
          data-orientation="vertical"
          aria-orientation="vertical"
          role="separator"
          className="my-auto w-px bg-border mx-2 h-5"
        ></div>
        <div className="flex items-center gap-2">
          <Button variant={"ghost"} className="p-2">
            <MessageCircle />
          </Button>
          <p>{comments}</p>
        </div>
        <div
          data-orientation="vertical"
          aria-orientation="vertical"
          role="separator"
          className="my-auto w-px bg-border mx-2 h-5"
        ></div>
        <BookMarkButton />
        <div
          data-orientation="vertical"
          aria-orientation="vertical"
          role="separator"
          className="my-auto w-px bg-border mx-2 h-5"
        ></div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"}>
              <Share2 className="h-5" />
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
