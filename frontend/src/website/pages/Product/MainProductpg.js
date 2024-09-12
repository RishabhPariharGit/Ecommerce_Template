import React, { useState } from 'react';
import './MainProductpg.css';
import Modal from './ProductDescriptionModal/Modal';
import { Link } from 'react-router-dom';

const MainProductpg = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [zoomPosition, setZoomPosition] = useState({ backgroundPosition: '0% 0%' });
    const [isHovered, setIsHovered] = useState(false); 
    const [selectedVariant, setSelectedVariant] = useState('black'); // New state for selected variant
    const [isModalOpen, setModalOpen] = useState(false); 

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


    const handleClick = () => {
        setModalOpen(true); // Open modal
    };

    const handleClose = () => {
        setModalOpen(false); // Close modal
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

                    <div className='size-select-main-wrapper'>
                        <div className='size-select-secondary-wrapper'>
                            <p>Select Size</p>
                            <p>Size Guide</p>
                        </div>
                        <div className='size-number-main-wrapper'>
                            <div className='size-box-main-wrapper'>
                                UK 3.5
                            </div>
                            <div className='size-box-main-wrapper'>
                                UK 5.5
                            </div>
                            <div className='size-box-main-wrapper'>
                                UK 6.5
                            </div>
                            <div className='size-box-main-wrapper'>
                                UK 7.5
                            </div>
                            <div className='size-box-main-wrapper'>
                                UK 8.5
                            </div>
                            <div className='size-box-main-wrapper'>
                                UK 9.5
                            </div>
                            <div className='size-box-main-wrapper'>
                                UK 10.5
                            </div>
                        </div>
                    </div>
<div className='Buy-Buttons-Main-Wrapper'>
    <div className='add-to-cart-main-wrapper'>
<button>Add to Cart</button>
    </div>
    <div className='wishlist-button-main-wrapper'>
<button>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
</svg>
    Favourite</button>
    </div>
</div>

<div className='product-short-desc-main-wrapper'>
    <div className='desc-para-main-wrapper'>
    <p>Up the mountain, through the woods, to the top of the trail you can go. Equipped with an ultra-responsive ZoomX foam midsole, the Zegama 2 is designed to conquer steep ridges, jagged rocks and races from trailhead to tip. Optimal cushioning complements a rugged outsole made for your trail running journey.</p>
    </div>
    <div className='desc-points-main-wrapper'>
  <ul>
    <li><span>Colour Shown -</span> Black/Wolf Grey/Anthracite/White</li>
    <li><span>Style -</span> FD5191-001</li>
    <li><span>Country/Region of Origin -</span> China</li>
  </ul>
</div>

<div className='complete-product-desc-button' onClick={handleClick}>
    <p>view more</p>
</div>



</div>

                </div>
            </div>

<div className='a-plus-content-main-wrapper'>
    <div className='usp-section-main-wrapper'>
        {/* <div className='usp-img-and-desc-main-wrapper'> */}
            <div className='usp-img-and-desc-secondary-wrapper'>
        <img src='https://storage.googleapis.com/mannequin/blobs/74394210-f2dc-4e0b-b75b-bf403d7f5299.svg'/>
        <p>The most advanced AI on Pixel.</p> 
        </div> 
        <div className='usp-img-and-desc-secondary-wrapper'>
        <img src='https://storage.googleapis.com/mannequin/blobs/9921e783-cb12-4053-91dc-3b14fde4de5e.svg'/>
        <p>An elegant design, built to last.</p> 
        </div>  
        <div className='usp-img-and-desc-secondary-wrapper'>
        <img src='https://storage.googleapis.com/mannequin/blobs/061f8b8f-95eb-4239-90f5-3f02bd16017e.svg'/>
        <p>The best Pixel Camera yet.</p> 
        </div>
        <div className='usp-img-and-desc-secondary-wrapper'>
        <img src='https://storage.googleapis.com/mannequin/blobs/55698f01-545f-4176-a09a-5ed5c9f0af6c.svg'/>
        <p>Powerful performance with Pixel's most advanced chip.</p>  
        </div>   
        <div className='usp-img-and-desc-secondary-wrapper'>
        <img src='https://storage.googleapis.com/mannequin/blobs/ecda9982-5fdd-4937-95ad-1f041fcd9189.svg'/>
        <p>Seven years of Pixel Drops, and OS and security updates.3</p>
        </div>  
        {/* </div> */}
    </div>
</div>


            <Modal isOpen={isModalOpen} onClose={handleClose}>
                <div className='desc-para-main-wrapper'>
    <p>Up the mountain, through the woods, to the top of the trail you can go. Equipped with an ultra-responsive ZoomX foam midsole, the Zegama 2 is designed to conquer steep ridges, jagged rocks and races from trailhead to tip. Optimal cushioning complements a rugged outsole made for your trail running journey.</p>
    </div>
    <div className='desc-points-main-wrapper'>
  <ul>
    <li><span>Colour Shown -</span> Black/Wolf Grey/Anthracite/White</li>
    <li><span>Style -</span> FD5191-001</li>
    <li><span>Country/Region of Origin -</span> China</li>
    <li><span>Weight -</span> 264 Approx</li>
    <li><span>Heel-to-toe drop -</span> 4mm</li>
    
  </ul>
</div>
            </Modal>
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