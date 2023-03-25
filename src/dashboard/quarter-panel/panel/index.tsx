import Options from "./options"
import Current from "./current"

interface Props {
  tab: string;
  setTab: Function;
  current: string;
  setCurrent: Function;
  userEmail: string;
  savedMap: any;
  setSavedMap: Function;
  user: any;
  getUserData: Function;
  accessToken: string;
  maps: any;
}

export default function Panel (props: Props) {
  return (
    <div className="panel">
      {props.tab === 'options' ? 
      <Options 
        setCurrent={props.setCurrent}  
        setTab={props.setTab} 
        userEmail={props.userEmail}
        accessToken={props.accessToken}
        savedMap={props.savedMap}
        setSavedMap={props.setSavedMap}
        user={props.user}
        getUserData={props.getUserData}
        maps={props.maps}
        /> : 
        <Current 
        current={props.current}
        savedMap={props.savedMap}
        setSavedMap={props.setSavedMap}
        user={props.user}
        getUserData={props.getUserData}
        maps={props.maps}
        accessToken={props.accessToken}
        />}
    </div>
  )
}