import { useState, useEffect } from "react";
import { updateGame } from "../../../../expressAPI/update-game";
import { removePlayer } from "../../../../expressAPI/remove-player-from-game";
import { deleteGame } from "../../../../expressAPI/delete-game";
//



interface Props {
  setTab: Function;
  setCurrent: Function;

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

    props.socket.on('receive_game', (data: any) => {
      console.log('receive_game data', data);
      if (Object.keys(data.game.players).includes(props.user.id)) {
        props.setSavedGame(data.game);
      } else {
        props.setSavedGame({});
        props.setTab('options');
        props.setCurrent('map');
      }
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

  
  const handleSendGame = async (e: any) => {
    e.preventDefault();
    let currentGame = props.savedGame;
    if (message.length > 0 && message.length < 20) {
      currentGame.messages.push(`${props.user.email}: ${message}`)
    }
    const response = await updateGame(props.accessToken, currentGame);
    await props.getUserData();
    props.setSavedGame(response.game);
    const game = response.game;

    props.socket.emit('send_game', { game });
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

  const handleRemovePlayer = async (e: any) => {
    console.log('GameTools handleRemovePlayer', e.target.value)

    // removes player from game,
    // effectively as if the player had left
    // this (along with player leave game button should trigger socket event)
    const response = await removePlayer(props.accessToken, props.savedGame, e.target.value);
    props.setSavedGame(response.game);
    const game = response.game;
    props.socket.emit('send_game', { game });
    await props.getUserData();
  }

    // delete a game
    const handleDeleteGame = async (e: any) => {
      e.preventDefault();
      let game = props.savedGame;
      const response = await deleteGame(props.accessToken, game);
      game = response.game[0];
      props.socket.emit('send_game', { game });

      // i believe this is unnecessary due to options useeffect
      // await props.getUserData();

      // so you cannot view a game you just left/deleted
      props.setSavedGame({});
      props.setTab('options');
      props.setCurrent('map');
    }

  return (
    <div className="game-tools">
      
      <div className='mb24 tool-box'>
        {props.savedGame.players[props.user.id] === 'host' ? <h3>{props.savedGame.id}</h3> : <h3>{props.savedGame.name}</h3>}
        <button type="button" value={props.savedGame.id} onClick={handleDeleteGame} className="btn" >
          {props.savedGame.players[props.user.id] === 'host' ? 'delete game' : 'leave game'}
        </button>
      </div>

      
      <div>
        <div>

          {props.savedGame.players[props.user.id] === 'host' ? 

            <ul className="mb24 tool-box">
              {Object.keys(props.savedGame.players).map((playerId: any) => {
                return <li key={playerId} className='flex-space-between'>
                  <button type="button" value={playerId} onClick={handlePlacePlayer} className="btn" >
                    {props.savedGame.players[playerId] === 'host' ?
                    props.savedGame.players[playerId] :
                    playerNames[playerId]}
                  </button>
                  {props.savedGame.players[playerId] === 'host' ?
                  <span /> :
                  <button className='btn' type="button" value={playerId} onClick={handleRemovePlayer}>remove</button>}
                </li>
              })}
              <li>- </li>
            </ul> : 

            <ul className="mb24"></ul>
          }

          <div className="mb24">
            <div>{props.savedGame.selected.x}, {props.savedGame.selected.y}</div>
            <div>{getSelected()}</div>
          </div>

          <div className="mb24 tool-box">
            <div>
              <button 
                type='button'
                className={`btn ${props.savedGame.tool === 'none' ? 'active' : ''}`}
                value='none'
                onClick={handlePickTool}
              >select</button>
            </div>
            <div>
              <button 
                type='button'
                className={`btn ${props.savedGame.tool === 'move' ? 'active' : ''}`}
                value='move'
                onClick={handlePickTool}
              >move</button>
            </div>
            <div>
              <button 
                type='button'
                className={`btn ${props.savedGame.tool === 'shoot' ? 'active' : ''}`}
                value='shoot'
                onClick={handlePickTool}
              >shoot</button>
            </div>
          </div>
        </div>
        <form className="text-form tool-box" onSubmit={handleSendGame}>
          <input 
            className='text-input' 
            type='text' 
            placeholder='20 character maximum'
            value={message}
            onChange={ (e) => setMessage(e.target.value) }
          />
          <button type='submit' className="btn">send</button>
        </form>
      </div>
    </div>
  )
}