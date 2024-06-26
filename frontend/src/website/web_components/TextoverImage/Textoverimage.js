import React from 'react'
import './TextoverImage.css'

const Textoverimage = () => {
  return (
    <>
    <div className='main-wrapper'>
        <div className='Secondary-wrapper'>
        <div className='Text-wrapper'>
        <div className='Main-Text'>
            <p>Buy Some of the best <span style={{color:'#4F46E5', fontWeight:'900',fontSize:'45px'}}>Buildings</span></p>
        </div>
        <div className='Secondry-Text'>
            <p>This is the secondary text</p>
        </div>
        <div className='main-button'>
            <button>Buy Now</button>
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