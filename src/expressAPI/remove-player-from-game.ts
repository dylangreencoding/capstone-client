export async function removePlayer (token: string, game: any = {}, playerId: string) {

  const response = await fetch('http://localhost:8080/auth/remove-player', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({game, playerId})
  });

  if (!response.ok) {
    throw new Error('capstone-client-remove-player failed')
  }
  
  return await response.json()
}