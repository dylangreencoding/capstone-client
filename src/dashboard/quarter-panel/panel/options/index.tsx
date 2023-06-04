import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
//
import { logOut } from "../../../../expressAPI/log-out";
import { userRoute } from "../../../../expressAPI/user-route";
import DisplayGames from "./displayGames";
//
import { blankMap, blankChar } from "../../../object-templates";

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

  // create blank map in database
  const handleNewMap = async (e: any) => {
    e.preventDefault();
    blankMap.maker = props.user.user.id;
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

  const handleNewChar = async (e: any) => {
    e.preventDefault();
    blankChar.maker = props.user.user.id;
    blankChar.name = "Elvis";
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

  return (
    <div className="options">
      <div className="flex-space-between mb36">
        <h3>{props.user.user.name}</h3>
        <button type="button" className="btn" onClick={handleLogout}>
          log out
        </button>
      </div>
      <div className="mb36">
        <div className={`flex-with-gap mb12`}>
          <h4
          // className=""
          // onClick={() => {
          //   props.setCurrent("map");
          //   props.setTab("current");
          // }}
          >
            maps{" "}
          </h4>
          {props.user.maps.length < 2 ? (
            <button
              type="button"
              className="svg-btn edit"
              onClick={handleNewMap}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 svg-large"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          ) : (
            <span className="small">full</span>
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
              </li>
            );
          })}
          {props.user.maps.length > 0 ? <li /> : <li>- </li>}
        </ul>
      </div>
      <div className="mb36">
        <div className="flex-with-gap mb12">
          <h4
          // className="offline"
          // onClick={() => {
          //   props.setCurrent("char");
          //   props.setTab("current");
          // }}
          >
            characters{" "}
          </h4>
          {props.user.chars.length < 1 ? (
            <button
              type="button"
              className="svg-btn edit"
              onClick={handleNewChar}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 svg-large"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          ) : (
            <span className="small">full</span>
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
              </li>
            );
          })}
          {props.user.chars.length > 0 ? <li /> : <li>- </li>}
        </ul>
      </div>
      <div className="mb36">
        <div className="flex-space-between mb12">
          <h4
          // className="offline"
          // onClick={() => {
          //   props.setCurrent("game");
          //   props.setTab("current");
          // }}
          >
            games{" "}
          </h4>
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
