import BottomMenu from "@/components/BottomMenu/BottomMenu";
import Navbar from "@/components/Navbar/Navbar";
import SearchCategorySelector from "@/components/SearchPage/SearchCategorySelector";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export default function Search() {
  const [searchOption, setSearchOption] = useState("top");
  return (
    <div className="w-full min-h-svh flex flex-col items-center font-p1">
      <Navbar />
      <BottomMenu />
      <div className="my-10 w-11/12 max-w-2xl">
        <Input
          className="p-6 rounded-xl text-xl mb-6 bg-background lg:shadow-none"
          type="text"
          placeholder="Search Render.io"
        />
        <SearchCategorySelector
          searchOption={searchOption}
          setSearchOption={setSearchOption}
        />
        <Separator />
      </div>
    </div>
  );
}
