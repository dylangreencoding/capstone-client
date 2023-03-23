import { useState } from 'react';
import { useLocation } from 'react-router-dom';
//
// import { getProtected } from '../server-calls/get-protected';
import { useGetData } from '../custom-hooks/useFetchData';
//
import MainPanel from './main-panel';
import QuarterPanel from './quarter-panel';

export default function Dashboard () {

  // sets options tab and main panel display
  const [current, setCurrent] = useState<string>('map');
  const [tab, setTab] = useState<string>('options')

  // TODO
  // replace with fetched map data
  const [savedMap, setSavedMap] = useState<any>({

    id: '',
    name: 'zombie road',

    x: 0, 
    y: 0, 
    scale: 25, 
    selected: { x: undefined, y: undefined },
    tool: 'none',

    width: 40,
    height: 20,
    
    walls: [],
    zombies: []
  });

  
  // get state from useNavigate called at login
  // call custom hook to GET user data (on component mount?)
  const location = useLocation();
  // *** COMMENT OUT FOR OFFLINE WORK *** \\
  const [accessToken, setAccessToken] = useState<string>(location.state.accessToken);
  const { data, getData } = useGetData(accessToken);
  console.log(data.email)

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
        userEmail={data.email}
        savedMap={savedMap}
        setSavedMap={setSavedMap}
      />
    </div>
  )
}