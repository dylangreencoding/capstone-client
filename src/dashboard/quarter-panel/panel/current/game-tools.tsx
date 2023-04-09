import { useState } from "react";
import { updateGame } from "../../../../expressAPI/update-game";

interface Props {
  savedGame: any;
  setSavedGame: Function;

  accessToken: string;
  user: any;
  getUserData: Function;
}

export default function GameTools (props: Props) {
  console.log(props.savedGame);
  const [message, setMessage] = useState<string>('');

  let currentGame = props.savedGame;
  const chatName = props.user.email;
  
  const handleSendGame = async (e: any) => {
    e.preventDefault();
    
    if (message.length > 0 && message.length < 20) {
      currentGame.messages.push(`${chatName}: ${message}`)
    }
    const response = await updateGame(props.accessToken, currentGame);
    await props.getUserData();
    props.setSavedGame(response.game)
  }

  const handlePickTool = (e: any) => {
    const currentGame = props.savedGame;
    currentGame.tool = e.target.value;
    props.setSavedGame({...props.savedGame, currentGame});
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
        {props.savedGame.players[props.user.id] === 'host' ? <h3>{props.savedGame.id}</h3> : <h3>{props.savedGame.name}</h3>}
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
        <form className="text-form" onSubmit={handleSendGame}>
          <input 
            className='text-input' 
            type='text' 
            placeholder='20 character maximum'
            value={message}
            onChange={ (e) => setMessage(e.target.value) }
          />
          <button type='submit' className="tool btn">send</button>
        </form>
      </div>
    </div>
  )
}