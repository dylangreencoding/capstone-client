import { useEffect, useRef, useState } from 'react';
//
import { draw } from './draw';

interface Props {
  width: number;
  height: number;
  savedMap: any;
  setSavedMap: Function;
}

export default function Canvas (props: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // can't remember why I need this
  // might just pass props.savedMap as useEffect dependency
  // also might put props.tool inside props.savedMap
  // see comments above props.tool state variable initialization in Dashboard component
  // for now this seems fine
  const currentMap = props.savedMap;
  
  useEffect(() => {
    
    // assure typescript compiler canvasRef is not null
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth * 0.75;
    canvas.height = window.innerHeight;

    interface Mouse {
      pressed: boolean;
      movedMap: boolean;
      movementXY: { x: any, y: any };
      position: { x: any, y: any };
      selected: { x: any, y: any };
      selector: { x: any, y: any };
      doubleTap: boolean;
    }
    let mouse : Mouse = { pressed: false, movedMap: false, movementXY: { x: undefined, y: undefined }, position: { x: undefined, y: undefined }, selected: { x: undefined, y: undefined }, selector: { x: undefined, y: undefined }, doubleTap: false };

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

    draw(ctx, canvas.width, canvas.height, mouse.selector, currentMap, props.savedMap);
    let hashX = getHashX();
    let hashY = getHashY();

    const getLine = (start: any, end: any) => {
      return {
        aX: start.x,
        aY: start.y,
        bX: end.x,
        bY: end.y
      }
    }

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

        // moves walls
        for (const line of currentMap.lines) {
          if (mouse.pressed === true) {
            line.aX += mouse.movementXY.x
            line.aY += mouse.movementXY.y
            line.bX += mouse.movementXY.x
            line.bY += mouse.movementXY.y
          }
        }

        for (const location of currentMap.locations) {
          if (mouse.pressed === true) {
            location.x += mouse.movementXY.x
            location.y += mouse.movementXY.y
          }
        }

      } else {
        mouse.selector.x = mouse.position.x;
        mouse.selector.y = mouse.position.y;
      }

      draw(ctx, canvas.width, canvas.height, mouse.selector, currentMap, props.savedMap);
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
      
        } else if (currentMap.tool === 'add location' && mouse.doubleTap === true && mouse.selected.x !== undefined && mouse.selected.y !== undefined) {

          currentMap.locations.push(mouse.selected);
          currentMap.selected = mouse.selected;


        } else {
          currentMap.selected = mouse.selected;
        }

        if (mouse.doubleTap === true) {
          currentMap.selected = { x: undefined, y: undefined };
        }

        props.setSavedMap({...props.savedMap, currentMap});
        draw(ctx, canvas.width, canvas.height, mouse.selector, currentMap, props.savedMap);


      } else {
        currentMap.selected = { x: undefined, y: undefined };
        props.setSavedMap({...props.savedMap, currentMap});
        draw(ctx, canvas.width, canvas.height, mouse.selector, currentMap, props.savedMap);
      }

      hashX = getHashX();
      hashY = getHashY();
      mouse.movedMap = false;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      mouse.pressed = false;
      mouse.selector.x = undefined;
      mouse.selector.y = undefined;
      draw(ctx, canvas.width, canvas.height, mouse.selector, currentMap, props.savedMap);
    }

    const handleResize = (e: Event) => {
      canvas.width = window.innerWidth * 0.75;
      canvas.height = window.innerHeight;
      draw(ctx, canvas.width, canvas.height, mouse.selector, currentMap, props.savedMap);
    }

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    // canvas.addEventListener('wheel', handleMouseWheel);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      // canvas.removeEventListener('wheel', handleMouseWheel);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      console.log('cleaned up')
    }
  }, [props.savedMap, props.setSavedMap]);

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