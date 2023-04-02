export async function createBlogPost (data: any = {}) {
  
  const response = await fetch('http://localhost:8080/blog/create-post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('capstone-client-create-blog-post failed')
  }

  return await response.json()
}