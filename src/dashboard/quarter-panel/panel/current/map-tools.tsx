import { useState } from "react";

interface Props {
  savedMap: any;
  setSavedMap: Function;
}

export default function MapTools (props: Props) {
  const [mapName, setmapName] = useState<string>('');

  const handlePickTool = (e: any) => {
    const currentMap = props.savedMap;
    currentMap.tool = e.target.value;
    props.setSavedMap({...props.savedMap, currentMap});
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

  const handleSubmitMap = (e: any) => {
    e.preventDefault();
    const currentMap = props.savedMap;
    currentMap.name = mapName;
    props.setSavedMap({...props.savedMap, currentMap});
    console.log(props.savedMap);
    // HERE: save map to database
  }

  return (
    <div className='map-tools'>
      
      <div className='mb36 flex-space-between'>
        <span>
          {props.savedMap.selected.x}, {props.savedMap.selected.y}
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
        <form className="text-form" onSubmit={handleSubmitMap}>
          <input 
            className='text-input' 
            type='text' 
            placeholder='*name your map*'
            value={mapName}
            onChange={ (e) => setmapName(e.target.value) }
          />
          <button type='submit' className="tool btn">save</button>
        </form>
      </div>
    </div>
  )
}