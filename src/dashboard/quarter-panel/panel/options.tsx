import { useNavigate } from "react-router-dom";
import { logOut } from "../../../expressAPI/log-out";
// import { useNewMap } from "../../../custom-hooks/useNewMap";
import { createMap } from "../../../expressAPI/create-map";
import { deleteMap } from "../../../expressAPI/delete-map";
import { useEffect } from "react";

// getUser is passed in as a prop
// it might be better to import it
// import { getUser } from "../../../expressAPI/get-user";

interface Props {
  setCurrent: Function;
  setTab: Function;
  userEmail: string;
  accessToken: string;
  savedMap: any;
  setSavedMap: Function;
  user: any;
  getUserData: Function;
  maps: any;
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
    async function handleDataFetch () {
      const result = await createMap(props.accessToken, blankMap);
      return result.map
    }
    const currentMap = await handleDataFetch();
    console.log('added new map', currentMap);

    // location.reload();
    // TODO: rename this to getuserData
    props.getUserData();
  }

  const handleChooseMap = (e: any) => {
    e.preventDefault();
    console.log(e.target.value)
    let selectedMap;
    for (const map of props.maps) {
      if (map.id === e.target.value) {
        // console.log(map.id)
        selectedMap = map;
      }
    }
    // console.log(selectedMap)
    // not sure why i have to setState like this here
    // props.setSavedMap({...props.savedMap, selectedMap});
    props.setSavedMap(selectedMap)
    props.setCurrent('map');
    props.setTab('current');
  }

  const handleDeleteMap = async (e: any) => {
    e.preventDefault();
    // console.log(e.target.value)
    let selectedMap;
    for (const map of props.maps) {
      if (map.id === e.target.value) {
        // console.log(map.id)
        selectedMap = map;
      }
    }
    await deleteMap(props.accessToken, selectedMap);
    await props.getUserData();

    selectedMap.name = 'Please choose a map';
    selectedMap.height = 2;
    selectedMap.width = 2;
    props.setSavedMap(selectedMap);

  }



  const handleNewChar = (e: any) => {
    props.setCurrent('char');
    props.setTab('current');
  }

  const handleNewGame = (e: any) => {
    props.setCurrent('game');
    props.setTab('current');
  }



  return (
    <div className='options'>
      <div className='flex-space-between mb36'>
        <h3>{props.userEmail}</h3>
        <button type="button" className='tool btn' onClick={handleLogout}>logout</button>
      </div>
      <div className="mb36">
        <div className='flex-space-between mb12'>
          <h4>maps </h4>
          <button type='button' className="tool btn" onClick={handleNewMap}>create</button>
        </div>
        <ul>
          {props.maps.map((map: any) => {
            return <li key={map.id} className='flex-space-between'>
              <button type="button" value={map.id} onClick={handleChooseMap} className="map btn" >{map.name}</button>
              <button type="button" value={map.id} onClick={handleDeleteMap} className="map btn" >delete</button>
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