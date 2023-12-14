import Logo from "./Logo";
import Searchbar from "./Searchbar";
import Button from "./Button";

export default function Navbar() {
  return (
    <div className="navbar-container">
      <Logo />
      <Searchbar />
      <div className="call-actions-container">
        <Button>Sign In</Button>
        <Button isActive="active">Sign Up</Button>
      </div>
    </div>
  );
}
