import React from 'react'
import './Loader.css'


const DotSpinner = () => {
  return (
    <div className="dot-spinner">
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
    </div>
  )
}
const Loader = ({sm}) => {
  
  if(sm){
    return (
      <div className="grid place-items-center">
        <DotSpinner />
      </div>
    )
  }
  
  return (
    <div className="fixed left-0 top-0 w-full h-full bg-slate-950 grid place-items-center">
      <DotSpinner />
    </div>
  )
}

export default Loader