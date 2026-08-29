// ==================== PublicHero ====================
// Hero identique à celui de Home.jsx, réutilisable sur toutes les pages
// publiques. Même photo, mêmes overlays, mêmes animations (heroZoom,
// hero-photo, float/animate-float), même grille, mêmes orbes, et surtout
// même hauteur — quel que soit le contenu (avec ou sans stats).
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';

const HERO_IMAGE =
  'https://www.dmi40.fr/wp-content/uploads/2026/05/Actualite.webp';

const heroStyles = `
  .public-hero {
    position: relative;
    overflow: hidden;
    color: #fff;
    /* Le dégradé de fond ne sert que de fallback pendant le chargement de
       l'image : il ne doit JAMAIS teinter la photo elle-même (voir overlay
       plus bas, désormais bien plus léger). */
    background: linear-gradient(135deg, #053876 0%, #1D5B9B 35%, #4681B7 60%, #72A5CE 80%, #A6C3D7 100%);
    min-height: 460px;
  }
  @media (max-width: 1024px) {
    .public-hero { min-height: 560px; } /* la carte de stats passe sous le texte en dessous de lg */
  }
  @media (max-width: 640px) {
    .public-hero { min-height: 620px; }
  }

  /* ── Animations identiques à Home.jsx ── */
  @keyframes heroZoom {
    0%   { transform: scale(1.06) translate(0, 0); }
    50%  { transform: scale(1.14) translate(-1.5%, -1.5%); }
    100% { transform: scale(1.06) translate(0, 0); }
  }
  .public-hero .hero-photo {
    animation: heroZoom 20s ease-in-out infinite;
    will-change: transform;
    /* Plus de saturate/contrast/brightness poussés : c'est ce qui donnait
       cet aspect "lavé" par la couleur principale. On laisse l'image
       telle quelle, nette. */
    filter: none;
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-16px); }
  }
  .public-hero .animate-float { animation: float 6s ease-in-out infinite; }

  .public-hero .hero-grid {
    background-image: linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px);
    background-size: 56px 56px;
  }

  .public-hero .ph-badge {
    display: inline-flex;
    align-items: center;
    gap: .5rem;
    margin-bottom: 1.75rem;
    padding: .5rem 1rem;
    border-radius: 999px;
    background: rgba(255,255,255,.10);
    border: 1px solid rgba(255,255,255,.25);
    backdrop-filter: blur(6px);
  }
  .public-hero .ph-badge-dot {
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: #55DDB5;
    animation: ph-pulse 2s ease-in-out infinite;
  }
  @keyframes ph-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: .35; }
  }
  .public-hero .ph-badge-label {
    color: #fff;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 11px;
    letter-spacing: .2em;
    text-transform: uppercase;
  }
  .public-hero .ph-title {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    letter-spacing: -.02em;
    line-height: 1.15;
    margin-bottom: 1.5rem;
    font-size: clamp(1.75rem, 5vw, 4.2rem);
    color: #fff;
    /* Ombre renforcée pour garder le texte lisible même avec un overlay
       plus léger sur l'image. */
    text-shadow: 0 2px 24px rgba(0,0,0,.55);
  }
  .public-hero .ph-highlight { position: relative; display: inline-block; }
  .public-hero .ph-highlight-glow {
    position: absolute;
    inset: -.5rem;
    background: linear-gradient(90deg, #55DDB5, #72A5CE);
    filter: blur(30px);
    opacity: .3;
  }
  .public-hero .ph-highlight-text {
    position: relative;
    background: linear-gradient(90deg, #55DDB5 0%, #5EEAD4 55%, #60A5FA 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    filter: drop-shadow(0 2px 10px rgba(0,0,0,.5));
  }
  .public-hero .ph-subtitle {
    color: rgba(255,255,255,.92);
    font-size: clamp(1rem, 1.4vw, 1.25rem);
    line-height: 1.7;
    margin-bottom: 2rem;
    max-width: 40rem;
    text-shadow: 0 1px 14px rgba(0,0,0,.5);
  }
  .public-hero .ph-actions { display: flex; flex-wrap: wrap; gap: 1rem; }
  .public-hero .ph-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: .6rem;
    padding: .9rem 1.75rem;
    border-radius: 999px;
    font-weight: 600;
    font-family: 'Syne', sans-serif;
    color: #fff;
    background: linear-gradient(135deg, #0B74C1 0%, #2AACB2 55%, #55DDB5 100%);
    box-shadow: 0 10px 28px rgba(11,116,193,.30);
    transition: transform .3s ease, box-shadow .3s ease, filter .3s ease;
  }
  .public-hero .ph-btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 36px rgba(42,172,178,.35);
    filter: brightness(1.08);
  }
  .public-hero .ph-btn-outline {
    display: inline-flex;
    align-items: center;
    gap: .6rem;
    padding: .9rem 1.75rem;
    border-radius: 999px;
    font-weight: 600;
    font-family: 'Syne', sans-serif;
    color: #fff;
    border: 1px solid rgba(255,255,255,.35);
    background: rgba(0,0,0,.15);
    backdrop-filter: blur(4px);
    transition: all .3s ease;
  }
  .public-hero .ph-btn-outline:hover {
    border-color: rgba(255,255,255,.7);
    background: rgba(255,255,255,.15);
    transform: translateY(-3px);
  }
  .public-hero .ph-chip {
    display: inline-flex;
    align-items: center;
    gap: .35rem;
    margin-top: 1rem;
    color: #55DDB5;
    font-size: .85rem;
    font-weight: 600;
    transition: color .2s ease;
  }
  .public-hero .ph-chip:hover { color: #fff; }
  .public-hero .ph-breadcrumb {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: .4rem;
    margin-bottom: 1rem;
    font-size: .82rem;
    color: rgba(255,255,255,.75);
  }
  .public-hero .ph-breadcrumb a { color: rgba(255,255,255,.75); transition: color .2s ease; }
  .public-hero .ph-breadcrumb a:hover { color: #fff; }

  /* Carte vitrée de stats (colonne droite optionnelle, façon Home) */
  .public-hero .ph-glass {
    position: relative;
    border-radius: 1.5rem;
    padding: 1.75rem;
    background: rgba(255,255,255,.14);
    border: 1px solid rgba(255,255,255,.30);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    box-shadow: 0 24px 60px rgba(0,0,0,.30);
    overflow: hidden;
  }
  .public-hero .ph-glass-item {
    background: rgba(255,255,255,.10);
    border: 1px solid rgba(255,255,255,.20);
    border-radius: 1rem;
    padding: 1rem;
    text-align: center;
    backdrop-filter: blur(10px);
    transition: background .3s ease, transform .3s ease;
  }
  .public-hero .ph-glass-item:hover {
    background: rgba(255,255,255,.22);
    transform: translateY(-3px);
  }
  .public-hero .ph-glass-item-value { color: #fff; font-family: 'Syne', sans-serif; }
  .public-hero .ph-glass-item-label { color: rgba(255,255,255,.85); }

  @media (max-width: 768px) {
    .public-hero .ph-title { font-size: clamp(1.6rem, 8vw, 2.2rem); }
  }
`;

