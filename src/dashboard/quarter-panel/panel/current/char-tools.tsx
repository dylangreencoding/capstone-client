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
}

export default function CharTools (props: Props) {
  const [gameId, setGameId] = useState<string>('');

  const handleJoinGame = async (e: any) => {
    e.preventDefault(); 
    const response = await joinGame(props.accessToken, {id: gameId});
    await props.getUserData();

    let currentGame = response.game[0];
    props.setSavedGame(currentGame);

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