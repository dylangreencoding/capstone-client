import Dashboard from "../../dashboard";
import { useState, useEffect } from "react";
import { useGetUser } from "../../custom-hooks/useGetUser";
//
import { io } from 'socket.io-client';


// container for dashboard
// for JWT authorization, access and refresh tokens
export default function App () {

  const { accessToken, user, getUserData } = useGetUser();
  console.log('app', user);
  
  // TODO: probably extract this to custom hook so it can be up to date with JWT
  // for now this is fine
  const [socket, setSocket] = useState<any>(null);
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
  }, [setSocket, accessToken])

    
  return (
    <div>
      <Dashboard 
        accessToken={accessToken} 
        socket={socket}
        user={user}
        getUserData={getUserData}
      />
    </div>
  )
}