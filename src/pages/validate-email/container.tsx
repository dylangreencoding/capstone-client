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
              try {
                const response = await resendValidationCode(email);
                alert(response.message);
                if (response.type === "200 OK") {
                  setSendCount(() => sendCount + 1);
                  setSendAgainIn(20);
                }
              } catch (error) {
                alert(error);
              }
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
          <div className="small">
            If the verification email fails to send, it is probably because the
            refresh token used to access the Gmail API was revoked (only lasts 7
            days for{" "}
            <a
              className="a-bold"
              style={{ fontSize: "1.2rem" }}
              href="https://support.google.com/cloud/answer/7454865?hl=en"
              target="_blank"
            >
              unverified apps
            </a>
            ). Let me know and I will pop in a fresh token for you.
          </div>
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
