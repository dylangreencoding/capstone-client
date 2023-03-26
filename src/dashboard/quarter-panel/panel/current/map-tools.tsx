import { useState } from "react";
import { updateMap } from "../../../../expressAPI/update-map";

interface Props {
  savedMap: any;
  setSavedMap: Function;

  accessToken: string;
  user: any;
  maps: any;
  getUserData: Function;
}

export default function MapTools (props: Props) {

  const [mapName, setmapName] = useState<string>(props.savedMap.name);

  let currentMap = props.savedMap;
  currentMap.name = mapName;
  currentMap.map = []
  const handleSubmitMap = async (e: any) => {
    e.preventDefault();
    await updateMap(props.accessToken, currentMap);

    // location.reload();
    await props.getUserData();
  }

  const handlePickTool = (e: any) => {
    const currentMap = props.savedMap;
    currentMap.tool = e.target.value;
    props.setSavedMap({...props.savedMap, currentMap});
  }

  const handleUndoLine = (e: any) => {
    const currentMap = props.savedMap;
    currentMap.lines.pop();
    props.setSavedMap({...props.savedMap, currentMap});
  }

  const handleUndoLocation = (e: any) => {
    const currentMap = props.savedMap;
    currentMap.locations.pop();
    props.setSavedMap({...props.savedMap, currentMap});
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
          <h4 className="mb12">-----</h4>
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
              className={`tool btn ${props.savedMap.tool === 'add line' ? 'active' : ''}`}
              value='add line'
              onClick={handlePickTool}
            >add line</button>
            <button 
              type='button'
              className='tool btn'
              value='undo-line'
              onClick={handleUndoLine}
            >undo line</button>
          </div>
          <div className="flex-space-between mb24">
            <button 
              type='button'
              className={`tool btn ${props.savedMap.tool === 'add location' ? 'active' : ''}`}
              value='add location'
              onClick={handlePickTool}
            >add location</button>
            <button 
              type='button'
              className='tool btn'
              value='undo-location'
              onClick={handleUndoLocation}
            >undo location</button>
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