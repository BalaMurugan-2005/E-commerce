import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Check, Star } from 'lucide-react'
import ProductCard from '../components/product/ProductCard'
import Pagination from '../components/common/Pagination'
import Loader from '../components/common/Loader'
import productsData from '../data/products.json'
import brandsData from '../data/brands.json'
import '../styles/Brand.css'

const Brand = () => {
  const { id } = useParams()
  const [brand, setBrand] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(12)

  useEffect(() => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      const foundBrand = brandsData.find(b => b.id === parseInt(id))
      const brandProducts = productsData.filter(p => p.brandId === parseInt(id))
      
      setBrand(foundBrand)
      setProducts(brandProducts)
      setLoading(false)
    }, 500)
  }, [id])

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(products.length / productsPerPage)

  const addToCart = (product) => {
    console.log('Added to cart:', product)
  }

  const addToWishlist = (product) => {
    console.log('Added to wishlist:', product)
  }

  if (loading) return <Loader />
  if (!brand) return <div className="error">Brand not found</div>

  return (
    <div className="brand-page">
      {/* Brand Header */}
      <div className="brand-header">
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">
            Home
          </Link>
          <span className="breadcrumb-separator">/</span>
          <Link to="/brands" className="breadcrumb-link">
            Brands
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{brand.name}</span>
        </div>
        
        <div className="brand-info-card">
          <div className="brand-info-content">
            <div className="brand-logo-container">
              <img
                src={brand.logo}
                alt={brand.name}
                className="brand-logo"
              />
            </div>
            
            <div className="brand-details">
              <h1 className="brand-name">{brand.name}</h1>
              <p className="brand-description">{brand.description}</p>
              
              <div className="brand-features">
                {brand.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <Check size={16} className="feature-icon" />
                    {feature}
                  </div>
                ))}
              </div>
              
              <div className="brand-stats">
                <div className="rating-container">
                  <Star size={20} className="rating-star" />
                  <span className="rating-value">{brand.rating.toFixed(1)}</span>
                  <span className="rating-count">({brand.reviewCount} reviews)</span>
                </div>
                <div className="established-year">
                  Established {brand.establishedYear}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Count */}
      <div className="products-count-header">
        <h2 className="products-title">{brand.name} Products</h2>
        <p className="products-count">{products.length} products</p>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="no-products">
          <p className="no-products-text">No products found for this brand.</p>
        </div>
      ) : (
        <>
          <div className="products-grid">
            {currentProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onAddToWishlist={addToWishlist}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}

      {/* Brand Story */}
      {brand.story && (
        <div className="brand-story">
          <h2 className="story-title">Our Story</h2>
          <div className="story-content">
            {brand.story.split('\n').map((paragraph, index) => (
              <p key={index} className="story-paragraph">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Brand