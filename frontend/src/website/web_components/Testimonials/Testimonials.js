import React, { useEffect , useState} from 'react';
import Swiper from 'swiper/bundle';
import './Testimonials.css';
import Headsubhead from '../HeadSubhead/Headsubhead';

const Testimonials = () => {


  const [testimonialdata,  settestimonialdata] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/testimonials') 
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched Aboutus data:', data); 
        settestimonialdata(data.map(item => ({
          Imgurl: item.Imgurl,
          Headtext: item.Headtext,
          Bodytext: item.Bodytext
        })));
      })
      .catch(error => console.error('Error fetching images:', error));
  }, []);


  useEffect(() => {
    if (testimonialdata.length > 1) {
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
    } else {
      new Swiper('.c-testimonials', {
        spaceBetween: 30,
        effect: 'fade',
        loop: false,
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
    }
  }, [testimonialdata]);

  return (
    <>
    <div className='Testimonial-head-subhead'>
      <Headsubhead
        head={"CLIENTS TESTIMONIALS"}
        subhead={"Our clients love us check them"}
      />
      </div>
      <div className='Testimonials-main-wrapper'>
        <div className="c-testimonials">
          <ul className="c-testimonials__items swiper-wrapper">
            {/* CARD 1 */}
            { testimonialdata.map((item, index)=>(
            <li key={index} className="c-testimonials__item c-card-testimonial swiper-slide">
              <div  className="c-card-testimonial__profile">
                <img
                  src={item.Imgurl}
                  alt=""
                  className="c-card-testimonial__image"
                />
              </div>
              <div className="c-card-testimonial__description">
                <span className="c-card-testimonial__job">Bass @AmonTheSign</span>
                <div className="c-card-testimonial__author">{item.Headtext}</div>
                <div className="c-card-testimonial__excerpt">
                 {item.Bodytext}
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
          ))}
          </ul>
          <div className="c-testimonials__pagination" />
        </div>
      </div>
    </>
  );
};

export default Testimonials;
