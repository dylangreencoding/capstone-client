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

  accessToken: string;
  maps: any;
  user: any;
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

        accessToken={props.accessToken}
        user={props.user}
        maps={props.maps}
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