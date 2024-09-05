import React from 'react'
import './MainProductpg.css'
import { Link } from 'react-router-dom'


const MainProductpg = () => {
  return (
    <>
    <div className='Product-pg-main-wrapper'>
        <div className='accordian-main-wrapper'>
          <Link to='/'>
          <p>Home</p>
          </Link>
          <span>/</span>
          <Link to = '/buyer'>
          <p>Naruto-Collection</p> 
          </Link>
          <span>/</span>
          <p>Product 1</p>
        </div>
    </div>
    </>
  )
}

export default MainProductpg