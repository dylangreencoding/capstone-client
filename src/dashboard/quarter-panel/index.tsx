import Tabs from "./tabs";
import Panel from "./panel";

interface Props {
  current: string;
  setCurrent: Function;
  tab: string;
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



export default function QuarterPanel (props: Props) {
  
  return (
    <div className='quarter-panel'>
      <Panel 
        tab={props.tab}
        setTab={props.setTab}
        current={props.current}
        setCurrent={props.setCurrent}

        savedMap={props.savedMap}
        setSavedMap={props.setSavedMap}
        savedChar={props.savedChar}
        setSavedChar={props.setSavedChar}
        savedGame={props.savedGame}
        setSavedGame={props.setSavedGame}

        accessToken={props.accessToken}
        user={props.user}
        getUserData={props.getUserData}

        socket={props.socket}
      />
      <Tabs 
        tab={props.tab}
        setTab={props.setTab}
        current={props.current}
      />
    </div>
  )
}