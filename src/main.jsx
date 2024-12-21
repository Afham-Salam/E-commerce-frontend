import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Product from './pages/Product.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/product',
        element: <Product />,
      },
      {
        path: '/',
        element: <Navigate to="/signup" />,
      },
      
    ],
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login/>,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
