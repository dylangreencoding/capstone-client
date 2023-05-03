import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//
import { createAccount } from "../../expressAPI/create-account";
import ValidateEmail from "../validate-email";

export default function CreateAccount() {
  const [name, setName] = useState<string>("");
  const [birthYear, setBirthYear] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [enterCodeNow, setEnterCodeNow] = useState<boolean>(false);

  const handleCreateAccount = async (e: any) => {
    e.preventDefault();
    const data = {
      name: name,
      birthYear: birthYear,
      email: email,
      password: password,
    };
    try {
      const response = await createAccount(data);
      alert(response.message);
      setEnterCodeNow(true);
    } catch (error) {
      alert("Account may already exist, try logging in");
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
              placeholder="!@#$%^&*"
              minLength={8}
              maxLength={20}
              title="8 - 20 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {!enterCodeNow ? (
            <button className="auth-button" type="submit">
              Create New Account
            </button>
          ) : (
            <span />
          )}
        </form>
        {enterCodeNow ? (
          <ValidateEmail email={email} password={password} />
        ) : (
          <div />
        )}
      </main>
      <footer>
        <p>
          <Link to={"/LogIn"} replace={true} className="link">
            Already have an account?
          </Link>
        </p>
        <p>
          <Link to={"/ValidateEmail"} replace={true} className="link">
            Enter email validation code
          </Link>
        </p>
        <p>Copyright 2023 Dylan Green</p>
      </footer>
    </div>
  );
}
