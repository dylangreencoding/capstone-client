import { Link } from 'react-router-dom'

export default function LandingPage () {
  return (
    <div className='container'>
      <header>
        <h1>Capstone</h1>
      </header>
      <main>
        <h2>What is this?</h2>
        <p>This is an virtual battlemap for playing tabletop roleplaying games.</p>
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