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
      <div className='flex-space-between mb36'>
        <h3>{props.userEmail}</h3>
        <button type="button" className='tool btn' onClick={handleLogout}>logout</button>
      </div>
      <div className="mb36">
        <div className='flex-space-between'>
          <h4>maps </h4>
          <button type='button' className="tool btn" onClick={handleNewMap}>new</button>
        </div>
        <ul>
          <li>- </li>
        </ul>
      </div>
      <div className="mb36">
        <div className='flex-space-between'>
          <h4>characters </h4>
          <button type='button' className="tool btn" onClick={handleNewChar}>new</button>
        </div>
        <ul>
          <li>- </li>
        </ul>
      </div>
      <div className="mb36">
        <div className='flex-space-between'>
          <h4>games </h4>
          <button type='button' className="tool btn" onClick={handleNewGame}>new</button>
        </div>
        <ul>
          <li>- </li>
        </ul>
      </div>

    </div>
  )
}