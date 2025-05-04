import React from 'react'
import './HeadSubhead.css'

const Headsubhead = ({head, subhead}) => {
  return (
    <>
    <div className='head-subhead'>
    <h2>{head}</h2>
    <p>{subhead}</p>
    </div>
    </>
  )
}

export default Headsubhead