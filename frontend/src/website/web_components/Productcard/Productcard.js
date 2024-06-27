import React from 'react'
import './Productcard.css'

const Productcard = () => {
  return (<>
   <div className='main-card-wrapper'>
    <section>
  <div className="product-card spacing">
    <div className="badge">New Arrival</div>
    <div className="product-thumb">
      <img src="https://cdn-icons-png.flaticon.com/512/2806/2806251.png" />
    </div>
    <div className="product-details">
      <span className="product-category">T-Shirt</span>
      <h4>
        <a href="#">New T-Shirt For Man</a>
      </h4>
      <p>
        New Import T-Shirt For Man Very Rare Collection, If You Want Order Right
        Now
      </p>
      <div className="product-bottom-details">
        <div className="product-price">
          <small>$15.10</small>$7.99
        </div>
        <div className="product-links">
          <a href="#">
            <i className="fa fa-heart" />
          </a>
          <a href="#">
            <i className="fa fa-shopping-cart" />
          </a>
        </div>
      </div>
    </div>
  </div>
  </section>
   </div>
   </>
  )
}

export default Productcard