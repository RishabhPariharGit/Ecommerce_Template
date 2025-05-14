import React from 'react';
import SectionHeading from '../Reusable/Section-Heading';
import Slider from 'react-slick';
import { useTheme, useMediaQuery } from '@mui/material';
import './BlogGrid.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BlogGrid = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const blogData = [
    {
      title: "Beard Maintenance On The Go: Grooming Tips For Travelers",
      date: "Posted on March 05, 2024",
      image: null,
    },
    {
      title: "The Modern Man's Guide To Grooming: Navigating The World Of Men's Cosmetics",
      date: "Posted on March 05, 2024",
      image: "https://release-release.myshopify.com/cdn/shop/articles/image_5-min_6.png?v=1711103696&width=840",
    },
    {
      title: "The Perfume Palette: A Journey Through Fragrance",
      date: "Posted on March 05, 2024",
      image: "https://release-release.myshopify.com/cdn/shop/articles/image_5-min_8.png?v=1711104361&width=840",
    },
  ];

  const mobileSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <>
      <div className='blg-mn-heading'>
        <SectionHeading className='main-blg-head' heading="Blogs" />
      </div>

      <div className="blg-mn-section">
        {isMobile ? (
          <Slider {...mobileSliderSettings}>
            {blogData.map((blog, index) => (
              <div className="blg-mn-card" key={index}>
                {blog.image && <img src={blog.image} alt={blog.title} />}
                <div className={`blg-mn-content ${!blog.image ? 'blg-mn-light-text' : ''}`}>
                  <h3>{blog.title}</h3>
                  <p className="blg-mn-date">{blog.date}</p>
                  <a href="#" className="blg-mn-read-more">Read More</a>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          blogData.map((blog, index) => (
            <div className="blg-mn-card" key={index}>
              {blog.image && <img src={blog.image} alt={blog.title} />}
              <div className={`blg-mn-content ${!blog.image ? 'blg-mn-light-text' : ''}`}>
                <h3>{blog.title}</h3>
                <p className="blg-mn-date">{blog.date}</p>
                <a href="#" className="blg-mn-read-more">Read More</a>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default BlogGrid;
