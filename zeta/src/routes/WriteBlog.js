import NavbarTemp from "../components/NavbarTemp";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

const TinyAPI = `gn4udh6r8usqzjsyez19qtd1felsshw8zfts1gb5bx9ktr4b`;

export default function WriteBlog() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <div className="write-blog-main-container">
      <NavbarTemp />
      <div className="editor-container">
        <Editor
          className="editor"
          apiKey={TinyAPI}
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={`<h2 style="opacity:30%">Write your blog</h2>`}
          init={{
            height: 800,
            menubar: false,
            statusbar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style: "body { font-family:Inter; font-size:24px;}",
            selector: "textarea",
            skin_url: "/tinymceskin/CUSTOM",
            content_css: "/tinymceskin/skin",
          }}
        />
        <button onClick={log}>Log editor content</button>
      </div>
    </div>
  );
}
