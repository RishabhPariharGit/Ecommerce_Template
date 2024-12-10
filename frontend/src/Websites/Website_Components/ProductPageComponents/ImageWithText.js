import React from 'react'
import "../../Website_Components/ProductPageComponents/Mainaplusstyle.css";

const ImageWithText = () => {
  return (
    <>
    <section className="magic-section">
  <div className="content-wrapper">
    <div className="text-content">
      <h1>Make magic happen with H&M.</h1>
      <p>
      H&M hoodies have advanced features that make it easy to stay comfortable, 
      look stylish, and keep you cozy in any season.
      </p>
    </div>
    <div className="grid-content">
      <div className="text-box">
        <h2>
        Effortless Style and  
          <br />
          Extraordinary Comfort for Every Moment.
          <br/>
        </h2>
        <p>
        Capture the extraordinary with every step you take. 
        Whether you're out exploring or just enjoying the moment, this hoodie represents effortless style and comfort. Crafted with a focus on quality, it brings a touch of creativity to your everyday look. Just like the perfect shot, it fits seamlessly into your life, 
        offering a cozy and versatile piece that’s as effortless as your favorite photo edit.
        </p>
      </div>
      <div className="image-box">
        <img src="https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fb5%2F89%2Fb58958f73ff14cc92ce3a6c5730a409eb656accb.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]" alt="Pixel Camera" />
        <button className="refresh-btn">↻</button>
      </div>
    </div>
    <div className="text-content-down">
      <h1>Make magic happen with H&M.</h1>
      <p>
      H&M hoodies have advanced features that make it easy to stay comfortable, 
      look stylish, and keep you cozy in any season.
      </p>
    </div>

  </div>
</section>
    </>
  )
}

export default ImageWithText