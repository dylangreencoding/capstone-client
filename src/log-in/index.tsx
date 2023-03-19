export default function LogIn () {
  return (
    <div className='container'>
      <header>
        <h1>Capstone</h1>
      </header>
      <main>
        <h2>Log In</h2>
        <p>
          <span>New to capstone? </span>
          <a href='#' className='link'>Create Account</a>
        </p>
        <form className='auth-form' method="post">
          <input className='auth-input' type='text' placeholder='Email...'/>
          <input className='auth-input' type='text' placeholder='Password...'/>
          <button className='auth-button' type="submit">Log In</button>
        </form>
      </main>
      <footer>
        <p>Copyright 2023 Dylan Green</p>
      </footer>
    </div>
  )
}