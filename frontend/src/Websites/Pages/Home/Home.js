import React from 'react' ;
import Pricing from '../../Website_Components/Pricing/Pricing';
import AboutComp from '../../Website_Components/AboutComp/AboutComp'
import Newsletter from '../../Website_Components/NewsLetter/Newsletter';
import Testimonialsnew from '../../Website_Components/Testimonial/Testimonialsnew';
import Textoverimage from '../../Website_Components/Textoverimage/Textoverimage';
import Footer from '../../Website_Components/Footer/Footer';


const Home = () => {
  return (
    <>
    <Textoverimage/>
    <AboutComp/>
    <Pricing/>
    <Testimonialsnew/>
    <Newsletter/>
    <Footer/>
    </>
  )
}

export default Home