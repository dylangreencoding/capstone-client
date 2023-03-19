import MapTools from "./map-tools";
import GameTools from "./game-tools";
import CharTools from "./char-tools";

interface Props {
  current: string;
}

export default function Current (props: Props) {

  const displayCurrent = () => {
    if (props.current === 'map') {
      return <MapTools />
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