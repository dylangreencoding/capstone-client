import { useState } from "react";
//
import { userRoute } from "../../../expressAPI/user-route";

interface Props {
  savedChar: any;
  setSavedChar: Function;

  accessToken: string;
  getUserData: Function;
}

export default function CharSheet(props: Props) {
  const [charName, setCharName] = useState<string>(props.savedChar.name);
  const [charLevel, setCharLevel] = useState<number>(props.savedChar.level);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmitChar = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      let currentChar = props.savedChar;
      currentChar.name = charName;
      currentChar.level = charLevel;
      currentChar.x = -100;
      currentChar.y = -100;

      const route = "char/save";
      await userRoute(route, props.accessToken, currentChar);

      await props.getUserData();
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  };

  const displaySubmitChar = () => {
    if (
      charName !== props.savedChar.name ||
      charLevel !== props.savedChar.level
    ) {
      return (
        <button className="btn" type="submit">
          save
        </button>
      );
    } else {
      return <span>- no changes to save -</span>;
    }
  };

  return (
    <div className="char-sheet">
      <form className="text-form" onSubmit={handleSubmitChar}>
        <label className="text-label mb24">
          Name
          <input
            className="text-input-large"
            type="text"
            required
            minLength={1}
            maxLength={12}
            title="Enter character name"
            placeholder={charName}
            value={charName}
            onChange={(e) => {
              setCharName(e.target.value);
            }}
          />
        </label>
        <label className="text-label mb24">
          Level
          <input
            className="text-input-large"
            type="text"
            spellCheck="false"
            required
            minLength={1}
            maxLength={4}
            title="Enter character level"
            value={charLevel}
            onChange={(e) => {
              setCharLevel(
                isNaN(Number(e.target.value)) ? 10 : Number(e.target.value)
              );
            }}
          />
        </label>
        {!loading ? (
          displaySubmitChar()
        ) : (
          <span className="small">Loading...</span>
        )}
      </form>
    </div>
  );
}
