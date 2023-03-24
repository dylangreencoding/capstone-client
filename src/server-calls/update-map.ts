export async function updateMap (token: string, map: any = {}) {
  console.log(token);
  const response = await fetch('http://localhost:8080/auth/new-map', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(map)
  });

  if (!response.ok) {
    throw new Error('newMap_ failed')
  }
  
  return await response.json()
}