import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Search as SearchIcon, Filter, Grid, List } from 'lucide-react'
import ProductCard from '../components/product/ProductCard'
import ProductFilters from '../components/product/ProductFilters'
import Pagination from '../components/common/Pagination'
import Loader from '../components/common/Loader'
import productsData from '../data/products.json'
import categoriesData from '../data/categories.json'
import brandsData from '../data/brands.json'
import '../styles/Search.css'
const Search = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const searchQuery = queryParams.get('q') || ''
  
  const [results, setResults] = useState([])
  const [filteredResults, setFilteredResults] = useState([])
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('relevance')
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(12)
  
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    priceRange: { min: 0, max: 1000 }
  })

  useEffect(() => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      let searchResults = []
      
      if (searchQuery) {
        searchResults = productsData.filter(product => {
          const searchLower = searchQuery.toLowerCase()
          return (
            product.name.toLowerCase().includes(searchLower) ||
            product.description.toLowerCase().includes(searchLower) ||
            product.category?.toLowerCase().includes(searchLower) ||
            product.brand?.toLowerCase().includes(searchLower)
          )
        })
      } else {
        searchResults = [...productsData]
      }
      
      // Apply filters
      let filtered = [...searchResults]
      
      if (filters.categories.length > 0) {
        filtered = filtered.filter(product => 
          filters.categories.includes(product.categoryId)
        )
      }
      
      if (filters.brands.length > 0) {
        filtered = filtered.filter(product => 
          filters.brands.includes(product.brandId)
        )
      }
      
      filtered = filtered.filter(product => 
        product.price >= filters.priceRange.min && 
        product.price <= filters.priceRange.max
      )
      
      // Apply sorting
      switch (sortBy) {
        case 'price_low':
          filtered.sort((a, b) => a.price - b.price)
          break
        case 'price_high':
          filtered.sort((a, b) => b.price - a.price)
          break
        case 'newest':
          filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          break
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating)
          break
        default:
          // Relevance sorting - products with query in name get higher priority
          filtered.sort((a, b) => {
            const aNameMatch = a.name.toLowerCase().includes(searchQuery.toLowerCase())
            const bNameMatch = b.name.toLowerCase().includes(searchQuery.toLowerCase())
            
            if (aNameMatch && !bNameMatch) return -1
            if (!aNameMatch && bNameMatch) return 1
            return b.popularity - a.popularity
          })
      }
      
      setResults(searchResults)
      setFilteredResults(filtered)
      setLoading(false)
    }, 500)
  }, [searchQuery, filters, sortBy])

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
    setCurrentPage(1)
  }

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredResults.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filteredResults.length / productsPerPage)

  const addToCart = (product) => {
    console.log('Added to cart:', product)
  }

  const addToWishlist = (product) => {
    console.log('Added to wishlist:', product)
  }

  if (loading) return <Loader />

  return (
    <div className="search-page">
      {/* Search Header */}
      <div className="search-header">
        <h1 className="search-title">
          Search Results for <span className="search-query">"{searchQuery}"</span>
        </h1>
        <p className="search-results-count">
          Found {filteredResults.length} {filteredResults.length === 1 ? 'product' : 'products'}
        </p>
      </div>

      <div className="search-layout">
        {/* Filters Sidebar */}
        <div className="search-filters">
          <ProductFilters
            categories={categoriesData}
            brands={brandsData}
            priceRange={{ min: 0, max: 1000 }}
            onFilterChange={handleFilterChange}
            selectedFilters={filters}
          />
        </div>

        {/* Results Section */}
        <div className="results-section">
          {/* Results Header */}
          <div className="results-header">
            <div className="header-content">
              <div className="results-info">
                <SearchIcon size={20} className="results-icon" />
                <span className="results-count">
                  {filteredResults.length} results
                </span>
              </div>
              
              <div className="results-controls">
                {/* View Toggle */}
                <div className="view-toggle">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
                    aria-label="Grid view"
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
                    aria-label="List view"
                  >
                    <List size={20} />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="sort-dropdown"
                  aria-label="Sort results"
                >
                  <option value="relevance">Most Relevant</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Grid/List */}
          {currentProducts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon-container">
                <SearchIcon size={48} className="empty-icon" />
              </div>
              <h3 className="empty-title">No products found</h3>
              <p className="empty-message">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid-view">
              {currentProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  onAddToWishlist={addToWishlist}
                />
              ))}
            </div>
          ) : (
            <div className="list-view">
              {currentProducts.map(product => (
                <div key={product.id} className="list-item">
                  <div className="list-item-content">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="list-item-image"
                    />
                    <div className="list-item-details">
                      <h3 className="list-item-name">{product.name}</h3>
                      <p className="list-item-description">{product.description}</p>
                      <div className="list-item-footer">
                        <div className="list-item-price">
                          <span className="current-price">${product.price.toFixed(2)}</span>
                          {product.discountPrice && (
                            <span className="discount-price">
                              ${product.discountPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <div className="list-item-actions">
                          <button
                            onClick={() => addToWishlist(product)}
                            className="wishlist-button"
                          >
                            Add to Wishlist
                          </button>
                          <button
                            onClick={() => addToCart(product)}
                            className="cart-button"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Search