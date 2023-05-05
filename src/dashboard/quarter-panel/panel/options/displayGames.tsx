interface Props {
  setTab: Function;
  setCurrent: Function;

  setSavedGame: Function;

  accessToken: string;
  user: any;
  getUserData: Function;
}

export default function DisplayGames(props: Props) {
  // choose game
  const handleChooseGame = async (e: any) => {
    e.preventDefault();
    // see useGetUser.ts for comment
    const actualUserGames = await props.getUserData();

    let selectedGame;
    for (const game of props.user.games) {
      if (game.id === e.target.value) {
        selectedGame = game;
      }
    }

    // prevents you from clicking into a game you have been removed from
    if (actualUserGames.includes(e.target.value)) {
      props.setSavedGame(selectedGame);
      props.setCurrent("game");
      props.setTab("current");
    }
  };

  return (
    <ul>
      {props.user.games.map((game: any) => {
        return (
          <li key={game.id} className="flex-space-between">
            <div>
              <span className="hg">
                {game.players[props.user.user.id] === "host" ? "h " : "g "}
              </span>
              <button
                type="button"
                value={game.id}
                onClick={handleChooseGame}
                className="btn"
              >
                {game.name}
              </button>
            </div>
          </li>
        );
      })}
      {props.user.games.length > 0 ? <li /> : <li>- </li>}
    </ul>
  );
}
