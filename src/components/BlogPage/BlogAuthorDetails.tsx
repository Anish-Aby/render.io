import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

type BlogAuthorDetailsProps = {
  author: string;
};

export default function BlogAuthorDetails({ author }: BlogAuthorDetailsProps) {
  return (
    <div className="bg-secondary py-10 px-5 font-p1 rounded-t-3xl">
      <div className="flex w-full items-center mb-4 text-secondary-foreground">
        <Avatar className="h-14 aspect-square w-14">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Button className="bg-greenAccent rounded-full ml-auto text-black font-p2 text-lg">
          Follow
        </Button>
      </div>
      <p className="text-xl font-p2 mb-5">Written by {author}</p>
      <p className="mb-5 text-base">2.1k Followers</p>
      <p>
        Google Developer Expert in Flutter. PHP, SQL, TS, Java, C++,
        professionally since 2003. Open for consulting & dev with my team.
        Telegram channel: @anish_aby
      </p>
    </div>
  );
}
