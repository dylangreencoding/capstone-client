import { useState } from 'react';

export const useToken = () => {
  const getToken = () => {
    const token : any = sessionStorage.getItem('accessToken');
    // const token = JSON.parse(tokenJSON);
    console.log('WTF????', token);

    return token
  }
  
  const [accessToken, setAccessToken]  = useState(getToken());
  const updateToken = (userToken: any) => {
    sessionStorage.setItem('accessToken', JSON.stringify(userToken));
    // sessionStorage.setItem('accessToken', userToken);
    setAccessToken(userToken)
  }

  return {
    accessToken,
    setAccessToken: updateToken
  }
}