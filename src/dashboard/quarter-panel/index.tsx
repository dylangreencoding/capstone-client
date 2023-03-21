import { useState } from "react";
//
import Tabs from "./tabs";
import Panel from "./panel";

interface Props {
  current: string;
  setCurrent: Function;
  userEmail: string;
}

export default function QuarterPanel (props: Props) {
  
  const [tab, setTab] = useState<string>('options')

  return (
    <div className='quarter-panel'>
      <Panel 
        tab={tab}
        setTab={setTab}
        current={props.current}
        setCurrent={props.setCurrent}
        userEmail={props.userEmail}
      />
      <Tabs 
        tab={tab}
        setTab={setTab}
      />
    </div>
  )
}