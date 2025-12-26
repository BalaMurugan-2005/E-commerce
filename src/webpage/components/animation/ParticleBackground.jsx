// src/webpage/components/animation/ParticleBackground.jsx
import { useEffect, useRef } from 'react'

const ParticleBackground = ({ particleCount = 30 }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const particles = []
    const colors = [
      'rgba(59, 130, 246, 0.5)',
      'rgba(139, 92, 246, 0.5)',
      'rgba(14, 165, 233, 0.5)',
      'rgba(236, 72, 153, 0.5)',
      'rgba(34, 197, 94, 0.5)',
    ]

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div')
      particle.className = 'absolute rounded-full animate-float'
      particle.style.width = `${Math.random() * 20 + 5}px`
      particle.style.height = particle.style.width
      particle.style.background = colors[Math.floor(Math.random() * colors.length)]
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`
      particle.style.filter = 'blur(1px)'
      particle.style.animationDelay = `${Math.random() * 5}s`
      particle.style.opacity = '0.3'
      containerRef.current.appendChild(particle)
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [particleCount])

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
    />
  )
}

export default ParticleBackground