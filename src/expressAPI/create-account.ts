import { serverUrl } from "./utilities/server-url";

export async function createAccount (data: any = {}) {
  const response = await fetch(`${serverUrl}auth/create-account`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${serverUrl}auth/create-account`,
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