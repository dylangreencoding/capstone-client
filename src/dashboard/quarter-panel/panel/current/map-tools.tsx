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
  const [changedName, setChangedName] = useState<boolean>(false);
  const entitiesBeforeChanges = useRef<string>(
    JSON.stringify(props.savedMap.entities)
  );
  const linesBeforeChanges = useRef<string>(
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
    entitiesBeforeChanges.current = JSON.stringify(currentMap.entities);
    linesBeforeChanges.current = JSON.stringify(currentMap.lines);
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

    setChangedName(false);
    setLoading(false);
  };

  const displaySaveMap = () => {
    if (
      JSON.stringify(props.savedMap.entities) !==
        entitiesBeforeChanges.current ||
      JSON.stringify(props.savedMap.lines) !== linesBeforeChanges.current
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
              <span className="small">loading...</span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
