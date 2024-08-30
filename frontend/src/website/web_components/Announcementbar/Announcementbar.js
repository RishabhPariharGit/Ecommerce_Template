import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './Announcementbar.css';

const Announcementbar = () => {
  // Create refs for the navigation buttons
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className='Announcement-main-wrapper'>
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        loop={true}
        className='swiper-container'
      >
        <SwiperSlide>
          <p>Up to 50% off on selected products</p>
        </SwiperSlide>
        <SwiperSlide>
          <p>Free Shipping on orders above 500/-</p>
        </SwiperSlide>
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div ref={prevRef} className="swiper-button-prev"></div>
      <div ref={nextRef} className="swiper-button-next"></div>
    </div>
  );
}

export default Announcementbar;
