import Canvas from "./canvas";
import CharSheet from "./char-sheet";
import CapstoneInfo from "./capstone-info";

interface Props {
  current: string;
  savedMap: any;
  tab: string;
  setSavedMap: Function;
  tool: string;
  setTool: Function;
}

export default function MainPanel (props: Props) {

  const displayMainPanel = () => {
    if (props.tab === 'options') {
      return <CapstoneInfo />
    } else if (props.tab === 'current' && props.current === 'char') {
      return <CharSheet />
    } else {
      return <Canvas 
        width={window.innerWidth * 0.75}
        height={window.innerHeight}
        savedMap={props.savedMap}
        setSavedMap={props.setSavedMap}
        tool={props.tool}
        setTool={props.setTool}
      />
    }
  }

  return (
    <div className='main-panel'>
      { displayMainPanel() }
    </div>
  )
}