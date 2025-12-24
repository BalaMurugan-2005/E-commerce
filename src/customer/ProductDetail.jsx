import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  ArrowLeft,
  Star,
  ChevronRight
} from 'lucide-react'
import ProductGallery from '../components/product/ProductGallery'
import RatingStars from '../components/product/RatingStars'
import Loader from '../components/common/Loader'
import productsData from '../data/products.json'
import reviewsData from '../data/reviews.json'
import categoriesData from '../data/categories.json'
import brandsData from '../data/brands.json'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [reviews, setReviews] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      const foundProduct = productsData.find(p => p.id === parseInt(id))
      if (foundProduct) {
        setProduct(foundProduct)
        
        // Get related products (same category)
        const related = productsData
          .filter(p => p.categoryId === foundProduct.categoryId && p.id !== foundProduct.id)
          .slice(0, 4)
        setRelatedProducts(related)
        
        // Get reviews for this product
        const productReviews = reviewsData.filter(r => r.productId === foundProduct.id)
        setReviews(productReviews)
      }
      setLoading(false)
    }, 500)
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      const cartItem = {
        ...product,
        quantity,
        selectedSize,
        selectedColor
      }
      console.log('Added to cart:', cartItem)
      // Implement cart logic
    }
  }

  const handleBuyNow = () => {
    handleAddToCart()
    navigate('/cart')
  }

  if (loading) return <Loader />
  if (!product) return <div className="error">Product not found</div>

  const ratingStats = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div>
          <ProductGallery images={product.images} />
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-4">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <span>Category</span>
              <ChevronRight size={16} />
              <span>{categoriesData.find(c => c.id === product.categoryId)?.name}</span>
              <ChevronRight size={16} />
              <span>{brandsData.find(b => b.id === product.brandId)?.name}</span>
            </div>
            
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <RatingStars rating={product.rating} />
              <span className="ml-2 text-gray-600">
                ({product.reviewCount} reviews)
              </span>
              <span className="mx-4 text-gray-300">|</span>
              <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                {product.discountPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ${product.discountPrice.toFixed(2)}
                    </span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-semibold">
                      Save {Math.round(((product.discountPrice - product.price) / product.discountPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="mb-8">
            <p className="text-gray-700">{product.description}</p>
          </div>

          {/* Variants */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md ${
                      selectedSize === size
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium mb-3">Color</h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-10 h-10 rounded-full border-2 ${
                      selectedColor === color.name ? 'border-blue-600' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color.code }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Quantity</h3>
            <div className="flex items-center">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 border border-gray-300 rounded-l-md"
                disabled={quantity <= 1}
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                max={product.stock}
                className="w-20 py-2 border-t border-b border-gray-300 text-center"
              />
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-4 py-2 border border-gray-300 rounded-r-md"
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <ShoppingCart size={20} className="mr-2" />
              Add to Cart
            </button>
            
            <button
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className="flex-1 bg-orange-600 text-white py-3 px-6 rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Buy Now
            </button>
            
            <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-50">
              <Heart size={20} />
            </button>
            
            <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-50">
              <Share2 size={20} />
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="flex items-center">
              <Truck size={24} className="text-gray-400 mr-3" />
              <div>
                <p className="font-medium">Free Shipping</p>
                <p className="text-sm text-gray-600">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center">
              <Shield size={24} className="text-gray-400 mr-3" />
              <div>
                <p className="font-medium">30-Day Return</p>
                <p className="text-sm text-gray-600">Easy return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Rating Summary */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold mb-2">{product.rating.toFixed(1)}</div>
              <RatingStars rating={product.rating} size={24} />
              <p className="text-gray-600 mt-2">{product.reviewCount} reviews</p>
            </div>
            
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map(star => (
                <div key={star} className="flex items-center">
                  <span className="w-10 text-sm">{star} star</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full mx-3 overflow-hidden">
                    <div 
                      className="h-full bg-yellow-400" 
                      style={{ 
                        width: `${(ratingStats[star] / reviews.length) * 100}%` 
                      }}
                    />
                  </div>
                  <span className="w-10 text-sm text-right">{ratingStats[star]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {reviews.slice(0, 5).map(review => (
                <div key={review.id} className="border-b pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 overflow-hidden">
                        <img 
                          src={review.userAvatar} 
                          alt={review.userName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{review.userName}</p>
                        <RatingStars rating={review.rating} size={16} />
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 mt-2">{review.comment}</p>
                </div>
              ))}
            </div>
            
            <button className="mt-6 text-blue-600 hover:text-blue-700">
              View all {reviews.length} reviews
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="font-medium mb-2">{product.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="font-bold">${product.price.toFixed(2)}</span>
                  <button className="text-blue-600 hover:text-blue-700">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail