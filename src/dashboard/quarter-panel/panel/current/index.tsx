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
  maps: any;
  getUserData: Function;
}

export default function Current (props: Props) {
  
  const displayCurrent = () => {
    if (props.current === 'map') {
      return <MapTools 
        setCurrent={props.setCurrent}
        setTab={props.setTab}

        savedMap={props.savedMap}
        setSavedMap={props.setSavedMap}
        savedGame={props.savedGame}
        setSavedGame={props.setSavedGame}

        accessToken={props.accessToken}
        user={props.user}
        maps={props.maps}
        getUserData={props.getUserData}
      />
    } else if (props.current === 'game') {
      return <GameTools 
        savedGame={props.savedGame}
        setSavedGame={props.setSavedGame}
      />
    } else if (props.current === 'char') {
      return <CharTools 
        setCurrent={props.setCurrent}
        setTab={props.setTab}

        savedChar={props.savedChar}
        setSavedChar={props.setSavedChar}
      />
    }
  }
  
  return (
    <div className='current'>
      {displayCurrent()}
    </div>
  )
}