import React, { useEffect, useState } from 'react';
import { Autoplay, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/controller';

const MainHomebanner = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/bannerimages') // Ensure the URL matches your backend route
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched image data:', data); // Log fetched data
                setImages(data.map(image => image.url));
            })
            .catch(error => console.error('Error fetching images:', error));
    }, []);

    return (
        <section className='bg-white'>
            <Swiper
                modules={[Autoplay, A11y]}
                spaceBetween={30} // Adjust the spacing as needed
                slidesPerView={1} // Show only one slide by default
                autoplay
            >
                {images.map((img, index) => (
                    <SwiperSlide key={index}>
                        <a href='/#'>
                            <img
                                src={img}
                                alt={`slide-${index + 1}`}
                                className='w-[100%] h-[750px] mx-auto select-none'
                            />
                        </a>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default MainHomebanner;
