import { useNavigate } from "react-router-dom";
import { logOut } from "../../../expressAPI/log-out";
//
import { createMap } from "../../../expressAPI/create-map";
import { deleteMap } from "../../../expressAPI/delete-map";
//
import { createChar } from "../../../expressAPI/create-char";
import { deleteChar } from "../../../expressAPI/delete-char";



interface Props {
  setCurrent: Function;
  setTab: Function;

  savedMap: any;
  setSavedMap: Function;
  savedChar: any;
  setSavedChar: Function;

  accessToken: string;
  user: any;
  maps: any;
  chars: any;
  getUserData: Function;
}

export default function Options (props: Props) {

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
    name: 'NEW MAP',

    x: 0, 
    y: 0, 
    scale: 25, 
    selected: { x: undefined, y: undefined },
    tool: 'none',

    width: 50,
    height: 25,
    
    lines: [],
    locations: []
  }

  // add blank map to database
  const handleNewMap = async (e: any) => {
    e.preventDefault();
    await createMap(props.accessToken, blankMap);

    // location.reload();
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
    name: 'NEW CHAR',

    x: 0, 
    y: 0, 
    
    speed: 5,
    status: 5
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
    selectedChar.speed = 0;
    selectedChar.status = 0;
    props.setSavedChar(selectedChar);

  }


  const handleNewGame = (e: any) => {
    props.setCurrent('game');
    props.setTab('current');
  }


  return (
    <div className='options'>
      <div className='flex-space-between mb36'>
        <h3>{props.user.email}</h3>
        <button type="button" className='tool btn' onClick={handleLogout}>LEAVE</button>
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
          <div>
            <button type='button' className="tool btn" onClick={handleNewGame}>host -</button>
            <button type='button' className="tool btn" onClick={handleNewGame}>- join</button>
          </div>
        </div>
        <ul>
          <li>- </li>
        </ul>
      </div>
    </div>
  )
}