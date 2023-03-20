import { useRouteError } from 'react-router-dom';

export default function ErrorPage () {
  const error : any = useRouteError();
  console.log(error);

  return (
    <div id='error-page'>
      <h1>Error Page</h1>
      <p>An error has occurred. Helpful?</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}