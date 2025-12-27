let animePromise = null;

const loadAnime = () => {
  if (typeof window === 'undefined') return Promise.resolve(null);

  if (!animePromise) {
    animePromise = import('animejs').then(m => m.default);
  }
  return animePromise;
};

export const heroAnimation = async () => {
  const anime = await loadAnime();
  if (!anime) return;

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
    targets: '.hero-buttons a',
    translateY: [30, 0],
    opacity: [0, 1],
    duration: 1000,
    delay: anime.stagger(200, { start: 1200 }),
    easing: 'easeOutExpo'
  });
};

export const featureCardsAnimation = async () => {
  const anime = await loadAnime();
  if (!anime) return;

  anime({
    targets: '.feature-card',
    translateY: [50, 0],
    opacity: [0, 1],
    duration: 1000,
    delay: anime.stagger(100),
    easing: 'easeOutExpo'
  });
};

export const categoryFlipAnimation = async () => {
  const anime = await loadAnime();
  if (!anime) return;

  document.querySelectorAll('.category-card').forEach(card => {
    if (card.dataset.bound) return;
    card.dataset.bound = 'true';

    const inner = card.querySelector('.category-inner');
    if (!inner) return;

    card.addEventListener('mouseenter', () => {
      anime({ targets: inner, rotateY: 180, duration: 600, easing: 'easeInOutSine' });
    });

    card.addEventListener('mouseleave', () => {
      anime({ targets: inner, rotateY: 0, duration: 600, easing: 'easeInOutSine' });
    });
  });
};

export const productCardAnimations = async () => {
  const anime = await loadAnime();
  if (!anime) return;

  anime({
    targets: '.product-card',
    translateY: [60, 0],
    opacity: [0, 1],
    duration: 1200,
    delay: anime.stagger(100, { start: 500 }),
    easing: 'easeOutExpo'
  });
};

export const floatingParticles = () => {
  if (typeof window === 'undefined') return;

  const container = document.querySelector('.particles-background');
  if (!container) return;

  container.innerHTML = '';

  for (let i = 0; i < 15; i++) {
    const p = document.createElement('div');
    p.className = 'particle';

    const size = Math.random() * 60 + 10;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}%`;
    p.style.top = `${Math.random() * 100}%`;
    p.style.opacity = Math.random() * 0.3 + 0.1;
    p.style.animationDelay = `${Math.random() * 5}s`;

    container.appendChild(p);
  }
};
