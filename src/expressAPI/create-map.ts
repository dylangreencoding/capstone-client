export async function createMap (token: string, map: any = {}) {
  console.log(token, map);
  const response = await fetch('http://localhost:8080/auth/save-map', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(map)
  });

  if (!response.ok) {
    throw new Error('createMap failed')
  }
  
  return await response.json()
}