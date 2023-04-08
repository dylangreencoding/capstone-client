export async function joinGame (token: string, game_invitation: any = {}) {

  const response = await fetch('http://localhost:8080/auth/join-game', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(game_invitation)
  });

  if (!response.ok) {
    throw new Error('capstone-client-join-game failed')
  }
  
  return await response.json()
}