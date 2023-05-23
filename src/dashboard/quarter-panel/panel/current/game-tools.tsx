import { useState, useEffect } from "react";
import { userRoute } from "../../../../expressAPI/user-route";
import SelectedBox from "./display/selected-box";
//
import MapHeader from "./display/map-header";

interface Props {
  setTab: Function;
  current: string;
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
          currentGame.selected.x = currentGame.entities[key].x + currentGame.x;
          currentGame.selected.y = currentGame.entities[key].y + currentGame.y;
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

  return (
    <div className="game-tools">
      <MapHeader
        setTab={props.setTab}
        current={props.current}
        setCurrent={props.setCurrent}
        map_={props.savedGame}
        setMap_={props.setSavedGame}
        accessToken={props.accessToken}
        user={props.user}
        socket={props.socket}
      />
      <div>
        {props.savedGame.players[props.user.user.id] === "host" ? (
          <div className="mb24 tool-box">
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

      <ul className="mb24 tool-box tool-box-border">
        {Object.keys(props.savedGame.players).map((playerId: any) => {
          return (
            <li key={playerId}>
              {props.savedGame.players[playerId] === "host" ? (
                <div className="tb-header">
                  <span className="tb-heading">Players</span>
                </div>
              ) : (
                <div className="flex-with-gap">
                  <span>{playerNames[playerId]}</span>
                  <button
                    type="button"
                    value={playerId}
                    title="Select Character"
                    onClick={handlePlacePlayer}
                    className={
                      props.savedGame.tool === playerId ? `btn active` : `btn`
                    }
                  >
                    select
                  </button>
                  {props.savedGame.players[props.user.user.id] === "host" ? (
                    <button
                      className="btn"
                      type="button"
                      title="Remove Player"
                      value={playerId}
                      onClick={handleRemovePlayer}
                    >
                      remove
                    </button>
                  ) : (
                    <span></span>
                  )}
                </div>
              )}
            </li>
          );
        })}
        <li>- </li>
      </ul>

      <div className="mb24 tool-box tool-box-border">
        <div className="tb-header">
          <span className="tb-heading">Tools</span>
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
      </div>

      <SelectedBox map_={props.savedGame} setMap_={props.setSavedGame} />

      {/* chat message input and send button */}
      <form className="text-form tool-box" onSubmit={handleSendGame}>
        <input
          className="text-input"
          type="text"
          placeholder="hello"
          title="1 - 40 characters"
          required
          minLength={1}
          maxLength={40}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {message.length > 0 ? (
          <button type="submit" className="btn">
            send
          </button>
        ) : (
          <span className="small">Please enter a message</span>
        )}
      </form>
    </div>
  );
}
