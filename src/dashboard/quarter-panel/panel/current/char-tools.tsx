import { useState } from "react";
import { joinGame } from "../../../../expressAPI/join-game";


interface Props {
  setCurrent: Function;
  setTab: Function;

  savedChar: any;
  setSavedChar: Function;
  savedGame: any;
  setSavedGame: Function;

  accessToken: string;
  user: any;
  games: any;
  getUserData: Function;

  socket: any;
}

export default function CharTools (props: Props) {
  const [gameId, setGameId] = useState<string>('');

  const handleJoinGame = async (e: any) => {
    e.preventDefault(); 

    console.log('HERE', props.savedChar);
    const response = await joinGame(props.accessToken, {id: gameId, character: props.savedChar});
    await props.getUserData();

    let game = response.game[0];

    props.setSavedGame(game);
    props.socket.emit('send_game', { game });

    props.setCurrent('game');
    props.setTab('current');

  }

  return (
    <div>
      <div className='mb36 flex-space-between'>
      </div>
      <form className="text-form2" onSubmit={handleJoinGame}>
          <input 
            className='text-input' 
            type='text' 
            placeholder='Enter Game ID'
            value={gameId}
            onChange={ (e) => setGameId(e.target.value) }
          />
          <button type='submit' className="tool btn">join game as {props.savedChar.name}</button>
        </form>
    </div>
  )
}