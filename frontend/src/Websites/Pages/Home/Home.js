import React from 'react' ;
import Pricing from '../../Website_Components/Pricing/Pricing';
import Announcementbar from '../../Website_Components/Announcementbar/Announcementbar';
import Newhome from '../../Website_Components/Navbar/Newhome';
import AboutComp from '../../Website_Components/AboutComp/AboutComp'
import Newsletter from '../../Website_Components/NewsLetter/Newsletter';
import Testimonialsnew from '../../Website_Components/Testimonial/Testimonialsnew';
import Textoverimage from '../../Website_Components/Textoverimage/Textoverimage';
import Footer from '../../Website_Components/Footer/Footer';


const Home = () => {
  return (
    <>
    <Announcementbar/>
    <Newhome/>
     {/* <Navbar/> */}
    <Textoverimage/>
    <AboutComp/>
    <Pricing/>
    {/* <Testimonials/> */}
    <Testimonialsnew/>
    <Newsletter/>
    <Footer/>
    </>
  )
}

export default Home