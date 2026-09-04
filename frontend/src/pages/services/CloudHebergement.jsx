import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PublicHero from '../../components/Public/PublicHero'
import useDocumentMeta from '../../hooks/useDocumentMeta'
import TestimonialsCarousel from '../../components/Public/TestimonialsCarousel'
import CTASection from '../../components/Public/CTASection'
import {
  Cloud,
  Database,
  Server,
  Shield,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Clock,
  DollarSign,
  Star,
  Activity,
  Zap,
  HardDrive,
  Award,
  Rocket,
  Layers,
  Gauge,
  LockKeyhole,
  Headphones,
} from 'lucide-react'

/* ============================================================
   DESIGN SYSTEM — Cloud & Hébergement
   Aligné visuellement sur la page About
   ============================================================ */

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&display=swap');

  .omedev-cloud {
    --omedev-navy: #053876;
    --omedev-blue-dark: #1D5B9B;
    --omedev-blue: #0B74C1;
    --omedev-blue-light: #4681B7;
    --omedev-cyan: #72A5CE;
    --omedev-cyan-light: #A6C3D7;
    --omedev-turquoise: #2AACB2;
    --omedev-energy: #55DDB5;
    --omedev-white: #F6F6F7;
    --omedev-gray: #D5DCE1;
    --omedev-dark: #0B1213;
    --omedev-text-secondary: #25364A;

    background: #F6F6F7;
    color: #0B1213;
    font-family: 'DM Sans', sans-serif;
    overflow-x: hidden;
  }

  .omedev-cloud *,
  .omedev-cloud *::before,
  .omedev-cloud *::after {
    box-sizing: border-box;
  }

  .omedev-cloud .container {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  /* ==========================================================
     TYPOGRAPHY
     ========================================================== */

  .omedev-cloud .font-syne {
    font-family: 'Syne', sans-serif;
  }

  .omedev-cloud .section-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: .5rem;
    font-family: 'Syne', sans-serif;
    font-size: .7rem;
    font-weight: 700;
    letter-spacing: .12em;
    text-transform: uppercase;
    padding: .5rem 1.1rem;
    border-radius: 999px;
    background: rgba(11,116,193,.08);
    color: #0B74C1;
    border: 1px solid rgba(11,116,193,.18);
  }

  .omedev-cloud .section-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -.03em;
    margin: 0 0 1rem;
    color: #053876;
  }

  .omedev-cloud .section-subtitle {
    font-size: 1rem;
    color: #25364A;
    max-width: 52ch;
    margin: 0 auto;
    line-height: 1.7;
  }

  .omedev-cloud .divider {
    width: 64px;
    height: 4px;
    background: linear-gradient(
      90deg,
      #0B74C1,
      #2AACB2,
      #55DDB5
    );
    border-radius: 99px;
    margin: 1rem auto 1.5rem;
  }

  /* ==========================================================
     SECTIONS
     ========================================================== */

  .omedev-cloud .section-white {
    background: #fff;
  }

  .omedev-cloud .section-light {
    background: #F6F6F7;
  }

  .omedev-cloud .section-dark {
    background: linear-gradient(
      135deg,
      #053876 0%,
      #1D5B9B 55%,
      #0B74C1 100%
    );
  }

  .omedev-cloud .section-energy {
    background: linear-gradient(
      135deg,
      #0B74C1 0%,
      #2AACB2 55%,
      #55DDB5 100%
    );
  }

  /* ==========================================================
     HERO
     ========================================================== */

  .omedev-cloud .cloud-hero {
    position: relative;
    min-height: 570px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    background: linear-gradient(
      135deg,
      #053876 0%,
      #1D5B9B 35%,
      #4681B7 60%,
      #72A5CE 80%,
      #A6C3D7 100%
    );
    color: #fff;
  }

  .omedev-cloud .hero-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(
        rgba(255,255,255,.08) 1px,
        transparent 1px
      ),
      linear-gradient(
        90deg,
        rgba(255,255,255,.08) 1px,
        transparent 1px
      );
    background-size: 56px 56px;
    opacity: .2;
    pointer-events: none;
  }

  .omedev-cloud .hero-glow {
    position: absolute;
    border-radius: 999px;
    filter: blur(100px);
    pointer-events: none;
  }

  .omedev-cloud .hero-glow-1 {
    width: 26rem;
    height: 26rem;
    top: 2rem;
    left: -7rem;
    background: rgba(114,165,206,.28);
    animation: cloudFloat 6s ease-in-out infinite;
  }

  .omedev-cloud .hero-glow-2 {
    width: 23rem;
    height: 23rem;
    right: -3rem;
    bottom: -4rem;
    background: rgba(85,221,181,.22);
    animation: cloudFloat 6s ease-in-out infinite 2s;
  }

  .omedev-cloud .hero-glow-3 {
    width: 18rem;
    height: 18rem;
    right: 24%;
    top: 28%;
    background: rgba(255,255,255,.14);
    animation: cloudFloat 6s ease-in-out infinite 4s;
  }

  .omedev-cloud .hero-content {
    position: relative;
    z-index: 5;
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
  }

  .omedev-cloud .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: .55rem;
    margin-bottom: 1.75rem;
    padding: .55rem 1rem;
    border-radius: 999px;
    background: rgba(255,255,255,.10);
    border: 1px solid rgba(255,255,255,.25);
    backdrop-filter: blur(10px);
    font-family: 'Syne', sans-serif;
    font-size: .7rem;
    font-weight: 700;
    letter-spacing: .15em;
    text-transform: uppercase;
  }

  .omedev-cloud .hero-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #55DDB5;
    box-shadow: 0 0 14px rgba(85,221,181,.8);
    animation: pulseDot 2s ease-in-out infinite;
  }

  .omedev-cloud .hero-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2.7rem, 7vw, 5.7rem);
    font-weight: 800;
    line-height: 1.04;
    letter-spacing: -.045em;
    margin: 0 0 1.5rem;
    color: #fff;
  }

  .omedev-cloud .hero-highlight {
    position: relative;
    display: inline-block;
  }

  .omedev-cloud .hero-highlight::before {
    content: '';
    position: absolute;
    inset: -15px -20px;
    background: linear-gradient(
      90deg,
      #55DDB5,
      #72A5CE
    );
    filter: blur(28px);
    opacity: .28;
    border-radius: 999px;
  }

  .omedev-cloud .hero-highlight span {
    position: relative;
    background: linear-gradient(
      90deg,
      #55DDB5,
      #72A5CE,
      #A6C3D7
    );
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .omedev-cloud .hero-description {
    max-width: 680px;
    margin: 0 auto 2.25rem;
    color: rgba(255,255,255,.82);
    font-size: clamp(1rem, 2vw, 1.2rem);
    line-height: 1.75;
  }

  /* ==========================================================
     BUTTONS
     ========================================================== */

  .omedev-cloud .btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: .6rem;
    padding: .9rem 1.7rem;
    border-radius: 12px;
    background: linear-gradient(
      135deg,
      #0B74C1 0%,
      #2AACB2 55%,
      #55DDB5 100%
    );
    color: #fff;
    font-family: 'Syne', sans-serif;
    font-size: .9rem;
    font-weight: 700;
    text-decoration: none;
    border: none;
    box-shadow: 0 10px 28px rgba(11,116,193,.20);
    transition: all .3s ease;
  }

  .omedev-cloud .btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 36px rgba(42,172,178,.30);
  }

  .omedev-cloud .btn-outline {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: .6rem;
    padding: .85rem 1.7rem;
    border-radius: 12px;
    background: rgba(255,255,255,.08);
    color: #fff;
    font-family: 'Syne', sans-serif;
    font-size: .9rem;
    font-weight: 700;
    text-decoration: none;
    border: 1px solid rgba(255,255,255,.30);
    backdrop-filter: blur(8px);
    transition: all .3s ease;
  }

  .omedev-cloud .btn-outline:hover {
    background: rgba(255,255,255,.14);
    border-color: rgba(255,255,255,.65);
    transform: translateY(-3px);
  }

  .omedev-cloud .btn-dark-outline {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: .6rem;
    padding: .85rem 1.5rem;
    border-radius: 12px;
    background: #fff;
    color: #053876;
    font-family: 'Syne', sans-serif;
    font-size: .85rem;
    font-weight: 700;
    text-decoration: none;
    border: 1px solid rgba(5,56,118,.16);
    transition: all .3s ease;
  }

  .omedev-cloud .btn-dark-outline:hover {
    border-color: #2AACB2;
    color: #0B74C1;
    background: rgba(85,221,181,.08);
    transform: translateY(-3px);
  }

  /* ==========================================================
     CARDS
     ========================================================== */

  .omedev-cloud .card-hover {
    background: #fff;
    border: 1px solid rgba(5,56,118,.09);
    border-radius: 18px;
    box-shadow: 0 10px 30px rgba(5,56,118,.06);
    transition:
      transform .35s ease,
      box-shadow .35s ease,
      border-color .35s ease;
  }

  .omedev-cloud .card-hover:hover {
    transform: translateY(-7px);
    box-shadow: 0 22px 48px rgba(11,116,193,.14);
    border-color: rgba(42,172,178,.35);
  }

  /* ==========================================================
     SERVICE CARDS
     ========================================================== */

  .omedev-cloud .service-card {
    position: relative;
    height: 100%;
    padding: 1.65rem;
    overflow: hidden;
  }

  .omedev-cloud .service-card::after {
    content: '';
    position: absolute;
    right: -60px;
    bottom: -60px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: rgba(42,172,178,.07);
    transition: transform .4s ease;
  }

  .omedev-cloud .service-card:hover::after {
    transform: scale(1.5);
  }

  .omedev-cloud .service-icon {
    position: relative;
    z-index: 2;
    width: 54px;
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 14px;
    margin-bottom: 1.2rem;
  }

  .omedev-cloud .service-title {
    position: relative;
    z-index: 2;
    font-family: 'Syne', sans-serif;
    font-size: 1.15rem;
    font-weight: 700;
    color: #053876;
    margin-bottom: .6rem;
  }

  .omedev-cloud .service-description {
    position: relative;
    z-index: 2;
    color: #25364A;
    font-size: .9rem;
    line-height: 1.7;
  }

  /* ==========================================================
     WHY CLOUD VISUAL
     ========================================================== */

  .omedev-cloud .cloud-visual {
    position: relative;
    min-height: 390px;
    border-radius: 24px;
    overflow: hidden;
    background: linear-gradient(
      135deg,
      #053876 0%,
      #0B74C1 55%,
      #2AACB2 100%
    );
    box-shadow: 0 24px 60px rgba(5,56,118,.18);
  }

  .omedev-cloud .cloud-visual-grid {
    position: absolute;
    inset: 0;
    opacity: .18;
    background-image:
      linear-gradient(
        rgba(255,255,255,.15) 1px,
        transparent 1px
      ),
      linear-gradient(
        90deg,
        rgba(255,255,255,.15) 1px,
        transparent 1px
      );
    background-size: 45px 45px;
  }

  .omedev-cloud .cloud-orb {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,.18);
  }

  .omedev-cloud .cloud-orb-1 {
    width: 280px;
    height: 280px;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
  }

  .omedev-cloud .cloud-orb-2 {
    width: 190px;
    height: 190px;
    top: 85px;
    left: 50%;
    transform: translateX(-50%);
  }

  .omedev-cloud .cloud-visual-content {
    position: relative;
    z-index: 5;
    height: 100%;
    min-height: 390px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    text-align: center;
  }

  .omedev-cloud .cloud-main-icon {
    width: 92px;
    height: 92px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 24px;
    background: rgba(255,255,255,.13);
    border: 1px solid rgba(255,255,255,.22);
    backdrop-filter: blur(10px);
    box-shadow: 0 20px 50px rgba(0,0,0,.15);
    margin-bottom: 1.25rem;
  }

  .omedev-cloud .cloud-visual-title {
    color: #fff;
    font-family: 'Syne', sans-serif;
    font-size: 1.5rem;
    font-weight: 800;
    margin-bottom: .5rem;
  }

  .omedev-cloud .cloud-visual-text {
    max-width: 360px;
    color: rgba(255,255,255,.75);
    font-size: .9rem;
    line-height: 1.65;
  }

  /* ==========================================================
     BENEFITS
     ========================================================== */

  .omedev-cloud .benefit-item {
    display: flex;
    align-items: flex-start;
    gap: .8rem;
    padding: .85rem 0;
  }

  .omedev-cloud .benefit-icon {
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background: rgba(42,172,178,.10);
    color: #2AACB2;
  }

  .omedev-cloud .benefit-text {
    color: #25364A;
    line-height: 1.6;
    font-size: .95rem;
  }

  /* ==========================================================
     PACKS
     ========================================================== */

  .omedev-cloud .pack-card {
    position: relative;
    height: 100%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
  }

  .omedev-cloud .pack-card.featured {
    border: 2px solid rgba(42,172,178,.55);
    box-shadow: 0 22px 55px rgba(42,172,178,.13);
  }

  .omedev-cloud .recommended {
    position: absolute;
    top: -13px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    padding: .38rem .9rem;
    border-radius: 999px;
    background: linear-gradient(
      90deg,
      #0B74C1,
      #2AACB2,
      #55DDB5
    );
    color: #fff;
    font-family: 'Syne', sans-serif;
    font-size: .65rem;
    font-weight: 800;
    letter-spacing: .1em;
    text-transform: uppercase;
    box-shadow: 0 8px 20px rgba(11,116,193,.20);
  }

  .omedev-cloud .pack-name {
    font-family: 'Syne', sans-serif;
    font-size: 1.45rem;
    font-weight: 800;
    color: #053876;
    margin-bottom: .4rem;
  }

  .omedev-cloud .pack-description {
    color: #25364A;
    font-size: .85rem;
    margin-bottom: 1.25rem;
  }

  .omedev-cloud .pack-price {
    font-family: 'Syne', sans-serif;
    font-size: 2.1rem;
    line-height: 1.1;
    font-weight: 800;
    margin-bottom: 1.5rem;
    background: linear-gradient(
      90deg,
      #0B74C1,
      #2AACB2
    );
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .omedev-cloud .pack-feature {
    display: flex;
    align-items: center;
    gap: .55rem;
    color: #25364A;
    font-size: .88rem;
    padding: .42rem 0;
  }

  .omedev-cloud .pack-feature svg {
    flex-shrink: 0;
    color: #2AACB2;
  }

  /* ==========================================================
     STATS
     ========================================================== */

  .omedev-cloud .stat-card {
    padding: 1.5rem;
    text-align: center;
    border-radius: 18px;
    background: rgba(255,255,255,.06);
    border: 1px solid rgba(255,255,255,.15);
    transition: all .35s ease;
  }

  .omedev-cloud .stat-card:hover {
    transform: translateY(-6px);
    background: rgba(255,255,255,.10);
    border-color: rgba(85,221,181,.35);
  }

  .omedev-cloud .stat-icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto .8rem;
    border-radius: 13px;
    background: linear-gradient(
      135deg,
      #4681B7,
      #053876
    );
    color: #fff;
  }

  .omedev-cloud .stat-value {
    font-family: 'Syne', sans-serif;
    color: #fff;
    font-size: clamp(2rem, 4vw, 2.7rem);
    line-height: 1;
    font-weight: 800;
    margin-bottom: .45rem;
  }

  .omedev-cloud .stat-label {
    color: rgba(255,255,255,.70);
    font-size: .8rem;
  }

  /* ==========================================================
     GALLERY
     ========================================================== */

  .omedev-cloud .gallery-card {
    position: relative;
    height: 260px;
    overflow: hidden;
    border-radius: 18px;
    border: 1px solid rgba(5,56,118,.09);
    box-shadow: 0 10px 30px rgba(5,56,118,.08);
    background: #D5DCE1;
  }

  .omedev-cloud .gallery-card img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    transition: transform .7s cubic-bezier(.4,0,.2,1);
  }

  .omedev-cloud .gallery-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(5,56,118,.35),
      transparent 55%
    );
    opacity: .5;
    transition: opacity .3s ease;
  }

  .omedev-cloud .gallery-card:hover img {
    transform: scale(1.07);
  }

  .omedev-cloud .gallery-card:hover::after {
    opacity: .8;
  }

  /* ==========================================================
     TESTIMONIALS
     ========================================================== */

  .omedev-cloud .testimonial {
    padding: 2rem;
  }

  .omedev-cloud .testimonial-quote {
    position: relative;
    color: #25364A;
    font-size: .95rem;
    line-height: 1.8;
    font-style: italic;
    margin-bottom: 1.5rem;
  }

  .omedev-cloud .testimonial-quote::before {
    content: '"';
    position: absolute;
    top: -35px;
    left: -3px;
    color: rgba(42,172,178,.18);
    font-family: Georgia, serif;
    font-size: 5rem;
    line-height: 1;
  }

  .omedev-cloud .testimonial-user {
    display: flex;
    align-items: center;
    gap: .8rem;
  }

  .omedev-cloud .testimonial-user img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #2AACB2;
  }

  .omedev-cloud .testimonial-name {
    font-family: 'Syne', sans-serif;
    font-size: .95rem;
    font-weight: 700;
    color: #053876;
  }

  .omedev-cloud .testimonial-role {
    color: #0B74C1;
    font-size: .75rem;
    font-weight: 600;
    margin-top: 2px;
  }

  /* ==========================================================
     FINAL CTA
     ========================================================== */

  .omedev-cloud .final-cta {
    position: relative;
    overflow: hidden;
    padding: 5rem 2rem;
    text-align: center;
    background: linear-gradient(
      135deg,
      #0B74C1 0%,
      #2AACB2 55%,
      #55DDB5 100%
    );
  }

  .omedev-cloud .final-cta::before {
    content: '';
    position: absolute;
    width: 500px;
    height: 500px;
    top: -300px;
    left: -120px;
    border-radius: 50%;
    background: rgba(255,255,255,.10);
    filter: blur(20px);
  }

  .omedev-cloud .final-cta::after {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    right: -120px;
    bottom: -260px;
    border-radius: 50%;
    background: rgba(5,56,118,.12);
    filter: blur(20px);
  }

  .omedev-cloud .final-cta-content {
    position: relative;
    z-index: 2;
    max-width: 760px;
    margin: 0 auto;
  }

  .omedev-cloud .final-cta h2 {
    font-family: 'Syne', sans-serif;
    color: #fff;
    font-size: clamp(2rem, 5vw, 3.3rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -.03em;
    margin-bottom: 1rem;
  }

  .omedev-cloud .final-cta p {
    max-width: 600px;
    margin: 0 auto 2rem;
    color: rgba(255,255,255,.82);
    line-height: 1.7;
  }

  .omedev-cloud .final-btn-light {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: .6rem;
    padding: .9rem 1.7rem;
    border-radius: 12px;
    background: #fff;
    color: #053876;
    font-family: 'Syne', sans-serif;
    font-size: .9rem;
    font-weight: 700;
    text-decoration: none;
    box-shadow: 0 12px 30px rgba(5,56,118,.15);
    transition: all .3s ease;
  }

  .omedev-cloud .final-btn-light:hover {
    transform: translateY(-3px);
    box-shadow: 0 18px 40px rgba(5,56,118,.22);
  }

  .omedev-cloud .final-btn-transparent {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: .6rem;
    padding: .85rem 1.7rem;
    border-radius: 12px;
    color: #fff;
    background: rgba(255,255,255,.08);
    border: 1px solid rgba(255,255,255,.38);
    font-family: 'Syne', sans-serif;
    font-size: .9rem;
    font-weight: 700;
    text-decoration: none;
    transition: all .3s ease;
  }

  .omedev-cloud .final-btn-transparent:hover {
    background: rgba(255,255,255,.16);
    transform: translateY(-3px);
  }

  /* ==========================================================
     ANIMATIONS
     ========================================================== */

  @keyframes cloudFloat {
    0%, 100% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-16px);
    }
  }

  @keyframes pulseDot {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }

    50% {
      transform: scale(1.45);
      opacity: .65;
    }
  }

  .omedev-cloud .animate-float {
    animation: cloudFloat 6s ease-in-out infinite;
  }

  /* ==========================================================
     RESPONSIVE
     ========================================================== */

  @media (max-width: 1024px) {
    .omedev-cloud .container {
      padding: 0 1.5rem;
    }

    .omedev-cloud .cloud-visual {
      min-height: 350px;
    }

    .omedev-cloud .cloud-visual-content {
      min-height: 350px;
    }

    .omedev-cloud .gallery-card {
      height: 230px;
    }
  }

  @media (max-width: 768px) {
    .omedev-cloud .container {
      padding: 0 1rem;
    }

    .omedev-cloud .cloud-hero {
      min-height: 620px;
      padding: 7rem 0 5rem;
    }

    .omedev-cloud .hero-title {
      font-size: clamp(2.5rem, 12vw, 4rem);
    }

    .omedev-cloud .hero-description {
      font-size: .98rem;
    }

    .omedev-cloud .hero-buttons {
      flex-direction: column;
      width: 100%;
      max-width: 320px;
      margin: 0 auto;
    }

    .omedev-cloud .hero-buttons a {
      width: 100%;
    }

    .omedev-cloud .gallery-card {
      height: 220px;
    }

    .omedev-cloud .pack-card {
      padding: 1.6rem;
    }
  }

  @media (max-width: 480px) {
    .omedev-cloud .cloud-hero {
      min-height: 650px;
    }

    .omedev-cloud .hero-badge {
      font-size: .62rem;
      letter-spacing: .1em;
    }

    .omedev-cloud .hero-title {
      font-size: 2.55rem;
    }

    .omedev-cloud .section-title {
      font-size: 2rem;
    }

    .omedev-cloud .cloud-main-icon {
      width: 78px;
      height: 78px;
    }

    .omedev-cloud .cloud-orb-1 {
      width: 230px;
      height: 230px;
    }

    .omedev-cloud .cloud-orb-2 {
      width: 150px;
      height: 150px;
    }

    .omedev-cloud .final-cta {
      padding: 4rem 1rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .omedev-cloud *,
    .omedev-cloud *::before,
    .omedev-cloud *::after {
      animation-duration: .01ms !important;
      animation-iteration-count: 1 !important;
      scroll-behavior: auto !important;
      transition-duration: .01ms !important;
    }
  }
`

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

const staggerContainer = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const SectionHeader = ({
  badge,
  title,
  subtitle,
  light = false,
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-80px' }}
    variants={staggerContainer}
    style={{
      textAlign: 'center',
      marginBottom: '3rem',
    }}
  >
    {badge && (
      <motion.div variants={fadeUp}>
        <span
          className="section-badge"
          style={
            light
              ? {
                  background: 'rgba(255,255,255,.14)',
                  color: '#fff',
                  borderColor: 'rgba(255,255,255,.28)',
                }
              : {}
          }
        >
          {badge}
        </span>
      </motion.div>
    )}

    <motion.h2
      variants={fadeUp}
      className="section-title"
      style={light ? { color: '#fff' } : {}}
    >
      {title}
    </motion.h2>

    <motion.div variants={fadeUp} className="divider" />

    {subtitle && (
      <motion.p
        variants={fadeUp}
        className="section-subtitle"
        style={
          light
            ? {
                color: 'rgba(255,255,255,.78)',
              }
            : {}
        }
      >
        {subtitle}
      </motion.p>
    )}
  </motion.div>
)

const colors = {
  navy: '#053876',
  blue: '#0B74C1',
  blueLight: '#4681B7',
  turquoise: '#2AACB2',
  energy: '#55DDB5',
}

const CloudHebergement = () => {
  useDocumentMeta({
    title: 'Cloud & Hébergement',
    description: "Migration cloud, hébergement et infrastructure gérée par OMEDEV Services pour les entreprises en RDC.",
    path: '/services/cloud-hebergement',
  });

  const cloudServices = [
    {
      icon: Database,
      title: 'Hébergement cloud scalable',
      desc: 'AWS, Azure, Google Cloud, OVH – ressources élastiques adaptées à vos besoins.',
      color: colors.blue,
    },
    {
      icon: Server,
      title: 'Serveurs dédiés & VPS',
      desc: 'Performances garanties, bare metal ou virtualisation selon votre architecture.',
      color: colors.blueLight,
    },
    {
      icon: Shield,
      title: 'Sécurité & sauvegarde',
      desc: 'Backups automatiques, chiffrement et protection de vos données.',
      color: colors.turquoise,
    },
    {
      icon: Clock,
      title: 'Disponibilité 99.9%',
      desc: 'SLA strict, monitoring 24/7 et architectures pensées pour la continuité.',
      color: colors.navy,
    },
    {
      icon: DollarSign,
      title: 'Paiement à l’usage',
      desc: 'Optimisez vos coûts avec une infrastructure adaptée à votre consommation.',
      color: colors.energy,
    },
    {
      icon: TrendingUp,
      title: 'Migration assistée',
      desc: 'Une transition progressive et maîtrisée vers votre nouvelle infrastructure cloud.',
      color: colors.blue,
    },
  ]

  const benefits = [
    'Infrastructure certifiée ISO 27001',
    'Support technique 24/7 par des experts cloud',
    'Architecture multi-régions pour une haute disponibilité',
    'Migration sans interruption de service',
    'Facturation transparente et devis personnalisé',
  ]

  const stats = [
    {
      value: '99.99%',
      label: 'Disponibilité garantie',
      icon: Activity,
    },
    {
      value: '50+',
      label: 'Projets migrés',
      icon: Cloud,
    },
    {
      value: '24/7',
      label: 'Support technique',
      icon: Clock,
    },
    {
      value: '100%',
      label: 'Satisfaction client',
      icon: Star,
    },
  ]

  const testimonials = [
    {
      name: 'Nicolas R.',
      role: 'CTO, FinTech',
      quote:
        "La migration de notre infrastructure legacy vers AWS a été fluide et sans downtime. OMEDEV a fait preuve d'un professionnalisme exceptionnel.",
      photo:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    },
    {
      name: 'Claire M.',
      role: 'Directrice Technique, E-commerce',
      quote:
        'Leur solution d’hébergement cloud nous permet de scaler pendant les pics de trafic sans souci. Je recommande vivement.',
      photo:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
  ]

  const galleryImages = [
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1000&h=700&fit=crop',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1000&h=700&fit=crop',
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1000&h=700&fit=crop',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000&h=700&fit=crop',
  ]

  const packs = [
    {
      name: 'Pack Start',
      description: 'Pour démarrer un projet ou héberger une petite application.',
      price: '49€/mois',
      features: ['1 vCPU', '2 Go RAM', '20 Go SSD', '1 To trafic'],
    },
    {
      name: 'Pack Business',
      description: 'Pour les applications professionnelles nécessitant plus de ressources.',
      price: '129€/mois',
      features: [
        '4 vCPU',
        '8 Go RAM',
        '100 Go SSD',
        '5 To trafic',
        'Backup quotidien',
      ],
      featured: true,
    },
    {
      name: 'Pack Enterprise',
      description: 'Pour les infrastructures critiques et les environnements avancés.',
      price: 'Sur devis',
      features: [
        'Dédié',
        'Stockage illimité',
        'SLA 99.99%',
        'Support prioritaire',
        'Architecture multi-AZ',
      ],
    },
  ]

  return (
    <div className="omedev-cloud">
      <style>{globalStyles}</style>

      {/* ======================================================
          HERO
          ====================================================== */}
      <PublicHero
        badge="Cloud & Hébergement"
        title="Passez au cloud"
        highlight="cloud"
        subtitle="Des solutions d'hébergement flexibles, sécurisées et performantes pour vos applications, vos données et votre croissance."
        primaryAction={{ label: 'Migrez dès maintenant', to: '/devis' }}
        secondaryAction={{ label: 'Contacter un expert', to: '/contact', icon: <Headphones size={17} /> }}
      />

      {/* ======================================================
          SERVICES
          ====================================================== */}
      <section className="section-white" style={{ padding: '6rem 0' }}>
        <div className="container">
          <SectionHeader
            badge="Nos solutions"
            title="Nos prestations cloud"
            subtitle="Des infrastructures modernes pour héberger, sécuriser et faire évoluer vos applications."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {cloudServices.map((service, index) => {
              const Icon = service.icon

              return (
                <motion.div
                  key={service.title}
                  variants={fadeUp}
                  transition={{
                    delay: index * 0.07,
                  }}
                  className="card-hover service-card"
                >
                  <div
                    className="service-icon"
                    style={{
                      background: `${service.color}18`,
                      color: service.color,
                    }}
                  >
                    <Icon size={25} />
                  </div>

                  <h3 className="service-title">
                    {service.title}
                  </h3>

                  <p className="service-description">
                    {service.desc}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ======================================================
          POURQUOI OMEDEV CLOUD
          ====================================================== */}
      <section className="section-light" style={{ padding: '6rem 0' }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="section-badge">
                Pourquoi nous choisir
              </span>

              <h2
                className="section-title"
                style={{
                  marginTop: '1.2rem',
                  marginBottom: '.5rem',
                }}
              >
                Pourquoi OMEDEV Cloud ?
              </h2>

              <div
                className="divider"
                style={{
                  marginLeft: 0,
                }}
              />

              <p
                style={{
                  color: '#25364A',
                  lineHeight: 1.75,
                  marginBottom: '1rem',
                  maxWidth: '58ch',
                }}
              >
                Nous concevons des environnements cloud fiables,
                évolutifs et adaptés aux contraintes réelles de votre
                entreprise.
              </p>

              <div style={{ marginTop: '1rem' }}>
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.08,
                    }}
                    className="benefit-item"
                  >
                    <span className="benefit-icon">
                      <CheckCircle size={16} />
                    </span>

                    <span className="benefit-text">
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <Link to="/demander-devis" className="btn-primary">
                  Demander un devis cloud
                  <ArrowRight size={17} />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="cloud-visual"
            >
              <div className="cloud-visual-grid" />

              <div className="cloud-orb cloud-orb-1" />
              <div className="cloud-orb cloud-orb-2" />

              <div className="cloud-visual-content">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="cloud-main-icon"
                >
                  <Cloud
                    size={48}
                    color="#fff"
                    strokeWidth={1.5}
                  />
                </motion.div>

                <h3 className="cloud-visual-title">
                  Infrastructure Cloud
                </h3>

                <p className="cloud-visual-text">
                  Une architecture pensée pour la performance,
                  la disponibilité, la sécurité et l’évolution de
                  vos besoins.
                </p>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '.6rem',
                    marginTop: '1.5rem',
                  }}
                >
                  {[
                    'Sécurisée',
                    'Scalable',
                    '24/7',
                  ].map((item) => (
                    <span
                      key={item}
                      style={{
                        padding: '.45rem .8rem',
                        borderRadius: '999px',
                        background: 'rgba(255,255,255,.10)',
                        border:
                          '1px solid rgba(255,255,255,.18)',
                        color: 'rgba(255,255,255,.85)',
                        fontSize: '.7rem',
                        fontWeight: 700,
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ======================================================
          PACKS
          ====================================================== */}
      <section className="section-white" style={{ padding: '6rem 0' }}>
        <div className="container">
          <SectionHeader
            badge="Nos offres"
            title="Des packs cloud adaptés à vos besoins"
            subtitle="Choisissez une infrastructure adaptée à la taille et aux exigences de votre projet."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packs.map((pack, index) => (
              <motion.div
                key={pack.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                className={`card-hover pack-card ${
                  pack.featured ? 'featured' : ''
                }`}
              >
                {pack.featured && (
                  <div className="recommended">
                    Recommandé
                  </div>
                )}

                <div className="pack-name">
                  {pack.name}
                </div>

                <p className="pack-description">
                  {pack.description}
                </p>

                <div className="pack-price">
                  {pack.price}
                </div>

                <div
                  style={{
                    height: 1,
                    background: 'rgba(5,56,118,.08)',
                    marginBottom: '1rem',
                  }}
                />

                <div style={{ marginBottom: '1.4rem' }}>
                  {pack.features.map((feature) => (
                    <div
                      key={feature}
                      className="pack-feature"
                    >
                      <CheckCircle size={16} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 'auto' }}>
                  <Link
                    to="/devis-cloud"
                    className={
                      pack.featured
                        ? 'btn-primary'
                        : 'btn-dark-outline'
                    }
                    style={{ width: '100%' }}
                  >
                    Choisir ce pack
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================
          STATS
          ====================================================== */}
      <section
        className="section-dark"
        style={{
          padding: '5rem 0',
        }}
      >
        <div className="container">
          <SectionHeader
            badge="Nos performances"
            title="Le cloud en quelques chiffres"
            subtitle="Des engagements mesurables pour une infrastructure fiable."
            light
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon

              return (
                <motion.div
                  key={stat.label}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.1,
                  }}
                  className="stat-card"
                >
                  <div className="stat-icon">
                    <Icon size={21} />
                  </div>

                  <div className="stat-value">
                    {stat.value}
                  </div>

                  <div className="stat-label">
                    {stat.label}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ======================================================
          GALERIE
          ====================================================== */}
      <section className="section-light" style={{ padding: '6rem 0' }}>
        <div className="container">
          <SectionHeader
            badge="Infrastructure"
            title="Nos infrastructures & datacenters"
            subtitle="Des environnements conçus pour la disponibilité, la sécurité et la performance."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image}
                initial={{
                  opacity: 0,
                  scale: .94,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: .6,
                  delay: index * .08,
                }}
                className="gallery-card"
              >
                <img
                  src={image}
                  alt={`Infrastructure cloud ${index + 1}`}
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================
          TÉMOIGNAGES
          ====================================================== */}
      <section className="section-white" style={{ padding: '6rem 0' }}>
        <div className="container">
          <TestimonialsCarousel
            badge="Ils nous font confiance"
            title="L'expérience de nos clients"
            subtitle="Des infrastructures cloud conçues pour répondre à des besoins professionnels concrets."
            items={testimonials.map((t) => ({ name: t.name, role: t.role, content: t.quote, avatar: t.photo }))}
          />
        </div>
      </section>

      {/* ======================================================
          TECHNOLOGIES / BENEFITS
          ====================================================== */}
      <section className="section-light" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: LockKeyhole,
                title: 'Sécurité',
                text: 'Protection des données',
                color: colors.navy,
              },
              {
                icon: Gauge,
                title: 'Performance',
                text: 'Ressources optimisées',
                color: colors.blue,
              },
              {
                icon: Layers,
                title: 'Scalabilité',
                text: 'Évolution selon vos besoins',
                color: colors.turquoise,
              },
              {
                icon: Zap,
                title: 'Réactivité',
                text: 'Support technique',
                color: colors.energy,
              },
            ].map((item, index) => {
              const Icon = item.icon

              return (
                <motion.div
                  key={item.title}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * .08,
                  }}
                  className="card-hover"
                  style={{
                    padding: '1.4rem',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 13,
                      margin: '0 auto .8rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: `${item.color}16`,
                      color: item.color,
                    }}
                  >
                    <Icon size={21} />
                  </div>

                  <h3
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      color: colors.navy,
                      fontWeight: 700,
                      fontSize: '.95rem',
                      marginBottom: '.25rem',
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      color: '#25364A',
                      fontSize: '.75rem',
                    }}
                  >
                    {item.text}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ==================== CTA FINALE ==================== */}
      <CTASection
        badge="Passez à l'étape suivante"
        title="Prêt à migrer vers le cloud ?"
        highlight="vers le cloud"
        subtitle="Bénéficiez d'un audit de votre infrastructure et d'un plan de migration personnalisé pour construire un environnement cloud fiable et évolutif."
        backgroundImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80"
        primaryAction={{ label: 'Audit gratuit', to: '/audit-gratuit' }}
        secondaryAction={{ label: 'Contacter un expert', to: '/contact' }}
      />
    </div>
  )
}

export default CloudHebergement

