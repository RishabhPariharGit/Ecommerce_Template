import React from 'react'
import MainHomebanner from '../../web_components/mainbanner/MainHomebanner'
import Pricing from '../../web_components/pricing/Pricing'
import AboutComp from '../../web_components/aboutcomp/AboutComp'
import ProductCardGrid from '../../web_components/Productcard/ProductCardGrid/ProductCardGrid'
import Newsletter from '../../web_components/NewsLetter/Newsletter'
import Testimonials from '../../web_components/Testimonials/Testimonials'
// import SliderWithText from '../../web_components/sliderwithtext/SliderWithText'

const Home = () => {
  return (
    <>
    <MainHomebanner/>
    <Pricing/>
    <AboutComp/>
    <ProductCardGrid/>
    <Testimonials/>
    {/* <SliderWithText/> */}
    <Newsletter/>
    </>
  )
}

export default Home