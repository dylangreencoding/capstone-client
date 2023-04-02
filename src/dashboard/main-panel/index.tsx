import CharSheet from "./char-sheet";
import CapstoneInfo from "./capstone-info";

import CanvasCopy from "./canvas-copy";

interface Props {
  current: string;
  tab: string;

  savedMap: any;
  setSavedMap: Function;
  savedChar: any;
  setSavedChar: Function;

  accessToken: string;
  getUserData: Function;
}

export default function MainPanel (props: Props) {

  const displayMainPanel = () => {
    if (props.tab === 'options') {
      return <CapstoneInfo />
    } else if (props.tab === 'current' && props.current === 'char') {
      return <CharSheet 
        savedChar={props.savedChar}
        setSavedChar={props.setSavedChar}

        accessToken={props.accessToken}
        getUserData={props.getUserData}
      />
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