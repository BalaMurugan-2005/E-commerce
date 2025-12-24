import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Package, Search, Filter, Download } from 'lucide-react'
import Loader from '../webpage/components/common/Loader'
import ordersData from '../webpage/data/orders.json'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [dateFilter, setDateFilter] = useState('all')

  useEffect(() => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setOrders(ordersData)
      setFilteredOrders(ordersData)
      setLoading(false)
    }, 500)
  }, [])

  useEffect(() => {
    let filtered = [...orders]

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter)
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(order =>
        order.orderNumber.toLowerCase().includes(term) ||
        order.items.some(item => item.name.toLowerCase().includes(term))
      )
    }

    // Apply date filter
    if (dateFilter !== 'all') {
      const now = new Date()
      const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30))
      const sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 6))

      filtered = filtered.filter(order => {
        const orderDate = new Date(order.orderDate)
        switch (dateFilter) {
          case '30days':
            return orderDate >= thirtyDaysAgo
          case '6months':
            return orderDate >= sixMonthsAgo
          case 'year':
            return orderDate.getFullYear() === new Date().getFullYear()
          default:
            return true
        }
      })
    }

    setFilteredOrders(filtered)
  }, [orders, statusFilter, searchTerm, dateFilter])

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'shipped': return 'bg-blue-100 text-blue-800'
      case 'processing': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) return <Loader />

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">My Orders</h1>
      <p className="text-gray-600 mb-8">Track and manage your orders</p>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by order number or product name"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Date Filter */}
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Time</option>
            <option value="30days">Last 30 days</option>
            <option value="6months">Last 6 months</option>
            <option value="year">This Year</option>
          </select>

          {/* Export Button */}
          <button className="flex items-center justify-center border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50">
            <Download size={18} className="mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Orders Count */}
      <div className="mb-4">
        <p className="text-gray-600">
          {filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'} found
        </p>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-12">
          <Package size={64} className="text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-4">No orders found</h2>
          <p className="text-gray-600 mb-8">
            {orders.length === 0 
              ? "You haven't placed any orders yet"
              : "Try adjusting your filters"}
          </p>
          <Link
            to="/products"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Order Header */}
              <div className="p-4 border-b">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <div className="flex items-center mb-2">
                      <h3 className="font-semibold mr-4">Order #{order.orderNumber}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Placed on {formatDate(order.orderDate)}
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0 text-right">
                    <p className="text-lg font-semibold">${order.total.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">{order.items.length} items</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-4">
                <div className="space-y-4">
                  {order.items.slice(0, 2).map(item => (
                    <div key={item.id} className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded mr-4"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}

                  {order.items.length > 2 && (
                    <p className="text-sm text-gray-600 text-center">
                      + {order.items.length - 2} more items
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t">
                  <Link
                    to={`/orders/${order.id}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                  <Link
                    to="/track-order"
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Track Order
                  </Link>
                  {order.status === 'delivered' && (
                    <Link
                      to={`/review/${order.items[0].id}`}
                      className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Write Review
                    </Link>
                  )}
                  <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                    Reorder
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Order Stats */}
      {orders.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Order Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Total Orders</p>
              <p className="text-2xl font-bold">{orders.length}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Amount Spent</p>
              <p className="text-2xl font-bold">
                ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Average Order</p>
              <p className="text-2xl font-bold">
                ${(orders.reduce((sum, order) => sum + order.total, 0) / orders.length).toFixed(2)}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Items Ordered</p>
              <p className="text-2xl font-bold">
                {orders.reduce((sum, order) => sum + order.items.length, 0)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Orders