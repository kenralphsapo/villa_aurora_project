import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/login',
      element: <Login />
    },
  ])

  return (
    <>
      <RouterProvider route={route}>
        
      </RouterProvider>
    </>
  )
}

export default App
