import React, { useEffect, useState } from 'react';
import Headsubhead from '../HeadSubhead/Headsubhead'
import './AboutComp.css'


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
              setaboutdata(data.map((img, headtxt,bdytxt) => 
                {
                  img.imgurl,
              headtxt.headtext,
              bdytxt.bodytext
            }
            ));
          })
          .catch(error => console.error('Error fetching images:', error));
  }, []);


  
  return (<>
  <div className='Abt-Head-subhead'>
    <Headsubhead
head={"About Company"}
/>
</div>
<div className='main-About-wrapper'>
    <div className='main-abt-wrapper'>
    <div className="vhcf-section">
    <div className="vhcf-row">
      <div className="vhcf-column">
        <div className="vhcf-module">
          <img
            src="https://staticg.sportskeeda.com/editor/2022/12/dc793-16708632929484-1920.jpg"
            alt=""
          />
        </div>
       
        <div className="vhcf-module">
          <div className="vhcf-promo_description">
            <div className='head-desc'>
            <p>
                  There are many variations of passages of Lorem Ipsum
                  available.
            </p>
            </div>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>
            <button>Know More</button>
          </div>
        </div> 
      </div>
    </div>
  </div>
    </div>
    </div>
    </>
  )
}

export default AboutComp