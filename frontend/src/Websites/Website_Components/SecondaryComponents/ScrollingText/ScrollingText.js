import React from 'react';
import { useEffect, useState } from 'react';
import { getAllScrollingTextforSite } from '../../../../Services/WebsiteServices/AllServices/ScrollingTextService';
import './ScrollingText.css';

const ScrollingText = () => {
  const repeatCount = 30;
  const [Texts, setTexts] = useState([]);

  useEffect(() => {
      const fetchTexts = async () => {
          try {
              const response = await getAllScrollingTextforSite();
              if (response && response.data) {
                const allTexts = response?.data || [];   
                setTexts(allTexts.filter(item => !item.isMegaText));
              } else {
                setTexts([]);
              }
          } catch (err) {
              console.log("Error during fetching images:", err);
          }
      };
      fetchTexts();
  }, []);
  return (
    <div className="marquee-main-container">
      <div className="main-marquee-cont">
        {Array.from({ length: repeatCount }).map((_, i) => (
          <ul key={i}>
            {Texts.map((text, index) => (
              <li key={index}>
                <span className="main-marquee-text">{text.Text}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default ScrollingText;
