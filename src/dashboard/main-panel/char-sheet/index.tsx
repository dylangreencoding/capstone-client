import { useState } from "react"
//
import { updateChar } from "../../../expressAPI/update-char";

interface Props {
  savedChar: any;
  setSavedChar: Function;
  
  accessToken: string;
  getUserData: Function;
}

export default function CharSheet (props: Props) {
  const [charName, setCharName] = useState<string>(props.savedChar.name);
  const [charSpeed, setCharSpeed] = useState<number>(props.savedChar.speed);
  const [charStatus, setCharStatus] = useState<number>(props.savedChar.status);


  const handleSubmitChar = async (e: any) => {
    e.preventDefault();
    
    let currentChar = props.savedChar;
    currentChar.name = charName;
    currentChar.speed = charSpeed;
    currentChar.status = charStatus;

    await updateChar(props.accessToken, currentChar);

    await props.getUserData();
  }


  return (
    <div className='char-sheet'>
      <form className="auth-form" onSubmit={handleSubmitChar}>
        <label className="mb24">
          <input 
            type="text"
            placeholder={charName}
            value={charName}
            onChange={(e) => {setCharName(e.target.value)}}
          />
        </label>
        <label className="mb24">
          Speed |
          <input 
            type="text"
            value={charSpeed}
            onChange={(e) => {setCharSpeed(isNaN(Number(e.target.value)) ? 5 : Number(e.target.value))}}
          />
        </label>
        <label className="mb24">
          Status |
          <input 
            type="text"
            value={charStatus}
            onChange={(e) => {setCharStatus(isNaN(Number(e.target.value)) ? 5 : Number(e.target.value))}}
          />
        </label>
        <button className='btn' type="submit">SAVE</button>
      </form>
    </div>
  )
}