import React from 'react'
import "./Footer.css";
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
  <div className='Main-Footer-Main-Wrapper'>
    <div className='Main-Footer-Categories-Wrapper'>
      <div className='Category-Wrapper-One'>
        <ul>
          <p className='main-abt'>About Us</p>
          <li>Our values</li>
          <li>Privacy policy</li>
          <li>Terms & conditions</li>
          <li>Disclaimer</li>
          <li>Corporate Information</li>
          <li>Media Outreach</li>
          <li>Distributor Queries</li>
        </ul>
      </div>
      <div className='Category_Wrapper-Second'>
      <ul>
        <p className='main-quick'>Quick Links</p>
        <Link to={'/about'}><li>About</li></Link> 
         <Link to={'/contact'}><li>Contact</li></Link> 
          <li>Return & refund policy</li>
          <li>Track order</li>
          <li>Help Center</li>
          <li>Download App</li>
        </ul>
      </div>
      <div className='Category-wrapper-Third'>
      <ul>
        {/* <p>Category</p> */}
          <li>Embrace Minimalist, where each element is chosen for its scientific merit, offering you authentic, effective skincare solutions.</li>
          <li><b>Address : </b>New Delhi, 22 new Street House no 24 485001</li>
          <li><b>Mail : </b>customercare@gmail.com</li>
          <li><b>Phone : </b>+00 00000 00000</li>
        </ul>
      </div>
    </div>
  </div>
  
  )
}

export default Footer