import React, { useEffect } from 'react';
import Swiper from 'swiper/bundle';
import './Testimonials.css';
import Headsubhead from '../HeadSubhead/Headsubhead';

const Testimonials = () => {
  useEffect(() => {
    new Swiper('.c-testimonials', {
      spaceBetween: 30,
      effect: 'fade',
      loop: true,
      mousewheel: {
        invert: false,
      },
      pagination: {
        el: '.c-testimonials__pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.c-testimonials__arrow-next',
        prevEl: '.c-testimonials__arrow-prev',
      },
    });
  }, []);

  return (
    <>
      <Headsubhead
        head={"Clients Testimonials"}
        subhead={"Our clients love us check them"}
      />
      <div className='Testimonials-main-wrapper'>
        <div className="c-testimonials">
          <ul className="c-testimonials__items swiper-wrapper">
            {/* CARD 1 */}
            <li className="c-testimonials__item c-card-testimonial swiper-slide">
              <div className="c-card-testimonial__profile">
                <img
                  src="https://preview.redd.it/u3kz1tuevfc11.jpg?auto=webp&s=00cd56b0da5989ee8975059e3c1f5bd3ee839e0d"
                  alt=""
                  className="c-card-testimonial__image"
                />
              </div>
              <div className="c-card-testimonial__description">
                <span className="c-card-testimonial__job">Bass @AmonTheSign</span>
                <div className="c-card-testimonial__author">Zzor</div>
                <div className="c-card-testimonial__excerpt">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae aliquid
                  ut, explicabo sit fugiat recusandae dolore omnis minus sequi incidunt
                  aut doloribus minima soluta velit, nobis, est eos iste at!
                </div>
                <a
                  href="https://www.linkedin.com/in/hugo-salazar/"
                  className="c-card-testimonial__link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  More on Linkedin
                </a>
              </div>
            </li>
            {/* CARD 2 */}
            <li className="c-testimonials__item c-card-testimonial swiper-slide">
              <div className="c-card-testimonial__profile">
                <img
                  src="https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,q_auto,w_720/63dcc7d0227cb3001dcfc660.jpg"
                  alt=""
                  className="c-card-testimonial__image"
                />
              </div>
              <div className="c-card-testimonial__description">
                <span className="c-card-testimonial__job">Vocals @Amon The Sign</span>
                <div className="c-card-testimonial__author">Amón Lopez</div>
                <div className="c-card-testimonial__excerpt">
                  Asperiores tempora id corporis ab reiciendis enim odio expedita
                  dolorum recusandae! Perspiciatis ullam commodi expedita veritatis,
                  architecto molestiae tempora magni voluptas voluptatem. Facilis
                  consequuntur vitae magnam magni? Corrupti, aperiam excepturi!
                </div>
                <a
                  href="https://www.linkedin.com/in/hugo-salazar/"
                  className="c-card-testimonial__link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  More on Linkedin
                </a>
              </div>
            </li>
          </ul>
          <div className="c-testimonials__pagination" />
        </div>
      </div>
    </>
  );
};

export default Testimonials;
