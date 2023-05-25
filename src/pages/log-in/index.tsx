import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//
import { logIn } from "../../expressAPI/log-in";

export default function LogIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      email: email,
      password: password,
    };
    try {
      const response = await logIn(data);
      console.log(response);
      sessionStorage.setItem(
        "accessToken",
        JSON.stringify(response.accessToken)
      );
      setLoading(false);
      alert(response.message);
      navigate("/capstone_user_account", { replace: true });
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Capstone</h1>
        <Link to={"/"} replace={true} className="link">
          Home
        </Link>
      </header>

      <main>
        <form className="auth-form" onSubmit={handleLogin}>
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
              Log In
            </button>
          ) : (
            <span className="small">Logging in...</span>
          )}
        </form>
      </main>
      <footer>
        <p>
          <Link to={"/ValidateEmail"} replace={true} className="link">
            Resend email verification / reset password
          </Link>
        </p>
        <p>
          <Link to={"/CreateAccount"} replace={true} className="link">
            Create Account
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
