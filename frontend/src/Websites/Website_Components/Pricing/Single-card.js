import React, { useEffect, useState } from 'react';
import './Pricing.css'

const SingleCard = ({Title,Price,Offerdetails}) => {


  const [plansdata, setplansdata] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/plans') // Ensure the URL matches your backend route
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched Aboutus data:', data); // Log fetched data
        setplansdata(data.map(item => ({
          Title: item.Title,
          Price: item.Price,
          Offerdetails: item.Offerdetails
        })));
      })
      .catch(error => console.error('Error fetching images:', error));
  }, []);

  return (
    <section className="card-section" id="card-section">
       {plansdata.map((item, index) => (
    <div className="card">
      <div className="card-part card-top">
        <span className="card-icon">∞</span>
        <h2 className="card-title">{item.Title}</h2>
      </div>
      <div className="card-part card-center">
        <span className="sign">$</span>
        <span className="price">{item.Price}</span>
        <span className="time">/month</span>
      </div>
      <div className="card-part card-bottom">
        <ul className="list-options">
            <li key={index}>{item.Offerdetails}</li>
        </ul>
        <button className="btn-signup">Sign up</button>
      </div>
    </div>
            ))}

  </section>
  )
}

export default SingleCard