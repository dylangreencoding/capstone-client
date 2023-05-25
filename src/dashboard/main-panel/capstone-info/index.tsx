export default function CapstoneInfo() {
  return (
    <div className="capstone-info">
      <h1 className="mb24">Capstone</h1>
      <main>
        <p>Below are some brief usage guidlines, please experiment.</p>
        <ol>
          <li>
            Create a <strong>Map</strong>
          </li>
          <li>Rename your map, add walls and pieces and click 'save'</li>
          <li>Click 'host game' to start a new game</li>
        </ol>
        <ol>
          <li>
            Create a <strong>Character</strong>
          </li>
          <li>Rename your character, increase its level and click 'save'</li>
          <li>
            Enter the Game ID that your friend gave you and click 'join game'
          </li>
        </ol>
        <ol>
          <li>
            Give the <strong>Game ID</strong> to a friend so they can join your
            game
          </li>
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
