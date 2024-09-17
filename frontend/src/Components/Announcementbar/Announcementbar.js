import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './Announcementbar.css';

const Announcementbar = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className='Announcement-main-wrapper'>
      <Swiper
        modules={[Navigation, Autoplay]}
        autoplay={{
          delay: 3000,  
          disableOnInteraction: false,
        }}
        loop={true}
        speed={800}  
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        className='swiper-container'
      >
        <SwiperSlide>
          <p>Up to 50% off on selected products</p>
        </SwiperSlide>
        <SwiperSlide>
          <p>Free Shipping on orders above 500/-</p>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Announcementbar;
