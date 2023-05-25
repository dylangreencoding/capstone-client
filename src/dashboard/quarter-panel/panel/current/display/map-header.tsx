import { useState } from "react";
import { userRoute } from "../../../../../expressAPI/user-route";
import { blankMap } from "../../../../object-templates";

interface Props {
  setTab: Function;
  current: string;
  setCurrent: Function;

  map_: any;
  setMap_: Function;

  accessToken: string;
  user: any;
  socket: any;

  name: string;
  setName: Function;
}

export default function MapHeader(props: Props) {
  // const [name, setName] = useState<string>("");
  const [confirmAction, setConfirmAction] = useState<string>("");

  const handleConfirmAction = async (e: any) => {
    e.preventDefault();
    const currentMap = props.map_;
    if (confirmAction === "rename map") {
      if (props.name !== currentMap.name) {
        currentMap.name = props.name;
        props.setMap_(currentMap);
        props.setName("");
        setConfirmAction("");
      }
    } else if (confirmAction === "delete map") {
      if (props.current === "map") {
        const route = "map/delete";
        await userRoute(route, props.accessToken, props.map_);

        props.setMap_(blankMap);
        props.setTab("options");
      } else if (props.current === "game") {
        if (
          props.map_.players[props.user.user.id] === "host" &&
          Object.keys(props.map_.players).length > 1
        ) {
          alert("To delete a game, you must first remove all players");
          return;
        }
        let game = props.map_;
        const route = "game/delete";
        const response = await userRoute(route, props.accessToken, game);
        game = response.game[0];
        props.socket.emit("send_game", { game });

        // so you cannot view a game you just left/deleted
        props.setMap_(blankMap);
        props.setTab("options");
        props.setCurrent("map");
      }
    }
  };

  const displayMapHeader = () => {
    if (confirmAction === "") {
      return (
        <div className="flex-space-between">
          <div className="flex-with-gap">
            <strong>{props.map_.name}</strong>
            <button
              type="button"
              className="svg-btn edit"
              title="Rename"
              onClick={() => setConfirmAction("rename map")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
              </svg>
            </button>
            <button
              type="button"
              className="svg-btn cancel"
              title={
                props.map_.players[props.user.user.id] === "guest"
                  ? "Leave"
                  : "Delete"
              }
              onClick={() => setConfirmAction("delete map")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div>
            <strong className="small">{props.current.toUpperCase()}</strong>
          </div>
        </div>
      );
    } else if (confirmAction === "rename map") {
      return (
        <form className="flex-with-gap" onSubmit={handleConfirmAction}>
          <input
            className="text-input"
            type="text"
            required
            placeholder={props.map_.name}
            minLength={1}
            maxLength={20}
            title="1 - 20 characters"
            value={props.name}
            onChange={(e) => props.setName(e.target.value)}
          />
          <div className="flex-with-gap">
            <button type="submit" className="svg-btn confirm" title="Confirm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              type="button"
              className="svg-btn cancel"
              title="Cancel"
              onClick={() => setConfirmAction("")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </form>
      );
    } else if (confirmAction === "delete map") {
      return (
        <form className="flex-with-gap" onSubmit={handleConfirmAction}>
          <span>
            {props.map_.players[props.user.user.id] === "guest"
              ? "Leave"
              : "Delete"}{" "}
            "{props.map_.name}"?
          </span>
          <button type="submit" className="svg-btn confirm" title="Confirm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            type="button"
            className="svg-btn cancel"
            title="Cancel"
            onClick={() => setConfirmAction("")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </form>
      );
    }
  };

  return <div className="mb24 tool-box">{displayMapHeader()}</div>;
}
