import { useState } from 'react';
//
import MainPanel from './main-panel';
import QuarterPanel from './quarter-panel';

export default function Dashboard () {

  // either map, game, or char
  // sets format of options tab and main panel
  // based on whether you are currently creating a map or character
  // or playing a game
  const [current, setCurrent] = useState<string>('map');

  return (
    <div className='dashboard'>
      <MainPanel 
        current={current}
      />
      <QuarterPanel 
        current={current}
        setCurrent={setCurrent}
      />
    </div>
  )
}