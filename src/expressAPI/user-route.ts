import { isExpired } from "./decode-token";
import { refreshToken } from "./refresh-token";

export async function userRoute (route: string, accessToken: string, data_: any = {}, playerId?: string) {

  // arguments[0] can be
  //// 'save-map', 'save-game', and 'save-char' are used for both CREATE and UPDATE
  //// 'save-map'
  //// 'save-game'
  //// 'save-char'

  //// 'delete-map'
  //// 'delete-game'
  //// 'delete-char'

  //// 'join-game'
  //// 'remove-player'

  let data;
  route === 'remove-player' ?
    data = JSON.stringify({game: data_, playerId: playerId}) :
    data = JSON.stringify(data_) ;


  console.log('ROUTE', route, accessToken, JSON.stringify(data));
  const url = `http://localhost:8080/auth/${route}`;
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${url}`,
      'Authorization': `Bearer ${accessToken}`
    },
    body: data,
  }

  const expired = isExpired(accessToken);
  let response;
  if (expired) {
    console.log('token expired')
    const refresh = await refreshToken();
    console.log('REFRESHED, new token:', refresh.accessToken)
    sessionStorage.setItem('accessToken', JSON.stringify(refresh.accessToken));
    const refreshedConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': `${url}`,
        'Authorization': `Bearer ${refresh.accessToken}`
      },
      body: data,
    };
    response = await fetch(url, refreshedConfig);
  } else {
    console.log('token valid')
    response = await fetch(url, config);
  }

  if (!response.ok) {
    throw new Error(`client userRoute "${route}" failed`)
  }
  
  return await response.json()
}