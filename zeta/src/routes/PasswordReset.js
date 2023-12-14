import InputDetails from "../components/InputDetails";
import LogoTemp from "../components/LogoTemp";

export default function PasswordReset() {
  return (
    <>
      <div className="logo-absolute-container">
        <LogoTemp />
      </div>
      <div className="password-reset-main-container">
        <div className="reset-main-field">
          <div className="password-reset-title">Forgot your password?</div>
          <div className="password-reset-description">
            Enter the email address associated with your account and we'll send
            you a link to reset your password.
          </div>
          <InputDetails placeholder={"Email"} />
          <div className="password-reset-footer">
            If your email address exists in our database, you will receive a
            password recovery code at your email address in a few minutes
          </div>
          <button className="password-reset-btn">Send code</button>
        </div>
      </div>
    </>
  );
}
