export async function logOut () {
  const response = await fetch('http://localhost:8080/auth/logout', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080/auth/logout',
    }
  });

  if (!response.ok) {
    throw new Error('capstone-client-logout failed')
  }

  return await response.json()
}