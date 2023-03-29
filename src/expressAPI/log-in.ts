

export async function logIn (data: any = {}) {
  const response = await fetch('http://localhost:8080/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080/auth/login',
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('capstone-client-login failed')
  }

  return await response.json()
}