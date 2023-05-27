export default function CapstoneInfo() {
  return (
    <div className="capstone-info">
      <h1 className="mb24">Capstone</h1>
      <main>
        <p>Below are some brief usage guidlines, please experiment.</p>
        <ol>
          <li>
            Create a new map,{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"
                clipRule="evenodd"
              />
            </svg>
          </li>
          <li>Rename your map, add walls and pieces and click 'save'</li>
          <li>Click 'host game' to start a new game</li>
        </ol>
        <ol>
          <li>
            Create a new character,{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"
                clipRule="evenodd"
              />
            </svg>
          </li>
          <li>Rename your character, increase its level and click 'save'</li>
          <li>
            Enter the game ID that your friend gave you and click 'join game'
          </li>
        </ol>
        <ol>
          <li>Give your game's ID to a friend so they can join your game</li>
          <li>
            Place their piece on the board using the '
            <strong className="btn">!</strong>'
          </li>
          <li>Chat, move pieces around, and shoot each other</li>
        </ol>
      </main>
      <footer>
        <p>Copyright 2023 Dylan Green</p>
      </footer>
    </div>
  );
}
