import InputDetails from "../components/InputDetails";
import AuthButton from "../components/AuthButton";
import { Link } from "react-router-dom";
import LogoTemp from "../components/LogoTemp";

export default function SignUp() {
  return (
    <div className="auth-page-main-container">
      <div className="logo-absolute-container">
        <LogoTemp />
      </div>
      <div className="auth-page-left-container">
        <div className="auth-page-fields-container">
          <div className="auth-page-title">Create your account</div>
          <InputDetails placeholder={"Email"} />
          <InputDetails placeholder={"Password"} />
          <InputDetails placeholder={"Confirm Password"} />
          <AuthButton>Create account</AuthButton>
          <div className="auth-page-privacy-notice-container">
            When you click 'create account', you agree with Render.io{" "}
            <a href="#" className="auth-links">
              Terms and Conditions
            </a>
            , and confirming that you've read our{" "}
            <a href="#" className="auth-links">
              Privacy Notice
            </a>
            .
          </div>
          <div className="auth-page-bottom-text-login">
            Already have an account?
            <Link to={"/login"} className="auth-links">
              Log in
            </Link>
          </div>
        </div>
      </div>
      <div className="auth-page-right-container">
        <img
          src="../../images/signin-image.jpg"
          alt="sign in"
          className="auth-page-image"
        />
      </div>
    </div>
  );
}
