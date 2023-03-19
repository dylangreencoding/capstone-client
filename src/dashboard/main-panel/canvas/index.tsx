import { useEffect, useRef } from 'react';
//
import { draw } from './draw';

interface Props {
  width: number;
  height: number;
}

export default function Canvas (props: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const gridPosition = useRef<any>({ x: 0, y: 0, scale: 25 });

  useEffect(() => {

    // ensure canvasRef is not null (ts)
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth * 0.75;
    canvas.height = window.innerHeight;

    draw(ctx, canvas.width, canvas.height, gridPosition.current);

    const handleResize = (e: Event) => {
      canvas.width = window.innerWidth * 0.75;
      canvas.height = window.innerHeight;
      draw(ctx, canvas.width, canvas.height, gridPosition.current);
    }

    window.addEventListener('resize', handleResize);
    return () => {
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