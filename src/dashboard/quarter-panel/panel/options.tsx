import { useNavigate } from "react-router-dom";
import { logOut } from "../../../server-calls/log-out";

interface Props {
  setCurrent: Function;
  setTab: Function;
  userEmail: string;
}

export default function Options (props: Props) {

  const navigate = useNavigate();

  const handleLogout = async (e: any) => {
    e.preventDefault();
    try {
      const response = await logOut();
      alert(response.message);
      navigate('/', {replace: true});
    } catch (error) {
      alert(error);
    }
  }

  const handleNewMap = (e: any) => {
    props.setCurrent('map');
    props.setTab('current');
  }

  const handleNewChar = (e: any) => {
    props.setCurrent('char');
    props.setTab('current')
  }

  const handleNewGame = (e: any) => {
    props.setCurrent('game');
    props.setTab('current')
  }

  return (
    <div className='options'>
      <div>
        <div>{props.userEmail}</div>
        <div>
          <span className='options-link' onClick={handleLogout}>logout</span></div>
      </div>
      <br />
      <br />
      <br />
      <div>
        <div>
          <span>Maps </span>
          <span className="options-link" onClick={handleNewMap}>new</span>
        </div>
        <ul>
          <li>- </li>
          <li>- </li>
          <li>- </li>
        </ul>
      </div>
      <br />
      <br />
      <br />
      <div>
        <div>
          <span>Characters </span>
          <span className="options-link" onClick={handleNewChar}>new</span>
        </div>
        <ul>
          <li>- </li>
          <li>- </li>
          <li>- </li>
        </ul>
      </div>
      <br />
      <br />
      <br />
      <div>
        <div>
          <span>Games </span>
          <span className="options-link" onClick={handleNewGame}>new</span>
        </div>
        <ul>
          <li>- </li>
          <li>- </li>
          <li>- </li>
        </ul>
      </div>

    </div>
  )
}