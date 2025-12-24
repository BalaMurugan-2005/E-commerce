import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ProductCard from '../components/product/ProductCard'
import Pagination from '../components/common/Pagination'
import Loader from '../components/common/Loader'
import productsData from '../data/products.json'
import categoriesData from '../data/categories.json'
import subcategoriesData from '../data/subcategories.json'
import '../styles/Category.css'

const Category = () => {
  const { id } = useParams()
  const [category, setCategory] = useState(null)
  const [subcategories, setSubcategories] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(12)

  useEffect(() => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      const foundCategory = categoriesData.find(c => c.id === parseInt(id))
      const categorySubcategories = subcategoriesData.filter(s => s.categoryId === parseInt(id))
      const categoryProducts = productsData.filter(p => p.categoryId === parseInt(id))
      
      setCategory(foundCategory)
      setSubcategories(categorySubcategories)
      setProducts(categoryProducts)
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
  if (!category) return <div className="error">Category not found</div>

  return (
    <div className="category-page">
      {/* Category Header */}
      <div className="category-header">
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">
            Home
          </Link>
          <span className="breadcrumb-separator">/</span>
          <Link to="/categories" className="breadcrumb-link">
            Categories
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{category.name}</span>
        </div>
        
        <div className="category-info">
          <div className="category-details">
            <h1 className="category-name">{category.name}</h1>
            <p className="category-description">{category.description}</p>
          </div>
          <div className="products-count">
            <p>{products.length} products</p>
          </div>
        </div>
      </div>

      {/* Subcategories */}
      {subcategories.length > 0 && (
        <div className="subcategories-section">
          <h2 className="subcategories-title">Subcategories</h2>
          <div className="subcategories-grid">
            {subcategories.map(subcategory => (
              <Link
                key={subcategory.id}
                to={`/category/${subcategory.id}`}
                className="subcategory-card"
              >
                <div className="subcategory-icon-container">
                  <img
                    src={subcategory.icon}
                    alt={subcategory.name}
                    className="subcategory-icon"
                  />
                </div>
                <h3 className="subcategory-name">{subcategory.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="no-products">
          <p className="no-products-text">No products found in this category.</p>
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
    </div>
  )
}

export default Category