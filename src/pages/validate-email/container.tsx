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
        <div>
          <Link
            to={"/"}
            replace={true}
            className="link"
            style={{ borderBottom: "none" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
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
              while still in "testing"). Make sure your email is spelled
              correctly. If you still don't get an email, let me know and I will
              pop in a fresh token for you.
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
