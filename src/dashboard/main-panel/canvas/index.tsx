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

  const gridPosition = useRef<any>({ x: 0, y: 0, scale: 25, selector: { x: undefined, y: undefined}, selected: { x: undefined, y: undefined} });


  useEffect(() => {
    const currentMap = props.savedMap
    
    // assure typescript compiler canvasRef is not null
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth * 0.75;
    canvas.height = window.innerHeight;

    const getHashX = () => {
      let hashX : any = {};
      let currentSquare = gridPosition.current.x;
      let hashCounter = 0;
      for (let x = gridPosition.current.x; x < (gridPosition.current.scale * currentMap.width) + gridPosition.current.x; x++) {
        if (hashCounter === gridPosition.current.scale) {
          currentSquare += gridPosition.current.scale;
          hashCounter = 0;
        }
        hashCounter += 1;
        hashX[x] = currentSquare;
      }
      return hashX
    }

    const getHashY = () => {
      let hashY : any = {};
      let currentSquare = gridPosition.current.y;
      let hashCounter = 0;
      for (let y = gridPosition.current.y; y < (gridPosition.current.scale * currentMap.height) + gridPosition.current.y; y++) {
        if (hashCounter === gridPosition.current.scale) {
          currentSquare += gridPosition.current.scale;
          hashCounter = 0;
        }
        hashCounter += 1;
        hashY[y] = currentSquare;
      }
      return hashY
    }

    draw(ctx, canvas.width, canvas.height, gridPosition.current, currentMap);
    let hashX = getHashX();
    let hashY = getHashY();

    interface Mouse {
      pressed: boolean;
      movedMap: boolean;
      movementXY: { x: any, y: any };
      position: { x: any, y: any };
      selected: { x: any, y: any };
    }
    let mouse : Mouse = { pressed: false, movedMap: false, movementXY: { x: undefined, y: undefined }, position: { x: undefined, y: undefined }, selected: { x: undefined, y: undefined } };

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
      console.log('selected on mousedown', gridPosition.current.selected);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.position = getMousePositionXY(e);
      mouse.movementXY = getMouseMovementXY(e);

      if (mouse.pressed === true) {
        mouse.movedMap = true;
        gridPosition.current.selector = {};

        gridPosition.current.x += mouse.movementXY.x;
        gridPosition.current.y += mouse.movementXY.y;

        gridPosition.current.selected.x += mouse.movementXY.x
        gridPosition.current.selected.y += mouse.movementXY.y

      } else {
        gridPosition.current.selector.x = mouse.position.x;
        gridPosition.current.selector.y = mouse.position.y;
      }

      draw(ctx, canvas.width, canvas.height, gridPosition.current, currentMap);
    }

    const handleMouseUp = (e: MouseEvent) => {
      mouse.pressed = false;
      mouse.selected = getMousePositionXY(e)
      if (mouse.movedMap === false) {
        if ((mouse.selected.x === gridPosition.current.selected.x && mouse.selected.y === gridPosition.current.selected.y) || mouse.selected.x === undefined || mouse.selected.y === undefined) {
          gridPosition.current.selected = { x: undefined, y: undefined };
          currentMap.selected = { x: undefined, y: undefined };
        } else {
          gridPosition.current.selected = mouse.selected;
          currentMap.selected = mouse.selected;
        }

        props.setSavedMap({...props.savedMap, currentMap});
        draw(ctx, canvas.width, canvas.height, gridPosition.current, currentMap);

      } else {
        gridPosition.current.selected = { x: undefined, y: undefined };
        currentMap.selected = { x: undefined, y: undefined };
        props.setSavedMap({...props.savedMap, currentMap});
        draw(ctx, canvas.width, canvas.height, gridPosition.current, currentMap);
      }

      hashX = getHashX();
      hashY = getHashY();
      mouse.movedMap = false;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      mouse.pressed = false;
      gridPosition.current.selector.x = undefined;
      gridPosition.current.selector.y = undefined;
      draw(ctx, canvas.width, canvas.height, gridPosition.current, currentMap);
    }

    const handleResize = (e: Event) => {
      canvas.width = window.innerWidth * 0.75;
      canvas.height = window.innerHeight;
      draw(ctx, canvas.width, canvas.height, gridPosition.current, currentMap);
    }

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      console.log('cleaned up')
    }

  }, []);

  return (
    <canvas
      className='canvas'
      ref={canvasRef}
      width={props.width}
      height={props.height}
    />
  )
}