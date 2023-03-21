

export async function logIn (data: any = {}) {
  const response = await fetch('http://localhost:8080/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080/auth/signin',
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('logIn failed')
  }

  return await response.json()
}