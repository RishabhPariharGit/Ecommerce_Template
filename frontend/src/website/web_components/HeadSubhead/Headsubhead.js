import React from 'react'
import './HeadSubhead.css'

const Headsubhead = ({head, subhead}) => {
  return (
    <>
    <div className='head-subhead'>
    <h1>{head}</h1>
    <p>{subhead}</p>
    </div>
    </>
  )
}

export default Headsubhead