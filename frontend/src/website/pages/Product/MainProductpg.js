import React, { useState } from 'react';
import './MainProductpg.css';
import { Link } from 'react-router-dom';

const MainProductpg = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [zoomPosition, setZoomPosition] = useState({ backgroundPosition: '0% 0%' });
    const [isHovered, setIsHovered] = useState(false); 
    const [selectedVariant, setSelectedVariant] = useState('black'); // New state for selected variant

    const allThumbnails = {
        black: [
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/42d6ee72-d308-4b21-8f1f-3d1be1d3b269/W+NIKE+ZOOMX+ZEGAMA+TRAIL+2.png",
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b0744d81-6067-4d99-8e8b-2e8f493db628/W+NIKE+ZOOMX+ZEGAMA+TRAIL+2.png",
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/bb5fce25-6578-4e88-bb9d-0d5b626b7f98/W+NIKE+ZOOMX+ZEGAMA+TRAIL+2.png",
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4d538a81-d3d6-43be-a603-84ea6b219e37/W+NIKE+ZOOMX+ZEGAMA+TRAIL+2.png",
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/10400a4c-6444-47ff-8ed6-996bae680fdb/W+NIKE+ZOOMX+ZEGAMA+TRAIL+2.png",
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/17cd699e-fc79-4604-8274-d43faea3ef69/W+NIKE+ZOOMX+ZEGAMA+TRAIL+2.png",
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3837c9ca-0988-48aa-ba97-84759c9d8f39/W+NIKE+ZOOMX+ZEGAMA+TRAIL+2.png"
        ],
        color: [
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f535ed7c-6ccc-4dd5-8e78-07495b4892b1/W+NIKE+ZOOMX+ZEGAMA+TRAIL+2.png",
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/2c87439d-eda8-41c8-b4e6-7b502134edcd/W+NIKE+ZOOMX+ZEGAMA+TRAIL+2.png",
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/47b9a3ba-6be3-4ce7-9001-6031728b2ee9/W+NIKE+ZOOMX+ZEGAMA+TRAIL+2.png",
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/54642879-2caf-485b-999d-37faf4c98e18/W+NIKE+ZOOMX+ZEGAMA+TRAIL+2.png",
            "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/54642879-2caf-485b-999d-37faf4c98e18/W+NIKE+ZOOMX+ZEGAMA+TRAIL+2.png"
        ]
    };

    const thumbnails = allThumbnails[selectedVariant];

    const updateMainDisplay = (index) => {
        setCurrentIndex(index);
    };

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setZoomPosition({
            backgroundPosition: `${x}% ${y}%`
        });
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : thumbnails.length - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex < thumbnails.length - 1 ? prevIndex + 1 : 0));
    };

    const handleVariantClick = (variant) => {
        setSelectedVariant(variant);
        setCurrentIndex(0); // Reset to the first image of the new variant
    };

    return (
        <div className="main-dispaly-complete-wrapper">
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
            <div className="two-segment-devider">
                <div className='image-main-box'>
                <div className="main-img-wrapper">
                    {thumbnails.map((src, index) => (
                        <img
                            key={index}
                            src={src}
                            alt={`Thumbnail ${index}`}
                            className={index === currentIndex ? 'selected' : ''}
                            onMouseEnter={() => updateMainDisplay(index)}
                        />
                    ))}
                </div>
                <div
                    className="product-display-wrapper"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <img
                        src={thumbnails[currentIndex]}
                        id="main-display"
                        alt="Main Display"
                    />
                    <div className="slider-buttons">
                        <button id="prevBtn" onClick={handlePrev}>‹</button>
                        <button id="nextBtn" onClick={handleNext}>›</button>
                    </div>
                    {isHovered && (
                        <div
                            className="zoomed-image"
                            style={{
                                backgroundImage: `url(${thumbnails[currentIndex]})`,
                                ...zoomPosition
                            }}
                        />
                    )}
                </div>
                </div>

                <div className='product-complete-desc-main-wrapper'>
                    <div className='Product-main-head-main-wrapper'>
                        <p>Nike Zegama 2
                        Women's Trail-Running Shoes</p>
                        <div className='Product-sub-head-main-wrapper'>
                            <p>shoes women</p>
                        </div>
                    </div>
                    <div className='price-details-main-wrapper'>
                        <div className='price-details-secondary-wrapper'>
                            <div className='currency-format-main-wrapper'>
                                <p>MRP</p>
                            </div>
                            <div className='original-selling-price-main-wrapper'>
                                <p>₹ 16 995.00</p>
                            </div>
                            <div className='discounted-price-main-wrapper'>
                                <p> ₹ 14 995.00</p>
                            </div>
                        </div>
                        <div className='price-content-main-wrapper'>
                            <p>Inclusive of all taxes</p>
                        </div>
                    </div>

                    <div className='variant-selector-main-wrapper'>
                        <div className='variant-image-main-wrapper'>
                            <img 
                                src='https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/42d6ee72-d308-4b21-8f1f-3d1be1d3b269/W+NIKE+ZOOMX+ZEGAMA+TRAIL+2.png'
                                alt="Black variant"
                                onClick={() => handleVariantClick('black')} // Set black variant
                                className={selectedVariant === 'black' ? 'selected' : ''}
                            />
                            <img 
                                src='https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f535ed7c-6ccc-4dd5-8e78-07495b4892b1/W+NIKE+ZOOMX+ZEGAMA+TRAIL+2.png'
                                alt="Color variant"
                                onClick={() => handleVariantClick('color')} // Set color variant
                                className={selectedVariant === 'color' ? 'selected' : ''}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainProductpg;





// import React, { useState, useEffect } from 'react';
// import './MainProductpg.css';
// import { Link } from 'react-router-dom';

// const MainProductpg = () => {
//   const [zoomedImage, setZoomedImage] = useState(null);

//   const images = [
//     'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1722420150_1589822.jpg?format=webp&w=480&dpr=1.0',
//     'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1722498537_6525084.jpg?format=webp&w=480&dpr=1.0',
//     'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1722420167_1831381.jpg?format=webp&w=480&dpr=1.0',
//     'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1722420167_1636546.jpg?format=webp&w=480&dpr=1.0',
//     'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1722420167_2216194.jpg?format=webp&w=480&dpr=1.0'
//   ];

//   const openZoom = (image) => {
//     setZoomedImage(image);
//   };

//   const closeZoom = () => {
//     setZoomedImage(null);
//   };

//   // Disable scrolling when the modal is open
//   useEffect(() => {
//     if (zoomedImage) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'auto';
//     }
//   }, [zoomedImage]);

//   return (
//     <>
    //  <div className='Product-pg-main-wrapper'>
    //      <div className='accordian-main-wrapper'>
    //        <Link to='/'>
    //          <p>Home</p>
    //        </Link>
    //        <span>/</span>
    //        <Link to='/buyer'>
    //          <p>Naruto-Collection</p>
    //        </Link>
    //        <span>/</span>
    //        <p>Product 1</p>
    //      </div>
// <div className='Product-page-main-segment-devider'>
//         <div className='Product-image-gallery-main-wrapper'>
//           <div className='Image-grid-main-wrapper'>
//             {images.map((image, index) => (
//               <img
//                 key={index}
//                 src={image}
//                 alt={`Product ${index + 1}`}
//                 onClick={() => openZoom(image)}
//                 className='product-image'
//               />
//             ))}
//           </div>
//         </div>

//         <div className='product-complete-desc-main-wrapper'>
//           <div className='Product-main-head-main-wrapper'>
//            <p>Naruto-Leaf Village T-Shirt</p>
//            <div className='Product-sub-head-main-wrapper'>
//            <p>Oversized T-shirt</p>
//            </div>
//           </div>
//           </div>
//         </div>

//         {/* Modal for Zoomed Image */}
//         {zoomedImage && (
//           <div className='zoom-modal' onClick={closeZoom}>
//             <div className='zoom-image-wrapper'>
//               <img src={zoomedImage} alt="Zoomed Product" className='zoom-image' />
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default MainProductpg;