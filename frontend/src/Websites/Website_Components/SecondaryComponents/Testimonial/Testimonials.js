//  import React, { useEffect, useState } from 'react';
// import Swiper from 'swiper/bundle';
// import 'swiper/swiper-bundle.css'; // Import Swiper CSS
// import './Testimonials.css';


// const Testimonials = () => {
//   const [testimonialData, setTestimonialData] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:8080/testimonials') // Fetching testimonials data from your API
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log('Fetched testimonials data:', data);
//         setTestimonialData(data.map(item => ({
//           Imgurl: item.Imgurl,
//           Headtext: item.Headtext,
//           Bodytext: item.Bodytext,
//           JobTitle: item.JobTitle, // Assuming your API returns job title
//           LinkedinUrl: item.LinkedinUrl // Assuming your API returns LinkedIn URL
//         })));
//       })
//       .catch(error => console.error('Error fetching testimonials:', error));
//   }, []);

//   useEffect(() => {
//     const swiperInstance = new Swiper('.c-testimonials', {
//       spaceBetween: 30,
//       effect: 'fade',
//       loop: testimonialData.length > 1,
//       mousewheel: {
//         invert: false,
//       },
//       pagination: {
//         el: '.c-testimonials__pagination',
//         clickable: true,
//       },
//       navigation: {
//         nextEl: '.c-testimonials__arrow-next',
//         prevEl: '.c-testimonials__arrow-prev',
//       },
//     });

//     return () => {
//       if (swiperInstance) swiperInstance.destroy(); // Clean up on unmount
//     };
//   }, [testimonialData]);

//   return (
//     <>
//       <div className='Testimonial-head-subhead'>
//                head={"Clients Testimonials"}
//           subhead={"Our clients love us, check them out"}
       
//       </div>
//       <div className='Testimonials-main-wrapper'>
//         <div className="c-testimonials swiper-container">
//           <ul className="c-testimonials__items swiper-wrapper">
//             {testimonialData.map((item, index) => (
//               <li key={index} className="c-testimonials__item c-card-testimonial swiper-slide">
//                 <div className="c-card-testimonial__profile">
//                   <img
//                     src={item.Imgurl}
//                     alt="Testimonial"
//                     className="c-card-testimonial__image"
//                   />
//                 </div>
//                 <div className="c-card-testimonial__description">
//                   <span className="c-card-testimonial__job">{item.JobTitle}</span>
//                   <div className="c-card-testimonial__author">{item.Headtext}</div>
//                   <div className="c-card-testimonial__excerpt">
//                     {item.Bodytext}
//                   </div>
//                   <a
//                     href={item.LinkedinUrl}
//                     className="c-card-testimonial__link"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     More on LinkedIn
//                   </a>
//                 </div>
//               </li>
//             ))}
//           </ul>
//           <div className="c-testimonials__pagination swiper-pagination" />
//           <div className="c-testimonials__arrows">
//             <button className="c-testimonials__arrow-prev swiper-button-prev">Prev</button>
//             <button className="c-testimonials__arrow-next swiper-button-next">Next</button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Testimonials;
