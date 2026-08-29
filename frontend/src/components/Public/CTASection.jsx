import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const DEFAULT_BG_IMAGE =
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1920&q=80';

const ctaStyles = `
  .cta-section {
    position: relative;
    overflow: hidden;
    color: #fff;
    background: #051C36;
  }

  /* ── Photo de fond avec effet Ken Burns (identique en esprit à PublicHero) ── */
  @keyframes ctaZoom {
    0%   { transform: scale(1.05) translate(0, 0); }
    50%  { transform: scale(1.13) translate(-1.5%, -1.5%); }
    100% { transform: scale(1.05) translate(0, 0); }
  }
  .cta-section .cta-photo {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    animation: ctaZoom 22s ease-in-out infinite;
    will-change: transform;
  }

  /* Overlay allégé et centré : la photo reste le sujet, le voile garantit
     la lisibilité du texte désormais centré. */
  .cta-section .cta-overlay {
    position: absolute;
    inset: 0;
    background: radial-gradient(120% 100% at 50% 40%, rgba(3,20,41,0.55) 0%, rgba(5,56,118,0.68) 45%, rgba(3,20,41,0.85) 100%);
  }
  .cta-section .cta-vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(80% 60% at 50% 50%, rgba(3,20,41,0.15) 0%, transparent 65%);
  }

  /* Grille subtile, cohérente avec PublicHero */
  .cta-section .cta-grid {
    position: absolute;
    inset: 0;
    opacity: 0.12;
    background-image: linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px);
    background-size: 56px 56px;
  }

  /* Orbes lumineux flottants, même famille que PublicHero */
  @keyframes ctaFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-16px); }
  }
  .cta-section .cta-orb {
    position: absolute;
    border-radius: 999px;
    filter: blur(90px);
    animation: ctaFloat 7s ease-in-out infinite;
    pointer-events: none;
  }
  .cta-section .cta-orb-1 {
    width: 20rem; height: 20rem;
    background: rgba(103,232,249,.16);
    top: -4rem; left: 50%;
    transform: translateX(-70%);
  }
  .cta-section .cta-orb-2 {
    width: 16rem; height: 16rem;
    background: rgba(85,221,181,.14);
    bottom: -3rem; left: 50%;
    transform: translateX(20%);
    animation-delay: 2.5s;
  }

  .cta-section .cta-badge {
    display: inline-flex;
    align-items: center;
    gap: .5rem;
    font-size: .7rem;
    font-weight: 700;
    letter-spacing: .12em;
    text-transform: uppercase;
    padding: .5rem 1.1rem;
    border-radius: 999px;
    background: rgba(255,255,255,.14);
    color: #fff;
    border: 1px solid rgba(255,255,255,.28);
    backdrop-filter: blur(6px);
    font-family: 'Syne', sans-serif;
  }
  .cta-section .cta-title {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    line-height: 1.14;
    letter-spacing: -.02em;
    font-size: clamp(1.9rem, 3.6vw, 3rem);
    max-width: 22ch;
    margin-left: auto;
    margin-right: auto;
    text-shadow: 0 4px 28px rgba(0,0,0,.55);
  }
  .cta-section .cta-highlight {
    background: linear-gradient(90deg, #55DDB5 0%, #5EEAD4 55%, #60A5FA 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    filter: drop-shadow(0 2px 10px rgba(0,0,0,.5));
  }
  .cta-section .cta-subtitle {
    color: rgba(255,255,255,.92);
    font-size: 1.05rem;
    line-height: 1.7;
    max-width: 46ch;
    margin-left: auto;
    margin-right: auto;
    text-shadow: 0 2px 16px rgba(0,0,0,.5);
  }
  .cta-section .cta-feature {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .65rem;
    padding: .6rem .9rem;
    border-radius: 12px;
    background: rgba(3,20,41,.35);
    border: 1px solid rgba(255,255,255,.18);
    backdrop-filter: blur(6px);
  }
  .cta-section .cta-feature-icon {
    width: 34px;
    height: 34px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,.22);
    color: #fff;
  }
  .cta-section .cta-feature-label {
    font-size: .8rem;
    font-weight: 600;
    line-height: 1.3;
    color: #fff;
  }
  .cta-section .cta-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: .9rem;
    background: linear-gradient(135deg, #0B74C1 0%, #2AACB2 55%, #55DDB5 100%);
    color: #fff;
    font-weight: 700;
    font-family: 'Syne', sans-serif;
    font-size: .95rem;
    padding: .35rem .35rem .35rem 1.6rem;
    border-radius: 999px;
    text-decoration: none;
    box-shadow: 0 14px 34px rgba(3,20,41,.45);
    transition: transform .3s ease, box-shadow .3s ease;
  }
  .cta-section .cta-btn-primary:hover,
  .cta-section .cta-btn-primary:focus-visible {
    transform: translateY(-3px);
    box-shadow: 0 18px 40px rgba(42,172,178,.45);
  }
  .cta-section .cta-btn-primary:focus-visible {
    outline: 2px solid #55DDB5;
    outline-offset: 3px;
  }
  .cta-section .cta-btn-icon {
    width: 40px;
    height: 40px;
    border-radius: 999px;
    background: rgba(255,255,255,.22);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: transform .3s ease;
  }
  .cta-section .cta-btn-primary:hover .cta-btn-icon {
    transform: translateX(3px);
  }
  .cta-section .cta-btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: .6rem;
    background: rgba(3,20,41,.35);
    color: #fff;
    font-weight: 600;
    font-family: 'Syne', sans-serif;
    font-size: .9rem;
    padding: .9rem 1.6rem;
    border-radius: 999px;
    text-decoration: none;
    border: 1px solid rgba(255,255,255,.32);
    backdrop-filter: blur(6px);
    transition: all .3s ease;
  }
  .cta-section .cta-btn-secondary:hover,
  .cta-section .cta-btn-secondary:focus-visible {
    background: rgba(255,255,255,.16);
    transform: translateY(-3px);
  }

  @media (max-width: 768px) {
    .cta-section .cta-overlay {
      background: radial-gradient(140% 100% at 50% 30%, rgba(3,20,41,0.75) 0%, rgba(5,56,118,0.72) 50%, rgba(3,20,41,0.9) 100%);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .cta-section .cta-photo,
    .cta-section .cta-orb {
      animation: none;
    }
  }
`;

