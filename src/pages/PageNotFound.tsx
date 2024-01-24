import Navbar from "@/components/Navbar/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="w-full h-svh font-p3 flex flex-col">
      <Navbar />
      <div className="flex w-full h-full flex-col items-center text-[12rem] lg:mt-10">
        <span className="w-fit h-fit relative first-letter:tracking-[12vmax] block overflow-hidden before:content-[''] before:bg-[url('/images/rick-morty.webp')] before:absolute before:h-full before:w-full before:bg-no-repeat before:bg-contain before:bg-center before:left-0">
          44
        </span>
        <div className="flex flex-col items-center text-base font-p1 text-center px-3 gap-2">
          <h1 className="text-5xl mb-5">Oops!</h1>
          <p>Sorry, we can't seem to find what you're looking for.</p>
          <p>It might have been removed or doesn't exist anymore.</p>
        </div>
        <Button className="mt-5 font-p2 rounded-full p-5 text-lg" asChild>
          <Link to={"/"}>Go Home</Link>
        </Button>
      </div>
    </div>
  );
}
