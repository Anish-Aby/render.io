import LogoTemp from "./LogoTemp";
import Searchbar from "./Searchbar";
import Button from "./Button";
import { Link } from "react-router-dom";

export default function NavbarTemp() {
  return (
    <div className="navbar-container">
      <LogoTemp />
      <Searchbar />
      <div className="call-actions-container">
        <button className="dark-light-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="dark-moon-icon"
            viewBox="0 0 256 256"
          >
            <path d="M235.54,150.21a104.84,104.84,0,0,1-37,52.91A104,104,0,0,1,32,120,103.09,103.09,0,0,1,52.88,57.48a104.84,104.84,0,0,1,52.91-37,8,8,0,0,1,10,10,88.08,88.08,0,0,0,109.8,109.8,8,8,0,0,1,10,10Z"></path>
          </svg>
        </button>

        <Link to={"login"} className="react-link-btn">
          <Button>Sign In</Button>
        </Link>

        <Link to={"signup"} className="react-link-btn">
          <Button isActive="active">Sign Up</Button>
        </Link>
      </div>
    </div>
  );
}
