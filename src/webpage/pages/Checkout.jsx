import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Lock } from 'lucide-react'
import AddressSelect from '../components/checkout/AddressSelect'
import PaymentMethod from '../components/checkout/PaymentMethod'
import OrderReview from '../components/checkout/OrderReview'
import Loader from '../components/common/Loader'
import addressesData from '../data/addresses.json'
import cartData from '../data/cart.json'

const Checkout = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [addresses, setAddresses] = useState([])
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('credit_card')
  const [loading, setLoading] = useState(true)
  const [orderPlaced, setOrderPlaced] = useState(false)

  // Calculate order totals
  const subtotal = cartData.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  useEffect(() => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setAddresses(addressesData)
      setSelectedAddress(addressesData.find(addr => addr.isDefault)?.id || null)
      setLoading(false)
    }, 500)
  }, [])

  const handlePlaceOrder = () => {
    // Simulate order placement
    setOrderPlaced(true)
    setTimeout(() => {
      navigate('/orders')
    }, 3000)
  }

  const handleAddNewAddress = () => {
    // Implement add new address modal/form
    console.log('Add new address')
  }

  const selectedAddressData = addresses.find(addr => addr.id === selectedAddress)

  if (loading) return <Loader />

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock size={40} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your order. You will receive a confirmation email shortly.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate('/orders')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              View Orders
            </button>
            <button
              onClick={() => navigate('/')}
              className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Checkout Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center mb-4">
          {['Shipping', 'Payment', 'Review'].map((stepName, index) => (
            <React.Fragment key={stepName}>
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step > index + 1
                      ? 'bg-green-500 text-white'
                      : step === index + 1
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step > index + 1 ? '✓' : index + 1}
                </div>
                <span
                  className={`ml-2 ${
                    step >= index + 1 ? 'font-medium' : 'text-gray-500'
                  }`}
                >
                  {stepName}
                </span>
              </div>
              {index < 2 && (
                <div className={`h-1 w-16 mx-4 ${
                  step > index + 1 ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          {step === 1 && (
            <AddressSelect
              addresses={addresses}
              selectedAddress={selectedAddress}
              onSelect={setSelectedAddress}
              onAddNew={handleAddNewAddress}
            />
          )}

          {step === 2 && (
            <PaymentMethod
              selectedMethod={paymentMethod}
              onSelect={setPaymentMethod}
            />
          )}

          {step === 3 && selectedAddressData && (
            <OrderReview
              items={cartData.items}
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              address={selectedAddressData}
              paymentMethod={paymentMethod}
            />
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back
              </button>
            ) : (
              <div></div>
            )}

            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
                disabled={step === 1 && !selectedAddress}
              >
                Continue to {step === 1 ? 'Payment' : 'Review'}
              </button>
            ) : (
              <button
                onClick={handlePlaceOrder}
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 flex items-center"
              >
                <Lock size={20} className="mr-2" />
                Place Order
              </button>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 sticky top-8">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Items ({cartData.items.length})</h4>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {cartData.items.map(item => (
                  <div key={item.id} className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded mr-3"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Secure Checkout */}
            <div className="mt-6 pt-4 border-t">
              <div className="flex items-center text-sm text-gray-600">
                <Lock size={16} className="mr-2" />
                Secure checkout
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Your payment information is encrypted and secure
              </p>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-6 bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Need Help?</h4>
            <p className="text-sm text-gray-600 mb-3">
              Have questions about your order?
            </p>
            <button
              onClick={() => navigate('/support')}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Contact Support →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout