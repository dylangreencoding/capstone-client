import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="container">
      <header>
        <h1>Capstone</h1>
      </header>
      <main>
        <h2>Welcome</h2>
        <p>
          This is prototype demonstration for a tabletop gaming platform. I used
          this as my final project for Coding Temple's{" "}
          <a
            href="https://www.codingtemple.com/software-engineering/"
            className="a-bold"
            target="_blank"
          >
            software engineering program
          </a>
          .
        </p>
        <p>
          {" "}
          It is still in development, but it can already do some pretty cool
          stuff. Let me know what you think.
        </p>
        <div>
          <p>
            <Link to={"/Login"} replace={true} className="link">
              Log In &rarr;
            </Link>
          </p>
          <p>
            <Link to={"/CreateAccount"} replace={true} className="link">
              Create Account
            </Link>
          </p>
        </div>
        <p style={{ fontSize: "1.2rem" }}>
          This app has not been through Google's{" "}
          <a
            className="a-bold"
            style={{ fontSize: "1.2rem" }}
            href="https://support.google.com/cloud/answer/7454865?hl=en"
            target="_blank"
          >
            app verification process
          </a>{" "}
          yet, so the token used to access the Gmail API is revoked after seven
          days. If you run into any trouble during account creation, please let
          me know, and I will pop in a fresh token for you. In the meantime,
          here is the{" "}
          <Link to={"/capstone_user_account"} replace={true} className="link">
            dashboard
          </Link>
          . Click where it says 'blank', in the bottom right corner of the
          window.
        </p>
        <ul className="mb24">
          <li>
            UI rendered with{" "}
            <a className="a-bold" href="https://react.dev/" target="_blank">
              React
            </a>
            , and written in{" "}
            <a
              className="a-bold"
              href="https://www.typescriptlang.org/"
              target="_blank"
            >
              Typescript
            </a>
            .
          </li>
          <li>
            API built with{" "}
            <a className="a-bold" href="https://expressjs.com" target="_blank">
              Express
            </a>{" "}
            {"("}
            <a className="a-bold" href="https://nodejs.org/en" target="_blank">
              Node.js
            </a>
            {")"}.
          </li>
          <li>
            <a
              className="a-bold"
              href="https://www.harperdb.io/"
              target="_blank"
            >
              HarperDB
            </a>{" "}
            for the database.{" "}
            <a
              className="a-bold"
              href="https://www.harperdb.io/post/hern-stack-comin-in-hot"
              target="_blank"
            >
              HERN
            </a>{" "}
            stack.
          </li>
          <li>
            <a className="a-bold" href="https://socket.io/" target="_blank">
              Socket.IO
            </a>{" "}
            to provide realtime connectivity to games.
          </li>
          <li>
            <a
              className="a-bold"
              href="https://jwt.io/introduction/"
              target="_blank"
            >
              JWT
            </a>{" "}
            authentication,{" "}
            <a
              className="a-bold"
              href="https://nodemailer.com/about/"
              target="_blank"
            >
              Nodemailer
            </a>{" "}
            for email verification and password recovery.
          </li>
          <li>
            The gameboard is drawn using{" "}
            <a
              className="a-bold"
              href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D"
              target="_blank"
            >
              CanvasRenderingContext2D
            </a>
            .
          </li>
          <li>
            The moveable selectable grid is produced using hashing functions. A
            line-intersection algorithm provides rudimentary collision
            detection.
          </li>
        </ul>
        <p>
          I could talk for days about the development process. This is meant to
          be open-source, in the traditional spirit of tabletop roleplaying
          games. Next comes modularizing the code, to make it more accessible to
          multi-person development.
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
