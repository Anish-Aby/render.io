import { Button } from "../ui/button";

type SearchCategorySelectorProps = {
  searchOption: string;
  setSearchOption: (option: string) => void;
};

export default function SearchCategorySelector({
  searchOption,
  setSearchOption,
}: SearchCategorySelectorProps) {
  function handleOptionClick(option: string) {
    setSearchOption(option);
  }

  return (
    <div className="flex w-full gap-1 text-lg mb-6">
      <Button
        onClick={() => {
          handleOptionClick("top");
        }}
        variant={searchOption === "top" ? "default" : "ghost"}
        className="rounded-full duration-300"
      >
        Top
      </Button>
      <Button
        onClick={() => {
          handleOptionClick("latest");
        }}
        variant={searchOption === "latest" ? "default" : "ghost"}
        className="rounded-full duration-300"
      >
        Latest
      </Button>
      <Button
        onClick={() => {
          handleOptionClick("tags");
        }}
        variant={searchOption === "tags" ? "default" : "ghost"}
        className="rounded-full duration-300"
      >
        Tags
      </Button>
      <Button
        onClick={() => {
          handleOptionClick("users");
        }}
        variant={searchOption === "users" ? "default" : "ghost"}
        className="rounded-full duration-300"
      >
        Users
      </Button>
      <Button
        onClick={() => {
          handleOptionClick("blogs");
        }}
        variant={searchOption === "blogs" ? "default" : "ghost"}
        className="rounded-full duration-300"
      >
        Blogs
      </Button>
    </div>
  );
}
