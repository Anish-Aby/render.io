import InputDetails from "../components/InputDetails";
import AuthButton from "../components/AuthButton";
import { Link } from "react-router-dom";
import LogoTemp from "../components/LogoTemp";

export default function LogIn() {
  return (
    <div className="auth-page-main-container">
      <div className="logo-absolute-container">
        <LogoTemp />
      </div>
      <div className="auth-page-left-container">
        <div className="auth-page-fields-container">
          <div className="auth-page-title">Log in to Render.io</div>
          <InputDetails placeholder={"Email"} />
          <InputDetails placeholder={"Password"} />
          <AuthButton>Log in</AuthButton>
          <div className="auth-page-forgot-password">
            <Link to={"/reset-password"}>
              <div className="react-link">Forgot Password?</div>
            </Link>
          </div>
          <div className="auth-page-bottom-text-login">
            Don't have have an account?{" "}
            <Link to={"/signup"} className="auth-links">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="auth-page-right-container">
        <img
          src="../../images/login-image.jpg"
          alt="log in"
          className="auth-page-image"
        />
      </div>
    </div>
  );
}
