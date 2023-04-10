export async function joinGame (token: string, game_invitation: any = {}) {
  // game_invitation consists of { id: gameId, character: props.savedChar }
  // this is the request body on the express server
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