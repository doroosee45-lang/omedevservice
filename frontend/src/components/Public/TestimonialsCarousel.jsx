// ==================== TestimonialsCarousel ====================
// Carrousel de témoignages réutilisable pour les pages publiques — reprend
// le Design System de Home (badge pill, titre Syne + divider dégradé, card
// blanche avec icône Quote, étoiles). Remplace les grilles statiques de
// témoignages par un vrai carrousel : flèches, indicateurs, swipe tactile,
// autoplay avec pause au survol, clavier.
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const carouselStyles = `
  .testimonials-carousel {
    --tc-navy: #053876;
    --tc-blue: #0B74C1;
    --tc-turquoise: #2AACB2;
    --tc-energy: #55DDB5;
    --tc-text: #25364A;
  }
  .testimonials-carousel .tc-badge {
    display: inline-flex;
    align-items: center;
    gap: .5rem;
    font-size: .7rem;
    font-weight: 700;
    letter-spacing: .12em;
    text-transform: uppercase;
    padding: .5rem 1.1rem;
    border-radius: 999px;
    background: rgba(11,116,193,.08);
    color: #0B74C1;
    border: 1px solid rgba(11,116,193,.18);
    font-family: 'Syne', sans-serif;
  }
  .testimonials-carousel .tc-title {
    font-size: clamp(1.75rem, 3.5vw, 2.75rem);
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -.02em;
    margin: 1rem 0;
    font-family: 'Syne', sans-serif;
    color: #053876;
  }
  .testimonials-carousel .tc-divider {
    width: 64px;
    height: 4px;
    background: linear-gradient(90deg, #0B74C1, #2AACB2, #55DDB5);
    border-radius: 99px;
    margin: 0 auto 1.25rem;
  }
  .testimonials-carousel .tc-subtitle {
    color: var(--tc-text);
    max-width: 42rem;
    margin: 0 auto;
    line-height: 1.7;
  }
  .testimonials-carousel .tc-card {
    background: #fff;
    border: 1px solid rgba(5,56,118,.09);
    border-radius: 22px;
    box-shadow: 0 20px 50px rgba(5,56,118,.10);
    padding: 2.25rem;
  }
  .testimonials-carousel.tc-glass .tc-card {
    background: rgba(255,255,255,.08);
    border: 1px solid rgba(255,255,255,.16);
    box-shadow: none;
    backdrop-filter: blur(10px);
  }
  .testimonials-carousel.tc-glass .tc-quote-text { color: rgba(255,255,255,.85); }
  .testimonials-carousel.tc-glass .tc-name { color: #fff; }
  .testimonials-carousel.tc-glass .tc-role { color: rgba(255,255,255,.55); }
  .testimonials-carousel .tc-quote-icon {
    color: var(--tc-turquoise);
    opacity: .4;
    margin-bottom: 1rem;
  }
  .testimonials-carousel .tc-quote-text {
    color: var(--tc-text);
    font-size: 1.05rem;
    line-height: 1.75;
    font-style: italic;
    min-height: 5.25rem;
  }
  .testimonials-carousel .tc-name { color: #053876; font-weight: 700; }
  .testimonials-carousel.tc-glass .tc-card .tc-name { color: #fff; }
  .testimonials-carousel .tc-role { color: #64748b; font-size: .8rem; }
  .testimonials-carousel .tc-avatar {
    width: 3rem;
    height: 3rem;
    border-radius: 999px;
    object-fit: cover;
    border: 2px solid rgba(85,221,181,.4);
  }
  .testimonials-carousel .tc-arrow {
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    border: 1px solid rgba(5,56,118,.14);
    color: #053876;
    box-shadow: 0 8px 20px rgba(5,56,118,.10);
    transition: all .25s ease;
    cursor: pointer;
    flex-shrink: 0;
  }
  .testimonials-carousel .tc-arrow:hover {
    background: linear-gradient(135deg, #0B74C1, #2AACB2);
    color: #fff;
    border-color: transparent;
    transform: translateY(-2px);
  }
  .testimonials-carousel.tc-glass .tc-arrow {
    background: rgba(255,255,255,.10);
    border-color: rgba(255,255,255,.22);
    color: #fff;
    box-shadow: none;
  }
  .testimonials-carousel .tc-dots {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .5rem;
    margin-top: 2rem;
  }
  .testimonials-carousel .tc-dot {
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: rgba(5,56,118,.20);
    transition: all .3s ease;
    cursor: pointer;
    border: none;
    padding: 0;
  }
  .testimonials-carousel.tc-glass .tc-dot { background: rgba(255,255,255,.25); }
  .testimonials-carousel .tc-dot.active {
    width: 26px;
    background: linear-gradient(90deg, #0B74C1, #2AACB2);
  }
`;

