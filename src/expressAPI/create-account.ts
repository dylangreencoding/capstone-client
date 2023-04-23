import { serverUrl } from "./utilities/server-url";

export async function createAccount (data: any = {}) {
  const response = await fetch(`${serverUrl}auth/create-account`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('capstone-client-create-account failed')
  }

  return await response.json()
}