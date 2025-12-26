import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  User, 
  Eye, 
  Heart, 
  LogIn,
  UserPlus,
  ShoppingBag,
  Clock,
  TrendingUp
} from 'lucide-react'
import Loader from '../components/common/Loader'
import '../styles/Profile.css'

const GuestProfile = () => {
  const [guestData, setGuestData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    // Simulate fetching guest data from localStorage or API
    setTimeout(() => {
      const guestInfo = {
        guestId: `GUEST_${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        sessionStart: new Date().toLocaleDateString(),
        viewedProducts: [
          { id: 1, name: 'Product A', viewedAt: '2 hours ago' },
          { id: 2, name: 'Product B', viewedAt: '1 day ago' },
          { id: 3, name: 'Product C', viewedAt: '3 days ago' }
        ],
        likedProducts: [
          { id: 4, name: 'Product D' },
          { id: 5, name: 'Product E' }
        ],
        cartItems: 3,
        totalViews: 12,
        sessionDuration: '45 minutes'
      }
      setGuestData(guestInfo)
      setLoading(false)
    }, 500)
  }, [])
// In GuestProfile.jsx, update the handleLogin and handleRegister functions:
const handleLogin = () => {
  navigate('/login')  // This should already be correct
}

const handleRegister = () => {
  navigate('/register')  // This should already be correct
}
  const clearGuestData = () => {
    // Clear guest data from localStorage or state
    localStorage.removeItem('guestData')
    setGuestData(null)
    // Redirect to home or refresh
    window.location.reload()
  }

  if (loading) return <Loader />
  if (!guestData) return <div className="error">Guest session not found</div>

  return (
    <div className="profile-page">
      <div className="page-header">
        <h1 className="page-title">Guest Profile</h1>
        <p className="page-subtitle">Continue browsing or create an account to save your preferences</p>
      </div>

      <div className="profile-layout">
        {/* Sidebar */}
        <div className="profile-sidebar">
          <div className="sidebar-card">
            <div className="user-info">
              <div className="user-avatar-container">
                <div className="user-avatar guest-avatar">
                  <User size={32} className="user-avatar-icon" />
                  <span className="guest-badge">Guest</span>
                </div>
                <div className="user-details">
                  <h3 className="user-name">Guest User</h3>
                  <p className="user-email">ID: {guestData.guestId}</p>
                  <p className="user-join-date">
                    Session started: {guestData.sessionStart}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="guest-actions">
                <button
                  onClick={handleLogin}
                  className="login-button"
                >
                  <LogIn size={18} className="button-icon" />
                  Login
                </button>
                <button
                  onClick={handleRegister}
                  className="register-button"
                >
                  <UserPlus size={18} className="button-icon" />
                  Register
                </button>
              </div>
            </div>

            <nav className="sidebar-nav">
              <ul className="nav-list">
                {[
                  { id: 'overview', label: 'Overview', icon: User },
                  { id: 'viewed', label: 'Recently Viewed', icon: Eye },
                  { id: 'liked', label: 'Liked Items', icon: Heart },
                  { id: 'cart', label: 'Cart', icon: ShoppingBag }
                ].map(item => {
                  const Icon = item.icon
                  return (
                    <li key={item.id} className="nav-item">
                      <button
                        onClick={() => setActiveTab(item.id)}
                        className={`nav-button ${activeTab === item.id ? 'active' : 'inactive'}`}
                      >
                        <Icon size={18} className="nav-icon" />
                        {item.label}
                      </button>
                    </li>
                  )
                })}

                <li className="nav-item">
                  <button 
                    onClick={clearGuestData}
                    className="logout-button"
                  >
                    Clear Session
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Benefits Card */}
          <div className="benefits-card">
            <h4 className="benefits-title">Benefits of Registering</h4>
            <ul className="benefits-list">
              <li className="benefit-item">
                <span className="benefit-icon">✓</span>
                Save your liked items permanently
              </li>
              <li className="benefit-item">
                <span className="benefit-icon">✓</span>
                Access order history
              </li>
              <li className="benefit-item">
                <span className="benefit-icon">✓</span>
                Faster checkout
              </li>
              <li className="benefit-item">
                <span className="benefit-icon">✓</span>
                Personalized recommendations
              </li>
              <li className="benefit-item">
                <span className="benefit-icon">✓</span>
                Exclusive member discounts
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="profile-content">
          {activeTab === 'overview' && (
            <div>
              {/* Welcome Card */}
              <div className="welcome-card guest-welcome">
                <h2 className="welcome-title">Welcome, Guest!</h2>
                <p className="welcome-subtitle">
                  You're browsing as a guest. Create an account to save your preferences and access more features.
                </p>
                <div className="guest-cta">
                  <button onClick={handleRegister} className="primary-cta">
                    Create Account
                  </button>
                  <button onClick={handleLogin} className="secondary-cta">
                    Already have an account? Login
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-content">
                    <div className="stat-details">
                      <p className="stat-label">Products Viewed</p>
                      <p className="stat-value">{guestData.totalViews}</p>
                    </div>
                    <Eye size={24} className="stat-icon views-icon" />
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-content">
                    <div className="stat-details">
                      <p className="stat-label">Liked Items</p>
                      <p className="stat-value">{guestData.likedProducts.length}</p>
                    </div>
                    <Heart size={24} className="stat-icon likes-icon" />
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-content">
                    <div className="stat-details">
                      <p className="stat-label">Cart Items</p>
                      <p className="stat-value">{guestData.cartItems}</p>
                    </div>
                    <ShoppingBag size={24} className="stat-icon cart-icon" />
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-content">
                    <div className="stat-details">
                      <p className="stat-label">Session Time</p>
                      <p className="stat-value">{guestData.sessionDuration}</p>
                    </div>
                    <Clock size={24} className="stat-icon time-icon" />
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="quick-actions">
                <h3 className="section-title">Quick Actions</h3>
                <div className="actions-grid">
                  <button 
                    onClick={() => navigate('/products')}
                    className="action-card"
                  >
                    <TrendingUp size={24} />
                    <span>Continue Shopping</span>
                  </button>
                  <button 
                    onClick={() => navigate('/cart')}
                    className="action-card"
                  >
                    <ShoppingBag size={24} />
                    <span>View Cart ({guestData.cartItems})</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('liked')}
                    className="action-card"
                  >
                    <Heart size={24} />
                    <span>View Liked Items</span>
                  </button>
                  <button 
                    onClick={handleRegister}
                    className="action-card highlight"
                  >
                    <UserPlus size={24} />
                    <span>Create Account</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'viewed' && (
            <div className="tab-content">
              <div className="tab-header">
                <h3 className="tab-title">Recently Viewed Products</h3>
                <p className="tab-subtitle">
                  These items will be cleared when you end your session. 
                  <button onClick={handleRegister} className="inline-link">
                    Create an account
                  </button> to save them permanently.
                </p>
              </div>

              <div className="product-list">
                {guestData.viewedProducts.map(product => (
                  <div key={product.id} className="product-card">
                    <div className="product-info">
                      <h4 className="product-name">{product.name}</h4>
                      <p className="product-meta">Viewed {product.viewedAt}</p>
                    </div>
                    <div className="product-actions">
                      <button 
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="view-button"
                      >
                        View Again
                      </button>
                      <button className="like-button">
                        <Heart size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {guestData.viewedProducts.length === 0 && (
                <div className="empty-state">
                  <Eye size={48} className="empty-icon" />
                  <h4>No Recently Viewed Items</h4>
                  <p>Start browsing products to see them here</p>
                  <button 
                    onClick={() => navigate('/products')}
                    className="browse-button"
                  >
                    Browse Products
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'liked' && (
            <div className="tab-content">
              <div className="tab-header">
                <h3 className="tab-title">Liked Products</h3>
                <p className="tab-subtitle">
                  Save these items by creating an account
                </p>
              </div>

              <div className="product-list">
                {guestData.likedProducts.map(product => (
                  <div key={product.id} className="product-card">
                    <div className="product-info">
                      <h4 className="product-name">{product.name}</h4>
                      <div className="product-tags">
                        <span className="tag liked-tag">
                          <Heart size={12} /> Liked
                        </span>
                      </div>
                    </div>
                    <div className="product-actions">
                      <button 
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="view-button"
                      >
                        View Details
                      </button>
                      <button className="remove-button">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {guestData.likedProducts.length === 0 && (
                <div className="empty-state">
                  <Heart size={48} className="empty-icon" />
                  <h4>No Liked Items</h4>
                  <p>Like products while browsing to save them here</p>
                  <button 
                    onClick={() => navigate('/products')}
                    className="browse-button"
                  >
                    Browse Products
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'cart' && (
            <div className="tab-content">
              <div className="tab-header">
                <h3 className="tab-title">Shopping Cart</h3>
                <p className="tab-subtitle">
                  You have {guestData.cartItems} items in your cart
                </p>
              </div>

              <div className="cart-summary">
                <div className="cart-actions">
                  <button 
                    onClick={() => navigate('/cart')}
                    className="view-cart-button"
                  >
                    View Full Cart
                  </button>
                  <button 
                    onClick={() => navigate('/checkout')}
                    className="checkout-button"
                  >
                    Proceed to Checkout
                  </button>
                </div>

                <div className="guest-checkout-note">
                  <p>
                    <strong>Note:</strong> As a guest, you can checkout without an account. 
                    However, creating an account will save your information for faster future purchases.
                  </p>
                  <button onClick={handleRegister} className="register-now">
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GuestProfile