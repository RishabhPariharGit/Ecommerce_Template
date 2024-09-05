import React, { useState, useEffect } from 'react';
import './MainProductpg.css';
import { Link } from 'react-router-dom';

const MainProductpg = () => {
  const [zoomedImage, setZoomedImage] = useState(null);

  const images = [
    'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1722420150_1589822.jpg?format=webp&w=480&dpr=1.0',
    'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1722498537_6525084.jpg?format=webp&w=480&dpr=1.0',
    'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1722420167_1831381.jpg?format=webp&w=480&dpr=1.0',
    'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1722420167_1636546.jpg?format=webp&w=480&dpr=1.0',
    'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1722420167_2216194.jpg?format=webp&w=480&dpr=1.0'
  ];

  const openZoom = (image) => {
    setZoomedImage(image);
  };

  const closeZoom = () => {
    setZoomedImage(null);
  };

  // Disable scrolling when the modal is open
  useEffect(() => {
    if (zoomedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [zoomedImage]);

  return (
    <>
      <div className='Product-pg-main-wrapper'>
        <div className='accordian-main-wrapper'>
          <Link to='/'>
            <p>Home</p>
          </Link>
          <span>/</span>
          <Link to='/buyer'>
            <p>Naruto-Collection</p>
          </Link>
          <span>/</span>
          <p>Product 1</p>
        </div>

        <div className='Product-image-gallery-main-wrapper'>
          <div className='Image-grid-main-wrapper'>
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product ${index + 1}`}
                onClick={() => openZoom(image)}
                className='product-image'
              />
            ))}
          </div>
        </div>

        {/* Modal for Zoomed Image */}
        {zoomedImage && (
          <div className='zoom-modal' onClick={closeZoom}>
            <div className='zoom-image-wrapper'>
              <img src={zoomedImage} alt="Zoomed Product" className='zoom-image' />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MainProductpg;
