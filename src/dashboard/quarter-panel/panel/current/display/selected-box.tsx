import { getSelected, locationToString } from "../../../../get-selected";
import { mapToolDescriptions } from "../../../../object-templates";

interface Props {
  map_: any;
  setMap_: Function;
}

export default function SelectedBox(props: Props) {
  const selected = getSelected(props.map_);

  const handlePickTool = (e: any) => {
    const currentMap = props.map_;
    currentMap.tool = e.target.value;
    if (e.target.value === "add line" || e.target.value === "add location")
      currentMap.selected = {};
    props.setMap_({ ...props.map_, currentMap });
  };

  const handleChangeColor = (e: any) => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const currentMap = props.map_;
    currentMap.entities[
      locationToString({ x: selected.x, y: selected.y })
    ].color = "#" + randomColor;
    props.setMap_({ ...props.map_, currentMap });
  };

  const handleRemoveEntity = (e: any) => {
    const currentMap = props.map_;
    delete currentMap.entities[
      locationToString({ x: selected.x, y: selected.y })
    ];
    props.setMap_({ ...props.map_, currentMap });
  };

  if (selected.name !== "empty" && selected.name !== "none") {
    return (
      <div className="mb24 tool-box tool-box-border">
        <div className="tb-header">
          <span className="tb-heading">
            {selected.x}, {selected.y}
          </span>
        </div>
        <div className="flex-with-gap">
          <strong>{selected.name}</strong>
          <button
            type="button"
            className="svg-btn edit"
            title="Change Color"
            onClick={handleChangeColor}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M8.5 3.528v4.644c0 .729-.29 1.428-.805 1.944l-1.217 1.216a8.75 8.75 0 013.55.621l.502.201a7.25 7.25 0 004.178.365l-2.403-2.403a2.75 2.75 0 01-.805-1.944V3.528a40.205 40.205 0 00-3 0zm4.5.084l.19.015a.75.75 0 10.12-1.495 41.364 41.364 0 00-6.62 0 .75.75 0 00.12 1.495L7 3.612v4.56c0 .331-.132.649-.366.883L2.6 13.09c-1.496 1.496-.817 4.15 1.403 4.475C5.961 17.852 7.963 18 10 18s4.039-.148 5.997-.436c2.22-.325 2.9-2.979 1.403-4.475l-4.034-4.034A1.25 1.25 0 0113 8.172v-4.56z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            type="button"
            className="svg-btn cancel"
            title="Remove"
            onClick={handleRemoveEntity}
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
          <ul className="tool-box">
            {selected.actions.map((action: string) => {
              return (
                <li key={action}>
                  <div>
                    <button
                      type="button"
                      className={`btn ${
                        props.map_.tool === action ? "active" : ""
                      }`}
                      value={action}
                      onClick={handlePickTool}
                    >
                      {action}
                    </button>
                  </div>
                  {props.map_.tool === action ? (
                    <div className="tool-description-box">
                      <span>{mapToolDescriptions[props.map_.tool]}</span>
                    </div>
                  ) : (
                    ""
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="mb24 tool-box tool-box-border">
        <div className="tb-header">
          <span className="tb-heading">
            {selected.x}, {selected.y}
          </span>
        </div>
        <div className="flex-with-gap">
          <strong>-</strong>
        </div>
      </div>
    );
  }
}
