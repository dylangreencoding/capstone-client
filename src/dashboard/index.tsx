import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
//
import { useGetUser } from '../custom-hooks/useGetUser';
//
import MainPanel from './main-panel';
import QuarterPanel from './quarter-panel';
//
import { refreshToken } from '../expressAPI/refresh-token';

interface Props {
  accessToken: string;
  socket: any;
}

export default function Dashboard (props: Props) {
  console.log('dash rendered')
  
  const { user, maps, chars, games, getUserData } = useGetUser(props.accessToken);
  
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

        accessToken={props.accessToken}
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

        accessToken={props.accessToken}
        user={user}
        maps={maps}
        chars={chars}
        games={games}
        getUserData={getUserData}

        socket={props.socket}
      />
    </div>
  )
}