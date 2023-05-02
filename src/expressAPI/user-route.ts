import { isExpired } from "./utilities/decode-token";
import { refreshToken } from "./refresh-token";
import { serverUrl } from "./utilities/server-url";

export async function userRoute (route: string, accessToken: string, data_: any = {}, playerId?: string) {

  // arguments[0] can be
  // '---/save' is used for CREATE or UPDATE, depending on whether id is empty string

  //// 'map/save'
  //// 'map/delete'

  //// 'char/save'
  //// 'char/delete'
  
  //// 'game/save'
  //// 'game/delete'
  //// 'game/join'
  //// 'game/remove-player'

  let data;
  route === 'game/remove-player' ?
    data = JSON.stringify({game: data_, playerId: playerId}) :
    data = JSON.stringify(data_) ;


  const url = `${serverUrl}${route}`;
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${url}`,
      'Authorization': `Bearer ${accessToken}`
    },
    body: data,
  }

  // check access token expiration, refresh if necessary
  const expired = isExpired(accessToken);
  let response;
  if (expired) {
    const refresh = await refreshToken();
    console.log('expired token refreshed, new token:', refresh.accessToken)
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
    throw new Error(`client userRoute "${route}" failed, ${accessToken}`)
  }
  
  return await response.json()
}