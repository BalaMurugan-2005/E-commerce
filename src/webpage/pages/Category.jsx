import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ProductCard from '../components/product/ProductCard'
import Pagination from '../components/common/Pagination'
import Loader from '../components/common/Loader'
import productsData from '../data/products.json'
import categoriesData from '../data/categories.json'
import subcategoriesData from '../data/subcategories.json'

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
    <div className="container mx-auto px-4 py-8">
      {/* Category Header */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link to="/categories" className="text-gray-600 hover:text-gray-900">
            Categories
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="font-medium">{category.name}</span>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
            <p className="text-gray-600">{category.description}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-gray-600">{products.length} products</p>
          </div>
        </div>
      </div>

      {/* Subcategories */}
      {subcategories.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Subcategories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {subcategories.map(subcategory => (
              <Link
                key={subcategory.id}
                to={`/category/${subcategory.id}`}
                className="bg-white rounded-lg shadow-sm p-4 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 mx-auto mb-3">
                  <img
                    src={subcategory.icon}
                    alt={subcategory.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="font-medium text-sm">{subcategory.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No products found in this category.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
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