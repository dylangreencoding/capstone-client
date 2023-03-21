import { useState } from 'react';
import { useLocation } from 'react-router-dom';
//
// import { getProtected } from '../server-calls/get-protected';
import { useGetData } from '../custom-hooks/useFetchData';
//
import MainPanel from './main-panel';
import QuarterPanel from './quarter-panel';

export default function Dashboard () {

  // either map, game, or char
  // sets format of options tab and main panel
  // based on whether you are currently creating a map or character
  // or playing a game
  const [current, setCurrent] = useState<string>('map');

  // getting data from useNavigate called at login
  const location = useLocation();
  const [accessToken, setAccessToken] = useState<string>(location.state.accessToken);

  // custom hook to GET user data on component mount (I think)
  const { data, getData } = useGetData(accessToken);
  console.log(data.email);
  // TODO function to format data better, reformat data after fetching

  return (
    <div className='dashboard'>
      <MainPanel 
        current={current}
      />
      <QuarterPanel 
        current={current}
        setCurrent={setCurrent}
        userEmail={data.email}
      />
    </div>
  )
}