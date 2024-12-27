import { useState } from 'react'

import Navbar from './components/Navbar'

import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'

 

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Provider store={store}>
     
    <Navbar />
    <Outlet/>
    <Footer/>
    
    </Provider>
  </>
  )
}

export default App
