import React, { useEffect, useState } from 'react';
import { Autoplay, A11y, Pagination,Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/controller';
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
        <section className='bg-white'>
            {Array.isArray(images) && images.length > 0 && (
             <Swiper
             modules={[Autoplay, A11y, Pagination, Navigation]}
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
                clickable: true
             }}
         >
         
                    {images.map((data, index) => (
                       <SwiperSlide key={index}>
                       {/* Image Container */}
                       <div className="relative w-full">
                         <a href={data.Link} className="block">
                           {/* Image */}
                           <img
                             src={data.Image}
                             alt={`slide-${index + 1}`}
                             className="object-cover w-full h-[500px]"
                             style={{ maxWidth: "100%" }}
                           />
                     
                           {/* Text Overlay */}
                           <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white p-4 z-10 slider-text-clss-cstm">
                             <h2 className="text-4xl font-bold slider-heading-text-cstm-clss">{data.Text}</h2>
                             <p className="text-lg mt-2">{data.Description}</p>
                           </div>
                         </a>
                       </div>
                     </SwiperSlide>
                     
                    ))}

{/* <div className="swiper-button-prev"></div>
<div className="swiper-button-next"></div> */}

                </Swiper>
            )}
        </section>
    );
};

export default MainHomebanner;
