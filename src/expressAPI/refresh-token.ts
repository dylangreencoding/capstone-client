export async function refreshToken () {
  const response = await fetch('http://localhost:8080/auth/refresh_token', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080/auth/refresh_token',
    },
  });

  if (!response.ok) {
    throw new Error('capstone-client-refresh-token failed')
  }
  
  return await response.json()
}