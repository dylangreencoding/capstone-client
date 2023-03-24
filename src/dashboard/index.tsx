import { useState } from 'react';
import { useLocation } from 'react-router-dom';
//
// import { getProtected } from '../server-calls/get-protected';
import { useGetUser } from '../custom-hooks/useGetUser';
//
import MainPanel from './main-panel';
import QuarterPanel from './quarter-panel';

export default function Dashboard () {


  // get state from useNavigate called at login
  // call custom hook to GET user data (on component mount?)
  const location = useLocation();
  // *** COMMENT OUT FOR OFFLINE WORK *** \\
  const [accessToken, setAccessToken] = useState<string>(location.state.accessToken);
  const { user, maps, getUser } = useGetUser(accessToken);
  console.log('rendering dash', maps)

  // sets options tab and main panel display
  const [current, setCurrent] = useState<string>('map');
  const [tab, setTab] = useState<string>('options')

  // TODO
  // replace with fetched map data
  
  const blankMap = {
    id: '',
    maker: '',
    name: '',

    x: 0, 
    y: 0, 
    scale: 25, 
    selected: { x: undefined, y: undefined },
    tool: 'none',

    width: 40,
    height: 20,
    
    walls: [],
    zombies: []
  }
  const [savedMap, setSavedMap] = useState<any>('');


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
        getUser={getUser}
        accessToken={accessToken}
        maps={maps}
      />
    </div>
  )
}