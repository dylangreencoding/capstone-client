import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useGetBlogPosts } from '../../custom-hooks/useGetBlogPosts';

export default function LandingPage () {
  const { blogPosts, getBlogPosts } = useGetBlogPosts();

  console.log(blogPosts)

  // TODO: display blog posts on landing page
  

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
      <footer>
        <p>Copyright 2023 Dylan Green</p>
      </footer>
    </div>
  )
}