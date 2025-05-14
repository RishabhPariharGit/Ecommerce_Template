import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import './ProductCardSlider.css';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { getColletionByname } from '../../../../../Services/WebsiteServices/AllServices/CollectionService';
import CollectionCard from '../../View/CollectionCard/CollectionCard';

const CollectionCardSlider = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  const [collection, setCollection] = useState(null);

  const isFetchedRef = useRef(false);

  useEffect(() => {
    if (!isFetchedRef.current) {
      const fetchCollection = async () => {
        try {
          const response = await getColletionByname("Explore The Trending Collections");

          if (response.data) {
            console.log("collection",response.data)
            setCollection(response.data[0]);  // no need to restructure — it's already an object
          }
        } catch (err) {
          console.error('Error fetching collection:', err);
          alert('Failed to fetch collection. Please try again.');
        }
      };

      fetchCollection();
      isFetchedRef.current = true;
    }
  }, []);


  console.log("collection1",collection)
  return (
    <div className="main-slider-mn-wrpr">
      <div className="w-full max-w-4xl mx-auto main-slider-wrapper">
        <div className="flex justify-center mt-4 gap-4 main-btn-wrapper">
          <div className="main-heading-product-card-slider">
            <h2>{collection?.Name}</h2>
          </div>

          <div className="main-product-card-slider-buttons">
            <button
              ref={prevRef}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition previous-btn"
            >
              <ArrowBackIosNewIcon className="arrowbackcstmclss" />
            </button>
            <button
              ref={nextRef}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition next-btn"
            >
              <ArrowForwardIosIcon className="arrowforwardcstmclss" />
            </button>
          </div>
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
  breakpoints={{
    0: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 4,
    },
  }}
>
          {collection?.SubcategoryId?.map((subcategory) => (
            <SwiperSlide key={subcategory._id} className="Main-swiper-mn-wrapper-clctn">
              <div className="w-full h-[400px] flex justify-center items-center bg-white rounded-xl shadow-md px-4 mb-clss">
                <CollectionCard product={subcategory} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CollectionCardSlider;
