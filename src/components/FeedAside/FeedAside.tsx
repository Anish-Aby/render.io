import { Bookmark, Sparkles, Tag, Trophy } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import UserProfileCTA from "../UserProfilePage/UserProfileCTA";

type FeedAsideProps = {
  isUserFeed?: boolean;
};

export default function FeedAside({ isUserFeed = false }: FeedAsideProps) {
  return (
    <aside className="hidden border-l w-1/4 max-w-sm xl:flex justify-center font-p1">
      <div className="mt-10 w-4/5 flex flex-col gap-5">
        {isUserFeed ? (
          <UserProfileCTA isAside={true} />
        ) : (
          <>
            <div className="flex flex-col gap-4">
              <span className="flex items-center gap-4">
                <Sparkles />
                <p className="text-lg font-p2">Upcoming Features</p>
              </span>
              <p>
                Basic interactivity (liking, commenting, and saving) will be
                roled out.
              </p>
              <p>
                In the coming days, users will be able to create accounts and
                post blogs.
              </p>
              <p>Different tags will also be pushed as one of the updates.</p>
            </div>
            <Separator />
            <div className="flex flex-col gap-4 sticky top-10">
              <div className="flex flex-col gap-4">
                <span className="flex items-center gap-4">
                  <Tag className="w-5" />
                  <p className="text-lg font-p2">Tags</p>
                </span>
                <div className="flex flex-wrap gap-2">
                  <Button className="rounded-full" variant={"secondary"}>
                    Technology
                  </Button>
                  <Button className="rounded-full" variant={"secondary"}>
                    React.js
                  </Button>
                  <Button className="rounded-full" variant={"secondary"}>
                    Machine Learning
                  </Button>
                  <Button className="rounded-full" variant={"secondary"}>
                    JavaScript
                  </Button>
                  <Button className="rounded-full" variant={"secondary"}>
                    Full Stack
                  </Button>
                  <Button className="rounded-full" variant={"secondary"}>
                    System Design
                  </Button>
                </div>
                <p className="mt-2">And more to come!</p>
              </div>
              <Separator />

              <div className="flex flex-col gap-4">
                <span className="flex items-center gap-4">
                  <Bookmark />
                  <p className="text-lg font-p2">Bookmarks</p>
                </span>
                <p>Users can quickly access their recent bookmarks here.</p>
                <p>This feature will be implemented on a later date.</p>
              </div>
              <Separator />
              <div className="flex flex-col gap-4">
                <span className="flex items-center gap-4">
                  <Trophy />
                  <p className="text-lg font-p2">Achievements</p>
                </span>
                <p>Users can get achievements by doing certain tasks.</p>
                <p>This feature will be implemented on a later date.</p>
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
