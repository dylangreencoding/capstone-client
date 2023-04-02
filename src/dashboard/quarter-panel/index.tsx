import { useState } from "react";
//
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

  accessToken: string;
  maps: any;
  user: any;
  chars: any;
  getUserData: Function;
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

        accessToken={props.accessToken}
        user={props.user}
        maps={props.maps}
        chars={props.chars}
        getUserData={props.getUserData}
      />
      <Tabs 
        tab={props.tab}
        setTab={props.setTab}
        current={props.current}
      />
    </div>
  )
}