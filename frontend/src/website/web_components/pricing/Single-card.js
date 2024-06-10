import React from 'react'
import './Pricing.css'

const SingleCard = () => {
  return (
    <section className="card-section" id="card-section">
    <div className="card">
      <div className="card-part card-top">
        <span className="card-icon">∞</span>
        <h2 className="card-title">Premium</h2>
      </div>
      <div className="card-part card-center">
        <span className="sign">$</span>
        <span className="price">49</span>
        <span className="time">/month</span>
      </div>
      <div className="card-part card-bottom">
        <ul className="list-options">
          <li>20 Gb Diskspace</li>
          <li>100 Gb Bandwith</li>
          <li>10 Email Adress</li>
          <li>WordPress Installs</li>
          <li>Private Support</li>
        </ul>
        <button className="btn-signup">Sign up</button>
      </div>
    </div>
  
  </section>
  )
}

export default SingleCard