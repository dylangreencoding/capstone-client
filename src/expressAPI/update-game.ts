export async function updateGame (token: string, game_map: any = {}) {
  game_map.currentMap = {};
  game_map.selected = {};
  game_map.tool = 'none';
  console.log(token, JSON.stringify(game_map));
  const response = await fetch('http://localhost:8080/auth/save-game', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(game_map)
  });

  if (!response.ok) {
    throw new Error('capstone-client-update-game failed')
  }
  
  return await response.json()
}