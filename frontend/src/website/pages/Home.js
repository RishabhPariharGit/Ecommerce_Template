import React from 'react'
import Navbar from '../web_components/navbar/Navbar'
import MainHomebanner from '../web_components/mainbanner/MainHomebanner'
import Pricing from '../web_components/pricing/Pricing'
import AboutComp from '../web_components/aboutcomp/AboutComp'

const Home = () => {
  return (
    <>
    <Navbar/>
    <MainHomebanner/>
    <Pricing/>
    <AboutComp/>
    </>
  )
}

export default Home