const Stars = ({ rating }) => (
  <div className="flex gap-0.5" aria-label={`${rating} sur 5 étoiles`}>
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={14} className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-transparent text-gray-300'} />
    ))}
  </div>
);

/**
 * items: [{ id?, name, role, content, avatar, rating? }]
 * variant: 'light' (carte blanche, pour sections claires — défaut, comme Home)
 *        | 'glass' (carte vitrée, pour sections sombres)
 */
const TestimonialsCarousel = ({
  items = [],
  badge = 'Témoignages',
  title = 'Ils nous font confiance',
  subtitle,
  variant = 'light',
  autoplayMs = 6000,
  className = '',
}) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const count = items.length;
  const timerRef = useRef(null);

  const go = useCallback((next) => {
    setDirection(next > index || (index === count - 1 && next === 0) ? 1 : -1);
    setIndex(((next % count) + count) % count);
  }, [index, count]);

  const goNext = useCallback(() => go(index + 1), [go, index]);
  const goPrev = useCallback(() => go(index - 1), [go, index]);

  useEffect(() => {
    if (paused || count <= 1 || !autoplayMs) return;
    timerRef.current = setInterval(goNext, autoplayMs);
    return () => clearInterval(timerRef.current);
  }, [paused, count, autoplayMs, goNext]);

  if (count === 0) return null;

  const current = items[index];

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  return (
    <div
      className={`testimonials-carousel ${variant === 'glass' ? 'tc-glass' : ''} ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <style>{carouselStyles}</style>

      {(badge || title || subtitle) && (
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          {badge && <span className="tc-badge">{badge}</span>}
          {title && <h2 className="tc-title">{title}</h2>}
          <div className="tc-divider" />
          {subtitle && <p className="tc-subtitle">{subtitle}</p>}
        </div>
      )}

      <div className="flex items-center gap-4 max-w-3xl mx-auto">
        {count > 1 && (
          <button type="button" className="tc-arrow" onClick={goPrev} aria-label="Témoignage précédent">
            <ChevronLeft size={20} />
          </button>
        )}

        <div
          className="flex-1 min-w-0 overflow-hidden"
          tabIndex={0}
          role="group"
          aria-roledescription="carousel"
          aria-label="Témoignages clients"
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') goNext();
            if (e.key === 'ArrowLeft') goPrev();
          }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id ?? index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 0.68, 0, 1] }}
              drag={count > 1 ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(e, info) => {
                if (info.offset.x < -60) goNext();
                else if (info.offset.x > 60) goPrev();
              }}
              className="tc-card text-center cursor-grab active:cursor-grabbing"
            >
              <Quote size={30} className="tc-quote-icon mx-auto" />
              <p className="tc-quote-text">&ldquo;{current.content}&rdquo;</p>
              <div className="flex items-center justify-center gap-3 mt-6">
                {current.avatar && <img src={current.avatar} alt={current.name} className="tc-avatar" />}
                <div className="text-left">
                  <p className="tc-name text-sm">{current.name}</p>
                  <p className="tc-role">{current.role}</p>
                </div>
                {typeof current.rating === 'number' && <Stars rating={current.rating} />}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {count > 1 && (
          <button type="button" className="tc-arrow" onClick={goNext} aria-label="Témoignage suivant">
            <ChevronRight size={20} />
          </button>
        )}
      </div>

      {count > 1 && (
        <div className="tc-dots">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`tc-dot ${i === index ? 'active' : ''}`}
              onClick={() => go(i)}
              aria-label={`Aller au témoignage ${i + 1}`}
              aria-current={i === index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialsCarousel;
