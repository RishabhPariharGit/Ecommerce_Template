import React, { useEffect, useRef, useState } from 'react';
import './Policies.css'
import SectionHeading from '../../Website_Components/SecondaryComponents/Reusable/Section-Heading';
import Footer from '../../Website_Components/PrimaryComponents/Footer/Footer';
import { getPolicyBySlug } from '../../../Services/WebsiteServices/AllServices/PolicyService';
const Policies = ({Slug}) => {

  const [Policy, SetPolicy] = useState(null);
  const isFetchedRef = useRef(false);

  useEffect(() => {
    const FetchPolicy = async () => {
      try {
        const response = await getPolicyBySlug(Slug);
        if (response.data) {
          SetPolicy(response.data);
        } else {
          SetPolicy(null);
        }
      } catch (error) {
        console.error('Error fetching policy:', error);
      }
    };
  
    FetchPolicy();
  }, [Slug]);
  
  return (
    <>
    <SectionHeading heading={Policy?.title} />
    <div className="policy-container">
      <p><b>Effective Date:</b> {Policy?.effectiveDate?.substring(0, 10)}</p>

      {Policy?.sections?.map((section, index) => (
        <div key={index} className="policy-section">
          <h2>{section.heading}</h2>

          {section.description && (
            <p>{section.description}</p>
          )}

          {section.points && section.points.length > 0 && (
            <ul>
              {section.points.map((point, pointIndex) => (
                <li key={pointIndex}>{point}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
    <Footer />
  </>
  )
}

export default Policies
