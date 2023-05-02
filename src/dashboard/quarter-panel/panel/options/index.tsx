import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
//
import { logOut } from "../../../../expressAPI/log-out";
import { userRoute } from "../../../../expressAPI/user-route";
import DisplayGames from "./displayGames";

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
  getUserData: Function;
}

export default function Options(props: Props) {
  // This is the initial data fetch at login
  // It is here so that when a player is removed from a game,
  // their list of displayed games is up to date
  useEffect(() => {
    props.getUserData();
  }, []);

  // logout button
  const navigate = useNavigate();
  const handleLogout = async (e: any) => {
    e.preventDefault();
    try {
      const response = await logOut();
      sessionStorage.removeItem("accessToken");
      alert(response.message);
      navigate("/", { replace: true });
    } catch (error) {
      alert(error);
    }
  };

  // for handleNewMap
  const blankMap = {
    id: "",
    maker: props.user.user.id,
    name: "new map",

    x: 0,
    y: 0,
    scale: 25,
    selected: { x: undefined, y: undefined },
    selectFrom: {},
    tool: "none",

    width: 50,
    height: 25,

    lines: [],
  };
  // create blank map in database
  const handleNewMap = async (e: any) => {
    e.preventDefault();
    const route = "map/save";
    await userRoute(route, props.accessToken, blankMap);
    await props.getUserData();
  };

  const handleChooseMap = (e: any) => {
    e.preventDefault();

    let selectedMap;
    for (const map of props.user.maps) {
      if (map.id === e.target.value) {
        selectedMap = map;
      }
    }

    props.setSavedMap(selectedMap);
    props.setCurrent("map");
    props.setTab("current");
  };

  // delete a map
  const handleDeleteMap = async (e: any) => {
    e.preventDefault();

    let selectedMap;
    for (const map of props.user.maps) {
      if (map.id === e.target.value) {
        selectedMap = map;
      }
    }

    const route = "map/delete";
    await userRoute(route, props.accessToken, selectedMap);
    await props.getUserData();

    // so you cannot view a map you just deleted
    selectedMap.name = "Please choose a map";
    selectedMap.height = 2;
    selectedMap.width = 2;
    props.setSavedMap(selectedMap);
  };

  const blankChar = {
    id: "",
    maker: props.user.user.id,
    name: "new character",

    x: -100,
    y: -100,

    level: 5,
  };

  const handleNewChar = async (e: any) => {
    const route = "char/save";
    await userRoute(route, props.accessToken, blankChar);
    await props.getUserData();
  };

  const handleChooseChar = (e: any) => {
    e.preventDefault();

    let selectedChar;
    for (const char of props.user.chars) {
      if (char.id === e.target.value) {
        selectedChar = char;
      }
    }

    props.setSavedChar(selectedChar);
    props.setCurrent("char");
    props.setTab("current");
  };

  const handleDeleteChar = async (e: any) => {
    e.preventDefault();

    let selectedChar;
    for (const char of props.user.chars) {
      if (char.id === e.target.value) {
        selectedChar = char;
      }
    }

    const route = "char/delete";
    await userRoute(route, props.accessToken, selectedChar);
    await props.getUserData();

    // so you cannot view a character you just deleted
    selectedChar.name = "Please choose a character";
    selectedChar.level = 0;
    props.setSavedChar(selectedChar);
  };

  return (
    <div className="options">
      <div className="flex-space-between mb36">
        <h3>{props.user.user.email}</h3>
        <button type="button" className="btn" onClick={handleLogout}>
          log out
        </button>
      </div>
      <div className="mb36">
        <div className="flex-space-between mb12">
          <h4>maps </h4>
          {props.user.maps.length < 2 ? (
            <button type="button" className="btn" onClick={handleNewMap}>
              create
            </button>
          ) : (
            <span>2/2</span>
          )}
        </div>
        <ul>
          {props.user.maps.map((map: any) => {
            return (
              <li key={map.id} className="flex-space-between">
                <button
                  type="button"
                  value={map.id}
                  onClick={handleChooseMap}
                  className="btn"
                >
                  {map.name}
                </button>
                <button
                  type="button"
                  value={map.id}
                  onClick={handleDeleteMap}
                  className="btn"
                >
                  delete
                </button>
              </li>
            );
          })}
          <li>- </li>
        </ul>
      </div>
      <div className="mb36">
        <div className="flex-space-between mb12">
          <h4>characters </h4>
          {props.user.chars.length < 1 ? (
            <button type="button" className="btn" onClick={handleNewChar}>
              create
            </button>
          ) : (
            <span>1/1</span>
          )}
        </div>
        <ul>
          {props.user.chars.map((char: any) => {
            return (
              <li key={char.id} className="flex-space-between">
                <button
                  type="button"
                  value={char.id}
                  onClick={handleChooseChar}
                  className="btn"
                >
                  {char.name}
                </button>
                <button
                  type="button"
                  value={char.id}
                  onClick={handleDeleteChar}
                  className="btn"
                >
                  delete
                </button>
              </li>
            );
          })}
          <li>- </li>
        </ul>
      </div>
      <div className="mb36">
        <div className="flex-space-between mb12">
          <h4>games </h4>
        </div>
        {props.user.games && props.user.games.length > 0 ? (
          <DisplayGames
            setTab={props.setTab}
            setCurrent={props.setCurrent}
            setSavedGame={props.setSavedGame}
            accessToken={props.accessToken}
            user={props.user}
            getUserData={props.getUserData}
          />
        ) : (
          <ul>
            <li>- </li>
          </ul>
        )}
      </div>
    </div>
  );
}
