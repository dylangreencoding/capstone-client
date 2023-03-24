export async function newMap (token: string, map: any = {}) {
  console.log(token, map);
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
    console.log(await response.json())
    throw new Error('newMap_ failed')
  }
  
  return await response.json()
}