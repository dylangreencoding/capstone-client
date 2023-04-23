import { serverUrl } from "./utilities/server-url";

export async function logIn (data: any = {}) {
  const response = await fetch(`${serverUrl}auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('capstone-client-login failed')
  }

  return await response.json()
}