interface Props {
  setCurrent: Function;
  setTab: Function;

  savedChar: any;
  setSavedChar: Function;
}

export default function CharTools (props: Props) {

  const handleJoinGame = (e: any) => {
    e.preventDefault(); 
    alert('CharTools handleJoinGame clicked')
  }

  return (
    <div>
      <div className='mb36 flex-space-between'>
        <h3>{props.savedChar.name}</h3>
        <button type='button' className="tool btn" onClick={handleJoinGame}>join game</button>
      </div>
    </div>
  )
}