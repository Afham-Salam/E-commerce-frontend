import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import Home from './pages/Home.jsx';
import Product from './pages/Product.jsx';







const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path:'/home',
        element:<Home />
      },
      {
        path:'/product',
        element:<Product />
      },
      
     
      
    ]
  },
 
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
