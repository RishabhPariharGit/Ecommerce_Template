import React, { useEffect, useState } from 'react';
import Headsubhead from '../HeadSubhead/Headsubhead';
import './AboutComp.css';
import { Link } from 'react-router-dom';

const AboutComp = () => {
  const [aboutdata, setaboutdata] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/aboutus') // Ensure the URL matches your backend route
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched Aboutus data:', data); // Log fetched data
        setaboutdata(data.map(item => ({
          imgurl: item.imgurl,
          headtext: item.headtext,
          bodytext: item.bodytext
        })));
      })
      .catch(error => console.error('Error fetching images:', error));
  }, []);

  return (
    <>
      <div className='Abt-Head-subhead'>
      <Headsubhead head={<span style={{ fontWeight:'900',fontSize:'30px'}}>WHY <span style={{color:'#4F46E5', fontWeight:'900',fontSize:'40px'}}>CHOOSE US ?</span></span>} />
      </div>
      <div className='main-About-wrapper'>
        <div className='main-abt-wrapper'>
          {aboutdata.map((item, index) => (
            <div key={index} className="vhcf-section">
              <div className="vhcf-row">
                <div className="vhcf-column">
                  <div className="vhcf-module">
                    <img
                      src={item.imgurl}
                      alt=""
                    />
                  </div>
                  <div className="vhcf-module">
                    <div className="vhcf-promo_description">
                      <div className='head-desc'>
                        <p>{item.headtext}</p>
                      </div>
                      <div className='item-body-text'>
                      <p>{item.bodytext}</p>
                      </div>
                      <div className='Button-wrapper-aboutus'>
                      <Link to={"/about"}><button>Know More</button></Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AboutComp;
