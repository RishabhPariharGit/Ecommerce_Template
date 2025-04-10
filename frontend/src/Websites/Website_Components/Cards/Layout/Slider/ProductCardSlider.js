// components/ImageSlider.jsx
import React, { useRef, useEffect,useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import './ProductCardSlider.css';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {getAllProductsBySlug} from '../../../../../Services/WebsiteServices/AllServices/ProductService'

const ProductCardSlider = () => {
 

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const [products, setproducts] = useState([]);
  const isFetchedRef = useRef(false);

    useEffect(() => {
      debugger
        if (!isFetchedRef.current) {
            const fetchProduct = async () => {
                try {
                    const response = await getAllProductsBySlug("sweat-shirt");
                    debugger
                    if (response?.data) {
                      setproducts(response.data);
                    } else {
                      setproducts([]);
                    }
                } catch (err) {
                    console.error('Error fetching product:', err);
                    alert('Failed to fetch product. Please try again.');
                }
            };
            fetchProduct();
            isFetchedRef.current = true;
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
          {products.map((src) => (
            <SwiperSlide className="Main-swiper-mn-wrapper-clctn" key={src._id}>
              <div className="w-full h-[400px] flex justify-center items-center bg-white rounded-xl shadow-md px-4">
                <img
                  src={src.Product_Main_image}
                  alt={`Slide`}
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
