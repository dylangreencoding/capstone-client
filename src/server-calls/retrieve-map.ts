export async function getMap (token: string) {
  console.log(token);
  const response = await fetch('http://localhost:8080/auth/retrieve-map', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('retrieveMap failed')
  }

  return await response.json()
}
