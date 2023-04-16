import Dashboard from "../../dashboard";
import { useState, useEffect } from "react";
import { refreshToken } from "../../expressAPI/refresh-token";
import { useToken } from "../../custom-hooks/useToken";
//
import { io } from 'socket.io-client';


// container for dashboard
// for JWT authorization, access and refresh tokens
export default function App () {
  console.log('app rendered')

  const { accessToken, setAccessToken } = useToken();
  const [socket, setSocket] = useState<any>(null);

  // use refresh token before it expires
  useEffect(() => {
    console.log('app socket useEffect')
    const newSocket = io(
      'http://localhost:8080', 
      {
        transportOptions: {
          polling: {
            extraHeaders: {
              'Authorization': `Bearer ${accessToken}`,
            },
          },
        },
      }
    )
    setSocket(newSocket);

    return () => {
      newSocket.close();
    }
  }, [setSocket])


  const handleRefreshToken = async () => {
    const response = await refreshToken();
    const newAccessToken = response.accessToken;
    console.log('newAccessToken', newAccessToken)
    setAccessToken(newAccessToken);
    console.log('accessToken (should be set to newAccessToken)', accessToken)
  }


  
  return (
    <div>
      {/* <button type="button" onClick={handleRefreshToken}>REFRESH TOKEN</button> */}
      <Dashboard accessToken={accessToken} socket={socket}/>
    </div>
  )
}