export async function getProtected (data: string) {
  console.log(data);
  const response = await fetch('http://localhost:8080/auth/protected', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${data}`
    }
  });

  if (!response.ok) {
    throw new Error('getProtected failed')
  }

  return await response.json()
}

