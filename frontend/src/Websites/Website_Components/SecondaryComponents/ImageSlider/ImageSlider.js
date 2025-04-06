import React, { useEffect, useState } from 'react';
import { Autoplay, A11y, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/controller';
import { getAllImageforSite } from '../../../../Services/WebsiteServices/AllServices/ImageSliderService';

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
        <section className='bg-white'>
            {Array.isArray(images) && images.length > 0 && (
                <Swiper
                    modules={[Autoplay, A11y, Pagination]}
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={true} // ✅ Infinite looping enabled
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false
                    }}
                    speed={1500}
                    pagination={{ clickable: true }}
                >
                    {images.map((data, index) => (
                        <SwiperSlide key={index}>
                            {/* Image Container */}
                            <div className="relative w-full">
                                <a href={data.Link}>
                                    <img
                                        src={data.Image}
                                        alt={`slide-${index + 1}`}
                                        className=" object-cover"
                                        style={{
                                            width: "1500px",
                                            height: "500px"
                                        }}
                                    />
                                    {/* Text Overlay */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-red bg-black/50 p-4">
                                        <h2 className="text-4xl font-bold">{data.Text}</h2>
                                        <p className="text-lg mt-2">{data.Description}</p>
                                    </div>
                                </a>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </section>
    );
};

export default MainHomebanner;
