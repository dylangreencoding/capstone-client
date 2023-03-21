import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
//
import { createAccount } from '../../server-calls/create-account'

export default function CreateAccount () {
  const [email, setEmail] =useState<string>('');
  const [password, setPassword] =useState<string>('');
  const navigate = useNavigate();

  const handleCreateAccount = async (e: any) => {
    e.preventDefault();
    const data = {
      'email': email,
      'password': password
    }
    try {
      const response = await createAccount(data);
      alert(response.message)
      navigate('/Login', { replace: true });
    } catch (error) {
      alert('Account may already exist, try logging in');
    }
    
  }


  return (
    <div className='container'>
      <header>
        <h1>Capstone</h1>
        <Link to={'/'} replace={true} className='link'>Home</Link>
      </header>
      <main>
        <h2>Create Account</h2>
        <form className='auth-form' onSubmit={handleCreateAccount}>
          <input 
            className='auth-input' 
            type='text' 
            placeholder='Email...'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            className='auth-input' 
            type='text' 
            placeholder='Password...'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='auth-button' type="submit">Create Account</button>
        </form>
        <p>
            <Link to={'/LogIn'} replace={true} className='link'>Log In</Link>
        </p>
      </main>
      <footer>
        <p>Copyright 2023 Dylan Green</p>
      </footer>
    </div>
  )
}