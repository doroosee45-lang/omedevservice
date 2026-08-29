// ==================== PartnersCarousel ====================
// Carrousel de logos/marques partenaires réutilisable — même interaction
// que TestimonialsCarousel (flèches, indicateurs, swipe tactile, autoplay
// avec pause au survol, clavier), adapté à des groupes de badges plutôt
// qu'une carte de contenu unique.
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const carouselStyles = `
  .partners-carousel .pc-badge {
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
  .partners-carousel.pc-glass .pc-badge {
    background: rgba(255,255,255,.10);
    color: #fff;
    border-color: rgba(255,255,255,.22);
  }
  .partners-carousel .pc-title {
    font-size: clamp(1.5rem, 3vw, 2.25rem);
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -.02em;
    margin: 1rem 0;
    font-family: 'Syne', sans-serif;
    color: #053876;
  }
  .partners-carousel.pc-glass .pc-title { color: #fff; }
  .partners-carousel .pc-divider {
    width: 64px;
    height: 4px;
    background: linear-gradient(90deg, #0B74C1, #2AACB2, #55DDB5);
    border-radius: 99px;
    margin: 0 auto 1.25rem;
  }
  .partners-carousel .pc-subtitle {
    color: #25364A;
    max-width: 42rem;
    margin: 0 auto;
    line-height: 1.7;
  }
  .partners-carousel.pc-glass .pc-subtitle { color: rgba(255,255,255,.65); }
  .partners-carousel .pc-chip {
    width: 9.5rem;
    height: 5.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: #fff;
    border: 1px solid rgba(5,56,118,.09);
    border-radius: 18px;
    box-shadow: 0 12px 30px rgba(5,56,118,.08);
    font-size: 1rem;
    font-weight: 700;
    font-family: 'Syne', sans-serif;
    color: #053876;
    transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
    cursor: default;
  }
  .partners-carousel .pc-chip:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 44px rgba(11,116,193,.16);
    border-color: rgba(42,172,178,.35);
  }
  .partners-carousel.pc-glass .pc-chip {
    background: rgba(255,255,255,.08);
    border-color: rgba(255,255,255,.16);
    box-shadow: none;
    color: #fff;
  }
  .partners-carousel.pc-glass .pc-chip:hover { background: rgba(255,255,255,.14); }
  .partners-carousel .pc-arrow {
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
  .partners-carousel .pc-arrow:hover {
    background: linear-gradient(135deg, #0B74C1, #2AACB2);
    color: #fff;
    border-color: transparent;
    transform: translateY(-2px);
  }
  .partners-carousel.pc-glass .pc-arrow {
    background: rgba(255,255,255,.10);
    border-color: rgba(255,255,255,.22);
    color: #fff;
    box-shadow: none;
  }
  .partners-carousel .pc-dots {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .5rem;
    margin-top: 2rem;
  }
  .partners-carousel .pc-dot {
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: rgba(5,56,118,.20);
    transition: all .3s ease;
    cursor: pointer;
    border: none;
    padding: 0;
  }
  .partners-carousel.pc-glass .pc-dot { background: rgba(255,255,255,.25); }
  .partners-carousel .pc-dot.active {
    width: 26px;
    background: linear-gradient(90deg, #0B74C1, #2AACB2);
  }
`;

const chunk = (arr, size) => {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
};

/**
 * items: string[] (noms des marques/partenaires)
 * variant: 'light' (défaut) | 'glass' (pour sections sombres)
 */
const PartnersCarousel = ({
  items = [],
  badge,
  title,
  subtitle,
  perSlide = 4,
  variant = 'light',
  autoplayMs = 5000,
  className = '',
}) => {
  const slides = chunk(items, Math.max(1, perSlide));
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
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

  const current = slides[index];

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  return (
    <div
      className={`partners-carousel ${variant === 'glass' ? 'pc-glass' : ''} ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <style>{carouselStyles}</style>

      {(badge || title || subtitle) && (
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          {badge && <span className="pc-badge">{badge}</span>}
          {title && <h2 className="pc-title">{title}</h2>}
          <div className="pc-divider" />
          {subtitle && <p className="pc-subtitle">{subtitle}</p>}
        </div>
      )}

      <div className="flex items-center gap-4 max-w-3xl mx-auto">
        {count > 1 && (
          <button type="button" className="pc-arrow" onClick={goPrev} aria-label="Partenaires précédents">
            <ChevronLeft size={20} />
          </button>
        )}

        <div
          className="flex-1 min-w-0 overflow-hidden"
          tabIndex={0}
          role="group"
          aria-roledescription="carousel"
          aria-label="Partenaires officiels"
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') goNext();
            if (e.key === 'ArrowLeft') goPrev();
          }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
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
              className="flex flex-wrap justify-center gap-3 cursor-grab active:cursor-grabbing"
            >
              {current.map((brand) => (
                <span key={brand} className="pc-chip">{brand}</span>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {count > 1 && (
          <button type="button" className="pc-arrow" onClick={goNext} aria-label="Partenaires suivants">
            <ChevronRight size={20} />
          </button>
        )}
      </div>

      {count > 1 && (
        <div className="pc-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`pc-dot ${i === index ? 'active' : ''}`}
              onClick={() => go(i)}
              aria-label={`Aller au groupe de partenaires ${i + 1}`}
              aria-current={i === index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PartnersCarousel;
