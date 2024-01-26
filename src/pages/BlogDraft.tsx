import BlogDraftNavbar from "@/components/BlogDraftNavbar/BlogDraftNavbar";
import Editor from "@/components/Editor/Editor";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function BlogDraft() {
  const [blogData, setBlogData] = useState<object | null>(null);

  const handleSave = () => {
    console.log("Blog Content:", blogData);
  };

  return (
    <div className="w-full h-sv font-p1 flex flex-col items-center">
      <BlogDraftNavbar onSave={handleSave} />
      <div className="mt-10 w-11/12 text-base max-w-2xl">
        <p className="text-xl font-p2 mb-5">What's on your mind?</p>
        <Input
          id="blogHeading"
          name="blogHeading"
          className="text-xl py-5 pl-0 mb-5 border-none shadow-none lg:px-2"
          placeholder="Blog heading..."
        />
        <Editor setBlogData={setBlogData} />
      </div>
    </div>
  );
}
