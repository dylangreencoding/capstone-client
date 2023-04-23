import { serverUrl } from "./utilities/server-url";

export async function logOut () {
  const response = await fetch(`${serverUrl}auth/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  });

  if (!response.ok) {
    throw new Error('capstone-client-logout failed')
  }

  return await response.json()
}