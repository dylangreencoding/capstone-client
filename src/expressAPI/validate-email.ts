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
    throw new Error(`client validate-email failed, ${JSON.stringify(data)}`)
  }
  
  return await response.json()
}

