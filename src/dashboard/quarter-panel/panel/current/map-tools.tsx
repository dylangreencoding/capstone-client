import { useState } from "react";
import { userRoute } from "../../../../expressAPI/user-route";


interface Props {
  setCurrent: Function;
  setTab: Function;

  savedMap: any;
  setSavedMap: Function;
  savedGame: any;
  setSavedGame: Function;

  accessToken: string;
  user: any;
  getUserData: Function;
}

export default function MapTools (props: Props) {

  const [mapName, setmapName] = useState<string>(props.savedMap.name);

  let currentMap = props.savedMap;
  
  const handleSaveMap = async (e: any) => {
    e.preventDefault();
    currentMap.name = mapName;
    currentMap.currentMap = {};

    const route = 'save-map';
    await userRoute(route, props.accessToken, currentMap);
    await props.getUserData();
  }

  const handleHostGame = async (e: any) => {
    e.preventDefault();
    let gameMap = props.savedMap;
    gameMap.id = '';
    gameMap.messages = []
    gameMap.players = {}
    gameMap.players[props.user.user.id] = 'host';
    gameMap.currentMap = {};
    gameMap.selected = {};
    gameMap.tool = 'none';

    const route = 'save-game';
    const response = await userRoute(route, props.accessToken, gameMap);
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
      
      <div className='mb24 tool-box'>
        <h3>{props.savedMap.name}</h3>
        <button type='button' className="btn" onClick={handleHostGame}>host game</button>
      </div>

      <div>
        <div>
          <div className="mb24">
            <div>{props.savedMap.selected.x}, {props.savedMap.selected.y}</div>
            <div>{getSelected()}</div>
          </div>

          <div className="tool-box mb24">
            <div>
              <button 
                type='button'
                className={`btn ${props.savedMap.tool === 'none' ? 'active' : ''}`}
                value='none'
                onClick={handlePickTool}
              >select</button>
            </div>
            <div>
              <button 
                type='button'
                className={`btn ${props.savedMap.tool === 'add line' ? 'active' : ''}`}
                value='add line'
                onClick={handlePickTool}
              >add line</button>
              <span>---</span>
              <button 
                type='button'
                className='btn'
                value='undo-line'
                onClick={handleUndoLine}
              >undo line</button>
            </div>
            <div>
              <button 
                type='button'
                className={`btn ${props.savedMap.tool === 'add location' ? 'active' : ''}`}
                value='add location'
                onClick={handlePickTool}
              >add location</button>
            </div>
            <div>
              <button 
                type='button'
                className={`btn ${props.savedMap.tool === 'move' ? 'active' : ''}`}
                value='move'
                onClick={handlePickTool}
              >move</button>
            </div>
            <div>
              <button 
                type='button'
                className={`btn ${props.savedMap.tool === 'shoot' ? 'active' : ''}`}
                value='shoot'
                onClick={handlePickTool}
              >shoot</button>
            </div>
          </div>
        </div>
        <form className="text-form tool-box" onSubmit={handleSaveMap} >
          <input 
            className='text-input' 
            type='text' 
            placeholder='*name your map*'
            value={mapName}
            onChange={ (e) => setmapName(e.target.value) }
          />
          <button type='submit' className="btn">save</button>
        </form>
      </div>
    </div>
  )
}