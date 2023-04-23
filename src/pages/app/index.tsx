import Dashboard from "../../dashboard";
import { useState, useEffect } from "react";
import { useGetUser } from "../../custom-hooks/useGetUser";
//
import { io } from 'socket.io-client';
import { serverUrl } from "../../expressAPI/utilities/server-url";


// container for dashboard
// for JWT authorization, access and refresh tokens
export default function App () {

  const { accessToken, user, getUserData } = useGetUser();
  console.log('app', user);
  
  // TODO: There is an order of operations issue here:
  // If a socket event is emitted with a dead accessToken,
  // the accessToken IS technically refreshed before the socket event is emitted,
  // however the SOCKET auth-header will only be updated when the useEffect dependency [accessToken] changes.
  // By this time the event has already been emitted from within the click event handler in game-tools.tsx.
  // The next socket event will work fine.
  // This is fine for this prototype.
  const [socket, setSocket] = useState<any>(null);
  useEffect(() => {
    console.log('app socket useEffect')
    const newSocket = io(
      serverUrl, 
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
        user={user}
        getUserData={getUserData}

        socket={socket}
      />
    </div>
  )
}