import { useState, useEffect } from 'react';
import { getUser } from '../expressAPI/get-user'
import { refreshToken } from '../expressAPI/refresh-token';
import { isExpired } from '../expressAPI/utilities/decode-token';

export const useGetUser = () => {

  const getToken = () => {
    const tokenJSON : any = sessionStorage.getItem('accessToken');
    const token = JSON.parse(tokenJSON);
    return token
  }
  
  const [accessToken, setAccessToken]  = useState<string>(getToken());
  const [user, setUser] = useState<any>({ user: {}, maps: [], chars: [], games: [] });

  ///////////// FOR OFFLINE DEVELOPMENT //////////////////////////////
  if (accessToken === null) {
    const user = { user: { id: 'o', name: 'o' }, maps: [], chars: [], games: [] };
    const returnOfflineUser = () => {
      return user.games;
    };
    return { accessToken, user, getUserData: returnOfflineUser };
  };
  ////////////////////////////////////////////////////////////////////

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

    // this is for making sure you can't click into a game you were removed from
    // it is a way of getting around an unfinished socket server
    // necessary due to the asynchronous nature of setting state
    // it is used in options/index.tsx handleChooseGame
    return result.user[0].games
  }
  
  return {accessToken, user, getUserData: handleDataFetch}
}