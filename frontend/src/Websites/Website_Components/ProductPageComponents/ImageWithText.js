import React from 'react';
import "../../Website_Components/ProductPageComponents/Mainaplusstyle.css";

const ImageWithText = ({
  topHeading,
  topParagraph,
  sectionHeading,
  sectionText,
  imageUrl,
  showRefreshButton = false,
  bottomHeading,
  bottomParagraph,
}) => {
  return (
    <section className="magic-section">
      <div className="content-wrapper">
        {topHeading && topParagraph && (
          <div className="text-content">
            <h1>{topHeading}</h1>
            <p>{topParagraph}</p>
          </div>
        )}
        <div className="grid-content">
          <div className="text-box">
            <h2>{sectionHeading}</h2>
            <p>{sectionText}</p>
          </div>
          <div className="image-box">
            <img src={imageUrl} alt="Dynamic Section Visual" />
            {showRefreshButton && <button className="refresh-btn">↻</button>}
          </div>
        </div>
        {bottomHeading && bottomParagraph && (
          <div className="text-content-down">
            <h1>{bottomHeading}</h1>
            <p>{bottomParagraph}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ImageWithText;
