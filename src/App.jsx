import { useState } from 'react'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
    <Outlet/>
    
    <Footer/>
  </>
  )
}

export default App
