import React, { useState, useEffect } from 'react'
import { 
  MessageSquare, 
  Search, 
  FileText, 
  Phone, 
  Mail, 
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  HelpCircle
} from 'lucide-react'
import Loader from '../components/common/Loader'
import supportTicketsData from '../data/supportTickets.json'

const Support = () => {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('new')
  const [searchTerm, setSearchTerm] = useState('')
  const [showNewTicketForm, setShowNewTicketForm] = useState(false)
  const [newTicket, setNewTicket] = useState({
    subject: '',
    category: 'general',
    priority: 'medium',
    message: ''
  })

  useEffect(() => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setTickets(supportTicketsData)
      setLoading(false)
    }, 500)
  }, [])

  const filteredTickets = tickets.filter(ticket => {
    if (activeTab === 'all') return true
    return ticket.status === activeTab
  }).filter(ticket => {
    if (!searchTerm) return true
    const term = searchTerm.toLowerCase()
    return (
      ticket.subject.toLowerCase().includes(term) ||
      ticket.message.toLowerCase().includes(term) ||
      ticket.ticketNumber.toLowerCase().includes(term)
    )
  })

  const handleSubmitTicket = (e) => {
    e.preventDefault()
    const newTicketData = {
      id: tickets.length + 1,
      ticketNumber: `TKT-${Date.now()}`,
      ...newTicket,
      status: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    setTickets(prev => [newTicketData, ...prev])
    setShowNewTicketForm(false)
    setNewTicket({
      subject: '',
      category: 'general',
      priority: 'medium',
      message: ''
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-yellow-100 text-yellow-800'
      case 'pending': return 'bg-blue-100 text-blue-800'
      case 'resolved': return 'bg-green-100 text-green-800'
      case 'closed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) return <Loader />

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Customer Support</h1>
      <p className="text-gray-600 mb-8">We're here to help. Get assistance with your orders and account.</p>

      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone size={24} className="text-blue-600" />
          </div>
          <h3 className="font-semibold mb-2">Call Us</h3>
          <p className="text-gray-600 text-sm mb-3">Speak with our support team</p>
          <a href="tel:+1234567890" className="text-blue-600 font-medium">
            +1 (234) 567-890
          </a>
          <p className="text-xs text-gray-500 mt-2">Mon-Fri, 9AM-6PM EST</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail size={24} className="text-green-600" />
          </div>
          <h3 className="font-semibold mb-2">Email Us</h3>
          <p className="text-gray-600 text-sm mb-3">Get help via email</p>
          <a href="mailto:support@shopease.com" className="text-blue-600 font-medium">
            support@shopease.com
          </a>
          <p className="text-xs text-gray-500 mt-2">Response within 24 hours</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare size={24} className="text-purple-600" />
          </div>
          <h3 className="font-semibold mb-2">Live Chat</h3>
          <p className="text-gray-600 text-sm mb-3">Chat with our agents</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Start Chat
          </button>
          <p className="text-xs text-gray-500 mt-2">Available 24/7</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex space-x-4">
              {[
                { id: 'all', label: 'All Tickets' },
                { id: 'open', label: 'Open' },
                { id: 'pending', label: 'Pending' },
                { id: 'resolved', label: 'Resolved' },
                { id: 'closed', label: 'Closed' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowNewTicketForm(true)}
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              <MessageSquare size={18} className="mr-2" />
              New Ticket
            </button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tickets..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* New Ticket Form */}
          {showNewTicketForm && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Create New Support Ticket</h2>
                <button
                  onClick={() => setShowNewTicketForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmitTicket} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    value={newTicket.subject}
                    onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})}
                    required
                    placeholder="Brief description of your issue"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <select
                      value={newTicket.category}
                      onChange={(e) => setNewTicket({...newTicket, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="order">Order Issues</option>
                      <option value="shipping">Shipping & Delivery</option>
                      <option value="return">Returns & Refunds</option>
                      <option value="payment">Payment Issues</option>
                      <option value="account">Account Issues</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Priority *
                    </label>
                    <select
                      value={newTicket.priority}
                      onChange={(e) => setNewTicket({...newTicket, priority: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    value={newTicket.message}
                    onChange={(e) => setNewTicket({...newTicket, message: e.target.value})}
                    required
                    rows="6"
                    placeholder="Please provide detailed information about your issue..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Submit Ticket
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewTicketForm(false)}
                    className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tickets List */}
          {filteredTickets.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <MessageSquare size={64} className="text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-4">No tickets found</h2>
              <p className="text-gray-600 mb-8">
                {activeTab === 'all' && tickets.length === 0
                  ? "You haven't created any support tickets yet"
                  : "No tickets match your current filter"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTickets.map(ticket => (
                <div
                  key={ticket.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <h3 className="font-semibold text-lg mr-3">{ticket.subject}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ml-2 ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Ticket #{ticket.ticketNumber} • {ticket.category} • Created {new Date(ticket.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                  </div>
                  
                  <p className="text-gray-700 mb-4 line-clamp-2">{ticket.message}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock size={16} className="mr-1" />
                      Updated {new Date(ticket.updatedAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      {ticket.agent && (
                        <div className="flex items-center mr-4">
                          <div className="w-6 h-6 bg-gray-200 rounded-full mr-2 overflow-hidden">
                            <img
                              src={ticket.agent.avatar}
                              alt={ticket.agent.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-sm text-gray-600">{ticket.agent.name}</span>
                        </div>
                      )}
                      <button className="text-blue-600 hover:text-blue-700 text-sm">
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div>
          {/* FAQ */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <HelpCircle size={20} className="mr-2" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: 'How do I track my order?',
                  a: 'You can track your order from the "Track Order" page using your order number.'
                },
                {
                  q: 'What is your return policy?',
                  a: 'We offer 30-day returns for most items in original condition.'
                },
                {
                  q: 'How long does shipping take?',
                  a: 'Standard shipping takes 3-5 business days, express takes 1-2 days.'
                },
                {
                  q: 'Can I change my order?',
                  a: 'You can modify your order before it ships from the order details page.'
                }
              ].map((faq, index) => (
                <div key={index} className="border-b pb-4 last:border-0">
                  <h3 className="font-medium mb-2">{faq.q}</h3>
                  <p className="text-sm text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-center text-blue-600 hover:text-blue-700 text-sm">
              View all FAQs →
            </button>
          </div>

          {/* Support Hours */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Support Hours</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Monday - Friday</span>
                <span className="font-medium">9:00 AM - 6:00 PM EST</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Saturday</span>
                <span className="font-medium">10:00 AM - 4:00 PM EST</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sunday</span>
                <span className="font-medium">Closed</span>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-gray-600 mb-2">Emergency Support</p>
              <p className="font-medium">Available 24/7 for urgent order issues</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-blue-50 rounded-lg p-6 mt-6">
            <h3 className="font-medium mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 bg-white rounded-md border border-gray-200 hover:bg-gray-50">
                Track an Order
              </button>
              <button className="w-full text-left px-4 py-3 bg-white rounded-md border border-gray-200 hover:bg-gray-50">
                Start a Return
              </button>
              <button className="w-full text-left px-4 py-3 bg-white rounded-md border border-gray-200 hover:bg-gray-50">
                View Order History
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Support