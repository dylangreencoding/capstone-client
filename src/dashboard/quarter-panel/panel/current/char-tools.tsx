import { useState } from "react";
//
import { userRoute } from "../../../../expressAPI/user-route";
import { blankChar } from "../../../object-templates";

interface Props {
  current: string;
  setCurrent: Function;
  setTab: Function;

  savedChar: any;
  setSavedChar: Function;
  savedGame: any;
  setSavedGame: Function;

  accessToken: string;
  user: any;
  getUserData: Function;

  socket: any;
}

export default function CharTools(props: Props) {
  const [gameId, setGameId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleDeleteChar = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const route = "char/delete";
      await userRoute(route, props.accessToken, props.savedChar);
      await props.getUserData();

      // so you cannot view a character you just deleted
      props.setSavedChar(blankChar);
      props.setTab("options");
      props.setCurrent("map");
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  };

  const handleJoinGame = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const route = "game/join";
      const response = await userRoute(route, props.accessToken, {
        id: gameId,
        character: props.savedChar,
      });

      if (response.type === "200 OK") {
        await props.getUserData();

        const game = response.game[0];

        props.setSavedGame(game);
        props.socket.emit("send_game", { game });

        props.setCurrent("game");
        props.setTab("current");
      } else {
        alert(response.message);
      }
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  };

  const displayHostGame = () => {
    if (props.user.games.length < 2) {
      return (
        <button type="submit" className="btn">
          join game
        </button>
      );
    } else {
      return <span className="btn">-games full-</span>;
    }
  };

  return (
    <div>
      <div className="mb36">
        <div className="mb24 tool-box tool-box-border mt12">
          <div className="tb-header">
            <span className="tb-heading">{props.current.toUpperCase()}</span>
          </div>
          <div className="flex-space-between">
            <span style={{ overflow: "hidden" }}>{props.savedChar.name}</span>
            {!loading ? (
              <button
                type="button"
                value={props.savedChar.id}
                onClick={handleDeleteChar}
                className="svg-btn cancel"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            ) : (
              <span />
            )}
          </div>
          <div style={{ overflow: "hidden" }}>
            Level {props.savedChar.level}
          </div>
        </div>
      </div>
      <form className="text-form" onSubmit={handleJoinGame}>
        <label className="text-label">
          Game ID
          <input
            className="text-input"
            required
            minLength={1}
            maxLength={500}
            type="text"
            placeholder="221b2e95-ce8a-40d2-b0f1-96754196d657"
            title="Enter Game ID"
            value={gameId}
            onChange={(e) => setGameId(e.target.value.trim())}
          />
        </label>
        {!loading ? (
          displayHostGame()
        ) : (
          <span className="small">Loading...</span>
        )}
      </form>
    </div>
  );
}
