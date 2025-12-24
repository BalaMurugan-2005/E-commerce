import React, { useState, useEffect } from 'react'
import { Bell, Check, Trash2, Filter, ShoppingBag, Tag, Star, AlertCircle } from 'lucide-react'
import Loader from '../components/common/Loader'
import notificationsData from '../data/notifications.json'

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
        return <ShoppingBag size={20} className="text-blue-600" />
      case 'promotion':
        return <Tag size={20} className="text-green-600" />
      case 'review':
        return <Star size={20} className="text-yellow-600" />
      case 'alert':
        return <AlertCircle size={20} className="text-red-600" />
      default:
        return <Bell size={20} className="text-gray-600" />
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Notifications</h1>
          <p className="text-gray-600">
            {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
          </p>
        </div>
        <div className="flex space-x-3">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50"
            >
              <Check size={18} className="mr-2" />
              Mark all as read
            </button>
          )}
          <button
            onClick={clearAll}
            className="flex items-center border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50"
          >
            <Trash2 size={18} className="mr-2" />
            Clear all
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Filter size={18} className="text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">Filter by:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-full text-sm ${
                  filter === 'all'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('order')}
                className={`px-3 py-1 rounded-full text-sm ${
                  filter === 'order'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Orders
              </button>
              <button
                onClick={() => setFilter('promotion')}
                className={`px-3 py-1 rounded-full text-sm ${
                  filter === 'promotion'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Promotions
              </button>
              <button
                onClick={() => setFilter('review')}
                className={`px-3 py-1 rounded-full text-sm ${
                  filter === 'review'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Reviews
              </button>
              <button
                onClick={() => setFilter('alert')}
                className={`px-3 py-1 rounded-full text-sm ${
                  filter === 'alert'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Alerts
              </button>
            </div>
          </div>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showUnreadOnly}
              onChange={(e) => setShowUnreadOnly(e.target.checked)}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Show unread only</span>
          </label>
        </div>
      </div>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <div className="text-center py-12">
          <Bell size={64} className="text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-4">No notifications</h2>
          <p className="text-gray-600">
            {notifications.length === 0
              ? "You don't have any notifications yet"
              : showUnreadOnly
              ? "You're all caught up!"
              : "No notifications match your filter"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNotifications.map(notification => (
            <div
              key={notification.id}
              className={`bg-white rounded-lg shadow-sm border p-4 ${
                !notification.read ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
              }`}
            >
              <div className="flex">
                {/* Icon */}
                <div className="flex-shrink-0 mr-4 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={`font-medium ${
                        !notification.read ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {notification.title}
                      </h3>
                      <p className="text-gray-600 mt-1">{notification.message}</p>
                      
                      {/* Action Buttons */}
                      {notification.actions && (
                        <div className="flex space-x-3 mt-3">
                          {notification.actions.map((action, index) => (
                            <button
                              key={index}
                              onClick={() => console.log(action)}
                              className={`px-3 py-1 text-sm rounded ${
                                action.primary
                                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                                  : 'border border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              {action.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-start space-x-2">
                      <span className="text-sm text-gray-500 whitespace-nowrap">
                        {formatTime(notification.timestamp)}
                      </span>
                      <div className="flex space-x-1">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-1 text-blue-600 hover:text-blue-700"
                            title="Mark as read"
                          >
                            <Check size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-1 text-gray-400 hover:text-red-600"
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
      <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-3">Email Notifications</h3>
            <div className="space-y-2">
              {['Order updates', 'Promotional offers', 'Price alerts', 'Newsletter'].map(item => (
                <label key={item} className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 text-blue-600 rounded mr-3"
                  />
                  <span className="text-sm text-gray-700">{item}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-3">Push Notifications</h3>
            <div className="space-y-2">
              {['Order status changes', 'New messages', 'Special deals', 'Cart reminders'].map(item => (
                <label key={item} className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 text-blue-600 rounded mr-3"
                  />
                  <span className="text-sm text-gray-700">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  )
}

export default Notifications