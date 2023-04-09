import Options from "./options"
import Current from "./current"

interface Props {
  tab: string;
  setTab: Function;
  current: string;
  setCurrent: Function;

  savedMap: any;
  setSavedMap: Function;
  savedChar: any;
  setSavedChar: Function;
  savedGame: any;
  setSavedGame: Function;

  accessToken: string;
  user: any;
  maps: any;
  chars: any;
  games: any;
  getUserData: Function;
}

export default function Panel (props: Props) {
  return (
    <div className="panel">
      {props.tab === 'options' ? 
      <Options 
        setCurrent={props.setCurrent}  
        setTab={props.setTab} 

        savedMap={props.savedMap}
        setSavedMap={props.setSavedMap}
        savedChar={props.savedChar}
        setSavedChar={props.setSavedChar}
        savedGame={props.savedGame}
        setSavedGame={props.setSavedGame}


        accessToken={props.accessToken}
        user={props.user}
        maps={props.maps}
        chars={props.chars}
        games={props.games}
        getUserData={props.getUserData}
        /> : 
        <Current 
        current={props.current}
        setCurrent={props.setCurrent}
        setTab={props.setTab}

        savedMap={props.savedMap}
        setSavedMap={props.setSavedMap}
        savedChar={props.savedChar}
        setSavedChar={props.setSavedChar}
        savedGame={props.savedGame}
        setSavedGame={props.setSavedGame}

        accessToken={props.accessToken}
        user={props.user}
        maps={props.maps}
        games={props.games}
        getUserData={props.getUserData}
        />}
    </div>
  )
}