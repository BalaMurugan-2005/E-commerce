import React from 'react'
import { Star, StarHalf } from 'lucide-react'
import './RatingStars.css'

const RatingStars = ({ rating, size = 20 }) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="rating-stars">
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          size={size}
          className="full-star"
          aria-hidden="true"
        />
      ))}
      
      {hasHalfStar && (
        <StarHalf
          size={size}
          className="half-star"
          aria-hidden="true"
        />
      )}
      
      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={`empty-${i}`}
          size={size}
          className="empty-star"
          aria-hidden="true"
        />
      ))}
      
      <span className="sr-only">
        Rating: {rating} out of 5 stars
      </span>
    </div>
  )
}

export default RatingStars