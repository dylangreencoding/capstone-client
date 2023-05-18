import { useState } from "react";
import { userRoute } from "../../../../expressAPI/user-route";
//
import { getSelected } from "../../../get-selected";

interface Props {
  setCurrent: Function;
  setTab: Function;

  savedMap: any;
  setSavedMap: Function;
  savedGame: any;
  setSavedGame: Function;

  accessToken: string;
  user: any;
  getUserData: Function;
}

export default function MapTools(props: Props) {
  const [mapName, setMapName] = useState<string>("");

  const handleSaveMap = async (e: any) => {
    e.preventDefault();
    const currentMap = props.savedMap;
    mapName.length > 0
      ? (currentMap.name = mapName)
      : (currentMap.name = currentMap.name);
    currentMap.currentMap = {};
    currentMap.tool = "none";

    const route = "map/save";
    await userRoute(route, props.accessToken, currentMap);
    await props.getUserData();

    setMapName("");
  };

  const handleHostGame = async (e: any) => {
    e.preventDefault();
    const gameMap = props.savedMap;
    gameMap.id = "";
    gameMap.messages = [];
    gameMap.players = {};
    gameMap.players[props.user.user.id] = "host";
    gameMap.currentMap = {};
    gameMap.selected = {};
    gameMap.tool = "none";

    const route = "game/save";
    const response = await userRoute(route, props.accessToken, gameMap);
    await props.getUserData();
    const currentGame = response.game;
    props.setSavedGame(currentGame);

    props.setCurrent("game");
    props.setTab("current");
  };

  const handlePickTool = (e: any) => {
    const currentMap = props.savedMap;
    currentMap.tool = e.target.value;
    props.setSavedMap({ ...props.savedMap, currentMap });
  };

  const handleUndoLine = (e: any) => {
    const currentMap = props.savedMap;
    currentMap.lines.pop();
    props.setSavedMap({ ...props.savedMap, currentMap });
  };

  return (
    <div className="map-tools">
      <div className="mb24 tool-box">
        <h3>{props.savedMap.name}</h3>
        {props.user.games.length < 2 ? (
          <button type="button" className="btn" onClick={handleHostGame}>
            host game
          </button>
        ) : (
          <span className="btn">-games full-</span>
        )}
      </div>

      <div>
        <div>
          <div className="mb24 tool-box">
            <div>
              <strong>{getSelected(props.savedMap)}</strong>
            </div>
            <div className="small">
              {props.savedMap.selected.x - props.savedMap.x},{" "}
              {props.savedMap.selected.y - props.savedMap.y}
            </div>
          </div>

          <div className="tool-box mb24 tool-box-border">
            <div className="tb-header">
              <span className="tb-heading">map tools</span>
            </div>
            <div>
              <button
                type="button"
                className={`btn ${
                  props.savedMap.tool === "none" ? "active" : ""
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
                  props.savedMap.tool === "add line" ? "active" : ""
                }`}
                value="add line"
                onClick={handlePickTool}
              >
                add line
              </button>
              <span>---</span>
              <button
                type="button"
                className="btn"
                value="undo-line"
                onClick={handleUndoLine}
              >
                undo line
              </button>
            </div>
            <div>
              <button
                type="button"
                className={`btn ${
                  props.savedMap.tool === "add location" ? "active" : ""
                }`}
                value="add location"
                onClick={handlePickTool}
              >
                add location
              </button>
            </div>
            <div>
              <button
                type="button"
                className={`btn ${
                  props.savedMap.tool === "move" ? "active" : ""
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
                  props.savedMap.tool === "shoot" ? "active" : ""
                }`}
                value="shoot"
                onClick={handlePickTool}
              >
                shoot
              </button>
            </div>
          </div>
        </div>
        <form className="text-form tool-box" onSubmit={handleSaveMap}>
          <input
            className="text-input"
            type="text"
            placeholder="my map name"
            minLength={1}
            maxLength={20}
            title="1 - 20 characters"
            value={mapName}
            onChange={(e) => setMapName(e.target.value)}
          />
          <button type="submit" className="btn">
            save
          </button>
        </form>
      </div>
    </div>
  );
}
