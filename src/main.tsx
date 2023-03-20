import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
//
import LandingPage from './pages/landing-page'
import ErrorPage from './pages/error-page'
import CreateAccount from './pages/create-account'
import LogIn from './pages/log-in'
//
import Dashboard from './dashboard'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/CreateAccount',
    element: <CreateAccount />,
  },
  {
    path: '/LogIn',
    element: <LogIn />,
  },
  {
    path: '/Dashboard',
    element: <Dashboard />,
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
