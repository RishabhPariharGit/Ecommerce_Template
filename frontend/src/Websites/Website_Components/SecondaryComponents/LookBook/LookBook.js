import React from 'react'
import './LookBook.css'
import { Link } from 'react-router-dom';

const LookBook = () => {
    function updateDescription(htmlContent) {
        const descriptionElement = document.getElementById("description-text");
        descriptionElement.innerHTML = htmlContent;
      }
  
      function handleFocusPointClick(iconUrl, stateName, stateDesc) {
        const descriptionHtml = `
          <img src="${iconUrl}" width="200" height="200" alt="Description Icon" />
          <p>${stateName}</p>
          <p>${stateDesc}</p>
        `;
        updateDescription(descriptionHtml);
      }

  return (
    <>
    <div className='lookbook-main-heading-primary-wrapper'>
 <div className='look-book-main-heading-main-wrapper'><p>Shop The Best Essentials</p></div>  
 <div className='look-book-main-sub-heading-main-wrapper'><p>These Categories are highly rated by our customers grab them all!</p></div>  
 </div>
 <div className="main-lookbook-wrapper">
    <div className="main-lookbook-img-wrapper">
      <div className="main-lookbook-img">
        <img src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_1946,c_limit/02d3a3ae-42e9-47c1-89bb-a438dae90757/nike-just-do-it.png" alt="Main Map" />

        <div className="focus-point-one dot-point-1">
  +
  <div className="main-lookbook-desc-wrapper-mn-class">
    <p className='main-lookbook-desc-wrapper-mn-class-heading'>Shirts</p>
    <p className='main-lookbook-desc-wrapper-mn-class-description'>Shop the best items for more discount and offer. check them out</p>
    <Link to={'http://localhost:3000/product/sweatshirt'}><button>Shop Now</button></Link></div>
    </div>

<div className="focus-point-one dot-point-2">
  +
  <div className="main-lookbook-desc-wrapper-mn-class"><p className='main-lookbook-desc-wrapper-mn-class-heading'>Shoes</p>
    <p className='main-lookbook-desc-wrapper-mn-class-description'>Shop the best items for more discount and offer. check them out</p>
    <Link to={'http://localhost:3000/product/shirt'}><button>Shop Now</button></Link>
</div>
</div>
<div className="focus-point-one dot-point-3">
  +
  <div className="main-lookbook-desc-wrapper-mn-class"><p className='main-lookbook-desc-wrapper-mn-class-heading'>Shorts</p>
    <p className='main-lookbook-desc-wrapper-mn-class-description'>Shop the best items for more discount and offer. check them out</p>
    <Link to={'http://localhost:3000/product/trousers'}><button>Shop Now</button></Link></div>
</div>
</div>
    </div>
  </div>
    </>
  )
}

export default LookBook