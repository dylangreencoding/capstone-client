import Canvas from "./canvas";
import CharSheet from "./char-sheet";

interface Props {
  current: string;
  savedMap: any;
  setSavedMap: Function;
}

export default function MainPanel (props: Props) {
  return (
    <div className='main-panel'>
      { props.current === 'char' ?
        <CharSheet /> :
        <Canvas 
          width={window.innerWidth * 0.75}
          height={window.innerHeight}
          savedMap={props.savedMap}
          setSavedMap={props.setSavedMap}
        />
      }
    </div>
  )
}