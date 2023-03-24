import { useState, useEffect } from 'react';
import { getUser } from '../server-calls/get-user'

export const useGetUser = (token: string) => {
  const [user, setUser] = useState<any>([]);
  const [maps, setMaps] = useState<any>([])

  async function handleDataFetch () {
    const result = await getUser(token);
    setUser(result.user[0]);
    setMaps(result.maps);
  }

  useEffect(() => {
    handleDataFetch();
  }, [])
  
  return {user, maps, getUser: handleDataFetch}
}