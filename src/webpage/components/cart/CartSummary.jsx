import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import './CartSummary.css'

const CartSummary = ({ items, subtotal, shipping, tax, onProceedToCheckout }) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const total = subtotal + shipping + tax

  return (
    <div className="cart-summary">
      <h3 className="summary-header">
        <ShoppingBag size={20} className="summary-icon" />
        Order Summary
      </h3>
      
      <div className="summary-details">
        <div className="summary-row">
          <span className="summary-label">Subtotal ({totalItems} items)</span>
          <span className="summary-value">${subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Shipping</span>
          <span className="summary-value">
            {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Tax</span>
          <span className="summary-value">${tax.toFixed(2)}</span>
        </div>
        <div className="total-section">
          <div className="total-row">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <button
        onClick={onProceedToCheckout}
        className="checkout-button"
      >
        Proceed to Checkout
      </button>
      
      <Link
        to="/products"
        className="continue-shopping-link"
      >
        Continue Shopping
      </Link>
    </div>
  )
}

export default CartSummary