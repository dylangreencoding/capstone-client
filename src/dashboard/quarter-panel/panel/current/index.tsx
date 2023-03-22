import MapTools from "./map-tools";
import GameTools from "./game-tools";
import CharTools from "./char-tools";

interface Props {
  current: string;
  savedMap: any;
  setSavedMap: Function;
  tool: string;
  setTool: Function
}

export default function Current (props: Props) {
  
  const displayCurrent = () => {
    if (props.current === 'map') {
      return <MapTools 
        savedMap={props.savedMap}
        setSavedMap={props.setSavedMap}
        tool={props.tool}
        setTool={props.setTool}
      />
    } else if (props.current === 'game') {
      return <GameTools />
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