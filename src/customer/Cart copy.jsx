import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus } from 'lucide-react'
import CartItem from '../webpage/components/cart/CartItem'
import CartSummary from '../webpage/components/cart/CartSummary'
import Loader from '../webpage/components/common/Loader'
import cartData from '../webpage/data/cart.json'

const Cart = () => {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [couponCode, setCouponCode] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setCartItems(cartData.items)
      setLoading(false)
    }, 500)
  }, [])

  const updateQuantity = (itemId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId))
  }

  const applyCoupon = () => {
    if (couponCode === 'SAVE10') {
      setCouponApplied(true)
      alert('Coupon applied! You saved 10%')
    } else {
      alert('Invalid coupon code')
    }
  }

  const handleProceedToCheckout = () => {
    if (cartItems.length > 0) {
      navigate('/checkout')
    } else {
      alert('Your cart is empty')
    }
  }

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 50 || cartItems.length === 0 ? 0 : 5.99
  const tax = subtotal * 0.08 // 8% tax
  const discount = couponApplied ? subtotal * 0.1 : 0 // 10% discount
  const total = subtotal + shipping + tax - discount

  if (loading) return <Loader />

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingBag size={64} className="text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some items to your cart to get started</p>
          <Link
            to="/products"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Start Shopping
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="hidden md:grid grid-cols-12 gap-4 mb-4 pb-4 border-b">
                <div className="col-span-6 font-medium">Product</div>
                <div className="col-span-2 font-medium text-center">Price</div>
                <div className="col-span-2 font-medium text-center">Quantity</div>
                <div className="col-span-2 font-medium text-center">Total</div>
              </div>

              <div className="space-y-4">
                {cartItems.map(item => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </div>

              <div className="mt-8 pt-6 border-t">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <Link
                    to="/products"
                    className="text-blue-600 hover:text-blue-700 mb-4 md:mb-0"
                  >
                    Continue Shopping
                  </Link>
                  
                  <button
                    onClick={() => setCartItems([])}
                    className="text-red-600 hover:text-red-700 flex items-center"
                  >
                    <Trash2 size={18} className="mr-2" />
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Coupon Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Have a Coupon?</h3>
              <div className="flex">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={couponApplied}
                />
                <button
                  onClick={applyCoupon}
                  disabled={couponApplied}
                  className="bg-gray-800 text-white px-6 py-2 rounded-r-md hover:bg-gray-900 disabled:opacity-50"
                >
                  {couponApplied ? 'Applied' : 'Apply'}
                </button>
              </div>
              {couponApplied && (
                <p className="text-green-600 mt-2">
                  Coupon applied! You saved ${discount.toFixed(2)}
                </p>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <CartSummary
              items={cartItems}
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              onProceedToCheckout={handleProceedToCheckout}
            />

            {/* Estimated Delivery */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-6">
              <h3 className="font-semibold mb-4">Estimated Delivery</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Standard Shipping</span>
                  <span className="font-medium">3-5 business days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Express Shipping</span>
                  <span className="font-medium">1-2 business days</span>
                </div>
              </div>
            </div>

            {/* Secure Checkout */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <ShoppingBag size={24} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Secure Checkout</h4>
                  <p className="text-sm text-gray-600">
                    Your payment information is encrypted and secure
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart