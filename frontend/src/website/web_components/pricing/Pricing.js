import React from 'react';
import SingleCard from './Single-card'; // Ensure correct import path
import './Single-Card.css';
import Headsubhead from '../../../Components/HeadSubhead/Headsubhead';

const Pricing = () => {
  const cardData = [
    {
      title: 'Basic',
      price: '19',
      features: [
        '5 Gb Diskspace',
        '25 Gb Bandwidth',
        '2 Email Addresses',
        'WordPress Installs',
        'Private Support'
      ]
    },

    {
      title: 'Standard',
      price: '29',
      features: [
        '10 Gb Diskspace',
        '50 Gb Bandwidth',
        '5 Email Addresses',
        'WordPress Installs',
        'Private Support'
      ]
    },

    {
      title: 'Premium',
      price: '49',
      features: [
        '20 Gb Diskspace',
        '100 Gb Bandwidth',
        '10 Email Addresses',
        'WordPress Installs',
        'Private Support'
      ]
    }
  ];

  return (<>
    <Headsubhead 
      head={"OUR PLANS"}
      subhead={"Select the most suitable plan for yourself"}
      />
    <div className='Card-wrapper'>
      {cardData.map((card, index) => (
        <SingleCard
          // key={index}
          // title={card.title}
          // price={card.price}
          // features={card.features}
        />
      ))}
    </div>
    </>
  );
};

export default Pricing;
