// animations.js
let anime;

// Dynamic import to avoid SSR issues
if (typeof window !== 'undefined') {
  import('animejs').then(module => {
    anime = module.default;
  });
}

export const heroAnimation = () => {
  if (!anime || typeof window === 'undefined') return;
  
  anime({
    targets: '.hero-title span',
    translateY: [30, 0],
    opacity: [0, 1],
    duration: 1200,
    delay: anime.stagger(100),
    easing: 'easeOutExpo'
  });

  anime({
    targets: '.hero-subtitle',
    translateY: [20, 0],
    opacity: [0, 1],
    duration: 1000,
    delay: 800,
    easing: 'easeOutExpo'
  });

  anime({
    targets: '.hero-buttons button',
    translateY: [30, 0],
    opacity: [0, 1],
    duration: 1000,
    delay: anime.stagger(200, {start: 1200}),
    easing: 'easeOutExpo'
  });
};

export const featureCardsAnimation = () => {
  if (!anime || typeof window === 'undefined') return;
  
  anime({
    targets: '.feature-card',
    translateY: [50, 0],
    opacity: [0, 1],
    duration: 1000,
    delay: anime.stagger(100),
    easing: 'easeOutExpo'
  });
};

export const categoryFlipAnimation = () => {
  if (typeof window === 'undefined') return;
  
  const cards = document.querySelectorAll('.category-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      if (!anime) return;
      anime({
        targets: card.querySelector('.category-inner'),
        rotateY: 180,
        duration: 600,
        easing: 'easeInOutSine'
      });
    });
    
    card.addEventListener('mouseleave', () => {
      if (!anime) return;
      anime({
        targets: card.querySelector('.category-inner'),
        rotateY: 0,
        duration: 600,
        easing: 'easeInOutSine'
      });
    });
  });
};

export const productCardAnimations = () => {
  if (!anime || typeof window === 'undefined') return;
  
  anime({
    targets: '.product-card',
    translateY: [60, 0],
    opacity: [0, 1],
    duration: 1200,
    delay: anime.stagger(100, {start: 500}),
    easing: 'easeOutExpo'
  });
};

export const floatingParticles = () => {
  if (typeof window === 'undefined') return;
  
  const particlesContainer = document.querySelector('.particles');
  if (!particlesContainer) return;

  // Clear existing particles
  particlesContainer.innerHTML = '';

  for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * 60 + 10;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const delay = Math.random() * 5;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.opacity = Math.random() * 0.3 + 0.1;
    particle.style.animationDelay = `${delay}s`;
    
    particlesContainer.appendChild(particle);
  }
};