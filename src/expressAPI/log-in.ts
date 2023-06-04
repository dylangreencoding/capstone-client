import { serverUrl } from "./utilities/server-url";

export async function logIn (data: any = {}) {
  const response = await fetch(`${serverUrl}auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${serverUrl}auth/login`,
      
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const responseJson = await response.json();
    console.log(responseJson, response.status);
    return await responseJson;
  }

  return await response.json()
}