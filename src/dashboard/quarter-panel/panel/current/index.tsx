import MapTools from "./map-tools";
import GameTools from "./game-tools";
import CharTools from "./char-tools";

interface Props {
  current: string;
  setCurrent: Function;
  setTab: Function;

  savedMap: any;
  setSavedMap: Function;
  savedChar: any;
  setSavedChar: Function;
  savedGame: any;
  setSavedGame: Function;

  accessToken: string;
  user: any;
  getUserData: Function;

  socket: any;
}

export default function Current(props: Props) {
  const displayCurrent = () => {
    if (props.current === "map") {
      return (
        <MapTools
          setTab={props.setTab}
          current={props.current}
          setCurrent={props.setCurrent}
          savedMap={props.savedMap}
          setSavedMap={props.setSavedMap}
          savedGame={props.savedGame}
          setSavedGame={props.setSavedGame}
          accessToken={props.accessToken}
          user={props.user}
          getUserData={props.getUserData}
        />
      );
    } else if (props.current === "game") {
      return (
        <GameTools
          setTab={props.setTab}
          current={props.current}
          setCurrent={props.setCurrent}
          savedGame={props.savedGame}
          setSavedGame={props.setSavedGame}
          accessToken={props.accessToken}
          user={props.user}
          getUserData={props.getUserData}
          socket={props.socket}
        />
      );
    } else if (props.current === "char") {
      return (
        <CharTools
          current={props.current}
          setCurrent={props.setCurrent}
          setTab={props.setTab}
          savedChar={props.savedChar}
          setSavedChar={props.setSavedChar}
          savedGame={props.savedGame}
          setSavedGame={props.setSavedGame}
          accessToken={props.accessToken}
          user={props.user}
          getUserData={props.getUserData}
          socket={props.socket}
        />
      );
    }
  };

  return <div className="current">{displayCurrent()}</div>;
}
