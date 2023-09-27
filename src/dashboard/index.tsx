import { useState, useEffect } from "react";
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
      <div className="orient-device">
        <div className="center-svg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="text-align-center small">
          Please use landscape view. This app is best viewed from a
          desktop/laptop.
        </div>
      </div>
    </div>
  );
}
