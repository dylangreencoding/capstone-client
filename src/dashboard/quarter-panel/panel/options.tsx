
interface Props {
  setCurrent: Function;
}

export default function Options (props: Props) {
  return (
    <div className='options'>
      <div>
        <div>USERNAME</div>
        <div>LOGOUT</div>
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