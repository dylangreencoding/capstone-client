import Dashboard from "../../dashboard";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { refreshToken } from "../../expressAPI/refresh-token";
//
import { io } from 'socket.io-client';


// container for dashboard
// for JWT authorization, access and refresh tokens
export default function App () {
  console.log('app rendered')
  // get state from useNavigate called at login
  // call custom hook to GET user data (on component mount?)
  const location = useLocation();
  const [accessToken, setAccessToken] = useState<string>(location.state.accessToken);

  // use refresh token before it expires
  useEffect(() => {
    console.log('app useEffect')
    // this needs to be called automatically before access token expires
    const handleRefreshToken = async () => {
      const response = await refreshToken();
      console.log('handleRefreshToken', response)

      // set new access token from response
      setAccessToken(response.accessToken);
      console.log('new access token', accessToken)
    }
    // 1,200,000 milliseconds = 20 minutes
    // half the lifetime of the access token...
    setInterval(() => {
      console.log('interval')
      handleRefreshToken();
    }, 1200000)
  }, [])

  const socket = io('http://localhost:8080', 
  {
    transportOptions: {
      polling: {
        extraHeaders: {
          'Authorization': `Bearer ${accessToken}`,
        },
      },
    },
  });
  socket.on("connect_error", (e: any) => {
    console.log(e);
  });
  socket.on("connect", () => {
    console.log(socket.connected); // true
  });
  
  console.log('app rendered')
  return (
    <div>
      <Dashboard accessToken={accessToken} socket={socket}/>
    </div>
  )
}