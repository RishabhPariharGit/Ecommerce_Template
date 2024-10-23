import React, { useEffect, useState } from 'react';
import './Productcard.css';
import { Link } from 'react-router-dom';

const Productcard = () => {
  const [productdata, setproductdata] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/productcard') // Ensure the URL matches your backend route
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched productcard data:', data); // Log fetched data
        setproductdata(data.map(item => ({
          Arrival: item.Arrival,
          Image: item.Image,
          Tag: item.Tag,
          Productname: item.Productname,
          ProductInfo: item.ProductInfo,
          MaximumRP: item.MaximumRP,
          Sellingprice: item.Sellingprice
        })));
      })
      .catch(error => console.error('Error fetching productcard data:', error));
  }, []);

  return (
    <div className='main-card-wrapper'>
      {productdata.slice(0, 4).map((item, index) => (
        <section key={index} className="product-card">
          <div className="badge">{item.Arrival}</div>
          <div className="product-thumb">
            <img src={item.Image} alt={item.Productname} />
          </div>
          <div className="product-details">
            <span className="product-category">{item.Tag}</span>
            <h4>
             <Link to = '/product'> {item.Productname}</Link>
            </h4>
            <p>{item.ProductInfo}</p>
            <div className="product-bottom-details">
              <div className="product-price">
                <small>${item.MaximumRP}</small>${item.Sellingprice}
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
        </section>
      ))}
    </div>
  );
}

export default Productcard;
