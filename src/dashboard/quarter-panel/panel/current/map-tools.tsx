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
  const handleSaveMap = async (e: any) => {
    e.preventDefault();
    const currentMap = props.savedMap;
    currentMap.currentMap = {};
    currentMap.tool = "none";

    const route = "map/save";
    await userRoute(route, props.accessToken, currentMap);
    await props.getUserData();

    props.setSavedMap(currentMap);
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
        <form className="text-form tool-box" onSubmit={handleSaveMap}>
          <div className="flex-with-gap">
            <button type="submit" className="btn">
              save
            </button>
          </div>
          {props.user.games.length < 2 ? (
            <button type="button" className="btn" onClick={handleHostGame}>
              host game
            </button>
          ) : (
            <span className="btn">-games full-</span>
          )}
        </form>
      </div>
    </div>
  );
}
