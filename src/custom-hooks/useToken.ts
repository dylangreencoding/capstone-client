import { useState } from 'react';

export const useToken = () => {
  const getToken = () => {
    const tokenJSON : any = sessionStorage.getItem('accessToken');
    const token = JSON.parse(tokenJSON);

    return token
  }
  
  const [accessToken, setAccessToken]  = useState(getToken());
  const updateToken = (userToken: any) => {
    sessionStorage.setItem('accessToken', JSON.stringify(userToken));
    setAccessToken(userToken)
  }

  return {
    accessToken,
    setAccessToken: updateToken
  }
}