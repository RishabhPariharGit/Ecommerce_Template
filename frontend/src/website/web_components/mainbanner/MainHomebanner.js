import React from 'react';
import { Autoplay, A11y} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/controller';

const MainHomebanner = () => {

    const images = ['https://staticg.sportskeeda.com/editor/2022/03/c468f-16482907265601-1920.jpg', 
        'https://static1.srcdn.com/wordpress/wp-content/uploads/2023/08/naruto_formation_of_akatsuki.jpg?q=50&fit=contain&w=1140&h=&dpr=1.5', 
        'https://dafunda.com/wp-content/uploads/2023/12/pain-six-paths-from-naruto-3339772528.webp', 
        'https://images.pexels.com/photos/11785594/pexels-photo-11785594.jpeg']

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