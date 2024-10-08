import React from 'react' ;
import Pricing from '../../Web_Components/Pricing/Pricing';
import Announcementbar from '../../../Components/Announcementbar/Announcementbar';
import Newhome from '../../../Components/Navbar/Newhome';
import AboutComp from '../../Web_Components/AboutComp/AboutComp'
import ProductCardGrid from '../../Web_Components/ProductCard/ProductCardGrid/ProductCardGrid'

import Newsletter from '../../../Components/NewsLetter/Newsletter';

import Testimonialsnew from '../../Web_Components/Testimonials/Testimonialsnew';
import Textoverimage from '../../Web_Components/TextoverImage/Textoverimage';

import Footer from '../../../Components/Footer/Footer';


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