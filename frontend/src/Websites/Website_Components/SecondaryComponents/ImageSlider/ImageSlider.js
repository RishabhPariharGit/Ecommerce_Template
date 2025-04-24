import React, { useEffect, useState } from 'react';
import { Autoplay, A11y, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { getAllImageforSite } from '../../../../Services/WebsiteServices/AllServices/ImageSliderService';
import './ImageSlider.css';

const MainHomebanner = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchimages = async () => {
            try {
                const response = await getAllImageforSite();
                if (response && response.data) {
                    setImages(response.data);
                } else {
                    setImages([]);
                }
            } catch (err) {
                console.log("Error during fetching images:", err);
            }
        };
        fetchimages();
    }, []);

    return (
        <section className="bg-white">
            {Array.isArray(images) && images.length > 0 && (
                <>
                    <Swiper
                        modules={[A11y, Pagination, Navigation,Autoplay]}
                        spaceBetween={1}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        speed={1500}
                        pagination={{ clickable: true }}
                        navigation={{
                            prevEl: '.custom-swiper-prev',
                            nextEl: '.custom-swiper-next',
                        }}
                        onBeforeInit={(swiper) => {
                            swiper.params.navigation.prevEl = '.custom-swiper-prev';
                            swiper.params.navigation.nextEl = '.custom-swiper-next';
                        }}
                    >
                        {images.map((data, index) => (
                            <SwiperSlide key={index}>
                                <div className="relative w-full">
                                    <a href={data.Link} className="block">
                                        <img
                                            src={data.Image}
                                            alt={`slide-${index + 1}`}
                                            className="object-cover w-full h-[500px]"
                                            style={{ maxWidth: '100%' }}
                                        />
                                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white p-4 z-10 slider-text-clss-cstm">
                                            <h2 className="text-4xl font-bold slider-heading-text-cstm-clss">{data.Text}</h2>
                                            <p className="text-lg mt-2">{data.Description}</p>
                                        </div>
                                    </a>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Wrapped Navigation Buttons */}
                    <div className="swiper-buttons-wrapper-main-class ">
                    <div className="custom-swiper-next cursor-pointer px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"><ArrowForwardIosIcon fontSize="small" /></div>
                        <div className="custom-swiper-prev cursor-pointer px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"><ArrowBackIosIcon fontSize="small" /></div>
                    </div>
                </>
            )}  
        </section>
    );
};

export default MainHomebanner;
