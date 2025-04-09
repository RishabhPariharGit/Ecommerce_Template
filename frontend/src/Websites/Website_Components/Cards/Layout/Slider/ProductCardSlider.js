// components/ImageSlider.jsx
import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import './ProductCardSlider.css';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const ProductCardSlider = () => {
  const images = [

    "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/e319610f-b638-4dfb-9b73-765b7c58d9a8/GIANNIS+IMMORTALITY+4+%28GS%29.png",
    "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/e2d424e5-1f38-496b-9a2c-4df46d8a63d1/GIANNIS+IMMORTALITY+4+EP.png",
    "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/e319610f-b638-4dfb-9b73-765b7c58d9a8/GIANNIS+IMMORTALITY+4+%28GS%29.png",
    "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/2d2c6d83-30ff-4d6d-8a2d-88a54adf31da/GIANNIS+IMMORTALITY+4+EP.png",
    "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/842dbddc-4f83-4008-8916-f43ac2b24763/GIANNIS+IMMORTALITY+4+%28GS%29.png",
    "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/79e9aa5f-1876-43c5-9304-d45f027cc33a/GIANNIS+IMMORTALITY+4+%28GS%29.png",
    "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/e2d424e5-1f38-496b-9a2c-4df46d8a63d1/GIANNIS+IMMORTALITY+4+EP.png",
  ];

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.params) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.destroy();
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  return (
    <>
      <div className="main-slider-mn-wrpr">
      <div className="w-full max-w-4xl mx-auto main-slider-wrapper">
          <div className="flex justify-center mt-4 gap-4 main-btn-wrapper">
          <button
            ref={prevRef}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition previous-btn"
          >
              <ArrowBackIosNewIcon className="arrowbackcstmclss"/>
          </button>
          <button
            ref={nextRef}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition next-btn"
          >
              <ArrowForwardIosIcon className="arrowforwardcstmclss"/>
          </button>
        </div>
        
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Navigation]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={false}
          spaceBetween={30}
          slidesPerView={3}
        >
          {images.map((src, index) => (
            <SwiperSlide className="Main-swiper-mn-wrapper-clctn" key={index}>
              <div className="w-full h-[400px] flex justify-center items-center bg-white rounded-xl shadow-md px-4">
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className="object-contain max-h-full max-w-full main-img-mn"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      
      </div>
      </div>
    </>
  );
};

export default ProductCardSlider;