const HeroHighlight = ({ text }) => (
  <span className="ph-highlight">
    <span className="ph-highlight-glow" aria-hidden="true" />
    <span className="ph-highlight-text">{text}</span>
  </span>
);

const renderTitle = (title, highlight) => {
  if (typeof title !== 'string' || !highlight) return title;
  const idx = title.indexOf(highlight);
  if (idx === -1) return title;
  const before = title.slice(0, idx);
  const after = title.slice(idx + highlight.length);
  return (
    <>
      {before}
      <HeroHighlight text={highlight} />
      {after}
    </>
  );
};

const PublicHero = ({
  badge = 'Croissance & Innovation',
  breadcrumb,
  title,
  highlight,
  subtitle,
  primaryAction,
  secondaryAction,
  tertiaryLink,
  stats,
  align = 'center',
  className = '',
  children,
}) => {
  const isSplit = !!stats?.length;

  return (
    <section
      className={`public-hero relative overflow-hidden flex items-center py-8 md:py-10 ${className}`}
    >
      <style>{heroStyles}</style>

      {/* Photo de fond (identique à Home.jsx, avec animation Ken Burns) */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt=""
          className="hero-photo w-full h-full object-cover object-center"
        />
      </div>

      {/* Overlay très léger, uniquement pour garantir la lisibilité du
          texte : un voile neutre noir/transparent, plus le dégradé bleu
          de la marque qui "mangeait" l'image. L'image reste donc claire
          et nette, indépendamment de la couleur principale du site. */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'linear-gradient(100deg, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.14) 48%, rgba(0,0,0,0.06) 100%)',
        }}
      />

      {/* Vignette très douce, neutre (noir), juste pour ancrer le texte */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 40%, transparent 60%, rgba(0,0,0,0.12) 100%)',
        }}
      />

      {/* Grille subtile */}
      <div
        className="hero-grid absolute inset-0 opacity-[0.14] z-[1]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`,
          backgroundSize: '56px 56px',
        }}
      />

      {/* Orbes lumineux */}
      <div className="absolute w-[26rem] h-[26rem] bg-cyan-300/15 top-10 -left-24 rounded-full filter blur-[100px] animate-float" />
      <div
        className="absolute w-[22rem] h-[22rem] bg-teal-300/15 bottom-0 right-0 rounded-full filter blur-[110px] animate-float"
        style={{ animationDelay: '2s' }}
      />
      <div
        className="absolute w-64 h-64 bg-white/10 top-1/3 right-1/4 rounded-full filter blur-[90px] animate-float"
        style={{ animationDelay: '4s' }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className={isSplit ? 'grid lg:grid-cols-[1.2fr_0.8fr] gap-14 items-center' : 'max-w-4xl mx-auto'}>
          <div className={align === 'center' && !isSplit ? 'text-center' : 'text-center lg:text-left'}>
            {breadcrumb && <div className="ph-breadcrumb justify-center lg:justify-start">{breadcrumb}</div>}

            {badge && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="ph-badge"
              >
                <span className="ph-badge-dot" />
                <span className="ph-badge-label">{badge}</span>
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="ph-title"
            >
              {renderTitle(title, highlight)}
            </motion.h1>

            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className={`ph-subtitle ${align === 'center' && !isSplit ? 'mx-auto' : 'mx-auto lg:mx-0'}`}
              >
                {subtitle}
              </motion.p>
            )}

            {(primaryAction || secondaryAction) && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className={`ph-actions ${align === 'center' && !isSplit ? 'justify-center' : 'justify-center lg:justify-start'}`}
              >
                {primaryAction &&
                  (primaryAction.to ? (
                    <Link to={primaryAction.to} className="ph-btn-primary group">
                      {primaryAction.label}
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ) : primaryAction.href ? (
                    <a href={primaryAction.href} className="ph-btn-primary group">
                      {primaryAction.icon}
                      {primaryAction.label}
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  ) : (
                    <button type="button" onClick={primaryAction.onClick} className="ph-btn-primary group">
                      {primaryAction.label}
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  ))}
                {secondaryAction &&
                  (secondaryAction.to ? (
                    <Link to={secondaryAction.to} className="ph-btn-outline">
                      {secondaryAction.label}
                      {secondaryAction.icon}
                    </Link>
                  ) : secondaryAction.href ? (
                    <a href={secondaryAction.href} className="ph-btn-outline">
                      {secondaryAction.icon}
                      {secondaryAction.label}
                    </a>
                  ) : (
                    <button type="button" onClick={secondaryAction.onClick} className="ph-btn-outline">
                      {secondaryAction.label}
                      {secondaryAction.icon}
                    </button>
                  ))}
              </motion.div>
            )}

            {tertiaryLink && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.55 }}>
                <Link to={tertiaryLink.to} className="ph-chip">
                  {tertiaryLink.label} <ChevronRight size={14} />
                </Link>
              </motion.div>
            )}

            {children}
          </div>

          {isSplit && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative mx-auto max-w-sm lg:max-w-none"
            >
              <div className="ph-glass">
                <div className="grid grid-cols-2 gap-3">
                  {stats.map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.08 }}
                      className="ph-glass-item"
                    >
                      {s.icon && <div className="text-lg mb-1 opacity-80">{s.icon}</div>}
                      <div className="ph-glass-item-value font-extrabold text-xl">{s.value}</div>
                      <div className="ph-glass-item-label text-[11px] leading-tight mt-0.5">{s.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PublicHero;