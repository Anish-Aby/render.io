import { Link } from "react-router-dom";

export default function LogoTemp() {
  return (
    <div className="logo-container">
      <Link className="react-link" to={"/"}>
        <div className="logo"></div>
        <div className="logo-name">Render.io</div>
      </Link>
    </div>
  );
}
