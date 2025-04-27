import React from 'react' ;
import Newsletter from '../../Website_Components/SecondaryComponents/NewsLetter/Newsletter';
import Testimonialsnew from '../../Website_Components/SecondaryComponents/Testimonial/Testimonialsnew';
import Textoverimage from '../../Website_Components/SecondaryComponents/Textoverimage/Textoverimage';
import ImageSlider from '../../Website_Components/SecondaryComponents/ImageSlider/ImageSlider';
import Footer from '../../Website_Components/PrimaryComponents/Footer/Footer';
import ProductCardSlider from '../../Website_Components/Cards/Layout/Slider/ProductCardSlider';
import CollectionCardSlider from '../../Website_Components/Cards/Layout/Slider/CollectionCardSlider';
import CollectionGrid from '../../Website_Components/SecondaryComponents/CollectionGrid/CollectionGrid';



const Home = () => {
  return (
    <>
    <ImageSlider/>
    <CollectionCardSlider Slug="summer-collection" />
    <CollectionGrid/>
    <ProductCardSlider/>
    <CollectionCardSlider Slug="Topwear" />
    <Textoverimage/>
    <Testimonialsnew/>
    <Newsletter/>
    <Footer/>
    </>
  )
}

export default Home