const renderTitle = (title, highlight) => {
  if (!highlight || typeof title !== 'string' || !title.includes(highlight)) return title;
  const idx = title.indexOf(highlight);
  return (
    <>
      {title.slice(0, idx)}
      <span className="cta-highlight">{highlight}</span>
      {title.slice(idx + highlight.length)}
    </>
  );
};

const renderAction = (action, className, withIconCircle) => {
  if (!action) return null;
  const content = (
    <>
      <span>{action.label}</span>
      {withIconCircle && action.icon !== null && (
        <span className="cta-btn-icon" aria-hidden="true">
          {action.icon || <ArrowRight size={18} />}
        </span>
      )}
    </>
  );
  if (action.to) {
    return (
      <Link to={action.to} className={className}>
        {content}
      </Link>
    );
  }
  if (action.href) {
    return (
      <a href={action.href} className={className} target={action.external ? '_blank' : undefined} rel={action.external ? 'noopener noreferrer' : undefined}>
        {content}
      </a>
    );
  }
  if (action.onClick) {
    return (
      <button type="button" onClick={action.onClick} className={className}>
        {content}
      </button>
    );
  }
  return null;
};

/**
 * CTASection — bloc de conversion réutilisable (photo animée + overlay
 * centré), harmonisé avec le traitement visuel de PublicHero
 * (Ken Burns, grille, orbes) tout en restant distinct du Footer (gradient
 * plein, sans photo). Contenu (texte + boutons) centré horizontalement.
 */
const CTASection = ({
  badge,
  title,
  highlight,
  subtitle,
  features,
  primaryAction,
  secondaryAction,
  backgroundImage = DEFAULT_BG_IMAGE,
  className = '',
}) => {
  return (
    <section className={`cta-section py-16 md:py-20 ${className}`}>
      <style>{ctaStyles}</style>
      <img src={backgroundImage} alt="" className="cta-photo" aria-hidden="true" />
      <div className="cta-overlay" />
      <div className="cta-vignette" />
      <div className="cta-grid" />
      <div className="cta-orb cta-orb-1" />
      <div className="cta-orb cta-orb-2" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto text-center flex flex-col items-center"
        >
          {badge && <span className="cta-badge mb-5 inline-flex">{badge}</span>}
          <h2 className="cta-title mt-4 mb-5">{renderTitle(title, highlight)}</h2>
          {subtitle && <p className="cta-subtitle mb-7">{subtitle}</p>}

          {features && features.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 max-w-xl mx-auto w-full">
              {features.map(({ icon: FeatureIcon, label }, i) => (
                <div key={i} className="cta-feature">
                  <span className="cta-feature-icon" aria-hidden="true">
                    <FeatureIcon size={16} />
                  </span>
                  <span className="cta-feature-label">{label}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-4">
            {renderAction(primaryAction, 'cta-btn-primary', true)}
            {renderAction(secondaryAction, 'cta-btn-secondary', false)}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;