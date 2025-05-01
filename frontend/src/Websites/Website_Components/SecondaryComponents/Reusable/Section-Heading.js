import React from 'react'
import './Reusable.css'

const SectionHeading =  ({ heading, subheading }) => {
  return (
    <div>
        <div className='section-heading-main-wrapper'>
        <div className='section-main-heading'>
            <p>{heading}</p>
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