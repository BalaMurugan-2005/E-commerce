import React from 'react'
import './Loader.css'

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-content">
        <div className="spinner-container">
          <div className="spinner-circle-outer"></div>
          <div className="spinner-circle-inner-blue"></div>
          <div className="spinner-circle-inner-purple"></div>
        </div>
        
        <div className="loader-text">
          <h2 className="loader-title">
            Loading Amazing Experience
          </h2>
          <p className="loader-subtitle">Preparing your shopping journey...</p>
        </div>
        
        <div className="bouncing-dots">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bouncing-dot"
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Loader