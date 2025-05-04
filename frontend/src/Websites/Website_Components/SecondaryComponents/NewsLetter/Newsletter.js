import React from 'react';
import './Newsletter.css';  // Import custom CSS

const Newsletter = () => {
  return (
    <div className="main-news-container">
    <div className="main-news-container-devider">

  <div className="text-section">
    <h2>Join Our Newsletter</h2>
    <p>
      Subscribe to our newsletter to receive the latest updates, news, and
      special offers directly in your inbox. Be the first to know about our new
      products and events!
    </p>
    <p>
      Stay informed and never miss out. We promise to only send you relevant and
      exciting content.
    </p>
  </div>
  <div className="newsletter-container">
    <form action="#" method="post" className="newsletter-form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required="" />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input type="tel" id="phone" name="phone" required="" />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required="" />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required=""
          defaultValue={""}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
  </div>
</div>

  
  );
};

export default Newsletter;
