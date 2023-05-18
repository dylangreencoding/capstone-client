import { useEffect, useRef } from "react";
//
import { draw } from "./draw";
import { doIntersect } from "./utilities";

interface Props {
  width: number;
  height: number;

  current: string;
  setCurrent: Function;

  savedMap: any;
  setSavedMap: Function;
  savedGame: any;
  setSavedGame: Function;
}

export default function NewCanvas(props: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // currentMap is used to set state variable
  let currentMap: any;
  // current is used to dictate wha
  let current: string = "char";
  if (props.current === "map") {
    currentMap = props.savedMap;
    current = "map";
  } else if (props.current === "game") {
    currentMap = props.savedGame;
    current = "game";
  }

  useEffect(() => {
    // must assure typescript compiler canvasRef is not null
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth * 0.75;
    canvas.height = window.innerHeight;

    interface Mouse {
      pressed: boolean;
      movedMap: boolean;
      doubleTap: boolean;
      canGoHere: boolean;

      movementXY: { x: any; y: any };
      position: { x: any; y: any };
      selected: { x: any; y: any };
      selector: { x: any; y: any };
    }
    let mouse: Mouse = {
      pressed: false,
      movedMap: false,
      movementXY: { x: undefined, y: undefined },
      position: { x: undefined, y: undefined },
      selected: { x: undefined, y: undefined },
      selector: { x: undefined, y: undefined },
      doubleTap: false,
      canGoHere: false,
    };

    // for constructing grid reference hashmap X
    const getHashX = () => {
      let hashX: any = {};
      let currentSquare = currentMap.x;
      let hashCounter = 0;
      for (
        let x = currentMap.x;
        x < currentMap.scale * currentMap.width + currentMap.x;
        x++
      ) {
        if (hashCounter === currentMap.scale) {
          currentSquare += currentMap.scale;
          hashCounter = 0;
        }
        hashCounter += 1;
        hashX[x] = currentSquare;
      }
      return hashX;
    };

    // for constructing grid reference hashmap Y
    const getHashY = () => {
      let hashY: any = {};
      let currentSquare = currentMap.y;
      let hashCounter = 0;
      for (
        let y = currentMap.y;
        y < currentMap.scale * currentMap.height + currentMap.y;
        y++
      ) {
        if (hashCounter === currentMap.scale) {
          currentSquare += currentMap.scale;
          hashCounter = 0;
        }
        hashCounter += 1;
        hashY[y] = currentSquare;
      }
      return hashY;
    };

    // for constructing line object
    const getLine = (start: any, end: any) => {
      return {
        aX: start.x,
        aY: start.y,
        bX: end.x,
        bY: end.y,
      };
    };

    const locationToString = (location: any) => {
      const x = location.x.toString();
      const y = location.y.toString();

      const xy = x.concat(" ", y);
      return xy;
    };

    // m_object parameter can be mouse object or map object
    // both have m_object.selected property
    const getSelected = (m_object: any) => {
      let selected;
      if (
        m_object.selected.x !== undefined &&
        m_object.selected.y !== undefined
      ) {
        selected =
          currentMap.entities[
            locationToString({
              x: m_object.selected.x - currentMap.x,
              y: m_object.selected.y - currentMap.y,
            })
          ];
        console.log(selected);
        if (selected !== undefined) {
          return selected;
        } else {
          return "empty square";
        }
      } else {
        return "none selected";
      }
    };

    const getMouseMovementXY = (e: MouseEvent) => {
      return {
        x: e.movementX,
        y: e.movementY,
      };
    };

    // *** FIRST DRAW *** \\
    draw(
      ctx,
      canvas.width,
      canvas.height,
      mouse,
      current === "map" ? props.savedMap : props.savedGame
      // currentMap
    );
    // *** INITIALIZE HASHMAPS *** \\
    let hashX = getHashX();
    let hashY = getHashY();

    // this needs to be after hashmaps are constructed
    const getMousePositionXY = (e: MouseEvent) => {
      let positionX = hashX[e.clientX];
      let positionY = hashY[e.clientY];
      return {
        x: positionX,
        y: positionY,
      };
    };

    // TODO: use switch case here instead of if-elseif
    // ******************* \\
    // ***EVENT HANDLERS*** \\
    const handleMouseDown = (e: MouseEvent) => {
      mouse.pressed = true;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.position = getMousePositionXY(e);
      mouse.movementXY = getMouseMovementXY(e);

      if (mouse.pressed === true) {
        mouse.movedMap = true;
        mouse.selector = { x: undefined, y: undefined };

        currentMap.selected = {};
        currentMap.x += mouse.movementXY.x;
        currentMap.y += mouse.movementXY.y;

        // moves lines
        for (const line of currentMap.lines) {
          line.aX += mouse.movementXY.x;
          line.aY += mouse.movementXY.y;
          line.bX += mouse.movementXY.x;
          line.bY += mouse.movementXY.y;
        }
      } else {
        if (mouse.position.x !== undefined && mouse.position.y !== undefined) {
          // set / draw selector on grid
          mouse.selector.x = mouse.position.x;
          mouse.selector.y = mouse.position.y;

          if (
            currentMap.tool === "move" ||
            (currentMap.tool === "shoot" &&
              currentMap.selected.x !== undefined &&
              currentMap.selected.y !== undefined &&
              mouse.selector.x !== undefined &&
              mouse.selector.y !== undefined)
          ) {
            const distance = Math.sqrt(
              (currentMap.selected.x - mouse.selector.x) *
                (currentMap.selected.x - mouse.selector.x) +
                (currentMap.selected.y - mouse.selector.y) *
                  (currentMap.selected.y - mouse.selector.y)
            );

            const moveFrom = getSelected(currentMap);

            if (distance <= moveFrom.level * currentMap.scale) {
              mouse.canGoHere = true;
            } else {
              mouse.canGoHere = false;
            }

            // uses an iterator to produce all values
            // lines is a mudane array (iterable) of objects, so I feel like this syntax is safe here
            for (const line of currentMap.lines) {
              if (
                doIntersect(
                  { x: currentMap.selected.x, y: currentMap.selected.y },
                  { x: mouse.selector.x, y: mouse.selector.y },
                  { x: line.aX, y: line.aY },
                  { x: line.bX, y: line.bY }
                ) === true
              ) {
                mouse.canGoHere = false;
              }
            }
          }
        } else {
          // draw selector when not on grid
          mouse.selector.x = e.clientX;
          mouse.selector.y = e.clientY;
        }
      }

      draw(
        ctx,
        canvas.width,
        canvas.height,
        mouse,
        current === "map" ? props.savedMap : props.savedGame
        // currentMap
      );
    };

    const handleMouseUp = (e: MouseEvent) => {
      mouse.pressed = false;
      mouse.selected = getMousePositionXY(e);

      if (mouse.movedMap === false) {
        // deselects selected
        if (
          (mouse.selected.x === currentMap.selected.x &&
            mouse.selected.y === currentMap.selected.y) ||
          mouse.selected.x === undefined ||
          mouse.selected.y === undefined
        ) {
          mouse.doubleTap = true;
        }

        if (currentMap.tool === "add line" && mouse.doubleTap !== true) {
          if (
            currentMap.selected.x !== undefined &&
            currentMap.selected.y !== undefined &&
            mouse.selected.x !== undefined &&
            mouse.selected.y !== undefined
          ) {
            const newLine = getLine(currentMap.selected, mouse.selected);
            currentMap.lines.push(newLine);
            currentMap.selected = { x: undefined, y: undefined };
          } else {
            currentMap.selected = mouse.selected;
          }
        } else if (
          currentMap.tool === "add location" &&
          mouse.doubleTap === false &&
          mouse.selected.x !== undefined &&
          mouse.selected.y !== undefined
        ) {
          currentMap.entities[
            locationToString({
              x: mouse.selected.x - currentMap.x,
              y: mouse.selected.y - currentMap.y,
            })
          ] = {
            x: mouse.selected.x - currentMap.x,
            y: mouse.selected.y - currentMap.y,
            type: "location",
            level: 10,
          };

          currentMap.selected = { x: undefined, y: undefined };
        } else if (currentMap.tool === "move" && mouse.doubleTap !== true) {
          if (
            currentMap.selected.x !== undefined &&
            currentMap.selected.y !== undefined &&
            mouse.selected.x !== undefined &&
            mouse.selected.y !== undefined
          ) {
            const moveFrom = getSelected(currentMap);
            const moveTo = getSelected(mouse);
            console.log(currentMap.selected, mouse.selected, moveFrom, moveTo);
            if (
              moveFrom !== "empty square" &&
              moveFrom !== "none selected" &&
              moveTo === "empty square" &&
              mouse.canGoHere === true
            ) {
              // delete current entry
              delete currentMap.entities[
                locationToString({
                  x: moveFrom.x,
                  y: moveFrom.y,
                })
              ];

              // make new entry
              moveFrom.x = mouse.selected.x - currentMap.x;
              moveFrom.y = mouse.selected.y - currentMap.y;
              currentMap.entities[
                locationToString({
                  x: moveFrom.x,
                  y: moveFrom.y,
                })
              ] = moveFrom;
            }
            console.log(currentMap.entities);

            currentMap.selected = { x: undefined, y: undefined };
          } else {
            currentMap.selected = mouse.selected;
          }
        } else if (currentMap.tool === "shoot" && mouse.doubleTap !== true) {
          if (
            currentMap.selected.x !== undefined &&
            currentMap.selected.y !== undefined &&
            mouse.selected.x !== undefined &&
            mouse.selected.y !== undefined
          ) {
            const shootFrom = getSelected(currentMap);
            const shootTo = getSelected(mouse);

            // TODO change this condition to if you include if it is your character/turn to go
            if (
              shootFrom !== "empty square" &&
              shootFrom !== "none selected" &&
              shootTo !== "empty square" &&
              mouse.canGoHere === true
            ) {
              delete currentMap.entities[
                locationToString({
                  x: mouse.selected.x - currentMap.x,
                  y: mouse.selected.y - currentMap.y,
                })
              ];
            }

            currentMap.selected = { x: undefined, y: undefined };
          } else {
            currentMap.selected = mouse.selected;
          }
        } else if (currentMap.tool.length > 20) {
          const moveTo = getSelected(mouse);
          if (moveTo === "empty square") {
            const replacementValue = currentMap.entities[currentMap.tool];
            replacementValue.x = mouse.selected.x;
            replacementValue.y = mouse.selected.y;

            // delete current entry
            delete currentMap.entities[currentMap.tool];
            console.log("place char replacement value", replacementValue);

            // make new entry
            currentMap.entities[
              locationToString({
                x: mouse.selected.x - currentMap.x,
                y: mouse.selected.y - currentMap.y,
              })
            ] = replacementValue;

            // reset tool
            currentMap.tool = "none";
          }
        } else {
          currentMap.selected = mouse.selected;
        }

        if (mouse.doubleTap === true) {
          currentMap.selected = { x: undefined, y: undefined };
        }

        props.current === "map"
          ? props.setSavedMap({ ...props.savedMap, currentMap })
          : props.setSavedGame({ ...props.savedGame, currentMap });

        console.log(currentMap.x, hashX);

        draw(
          ctx,
          canvas.width,
          canvas.height,
          mouse,
          current === "map" ? props.savedMap : props.savedGame
          // currentMap
        );
      } else {
        // currentMap.d = reHashSelectFrom();
        currentMap.selected = { x: undefined, y: undefined };

        props.current === "map"
          ? props.setSavedMap({ ...props.savedMap, currentMap })
          : props.setSavedGame({ ...props.savedGame, currentMap });

        draw(
          ctx,
          canvas.width,
          canvas.height,
          mouse,
          current === "map" ? props.savedMap : props.savedGame
          // currentMap
        );
      }

      hashX = getHashX();
      hashY = getHashY();
      mouse.movedMap = false;
    };

    const handleMouseEnter = (e: MouseEvent) => {
      canvas.classList.add("no-cursor");
      draw(
        ctx,
        canvas.width,
        canvas.height,
        mouse,
        current === "map" ? props.savedMap : props.savedGame
        // currentMap
      );
    };

    const handleMouseLeave = (e: MouseEvent) => {
      // not sure why this is unnecessary:
      // canvas.classList.remove('no-cursor');

      mouse.pressed = false;
      mouse.selector.x = undefined;
      mouse.selector.y = undefined;
      draw(
        ctx,
        canvas.width,
        canvas.height,
        mouse,
        current === "map" ? props.savedMap : props.savedGame
        // currentMap
      );
    };

    const handleResize = (e: Event) => {
      canvas.width = window.innerWidth * 0.75;
      canvas.height = window.innerHeight;
      draw(
        ctx,
        canvas.width,
        canvas.height,
        mouse,
        current === "map" ? props.savedMap : props.savedGame
        // currentMap
      );
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    // canvas.addEventListener('wheel', handleMouseWheel);
    canvas.addEventListener("mouseenter", handleMouseEnter);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);
    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      // canvas.removeEventListener('wheel', handleMouseWheel);
      canvas.removeEventListener("mouseenter", handleMouseEnter);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      console.log("canvas");
    };
    // when these change the useEffect is called
  }, [props.savedMap, props.savedGame, props.current]);

  return (
    <div>
      <canvas
        className="canvas"
        ref={canvasRef}
        width={props.width}
        height={props.height}
      />
    </div>
  );
}
