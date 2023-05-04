import { Link } from "react-router-dom";
import { useState } from "react";
import ValidateEmail from ".";
import { resendValidationCode } from "../../expressAPI/email-v-code";

export default function ValidateEmailContainer() {
  const [email, setEmail] = useState<string>("");
  const [sendCount, setSendCount] = useState<number>(0);

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
        <p>Retrieve the verification code from your email.</p>
        <p>Use it to set your password and log in to your account.</p>
        <p>
          Or if there was an issue during account creation, and you need to
          resend the verification code.
        </p>
        <form
          className="auth-form"
          onSubmit={async () => {
            await resendValidationCode(email);
            setSendCount(() => sendCount + 1);
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
              <button type="submit" className="auth-button resend-code-btn">
                {`send verification code (sent ${sendCount})`}
              </button>
            </div>
          </label>
        </form>
        <ValidateEmail email={email} />
      </main>
      <footer>
        <p>Copyright 2023 Dylan Green</p>
      </footer>
    </div>
  );
}
