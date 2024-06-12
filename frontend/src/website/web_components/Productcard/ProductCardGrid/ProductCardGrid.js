import React from 'react'
import './ProductCardGrid.css'
import Productcard from '../Productcard'
import Headsubhead from '../../HeadSubhead/Headsubhead'


const ProductCardGrid = () => {
  return (
    <><div className='Heading-subhead'>
          <Headsubhead
          head={"Top Sellers"}
          />
    </div>
    <div className='Main-Card-Grid-Wrapper'>
<Productcard/>
<Productcard/>
<Productcard/>
    </div>
    </>
  )
}

export default ProductCardGrid