import BlogDraftNavbar from "@/components/BlogDraftNavbar/BlogDraftNavbar";
import Editor from "@/components/Editor/Editor";
// import { EDITOR_JS_TOOLS } from "@/editorUtils/tools";
// import { useCallback, useRef, useState } from "react";

// import { createReactEditorJS } from "react-editor-js";

// const ReactEditorJS = createReactEditorJS();

export default function BlogDraft() {
  // const editorCore = useRef<object>();

  // const handleInitialize = useCallback((instance: object) => {
  //   editorCore.current = instance;
  //   console.log(instance);
  // }, []);

  // const handleSave = useCallback(async () => {
  //   const getCurrentData = editorCore.current;
  //   const savedData = await (getCurrentData as any).save();
  //   // const savedData = await editorCore.current.save();
  //   console.log(savedData);
  // }, []);

  return (
    <div className="w-full h-sv font-p1 flex flex-col items-center">
      <BlogDraftNavbar />
      <div className="mt-10 w-11/12 text-base">
        <p className="text-xl font-p2 mb-5">What's on your mind?</p>
        {/* <ReactEditorJS
          onInitialize={handleInitialize}
          placeholder={"Start typing here..."}
          tools={EDITOR_JS_TOOLS}
        /> */}
        <Editor />
      </div>
    </div>
  );
}
