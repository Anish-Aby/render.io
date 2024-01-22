import {
  AlertCircle,
  Ban,
  MoreHorizontal,
  Share2,
  UserPlus,
} from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type UserProfileCTAProps = {
  isAside?: boolean;
};

export default function UserProfileCTA({
  isAside = false,
}: UserProfileCTAProps) {
  return (
    <div
      className={`flex flex-col gap-5 ${
        isAside ? "xl: flex sticky top-14" : "xl:hidden"
      }`}
    >
      <div className="flex gap-4 items-center">
        <Avatar className="h-20 w-20">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Button className="rounded-full flex-grow bg-greenAccent text-black font-p2 text-lg gap-2">
          <p>Follow</p>
          <UserPlus className="w-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="rounded-full" variant={"outline"}>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="gap-2">
              <Share2 className="w-5" />
              <p>Share profile</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <Ban className="w-5" />
              <p>Block user</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <AlertCircle className="w-5" />
              <p>Report user</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-2xl font-p2">Anish Aby</p>
        <p className="text-base opacity-70">@Anish-Aby</p>
      </div>
      <div className="flex gap-4">
        <span className="font-p3 text-base flex gap-2">
          <span>124</span>
          <span className="font-p1 opacity-60">Followers</span>
        </span>
        <span className="font-p3 text-base flex gap-2">
          <span>5</span>
          <span className="font-p1 opacity-60">Blogs</span>
        </span>
      </div>
    </div>
  );
}
