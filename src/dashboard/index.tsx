import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
//
import { useGetUser } from '../custom-hooks/useGetUser';
//
import MainPanel from './main-panel';
import QuarterPanel from './quarter-panel';
//
import { refreshToken } from '../expressAPI/refresh-token';
//
import { io } from 'socket.io-client';
const socket = io('http://localhost:8080');
socket.on("connect_error", (e: any) => {
  console.log(e);
})
socket.on("connect", () => {
  console.log(socket.connected); // true
});

export default function Dashboard () {
  // get state from useNavigate called at login
  // call custom hook to GET user data (on component mount?)
  const location = useLocation();
  const [accessToken, setAccessToken] = useState<string>(location.state.accessToken);
  const { user, maps, chars, games, getUserData } = useGetUser(accessToken);

  
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


  // this needs to be called automatically before access token expires
  const handleRefreshToken = async (e: any) => {
    e.preventDefault();
    const response = await refreshToken();
    console.log('handleRefreshToken', response)
    // HERE: set new access token from response somewhat like this:
    // setAccessToken(response.accessToken);
  }

  return (
    <div className='dashboard'>
      {/* FOR TESTING REFRESH */}
      {/* <div>
        <button className='btn' type="button" onClick={handleRefreshToken}>
          REFRESH TOKEN
        </button>
      </div> */}
      
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

        socket={socket}
      />
    </div>
  )
}