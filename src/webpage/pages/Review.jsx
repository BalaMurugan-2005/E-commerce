import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Star, Camera, X, Check, ArrowLeft } from 'lucide-react'
import RatingStars from '../components/product/RatingStars'
import Loader from '../components/common/Loader'
import productsData from '../data/products.json'

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
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <button
        onClick={() => navigate(`/product/${productId}`)}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Product
      </button>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-2">Write a Review</h1>
        <p className="text-gray-600 mb-8">Share your experience with this product</p>

        {/* Product Info */}
        <div className="flex items-center mb-8 p-4 bg-gray-50 rounded-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-20 h-20 object-cover rounded mr-4"
          />
          <div>
            <h2 className="font-semibold">{product.name}</h2>
            <p className="text-gray-600 text-sm">{product.category}</p>
            <div className="flex items-center mt-1">
              <RatingStars rating={product.rating} size={16} />
              <span className="text-sm text-gray-600 ml-2">
                ({product.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Rating */}
          <div className="mb-8">
            <label className="block text-lg font-medium mb-4">
              How would you rate this product?
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  <Star
                    size={40}
                    className={`${
                      star <= rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    } hover:scale-110 transition-transform`}
                  />
                </button>
              ))}
              <span className="ml-4 text-2xl font-bold">{rating}.0</span>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              {rating === 5 && 'Excellent! Perfect product'}
              {rating === 4 && 'Good. Very satisfied'}
              {rating === 3 && 'Average. Met expectations'}
              {rating === 2 && 'Poor. Some issues'}
              {rating === 1 && 'Terrible. Would not recommend'}
            </div>
          </div>

          {/* Review Title */}
          <div className="mb-6">
            <label className="block font-medium mb-2">
              Review Title
              <span className="text-gray-500 text-sm ml-1">(optional)</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summarize your experience in a few words"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength="100"
            />
            <div className="text-right text-sm text-gray-500 mt-1">
              {title.length}/100 characters
            </div>
          </div>

          {/* Review Text */}
          <div className="mb-6">
            <label className="block font-medium mb-2">
              Your Review *
            </label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="What did you like or dislike? What did you use this product for?"
              rows="6"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="text-right text-sm text-gray-500 mt-1">
              {review.length}/2000 characters
            </div>
          </div>

          {/* Photo Upload */}
          <div className="mb-8">
            <label className="block font-medium mb-4">
              Add Photos
              <span className="text-gray-500 text-sm ml-1">(optional)</span>
            </label>
            
            {/* Upload Button */}
            <label className="inline-block cursor-pointer">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploading}
              />
              <div className="flex items-center justify-center w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50">
                {uploading ? (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <span className="text-sm text-gray-600 mt-2">Uploading...</span>
                  </div>
                ) : (
                  <div className="text-center">
                    <Camera size={32} className="text-gray-400 mx-auto mb-2" />
                    <span className="text-sm text-gray-600">Add Photos</span>
                  </div>
                )}
              </div>
            </label>

            {/* Image Previews */}
            {images.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">
                  {images.length} photo{images.length !== 1 ? 's' : ''} added
                </p>
                <div className="flex flex-wrap gap-4">
                  {images.map(image => (
                    <div key={image.id} className="relative">
                      <img
                        src={image.url}
                        alt="Review"
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Tips */}
          <div className="mb-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium mb-2">Writing a Great Review</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-center">
                <Check size={16} className="text-green-600 mr-2" />
                Be specific about what you liked or disliked
              </li>
              <li className="flex items-center">
                <Check size={16} className="text-green-600 mr-2" />
                Mention the quality, features, and performance
              </li>
              <li className="flex items-center">
                <Check size={16} className="text-green-600 mr-2" />
                Include details about how you use the product
              </li>
              <li className="flex items-center">
                <Check size={16} className="text-green-600 mr-2" />
                Photos help other shoppers make decisions
              </li>
            </ul>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Check size={20} className="mr-2" />
              Submit Review
            </button>
          </div>
        </form>
      </div>

      {/* Community Guidelines */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold mb-3">Community Guidelines</h3>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>• Be honest and objective in your review</li>
          <li>• Focus on the product and your experience with it</li>
          <li>• Don't include personal information</li>
          <li>• Don't use inappropriate language</li>
          <li>• Reviews may be edited or removed if they violate our policies</li>
        </ul>
      </div>
    </div>
  )
}

export default Review