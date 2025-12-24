import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Star, Camera, X, Check, ArrowLeft } from 'lucide-react'
import RatingStars from '../components/product/RatingStars'
import Loader from '../components/common/Loader'
import productsData from '../data/products.json'
import '../styles/Review.css'

const Review = () => {
  const { productId } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [rating, setRating] = useState(5)
  const [title, setTitle] = useState('')
  const [review, setReview] = useState('')
  const [images, setImages] = useState([])
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      const foundProduct = productsData.find(p => p.id === parseInt(productId))
      setProduct(foundProduct)
      setLoading(false)
    }, 500)
  }, [productId])

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    setUploading(true)
    
    // Simulate upload
    setTimeout(() => {
      const newImages = files.map(file => ({
        id: Date.now() + Math.random(),
        url: URL.createObjectURL(file),
        name: file.name
      }))
      setImages(prev => [...prev, ...newImages])
      setUploading(false)
    }, 1000)
  }

  const removeImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const reviewData = {
      productId: product.id,
      productName: product.name,
      rating,
      title,
      review,
      images: images.map(img => img.url),
      date: new Date().toISOString(),
      helpful: 0
    }
    
    console.log('Review submitted:', reviewData)
    // Here you would typically send to backend
    
    alert('Thank you for your review!')
    navigate(`/product/${productId}`)
  }

  if (loading) return <Loader />
  if (!product) return <div className="error">Product not found</div>

  return (
    <div className="review-page">
      <button
        onClick={() => navigate(`/product/${productId}`)}
        className="back-button"
      >
        <ArrowLeft size={20} className="back-icon" />
        Back to Product
      </button>

      <div className="review-container">
        <div className="review-header">
          <h1 className="review-title">Write a Review</h1>
          <p className="review-subtitle">Share your experience with this product</p>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
          <div className="product-details">
            <h2 className="product-name">{product.name}</h2>
            <p className="product-category">{product.category}</p>
            <div className="product-rating">
              <RatingStars rating={product.rating} size={16} />
              <span className="review-count">
                ({product.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Rating */}
          <div className="rating-section">
            <label className="rating-label">
              How would you rate this product?
            </label>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="star-button"
                >
                  <Star
                    size={40}
                    className={star <= rating ? 'selected-star' : 'unselected-star'}
                  />
                </button>
              ))}
              <span className="rating-value">{rating}.0</span>
            </div>
            <div className="rating-description">
              {rating === 5 && 'Excellent! Perfect product'}
              {rating === 4 && 'Good. Very satisfied'}
              {rating === 3 && 'Average. Met expectations'}
              {rating === 2 && 'Poor. Some issues'}
              {rating === 1 && 'Terrible. Would not recommend'}
            </div>
          </div>

          {/* Review Title */}
          <div className="form-section">
            <label className="form-label">
              Review Title
              <span className="optional-label">(optional)</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summarize your experience in a few words"
              className="text-input"
              maxLength="100"
            />
            <div className="character-count">
              {title.length}/100 characters
            </div>
          </div>

          {/* Review Text */}
          <div className="form-section">
            <label className="form-label">
              Your Review <span className="required-label">*</span>
            </label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="What did you like or dislike? What did you use this product for?"
              rows="6"
              required
              className="textarea"
            />
            <div className="character-count">
              {review.length}/2000 characters
            </div>
          </div>

          {/* Photo Upload */}
          <div className="photo-section">
            <label className="photo-label">
              Add Photos
              <span className="optional-label">(optional)</span>
            </label>
            
            {/* Upload Button */}
            <label className="upload-container">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="upload-input"
                disabled={uploading}
              />
              <div className="upload-area" aria-disabled={uploading}>
                {uploading ? (
                  <div>
                    <div className="uploading-spinner"></div>
                    <span className="uploading-text">Uploading...</span>
                  </div>
                ) : (
                  <>
                    <Camera size={32} className="upload-icon" />
                    <span className="upload-text">Add Photos</span>
                  </>
                )}
              </div>
            </label>

            {/* Image Previews */}
            {images.length > 0 && (
              <div className="image-previews">
                <p className="images-count">
                  {images.length} photo{images.length !== 1 ? 's' : ''} added
                </p>
                <div className="images-grid">
                  {images.map(image => (
                    <div key={image.id} className="image-preview">
                      <img
                        src={image.url}
                        alt="Review"
                        className="preview-image"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        className="remove-button"
                      >
                        <X size={14} className="remove-icon" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Tips */}
          <div className="tips-section">
            <h3 className="tips-title">Writing a Great Review</h3>
            <ul className="tips-list">
              <li className="tip-item">
                <Check size={16} className="tip-icon" />
                Be specific about what you liked or disliked
              </li>
              <li className="tip-item">
                <Check size={16} className="tip-icon" />
                Mention the quality, features, and performance
              </li>
              <li className="tip-item">
                <Check size={16} className="tip-icon" />
                Include details about how you use the product
              </li>
              <li className="tip-item">
                <Check size={16} className="tip-icon" />
                Photos help other shoppers make decisions
              </li>
            </ul>
          </div>

          {/* Submit Button */}
          <div className="submit-section">
            <button
              type="submit"
              className="submit-button"
            >
              <Check size={20} className="submit-icon" />
              Submit Review
            </button>
          </div>
        </form>
      </div>

      {/* Community Guidelines */}
      <div className="guidelines-section">
        <h3 className="guidelines-title">Community Guidelines</h3>
        <ul className="guidelines-list">
          <li className="guideline-item">• Be honest and objective in your review</li>
          <li className="guideline-item">• Focus on the product and your experience with it</li>
          <li className="guideline-item">• Don't include personal information</li>
          <li className="guideline-item">• Don't use inappropriate language</li>
          <li className="guideline-item">• Reviews may be edited or removed if they violate our policies</li>
        </ul>
      </div>
    </div>
  )
}

export default Review