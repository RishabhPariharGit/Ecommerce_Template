import React from 'react';
import './ScrollingTextBig.css';

const ScrollingTextBig = () => {
  const repeatCount = 30;
  const items = [
    "Stay cozy and stylish with our ultra-soft sweatshirt"
  ];

  return (
    <div className="marquee-main-container-big">
      <div className="main-marquee-cont-big">
        {Array.from({ length: repeatCount }).map((_, i) => (
          <ul key={i}>
            {items.map((text, index) => (
              <li key={index}>
                <span className="main-marquee-text-big">{text}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default ScrollingTextBig;
