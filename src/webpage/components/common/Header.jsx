import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ShoppingCart, Heart, User, Menu, X, Users } from 'lucide-react'
import './Header.css'

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`)
    }
  }

  const cartItems = 3 // This would come from your cart context/state
  const wishlistItems = 5

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            ShopEase
          </Link>

          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="desktop-search-form">
            <div className="search-container">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="search-input"
              />
              <button
                type="submit"
                className="search-button"
              >
                <Search size={20} />
              </button>
            </div>
          </form>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/products" className="nav-link">
              Products
            </Link>
            <Link to="/other-users" className="nav-link">
              Other Users
            </Link>
            
            {/* Icons */}
            <div className="icons-container">
              <Link to="/wishlist" className="icon-link">
                <Heart size={24} className="icon heart-icon" />
                {wishlistItems > 0 && (
                  <span className="badge">
                    {wishlistItems}
                  </span>
                )}
              </Link>
              
              <Link to="/profile" className="icon-link">
                <User size={24} className="icon" />
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="mobile-search-form">
          <div className="mobile-search-container">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="mobile-search-input"
            />
            <button
              type="submit"
              className="mobile-search-button"
            >
              <Search size={20} className="mobile-search-icon" />
            </button>
          </div>
        </form>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-content">
              <Link to="/" className="mobile-nav-link">
                Home
              </Link>
              <Link to="/products" className="mobile-nav-link">
                Products
              </Link>
              
              
              <Link to="/wishlist" className="mobile-nav-link-with-icon">
                <Heart size={20} className="mobile-link-icon" />
                Wishlist
                {wishlistItems > 0 && (
                  <span className="mobile-badge">
                    {wishlistItems}
                  </span>
                )}
              </Link>
              
              <Link to="/profile" className="mobile-nav-link-with-icon">
                <User size={20} className="mobile-link-icon" />
                Profile
              </Link>
              <Link to="/otherusers" className="mobile-nav-link">
                Other Users
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header