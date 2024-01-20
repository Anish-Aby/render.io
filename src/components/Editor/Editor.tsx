import EditorJS from "@editorjs/editorjs";
import { useEffect, useRef } from "react";
import { EDITOR_JS_TOOLS } from "@/editorUtils/tools";

const EDITOR_HOLDER_ID = "editor";

export default function Editor({ setBlogData }: any) {
  const ejInstance = useRef<any>();

  // This will run only once
  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }
    return () => {
      ejInstance.current.destroy();
      ejInstance.current = null;
    };
  }, []);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: EDITOR_HOLDER_ID,
      inlineToolbar: ["link", "marker", "bold", "italic"],
      placeholder: "Start typing here...",
      onReady: () => {
        ejInstance.current = editor;
        console.log(editor);
      },
      onChange: async () => {
        const content = await (ejInstance.current as any).save();
        setBlogData(content);
        console.log(content);
      },
      autofocus: false,
      tools: EDITOR_JS_TOOLS,
    });
  };

  return (
    <>
      <div id={EDITOR_HOLDER_ID}></div>
    </>
  );
}
