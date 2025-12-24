import React from 'react'
import { Plus, Check } from 'lucide-react'
import './AddressSelect.css'

const AddressSelect = ({ addresses, selectedAddress, onSelect, onAddNew }) => {
  return (
    <div className="address-select">
      <div className="address-header">
        <h3 className="address-title">Shipping Address</h3>
        <button
          onClick={onAddNew}
          className="add-address-button"
        >
          <Plus size={18} className="add-address-icon" />
          Add New Address
        </button>
      </div>
      
      <div className="address-grid">
        {addresses.map(address => (
          <div
            key={address.id}
            onClick={() => onSelect(address.id)}
            className={`address-card ${
              selectedAddress === address.id ? 'selected' : 'unselected'
            }`}
          >
            <div className="address-card-content">
              <div className="address-details">
                <h4 className="address-name">{address.name}</h4>
                <p className="address-text">
                  {address.street}<br />
                  {address.city}, {address.state} {address.zipCode}<br />
                  {address.country}
                </p>
                <p className="address-phone">Phone: {address.phone}</p>
              </div>
              
              {selectedAddress === address.id && (
                <Check size={20} className="selected-check-icon" />
              )}
            </div>
            
            {address.isDefault && (
              <span className="default-badge">
                Default
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AddressSelect