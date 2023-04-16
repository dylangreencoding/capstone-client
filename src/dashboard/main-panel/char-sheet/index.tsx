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
  const [charLevel, setCharLevel] = useState<number>(props.savedChar.level);


  const handleSubmitChar = async (e: any) => {
    e.preventDefault();
    
    let currentChar = props.savedChar;
    currentChar.name = charName;
    currentChar.level = charLevel;
    currentChar.x = -100;
    currentChar.y = -100;

    await updateChar(props.accessToken, currentChar);

    await props.getUserData();
  }


  return (
    <div className='char-sheet'>
      <form className="text-form" onSubmit={handleSubmitChar}>
        <label className="mb24">
          Name
          <input 
          className="text-input"
            type="text"
            placeholder={charName}
            value={charName}
            onChange={(e) => {setCharName(e.target.value)}}
          />
        </label>
        <label className="mb24">
          Level
          <input 
            className="text-input"
            type="text"
            value={charLevel}
            onChange={(e) => {setCharLevel(isNaN(Number(e.target.value)) ? 5 : Number(e.target.value))}}
          />
        </label>
        <button className='btn' type="submit">save</button>
      </form>
    </div>
  )
}