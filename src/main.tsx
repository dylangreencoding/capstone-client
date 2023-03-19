import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import LandingPage from './landing-page'
import CreateAccount from './create-account'
import LogIn from './log-in'
import Dashboard from './dashboard'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Dashboard />
  </React.StrictMode>,
)
