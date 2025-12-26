// src/components/animation/AnimatedRoutes.jsx
import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import anime from 'animejs'

const AnimatedRoutes = ({ children }) => {
  const location = useLocation()

  useEffect(() => {
    // Page enter animation
    anime({
      targets: '.page-content',
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 600,
      easing: 'easeOutCubic',
    })

    // Animate all elements with data-animate attribute
    anime({
      targets: '[data-animate]',
      translateY: [20, 0],
      opacity: [0, 1],
      delay: anime.stagger(100),
      duration: 800,
      easing: 'easeOutCubic',
    })

    // Animate buttons
    anime({
      targets: 'button',
      scale: [0.95, 1],
      opacity: [0, 1],
      delay: anime.stagger(100, { start: 300 }),
      duration: 500,
      easing: 'spring(1, 80, 10, 0)',
    })

    // Animate form inputs
    anime({
      targets: '.form-input',
      translateX: [-20, 0],
      opacity: [0, 1],
      delay: anime.stagger(100, { start: 400 }),
      duration: 600,
      easing: 'easeOutElastic(1, .8)',
    })
  }, [location])

  return children
}

export default AnimatedRoutes