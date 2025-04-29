import React from 'react';
import './ScrollingText.css';

const ScrollingText = () => {
  const repeatCount = 30;
  const items = [
    "Stay cozy and stylish with our ultra-soft sweatshirt",
    "Designed for all-day comfort and effortless layering",
    "Step into style",
    "Empower your look"
  ];

  return (
    <div className="marquee-main-container">
      <div className="main-marquee-cont">
        {Array.from({ length: repeatCount }).map((_, i) => (
          <ul key={i}>
            {items.map((text, index) => (
              <li key={index}>
                <span className="main-marquee-text">{text}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default ScrollingText;
