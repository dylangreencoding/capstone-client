import { useState } from "react";

interface Props {
  savedMap: any;
  setSavedMap: Function;
}

export default function GameTools (props: Props) {
  const [message, setMessage] = useState<string>('');

  const handlePickTool = (e: any) => {
    // for now this uses savedMap
    // but it needs its own state variable "saveGame"
    const currentMap = props.savedMap;
    currentMap.tool = e.target.value;
    props.setSavedMap({...props.savedMap, currentMap});
  }

  const handleSubmitMap = (e: any) => {
    e.preventDefault();
    console.log('send clicked')
    // HERE: send game to socket server
    // game is also saved to hosts games in database
    // possibly on socket.disconnect
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
    <div className="game-tools">
      <div className='mb24 flex-space-between'>
        <h3>{props.savedMap.name}</h3>
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
              className={`tool btn ${props.savedMap.tool === 'move' ? 'active' : ''}`}
              value='move'
              onClick={handlePickTool}
            >move</button>
            <button 
              type='button'
              className='tool btn'
              value='undo'
              onClick={() => console.log('clicked undo')}
            >undo</button>
          </div>
          <div className="flex-space-between mb24">
            <button 
              type='button'
              className={`tool btn ${props.savedMap.tool === 'shoot' ? 'active' : ''}`}
              value='shoot'
              onClick={handlePickTool}
            >shoot</button>
            <button 
              type='button'
              className='tool btn'
              value='undo'
              onClick={() => console.log('clicked undo')}
            >undo</button>
          </div>
        </div>
        <form className="text-form" onSubmit={handleSubmitMap}>
          <input 
            className='text-input' 
            type='text' 
            placeholder='*say something*'
            value={message}
            onChange={ (e) => setMessage(e.target.value) }
          />
          <button type='submit' className="tool btn">send</button>
        </form>
      </div>
    </div>
  )
}