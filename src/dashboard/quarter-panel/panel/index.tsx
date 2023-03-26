import Options from "./options"
import Current from "./current"

interface Props {
  tab: string;
  setTab: Function;
  current: string;
  setCurrent: Function;

  savedMap: any;
  setSavedMap: Function;

  accessToken: string;
  user: any;
  maps: any;
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

        accessToken={props.accessToken}
        user={props.user}
        maps={props.maps}
        getUserData={props.getUserData}
        /> : 
        <Current 
        current={props.current}

        savedMap={props.savedMap}
        setSavedMap={props.setSavedMap}

        accessToken={props.accessToken}
        user={props.user}
        maps={props.maps}
        getUserData={props.getUserData}
        />}
    </div>
  )
}