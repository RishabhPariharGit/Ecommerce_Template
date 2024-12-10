import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import DiamondIcon from "@mui/icons-material/Diamond";
import BuildIcon from "@mui/icons-material/Build";
import CameraAltIcon from "@mui/icons-material/CameraAlt";  
import MemoryIcon from "@mui/icons-material/Memory";
import useMediaQuery from "@mui/material/useMediaQuery";
import "../../Website_Components/ProductPageComponents/Mainaplusstyle.css";


const ProductUsps = () => {

    const features = [
        {
          icon: <DiamondIcon className="icon" />,
          title: "The most advanced AI on Pixel.",
        },
        {
          icon: <BuildIcon className="icon" />,
          title: "An elegant design, built to last.",
        },
        {
          icon: <CameraAltIcon className="icon" />,
          title: "The best Pixel Camera yet.",
        },
        {
          icon: <MemoryIcon className="icon" />,
          title: "Powerful performance with Pixel's most advanced chip.",
        },
        // {
        //   icon: <UpdateIcon className="icon" />,
        //   title: "Seven years of Pixel Drops, and OS and security updates.",
        // },
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
          {features.map((feature, index) => (
            <div key={index} className="slider-item">
              <div className="icon">{feature.icon}</div>
              <div className="title">{feature.title}</div>
            </div>
          ))}
        </Slider>
      ) : (
        /* Display icons directly in a grid layout for desktop screens */
        <div className="desktop-container">
          {features.map((feature, index) => (
            <div key={index} className="desktop-item">
              <div className="icon">{feature.icon}</div>
              <div className="title">{feature.title}</div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default ProductUsps