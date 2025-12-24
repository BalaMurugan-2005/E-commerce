import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, X, ArrowRight } from 'lucide-react'
import ProductCard from '../components/product/ProductCard'
import Loader from '../components/common/Loader'
import wishlistData from '../data/wishlist.json'
import productsData from '../data/products.json'

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      // Combine wishlist data with product data
      const items = wishlistData.items.map(item => {
        const product = productsData.find(p => p.id === item.productId)
        return { ...product, ...item }
      })
      setWishlistItems(items)
      setLoading(false)
    }, 500)
  }, [])

  const removeFromWishlist = (itemId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId))
  }

  const moveToCart = (item) => {
    console.log('Moving to cart:', item)
    removeFromWishlist(item.id)
    // Implement add to cart logic
  }

  const addAllToCart = () => {
    wishlistItems.forEach(item => moveToCart(item))
  }

  const addToCart = (product) => {
    console.log('Added to cart:', product)
    // Implement cart logic
  }

  if (loading) return <Loader />

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        {wishlistItems.length > 0 && (
          <button
            onClick={addAllToCart}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            <ShoppingCart size={18} className="mr-2" />
            Add All to Cart
          </button>
        )}
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-12">
          <Heart size={64} className="text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-8">
            Save items you love for later. They'll appear here.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Start Shopping
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-600">
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
            </p>
            <button
              onClick={() => setWishlistItems([])}
              className="text-red-600 hover:text-red-700 flex items-center"
            >
              <X size={18} className="mr-2" />
              Clear Wishlist
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItems.map(item => (
              <div key={item.id} className="relative">
                <ProductCard
                  product={item}
                  onAddToCart={() => addToCart(item)}
                  onAddToWishlist={() => {}} // Already in wishlist
                />
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                >
                  <X size={18} className="text-gray-600" />
                </button>
                <button
                  onClick={() => moveToCart(item)}
                  className="absolute top-14 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                >
                  <ShoppingCart size={18} className="text-gray-600" />
                </button>
              </div>
            ))}
          </div>

          {/* Recently Viewed */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Recently Viewed</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {productsData.slice(0, 4).map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  onAddToWishlist={() => setWishlistItems([...wishlistItems, product])}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Wishlist