import { useState } from "react";
import { updateMap } from "../../../../expressAPI/update-map";
import { createHostGame } from "../../../../expressAPI/create-host-game";

interface Props {
  setCurrent: Function;
  setTab: Function;

  savedMap: any;
  setSavedMap: Function;
  savedGame: any;
  setSavedGame: Function;

  accessToken: string;
  user: any;
  maps: any;
  getUserData: Function;
}

export default function MapTools (props: Props) {

  const [mapName, setmapName] = useState<string>(props.savedMap.name);

  let currentMap = props.savedMap;
  
  const handleSaveMap = async (e: any) => {
    e.preventDefault();
    currentMap.name = mapName;
    await updateMap(props.accessToken, currentMap);
    await props.getUserData();
  }

  const handleHostGame = async (e: any) => {
    e.preventDefault();
    let mapToHost = props.savedMap;
    mapToHost.id = '';
    mapToHost.messages = []
    mapToHost.players = {}
    mapToHost.players[props.user.id] = 'host';

    const response = await createHostGame(props.accessToken, mapToHost);
    await props.getUserData();
    const currentGame = response.game;
    props.setSavedGame(currentGame);


    props.setCurrent('game');
    props.setTab('current');
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

  const locationToString = (location: any) => {
    const x = location.x.toString();
    const y = location.y.toString();
    const xy = x.concat(' ', y);
    return xy
  }

  const getSelected = () => {
    let selected;
    if (props.savedMap.selected.x !== undefined && props.savedMap.selected.y !== undefined) {
      selected = props.savedMap.selectFrom[locationToString(props.savedMap.selected)];
      if (selected != undefined) {
        return selected.type
      } else {
        return 'empty square'
      }
    } else {
      return 'none selected'
    }
  }


  return (
    <div className='map-tools'>
      
      <div className='mb24 flex-space-between'>
        <h3>{props.savedMap.name}</h3>
        <button type='button' className="tool btn" onClick={handleHostGame}>host game</button>
      </div>

      <div className='tools-body'>
        <div className='tool-box'>
          <div className="mb24">
            <span>{props.savedMap.selected.x}, {props.savedMap.selected.y}</span>
          </div>
          <div className="mb24">
            <span>{getSelected()}</span>
          </div>
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
          </div>
          <div className="flex-space-between mb24">
            <button 
              type='button'
              className={`tool btn ${props.savedMap.tool === 'move' ? 'active' : ''}`}
              value='move'
              onClick={handlePickTool}
            >move</button>
          </div>
          <div className="flex-space-between mb24">
            <button 
              type='button'
              className={`tool btn ${props.savedMap.tool === 'shoot' ? 'active' : ''}`}
              value='shoot'
              onClick={handlePickTool}
            >shoot</button>
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
          <button type='button' onClick={handleSaveMap} className="tool btn">save</button>
        </form>
      </div>
    </div>
  )
}