import React from 'react'
import Navbar from '../web_components/navbar/Navbar'
import MainHomebanner from '../web_components/mainbanner/MainHomebanner'
import Pricing from '../web_components/pricing/Pricing'
import AboutComp from '../web_components/aboutcomp/AboutComp'
import ProductCardGrid from '../web_components/Productcard/ProductCardGrid/ProductCardGrid'
import Newsletter from '../web_components/NewsLetter/Newsletter'
import Testimonials from '../web_components/Testimonials/Testimonials'
import Footer from '../web_components/Footer/Footer'

const Home = () => {
  return (
    <>
    <Navbar/>
    <MainHomebanner/>
    <Pricing/>
    <AboutComp/>
    <ProductCardGrid/>
    <Testimonials/>
    <Newsletter/>
    <Footer/>
    </>
  )
}

export default Home