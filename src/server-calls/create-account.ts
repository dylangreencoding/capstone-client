
export async function createAccount (data: any = {}) {
  const response = await fetch('http://localhost:8080/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080/auth/signup',
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('createAccount failed')
  }

  return await response.json()
}