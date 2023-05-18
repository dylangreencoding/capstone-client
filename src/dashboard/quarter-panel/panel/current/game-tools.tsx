import { useState, useEffect } from "react";
import { userRoute } from "../../../../expressAPI/user-route";
//
import { getSelected } from "../../../get-selected";

interface Props {
  setTab: Function;
  setCurrent: Function;

  savedGame: any;
  setSavedGame: Function;

  accessToken: string;
  user: any;
  getUserData: Function;

  socket: any;
}

export default function GameTools(props: Props) {
  const [message, setMessage] = useState<string>("");
  let playerNames: any = {};
  for (const key of Object.keys(props.savedGame.entities)) {
    if (props.savedGame.players[props.savedGame.entities[key].maker]) {
      playerNames[props.savedGame.entities[key].maker] =
        props.savedGame.entities[key].name;
    }
  }

  const gameroomId = props.savedGame.id;
  const userEmail = props.user.user.email;
  gameroomId !== ""
    ? useEffect(() => {
        props.socket.emit("join_gameroom", { gameroomId, userEmail });

        props.socket.on("socket_message", (data: any) => {
          console.log("socket_message data", data);
        });

        props.socket.on("receive_game", (data: any) => {
          console.log("receive_game data", data);
          if (Object.keys(data.game.players).includes(props.user.user.id)) {
            props.setSavedGame(data.game);
          } else {
            props.setSavedGame({});
            props.setTab("options");
            props.setCurrent("map");
          }
        });

        return () => {
          // leave room
          props.socket.emit("leave_gameroom", { gameroomId, userEmail });
          // clean up socket event listeners
          props.socket.off("socket_message");
          props.socket.off("receive_game");
        };
      }, [props.socket])
    : console.log("no game id, no gameroom");

  const handleSendGame = async (e: any) => {
    e.preventDefault();
    const currentGameMap = props.savedGame;
    currentGameMap.currentMap = {};
    currentGameMap.selected = {};
    currentGameMap.tool = "none";

    let playerName = playerNames[props.user.user.id] || "HOST";

    if (message.length > 0) {
      currentGameMap.messages.push(`${playerName}: ${message}`);
    }
    setMessage("");
    console.log("GAMEMAP", currentGameMap);
    const route = "game/save";
    const response = await userRoute(route, props.accessToken, currentGameMap);
    await props.getUserData();
    props.setSavedGame(response.game);
    const game = response.game;

    props.socket.emit("send_game", { game });
  };

  const handlePickTool = (e: any) => {
    const currentGame = props.savedGame;
    currentGame.tool = e.target.value;
    props.setSavedGame({ ...props.savedGame, currentGame });
  };

  const handlePlacePlayer = (e: any) => {
    // console.log(`playerID: ${e.target.value}`);
    const currentGame = props.savedGame;
    let unplaced = false;
    for (const key of Object.keys(currentGame.entities)) {
      if (key === e.target.value) {
        unplaced = true;
      }
    }

    if (unplaced === true) {
      currentGame.tool = e.target.value;
    } else {
      currentGame.tool = "none";
      for (const key of Object.keys(currentGame.entities)) {
        if (currentGame.entities[key].maker === e.target.value) {
          currentGame.selected.x = currentGame.entities[key].x;
          currentGame.selected.y = currentGame.entities[key].y;
        }
      }
    }

    props.setSavedGame({ ...props.savedGame, currentGame });
  };

  const handleRemovePlayer = async (e: any) => {
    const playerId = e.target.value;
    // removes player from game,
    // effectively as if the player had left
    const route = "game/remove-player";
    const response = await userRoute(
      route,
      props.accessToken,
      props.savedGame,
      playerId
    );
    props.setSavedGame(response.game);
    const game = response.game;
    props.socket.emit("send_game", { game });
    await props.getUserData();
  };

  // delete a game
  const handleDeleteGame = async (e: any) => {
    e.preventDefault();
    let game = props.savedGame;
    const route = "game/delete";
    const response = await userRoute(route, props.accessToken, game);
    game = response.game[0];
    props.socket.emit("send_game", { game });

    // ...updates display...
    await props.getUserData();

    // so you cannot view a game you just left/deleted
    props.setSavedGame({});
    props.setTab("options");
    props.setCurrent("map");
  };

  return (
    <div className="game-tools">
      <div className="mb24 tool-box">
        <h3>{props.savedGame.name}</h3>
        <button
          type="button"
          value={props.savedGame.id}
          onClick={handleDeleteGame}
          className="btn"
        >
          {props.savedGame.players[props.user.user.id] === "host"
            ? "delete game"
            : "leave game"}
        </button>
      </div>
      <div className="mb24 tool-box">
        {props.savedGame.players[props.user.user.id] === "host" ? (
          <div>
            <div className="tb-header">
              <span className="tb-heading">game id</span>
            </div>

            <button
              type="button"
              title="copy to clipboard"
              value={props.savedGame.id}
              onClick={(e) => {
                navigator.clipboard.writeText(props.savedGame.id);
              }}
              className="btn small"
            >
              <div className="small">{props.savedGame.id}</div>
            </button>
          </div>
        ) : (
          <span />
        )}
      </div>

      {props.savedGame.players[props.user.user.id] === "host" ? (
        <ul className="mb24 tool-box tool-box-border">
          <div className="tb-header">
            <span className="tb-heading">players</span>
          </div>
          {Object.keys(props.savedGame.players).map((playerId: any) => {
            return (
              <li key={playerId} className="flex-space-between">
                <button
                  type="button"
                  value={playerId}
                  onClick={handlePlacePlayer}
                  className={
                    props.savedGame.tool === playerId ? `btn active` : `btn`
                  }
                >
                  {props.savedGame.players[playerId] === "host"
                    ? props.savedGame.players[playerId]
                    : playerNames[playerId]}
                </button>
                {props.savedGame.players[playerId] === "host" ? (
                  <span />
                ) : (
                  <button
                    className="btn"
                    type="button"
                    value={playerId}
                    onClick={handleRemovePlayer}
                  >
                    remove
                  </button>
                )}
              </li>
            );
          })}
          <li>- </li>
        </ul>
      ) : (
        <ul className="mb24"></ul>
      )}

      <div className="mb24 tool-box">
        <div>
          <strong>{getSelected(props.savedGame)}</strong>
        </div>
        <div>
          <small>
            {props.savedGame.selected.x}, {props.savedGame.selected.y}
          </small>
        </div>
      </div>

      <div className="mb24 tool-box tool-box-border">
        <div className="tb-header">
          <span className="tb-heading">map tools</span>
        </div>
        <div>
          <button
            type="button"
            className={`btn ${props.savedGame.tool === "none" ? "active" : ""}`}
            value="none"
            onClick={handlePickTool}
          >
            select
          </button>
        </div>
        <div>
          <button
            type="button"
            className={`btn ${props.savedGame.tool === "move" ? "active" : ""}`}
            value="move"
            onClick={handlePickTool}
          >
            move
          </button>
        </div>
        <div>
          <button
            type="button"
            className={`btn ${
              props.savedGame.tool === "shoot" ? "active" : ""
            }`}
            value="shoot"
            onClick={handlePickTool}
          >
            shoot
          </button>
        </div>
      </div>

      {/* chat message input and send button */}
      <form className="text-form tool-box" onSubmit={handleSendGame}>
        <input
          className="text-input"
          type="text"
          placeholder="hello"
          title="1 - 40 characters"
          minLength={1}
          maxLength={40}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="btn">
          send
        </button>
      </form>
    </div>
  );
}
