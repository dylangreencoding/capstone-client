import { useState, useEffect } from "react";
import { userRoute } from "../../../../expressAPI/user-route";
import SelectedBox from "./display/selected-box";
//
import MapHeader from "./display/map-header";
//
import { mapToolDescriptions } from "../../../object-templates";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  if (!props.savedGame) {
    props.setTab("options");
  }

  // gameRoomId and userEmail component scoped variables, based on state
  // for use in structuring syntax, used throughout for consistency
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
    setLoading(true);
    try {
      const currentGameMap = props.savedGame;
      currentGameMap.currentMap = {};
      currentGameMap.selected = {};
      currentGameMap.tool = "none";

      if (message.length > 0) {
        currentGameMap.messages.push(`${props.user.user.name}: ${message}`);
      }
      setMessage("");
      console.log("GAMEMAP", currentGameMap);
      const route = "game/save";
      const response = await userRoute(
        route,
        props.accessToken,
        currentGameMap
      );
      await props.getUserData();
      props.setSavedGame(response.game);
      const game = response.game;

      props.socket.emit("send_game", { game });
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  };

  const handleRemovePlayer = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    try {
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
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  };

  const handlePlacePlayer = (e: any) => {
    const currentGame = props.savedGame;
    let unplaced;
    for (const key of Object.keys(currentGame.entities)) {
      if (key === e.target.value) {
        unplaced = true;
      }
    }

    if (unplaced === true) {
      currentGame.tool = e.target.value;
    } else {
      currentGame.tool = "none";
      let placed;
      for (const key of Object.keys(currentGame.entities)) {
        if (currentGame.entities[key].maker === e.target.value) {
          currentGame.selected.x = currentGame.entities[key].x + currentGame.x;
          currentGame.selected.y = currentGame.entities[key].y + currentGame.y;
          placed = true;
        }
      }

      if (placed !== true) {
        currentGame.selected.x = undefined;
        currentGame.selected.y = undefined;
        alert("This player's piece is no longer on the board.");
      }
    }

    props.setSavedGame({ ...props.savedGame, currentGame });
  };

  const handlePickTool = (e: any) => {
    const currentGame = props.savedGame;
    currentGame.tool = e.target.value;
    props.setSavedGame({ ...props.savedGame, currentGame });
  };

  const displaySendGame = () => {
    if (message.length <= 0) {
      return <span className="small">Add a message before sending</span>;
    } else {
      return (
        <button type="submit" className="btn">
          send
        </button>
      );
    }
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
        name={name}
        setName={setName}
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
                  <span className="tb-heading">
                    {props.savedGame.players[playerId]}
                  </span>
                </div>
              ) : (
                <div>
                  <div className="flex-with-gap">
                    <span>{props.savedGame.players[playerId]}</span>
                    {1 === 1 ? (
                      <button
                        type="button"
                        value={playerId}
                        title={
                          props.savedGame.entities[playerId]
                            ? "Place this player's piece"
                            : "Select this player's piece"
                        }
                        onClick={handlePlacePlayer}
                        className={`btn ${
                          props.savedGame.tool === playerId ? `active` : ``
                        }`}
                      >
                        {props.savedGame.entities[playerId] ? "!" : "?"}
                      </button>
                    ) : (
                      <span></span>
                    )}
                    {props.savedGame.players[props.user.user.id] === "host" ? (
                      <button
                        className="btn"
                        type="button"
                        title="Remove this player"
                        value={playerId}
                        onClick={handleRemovePlayer}
                      >
                        -/-
                      </button>
                    ) : (
                      <span></span>
                    )}
                  </div>
                  <div>
                    {props.savedGame.tool === playerId ? (
                      <div className="tool-description-box">
                        <span>Place the player on the map by clicking</span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
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
          {props.savedGame.tool === "none" ? (
            <div className="tool-description-box">
              <span>{mapToolDescriptions[props.savedGame.tool]}</span>
            </div>
          ) : (
            ""
          )}
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
        {!loading ? (
          displaySendGame()
        ) : (
          <span className="small">Sending...</span>
        )}
      </form>
    </div>
  );
}
