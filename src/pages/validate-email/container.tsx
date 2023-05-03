import { Link } from "react-router-dom";
import { useState } from "react";
import ValidateEmail from ".";

export default function ValidateEmailContainer() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="container">
      <header>
        <h1>Capstone</h1>
        <Link to={"/"} replace={true} className="link">
          Home
        </Link>
      </header>
      <main>
        <form className="auth-form">
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
        </form>
        <ValidateEmail email={email} password={password} />
      </main>
      <footer>
        <p>Copyright 2023 Dylan Green</p>
      </footer>
    </div>
  );
}
