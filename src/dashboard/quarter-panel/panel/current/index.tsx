import MapTools from "./map-tools";
import GameTools from "./game-tools";
import CharTools from "./char-tools";

interface Props {
  current: string;
  savedMap: any;
  setSavedMap: Function;
  user: any;
  getUser: Function;
  accessToken: string;
}

export default function Current (props: Props) {
  
  const displayCurrent = () => {
    if (props.current === 'map') {
      return <MapTools 
        savedMap={props.savedMap}
        setSavedMap={props.setSavedMap}
        user={props.user}
        getUser={props.getUser}
        accessToken={props.accessToken}
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