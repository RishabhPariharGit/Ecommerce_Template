import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './MegaVideoSlider.css';

const videos = [
  {
    id: 1,
    title: 'Rustic Charm',
    url: 'https://urban-furniture-demo.myshopify.com/cdn/shop/videos/c/vp/49b9bf4eed444411b60620464003dceb/49b9bf4eed444411b60620464003dceb.HD-720p-2.1Mbps-28456099.mp4?v=0',
    thumbnail: 'https://urban-furniture-demo.myshopify.com/cdn/shop/files/preview_images/49b9bf4eed444411b60620464003dceb.thumbnail.0000000000.jpg?v=1714650885&width=3840',
  },
  {
    id: 2,
    title: 'Cozy Living',
    url: 'https://urban-furniture-demo.myshopify.com/cdn/shop/videos/c/vp/728938c42c254bb2a43481d6701d8830/728938c42c254bb2a43481d6701d8830.HD-720p-2.1Mbps-28456100.mp4?v=0',
    thumbnail: 'https://urban-furniture-demo.myshopify.com/cdn/shop/files/preview_images/49b9bf4eed444411b60620464003dceb.thumbnail.0000000000.jpg?v=1714650885&width=3840',
  },
  {
    id: 3,
    title: 'Library Vibes',
    url: 'https://urban-furniture-demo.myshopify.com/cdn/shop/videos/c/vp/49b9bf4eed444411b60620464003dceb/49b9bf4eed444411b60620464003dceb.HD-720p-2.1Mbps-28456099.mp4?v=0',
    thumbnail: 'https://urban-furniture-demo.myshopify.com/cdn/shop/files/preview_images/49b9bf4eed444411b60620464003dceb.thumbnail.0000000000.jpg?v=1714650885&width=3840',
  },

  {
    id: 4,
    title: 'Library Vibes',
    url: 'https://urban-furniture-demo.myshopify.com/cdn/shop/videos/c/vp/728938c42c254bb2a43481d6701d8830/728938c42c254bb2a43481d6701d8830.HD-720p-2.1Mbps-28456100.mp4?v=0',
    thumbnail: 'https://urban-furniture-demo.myshopify.com/cdn/shop/files/preview_images/49b9bf4eed444411b60620464003dceb.thumbnail.0000000000.jpg?v=1714650885&width=3840',
  },

  {
    id: 5,
    title: 'Library Vibes',
    url: 'https://urban-furniture-demo.myshopify.com/cdn/shop/videos/c/vp/49b9bf4eed444411b60620464003dceb/49b9bf4eed444411b60620464003dceb.HD-720p-2.1Mbps-28456099.mp4?v=0',
    thumbnail: 'https://urban-furniture-demo.myshopify.com/cdn/shop/files/preview_images/49b9bf4eed444411b60620464003dceb.thumbnail.0000000000.jpg?v=1714650885&width=3840',
  },
];

const MegaVideoSlider = () => {
  const videoRefs = useRef([]);
  const [playingIndex, setPlayingIndex] = useState(null);

  const handlePlay = (index) => {
    const currentVideo = videoRefs.current[index];

    if (!currentVideo) return;

    // Toggle play/pause if clicking the same video
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

    // Pause all other videos
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
        breakpoints={{
          768: {
            slidesPerView: 1.5,
          },
          1024: {
            slidesPerView: 1.5,
          },
        }}
      >
        {videos.map((video, index) => (
          <SwiperSlide key={video.id}>
            <div className="mega-video-card">
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                className="mega-video-element"
                poster={video.thumbnail}
                muted
                loop
                preload="metadata"
                onClick={() => handlePlay(index)}
              >
                <source src={video.url} type="video/mp4" />
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
                  <div className="mega-video-title">{video.title}</div>
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
