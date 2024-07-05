import React from 'react'
import './TextoverImage.css'
import { Link } from 'react-router-dom'

const Textoverimage = () => {
  return (
    <>
    <div className='main-wrapper'>
        <div className='Secondary-wrapper'>
        <div className='Text-wrapper'>
        <div className='Main-Text'>
            <p><span style={{color:'#4F46E5', fontWeight:'900',fontSize:'45px'}}>Magical Rentals</span> transforms the rental experience.</p><br></br>
        </div>
        <div className='Secondry-Text'>
            <p> We create a seamless and enjoyable process for both homeowners and residents, making renting feel magical.</p>
        </div>
        <div className='Home-banner-button-wrapper'>
        <div className='main-button'>
           <Link to={"/roomowner"}> <button>For Homeowner</button></Link>
        </div>
        <div className='Renter-button'>
           <Link to={"/roomowner"}> <button>For Renter</button></Link>
        </div>
        </div>
        </div>
<div className='Main-Image-wrapper'>
    <img src='https://img.freepik.com/free-vector/smart-city-townhouse-isometric_1284-21806.jpg?t=st=1719396960~exp=1719400560~hmac=98a47592d3ab69a187ede1b875813ec24c795b86b1005b053ccf15afbe6c6cc2&w=740'
    style={{width: '700px'}}/>
</div>

        </div>

    </div>
    </>
  )
}

export default Textoverimage