import React, { useState } from 'react'
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react'
import './ProductCard.css'

const ProductCard = ({ product, onAddToCart, onAddToWishlist, darkMode = false, isNew = false }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const handleWishlistClick = () => {
    setIsLiked(!isLiked)
    onAddToWishlist(product)
  }

  const themeClass = darkMode ? 'dark' : 'light'

  return (
    <div 
      className={`product-card hover-lift ${themeClass}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="product-badge">
        {isNew && (
          <span className="badge-new">
            NEW
          </span>
        )}
        {product.discount && (
          <span className="badge-discount">
            -{product.discount}%
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistClick}
        className={`wishlist-btn ${themeClass} ${isLiked ? 'liked' : ''}`}
      >
        <Heart 
          size={20} 
          className={`heart-icon ${isLiked ? 'liked' : themeClass}`}
        />
      </button>

      {/* Product Image */}
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
        
        {/* Quick Actions Overlay */}
        <div className="quick-actions-overlay">
          <button
            onClick={() => onAddToCart(product)}
            className="quick-action-btn"
          >
            <ShoppingCart size={20} />
          </button>
          <button className="quick-action-btn">
            <Eye size={20} />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className={`product-info ${themeClass}`}>
        <div className="product-header">
          <h3 className={`product-title ${themeClass}`}>
            {product.name}
          </h3>
          <div className="rating-container">
            <Star size={14} className="rating-icon" />
            <span className={`rating-text ${themeClass}`}>
              {product.rating || '4.5'}
            </span>
          </div>
        </div>

        <p className={`product-description ${themeClass}`}>
          {product.description}
        </p>

        <div className="product-footer">
          <div className="price-container">
            <span className={`current-price ${themeClass}`}>
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className={`original-price ${themeClass}`}>
                ${product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className={`add-to-cart-btn ${themeClass}`}
          >
            <span className="flex items-center gap-2">
              <ShoppingCart size={16} />
              Add to Cart
            </span>
            <div className="add-to-cart-btn-hover"></div>
          </button>
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className="hover-border"></div>
    </div>
  )
}

export default ProductCard