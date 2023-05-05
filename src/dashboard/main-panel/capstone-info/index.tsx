export default function CapstoneInfo() {
  return (
    <div className="capstone-info">
      <h1 className="mb24">Capstone</h1>
      <main>
        <div className="small">
          This div doesn't scroll yet; make sure your viewport is big enough. 👍
        </div>
        <p>
          This game is under construction. The creators are on hiatus, resting
          their tired eyes. Currently you can:
        </p>
        <ol>
          <li>
            Create a <strong>MAP</strong>
          </li>
          <li>
            Add lines (provisional walls) and locations (provisional zombies)
          </li>
          <li>Lines can be removed using 'undo line'</li>
          <li>Locations can be removed using 'shoot'</li>
          <li>Rename your map, add features and click 'save'</li>
          <li>Click 'host game' to start a new game</li>
        </ol>
        <ol>
          <li>
            Create a <strong>CHARACTER</strong>
          </li>
          <li>Rename your character, increase its level and click 'save'</li>
          <li>
            Enter the Game ID that your friend gave you and click 'join game'
          </li>
        </ol>
        <ol>
          <li>
            Give the <strong>GAME ID</strong> to a friend so they can join your
            game
          </li>
          <li>
            Once they join, click their character's name to place it on the map
          </li>
          <li>
            Thereafter, clicking their character's name will select it on the
            board
          </li>
          <li>Chat, move pieces around, and shoot each other</li>
          <li>To delete a game you are hosting, first remove all players</li>
        </ol>
      </main>
      <footer>
        <p>Copyright 2023 Dylan Green</p>
      </footer>
    </div>
  );
}
