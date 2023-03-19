import Options from "./options"
import Current from "./current"

interface Props {
  tab: string;
  setTab: Function;
  current: string;
  setCurrent: Function;
}

export default function Panel (props: Props) {
  return (
    <div className="panel">
      {props.tab === 'options' ? <Options setCurrent={props.setCurrent}/> : <Current current={props.current}/>}
    </div>
  )
}