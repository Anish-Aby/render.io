import { Bookmark } from "lucide-react";
import { Button } from "../../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import { useState } from "react";

export default function BookMarkButton() {
  const [isBookmarked, setIsBookmarked] = useState(false);

  function handleBookmarkClick() {
    setIsBookmarked((curBookmark) => {
      return !curBookmark;
    });
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="px-2"
            variant={"ghost"}
            onClick={handleBookmarkClick}
          >
            <Bookmark
              className={`justify-self-end ease-in-out ${
                isBookmarked ? "fill-bookmark stroke-bookmark" : ""
              }`}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {isBookmarked ? <p>Remove bookmark</p> : <p>Save</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
