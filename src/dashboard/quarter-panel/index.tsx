import { useState } from "react";
//
import Tabs from "./tabs";
import Panel from "./panel";

interface Props {
  current: string;
  setCurrent: Function;
  tab: string;
  setTab: Function;
  userEmail: string;
  savedMap: any;
  setSavedMap: Function;
  user: any;
  getUser: Function;
  accessToken: string;
  maps: any;
}

export default function QuarterPanel (props: Props) {
  
  

  return (
    <div className='quarter-panel'>
      <Panel 
        tab={props.tab}
        setTab={props.setTab}
        current={props.current}
        setCurrent={props.setCurrent}
        userEmail={props.userEmail}
        savedMap={props.savedMap}
        setSavedMap={props.setSavedMap}
        user={props.user}
        getUser={props.getUser}
        accessToken={props.accessToken}
        maps={props.maps}
      />
      <Tabs 
        tab={props.tab}
        setTab={props.setTab}
        current={props.current}
      />
    </div>
  )
}