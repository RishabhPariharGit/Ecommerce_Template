import React from 'react'
import './Policies.css'
import SectionHeading from '../../Website_Components/SecondaryComponents/Reusable/Section-Heading';
import Footer from '../../Website_Components/PrimaryComponents/Footer/Footer';

const TermsAndConditions = () => {
  return (
    <>
    <SectionHeading heading="Terms and Conditions"/>
    <div className="policy-container">
    <p>Effective Date: May 5, 2025</p>

<h2>1. Acceptance of Terms</h2>
<p>By accessing or using our website, you agree to comply with these terms. If you disagree, please discontinue use of our services immediately.</p>

<h2>2. Eligibility</h2>
<p>Users must be at least 18 years old or accessing the site under the supervision of a parent or legal guardian.</p>

<h2>3. Product Information</h2>
<p>We make every effort to ensure product descriptions, pricing, and availability are accurate. However, errors may occur, and we reserve the right to correct them without prior notice.</p>

<h2>4. Orders & Payments</h2>
<ul>
  <li>We reserve the right to reject or cancel any order at our sole discretion.</li>
  <li>All prices are listed in [your currency] and include applicable taxes unless otherwise stated.</li>
  <li>Secure payment gateways are used for all transactions.</li>
</ul>

<h2>5. User Accounts</h2>
<p>You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.</p>

<h2>6. Intellectual Property</h2>
<p>All content including text, images, logos, and code is our intellectual property and may not be reused without permission.</p>

<h2>7. Prohibited Conduct</h2>
<ul>
  <li>Attempting to disrupt site operations.</li>
  <li>Uploading harmful software or spam.</li>
  <li>Infringing on intellectual property rights.</li>
</ul>

<h2>8. Termination</h2>
<p>We may suspend or terminate your access to the site without notice if you violate these terms.</p>

<h2>9. Governing Law</h2>
<p>These terms shall be governed by and construed in accordance with the laws of [your jurisdiction].</p>

<h2>10. Contact Information</h2>
<p>If you have questions about these Terms, please contact us at support@example.com.</p>
    </div>
    <Footer/>
  </>
  )
}

export default TermsAndConditions
