import { useNavigate } from "react-router-dom";
import { logOut } from "../../../expressAPI/log-out";
//
import { createMap } from "../../../expressAPI/create-map";
import { deleteMap } from "../../../expressAPI/delete-map";
//
import { createChar } from "../../../expressAPI/create-char";
import { deleteChar } from "../../../expressAPI/delete-char";
//
import { deleteGame } from "../../../expressAPI/delete-game";
import { useEffect } from "react";




interface Props {
  setCurrent: Function;
  setTab: Function;

  savedMap: any;
  setSavedMap: Function;
  savedChar: any;
  setSavedChar: Function;
  savedGame: any;
  setSavedGame: Function;

  accessToken: string;
  user: any;
  maps: any;
  chars: any;
  games: any;
  getUserData: Function;
}

export default function Options (props: Props) {
  useEffect(() => {
    console.log('OPTIONS USEFFECT')
    props.getUserData();
  }, [])


  // logout button
  const navigate = useNavigate();
  const handleLogout = async (e: any) => {
    e.preventDefault();
    try {
      const response = await logOut();
      alert(response.message);
      navigate('/', {replace: true});
    } catch (error) {
      alert(error);
    }
  }

  // for handleNewMap
  const blankMap = {
    id: '',
    maker: props.user.id,
    name: 'new map',

    x: 0, 
    y: 0, 
    scale: 25, 
    selected: { x: undefined, y: undefined },
    selectFrom: {},
    tool: 'none',

    width: 50,
    height: 25,
    
    lines: []
  }

  // create blank map in database
  const handleNewMap = async (e: any) => {
    e.preventDefault();
    await createMap(props.accessToken, blankMap);

    await props.getUserData();
  }

  const handleChooseMap = (e: any) => {
    e.preventDefault();

    let selectedMap;
    for (const map of props.maps) {
      if (map.id === e.target.value) {
        selectedMap = map;
      }
    }

    // not sure why i have to setState like this here
    // props.setSavedMap({...props.savedMap, selectedMap});
    props.setSavedMap(selectedMap)
    props.setCurrent('map');
    props.setTab('current');
  }

  // delete a map
  const handleDeleteMap = async (e: any) => {
    e.preventDefault();

    let selectedMap;
    for (const map of props.maps) {
      if (map.id === e.target.value) {
        selectedMap = map;
      }
    }

    await deleteMap(props.accessToken, selectedMap);
    await props.getUserData();

    // so you cannot view a map you just deleted
    selectedMap.name = 'Please choose a map';
    selectedMap.height = 2;
    selectedMap.width = 2;
    props.setSavedMap(selectedMap);

  }

  const blankChar = {
    id: '',
    maker: props.user.id,
    name: 'new character',

    x: -100, 
    y: -100, 
    
    level: 5
  }

  const handleNewChar = async (e: any) => {
    await createChar(props.accessToken, blankChar);
    await props.getUserData();

  }

  const handleChooseChar = (e: any) => {
    e.preventDefault();

    let selectedChar;
    for (const char of props.chars) {
      if (char.id === e.target.value) {
        selectedChar = char;
      }
    }

    props.setSavedChar(selectedChar)
    props.setCurrent('char');
    props.setTab('current');
  }

  const handleDeleteChar = async (e: any) => {
    e.preventDefault();

    let selectedChar;
    for (const char of props.chars) {
      if (char.id === e.target.value) {
        selectedChar = char;
      }
    }

    await deleteChar(props.accessToken, selectedChar);
    await props.getUserData();

    // so you cannot view a character you just deleted
    selectedChar.name = 'Please choose a character';
    selectedChar.level = 0;
    props.setSavedChar(selectedChar);

  }

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

  // delete a game
  const handleDeleteGame = async (e: any) => {
    e.preventDefault();

    let selectedGame;
    for (const game of props.games) {
      if (game.id === e.target.value) {
        selectedGame = game;
      }
    }

    await deleteGame(props.accessToken, selectedGame);
    await props.getUserData();

    // so you cannot view a game you just deleted
    selectedGame.name = 'Please choose a game';
    selectedGame.height = 2;
    selectedGame.width = 2;
    props.setSavedGame(selectedGame);

  }

  // had problems displaying fetched data here
  // this should probably be a child react component
  const displayGames = () => {
    console.log('options.tsx displayGames() success');
    if (props.games && props.games.length > 0) {
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
              <button type="button" value={game.id} onClick={handleDeleteGame} className="btn" >
                {game.players[props.user.id] === 'host' ? 'delete' : 'leave'}
              </button>
            </li>
          })}
          <li>- </li>
        </ul>
      )
    } else {
      console.log('options.tsx displayGames() error')
      return (
        <ul>
          <li>- </li>
        </ul>
      )
    }
  }


  return (
    <div className='options'>
      <div className='flex-space-between mb36'>
        <h3>{props.user.email}</h3>
        <button type="button" className='tool btn' onClick={handleLogout}>log out</button>
      </div>
      <div className="mb36">
        <div className='flex-space-between mb12'>
          <h4>maps </h4>
          <button type='button' className="tool btn" onClick={handleNewMap}>create</button>
        </div>
        <ul>
          {props.maps.map((map: any) => {
            return <li key={map.id} className='flex-space-between'>
              <button type="button" value={map.id} onClick={handleChooseMap} className="btn" >{map.name}</button>
              <button type="button" value={map.id} onClick={handleDeleteMap} className="btn" >delete</button>
            </li>
          })}
          <li>- </li>
        </ul>
      </div>
      <div className="mb36">
        <div className='flex-space-between mb12'>
          <h4>characters </h4>
          <button type='button' className="tool btn" onClick={handleNewChar}>create</button>
        </div>
        <ul>
          {props.chars.map((char: any) => {
            return <li key={char.id} className='flex-space-between'>
              <button type="button" value={char.id} onClick={handleChooseChar} className="btn" >{char.name}</button>
              <button type="button" value={char.id} onClick={handleDeleteChar} className="btn" >delete</button>
            </li>
          })}
          <li>- </li>
        </ul>
      </div>
      <div className="mb36">
        <div className='flex-space-between mb12'>
          <h4>games </h4>
        </div>
        { displayGames() }
      </div>
    </div>
  )
}