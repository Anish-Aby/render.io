import { Link } from "react-router-dom";

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <h1
      className={`uppercase text-foreground text-xl font-bold font-p2 flex items-center leading-tight md:text-2xl lg:text-3xl ${className}`}
    >
      <Link to="/">render.io</Link>
    </h1>
  );
}
