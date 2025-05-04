import React, { useState } from 'react';
import './Accordion.css';
import { FaStar } from 'react-icons/fa';

const Accordion = ({ sections }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const renderRightIcon = (section) => {
    return <span>▾</span>;
  };

  return (
    <div className="cstm-accrdn-clss-accordion">
      {sections.map((section, index) => (
        <div key={index} className="cstm-accrdn-clss-accordion-item">
          <div className="cstm-accrdn-clss-accordion-header" onClick={() => toggle(index)}>
            <span>{section.title}</span>
            <div className="cstm-accrdn-clss-accordion-icon">{renderRightIcon(section)}</div>
          </div>
          {openIndex === index && (
            <div className="cstm-accrdn-clss-accordion-content">{section.content}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
