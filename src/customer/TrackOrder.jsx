import React, { useState, useEffect } from 'react'
import { Search, Package, Truck, CheckCircle, MapPin, Calendar, AlertCircle } from 'lucide-react'
import Loader from '../webpage/components/common/Loader'
import ordersData from '../webpage/data/orders.json'

const TrackOrder = () => {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleTrack = (e) => {
    e.preventDefault()
    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number')
      return
    }

    setLoading(true)
    setError('')
    
    // Simulate API call
    setTimeout(() => {
      const foundOrder = ordersData.find(
        o => o.trackingNumber === trackingNumber.trim() || o.orderNumber === trackingNumber.trim()
      )
      
      if (foundOrder) {
        setOrder(foundOrder)
      } else {
        setError('No order found with that tracking number')
        setOrder(null)
      }
      setLoading(false)
    }, 1000)
  }

  const getStatusSteps = () => {
    if (!order) return []

    const steps = [
      { 
        id: 'ordered', 
        label: 'Order Placed', 
        description: 'Your order has been received',
        date: order.orderDate
      },
      { 
        id: 'processing', 
        label: 'Processing', 
        description: 'We are preparing your order',
        date: order.processingDate || new Date(order.orderDate).toISOString()
      },
      { 
        id: 'shipped', 
        label: 'Shipped', 
        description: 'Your order is on the way',
        date: order.shippedDate || ''
      },
      { 
        id: 'delivered', 
        label: 'Delivered', 
        description: 'Your order has been delivered',
        date: order.deliveredDate || ''
      }
    ]

    const currentStepIndex = steps.findIndex(step => step.id === order.status)
    
    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentStepIndex,
      current: index === currentStepIndex
    }))
  }

  const getStatusIcon = (step) => {
    if (step.completed) return CheckCircle
    if (step.current) return Truck
    return Package
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Track Your Order</h1>
      <p className="text-gray-600 mb-8">Enter your tracking number or order number to check the status</p>

      {/* Tracking Form */}
      <div className="max-w-2xl mx-auto mb-12">
        <form onSubmit={handleTrack} className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tracking Number / Order Number
            </label>
            <div className="flex">
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Enter tracking number or order #"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-3 rounded-r-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Tracking...
                  </>
                ) : (
                  <>
                    <Search size={20} className="mr-2" />
                    Track
                  </>
                )}
              </button>
            </div>
            {error && (
              <p className="text-red-600 text-sm mt-2 flex items-center">
                <AlertCircle size={16} className="mr-1" />
                {error}
              </p>
            )}
          </div>

          <div className="text-sm text-gray-600">
            <p>You can find your tracking number:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>In your order confirmation email</li>
              <li>In your order details page</li>
              <li>By contacting customer support</li>
            </ul>
          </div>
        </form>
      </div>

      {/* Tracking Results */}
      {loading && <Loader />}

      {order && !loading && (
        <div className="max-w-4xl mx-auto">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold mb-2">Order #{order.orderNumber}</h2>
                <div className="flex items-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === 'delivered' 
                      ? 'bg-green-100 text-green-800'
                      : order.status === 'shipped'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  <span className="ml-4 text-gray-600">
                    {order.items.length} items • ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <p className="text-sm text-gray-600">
                  Estimated Delivery: {order.estimatedDelivery && formatDate(order.estimatedDelivery)}
                </p>
              </div>
            </div>

            {/* Tracking Progress */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-6">Tracking History</h3>
              
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200">
                  <div 
                    className="absolute left-0 top-0 w-0.5 bg-green-500 transition-all duration-300"
                    style={{ 
                      height: `${(getStatusSteps().filter(s => s.completed).length / getStatusSteps().length) * 100}%` 
                    }}
                  />
                </div>

                {/* Timeline Steps */}
                <div className="space-y-8">
                  {getStatusSteps().map((step) => {
                    const Icon = getStatusIcon(step)
                    return (
                      <div key={step.id} className="relative flex items-start">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                          step.completed 
                            ? 'bg-green-500 text-white'
                            : step.current
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          <Icon size={16} />
                        </div>
                        <div className="ml-6 flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className={`font-medium ${
                              step.current ? 'text-blue-600' : 'text-gray-900'
                            }`}>
                              {step.label}
                            </h4>
                            {step.date && (
                              <span className="text-sm text-gray-500 flex items-center">
                                <Calendar size={14} className="mr-1" />
                                {formatDate(step.date)}
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 mt-1">{step.description}</p>
                          
                          {/* Additional Details */}
                          {step.current && step.id === 'shipped' && order.trackingNumber && (
                            <div className="mt-4 p-4 bg-blue-50 rounded-md">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm font-medium">Tracking Number:</p>
                                  <p className="font-mono">{order.trackingNumber}</p>
                                  <p className="text-sm text-gray-600 mt-1">
                                    Carrier: {order.shippingCarrier}
                                  </p>
                                </div>
                                <a
                                  href={order.trackingUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-700"
                                >
                                  View Full Tracking →
                                </a>
                              </div>
                            </div>
                          )}

                          {step.current && step.id === 'delivered' && (
                            <div className="mt-4 p-4 bg-green-50 rounded-md">
                              <div className="flex items-center">
                                <CheckCircle size={20} className="text-green-600 mr-3" />
                                <div>
                                  <p className="font-medium">Delivered Successfully!</p>
                                  <p className="text-sm text-gray-600">
                                    Your order was delivered to the shipping address.
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <MapPin size={20} className="mr-2" />
                Shipping Address
              </h3>
              <div className="space-y-2">
                <p className="font-medium">{order.shippingAddress.name}</p>
                <p className="text-gray-700">
                  {order.shippingAddress.street}<br />
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                  {order.shippingAddress.country}
                </p>
                <p className="text-gray-600">Phone: {order.shippingAddress.phone}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Delivery Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Shipping Method</p>
                  <p className="font-medium">{order.shippingMethod}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Estimated Delivery</p>
                  <p className="font-medium">
                    {order.estimatedDelivery ? formatDate(order.estimatedDelivery) : 'Calculating...'}
                  </p>
                </div>
                {order.shippingCarrier && (
                  <div>
                    <p className="text-sm text-gray-600">Carrier</p>
                    <p className="font-medium">{order.shippingCarrier}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">Order Items</h3>
            <div className="space-y-4">
              {order.items.map(item => (
                <div key={item.id} className="flex items-center border-b pb-4 last:border-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded mr-4"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FAQ */}
      {!order && !loading && (
        <div className="max-w-3xl mx-auto mt-12">
          <h3 className="text-xl font-semibold mb-6">Frequently Asked Questions</h3>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">How long does shipping take?</h4>
                <p className="text-gray-600 text-sm">
                  Standard shipping typically takes 3-5 business days. Express shipping takes 1-2 business days.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Can I change my shipping address?</h4>
                <p className="text-gray-600 text-sm">
                  You can change your shipping address before your order ships. Contact customer support for assistance.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">What if my package is delayed?</h4>
                <p className="text-gray-600 text-sm">
                  Delays can occur due to weather, holidays, or carrier issues. Check tracking for updates or contact support.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TrackOrder