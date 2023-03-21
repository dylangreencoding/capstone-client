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
}

export default function Panel (props: Props) {
  return (
    <div className="panel">
      {props.tab === 'options' ? 
      <Options 
        setCurrent={props.setCurrent}  
        setTab={props.setTab} 
        userEmail={props.userEmail}
      /> : 
      <Current 
        current={props.current}
        savedMap={props.savedMap}
        setSavedMap={props.setSavedMap}
      />}
    </div>
  )
}