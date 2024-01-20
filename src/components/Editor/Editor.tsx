import EditorJS from "@editorjs/editorjs";
import { useEffect, useRef } from "react";
import { EDITOR_JS_TOOLS } from "@/editorUtils/tools";

const EDITOR_HOLDER_ID = "editor";

export default function Editor() {
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
      placeholder: "Start typing here...",
      onReady: () => {
        ejInstance.current = editor;
      },
      onChange: async () => {
        const content = await (ejInstance.current as any).save();
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
