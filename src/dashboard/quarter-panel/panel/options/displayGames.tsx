import { useState } from "react";

interface Props {
  setTab: Function;
  setCurrent: Function;

  setSavedGame: Function;

  accessToken: string;
  user: any;
  getUserData: Function;
}

export default function DisplayGames(props: Props) {
  const [loading, setLoading] = useState<boolean>(false);

  // choose game
  const handleChooseGame = async (e: any) => {
    e.preventDefault();
    // see useGetUser.ts for comment
    setLoading(true);
    try {
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
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  };

  return (
    <ul>
      {!loading ? (
        props.user.games.map((game: any) => {
          return (
            <li key={game.id}>
              <div>
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
        })
      ) : (
        <span className="small">Loading...</span>
      )}
      {props.user.games.length > 0 ? <li /> : <li>- </li>}
    </ul>
  );
}
