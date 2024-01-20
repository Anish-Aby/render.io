import BlogDraftNavbar from "@/components/BlogDraftNavbar/BlogDraftNavbar";
import Editor from "@/components/Editor/Editor";
import { useState } from "react";

export default function BlogDraft() {
  const [blogData, setBlogData] = useState<object | null>(null);

  const handleSave = () => {
    console.log("Blog Content:", blogData);
  };

  return (
    <div className="w-full h-sv font-p1 flex flex-col items-center">
      <BlogDraftNavbar onSave={handleSave} />
      <div className="mt-10 w-11/12 text-base">
        <p className="text-xl font-p2 mb-5">What's on your mind?</p>
        <Editor setBlogData={setBlogData} />
      </div>
    </div>
  );
}
