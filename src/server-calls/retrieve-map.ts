export async function getMap (token: string) {
  console.log(token);
  const response = await fetch('http://localhost:8080/auth/retrieve-map', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('retrieveMap failed')
  }

  return await response.json()
}

// TODO: change 'get-protected' to 'get-user' because thats what it get
// just like how as this is 'get-map'

// the server route for this will also use protected middleware