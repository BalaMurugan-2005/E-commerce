import React, { useState, useEffect } from 'react'
import { Bell, Check, Trash2, Filter, ShoppingBag, Tag, Star, AlertCircle } from 'lucide-react'
import Loader from '../components/common/Loader'
import notificationsData from '../data/notifications.json'
import '../styles/Notifications.css'

const Notifications = () => {
  const [notifications, setNotifications] = useState([])
  const [filteredNotifications, setFilteredNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)

  useEffect(() => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setNotifications(notificationsData)
      setFilteredNotifications(notificationsData)
      setLoading(false)
    }, 500)
  }, [])

  useEffect(() => {
    let filtered = [...notifications]

    // Apply read/unread filter
    if (showUnreadOnly) {
      filtered = filtered.filter(notification => !notification.read)
    }

    // Apply category filter
    if (filter !== 'all') {
      filtered = filtered.filter(notification => notification.type === filter)
    }

    setFilteredNotifications(filtered)
  }, [notifications, filter, showUnreadOnly])

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    )
  }

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const clearAll = () => {
    if (window.confirm('Are you sure you want to clear all notifications?')) {
      setNotifications([])
    }
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'order':
        return <ShoppingBag size={20} className="icon-order" />
      case 'promotion':
        return <Tag size={20} className="icon-promotion" />
      case 'review':
        return <Star size={20} className="icon-review" />
      case 'alert':
        return <AlertCircle size={20} className="icon-alert" />
      default:
        return <Bell size={20} className="icon-default" />
    }
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) {
      return `${diffMins}m ago`
    } else if (diffHours < 24) {
      return `${diffHours}h ago`
    } else if (diffDays < 7) {
      return `${diffDays}d ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  if (loading) return <Loader />

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <div className="header-content">
          <h1 className="header-title">Notifications</h1>
          <p className="header-subtitle">
            {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
          </p>
        </div>
        <div className="header-actions">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="action-button"
            >
              <Check size={18} className="action-icon" />
              Mark all as read
            </button>
          )}
          <button
            onClick={clearAll}
            className="action-button"
          >
            <Trash2 size={18} className="action-icon" />
            Clear all
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filters-content">
          <div className="filters-left">
            <div className="filter-label">
              <Filter size={18} className="filter-icon" />
              <span>Filter by:</span>
            </div>
            <div className="filter-buttons">
              <button
                onClick={() => setFilter('all')}
                className={`filter-button all ${filter === 'all' ? '' : 'inactive'}`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('order')}
                className={`filter-button order ${filter === 'order' ? '' : 'inactive'}`}
              >
                Orders
              </button>
              <button
                onClick={() => setFilter('promotion')}
                className={`filter-button promotion ${filter === 'promotion' ? '' : 'inactive'}`}
              >
                Promotions
              </button>
              <button
                onClick={() => setFilter('review')}
                className={`filter-button review ${filter === 'review' ? '' : 'inactive'}`}
              >
                Reviews
              </button>
              <button
                onClick={() => setFilter('alert')}
                className={`filter-button alert ${filter === 'alert' ? '' : 'inactive'}`}
              >
                Alerts
              </button>
            </div>
          </div>

          <label className="unread-toggle">
            <input
              type="checkbox"
              checked={showUnreadOnly}
              onChange={(e) => setShowUnreadOnly(e.target.checked)}
              className="unread-checkbox"
            />
            <span className="unread-label">Show unread only</span>
          </label>
        </div>
      </div>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <div className="empty-state">
          <Bell size={64} className="empty-icon" />
          <h2 className="empty-title">No notifications</h2>
          <p className="empty-message">
            {notifications.length === 0
              ? "You don't have any notifications yet"
              : showUnreadOnly
              ? "You're all caught up!"
              : "No notifications match your filter"}
          </p>
        </div>
      ) : (
        <div className="notifications-list">
          {filteredNotifications.map(notification => (
            <div
              key={notification.id}
              className={`notification-card ${notification.read ? 'read' : 'unread'}`}
            >
              <div className="notification-content">
                {/* Icon */}
                <div className="notification-icon">
                  {getNotificationIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="notification-details">
                  <div className="notification-header">
                    <div>
                      <h3 className={`notification-title ${notification.read ? 'read' : ''}`}>
                        {notification.title}
                      </h3>
                      <p className="notification-message">{notification.message}</p>
                      
                      {/* Action Buttons */}
                      {notification.actions && (
                        <div className="notification-actions">
                          {notification.actions.map((action, index) => (
                            <button
                              key={index}
                              onClick={() => console.log(action)}
                              className={`notification-action-button ${
                                action.primary ? 'primary-action' : 'secondary-action'
                              }`}
                            >
                              {action.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="notification-controls">
                      <span className="notification-time">
                        {formatTime(notification.timestamp)}
                      </span>
                      <div className="control-buttons">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="control-button mark-read"
                            title="Mark as read"
                          >
                            <Check size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="control-button delete"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Notification Settings */}
      <div className="settings-section">
        <h2 className="settings-title">Notification Settings</h2>
        <div className="settings-grid">
          <div className="settings-category">
            <h3 className="category-title">Email Notifications</h3>
            <div className="settings-options">
              {['Order updates', 'Promotional offers', 'Price alerts', 'Newsletter'].map(item => (
                <label key={item} className="settings-option">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="settings-checkbox"
                  />
                  <span className="settings-label">{item}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="settings-category">
            <h3 className="category-title">Push Notifications</h3>
            <div className="settings-options">
              {['Order status changes', 'New messages', 'Special deals', 'Cart reminders'].map(item => (
                <label key={item} className="settings-option">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="settings-checkbox"
                  />
                  <span className="settings-label">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="settings-save">
          <button className="save-button">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  )
}

export default Notifications