export async function getUser (token: string) {
  console.log(token);
  const response = await fetch('http://localhost:8080/auth/protected', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('getUser failed')
  }

  return await response.json()
}

