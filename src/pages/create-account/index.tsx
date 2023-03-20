import { Link } from 'react-router-dom'

export default function CreateAccount () {
  return (
    <div className='container'>
      <header>
        <h1>Capstone</h1>
        <Link to={'/'} className='link'>Home</Link>
      </header>
      <main>
        <h2>Create Account</h2>
        <form className='auth-form'>
          <input className='auth-input' type='text' placeholder='Email...'/>
          <input className='auth-input' type='text' placeholder='Password...'/>
          <button className='auth-button' type="submit">Create Account</button>
        </form>
        <p>
            <Link to={'/LogIn'} className='link'>Log In</Link>
        </p>
      </main>
      <footer>
        <p>Copyright 2023 Dylan Green</p>
      </footer>
    </div>
  )
}