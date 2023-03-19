export default function CreateAccount () {
  return (
    <div className='container'>
      <header>
        <h1>Capstone</h1>
      </header>
      <main>
        <h2>Create Account</h2>
        <p>
            <span>Already have an account? </span>
            <a href='#' className='link'>Log In</a>
        </p>
        <form className='auth-form' method="post">
          <input className='auth-input' type='text' placeholder='Email...'/>
          <input className='auth-input' type='text' placeholder='Password...'/>
          <button className='auth-button' type="submit">Create Account</button>
        </form>
      </main>
      <footer>
        <p>Copyright 2023 Dylan Green</p>
      </footer>
    </div>
  )
}