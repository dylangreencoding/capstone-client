import Canvas from "./canvas";
import CharSheet from "./char-sheet";
import CapstoneInfo from "./capstone-info";

import CanvasNoGrid from "./canvas-no-grid";
import CanvasCopy from "./canvas-copy";

interface Props {
  current: string;
  savedMap: any;
  tab: string;
  setSavedMap: Function;
}

export default function MainPanel (props: Props) {

  const displayMainPanel = () => {
    if (props.tab === 'options') {
      return <CapstoneInfo />
    } else if (props.tab === 'current' && props.current === 'char') {
      return <CharSheet />
    } else {
      return <CanvasCopy
        width={window.innerWidth * 0.75}
        height={window.innerHeight}
        savedMap={props.savedMap}
        setSavedMap={props.setSavedMap}
      />
    }
  }

  return (
    <div className='main-panel'>
      { displayMainPanel() }
    </div>
  )
}