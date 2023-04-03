import { useState } from "react";

interface Props {
  savedGame: any;
  setSavedGame: Function;
}

export default function GameTools (props: Props) {
  const [message, setMessage] = useState<string>('');

  const handlePickTool = (e: any) => {
    // for now this uses savedMap
    // but it needs its own state variable "saveGame"
    const currentGame = props.savedGame;
    currentGame.tool = e.target.value;
    props.setSavedGame({...props.savedGame, currentGame});
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
    if (props.savedGame.selected.x !== undefined && props.savedGame.selected.y !== undefined) {
      selected = props.savedGame.selectFrom[locationToString(props.savedGame.selected)];
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
        <h3>{props.savedGame.name}</h3>
      </div>


      <div className='tools-body'>
        <div className='tool-box'>

          <div className="mb24">
            <span>{props.savedGame.selected.x}, {props.savedGame.selected.y}</span>
          </div>
          <div className="mb24">
            <span>{getSelected()}</span>
          </div>
          <div className="mb24">
            <button 
              type='button'
              className={`tool btn ${props.savedGame.tool === 'none' ? 'active' : ''}`}
              value='none'
              onClick={handlePickTool}
            >select</button>
          </div>
          <div className="flex-space-between mb24">
            <button 
              type='button'
              className={`tool btn ${props.savedGame.tool === 'move' ? 'active' : ''}`}
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
              className={`tool btn ${props.savedGame.tool === 'shoot' ? 'active' : ''}`}
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