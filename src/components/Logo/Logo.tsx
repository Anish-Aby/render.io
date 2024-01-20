import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <h1 className="uppercase text-foreground text-xl font-bold font-p2 flex items-center leading-tight md:text-2xl lg:text-3xl">
      <Link to="/">render.io</Link>
    </h1>
  );
}
