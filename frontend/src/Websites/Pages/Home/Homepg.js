import React from 'react' ;
import Newsletter from '../../Website_Components/SecondaryComponents/NewsLetter/Newsletter';
import Testimonialsnew from '../../Website_Components/SecondaryComponents/Testimonial/Testimonialsnew';
import Textoverimage from '../../Website_Components/SecondaryComponents/Textoverimage/Textoverimage';
import ImageSlider from '../../Website_Components/SecondaryComponents/ImageSlider/ImageSlider';
import Footer from '../../Website_Components/PrimaryComponents/Footer/Footer';
import ProductCardSlider from '../../Website_Components/Cards/Layout/Slider/ProductCardSlider';
import CollectionCardSlider from '../../Website_Components/Cards/Layout/Slider/CollectionCardSlider';
import CollectionGrid from '../../Website_Components/SecondaryComponents/CollectionGrid/CollectionGrid';
import ScrollingText from '../../Website_Components/SecondaryComponents/ScrollingText/ScrollingText';
import ScrollingTextBig from '../../Website_Components/SecondaryComponents/ScollingTextBig/ScrollingTextBig';
import MegaVideoSlider from '../../Website_Components/SecondaryComponents/MegaVideoSlider/MegaVideoSlider';
import LookBook from '../../Website_Components/SecondaryComponents/LookBook/LookBook';
import USP from '../../Website_Components/SecondaryComponents/USP/USP';
import BlogGrid from '../../Website_Components/SecondaryComponents/BlogGrid/BlogGrid';



const Home = () => {
  return (
    <>
    <ImageSlider/>
    <ScrollingText/>
    <CollectionCardSlider Name="Explore The Trending Collections" />
    <ScrollingTextBig/>
    <CollectionGrid/>
    <ProductCardSlider/>
    <MegaVideoSlider/>
    <CollectionCardSlider Slug="Topwear" />
    <Textoverimage/>
    <LookBook/>
    <USP/>
    <Testimonialsnew/>
    <BlogGrid/>
    <Newsletter/>
    <Footer/>
    </>
  )
}

export default Home