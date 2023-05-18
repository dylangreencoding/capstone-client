import { useState } from "react";
//
import MainPanel from "./main-panel";
import QuarterPanel from "./quarter-panel";
//
import { blankMap, blankChar } from "./object-templates";

interface Props {
  accessToken: string;

  user: any;
  getUserData: any;

  socket: any;
}

export default function Dashboard(props: Props) {
  console.log("dash rendered");

  // sets options tab and main panel display
  const [current, setCurrent] = useState<string>("map");
  const [tab, setTab] = useState<string>("options");

  // might rename these
  const [savedMap, setSavedMap] = useState<any>(blankMap);
  const [savedChar, setSavedChar] = useState<any>(blankChar);
  const [savedGame, setSavedGame] = useState<any>(blankMap);

  return (
    <div className="dashboard">
      <MainPanel
        current={current}
        setCurrent={setCurrent}
        tab={tab}
        savedMap={savedMap}
        setSavedMap={setSavedMap}
        savedChar={savedChar}
        setSavedChar={setSavedChar}
        savedGame={savedGame}
        setSavedGame={setSavedGame}
        accessToken={props.accessToken}
        getUserData={props.getUserData}
      />
      <QuarterPanel
        current={current}
        setCurrent={setCurrent}
        tab={tab}
        setTab={setTab}
        savedMap={savedMap}
        setSavedMap={setSavedMap}
        savedChar={savedChar}
        setSavedChar={setSavedChar}
        savedGame={savedGame}
        setSavedGame={setSavedGame}
        accessToken={props.accessToken}
        user={props.user}
        getUserData={props.getUserData}
        socket={props.socket}
      />
    </div>
  );
}
