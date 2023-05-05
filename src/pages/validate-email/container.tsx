import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ValidateEmail from ".";
import { resendValidationCode } from "../../expressAPI/email-v-code";

export default function ValidateEmailContainer() {
  const [email, setEmail] = useState<string>("");
  const [sendCount, setSendCount] = useState<number>(0);
  const [sendAgainIn, setSendAgainIn] = useState<number>(0);

  useEffect(() => {
    if (sendAgainIn > 0) {
      setTimeout(() => {
        setSendAgainIn(() => sendAgainIn - 1);
      }, 1000);
    }
  }, [sendCount, sendAgainIn]);

  return (
    <div className="container">
      <header>
        <h1>Capstone</h1>
        <Link to={"/"} replace={true} className="link">
          Home
        </Link>
      </header>
      <main>
        <h2>Verify Email / Reset Password</h2>
        <p>
          In case of some issue during account creation, use this form to resend
          the verification code.
        </p>
        <p>
          You can also use this form to reset your password and log in to your
          account.
        </p>
        <p>
          You will be asked to retrieve the verification code from your email.
        </p>
        <form
          className="auth-form"
          onSubmit={async (e) => {
            e.preventDefault();
            if (sendAgainIn === 0) {
              await resendValidationCode(email);
              setSendCount(() => sendCount + 1);
              setSendAgainIn(60);
            }
          }}
        >
          <label className="auth-label">
            Email
            <div>
              <input
                className="auth-input"
                required
                type="email"
                title="Enter email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className={
                  sendAgainIn > 0
                    ? "auth-button resend-code-btn inactive"
                    : "auth-button resend-code-btn"
                }
              >
                {`send verification code (sent ${sendCount})`}
              </button>
              <span className="ml6">
                {sendAgainIn > 0 ? `send again in ${sendAgainIn}` : ""}
              </span>
            </div>
          </label>
        </form>
        <ValidateEmail email={email} />
      </main>
      <footer>
        <p>
          <Link to={"/"} replace={true} className="link">
            Home
          </Link>
        </p>
        <p>Copyright 2023 Dylan Green</p>
      </footer>
    </div>
  );
}
