import { useEffect, useState } from "react";


interface Props {
  savedMap: any;
  setSavedMap: Function;
  user: any;
  getUser: Function;
  accessToken: string;
  map: any;
}

export default function MapTools (props: Props) {
  // console.log('saved map', props.savedMap)

  const [mapName, setmapName] = useState<string>('');

  // useEffect(() => console.log(props.savedMap), [props.savedMap, props.setSavedMap]);

  let currentMap = props.savedMap;

  const handleSubmitMap = (e: any) => {
    e.preventDefault();
    currentMap.name = mapName;
    // saveMap();
    // currentMap = map;
    currentMap.map = []
    props.setSavedMap({...props.savedMap, currentMap});
  }

  const handlePickTool = (e: any) => {
    const currentMap = props.savedMap;
    currentMap.tool = e.target.value;
    props.setSavedMap({...props.savedMap, currentMap});
    console.log(props.savedMap)
  }

  const handleUndoWall = (e: any) => {
    const currentMap = props.savedMap;
    currentMap.walls.pop();
    props.setSavedMap({...props.savedMap, currentMap});
  }

  const handleUndoZombie = (e: any) => {
    const currentMap = props.savedMap;
    currentMap.zombies.pop();
    props.setSavedMap({...props.savedMap, currentMap});
  }


  return (
    <div className='map-tools'>
      
      <div className='mb36 flex-space-between'>
        <span>
          {props.savedMap.selected.x}, {props.savedMap.selected.y} , {props.savedMap.id}
        </span>
        <h3>{props.savedMap.name}</h3>
      </div>
      <div className='tools-body'>
        <div className='tool-box'>
          <div className="mb24">
            <button 
              type='button'
              className={`tool btn ${props.savedMap.tool === 'none' ? 'active' : ''}`}
              value='none'
              onClick={handlePickTool}
            >select</button>
          </div>
          <div className="flex-space-between mb24">
            <button 
              type='button'
              className={`tool btn ${props.savedMap.tool === 'add wall' ? 'active' : ''}`}
              value='add wall'
              onClick={handlePickTool}
            >add wall</button>
            <button 
              type='button'
              className='tool btn'
              value='undo-wall'
              onClick={handleUndoWall}
            >undo wall</button>
          </div>
          <div className="flex-space-between mb24">
            <button 
              type='button'
              className={`tool btn ${props.savedMap.tool === 'add zombie' ? 'active' : ''}`}
              value='add zombie'
              onClick={handlePickTool}
            >add zombie</button>
            <button 
              type='button'
              className='tool btn'
              value='undo-zombie'
              onClick={handleUndoZombie}
            >undo zombie</button>
          </div>
        </div>
        <form className="text-form" >
          <input 
            className='text-input' 
            type='text' 
            placeholder='*name your map*'
            value={mapName}
            onChange={ (e) => setmapName(e.target.value) }
          />
          <button type='button' onClick={handleSubmitMap} className="tool btn">save</button>
        </form>
      </div>
    </div>
  )
}