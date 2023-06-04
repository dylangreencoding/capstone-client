import { serverUrl } from "./utilities/server-url";

export async function resendValidationCode (email: string) {

  const data = { email: email };
  const response = await fetch(`${serverUrl}auth/resend-validation-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${serverUrl}auth/resend-validation-email`,
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const responseJson = await response.json();
    console.log(responseJson, response.status);
    return await responseJson;
  }
  
  return await response.json();
}