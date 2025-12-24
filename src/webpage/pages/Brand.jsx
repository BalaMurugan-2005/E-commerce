import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Check, Star } from 'lucide-react'
import ProductCard from '../components/product/ProductCard'
import Pagination from '../components/common/Pagination'
import Loader from '../components/common/Loader'
import productsData from '../data/products.json'
import brandsData from '../data/brands.json'

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
    <div className="container mx-auto px-4 py-8">
      {/* Brand Header */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link to="/brands" className="text-gray-600 hover:text-gray-900">
            Brands
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="font-medium">{brand.name}</span>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-32 h-32 mb-6 md:mb-0 md:mr-8">
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{brand.name}</h1>
              <p className="text-gray-600 mb-4">{brand.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {brand.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <Check size={16} className="text-green-500 mr-1" />
                    {feature}
                  </div>
                ))}
              </div>
              
              <div className="flex items-center">
                <div className="flex items-center mr-6">
                  <Star size={20} className="text-yellow-400 mr-1" />
                  <span className="font-medium">{brand.rating.toFixed(1)}</span>
                  <span className="text-gray-600 ml-1">({brand.reviewCount} reviews)</span>
                </div>
                <div className="text-gray-600">
                  Established {brand.establishedYear}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Count */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{brand.name} Products</h2>
        <p className="text-gray-600">{products.length} products</p>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No products found for this brand.</p>
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

      {/* Brand Story */}
      {brand.story && (
        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <div className="prose max-w-none">
            {brand.story.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700">
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