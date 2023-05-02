import { useState, useEffect } from "react";
import { userRoute } from "../../../../expressAPI/user-route";

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
    if (message.length > 0 && message.length < 20) {
      currentGameMap.messages.push(`${props.user.user.email}: ${message}`);
    }
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

  const getSelected = () => {
    const locationToString = (location: any) => {
      const x = location.x.toString();
      const y = location.y.toString();
      const xy = x.concat(" ", y);
      return xy;
    };

    let selected;
    if (
      props.savedGame.selected.x !== undefined &&
      props.savedGame.selected.y !== undefined
    ) {
      selected =
        props.savedGame.selectFrom[locationToString(props.savedGame.selected)];
      if (selected != undefined && selected.type) {
        return selected.type;
      } else if (selected != undefined && selected.name) {
        return selected.name;
      } else {
        return "empty square";
      }
    } else {
      return "none selected";
    }
  };

  const handlePlacePlayer = (e: any) => {
    // console.log(`playerID: ${e.target.value}`);
    const currentGame = props.savedGame;
    let unplaced = false;
    for (const key of Object.keys(currentGame.selectFrom)) {
      if (key === e.target.value) {
        unplaced = true;
      }
    }

    if (unplaced === true) {
      currentGame.tool = e.target.value;
    } else {
      currentGame.tool = "none";
      for (const key of Object.keys(currentGame.selectFrom)) {
        if (currentGame.selectFrom[key].maker === e.target.value) {
          currentGame.selected.x = currentGame.selectFrom[key].x;
          currentGame.selected.y = currentGame.selectFrom[key].y;
        }
      }
    }

    props.setSavedGame({ ...props.savedGame, currentGame });
  };
  let playerNames: any = {};
  for (const key of Object.keys(props.savedGame.selectFrom)) {
    if (props.savedGame.players[props.savedGame.selectFrom[key].maker]) {
      playerNames[props.savedGame.selectFrom[key].maker] =
        props.savedGame.selectFrom[key].name;
    }
  }

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
        {props.savedGame.players[props.user.user.id] === "host" ? (
          <h3>{props.savedGame.id}</h3>
        ) : (
          <h3>{props.savedGame.name}</h3>
        )}
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

      <div>
        <div>
          {props.savedGame.players[props.user.user.id] === "host" ? (
            <ul className="mb24 tool-box">
              {Object.keys(props.savedGame.players).map((playerId: any) => {
                return (
                  <li key={playerId} className="flex-space-between">
                    <button
                      type="button"
                      value={playerId}
                      onClick={handlePlacePlayer}
                      className="btn"
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

          <div className="mb24">
            <div>
              {props.savedGame.selected.x}, {props.savedGame.selected.y}
            </div>
            <div>{getSelected()}</div>
          </div>

          <div className="mb24 tool-box">
            <div>
              <button
                type="button"
                className={`btn ${
                  props.savedGame.tool === "none" ? "active" : ""
                }`}
                value="none"
                onClick={handlePickTool}
              >
                select
              </button>
            </div>
            <div>
              <button
                type="button"
                className={`btn ${
                  props.savedGame.tool === "move" ? "active" : ""
                }`}
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
        </div>
        <form className="text-form tool-box" onSubmit={handleSendGame}>
          <input
            className="text-input"
            type="text"
            placeholder="20 character maximum"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="btn">
            send
          </button>
        </form>
      </div>
    </div>
  );
}
