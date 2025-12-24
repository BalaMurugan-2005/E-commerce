import React from 'react'
import './OrderReview.css'

const OrderReview = ({ items, subtotal, shipping, tax, address, paymentMethod }) => {
  const total = subtotal + shipping + tax

  return (
    <div className="order-review">
      <h3 className="review-header">Review Your Order</h3>
      
      <div className="review-content">
        {/* Items */}
        <div>
          <h4 className="section-title">Items ({items.length})</h4>
          <div className="items-container">
            {items.map(item => (
              <div key={item.id} className="item-row">
                <div className="item-content">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="item-image"
                  />
                  <div className="item-details">
                    <p className="item-name">{item.name}</p>
                    <p className="item-quantity">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Address */}
        <div>
          <h4 className="section-title">Shipping Address</h4>
          <div className="address-container">
            <p className="address-name">{address.name}</p>
            <p className="address-text">
              {address.street}<br />
              {address.city}, {address.state} {address.zipCode}<br />
              {address.country}
            </p>
            <p className="address-phone">Phone: {address.phone}</p>
          </div>
        </div>
        
        {/* Payment */}
        <div>
          <h4 className="section-title">Payment Method</h4>
          <div className="payment-container">
            <p className="payment-method">{paymentMethod.replace('_', ' ')}</p>
          </div>
        </div>
        
        {/* Summary */}
        <div className="summary-section">
          <div className="summary-details">
            <div className="summary-row">
              <span className="summary-label">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderReview