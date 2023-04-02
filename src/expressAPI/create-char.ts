export async function createChar (token: string, char: any = {}) {
  console.log(token, char);
  const response = await fetch('http://localhost:8080/auth/save-char', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(char)
  });

  if (!response.ok) {
    throw new Error('capstone-client-create-char failed')
  }
  
  return await response.json()
}