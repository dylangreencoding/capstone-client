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
          This is intended to be a virtual platform for tabletop roleplaying
          games. I used an early version of this as my "capstone" project for
          Coding Temple's{" "}
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
          stuff. Let me know what you think, or if you find any bugs. Thank you
          to everyone who has tested this thing, you know who you are.
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
            for email verification/password recovery.
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
          This is intended to be open source, in the spirit of tabletop
          roleplaying. Below are links to the github repos. Have fun, be kind.
        </p>
        <ul>
          <li>
            <a
              className="a-bold"
              href="https://github.com/dylangreencoding/capstone-client"
              target="_blank"
            >
              React UI
            </a>
          </li>
          <li>
            <a
              className="a-bold"
              href="https://github.com/dylangreencoding/capstone-server"
              target="_blank"
            >
              Express API
            </a>
          </li>
        </ul>
      </main>
      <footer>
        <p>
          Copyright &copy; 2023{" "}
          <a
            className="dylangreen"
            href="https://www.linkedin.com/in/dylan-green-647248274"
            target="_blank"
          >
            Dylan Green
          </a>
        </p>
      </footer>
    </div>
  );
}
