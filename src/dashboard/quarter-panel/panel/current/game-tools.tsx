import { useState, useEffect } from "react";
import { updateGame } from "../../../../expressAPI/update-game";
//



interface Props {
  savedGame: any;
  setSavedGame: Function;

  accessToken: string;
  user: any;
  games: any;
  getUserData: Function;

  socket: any;
}


export default function GameTools (props: Props) {
  

  const [message, setMessage] = useState<string>('');
  

  const gameroomId = props.savedGame.id;
  const userEmail = props.user.email;
  gameroomId !== '' ?
  useEffect(() => {
    props.socket.emit('join_gameroom', { gameroomId, userEmail});
    props.socket.on('socket_message', (data: any) => {
      console.log('socket_message data', data);
    })

    const justInCase = async () => {
      await props.getUserData();
      console.log(props.games);
    }

    props.socket.on('receive_game', (data: any) => {
      console.log('receive_game data', data);
      props.setSavedGame(data.game);
      justInCase();
    })

    return () => {
      // leave room
      props.socket.emit('leave_gameroom', { gameroomId, userEmail });
      // clean up socket event listeners
      props.socket.off('socket_message')
      props.socket.off('receive_game')
    }
  }, [props.socket]) :
  console.log('no game id, no gameroom') ;

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
    const game = response.game;

    props.socket.emit('send_game', { gameroomId, game })
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
      if (selected != undefined && selected.type) {
        return selected.type
      } else if (selected != undefined && selected.name) {
        return selected.name
      } else {
        return 'empty square'
      }
    } else {
      return 'none selected'
    }
  }


  const handlePlacePlayer = (e: any) => {
    console.log('playerID', e.target.value)
    const currentGame = props.savedGame;
    let unplaced = false;
    for (const key of Object.keys(currentGame.selectFrom)) {
      if (key === e.target.value) {
        unplaced = true;
      }
    }

    if (unplaced === true) {
      currentGame.tool = e.target.value
    } else {
      currentGame.tool = 'none';
      for (const key of Object.keys(currentGame.selectFrom)) {
        if (currentGame.selectFrom[key].maker === e.target.value) {
          currentGame.selected.x = currentGame.selectFrom[key].x;
          currentGame.selected.y = currentGame.selectFrom[key].y;
        }
      }
    }

    props.setSavedGame({...props.savedGame, currentGame});
  }
  let playerNames : any = {}
  for (const key of Object.keys(props.savedGame.selectFrom)) {
   if (props.savedGame.players[props.savedGame.selectFrom[key].maker]) {
    playerNames[props.savedGame.selectFrom[key].maker] = props.savedGame.selectFrom[key].name;
   }
  }

  return (
    <div className="game-tools">
      <div className='mb24 flex-space-between'>
        {props.savedGame.players[props.user.id] === 'host' ? <h3>{props.savedGame.id}</h3> : <h3>{props.savedGame.name}</h3>}
      </div>
      <div className='mb24'>

        {props.savedGame.players[props.user.id] === 'host' ? 
        <ul>
          {Object.keys(props.savedGame.players).map((playerId: any) => {

            return <li key={playerId} className='flex-space-between'>
              <button type="button" value={playerId} onClick={handlePlacePlayer} className="btn" >
                {props.savedGame.players[playerId] === 'host' ?
                props.savedGame.players[playerId] :
                playerNames[playerId]}
              </button>

            </li>
          })}
          <li>- </li>
        </ul> : 
        <ul></ul>}
        
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
          </div>
          <div className="flex-space-between mb24">
            <button 
              type='button'
              className={`tool btn ${props.savedGame.tool === 'shoot' ? 'active' : ''}`}
              value='shoot'
              onClick={handlePickTool}
            >shoot</button>
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