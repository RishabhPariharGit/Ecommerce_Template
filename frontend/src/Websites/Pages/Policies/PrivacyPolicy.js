import React from 'react'
import './Policies.css'
import SectionHeading from '../../Website_Components/SecondaryComponents/Reusable/Section-Heading'
import Footer from '../../Website_Components/PrimaryComponents/Footer/Footer'

const PrivacyPolicy = () => {
  return (
    <>
      <SectionHeading heading="Privacy Policy"/>
      <div className="policy-container">
      <p>Effective Date: May 5, 2025</p>

<h2>1. Information We Collect</h2>
<p>We collect personal information that you provide directly, including name, email, phone number, shipping address, billing address, and payment information. We may also collect technical data such as IP address, browser type, device information, and cookies for analytics.</p>

<h2>2. How We Use Your Information</h2>
<ul>
  <li>To process orders and deliver products.</li>
  <li>To send order updates, promotional content, and newsletters (if opted in).</li>
  <li>To improve our website and customer service.</li>
  <li>To detect and prevent fraud, abuse, or illegal activity.</li>
</ul>

<h2>3. Cookies and Tracking Technologies</h2>
<p>We use cookies to enhance user experience, track site usage, and for marketing purposes. You can choose to disable cookies through your browser settings.</p>

<h2>4. Sharing of Information</h2>
<p>We may share your information with third-party services for order fulfillment, payment processing, analytics, or marketing, but only under strict confidentiality agreements. We do not sell or rent your personal information.</p>

<h2>5. Data Retention</h2>
<p>We retain your information for as long as necessary to provide our services and comply with legal obligations.</p>

<h2>6. Your Rights</h2>
<p>You have the right to access, update, or delete your personal information. To make a request, contact us at privacy@example.com.</p>

<h2>7. Children's Privacy</h2>
<p>Our services are not intended for children under the age of 13. We do not knowingly collect personal data from minors.</p>

<h2>8. Updates to This Policy</h2>
<p>We may update this policy periodically. Continued use of our services indicates your acceptance of any changes.</p>

<h2>9. Contact Us</h2>
<p>If you have any questions about this Privacy Policy, please email us at support@example.com.</p>
    </div>
      <Footer/>
    </>
  )
}

export default PrivacyPolicy
