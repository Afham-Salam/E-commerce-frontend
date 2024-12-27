import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Product from './pages/Product.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import Shop from './pages/Shop.jsx';
import Cart from './pages/Cart.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/home',
        element:(
              <ProtectedRoute>
           <Home />
           </ProtectedRoute>
           ),
      },
      {
        path: '/viewproduct/:productid',
        element: (<ProtectedRoute><Product /></ProtectedRoute>),
      },
      {
        path: '/',
        element: <Navigate to="/signup" />,
      },
      {
        path: '/cart',
        element:(<ProtectedRoute>
             <Cart />
        </ProtectedRoute>) ,
      },
      {
        path: '/shop',
        element:(<ProtectedRoute><Shop/></ProtectedRoute>) ,
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
  {
    path: '/admin',
    element: <AdminDashboard/>,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   
    <RouterProvider router={router} />
    
  </StrictMode>
);
