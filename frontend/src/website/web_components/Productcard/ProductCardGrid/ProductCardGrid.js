import React from 'react';
import { Link } from "react-router-dom";
import './ProductCardGrid.css';
import Productcard from '../Productcard';
import Headsubhead from '../../HeadSubhead/Headsubhead';

const ProductCardGrid = () => {
  return (
    <>
      <div className='Heading-subhead-card'>
        <Headsubhead head={"TOP SELLERS"} />
      </div>
      <div className='Main-Card-Grid-Wrapper'>
        <Productcard />
      </div>
      <div className='shopallbtn-cstm'>
      <Link to="/buyer"><button>Shop all</button></Link>
      </div>
    
    </>
  );
}

export default ProductCardGrid;
