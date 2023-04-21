export async function getUser (accessToken: string) {
  

  const response = await fetch('http://localhost:8080/auth/protected', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    console.log(response)
    // this message needs to be drawn from the protected middleware
    try {
      alert('capstone-client-get-user failed, probably because the accessToken expired')
      // HERE possibly call refresh token ?
    } catch {
      throw new Error('capstone-client-get-user failed')
    }
  }
  
  return await response.json()
}

