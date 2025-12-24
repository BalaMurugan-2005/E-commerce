import React from 'react'
import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus } from 'lucide-react'
import './CartItem.css'

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const { id, name, price, image, quantity, stock } = item
  const total = price * quantity

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= stock) {
      onUpdateQuantity(id, newQuantity)
    }
  }

  return (
    <div className="cart-item">
      <Link to={`/product/${id}`} className="product-image-link">
        <img
          src={image}
          alt={name}
          className="product-image"
        />
      </Link>
      
      <div className="product-details">
        <Link to={`/product/${id}`} className="product-name-link">
          <h3 className="product-name">
            {name}
          </h3>
        </Link>
        
        <div className="actions-container">
          <div className="quantity-controls">
            <div className="quantity-selector">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="quantity-button"
              >
                <Minus size={16} />
              </button>
              <span className="quantity-display">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= stock}
                className="quantity-button"
              >
                <Plus size={16} />
              </button>
            </div>
            
            <button
              onClick={() => onRemove(id)}
              className="remove-button"
            >
              <Trash2 size={18} />
            </button>
          </div>
          
          <div className="price-info">
            <p className="total-price">${total.toFixed(2)}</p>
            <p className="unit-price">${price.toFixed(2)} each</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem