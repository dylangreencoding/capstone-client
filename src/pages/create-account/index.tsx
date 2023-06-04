import { useState } from "react";
import { Link } from "react-router-dom";
//
import { createAccount } from "../../expressAPI/create-account";
import ValidateEmail from "../validate-email";

export default function CreateAccount() {
  const [name, setName] = useState<string>("");
  const [birthYear, setBirthYear] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [enterCodeNow, setEnterCodeNow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateAccount = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      name: name,
      birthYear: birthYear,
      email: email,
    };
    try {
      const response = await createAccount(data);
      alert(response.message);
      if (response.type === "200 OK" || response.type === "502 Bad Gateway") {
        setEnterCodeNow(true);
      }
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  };

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
        <h2>Create Account</h2>
        <p>
          You will be asked to retrieve the verification code from your email.
        </p>
        <form className="auth-form" onSubmit={handleCreateAccount}>
          <label className="auth-label">
            Name
            <input
              className="auth-input"
              required
              type="text"
              minLength={3}
              maxLength={20}
              title="3 - 20 characters"
              placeholder="Elvis"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="auth-label">
            Birth Year
            <input
              className="auth-input"
              required
              type="text"
              pattern="[0-9]{4}"
              maxLength={4}
              title="4 digit number"
              placeholder="1935"
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
            />
          </label>
          <label className="auth-label">
            Email
            <input
              className="auth-input"
              required
              type="email"
              title="Enter email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          {!loading ? (
            !enterCodeNow ? (
              <button className="auth-button" type="submit">
                Create Account
              </button>
            ) : (
              <span className="small">
                If the verification email failed to send, it is probably because
                the refresh token used to access the Gmail API was revoked (only
                lasts 7 days for{" "}
                <a
                  className="a-bold"
                  style={{ fontSize: "1.2rem" }}
                  href="https://support.google.com/cloud/answer/7454865?hl=en"
                  target="_blank"
                >
                  unverified apps
                </a>
                ). You might try to{" "}
                <Link
                  to={"/ValidateEmail"}
                  replace={true}
                  className="link"
                  title="Resend Verification Code"
                >
                  resend the code
                </Link>
                . If you still don't get an email, let me know and I will pop in
                a fresh token for you.
              </span>
            )
          ) : (
            <span className="small">Loading...</span>
          )}
        </form>
        {enterCodeNow ? <ValidateEmail email={email} /> : <div></div>}
      </main>
      <footer>
        <p>
          <Link to={"/ValidateEmail"} replace={true} className="link">
            Resend email verification / reset password
          </Link>
        </p>
        <p>
          <Link to={"/LogIn"} replace={true} className="link">
            Login
          </Link>
        </p>
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
