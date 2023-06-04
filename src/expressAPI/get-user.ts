import { serverUrl } from "./utilities/server-url";

export async function getUser (accessToken: string) {
  // access token expiration is checked inside custom-hooks/useGetUser.ts 
  // that way the new access token can be saved to react state variable

  const response = await fetch(`${serverUrl}auth/protected`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${serverUrl}auth/protected`,
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error(`client getUser failed, ${accessToken}`)
  }
  
  return await response.json()
}

