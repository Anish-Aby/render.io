import Markdown from "markdown-to-jsx";

export default function BlogMainBody({ blogBody }) {
  return (
    <div className="blog-main-body">
      <Markdown>{blogBody}</Markdown>
    </div>
  );
}
