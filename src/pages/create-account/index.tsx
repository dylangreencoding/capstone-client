import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//
import { createAccount } from "../../expressAPI/create-account";
import { logIn } from "../../expressAPI/log-in";

export default function CreateAccount() {
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [birthYear, setBirthYear] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateAccount = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      name: name,
      birthYear: birthYear,
      email: email,
      password: password,
    };

    try {
      const response1 = await createAccount(data);

      // if account creation fails, return
      if (response1.type !== "200 OK") {
        alert(response1.message);
        setLoading(false);
        return;
      }

      const response = await logIn({
        email: data.email,
        password: data.password,
      });

      // if login successful
      if (response.type === "200 OK") {
        sessionStorage.setItem(
          "accessToken",
          JSON.stringify(response.accessToken)
        );
        alert(response.message);
        navigate("/capstone_user_account", { replace: true });
      } else {
        alert(response.message);
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
        <p>Please fill out the form below to create an account and login.</p>
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
          <label className="auth-label">
            Password
            <input
              className="auth-input"
              required
              type="password"
              minLength={8}
              maxLength={20}
              title="8 - 20 characters"
              placeholder="!@#$%^&*"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {!loading ? (
            <button className="auth-button" type="submit">
              Create Account & Login
            </button>
          ) : (
            <span className="small">Loading...</span>
          )}
        </form>
      </main>

      <footer>
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

        <p>
          Copyright &copy; 2023{" "}
          <a
            className="dylangreen"
            href="https://www.linkedin.com/in/dylangreencoding"
            target="_blank"
          >
            Dylan Green
          </a>
        </p>
      </footer>
    </div>
  );
}
