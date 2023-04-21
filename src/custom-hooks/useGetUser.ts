import { useState, useEffect } from 'react';
import { getUser } from '../expressAPI/get-user'
import { refreshToken } from '../expressAPI/refresh-token';
import { isExpired } from '../expressAPI/decode-token';

export const useGetUser = () => {
  const getToken = () => {
    const tokenJSON : any = sessionStorage.getItem('accessToken');
    const token = JSON.parse(tokenJSON);

    return token
  }
  const [accessToken, setAccessToken]  = useState<string>(getToken());
  const [user, setUser] = useState<any>({ user: {}, maps: [], chars: [], games: [] });

  async function handleDataFetch () {
    const expired = isExpired(accessToken);
    console.log('token expired?', expired, accessToken);
    
    let result;
    if (expired) {
      console.log('token expired')
      const refresh = await refreshToken();
      sessionStorage.setItem('accessToken', JSON.stringify(refresh.accessToken));
      setAccessToken(refresh.accessToken);
      result = await getUser(refresh.accessToken)
    } else {
      console.log('token valid')
      result = await getUser(accessToken)
    }
    console.log(result);
    setUser({ user: result.user[0], maps: result.maps, chars: result.chars, games: result.games });
  }

  useEffect(() => {
    handleDataFetch();
  }, [])
  
  return {accessToken, user, getUserData: handleDataFetch}
}