import { serverUrl } from "./utilities/server-url";

export async function refreshToken () {
  const response = await fetch(`${serverUrl}auth/refresh_token`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });

  if (!response.ok) {
    throw new Error('capstone-client-refresh-token failed')
  }
  
  return await response.json()
}