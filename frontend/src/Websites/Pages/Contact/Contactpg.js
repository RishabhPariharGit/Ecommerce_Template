import React from 'react';
import './Contactpg.css';
import Newsletter from '../../Website_Components/SecondaryComponents/NewsLetter/Newsletter';
import Footer from '../../Website_Components/PrimaryComponents/Footer/Footer';

const Contact = () => {
  return (
  <>
  <div className='main-contact-page-wrapper'>
    <div className='main-contact-page-Heading-wrapper'>
      <h2>Contact</h2>
    </div>
    <Newsletter/>
    </div>
    <Footer/>
    </>
  )
}

export default Contact