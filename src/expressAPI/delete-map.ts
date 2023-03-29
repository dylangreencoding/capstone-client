export async function deleteMap (token: string, map: any = {}) {
  console.log(token);
  const response = await fetch('http://localhost:8080/auth/delete-map', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(map)
  });

  if (!response.ok) {
    throw new Error('capstone-client-delete-map failed')
  }
  
  return await response.json()
}
