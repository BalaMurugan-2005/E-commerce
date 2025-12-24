import React from 'react'
import { CreditCard, Wallet, Building } from 'lucide-react'
import './PaymentMethod.css'

const PaymentMethod = ({ selectedMethod, onSelect }) => {
  const paymentMethods = [
    {
      id: 'credit_card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Pay with your credit or debit card'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: Wallet,
      description: 'Pay using your PayPal account'
    },
    {
      id: 'bank_transfer',
      name: 'Bank Transfer',
      icon: Building,
      description: 'Transfer directly from your bank'
    }
  ]

  return (
    <div className="payment-method">
      <h3 className="payment-header">Payment Method</h3>
      
      <div className="methods-container">
        {paymentMethods.map(method => {
          const Icon = method.icon
          return (
            <div
              key={method.id}
              onClick={() => onSelect(method.id)}
              className={`method-card ${
                selectedMethod === method.id ? 'selected' : 'unselected'
              }`}
            >
              <div className="method-content">
                <Icon className="method-icon" />
                <div className="method-details">
                  <h4 className="method-name">{method.name}</h4>
                  <p className="method-description">{method.description}</p>
                </div>
                <input
                  type="radio"
                  checked={selectedMethod === method.id}
                  onChange={() => {}}
                  className="method-radio"
                />
              </div>
              
              {selectedMethod === 'credit_card' && method.id === 'credit_card' && (
                <div className="credit-card-form">
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PaymentMethod