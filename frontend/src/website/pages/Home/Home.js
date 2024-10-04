import React from 'react' 
import Pricing from '../../web_components/pricing/Pricing'
import Announcementbar from '../../../Components/Announcementbar/Announcementbar'
import Newhome from '../../../Components/navbar/Newhome'
import AboutComp from '../../web_components/aboutcomp/AboutComp'
import ProductCardGrid from '../../web_components/Productcard/ProductCardGrid/ProductCardGrid'
import Newsletter from '../../../Components/NewsLetter/Newsletter'
// import Testimonials from '../../web_components/Testimonials/Testimonials'
import Testimonialsnew from '../../web_components/Testimonials/Testimonialsnew'
import Textoverimage from '../../web_components/TextoverImage/Textoverimage'
import Navbar from '../../../Components/navbar/Navbar'
import Footer from '../../../Components/Footer/Footer'


const Home = () => {
  return (
    <>
    <Announcementbar/>
    <Newhome/>
     {/* <Navbar/> */}
    <Textoverimage/>
    <AboutComp/>
    <Pricing/>
    <ProductCardGrid/>
    {/* <Testimonials/> */}
    <Testimonialsnew/>
    <Newsletter/>
    <Footer/>
    </>
  )
}

export default Home