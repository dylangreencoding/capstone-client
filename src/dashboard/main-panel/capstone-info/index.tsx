import { useState } from "react";

import { createBlogPost } from '../../../expressAPI/create-blog-post';


export default function CapstoneInfo () {

  const [blogPost, setblogPost] = useState<string>('')

  const displayPost = () => {

    const handleSubmitPost = async (e: any) => {
      e.preventDefault();
      const data = {
        'blogPost': blogPost,
      }
      try {
        const response = await createBlogPost(data);
        alert(response.message)
      } catch (error) {
        alert('capstone-client-create-post failed');
      }
    }

    return (
      <form onSubmit={handleSubmitPost}>
        <textarea name="blogText" id="blogText" cols={50} rows={10} onChange={(e) => {setblogPost(e.target.value)}}></textarea>
        <button type="submit">Submit</button>
      </form>
    )
  }

  return (
    <div className="capstone-info container">
      <h1 className="mb24">Capstone</h1>
      <main>
        <h2>How to</h2>
        <p>Its easy</p>
      </main>
      { displayPost() }
      <footer>
        <p>Copyright 2023 Dylan Green</p>
      </footer>
    </div>
  )
}