import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
//
import { logIn } from '../../server-calls/log-in';

export default function LogIn () {
  const [email, setEmail] =useState<string>('');
  const [password, setPassword] =useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const data = {
      'email': email,
      'password': password
    }
    try {
      const response = await logIn(data);
      alert(response.message)
      navigate('/capstone_user_account', {state: response, replace: true});
    } catch (error) {
      alert(error);
    }
    
  }


  return (
    <div className='container'>
      <header>
        <h1>Capstone</h1>
        <Link to={'/'} replace={true} className='link'>Home</Link>
      </header>
      <main>
        <h2>Log In</h2>
        <form className='auth-form' onSubmit={handleLogin}>
          <input 
            className='auth-input' 
            type='text' 
            placeholder='Email...'
            value={email}
            onChange={ (e) => setEmail(e.target.value) }
          />
          <input 
            className='auth-input' 
            type='text' 
            placeholder='Password...'
            value={password}
            onChange={ (e) => setPassword(e.target.value) }
          />
          <button className='auth-button' type="submit">Log In</button>
        </form>
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