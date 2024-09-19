import React from 'react' 
import Pricing from '../../web_components/pricing/Pricing'
import AboutComp from '../../web_components/aboutcomp/AboutComp'
import ProductCardGrid from '../../web_components/Productcard/ProductCardGrid/ProductCardGrid'
import Newsletter from '../../../Components/NewsLetter/Newsletter'
import Testimonials from '../../web_components/Testimonials/Testimonials'
import Textoverimage from '../../web_components/TextoverImage/Textoverimage'


const Home = () => {
  return (
    <>
  
    <Textoverimage/>
    <AboutComp/>
    <Pricing/>
    <ProductCardGrid/>
    <Testimonials/>
    <Newsletter/>
    </>
  )
}

export default Home