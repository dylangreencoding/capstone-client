export async function deleteGame (token: string, game: any = {}) {

  const response = await fetch('http://localhost:8080/auth/delete-game', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(game)
  });

  if (!response.ok) {
    throw new Error('capstone-client-delete-game failed')
  }
  
  return await response.json()
}
