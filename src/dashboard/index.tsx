import { useState } from 'react';
import { useLocation } from 'react-router-dom';
//
import { useGetUser } from '../custom-hooks/useGetUser';
//
import MainPanel from './main-panel';
import QuarterPanel from './quarter-panel';

export default function Dashboard () {

  // get state from useNavigate called at login
  // call custom hook to GET user data (on component mount?)
  const location = useLocation();
  const [accessToken, setAccessToken] = useState<string>(location.state.accessToken);
  const { user, maps, getUserData } = useGetUser(accessToken);

  // sets options tab and main panel display
  const [current, setCurrent] = useState<string>('map');
  const [tab, setTab] = useState<string>('options')

  // blank map template
  const blankMap = {
    id: '',
    maker: '',
    name: 'Please choose a map',

    x: 0, 
    y: 0, 
    scale: 25, 
    selected: { x: undefined, y: undefined },
    tool: 'none',

    width: 2,
    height: 2,
    
    lines: [],
    locations: []
  }
  // might rename this
  const [savedMap, setSavedMap] = useState<any>(blankMap);

  return (
    <div className='dashboard'>
      <MainPanel 
        current={current}
        tab={tab}
        savedMap={savedMap}
        setSavedMap={setSavedMap}
      />
      <QuarterPanel 
        current={current}
        setCurrent={setCurrent}
        tab={tab}
        setTab={setTab}
        userEmail={user.email}
        savedMap={savedMap}
        setSavedMap={setSavedMap}
        user={user}
        getUserData={getUserData}
        accessToken={accessToken}
        maps={maps}
      />
    </div>
  )
}