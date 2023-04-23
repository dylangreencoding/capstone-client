import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useGetBlogPosts } from '../../custom-hooks/useGetBlogPosts';
import { createBlogPost } from '../../expressAPI/create-blog-post';

export default function LandingPage () {
  const { blogPosts, getBlogPosts } = useGetBlogPosts();
  console.log(blogPosts)
  // HERE: map blog posts to landing page


  // *** FOR WRITING BLOG POSTS, REMOVE BEFORE DEPLOYMENT *** \\
  const [blogTitle, setBlogTitle] = useState<string>('');
  const [blogBody, setBlogBody] = useState<string>('');

  const displayWritePost = () => {
    const handleSubmitPost = async (e: any) => {
      e.preventDefault();
      const data = {
        'blogTitle': blogTitle,
        'blogBody': blogBody,
      }
      try {
        const response = await createBlogPost(data);
        alert(response.message)
      } catch (error) {
        alert('capstone-client-create-post failed');
      }
    }
    return (
      <form className='auth-form' onSubmit={handleSubmitPost}>
        <input type='text' placeholder='Title' value={blogTitle} onChange={(e) => {setBlogTitle(e.target.value)}}/>
        <textarea cols={50} rows={10} placeholder='Body' value={blogBody} onChange={(e) => {setBlogBody(e.target.value)}}></textarea>
        <button type="submit">Submit</button>
      </form>
    )
  }

  const makeDate = (unixEpoch: any) => {
    const date = new Date(unixEpoch)
    return date.toLocaleString();
  }
  

  return (
    <div className='container'>
      <header>
        <h1>Capstone</h1>
      </header>
      <main>
        <h2>What is this?</h2>
        <p>This is a virtual battlemap for playing tabletop roleplaying games.</p>
        <p>You can create and save maps, characters and monsters, and run multiple game sessions.</p>
        <p>
          <Link to={'/Login'} replace={true} className='link'>Log In</Link>
        </p>
        <p>
          <Link to={'/CreateAccount'} replace={true} className='link'>Create Account</Link>
        </p>
      </main>
      <ul>
        {blogPosts.map((blogPost: any) => {
          return <li key={blogPost.id}>
            <h2>{blogPost.blogTitle}</h2>
            <p>{makeDate(blogPost.__updatedtime__)}</p>
            <p>{blogPost.blogBody}</p>
          </li>
        })}
      </ul>
      <footer>
        {/* REMOVE BEFORE DEPLOYMENT */}
        {/* { displayWritePost() } */}
        <p>Copyright 2023 Dylan Green</p>
      </footer>
    </div>
  )
}