import React, { useState } from 'react'
import './ProductGallery.css'

const ProductGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0])

  return (
    <div className="product-gallery gallery-mobile-spacing gallery-desktop-spacing">
      {/* Thumbnails */}
      <div className="thumbnails-container thumbnails-horizontal-spacing thumbnails-vertical-spacing">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`thumbnail-button ${
              selectedImage === image ? 'selected' : 'unselected'
            }`}
            aria-label={`View image ${index + 1}`}
            aria-current={selectedImage === image ? 'true' : 'false'}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="thumbnail-image"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="main-image-container">
        <img
          src={selectedImage}
          alt="Product"
          className="main-image"
        />
      </div>
    </div>
  )
}

export default ProductGallery