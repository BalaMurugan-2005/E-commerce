import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  Package, 
  Truck, 
  CheckCircle, 
  XCircle,
  Printer,
  ArrowLeft,
  MapPin,
  Phone,
  Calendar,
  CreditCard
} from 'lucide-react'
import Loader from '../webpage/components/common/Loader'
import ordersData from '../webpage/data/orders.json'
import addressesData from '../webpage/data/addresses.json'

const OrderDetails = () => {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('items')

  useEffect(() => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      const foundOrder = ordersData.find(o => o.id === parseInt(id))
      setOrder(foundOrder)
      setLoading(false)
    }, 500)
  }, [id])

  const getStatusSteps = () => {
    const steps = [
      { id: 'ordered', label: 'Ordered', icon: Package },
      { id: 'processing', label: 'Processing', icon: Package },
      { id: 'shipped', label: 'Shipped', icon: Truck },
      { id: 'delivered', label: 'Delivered', icon: CheckCircle }
    ]

    const currentStepIndex = steps.findIndex(step => step.id === order?.status)
    
    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentStepIndex,
      current: index === currentStepIndex
    }))
  }

  const handlePrint = () => {
    window.print()
  }

  if (loading) return <Loader />
  if (!order) return <div className="error">Order not found</div>

  const shippingAddress = addressesData.find(addr => addr.id === order.shippingAddressId)
  const statusSteps = getStatusSteps()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          to="/orders"
          className="flex items-center text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Orders
        </Link>
      </div>

      {/* Order Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Order #{order.orderNumber}</h1>
            <p className="text-gray-600">
              Placed on {new Date(order.orderDate).toLocaleDateString()}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              onClick={handlePrint}
              className="flex items-center border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50"
            >
              <Printer size={18} className="mr-2" />
              Print Invoice
            </button>
          </div>
        </div>

        {/* Order Status Steps */}
        <div className="border-t pt-6">
          <div className="flex justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200">
              <div 
                className="h-full bg-green-500 transition-all duration-300"
                style={{ 
                  width: `${(statusSteps.findIndex(s => s.current) + 1) / statusSteps.length * 100}%` 
                }}
              />
            </div>

            {/* Steps */}
            {statusSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={step.id} className="relative z-10 text-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 ${
                    step.completed 
                      ? 'bg-green-500 text-white'
                      : step.current
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step.completed ? (
                      <CheckCircle size={20} />
                    ) : (
                      <Icon size={20} />
                    )}
                  </div>
                  <span className={`text-sm ${step.current ? 'font-medium' : 'text-gray-600'}`}>
                    {step.label}
                  </span>
                  <span className="text-xs text-gray-500 block mt-1">
                    {step.id === 'ordered' && new Date(order.orderDate).toLocaleDateString()}
                    {step.id === 'processing' && order.processingDate && new Date(order.processingDate).toLocaleDateString()}
                    {step.id === 'shipped' && order.shippedDate && new Date(order.shippedDate).toLocaleDateString()}
                    {step.id === 'delivered' && order.deliveredDate && new Date(order.deliveredDate).toLocaleDateString()}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              {['items', 'shipping', 'payment'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'items' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Order Items</h2>
                <div className="space-y-4">
                  {order.items.map(item => (
                    <div key={item.id} className="flex items-center border-b pb-4 last:border-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded mr-4"
                      />
                      <div className="flex-1">
                        <Link to={`/product/${item.id}`}>
                          <h3 className="font-medium hover:text-blue-600">{item.name}</h3>
                        </Link>
                        <p className="text-sm text-gray-600 mt-1">Qty: {item.quantity}</p>
                        {item.selectedSize && (
                          <p className="text-sm text-gray-600">Size: {item.selectedSize}</p>
                        )}
                        {item.selectedColor && (
                          <p className="text-sm text-gray-600">Color: {item.selectedColor}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'shipping' && shippingAddress && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin size={20} className="text-gray-400 mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Shipping Address</h3>
                    <p className="text-gray-700">
                      {shippingAddress.street}<br />
                      {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}<br />
                      {shippingAddress.country}
                    </p>
                    <p className="text-gray-600 mt-2">Phone: {shippingAddress.phone}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Truck size={20} className="text-gray-400 mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Shipping Method</h3>
                    <p className="text-gray-700">{order.shippingMethod}</p>
                    <p className="text-gray-600">${order.shippingCost.toFixed(2)}</p>
                  </div>
                </div>

                {order.trackingNumber && (
                  <div className="border-t pt-6">
                    <h3 className="font-medium mb-2">Tracking Information</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="text-sm font-medium mb-1">Tracking Number:</p>
                      <p className="font-mono text-gray-700 mb-3">{order.trackingNumber}</p>
                      <a
                        href={order.trackingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        Track Package →
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Payment Information</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <CreditCard size={20} className="text-gray-400 mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Payment Method</h3>
                    <p className="text-gray-700">{order.paymentMethod}</p>
                    <p className="text-sm text-gray-600">Paid on {new Date(order.paymentDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-medium mb-2">Billing Address</h3>
                  {order.billingSameAsShipping ? (
                    <p className="text-gray-600">Same as shipping address</p>
                  ) : (
                    <p className="text-gray-700">
                      {order.billingAddress.street}<br />
                      {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zipCode}<br />
                      {order.billingAddress.country}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div>
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>${order.shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${order.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Order Actions</h2>
            <div className="space-y-3">
              {order.status === 'processing' && (
                <button className="w-full text-left px-4 py-3 border border-red-300 text-red-700 rounded-md hover:bg-red-50">
                  Cancel Order
                </button>
              )}
              
              {order.status === 'delivered' && (
                <>
                  <Link
                    to={`/review/${order.items[0].id}`}
                    className="block w-full text-center px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Write a Review
                  </Link>
                  <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50">
                    Return Items
                  </button>
                </>
              )}

              <Link
                to="/support"
                className="block w-full text-center px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Contact Support
              </Link>

              <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50">
                Download Invoice
              </button>
            </div>
          </div>

          {/* Help */}
          <div className="bg-blue-50 rounded-lg p-6 mt-6">
            <h3 className="font-medium mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Have questions about your order?
            </p>
            <div className="space-y-2">
              <Link
                to="/support"
                className="block text-sm text-blue-600 hover:text-blue-700"
              >
                Contact Customer Support →
              </Link>
              <Link
                to="/track-order"
                className="block text-sm text-blue-600 hover:text-blue-700"
              >
                Track Another Order →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails