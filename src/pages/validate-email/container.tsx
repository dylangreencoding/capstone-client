import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ValidateEmail from ".";
import { resendValidationCode } from "../../expressAPI/email-v-code";

export default function ValidateEmailContainer() {
  const [email, setEmail] = useState<string>("");
  const [sendCount, setSendCount] = useState<number>(0);
  const [sendAgainIn, setSendAgainIn] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

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
        <form
          className="auth-form"
          onSubmit={async (e) => {
            e.preventDefault();
            if (sendAgainIn === 0) {
              setLoading(true);
              await resendValidationCode(email);
              setSendCount(() => sendCount + 1);
              setSendAgainIn(60);
              setLoading(false);
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
              {!loading ? (
                <span>
                  <button
                    type="submit"
                    className={
                      sendAgainIn > 0
                        ? "auth-button resend-code-btn inactive"
                        : "auth-button resend-code-btn"
                    }
                  >
                    {`send code ${sendCount > 0 ? `(sent ${sendCount})` : ``}`}
                  </button>
                  <span className="ml6">
                    {sendAgainIn > 0 ? `send again in ${sendAgainIn}` : ""}
                  </span>
                </span>
              ) : (
                <span className="small ml10"> Sending...</span>
              )}
            </div>
          </label>
          {sendCount > 0 ? (
            <div className="small">
              There should be a verification code in your email. If there is no
              code, the Gmail API OAuth probably expired (expires after 7 days
              while still in "testing"). Maybe try again. If you still don't get
              an email, let me know and I will pop a fresh token in for you.
            </div>
          ) : (
            <div></div>
          )}
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
