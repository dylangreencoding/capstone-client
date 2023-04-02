export async function deleteChar (token: string, char: any = {}) {
  console.log(token);
  const response = await fetch('http://localhost:8080/auth/delete-char', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(char)
  });

  if (!response.ok) {
    throw new Error('capstone-client-delete-char failed')
  }
  
  return await response.json()
}