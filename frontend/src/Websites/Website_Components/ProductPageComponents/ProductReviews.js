import React from 'react'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import DiamondIcon from "@mui/icons-material/Diamond";
import BuildIcon from "@mui/icons-material/Build";
import CameraAltIcon from "@mui/icons-material/CameraAlt";  
import useMediaQuery from "@mui/material/useMediaQuery";
import "../../Website_Components/ProductPageComponents/Mainaplusstyle.css";




const ProductReviews = () => {

    const ProductReviews = [
        {
          icon: <DiamondIcon className="review-main-custom-icon" />,
          title: "I absolutely love this hoodie! The material is so soft and cozy, perfect for chilly mornings or lounging at home. The fit is spot-on, and the design gets me compliments. ",
        },
        {
          icon: <BuildIcon className="review-main-custom-icon" />,
          title: "I was hesitant about the price at first, but wow, this hoodie is worth it! The quality is unmatched, with durable stitching and a fabric that feels luxurious yet breathable. ",
        },
        {
          icon: <CameraAltIcon className="review-main-custom-icon" />,
          title: "This hoodie has quickly become a staple in my wardrobe. It's versatile enough to pair with jeans for a casual look or throw on after a workout. ",
        },
      ];

  // Media query to detect mobile, tablet, and desktop views
  const isMobile = useMediaQuery("(max-width:768px)");
  const isTablet = useMediaQuery("(min-width:769px) and (max-width:1024px)");
  const isDesktop = useMediaQuery("(min-width:1025px)");

  // Slider settings based on screen size
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isTablet ? 2 : 1, // Show 2 slides on tablets, 1 on mobile and desktop
    slidesToScroll: 1,
    arrows: false,
  };


  return (
<>
{isMobile || isTablet ? (
        <Slider {...settings}>
          {ProductReviews.map((ProductReview, index) => (
            <div key={index} className="slider-item">
              <div className="review-main-custom-icon">{ProductReview.icon}</div>
              <div className="review-main-custom-title">{ProductReview.title}</div>
            </div>
          ))}
        </Slider>
      ) : (
        /* Display icons directly in a grid layout for desktop screens */
        <div className="desktop-reviews-container">
          {ProductReviews.map((ProductReview, index) => (
            <div key={index} className="reviews-main-wrapper">
              <div className="review-main-custom-icon">{ProductReview.icon}</div>
              <div className="review-main-custom-title">{ProductReview.title}</div>
            </div>
          ))}
        </div>
      )}
</>
  )
}

export default ProductReviews