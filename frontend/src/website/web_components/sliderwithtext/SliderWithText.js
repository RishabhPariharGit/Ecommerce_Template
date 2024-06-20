import React from 'react'
import './SliderWithText.css'

const SliderWithText = () => {
  return (
   <>
  <div classname="main-wrapper">
  <div classname="right-wrapper">
    <div classname="image-sliderfade fade">
      <img src="logo192.png" style={{ width: "50px" }} />
      <div classname="text">Image caption 1</div>
    </div>
    <div classname="image-sliderfade fade">
      <img src="logo192.png" style={{ width: "50px" }} />
      <div classname="text">Image caption 2</div>
    </div>
    <div classname="image-sliderfade fade">
      <img src="logo192.png" style={{ width: "50px" }} />
      <div classname="text">Image caption 3</div>
    </div>
    <div classname="image-sliderfade fade">
      <img src="logo192.png" style={{ width: "50px" }} />
      <div classname="text">Image caption 4</div>
    </div>
    <br />
    <div style={{ textAlign: "center" }}>
      <span className="dot" />
      <span className="dot" />
      <span className="dot" />
    </div>
  </div>
  <div classname="left-wrapper">
    <h1>This is left side with text</h1>
  </div>
</div>
   </>
  )
}

export default SliderWithText