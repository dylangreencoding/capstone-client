import { useState } from 'react';
import { useLocation } from 'react-router-dom';
//
import { useGetUser } from '../custom-hooks/useGetUser';
//
import MainPanel from './main-panel';
import QuarterPanel from './quarter-panel';
//
import { io } from 'socket.io-client';


export default function Dashboard () {

  // get state from useNavigate called at login
  // call custom hook to GET user data (on component mount?)
  const location = useLocation();
  const [accessToken, setAccessToken] = useState<string>(location.state.accessToken);
  const { user, maps, chars, games, getUserData } = useGetUser(accessToken);
  console.log(games)

// set up socket for each map
// need to rewrite this as a function that takes accessToken as argument
// const socket = io('http://localhost:8080', {
//   transportOptions: {
//     polling: {
//       extraHeaders: {
//         'Authorization': `${accessToken}`,
//       },
//     },
//   },
// });
  
  // sets options tab and main panel display
  const [current, setCurrent] = useState<string>('map');
  const [tab, setTab] = useState<string>('options')

  // blank map template
  const blankMap = {
    id: '',
    maker: '',
    name: 'please choose a map',

    x: 0, 
    y: 0, 
    scale: 25, 
    selected: { x: undefined, y: undefined },
    selectFrom: {},
    tool: 'none',

    width: 2,
    height: 2,
    
    lines: []
  }
  // blank char template
  const blankChar = {
    id: '',
    maker: '',
    name: 'please choose a character',

    x: -100, 
    y: -100, 
    
    level: 5
  }

  // might rename these
  const [savedMap, setSavedMap] = useState<any>(blankMap);
  const [savedChar, setSavedChar] = useState<any>(blankChar);
  const [savedGame, setSavedGame] = useState<any>(blankMap);

  return (
    <div className='dashboard'>
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

        accessToken={accessToken}
        getUserData={getUserData}
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

        accessToken={accessToken}
        user={user}
        maps={maps}
        chars={chars}
        games={games}
        getUserData={getUserData}
      />
    </div>
  )
}