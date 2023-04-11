import { useEffect, useRef } from 'react';
//
import { draw } from './draw';
import { doIntersect } from './utilities';

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

export default function CanvasCopy (props: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let currentMap : any;
  let current : string = 'char';
  if (props.current === 'map') {
    currentMap = props.savedMap;
    current = 'map';
  } else if (props.current === 'game') { 
    currentMap = props.savedGame;
    current = 'game';
  }

  console.log(currentMap);
  useEffect(() => {
    
    // assure typescript compiler canvasRef is not null
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth * 0.75;
    canvas.height = window.innerHeight;

    interface Mouse {
      pressed: boolean;
      movedMap: boolean;
      doubleTap: boolean;
      canGoHere: boolean;

      movementXY: { x: any, y: any };
      position: { x: any, y: any };
      selected: { x: any, y: any };
      selector: { x: any, y: any };

    }
    let mouse : Mouse = { pressed: false, movedMap: false, movementXY: { x: undefined, y: undefined }, position: { x: undefined, y: undefined }, selected: { x: undefined, y: undefined }, selector: { x: undefined, y: undefined }, doubleTap: false, canGoHere: false };

    // for constructing grid reference hashmap X
    const getHashX = () => {
      let hashX : any = {};
      let currentSquare = currentMap.x;
      let hashCounter = 0;
      for (let x = currentMap.x; x < (currentMap.scale * currentMap.width) + currentMap.x; x++) {
        if (hashCounter === currentMap.scale) {
          currentSquare += currentMap.scale;
          hashCounter = 0;
        }
        hashCounter += 1;
        hashX[x] = currentSquare;
      }
      return hashX
    }

    // for constructing grid reference hashmap Y
    const getHashY = () => {
      let hashY : any = {};
      let currentSquare = currentMap.y;
      let hashCounter = 0;
      for (let y = currentMap.y; y < (currentMap.scale * currentMap.height) + currentMap.y; y++) {
        if (hashCounter === currentMap.scale) {
          currentSquare += currentMap.scale;
          hashCounter = 0;
        }
        hashCounter += 1;
        hashY[y] = currentSquare;
      }
      return hashY
    }

    // when the board is moved
    const reHashSelectFrom = () => {
      let newSelectFrom : any = {};
      for (const key of Object.keys(currentMap.selectFrom)) {
        if (key.length < 11) {
          newSelectFrom[locationToString({x: currentMap.selectFrom[key].x, y: currentMap.selectFrom[key].y})] = currentMap.selectFrom[key];
        } else {
          newSelectFrom[key] = currentMap.selectFrom[key];
        }
      }
      return newSelectFrom
    }

    // for constructing line object
    const getLine = (start: any, end: any) => {
      return {
        aX: start.x,
        aY: start.y,
        bX: end.x,
        bY: end.y
      }
    }

    // m_object parameter can be mouse object or map object
    // both have m_object.selected property
    const getSelected = (m_object: any) => {
      let selected;
      if (m_object.selected.x !== undefined && m_object.selected.y !== undefined) {
        selected = currentMap.selectFrom[locationToString(m_object.selected)];
        if (selected != undefined) {
          return selected
        } else {
          return 'empty square'
        }
      } else {
        return 'none selected'
      }
    }

    draw(ctx, canvas.width, canvas.height, mouse, current === 'map' ? props.savedMap : props.savedGame);
    let hashX = getHashX();
    let hashY = getHashY();
    // this needs to be after hashmaps are constructed
    const locationToString = (location: any) => {
      // setting undefined character locations (selectFrom keys) to edge of map
      // as if they fell of map and had to be picked up
      // ultimately preferably add them to list of charcters that need to be placed
      if (location.x === undefined) {
        location.x = currentMap.x;
      }
      if (location.y === undefined) {
        location.y = currentMap.y;
      }

      const x = location.x.toString();
      const y = location.y.toString();

      const xy = x.concat(' ', y);
      return xy
    }

    // THIS CORRECTS A WEIRD BUG
    // sometimes the character locations get offset relative to the grid and can not longer be selected
    // i haven't looked into the cause of this
    // this fix is like reaching out and physically centering the game pieces on their squares
    // each time the board is drawn
    // UPDATE: MIGHT HAVE FOUND CAUSE OF BUG THIS IS MEANT TO FIX
    // i may have been passing too many arguments to the draw function
    // not sure about this though
    for (const key of Object.keys(currentMap.selectFrom)) {
      if (key.length < 20) {
        const replacementValue = currentMap.selectFrom[key];

        isNaN(replacementValue.x) ?
        replacementValue.x = currentMap.x :
        replacementValue.x = hashX[currentMap.selectFrom[key].x] ;
        
        isNaN(replacementValue.y) ?
        replacementValue.y = currentMap.y :
        replacementValue.y = hashY[currentMap.selectFrom[key].y] ;

        // delete current entry
        delete currentMap.selectFrom[key];

        // make new entry
        currentMap.selectFrom[locationToString({x: replacementValue.x, y: replacementValue.y})] = replacementValue;
      }
    }

    // this also needs to be after hashmaps are constructed 
    const getMousePositionXY = (e: MouseEvent) => {
      let positionX = hashX[e.clientX];
      let positionY = hashY[e.clientY];
      return {
        x: positionX,
        y: positionY
      }
    }
    const getMouseMovementXY = (e: MouseEvent) => {
      return {
        x: e.movementX,
        y: e.movementY
      }
    }

    // ******************* \\
    // ***EVENT HANDLERS*** \\
    const handleMouseDown = (e: MouseEvent) => {
      mouse.pressed = true;
    }

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
          line.aX += mouse.movementXY.x
          line.aY += mouse.movementXY.y
          line.bX += mouse.movementXY.x
          line.bY += mouse.movementXY.y
        }


        for (const key of Object.keys(currentMap.selectFrom)) {
          currentMap.selectFrom[key].x += mouse.movementXY.x;
          currentMap.selectFrom[key].y += mouse.movementXY.y;
        }

      } else {
        if (mouse.position.x !== undefined && mouse.position.y !== undefined) {
          // set / draw selector on grid
          mouse.selector.x = mouse.position.x;
          mouse.selector.y = mouse.position.y;

          if (currentMap.tool === 'move' || currentMap.tool === 'shoot' && currentMap.selected.x !== undefined && currentMap.selected.y !== undefined && mouse.selector.x !== undefined && mouse.selector.y !== undefined) {
            const distance = Math.sqrt ( ( currentMap.selected.x - mouse.selector.x ) * ( currentMap.selected.x - mouse.selector.x ) + ( currentMap.selected.y - mouse.selector.y ) * ( currentMap.selected.y - mouse.selector.y ) );

            const moveFrom = getSelected(currentMap);

            if (distance <= moveFrom.level * currentMap.scale) {
              mouse.canGoHere = true;
            } else {
              mouse.canGoHere = false;
            }

            for ( const line of currentMap.lines ) {
              if ( doIntersect ( { x: currentMap.selected.x, y: currentMap.selected.y}, { x: mouse.selector.x, y: mouse.selector.y }, {x: line.aX, y: line.aY}, {x: line.bX, y: line.bY} ) === true ) {
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
      

      draw(ctx, canvas.width, canvas.height, mouse, current === 'map' ? props.savedMap : props.savedGame);
    }

    const handleMouseUp = (e: MouseEvent) => {
      mouse.pressed = false;
      mouse.selected = getMousePositionXY(e)

      if (mouse.movedMap === false) {

        // deselects selected
        if ((mouse.selected.x === currentMap.selected.x && mouse.selected.y === currentMap.selected.y) || mouse.selected.x === undefined || mouse.selected.y === undefined) {        
          mouse.doubleTap = true;
        } 
        

        if (currentMap.tool === 'add line' && mouse.doubleTap !== true) {
          if (currentMap.selected.x !== undefined && currentMap.selected.y !== undefined && mouse.selected.x !== undefined && mouse.selected.y !== undefined) {
            const newLine = getLine(currentMap.selected, mouse.selected);
            currentMap.lines.push(newLine);
            currentMap.selected = { x: undefined, y: undefined};
          } else {
          currentMap.selected = mouse.selected;
          }

      
        } else if (currentMap.tool === 'add location' && mouse.doubleTap === false && mouse.selected.x !== undefined && mouse.selected.y !== undefined) {

          currentMap.selectFrom[locationToString(mouse.selected)] = {x: mouse.selected.x, y: mouse.selected.y, type: 'location', level: 10 };

          currentMap.selected = { x: undefined, y: undefined};

        } else if (currentMap.tool === 'move' && mouse.doubleTap !== true) {

          if (currentMap.selected.x !== undefined && currentMap.selected.y !== undefined && mouse.selected.x !== undefined && mouse.selected.y !== undefined) {
            const moveFrom = getSelected(currentMap)
            const moveTo = getSelected(mouse)
            if (moveFrom !== 'empty square' && moveFrom !== 'none selected' && moveTo === 'empty square' && mouse.canGoHere === true) {
              // get replacement value
              const replacementValue = currentMap.selectFrom[locationToString({x: currentMap.selected.x, y: currentMap.selected.y})];
              replacementValue.x = mouse.selected.x;
              replacementValue.y = mouse.selected.y;

              // delete current entry
              delete currentMap.selectFrom[locationToString({x: currentMap.selected.x, y: currentMap.selected.y})];
              console.log('RP', replacementValue);

              // make new entry
              currentMap.selectFrom[locationToString({x: mouse.selected.x, y: mouse.selected.y})] = replacementValue;
            }

            currentMap.selected = { x: undefined, y: undefined};

          } else {
            currentMap.selected = mouse.selected;
          }

        } else if (currentMap.tool === 'shoot' && mouse.doubleTap !== true) {

          if (currentMap.selected.x !== undefined && currentMap.selected.y !== undefined && mouse.selected.x !== undefined && mouse.selected.y !== undefined) {
            const shootFrom = getSelected(currentMap)
            const shootTo = getSelected(mouse)

            // TODO change this condition to if you include if it is your character/turn to go
            if (shootFrom !== 'empty square' && shootFrom !== 'none selected' && shootTo !== 'empty square' && mouse.canGoHere === true) {
              delete currentMap.selectFrom[locationToString({x: mouse.selected.x, y: mouse.selected.y})];
            }

            currentMap.selected = { x: undefined, y: undefined};

          } else {
            currentMap.selected = mouse.selected;
          } 

        } else if (currentMap.tool.length > 20) {
          const moveTo = getSelected(mouse);
          if (moveTo === 'empty square') {
            const replacementValue = currentMap.selectFrom[currentMap.tool];
            replacementValue.x = mouse.selected.x;
            replacementValue.y = mouse.selected.y;
            
            // delete current entry
            delete currentMap.selectFrom[currentMap.tool];
            console.log('place char replacement value', replacementValue);

            // make new entry
            currentMap.selectFrom[locationToString({x: mouse.selected.x, y: mouse.selected.y})] = replacementValue;

            // reset tool
            currentMap.tool = 'none';
          }
        } else {
          currentMap.selected = mouse.selected;

        }

        if (mouse.doubleTap === true) {
          currentMap.selected = { x: undefined, y: undefined };
        }

        props.current === 'map' ?
        props.setSavedMap({...props.savedMap, currentMap}) :
        props.setSavedGame({...props.savedGame, currentMap})

        draw(ctx, canvas.width, canvas.height, mouse, current === 'map' ? props.savedMap : props.savedGame);


      } else {
        currentMap.selectFrom = reHashSelectFrom();
        currentMap.selected = { x: undefined, y: undefined };

        props.current === 'map' ?
        props.setSavedMap({...props.savedMap, currentMap}) :
        props.setSavedGame({...props.savedGame, currentMap})

        draw(ctx, canvas.width, canvas.height, mouse, current === 'map' ? props.savedMap : props.savedGame);
      }

      hashX = getHashX();
      hashY = getHashY();
      mouse.movedMap = false;
    }

    const handleMouseEnter = (e: MouseEvent) => {
      canvas.classList.add('no-cursor');
      draw(ctx, canvas.width, canvas.height, mouse, current === 'map' ? props.savedMap : props.savedGame);
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // not sure why this is unnecessary:
      // canvas.classList.remove('no-cursor');

      mouse.pressed = false;
      mouse.selector.x = undefined;
      mouse.selector.y = undefined;
      draw(ctx, canvas.width, canvas.height, mouse, current === 'map' ? props.savedMap : props.savedGame);
    }

    const handleResize = (e: Event) => {
      canvas.width = window.innerWidth * 0.75;
      canvas.height = window.innerHeight;
      draw(ctx, canvas.width, canvas.height, mouse, current === 'map' ? props.savedMap : props.savedGame);
    }

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    // canvas.addEventListener('wheel', handleMouseWheel);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      // canvas.removeEventListener('wheel', handleMouseWheel);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      console.log('canvas')
    }
  // when these change the useEffect is called
  }, [props.savedMap, props.savedGame, props.current]);

  return (
    <div>
      <canvas
        className='canvas'
        ref={canvasRef}
        width={props.width}
        height={props.height}
      />
    </div>
  )
}