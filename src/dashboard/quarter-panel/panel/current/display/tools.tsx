import { mapToolDescriptions } from "../../../../object-templates";

interface Props {
  map_: any;
  setMap_: Function;
}

export default function Tools(props: Props) {
  const handlePickTool = (e: any) => {
    const currentMap = props.map_;
    currentMap.tool = e.target.value;
    if (e.target.value === "add line" || e.target.value === "add location")
      currentMap.selected = {};
    props.setMap_({ ...props.map_, currentMap });
  };

  const handleUndoLine = (e: any) => {
    const currentMap = props.map_;
    currentMap.lines.pop();
    props.setMap_({ ...props.map_, currentMap });
  };

  return (
    <div className="tool-box mb24 tool-box-border">
      <div className="tb-header">
        <span className="tb-heading">Tools</span>
      </div>
      <div>
        <button
          type="button"
          className={`btn ${props.map_.tool === "none" ? "active" : ""}`}
          value="none"
          onClick={handlePickTool}
        >
          select
        </button>
      </div>
      {props.map_.tool === "none" ? (
        <div className="tool-description-box">
          <span>{mapToolDescriptions[props.map_.tool]}</span>
        </div>
      ) : (
        ""
      )}
      <div className="flex-with-gap">
        <button
          type="button"
          className={`btn ${props.map_.tool === "add line" ? "active" : ""}`}
          value="add line"
          onClick={handlePickTool}
        >
          add wall{" "}
        </button>
        {props.map_.lines.length > 0 ? (
          <button
            type="button"
            className="btn"
            value="undo line"
            onClick={handleUndoLine}
          >
            undo wall
          </button>
        ) : (
          ""
        )}
      </div>
      {props.map_.tool === "add line" ? (
        <div className="tool-description-box">
          <span>{mapToolDescriptions[props.map_.tool]}</span>
        </div>
      ) : (
        ""
      )}
      <div>
        <button
          type="button"
          className={`btn ${
            props.map_.tool === "add location" ? "active" : ""
          }`}
          value="add location"
          onClick={handlePickTool}
        >
          place piece
        </button>
      </div>
      {props.map_.tool === "add location" ? (
        <div className="tool-description-box">
          <span>{mapToolDescriptions[props.map_.tool]}</span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
