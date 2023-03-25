import MapTools from "./map-tools";
import GameTools from "./game-tools";
import CharTools from "./char-tools";

interface Props {
  current: string;
  savedMap: any;
  setSavedMap: Function;
  user: any;
  getUserData: Function;
  accessToken: string;
  maps: any;
}

export default function Current (props: Props) {
  
  const displayCurrent = () => {
    if (props.current === 'map') {
      return <MapTools 
        savedMap={props.savedMap}
        setSavedMap={props.setSavedMap}
        user={props.user}
        getUserData={props.getUserData}
        accessToken={props.accessToken}
        maps={props.maps}
      />
    } else if (props.current === 'game') {
      return <GameTools 
        savedMap={props.savedMap}
        setSavedMap={props.setSavedMap}
      />
    } else if (props.current === 'char') {
      return <CharTools />
    }
  }
  
  return (
    <div className='current'>
      {displayCurrent()}
    </div>
  )
}