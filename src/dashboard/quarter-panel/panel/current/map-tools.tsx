import { useState } from "react";

interface Props {
  savedMap: any;
  setSavedMap: Function;
  tool: string;
  setTool: Function
}

export default function MapTools (props: Props) {
  const [mapName, setmapName] = useState<string>('');

  const handlePickTool = (e: any) => {
    props.setTool(e.target.value);
  }

  const handleSubmitMap = (e: any) => {
    e.preventDefault();
    const data = {
      'map': 'data'
    }
    console.log(data);
  }

  return (
    <div className='map-tools'>
      
      <div className='tools-heading'>
        <span>
          {props.savedMap.selected.x}, {props.savedMap.selected.y}
        </span>
        <h3>MAP_NAME</h3>
      </div>
      <div className='tools-body'>
        <div className='tool-box'>
          <button 
            type='button'
            className={props.tool === 'none' ? 'tool-active tool' : 'tool'}
            value='none'
            onClick={handlePickTool}
          >none</button>
          <button 
            type='button'
            className={props.tool === 'add wall' ? 'tool-active tool' : 'tool'}
            value='add wall'
            onClick={handlePickTool}
          >add wall</button>
          <button 
            type='button'
            className={props.tool === 'add zombie' ? 'tool-active tool' : 'tool'}
            value='add zombie'
            onClick={handlePickTool}
          >add zombie</button>
        </div>
        <form className="text-form" onSubmit={handleSubmitMap}>
          <input 
            className='text-input' 
            type='text' 
            placeholder='*map name*'
            value={mapName}
            onChange={ (e) => setmapName(e.target.value) }
          />
          <button type='submit' className="tool">save</button>
        </form>
      </div>
    </div>
  )
}