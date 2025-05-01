import React from 'react';
import SectionHeading from '../Reusable/Section-Heading'
import './BlogGrid.css';

const BlogGrid = () => {
  return (
    <>
<div className='blg-mn-heading'>
     <SectionHeading className='main-blg-head' heading="Blogs"/>
</div>
<div className="blg-mn-section">
  <div className="blg-mn-card">
    <div className="blg-mn-content blg-mn-light-text">
      <h3>Beard Maintenance On The Go: Grooming Tips For Travelers</h3>
      <p className="blg-mn-date">Posted on March 05, 2024</p>
      <a href="#" className="blg-mn-read-more">Read More</a>
    </div>
  </div>
  
  <div className="blg-mn-card">
    <img src="https://release-release.myshopify.com/cdn/shop/articles/image_5-min_6.png?v=1711103696&width=840" alt="Man Grooming" />
    <div className="blg-mn-content">
      <h3>The Modern Man's Guide To Grooming: Navigating The World Of Men's Cosmetics</h3>
      <p className="blg-mn-date">Posted on March 05, 2024</p>
      <a href="#" className="blg-mn-read-more">Read More</a>
    </div>
  </div>
  <div className="blg-mn-card">
    <img src="https://release-release.myshopify.com/cdn/shop/articles/image_5-min_8.png?v=1711104361&width=840" alt="Gel Swatch" />
    <div className="blg-mn-content">
      <h3>The Perfume Palette: A Journey Through Fragrance</h3>
      <p className="blg-mn-date">Posted on March 05, 2024</p>
      <a href="#" className="blg-mn-read-more">Read More</a>
    </div>
  </div>
</div>


    </>
  )
}

export default BlogGrid