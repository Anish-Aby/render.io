import { Heart } from "lucide-react";
import { Button } from "../../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import { useUserInfo } from "@/hooks/useUserInfo";
import { isEmpty } from "@/utils/checkUserObjectisEmpty";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LikeButton() {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const userInfo = useUserInfo();
  const isUserInfoEmpty = isEmpty(userInfo);

  function handleLikeClick() {
    if (isUserInfoEmpty) {
      navigate("/login");
      return;
    }

    setIsLiked((curIsLiked) => {
      return !curIsLiked;
    });
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant={"ghost"} onClick={handleLikeClick} className="p-2">
            <Heart
              className={isLiked ? "fill-like stroke-like" : "fill-none"}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Like</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
