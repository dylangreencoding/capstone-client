import { deleteGame } from "../../../../expressAPI/delete-game";

interface Props {
  setTab: Function;
  setCurrent: Function;

  setSavedGame: Function;

  accessToken: string;
  user: any;
  games: any;
  getUserData: Function;

  socket: any;
}

export default function DisplayGames (props: Props) {

  
  // choose game
  const handleChooseGame = async (e: any) => {
    e.preventDefault();
    let selectedGame;
    for (const game of props.games) {
      if (game.id === e.target.value) {
        selectedGame = game;
      }
    }

    props.setSavedGame(selectedGame)
    props.setCurrent('game');
    props.setTab('current');
  }

  return (
    <ul>
      {props.games.map((game: any) => {
        return <li key={game.id} className='flex-space-between'>
          <div>
            <span className="hg">{game.players[props.user.id] === 'host' ? 'h ' : 'g '}</span>
            <button type="button" value={game.id} onClick={handleChooseGame} className="btn" >
              {game.name}
            </button>
          </div>
        </li>
      })}
      <li>- </li>
    </ul>
  )
}