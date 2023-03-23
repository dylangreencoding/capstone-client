interface Props {
  savedMap: any;
  setSavedMap: Function;
}

export default function GameTools (props: Props) {
  return (
    <div>
      <div className='mb36 flex-space-between'>
        <span>
          {props.savedMap.selected.x}, {props.savedMap.selected.y}
        </span>
        <h3>{props.savedMap.name}</h3>
      </div>
    </div>
  )
}