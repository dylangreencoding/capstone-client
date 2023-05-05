import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="container">
      <header>
        <h1>Capstone</h1>
      </header>
      <main>
        <h2>What is Capstone?</h2>
        <p>
          This is a virtual battlemap for playing tabletop roleplaying games.
        </p>
        <p>Create maps and characters.</p>
        <p>Host and join games.</p>
        <p>
          <Link to={"/Login"} replace={true} className="link">
            Log In
          </Link>
        </p>
        <p>
          <Link to={"/CreateAccount"} replace={true} className="link">
            Create Account
          </Link>
        </p>
      </main>
      <footer>
        <p>
          <Link to={"/ValidateEmail"} replace={true} className="link">
            Resend email verification / reset password
          </Link>
        </p>
        <p>Copyright 2023 Dylan Green</p>
      </footer>
    </div>
  );
}
