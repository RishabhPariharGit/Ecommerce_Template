import React from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
import AuthRoutes from './website/Routes/authroutes'
import Navbar from './website/web_components/navbar/Navbar'
import Footer from './website/web_components/Footer/Footer'

const App = () => {
  return (
   <>
   <Navbar/>
 <AuthRoutes/>
 <Footer/>
   </>
  )
}

export default App
