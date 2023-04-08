import { useState, useEffect } from 'react';
import { getUser } from '../expressAPI/get-user'

export const useGetUser = (token: string) => {
  const [user, setUser] = useState<any>([]);
  const [maps, setMaps] = useState<any>([]);
  const [chars, setChars] = useState<any>([]);
  const [games, setGames] = useState<any>([]);

  async function handleDataFetch () {
    const result = await getUser(token);
    setUser(result.user[0]);
    setMaps(result.maps);
    setChars(result.chars);
    setGames(result.games);
  }

  useEffect(() => {
    handleDataFetch();
  }, [])
  
  return {user, maps, chars, games, getUserData: handleDataFetch}
}