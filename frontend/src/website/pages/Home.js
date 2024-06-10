import React from 'react'
import Navbar from '../web_components/navbar/Navbar'
import MainHomebanner from '../web_components/mainbanner/MainHomebanner'
import Pricing from '../web_components/pricing/Pricing'

const Home = () => {
  return (
    <>
    <Navbar/>
    <MainHomebanner/>
    <Pricing/>
    </>
  )
}

export default Home