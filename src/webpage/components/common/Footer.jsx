import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Company Info */}
          <div className="company-info">
            <h3 className="company-name">ShopEase</h3>
            <p className="company-description">
              Your one-stop destination for all your shopping needs. Quality products at affordable prices.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-link">
                <Twitter size={20} />
              </a>
              <a href="#" className="social-link">
                <Instagram size={20} />
              </a>
              <a href="#" className="social-link">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="section-title">Quick Links</h4>
            <ul className="footer-links">
              <li className="footer-link-item">
                <Link to="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/products" className="footer-link">
                  All Products
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/cart" className="footer-link">
                  Shopping Cart
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/wishlist" className="footer-link">
                  Wishlist
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/orders" className="footer-link">
                  My Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="footer-section">
            <h4 className="section-title">Customer Service</h4>
            <ul className="footer-links">
              <li className="footer-link-item">
                <Link to="/support" className="footer-link">
                  Contact Us
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/track-order" className="footer-link">
                  Track Order
                </Link>
              </li>
              <li className="footer-link-item">
                <a href="#" className="footer-link">
                  FAQs
                </a>
              </li>
              <li className="footer-link-item">
                <a href="#" className="footer-link">
                  Return Policy
                </a>
              </li>
              <li className="footer-link-item">
                <a href="#" className="footer-link">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="section-title">Contact Us</h4>
            <div className="contact-info">
              <div className="contact-item">
                <MapPin size={18} className="contact-icon" />
                <span className="contact-text">123 Street, City, Country</span>
              </div>
              <div className="contact-item">
                <Phone size={18} className="contact-icon" />
                <span className="contact-text">+1 234 567 8900</span>
              </div>
              <div className="contact-item">
                <Mail size={18} className="contact-icon" />
                <span className="contact-text">support@shopease.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ShopEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer