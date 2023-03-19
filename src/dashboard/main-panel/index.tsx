import Canvas from "./canvas";

interface Props {
  current: string;
}

export default function MainPanel (props: Props) {
  return (
    <div className='main-panel'>
      <Canvas 
        width={window.innerWidth * 0.75}
        height={window.innerHeight}
      />
    </div>
  )
}