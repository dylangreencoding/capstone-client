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
          This is prototype demo for a game platform I'm building. It is
          imagined as virtual interface for tabletop roleplaying.
        </p>
        <p>
          {" "}
          It is still in development, but it can already do some pretty cool
          stuff. Hope you like it!
        </p>
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

        <ul className="mb24">
          <li>
            The frontend uses{" "}
            <a className="a-bold" href="https://react.dev/" target="_blank">
              React
            </a>
            , and is written in{" "}
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
            The backend uses{" "}
            <a
              className="a-bold"
              href="https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs"
              target="_blank"
            >
              Express
            </a>
            , and is written in{" "}
            <a
              className="a-bold"
              href="https://en.wikipedia.org/wiki/ECMAScript"
              target="_blank"
            >
              ES6
            </a>
            .
          </li>
          <li>
            <a
              className="a-bold"
              href="https://www.harperdb.io/"
              target="_blank"
            >
              HarperDB
            </a>{" "}
            for the database.
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
        <ul className="mb24">
          <li>Recently optimizing grid, ui/ux</li>
          <li>
            Currently improving error handling, ensuring all error messages are
            passed from back end to front end successfully
          </li>
          <li>I could yap for days about my development process</li>
        </ul>
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
