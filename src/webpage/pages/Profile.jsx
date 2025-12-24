import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit2,
  Shield,
  Bell,
  CreditCard,
  Package,
  Heart,
  LogOut
} from 'lucide-react'
import Loader from '../components/common/Loader'
import usersData from '../data/users.json'
import ordersData from '../data/orders.json'
import '../styles/Profile.css'

const Profile = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(null)

  useEffect(() => {
    setLoading(true)
    // Simulate API call - get current user
    setTimeout(() => {
      const currentUser = usersData[0] // Assuming first user is current
      setUser(currentUser)
      setEditedUser(currentUser)
      setLoading(false)
    }, 500)
  }, [])

  const handleSave = () => {
    // Simulate API call to update user
    setUser(editedUser)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedUser(user)
    setIsEditing(false)
  }

  const recentOrders = ordersData.slice(0, 3)

  if (loading) return <Loader />
  if (!user) return <div className="error">User not found</div>

  return (
    <div className="profile-page">
      <div className="page-header">
        <h1 className="page-title">My Profile</h1>
        <p className="page-subtitle">Manage your account information and preferences</p>
      </div>

      <div className="profile-layout">
        {/* Sidebar */}
        <div className="profile-sidebar">
          <div className="sidebar-card">
            <div className="user-info">
              <div className="user-avatar-container">
                <div className="user-avatar">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="user-avatar-image"
                    />
                  ) : (
                    <User size={32} className="user-avatar-icon" />
                  )}
                </div>
                <div className="user-details">
                  <h3 className="user-name">{user.name}</h3>
                  <p className="user-email">{user.email}</p>
                  <p className="user-join-date">Member since {user.joinDate}</p>
                </div>
              </div>
            </div>

            <nav className="sidebar-nav">
              <ul className="nav-list">
                {[
                  { id: 'overview', label: 'Overview', icon: User },
                  { id: 'personal', label: 'Personal Info', icon: User },
                  { id: 'security', label: 'Security', icon: Shield },
                  { id: 'notifications', label: 'Notifications', icon: Bell },
                  { id: 'payment', label: 'Payment Methods', icon: CreditCard },
                  { id: 'orders', label: 'My Orders', icon: Package },
                  { id: 'wishlist', label: 'Wishlist', icon: Heart }
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
                  <button className="logout-button">
                    <LogOut size={18} className="nav-icon" />
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="profile-content">
          {activeTab === 'overview' && (
            <div>
              {/* Welcome Card */}
              <div className="welcome-card">
                <h2 className="welcome-title">Welcome back, {user.name.split(' ')[0]}!</h2>
                <p className="welcome-subtitle">Here's what's happening with your account today.</p>
              </div>

              {/* Stats */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-content">
                    <div className="stat-details">
                      <p className="stat-label">Total Orders</p>
                      <p className="stat-value">{ordersData.length}</p>
                    </div>
                    <Package size={24} className="stat-icon orders-icon" />
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-content">
                    <div className="stat-details">
                      <p className="stat-label">Wishlist Items</p>
                      <p className="stat-value">{user.wishlistCount || 0}</p>
                    </div>
                    <Heart size={24} className="stat-icon wishlist-icon" />
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-content">
                    <div className="stat-details">
                      <p className="stat-label">Account Age</p>
                      <p className="stat-value">{user.accountAge || 'New'}</p>
                    </div>
                    <Calendar size={24} className="stat-icon account-icon" />
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="recent-orders">
                <div className="orders-header">
                  <h3 className="orders-title">Recent Orders</h3>
                  <Link
                    to="/orders"
                    className="view-all-link"
                  >
                    View All
                  </Link>
                </div>
                <div className="order-list">
                  {recentOrders.map(order => (
                    <div key={order.id} className="order-item">
                      <div className="order-info">
                        <p className="order-number">Order #{order.orderNumber}</p>
                        <p className="order-date">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="order-summary">
                        <p className="order-total">${order.total.toFixed(2)}</p>
                        <span className={`order-status ${
                          order.status === 'delivered' 
                            ? 'status-delivered'
                            : order.status === 'shipped'
                            ? 'status-shipped'
                            : 'status-pending'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'personal' && (
            <div className="tab-content">
              <div className="tab-header">
                <h3 className="tab-title">Personal Information</h3>
                {!isEditing ? (
                  <div className="edit-controls">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="edit-button"
                    >
                      <Edit2 size={18} className="edit-icon" />
                      Edit
                    </button>
                  </div>
                ) : (
                  <div className="action-buttons">
                    <button
                      onClick={handleCancel}
                      className="cancel-button"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="save-button"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>

              <div className="form-grid">
                <div className="form-field">
                  <label className="form-label">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedUser.name}
                      onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                      className="form-input"
                    />
                  ) : (
                    <div className="info-display">
                      <User size={18} className="info-icon" />
                      <span className="info-text">{user.name}</span>
                    </div>
                  )}
                </div>

                <div className="form-field">
                  <label className="form-label">
                    Email Address
                  </label>
                  <div className="info-display">
                    <Mail size={18} className="info-icon" />
                    <span className="info-text">{user.email}</span>
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-label">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedUser.phone}
                      onChange={(e) => setEditedUser({...editedUser, phone: e.target.value})}
                      className="form-input"
                    />
                  ) : (
                    <div className="info-display">
                      <Phone size={18} className="info-icon" />
                      <span className="info-text">{user.phone}</span>
                    </div>
                  )}
                </div>

                <div className="form-field">
                  <label className="form-label">
                    Date of Birth
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={editedUser.dateOfBirth}
                      onChange={(e) => setEditedUser({...editedUser, dateOfBirth: e.target.value})}
                      className="form-input"
                    />
                  ) : (
                    <div className="info-display">
                      <Calendar size={18} className="info-icon" />
                      <span className="info-text">{user.dateOfBirth}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">
                  Address
                </label>
                {isEditing ? (
                  <textarea
                    value={editedUser.address}
                    onChange={(e) => setEditedUser({...editedUser, address: e.target.value})}
                    rows="3"
                    className="form-textarea"
                  />
                ) : (
                  <div className="info-display">
                    <MapPin size={18} className="info-icon" />
                    <span className="info-text">{user.address}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="tab-content">
              <h3 className="tab-title">Security Settings</h3>
              <div className="security-section">
                <h4 className="section-title">Change Password</h4>
                <div className="password-form">
                  <div className="form-row">
                    <label className="form-label">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="form-input"
                    />
                  </div>
                  <div className="form-row">
                    <label className="form-label">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="form-input"
                    />
                  </div>
                  <div className="form-row">
                    <label className="form-label">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="form-input"
                    />
                  </div>
                  <button className="save-button">
                    Update Password
                  </button>
                </div>
              </div>

              <div className="two-factor">
                <div className="two-factor-info">
                  <h4 className="two-factor-title">Two-Factor Authentication</h4>
                  <p className="two-factor-description">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <button className="enable-button">
                  Enable
                </button>
              </div>

              <div className="login-history">
                <h4 className="section-title">Login History</h4>
                <div className="session-list">
                  <div className="session-item">
                    <div className="session-info">
                      <p className="session-title">Current Session</p>
                      <p className="session-details">Now • This device</p>
                    </div>
                    <span className="session-status">Active</span>
                  </div>
                  <div className="session-item">
                    <div className="session-info">
                      <p className="session-title">Previous Session</p>
                      <p className="session-details">Yesterday • Chrome on Windows</p>
                    </div>
                    <button className="revoke-button">
                      Revoke
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="tab-content">
              <h3 className="tab-title">Notification Preferences</h3>
              <div className="notification-section">
                <h4 className="section-title">Email Notifications</h4>
                <div className="notification-list">
                  {[
                    { label: 'Order updates', description: 'Get notified about your order status', default: true },
                    { label: 'Promotional emails', description: 'Receive deals, discounts and special offers', default: true },
                    { label: 'Product recommendations', description: 'Personalized product suggestions', default: false },
                    { label: 'Newsletter', description: 'Weekly newsletter with latest updates', default: true }
                  ].map((item, index) => (
                    <div key={index} className="notification-item">
                      <div className="notification-info">
                        <p className="notification-title">{item.label}</p>
                        <p className="notification-description">{item.description}</p>
                      </div>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          defaultChecked={item.default}
                          className="toggle-input"
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="notification-section">
                <h4 className="section-title">Push Notifications</h4>
                <div className="notification-list">
                  {[
                    { label: 'Order alerts', description: 'Get push notifications for order updates', default: true },
                    { label: 'Price drop alerts', description: 'Notify when items in wishlist drop in price', default: true },
                    { label: 'Cart reminders', description: 'Reminders about items in your cart', default: false }
                  ].map((item, index) => (
                    <div key={index} className="notification-item">
                      <div className="notification-info">
                        <p className="notification-title">{item.label}</p>
                        <p className="notification-description">{item.description}</p>
                      </div>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          defaultChecked={item.default}
                          className="toggle-input"
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile