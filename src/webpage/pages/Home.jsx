import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ShoppingBag, Shield, Truck, Award, Sparkles, Star, Zap, TrendingUp } from 'lucide-react'
import ProductCard from '../components/product/ProductCard'
import Loader from '../components/common/Loader'
import homepageData from '../data/homepage.json'
import productsData from '../data/products.json'
import categoriesData from '../data/categories.json'
import { heroAnimation, featureCardsAnimation, categoryFlipAnimation, productCardAnimations, floatingParticles } from '../utils/animations'
import '../styles/HomePage.css'

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [newArrivals, setNewArrivals] = useState([])
  const [bestSellers, setBestSellers] = useState([])
  const [loading, setLoading] = useState(true)
  const heroRef = useRef(null)

useEffect(() => {
  setTimeout(() => {
    setFeaturedProducts(productsData.slice(0, 8))
    setNewArrivals(productsData.slice(8, 16))
    setBestSellers(productsData.slice(16, 24))
    setLoading(false)
  }, 1500)
}, [])

useEffect(() => {
  if (!loading) {
    heroAnimation()
    featureCardsAnimation()
    categoryFlipAnimation()
    productCardAnimations()
    floatingParticles()
  }
}, [loading])
 

  const addToCart = (product, event) => {
    // Add ripple effect
    const button = event.currentTarget
    const ripple = document.createElement('span')
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2
    
    ripple.className = 'ripple-effect'
    ripple.style.width = `${size}px`
    ripple.style.height = `${size}px`
    ripple.style.top = `${y}px`
    ripple.style.left = `${x}px`
    
    button.appendChild(ripple)
    setTimeout(() => ripple.remove(), 600)
    
    console.log('Added to cart:', product)
  }

  const addToWishlist = (product) => {
    console.log('Added to wishlist:', product)
  }

  if (loading) return <Loader />

  return (
    <div className="homepage-container">
      {/* Enhanced Hero Section */}
      <section ref={heroRef} className="hero-section">
        <div className="particles-background"></div>
        <div className="hero-overlay"></div>
        
        <div className="hero-content">
          <div className="hero-text">
            <div className="trending-badge">
              <Sparkles size={16} />
              <span>🔥 Trending Now</span>
            </div>
            
            <h1 className="hero-title">
              <span>Discover Amazing</span>
              <span className="gradient-text">Products That</span>
              <span>Fit Your Style</span>
            </h1>
            
            <p className="hero-subtitle">
              {homepageData.hero.subtitle} Explore our curated collection of premium products with exclusive deals and fast delivery.
            </p>
            
            <div className="hero-buttons">
              <Link
                to="/products"
                className="primary-btn"
              >
                <span>Start Shopping</span>
                <ArrowRight size={20} className="btn-icon" />
              </Link>
              
              <Link
                to="/categories"
                className="secondary-btn"
              >
                <span>Explore Collections</span>
                <TrendingUp size={20} className="btn-icon" />
              </Link>
            </div>
            
            <div className="stats-container">
              <div className="stat-item">
                <div className="stat-number gradient-text">10K+</div>
                <div className="stat-label">Happy Customers</div>
              </div>
              <div className="stat-item">
                <div className="stat-number gradient-text">500+</div>
                <div className="stat-label">Premium Brands</div>
              </div>
              <div className="stat-item">
                <div className="stat-number gradient-text">24/7</div>
                <div className="stat-label">Support</div>
              </div>
            </div>
          </div>
          
          <div className="hero-image-wrapper">
            <div className="hero-image-container">
              <img
                src={homepageData.hero.image}
                alt="Hero"
                className="hero-image"
              />
              <div className="discount-badge">
                <div className="badge-content">
                  <Star size={16} fill="white" />
                  <span>50% OFF</span>
                </div>
              </div>
              <div className="delivery-badge">
                <div className="badge-content">
                  <Zap size={16} />
                  <span>Fast Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <div className="scroll-indicator-inner">
            <div className="scroll-dot"></div>
          </div>
        </div>
      </section>

      {/* Animated Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="section-header">
            <h2 className="section-title">
              Why Choose <span className="gradient-text">Our Store</span>
            </h2>
            <p className="section-description">
              We provide the best shopping experience with premium services and customer support
            </p>
          </div>
          
          <div className="features-grid">
            {[
              {
                icon: <Truck size={32} />,
                title: "Free Shipping",
                desc: "On all orders over $50",
                color: "blue"
              },
              {
                icon: <ShoppingBag size={32} />,
                title: "Easy Returns",
                desc: "30-day hassle-free returns",
                color: "green"
              },
              {
                icon: <Shield size={32} />,
                title: "Secure Payment",
                desc: "100% secure transactions",
                color: "purple"
              },
              {
                icon: <Award size={32} />,
                title: "Quality Guaranteed",
                desc: "Premium quality products",
                color: "orange"
              }
            ].map((feature, index) => (
              <div key={index} className="feature-card">
                <div className={`feature-icon ${feature.color}`}>
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Categories Section with 3D Flip */}
      <section className="categories-section">
        <div className="categories-container">
          <div className="categories-header">
            <div>
              <h2 className="section-title">
                Shop by <span className="gradient-text">Category</span>
              </h2>
              <p className="section-description">Browse through our wide range of categories</p>
            </div>
            <Link
              to="/categories"
              className="categories-btn"
            >
              View All Categories
              <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="categories-grid">
            {categoriesData.slice(0, 6).map((category) => (
              <div key={category.id} className="category-card">
                <div className="category-inner">
                  <div className="category-front">
                    <div className="category-icon">
                      <img
                        src={category.icon}
                        alt={category.name}
                        className="category-image"
                      />
                    </div>
                    <h3 className="category-name">{category.name}</h3>
                    <div className="category-count">
                      {Math.floor(Math.random() * 100) + 50} products
                    </div>
                  </div>
                  <div className="category-back">
                    <div className="category-back-title">{category.name}</div>
                    <p className="category-back-text">Explore collection</p>
                    <ArrowRight size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Marquee Brands */}
          <div className="marquee-section">
            <div className="marquee-container">
              <div className="marquee-content">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="brand-item">
                    <div className="brand-text">BRAND{i+1}</div>
                  </div>
                ))}
                {[...Array(8)].map((_, i) => (
                  <div key={i+8} className="brand-item">
                    <div className="brand-text">BRAND{i+1}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products with Shimmer Effect */}
      <section className="featured-products-section">
        <div className="products-container">
          <div className="products-header">
            <div className="premium-badge">
              <Star size={14} fill="currentColor" />
              <span>Premium Collection</span>
            </div>
            <h2 className="section-title">
              Featured <span className="gradient-text">Products</span>
            </h2>
            <p className="section-description">
              Handpicked collection of our best-selling and most loved products
            </p>
          </div>
          
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onAddToWishlist={addToWishlist}
              />
            ))}
          </div>
          
          <div className="view-all-btn-container">
            <Link
              to="/products?sort=featured"
              className="view-all-btn"
            >
              View All Products
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="new-arrivals-section">
        <div className="arrivals-container">
          <div className="arrivals-header">
            <div>
              <div className="arrivals-badge">
                <Zap size={16} fill="currentColor" />
                <span>Just Launched</span>
              </div>
              <h2 className="section-title">
                New <span className="gradient-text">Arrivals</span>
              </h2>
            </div>
            <Link
              to="/products?sort=newest"
              className="arrivals-link"
            >
              View All
              <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="arrivals-grid">
            {newArrivals.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onAddToWishlist={addToWishlist}
                isNew={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="best-sellers-section">
        <div className="sellers-container">
          <div className="sellers-header">
            <div className="hot-badge">
              <TrendingUp size={14} />
              <span>🔥 Hot Sellers</span>
            </div>
            <h2 className="section-title">
              Best <span className="gradient-text">Sellers</span>
            </h2>
            <p className="sellers-description">
              Products loved by thousands of customers worldwide
            </p>
          </div>
          
          <div className="sellers-grid">
            {bestSellers.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onAddToWishlist={addToWishlist}
                darkMode={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-overlay"></div>
        <div className="newsletter-pattern"></div>
        
        <div className="newsletter-container">
          <div className="newsletter-box">
            <div className="newsletter-icon">
              <Sparkles size={28} />
            </div>
            
            <h2 className="newsletter-title">
              Stay <span className="gradient-text">Updated</span>
            </h2>
            <p className="newsletter-description">
              Subscribe to our newsletter and get exclusive deals, new arrivals, and style tips delivered to your inbox.
            </p>
            
            <form className="newsletter-form">
              <div className="newsletter-input-wrapper">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="newsletter-input"
                />
              </div>
              <button
                type="submit"
                className="newsletter-btn"
              >
                Subscribe
              </button>
            </form>
            
            <p className="newsletter-disclaimer">
              By subscribing, you agree to our Privacy Policy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home