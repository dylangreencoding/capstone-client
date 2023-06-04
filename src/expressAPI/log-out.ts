import { serverUrl } from "./utilities/server-url";

export async function logOut () {
  const response = await fetch(`${serverUrl}auth/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${serverUrl}auth/logout`,
    }
  });

  if (!response.ok) {
    throw new Error('logout failed @ client/expressAPI')
  }

  return await response.json()
}