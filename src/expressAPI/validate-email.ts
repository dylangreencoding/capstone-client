import { serverUrl } from "./utilities/server-url";

export async function validateEmail (codeData: any) {

  const data = codeData;
  const response = await fetch(`${serverUrl}auth/validate-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${serverUrl}auth/validate-email`,
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

