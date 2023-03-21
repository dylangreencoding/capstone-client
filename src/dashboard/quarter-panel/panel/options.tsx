import { useNavigate } from "react-router-dom";
import { logOut } from "../../../server-calls/log-out";

interface Props {
  setCurrent: Function;
  userEmail: string;
}

export default function Options (props: Props) {

  const navigate = useNavigate();

  const handleLogout = async (e: any) => {
    e.preventDefault();
    try {
      const response = await logOut();
      alert(response.message);
      navigate('/');
    } catch (error) {
      alert(error);
    }
    
  }

  return (
    <div className='options'>
      <div>
        <div>{props.userEmail}</div>
        <div className='logout' onClick={handleLogout}>logout</div>
      </div>
      <br />
      <br />
      <br />
      <div>
        <div>Maps</div>
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
        <div>Characters</div>
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
        <div>Games</div>
        <ul>
          <li>- </li>
          <li>- </li>
          <li>- </li>
        </ul>
      </div>

    </div>
  )
}