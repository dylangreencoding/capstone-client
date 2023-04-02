interface Props {
  savedChar: any;
  setSavedChar: Function;
}

export default function CharTools (props: Props) {

  return (
    <div>
      <div className='mb36 flex-space-between'>
        <h3>{props.savedChar.name}</h3>
      </div>
    </div>
  )
}