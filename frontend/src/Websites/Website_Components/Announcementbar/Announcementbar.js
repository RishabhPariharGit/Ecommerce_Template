import React, { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './Announcementbar.css';
import { getAllAnnouncementsforSite } from '../../../Services/WebsiteServices/AllServices/AnnouncementService';

const Announcementbar = () => {
 
  const [Announcements, setAnnouncements] = useState([]);
  const swiperRef = useRef(null); 

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await getAllAnnouncementsforSite();
        console.log("Announcements:", response);
        if (response && response.data) {
          setAnnouncements(response.data);
        } else {
          setAnnouncements([]);
          alert("No announcements available");
        }
      } catch (err) {
        console.error("Error fetching announcements:", err);
      }
    };

    fetchAnnouncements();
  }, []);



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
        onSwiper={(swiper) => swiperRef.current = swiper} // Store swiper instance in ref
        className='swiper-container'
      >
        {Array.isArray(Announcements) && Announcements.length > 0 ? (
          Announcements.map((ann) => (
            <SwiperSlide key={ann._id}>
              <p>{ann.Text}</p>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <p>No announcements available</p>
          </SwiperSlide>
        )}
      </Swiper>


    </div>
  );
};

export default Announcementbar;
