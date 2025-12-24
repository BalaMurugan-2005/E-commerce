import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Grid, List, Filter } from 'lucide-react'
import ProductCard from '../components/product/ProductCard'
import ProductFilters from '../components/product/ProductFilters'
import Pagination from '../components/common/Pagination'
import Loader from '../components/common/Loader'
import productsData from '../data/products.json'
import categoriesData from '../data/categories.json'
import brandsData from '../data/brands.json'

const ProductList = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search)
  
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('popular')
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
      let filtered = [...productsData]
      
      // Apply category filters
      if (filters.categories.length > 0) {
        filtered = filtered.filter(product => 
          filters.categories.includes(product.categoryId)
        )
      }
      
      // Apply brand filters
      if (filters.brands.length > 0) {
        filtered = filtered.filter(product => 
          filters.brands.includes(product.brandId)
        )
      }
      
      // Apply price filter
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
          filtered.sort((a, b) => b.popularity - a.popularity)
      }
      
      setFilteredProducts(filtered)
      setProducts(productsData)
      setLoading(false)
    }, 500)
  }, [filters, sortBy])

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
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  const addToCart = (product) => {
    console.log('Added to cart:', product)
    // Implement cart logic
  }

  const addToWishlist = (product) => {
    console.log('Added to wishlist:', product)
    // Implement wishlist logic
  }

  if (loading) return <Loader />

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <ProductFilters
            categories={categoriesData}
            brands={brandsData}
            priceRange={{ min: 0, max: 1000 }}
            onFilterChange={handleFilterChange}
            selectedFilters={filters}
          />
        </div>

        {/* Products Section */}
        <div className="lg:w-3/4">
          {/* Header */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">All Products</h1>
                <p className="text-gray-600 mt-1">
                  Showing {filteredProducts.length} products
                </p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                {/* View Toggle */}
                <div className="flex border border-gray-300 rounded-md">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                  >
                    <List size={20} />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          {currentProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <div className="space-y-4">
              {currentProducts.map(product => (
                <div key={product.id} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-32 h-32 object-cover rounded mr-6"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                      <p className="text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                          {product.discountPrice && (
                            <span className="ml-2 text-gray-500 line-through">
                              ${product.discountPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => addToWishlist(product)}
                            className="p-2 border border-gray-300 rounded hover:bg-gray-100"
                          >
                            Add to Wishlist
                          </button>
                          <button
                            onClick={() => addToCart(product)}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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

export default ProductList