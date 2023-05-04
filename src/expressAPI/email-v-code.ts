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
    throw new Error(`client resend-validation-email failed, ${JSON.stringify(data)}`)
  }
  
  return await response.json()
}