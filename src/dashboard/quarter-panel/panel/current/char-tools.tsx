import { useState } from "react";
import { userRoute } from "../../../../expressAPI/user-route";


interface Props {
  setCurrent: Function;
  setTab: Function;

  savedChar: any;
  setSavedChar: Function;
  savedGame: any;
  setSavedGame: Function;

  accessToken: string;
  user: any;
  getUserData: Function;

  socket: any;
}

export default function CharTools (props: Props) {
  const [gameId, setGameId] = useState<string>('');

  const handleJoinGame = async (e: any) => {
    e.preventDefault(); 

    const route = 'join-game'
    const response = await userRoute(route, props.accessToken, {id: gameId, character: props.savedChar});
    await props.getUserData();

    let game = response.game[0];

    props.setSavedGame(game);
    props.socket.emit('send_game', { game });

    props.setCurrent('game');
    props.setTab('current');

  }

  return (
    <div>
      <div className='mb36'>
        <div>
          <h3>{props.savedChar.name}</h3>
        </div>
        <div>
          Level {props.savedChar.level}
        </div>
      </div>
      <form className="text-form" onSubmit={handleJoinGame}>
          <input 
            className='text-input' 
            type='text' 
            placeholder='Enter Game ID'
            value={gameId}
            onChange={ (e) => setGameId(e.target.value) }
          />
          <button type='submit' className="btn">join game as {props.savedChar.name}</button>
        </form>
    </div>
  )
}