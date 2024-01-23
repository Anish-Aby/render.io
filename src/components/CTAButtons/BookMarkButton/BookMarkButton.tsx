import { Bookmark } from "lucide-react";
import { Button } from "../../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";

export default function BookMarkButton() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button className="px-2" variant={"ghost"}>
            <Bookmark className="justify-self-end opacity-70" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Save</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
