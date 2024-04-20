import { useState } from 'react';
import './App.css';
import { RouterProvider, createBrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import Welcome from './pages/Welcome';

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
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/Welcome',
      element: <Welcome />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
