import React, { useEffect } from 'react';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.min.css'; 
import './FilterSidebar.css'; // Move all your CSS to this file

const FilterSidebar = () => {
  useEffect(() => {
    // Setup toggle for category and color
    const setupToggle = (btnId, contentId) => {
      const btn = document.getElementById(btnId);
      const content = document.getElementById(contentId);
      let expanded = false;

      const toggleHandler = () => {
        expanded = !expanded;
        content.classList.toggle('expanded');
        btn.textContent = expanded ? 'Show less' : 'Show more';
      };

      btn.addEventListener('click', toggleHandler);

      // Cleanup
      return () => {
        btn.removeEventListener('click', toggleHandler);
      };
    };

    const cleanupCategory = setupToggle('show-more-category', 'extra-category-items');
    const cleanupColor = setupToggle('show-more-color', 'extra-color-items');

    // Price Slider setup
    const priceSlider = document.getElementById('price-slider');
    const priceDisplay = document.getElementById('price-range-display');

    if (priceSlider && !priceSlider.noUiSlider) {
      noUiSlider.create(priceSlider, {
        start: [0, 5000],
        connect: true,
        step: 100,
        range: {
          min: 0,
          max: 5000
        },
        format: {
          to: value => Math.round(value),
          from: value => Number(value)
        }
      });

      priceSlider.noUiSlider.on('update', (values) => {
        priceDisplay.textContent = `₹${values[0]} - ₹${values[1]}`;
      });
    }

    return () => {
      cleanupCategory?.();
      cleanupColor?.();
    };
  }, []);

  return (
    <div className="fltr-cstm-clss-filter-section">
      <div className="fltr-cstm-clss-filter-title">Filters</div>

      {/* Price Filter */}
      <div className="fltr-cstm-clss-filter-group">
        <h4>Price</h4>
        <div className="price-slider-label">Selected Price Range</div>
        <div className="price-range-display" id="price-range-display">₹0 - ₹5000</div>
        <div id="price-slider"></div>
      </div>

      {/* Category Filter */}
      <div className="fltr-cstm-clss-filter-group">
        <h4>Category</h4>
        <ul className="fltr-cstm-clss-filter-options" id="fltr-cstm-clss-category-list">
          <li><label>Briefs <span>(23)</span><input type="checkbox" /></label></li>
          <li><label>Caps <span>(9)</span><input type="checkbox" /></label></li>
          <li><label>Cargos <span>(22)</span><input type="checkbox" /></label></li>
          <li><label>Jackets <span>(16)</span><input type="checkbox" /></label></li>
          <li><label>Jeans <span>(241)</span><input type="checkbox" /></label></li>
          <div className="fltr-cstm-clss-extra-categories" id="extra-category-items">
            <li><label>Polos <span>(33)</span><input type="checkbox" /></label></li>
            <li><label>Shirts <span>(45)</span><input type="checkbox" /></label></li>
            <li><label>Shorts <span>(47)</span><input type="checkbox" /></label></li>
          </div>
        </ul>
        <div className="fltr-cstm-clss-show-more" id="show-more-category">Show more</div>
      </div>

      {/* Color Filter */}
      <div className="fltr-cstm-clss-filter-group">
        <h4>Color</h4>
        <ul className="fltr-cstm-clss-filter-options">
          <li>
            <label>
              <span><span className="fltr-cstm-clss-color-circle" style={{ backgroundColor: '#f5f5dc' }}></span>Beige (48)</span>
              <input type="checkbox" />
            </label>
          </li>
          <li>
            <label>
              <span><span className="fltr-cstm-clss-color-circle" style={{ backgroundColor: '#000' }}></span>Black (150)</span>
              <input type="checkbox" />
            </label>
          </li>
          <li>
            <label>
              <span><span className="fltr-cstm-clss-color-circle" style={{ backgroundColor: '#eb5454' }}></span>Red (48)</span>
              <input type="checkbox" />
            </label>
          </li>
          <li>
            <label>
              <span><span className="fltr-cstm-clss-color-circle" style={{ backgroundColor: '#05aac7' }}></span>Blue (150)</span>
              <input type="checkbox" />
            </label>
          </li>
          <li>
            <label>
              <span><span className="fltr-cstm-clss-color-circle" style={{ backgroundColor: '#e7d95a' }}></span>Yellow (48)</span>
              <input type="checkbox" />
            </label>
          </li>
          <div className="fltr-cstm-clss-extra-categories" id="extra-color-items">
            <li>
              <label>
                <span><span className="fltr-cstm-clss-color-circle" style={{ backgroundColor: '#8de6fc' }}></span>Alice Blue (150)</span>
                <input type="checkbox" />
              </label>
            </li>
          </div>
        </ul>
        <div className="fltr-cstm-clss-show-more" id="show-more-color">Show more</div>
      </div>
    </div>
  );
};

export default FilterSidebar;
