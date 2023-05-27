import { useRef, useState } from "react";
//
import { userRoute } from "../../../../expressAPI/user-route";
//
import SelectedBox from "./display/selected-box";
import MapHeader from "./display/map-header";
import Tools from "./display/tools";

interface Props {
  setTab: Function;
  current: string;
  setCurrent: Function;

  savedMap: any;
  setSavedMap: Function;
  savedGame: any;
  setSavedGame: Function;

  accessToken: string;
  user: any;
  getUserData: Function;
}

export default function MapTools(props: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [nameBeforeChanges, setNameBeforeChanges] = useState<string>(
    JSON.stringify(props.savedMap.name)
  );
  const [entitiesBeforeChanges, setEntitiesBeforeChanges] = useState<string>(
    JSON.stringify(props.savedMap.entities)
  );
  const [linesBeforeChanges, setLinesBeforeChanges] = useState<string>(
    JSON.stringify(props.savedMap.lines)
  );

  const handleSaveMap = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const currentMap = props.savedMap;
    currentMap.currentMap = {};
    currentMap.tool = "none";

    const route = "map/save";
    await userRoute(route, props.accessToken, currentMap);
    await props.getUserData();
    props.setSavedMap(currentMap);
    setEntitiesBeforeChanges(JSON.stringify(currentMap.entities));
    setLinesBeforeChanges(JSON.stringify(currentMap.lines));
    setNameBeforeChanges(JSON.stringify(props.savedMap.name));
    setLoading(false);
  };

  const handleHostGame = async (e: any) => {
    e.preventDefault();
    setLoading(true);
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

    setLoading(false);
  };

  const displaySaveMap = () => {
    if (props.savedMap.maker === "") {
      return (
        <span className="small">
          - this is a dead map, create a new map in order to save -
        </span>
      );
    }
    if (
      JSON.stringify(props.savedMap.entities) !== entitiesBeforeChanges ||
      JSON.stringify(props.savedMap.lines) !== linesBeforeChanges ||
      JSON.stringify(props.savedMap.name) !== nameBeforeChanges
    ) {
      return (
        <button type="submit" className="btn" title="Save">
          save
        </button>
      );
    } else {
      return <span className="small">- no changes to save -</span>;
    }
  };

  const displayHostGame = () => {
    if (props.user.games.length < 2) {
      return (
        <button
          type="button"
          className="btn"
          onClick={handleHostGame}
          title="Max 2"
        >
          host game
        </button>
      );
    } else {
      return (
        <div>
          <span className="small" title="Max 2">
            - games full -
          </span>
        </div>
      );
    }
  };

  return (
    <div className="map-tools">
      <MapHeader
        setTab={props.setTab}
        current={props.current}
        setCurrent={props.setCurrent}
        map_={props.savedMap}
        setMap_={props.setSavedMap}
        accessToken={props.accessToken}
        user={props.user}
        socket={null}
        name={name}
        setName={setName}
      />
      <div>
        <Tools map_={props.savedMap} setMap_={props.setSavedMap} />
        <SelectedBox map_={props.savedMap} setMap_={props.setSavedMap} />
        <form
          className="text-form tool-box tool-box-border"
          onSubmit={handleSaveMap}
        >
          <div>
            {!loading ? (
              <div className="flex-space-between">
                <div>{displaySaveMap()}</div>
                <div>{displayHostGame()}</div>
              </div>
            ) : (
              <span className="small">Loading...</span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
