import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './MegaVideoSlider.css';
import { getAllScrollingVideoforSite } from '../../../../Services/WebsiteServices/AllServices/ScrollingVideoService';

const MegaVideoSlider = () => {
  const videoRefs = useRef([]);
  const [videos, setVideos] = useState([]);
  const [playingIndex, setPlayingIndex] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await getAllScrollingVideoforSite();
        if (response && response.data) {
          setVideos(response.data);
        } else {
          setVideos([]);
        }
      } catch (err) {
        console.log("Error during fetching videos:", err);
      }
    };
    fetchVideos();
  }, []);

  const handlePlay = (index) => {
    const currentVideo = videoRefs.current[index];

    if (!currentVideo) return;

    if (playingIndex === index) {
      if (currentVideo.paused) {
        currentVideo.play();
        setPlayingIndex(index);
      } else {
        currentVideo.pause();
        setPlayingIndex(null);
      }
      return;
    }

    videoRefs.current.forEach((video, i) => {
      if (video && i !== index) {
        video.pause();
        video.currentTime = 0;
      }
    });

    currentVideo.play();
    setPlayingIndex(index);
  };

  return (
    <div className="mega-video-slider-container">
      <Swiper
        slidesPerView={1.5}
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 1.5,
          },
          1024: {
            slidesPerView: 1.5,
          },
        }}
        modules={[Autoplay]}
      >
        {videos.map((video, index) => (
          <SwiperSlide key={video._id}>
            <div className="mega-video-card">
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                className="mega-video-element"
               
                muted
                autoPlay
                loop
                preload="metadata"
                onClick={() => handlePlay(index)}
              >
                <source src={video.Video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {playingIndex !== index && (
                <div className="mega-video-overlay">
                  <button
                    className="mega-play-button"
                    onClick={() => handlePlay(index)}
                  >
                    ▶
                  </button>
                  <div className="mega-video-title">{video.Text}</div>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MegaVideoSlider;
