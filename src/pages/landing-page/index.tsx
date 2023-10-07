import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="container">
      <header>
        <h1>Capstone</h1>
      </header>
      <main>
        <h2>9/27/2023</h2>
        <p>
          I used this as my "capstone" project for Coding Temple's{" "}
          <a
            href="https://www.codingtemple.com/software-engineering/"
            className="a-bold"
            target="_blank"
          >
            software engineering program
          </a>
          . It's intended to be a platform for tabletop roleplaying games.
        </p>
        <p>
          {" "}
          It's still in development, but it can already do some pretty cool
          stuff. It's not optimized for mobile devices or touchscreens. You
          might be able to get the gist from your phone, but I highly recommend
          viewing it from a desktop/laptop.
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
        <p>It's open source. Here are links to the github repos:</p>
        <ul className="mb24">
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
