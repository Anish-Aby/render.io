import { Heart } from "lucide-react";
import { Button } from "../../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";

export default function LikeButton() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button className="px-0 mr-4" variant={"ghost"}>
            <Heart className="text-foreground w-full" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Like</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
