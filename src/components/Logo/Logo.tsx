import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <h1 className="uppercase text-foreground text-xl font-bold font-p2 flex items-center leading-tight">
      <Link to="/">render.io</Link>
    </h1>
  );
}
