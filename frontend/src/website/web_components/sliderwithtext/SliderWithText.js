import React, { useEffect } from 'react';
import './SliderWithText.css';

const SliderWithText = () => {
  useEffect(() => {
    let slideIndex = 0;

    const showSlides = () => {
      let i;
      const slides = document.getElementsByClassName("image-sliderfade");
      const dots = document.getElementsByClassName("dot");

      if (!slides.length || !dots.length) {
        // Ensure slides and dots exist before proceeding
        setTimeout(showSlides, 100);
        return;
      }

      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }

      slideIndex++;
      if (slideIndex > slides.length) {
        slideIndex = 1;
      }

      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }

      if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
      }

      setTimeout(showSlides, 2000);
    };

    const initializeSlides = () => {
      if (document.getElementsByClassName("image-sliderfade").length > 0) {
        showSlides();
      } else {
        setTimeout(initializeSlides, 100); // Retry after 100ms if elements are not found
      }
    };

    initializeSlides();
  }, []);

  return (
    <div className="main-wrapper">
      <div className="right-wrapper">
        <div className="image-sliderfade fade">
          <img src="logo192.png" style={{ width: "50px" }} />
          <div className="text">Image caption 1</div>
        </div>
        <div className="image-sliderfade fade">
          <img src="logo192.png" style={{ width: "50px" }} />
          <div className="text">Image caption 2</div>
        </div>
        <div className="image-sliderfade fade">
          <img src="logo192.png" style={{ width: "50px" }} />
          <div className="text">Image caption 3</div>
        </div>
        <div className="image-sliderfade fade">
          <img src="logo192.png" style={{ width: "50px" }} />
          <div className="text">Image caption 4</div>
        </div>
        <br />
        <div style={{ textAlign: "center" }}>
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
        </div>
      </div>
      <div className="left-wrapper">
        <h1>This is left side with text</h1>
      </div>
    </div>
  );
};

export default SliderWithText;
