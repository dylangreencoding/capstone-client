
interface Props {
  savedMap: any;
  setSavedMap: Function;

}

export default function MapTools (props: Props) {
  return (
    <div>
      Map Tools
      <div>
        <span>
          {props.savedMap.selected.x}, {props.savedMap.selected.y}
        </span>
      </div>
    </div>
  )
}