export async function getBlogPosts () {

  const response = await fetch('http://localhost:8080/blog/get-posts', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  });

  if (!response.ok) {
    throw new Error('capstone-client-get-blog-posts failed')
  }
  
  return await response.json()
}
