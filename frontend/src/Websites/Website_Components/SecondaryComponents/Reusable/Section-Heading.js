import React from 'react'
import './Reusable.css'

const SectionHeading =  ({ heading, subheading }) => {
  return (
    <div>
        <div className='section-heading-main-wrapper'>
        <div className='section-main-heading'>
            <h2>{heading}</h2>
</div>
        <div className='section-main-sub-heading'>
            <p>
{subheading}
            </p>
        </div>
        </div>
        </div>
  )
}

export default SectionHeading