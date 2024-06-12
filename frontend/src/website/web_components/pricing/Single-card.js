import React from 'react'
import './Pricing.css'

const SingleCard = ({title,price,features}) => {
  return (
    <section className="card-section" id="card-section">
    <div className="card">
      <div className="card-part card-top">
        <span className="card-icon">∞</span>
        <h2 className="card-title">{title}</h2>
      </div>
      <div className="card-part card-center">
        <span className="sign">$</span>
        <span className="price">{price}</span>
        <span className="time">/month</span>
      </div>
      <div className="card-part card-bottom">
        <ul className="list-options">

          {features.map((feature, index) =>(
            <li key={index}>{feature}</li>
          ))}
        </ul>
        <button className="btn-signup">Sign up</button>
      </div>
    </div>
  
  </section>
  )
}

export default SingleCard