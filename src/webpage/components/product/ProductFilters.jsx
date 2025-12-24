import React, { useState } from 'react'
import { Filter, X } from 'lucide-react'
import './ProductFilters.css'

const ProductFilters = ({
  categories,
  brands,
  priceRange,
  onFilterChange,
  selectedFilters
}) => {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  const handleCategoryChange = (categoryId) => {
    const newCategories = selectedFilters.categories.includes(categoryId)
      ? selectedFilters.categories.filter(id => id !== categoryId)
      : [...selectedFilters.categories, categoryId]
    
    onFilterChange({ ...selectedFilters, categories: newCategories })
  }

  const handleBrandChange = (brandId) => {
    const newBrands = selectedFilters.brands.includes(brandId)
      ? selectedFilters.brands.filter(id => id !== brandId)
      : [...selectedFilters.brands, brandId]
    
    onFilterChange({ ...selectedFilters, brands: newBrands })
  }

  const handlePriceChange = (min, max) => {
    onFilterChange({ ...selectedFilters, priceRange: { min, max } })
  }

  const clearFilters = () => {
    onFilterChange({
      categories: [],
      brands: [],
      priceRange: { min: 0, max: priceRange.max }
    })
  }

  const sidebarClass = isMobileFiltersOpen ? 'visible-mobile' : 'hidden-mobile'

  return (
    <div className="product-filters">
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsMobileFiltersOpen(true)}
        className="mobile-filter-button"
        aria-label="Open filters"
      >
        <Filter size={24} />
      </button>

      {/* Filters Sidebar */}
      <div className={`filters-sidebar ${sidebarClass}`}>
        <div className="filters-content">
          {/* Mobile Header */}
          <div className="mobile-header">
            <h3 className="mobile-header-title">Filters</h3>
            <button
              onClick={() => setIsMobileFiltersOpen(false)}
              className="mobile-close-button"
              aria-label="Close filters"
            >
              <X size={24} />
            </button>
          </div>

          {/* Desktop Header */}
          <div className="desktop-header">
            <h3 className="desktop-header-title">Filters</h3>
            <button
              onClick={clearFilters}
              className="clear-filters-button"
            >
              Clear all
            </button>
          </div>

          {/* Price Range */}
          <div className="filter-section">
            <h4 className="filter-section-title">Price Range</h4>
            <div className="price-range-container">
              <input
                type="range"
                min="0"
                max={priceRange.max}
                value={selectedFilters.priceRange.max}
                onChange={(e) => handlePriceChange(0, parseInt(e.target.value))}
                className="price-slider"
                aria-label="Price range slider"
              />
              <div className="price-labels">
                <span>$0</span>
                <span>${selectedFilters.priceRange.max}</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="filter-section">
            <h4 className="filter-section-title">Categories</h4>
            <div className="filter-options">
              {categories.map(category => (
                <label key={category.id} className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedFilters.categories.includes(category.id)}
                    onChange={() => handleCategoryChange(category.id)}
                    className="filter-checkbox"
                    aria-label={`Filter by ${category.name} category`}
                  />
                  <span className="filter-label">{category.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div className="filter-section">
            <h4 className="filter-section-title">Brands</h4>
            <div className="filter-options">
              {brands.map(brand => (
                <label key={brand.id} className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedFilters.brands.includes(brand.id)}
                    onChange={() => handleBrandChange(brand.id)}
                    className="filter-checkbox"
                    aria-label={`Filter by ${brand.name} brand`}
                  />
                  <span className="filter-label">{brand.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Mobile Apply Button */}
          <button
            onClick={() => setIsMobileFiltersOpen(false)}
            className="mobile-apply-button"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductFilters