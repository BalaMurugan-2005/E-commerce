import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Lock } from 'lucide-react'
import AddressSelect from '../components/checkout/AddressSelect'
import PaymentMethod from '../components/checkout/PaymentMethod'
import OrderReview from '../components/checkout/OrderReview'
import Loader from '../components/common/Loader'
import addressesData from '../data/addresses.json'
import cartData from '../data/cart.json'
import '../styles/Checkout.css'

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
      <div className="order-success">
        <div className="success-container">
          <div className="success-icon">
            <Lock size={40} />
          </div>
          <h1 className="success-title">Order Placed Successfully!</h1>
          <p className="success-message">
            Thank you for your order. You will receive a confirmation email shortly.
          </p>
          <div className="success-buttons">
            <button
              onClick={() => navigate('/orders')}
              className="success-button-primary"
            >
              View Orders
            </button>
            <button
              onClick={() => navigate('/')}
              className="success-button-secondary"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      {/* Checkout Steps */}
      <div className="checkout-steps">
        <div className="steps-container">
          {['Shipping', 'Payment', 'Review'].map((stepName, index) => (
            <React.Fragment key={stepName}>
              <div className="step-item">
                <div
                  className={`step-circle ${
                    step > index + 1
                      ? 'completed'
                      : step === index + 1
                      ? 'active'
                      : 'inactive'
                  }`}
                >
                  {step > index + 1 ? '✓' : index + 1}
                </div>
                <span
                  className={`step-label ${
                    step >= index + 1 ? 'active' : 'inactive'
                  }`}
                >
                  {stepName}
                </span>
              </div>
              {index < 2 && (
                <div className={`step-connector ${
                  step > index + 1 ? 'completed' : 'incomplete'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="checkout-layout">
        {/* Checkout Form */}
        <div className="checkout-form">
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
          <div className="navigation-buttons">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="back-button"
              >
                <ArrowLeft size={20} className="back-icon" />
                Back
              </button>
            ) : (
              <div></div>
            )}

            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="continue-button"
                disabled={step === 1 && !selectedAddress}
              >
                Continue to {step === 1 ? 'Payment' : 'Review'}
              </button>
            ) : (
              <button
                onClick={handlePlaceOrder}
                className="place-order-button"
              >
                <Lock size={20} className="place-order-icon" />
                Place Order
              </button>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="order-summary-sidebar">
          <h3 className="order-summary-title">Order Summary</h3>
          
          <div className="order-summary-details">
            <div className="order-summary-row">
              <span className="order-summary-label">Subtotal</span>
              <span className="order-summary-value">${subtotal.toFixed(2)}</span>
            </div>
            <div className="order-summary-row">
              <span className="order-summary-label">Shipping</span>
              <span className="order-summary-value">
                {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="order-summary-row">
              <span className="order-summary-label">Tax</span>
              <span className="order-summary-value">${tax.toFixed(2)}</span>
            </div>
            <div className="order-summary-total">
              <div className="order-total-row">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="order-items-section">
            <h4 className="order-items-title">Items ({cartData.items.length})</h4>
            <div className="order-items-list">
              {cartData.items.map(item => (
                <div key={item.id} className="order-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="order-item-image"
                  />
                  <div className="order-item-details">
                    <p className="order-item-name">{item.name}</p>
                    <p className="order-item-quantity">Qty: {item.quantity}</p>
                  </div>
                  <span className="order-item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Secure Checkout */}
          <div className="secure-checkout">
            <div className="secure-badge">
              <Lock size={16} className="secure-icon" />
              Secure checkout
            </div>
            <p className="secure-note">
              Your payment information is encrypted and secure
            </p>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="help-section">
        <h4 className="help-title">Need Help?</h4>
        <p className="help-text">
          Have questions about your order?
        </p>
        <button
          onClick={() => navigate('/support')}
          className="help-link"
        >
          Contact Support →
        </button>
      </div>
    </div>
  )
}

export default Checkout