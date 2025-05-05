import React from 'react'
import './Policies.css'
import SectionHeading from '../../Website_Components/SecondaryComponents/Reusable/Section-Heading';
import Footer from '../../Website_Components/PrimaryComponents/Footer/Footer';

const ShippingPolicy = () => {
  return (
    <>
    <SectionHeading heading="Shipping Policy"/>
    <div className="policy-container">
      <p>Effective Date: May 5, 2025</p>

      <h2>1. Order Processing</h2>
      <p>Orders are typically processed within 1-3 business days. You will receive an order confirmation and tracking details once shipped.</p>

      <h2>2. Shipping Options</h2>
      <ul>
        <li><strong>Standard Shipping:</strong> 5–7 business days.</li>
        <li><strong>Express Shipping:</strong> 2–3 business days.</li>
        <li><strong>Overnight Shipping:</strong> Available on request and location.</li>
      </ul>

      <h2>3. Shipping Rates</h2>
      <p>Shipping charges are calculated at checkout based on weight, dimensions, and destination.</p>

      <h2>4. International Shipping</h2>
      <p>We ship internationally to select countries. International orders may be subject to customs duties, taxes, or delays beyond our control.</p>

      <h2>5. Tracking Orders</h2>
      <p>Once your order is shipped, a tracking number will be emailed to you. You can use this to monitor your shipment status online.</p>

      <h2>6. Delivery Issues</h2>
      <p>If a package is marked as delivered but not received, please contact your local courier or our support team. We are not responsible for packages lost after confirmed delivery.</p>

      <h2>7. Delays</h2>
      <p>Occasional delays may occur due to weather, logistics, or high order volume. We appreciate your patience and understanding in such cases.</p>

      <h2>8. Contact Us</h2>
      <p>For shipping-related inquiries, please email shipping@example.com or call our support line at 123-456-7890.</p>
    </div>
    <Footer/>
  </>
  )
}

export default ShippingPolicy
