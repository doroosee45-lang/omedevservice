import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PublicHero from '../../components/Public/PublicHero'
import TestimonialsCarousel from '../../components/Public/TestimonialsCarousel'
import CTASection from '../../components/Public/CTASection'

import {
  ArrowRight,
  Award,
  CheckCircle,
  Clock,
  Cloud,
  Code,
  Cpu,
  Database,
  Gauge,
  Globe,
  Headphones,
  Layers,
  MessageCircle,
  Phone,
  Rocket,
  Shield,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Star,
  Zap,
} from 'lucide-react'
/* ============================================================
   OMEDEV — DÉVELOPPEMENT DIGITAL
   Design aligné à 100% sur la page About
   ============================================================ */

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&display=swap');

  .omedev-development {
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
    --omedev-text: #25364A;

    background: #F6F6F7;
    color: #0B1213;
    font-family: 'DM Sans', sans-serif;
    overflow-x: hidden;
  }

  .omedev-development *,
  .omedev-development *::before,
  .omedev-development *::after {
    box-sizing: border-box;
  }

  .omedev-development .container {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  /* ==========================================================
     TYPOGRAPHIE
     ========================================================== */

  .omedev-development .font-syne {
    font-family: 'Syne', sans-serif;
  }

  .omedev-development .section-badge {
    display: inline-flex;
    align-items: center;
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

  .omedev-development .section-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -.03em;
    margin: 0 0 1rem;
    color: #053876;
  }

  .omedev-development .section-subtitle {
    font-size: 1rem;
    color: #25364A;
    max-width: 52ch;
    margin: 0 auto;
    line-height: 1.7;
  }

  .omedev-development .divider {
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

  .omedev-development .section-white {
    background: #fff;
  }

  .omedev-development .section-light {
    background: #F6F6F7;
  }

  .omedev-development .section-dark {
    background: linear-gradient(
      135deg,
      #053876 0%,
      #1D5B9B 55%,
      #0B74C1 100%
    );
  }

  .omedev-development .section-energy {
    background: linear-gradient(
      135deg,
      #0B74C1 0%,
      #2AACB2 55%,
      #55DDB5 100%
    );
  }

  /* ==========================================================
     HERO — MÊME STYLE QUE ABOUT
     ========================================================== */

  .omedev-development .development-hero {
    position: relative;
    min-height: 560px;
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

  .omedev-development .hero-grid {
    position: absolute;
    inset: 0;
    opacity: .20;
    pointer-events: none;

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
  }

  .omedev-development .hero-glow {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    filter: blur(100px);
    animation: developmentFloat 6s ease-in-out infinite;
  }

  .omedev-development .hero-glow-1 {
    width: 26rem;
    height: 26rem;
    top: 10px;
    left: -6rem;
    background: rgba(85,221,181,.24);
  }

  .omedev-development .hero-glow-2 {
    width: 22rem;
    height: 22rem;
    bottom: -2rem;
    right: -2rem;
    background: rgba(42,172,178,.24);
    animation-delay: 2s;
  }

  .omedev-development .hero-glow-3 {
    width: 16rem;
    height: 16rem;
    top: 30%;
    right: 24%;
    background: rgba(255,255,255,.14);
    animation-delay: 4s;
  }

  .omedev-development .hero-content {
    position: relative;
    z-index: 5;
    max-width: 850px;
    margin: 0 auto;
    text-align: center;
  }

  .omedev-development .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: .55rem;
    margin-bottom: 1.75rem;
    padding: .55rem 1rem;
    border-radius: 999px;
    background: rgba(255,255,255,.10);
    border: 1px solid rgba(255,255,255,.25);
    backdrop-filter: blur(10px);

    color: #fff;
    font-family: 'Syne', sans-serif;
    font-size: .68rem;
    font-weight: 700;
    letter-spacing: .16em;
    text-transform: uppercase;
  }

  .omedev-development .hero-status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #55DDB5;
    box-shadow: 0 0 14px rgba(85,221,181,.9);
    animation: developmentPulse 2s ease-in-out infinite;
  }

  .omedev-development .hero-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2.8rem, 7vw, 5.5rem);
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -.045em;
    margin: 0 0 1.5rem;
    color: #fff;
  }

  .omedev-development .hero-highlight {
    position: relative;
    display: inline-block;
  }

  .omedev-development .hero-highlight::before {
    content: '';
    position: absolute;
    inset: -15px -22px;
    border-radius: 999px;
    background: linear-gradient(
      90deg,
      #55DDB5,
      #72A5CE
    );
    filter: blur(28px);
    opacity: .28;
  }

  .omedev-development .hero-highlight span {
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

  .omedev-development .hero-description {
    max-width: 690px;
    margin: 0 auto 2.25rem;
    color: rgba(255,255,255,.80);
    font-size: clamp(1rem, 2vw, 1.18rem);
    line-height: 1.75;
  }

  .omedev-development .hero-description strong {
    color: #fff;
  }

  /* ==========================================================
     BOUTONS
     ========================================================== */

  .omedev-development .btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: .6rem;

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

    padding: .9rem 1.7rem;
    border-radius: 12px;

    text-decoration: none;
    border: none;
    cursor: pointer;

    box-shadow: 0 10px 28px rgba(11,116,193,.20);

    transition:
      transform .3s ease,
      box-shadow .3s ease,
      filter .3s ease;
  }

  .omedev-development .btn-primary:hover {
    transform: translateY(-3px);
    filter: brightness(1.05);
    box-shadow: 0 16px 36px rgba(42,172,178,.28);
  }

  .omedev-development .btn-outline {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: .6rem;

    background: #fff;
    color: #053876;

    font-family: 'Syne', sans-serif;
    font-size: .9rem;
    font-weight: 700;

    padding: .85rem 1.7rem;
    border-radius: 12px;

    border: 1px solid rgba(5,56,118,.18);
    text-decoration: none;

    transition: all .3s ease;
  }

  .omedev-development .btn-outline:hover {
    border-color: #2AACB2;
    color: #0B74C1;
    background: rgba(85,221,181,.08);
    transform: translateY(-3px);
  }

  .omedev-development .hero-outline {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: .6rem;

    padding: .9rem 1.7rem;
    border-radius: 12px;

    color: #fff;
    background: rgba(255,255,255,.07);
    border: 1px solid rgba(255,255,255,.30);

    font-family: 'Syne', sans-serif;
    font-size: .9rem;
    font-weight: 700;

    text-decoration: none;
    backdrop-filter: blur(8px);

    transition: all .3s ease;
  }

  .omedev-development .hero-outline:hover {
    background: rgba(255,255,255,.14);
    border-color: rgba(255,255,255,.65);
    transform: translateY(-3px);
  }

  /* ==========================================================
     CARDS — EXACTEMENT COMME ABOUT
     ========================================================== */

  .omedev-development .card-hover {
    background: #fff;
    border: 1px solid rgba(5,56,118,.09);
    border-radius: 18px;
    box-shadow: 0 10px 30px rgba(5,56,118,.06);

    transition:
      transform .35s ease,
      box-shadow .35s ease,
      border-color .35s ease;
  }

  .omedev-development .card-hover:hover {
    transform: translateY(-7px);
    box-shadow: 0 22px 48px rgba(11,116,193,.14);
    border-color: rgba(42,172,178,.35);
  }

  /* ==========================================================
     STATS
     ========================================================== */

  .omedev-development .stats-section {
    padding: 5rem 0;
  }

  .omedev-development .stat-card {
    padding: 1.5rem;
    text-align: center;

    background: rgba(255,255,255,.06);
    border: 1px solid rgba(255,255,255,.15);
    border-radius: 18px;

    transition: all .35s ease;
  }

  .omedev-development .stat-card:hover {
    transform: translateY(-6px);
    background: rgba(255,255,255,.10);
    border-color: rgba(85,221,181,.35);
  }

  .omedev-development .stat-icon {
    width: 48px;
    height: 48px;

    margin: 0 auto .8rem;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 13px;

    background: linear-gradient(
      135deg,
      #4681B7,
      #053876
    );

    color: #fff;
  }

  .omedev-development .stat-value {
    font-family: 'Syne', sans-serif;
    color: #fff;
    font-size: clamp(2rem, 4vw, 2.7rem);
    line-height: 1;
    font-weight: 800;
    margin-bottom: .45rem;
  }

  .omedev-development .stat-label {
    color: rgba(255,255,255,.70);
    font-size: .8rem;
  }

  /* ==========================================================
     SERVICE CARDS
     ========================================================== */

  .omedev-development .service-card {
    height: 100%;
    padding: 1.65rem;
    display: flex;
    flex-direction: column;
  }

  .omedev-development .service-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.2rem;
  }

  .omedev-development .service-icon {
    width: 54px;
    height: 54px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 14px;

    background: rgba(11,116,193,.10);
    color: #0B74C1;

    transition: all .35s ease;
  }

  .omedev-development .service-card:hover .service-icon {
    transform: scale(1.08) rotate(-3deg);
    background: rgba(42,172,178,.13);
    color: #2AACB2;
  }

  .omedev-development .service-price {
    white-space: nowrap;

    padding: .4rem .75rem;
    border-radius: 999px;

    background: rgba(11,116,193,.07);
    color: #0B74C1;
    border: 1px solid rgba(11,116,193,.12);

    font-family: 'Syne', sans-serif;
    font-size: .65rem;
    font-weight: 700;
  }

  .omedev-development .service-title {
    font-family: 'Syne', sans-serif;
    color: #053876;

    font-size: 1.15rem;
    font-weight: 800;

    margin-bottom: .65rem;

    transition: color .3s ease;
  }

  .omedev-development .service-card:hover .service-title {
    color: #0B74C1;
  }

  .omedev-development .service-description {
    color: #25364A;
    font-size: .88rem;
    line-height: 1.7;
    margin-bottom: 1.25rem;
  }

  .omedev-development .service-link {
    margin-top: auto;

    display: inline-flex;
    align-items: center;
    gap: .5rem;

    color: #0B74C1;
    font-size: .82rem;
    font-weight: 700;

    text-decoration: none;

    transition: all .3s ease;
  }

  .omedev-development .service-link:hover {
    color: #2AACB2;
    gap: .75rem;
  }

  /* ==========================================================
     TECHNOLOGIES
     ========================================================== */

  .omedev-development .technology-card {
    display: flex;
    align-items: center;
    gap: .75rem;

    padding: 1rem;

    background: #fff;
    border: 1px solid rgba(5,56,118,.09);
    border-radius: 14px;

    transition: all .3s ease;
  }

  .omedev-development .technology-card:hover {
    transform: translateY(-5px);
    border-color: rgba(42,172,178,.40);
    box-shadow: 0 14px 30px rgba(5,56,118,.08);
  }

  .omedev-development .technology-icon {
    width: 42px;
    height: 42px;

    flex-shrink: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 11px;

    background: linear-gradient(
      135deg,
      #0B74C1,
      #2AACB2
    );

    color: #fff;

    transition: transform .3s ease;
  }

  .omedev-development .technology-card:hover .technology-icon {
    transform: scale(1.08) rotate(5deg);
  }

  .omedev-development .technology-name {
    color: #25364A;
    font-size: .84rem;
    font-weight: 600;
  }

  .omedev-development .tech-dot {
    margin-left: auto;

    width: 7px;
    height: 7px;

    border-radius: 50%;

    background: #55DDB5;

    opacity: 0;

    transition: opacity .3s ease;
  }

  .omedev-development .technology-card:hover .tech-dot {
    opacity: 1;
  }

  /* ==========================================================
     IMAGE / VISUAL
     ========================================================== */

  .omedev-development .visual-card {
    position: relative;
    overflow: hidden;

    border-radius: 22px;

    background: linear-gradient(
      135deg,
      #053876,
      #0B74C1,
      #2AACB2
    );

    box-shadow: 0 24px 60px rgba(5,56,118,.18);
  }

  .omedev-development .visual-card img {
    display: block;
    width: 100%;
    height: 100%;
    min-height: 450px;

    object-fit: cover;

    transition: transform .8s cubic-bezier(.4,0,.2,1);
  }

  .omedev-development .visual-card:hover img {
    transform: scale(1.06);
  }

  .omedev-development .visual-overlay {
    position: absolute;
    inset: 0;

    background:
      linear-gradient(
        to top,
        rgba(5,56,118,.75),
        rgba(5,56,118,.08) 65%
      );
  }

  .omedev-development .visual-badge {
    position: absolute;

    left: 20px;
    bottom: 20px;

    display: inline-flex;
    align-items: center;
    gap: .5rem;

    padding: .65rem .9rem;

    border-radius: 999px;

    background: rgba(255,255,255,.12);
    border: 1px solid rgba(255,255,255,.25);

    backdrop-filter: blur(10px);

    color: #fff;
    font-size: .72rem;
    font-weight: 700;
  }

  /* ==========================================================
     BENEFITS
     ========================================================== */

  .omedev-development .benefit {
    display: flex;
    align-items: flex-start;
    gap: .8rem;
    padding: .65rem 0;
  }

  .omedev-development .benefit-icon {
    width: 29px;
    height: 29px;

    flex-shrink: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 8px;

    background: rgba(42,172,178,.11);
    color: #2AACB2;
  }

  .omedev-development .benefit-text {
    color: #25364A;
    font-size: .92rem;
    line-height: 1.6;
  }

  /* ==========================================================
     PROCESS
     ========================================================== */

  .omedev-development .process-number {
    width: 50px;
    height: 50px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 14px;

    background: linear-gradient(
      135deg,
      #0B74C1,
      #2AACB2
    );

    color: #fff;

    font-family: 'Syne', sans-serif;
    font-weight: 800;

    box-shadow: 0 10px 24px rgba(11,116,193,.18);
  }

  /* ==========================================================
     TESTIMONIALS
     ========================================================== */

  .omedev-development .testimonial {
    padding: 2rem;
  }

  .omedev-development .testimonial-quote {
    color: #25364A;

    font-size: .92rem;
    line-height: 1.8;

    font-style: italic;

    margin-bottom: 1.5rem;
  }

  .omedev-development .testimonial-user {
    display: flex;
    align-items: center;
    gap: .8rem;
  }

  .omedev-development .testimonial-user img {
    width: 48px;
    height: 48px;

    object-fit: cover;

    border-radius: 50%;
    border: 2px solid #2AACB2;
  }

  .omedev-development .testimonial-name {
    font-family: 'Syne', sans-serif;
    font-size: .95rem;
    font-weight: 700;
    color: #053876;
  }

  .omedev-development .testimonial-role {
    color: #0B74C1;
    font-size: .75rem;
    font-weight: 600;
  }

  /* ==========================================================
     PORTFOLIO
     ========================================================== */

  .omedev-development .portfolio-card {
    position: relative;

    height: 260px;

    overflow: hidden;

    border-radius: 18px;

    background: #D5DCE1;

    border: 1px solid rgba(5,56,118,.09);

    box-shadow: 0 10px 30px rgba(5,56,118,.06);
  }

  .omedev-development .portfolio-card img {
    width: 100%;
    height: 100%;

    object-fit: cover;

    transition: transform .7s cubic-bezier(.4,0,.2,1);
  }

  .omedev-development .portfolio-card::after {
    content: '';

    position: absolute;
    inset: 0;

    background:
      linear-gradient(
        to top,
        rgba(5,56,118,.48),
        transparent 65%
      );

    opacity: .65;

    transition: opacity .3s ease;
  }

  .omedev-development .portfolio-card:hover img {
    transform: scale(1.08);
  }

  .omedev-development .portfolio-card:hover::after {
    opacity: .9;
  }

  .omedev-development .portfolio-label {
    position: absolute;

    z-index: 3;

    left: 16px;
    bottom: 14px;

    color: #fff;

    font-family: 'Syne', sans-serif;
    font-size: .8rem;
    font-weight: 700;
  }

  /* ==========================================================
     FINAL CTA
     ========================================================== */

  .omedev-development .final-cta {
    position: relative;
    overflow: hidden;

    padding: 5rem 0;

    background: linear-gradient(
      135deg,
      #053876 0%,
      #1D5B9B 55%,
      #0B74C1 100%
    );
  }

  .omedev-development .final-cta::before {
    content: '';

    position: absolute;

    width: 480px;
    height: 480px;

    top: -300px;
    left: -120px;

    border-radius: 50%;

    background: rgba(85,221,181,.12);

    filter: blur(30px);
  }

  .omedev-development .final-cta::after {
    content: '';

    position: absolute;

    width: 400px;
    height: 400px;

    right: -120px;
    bottom: -250px;

    border-radius: 50%;

    background: rgba(42,172,178,.13);

    filter: blur(30px);
  }

  .omedev-development .cta-card {
    height: 100%;

    padding: 2rem;

    text-align: center;

    background: rgba(255,255,255,.06);
    border: 1px solid rgba(255,255,255,.15);
    border-radius: 18px;

    backdrop-filter: blur(8px);

    transition: all .35s ease;
  }

  .omedev-development .cta-card:hover {
    transform: translateY(-7px);
    background: rgba(255,255,255,.09);
    border-color: rgba(85,221,181,.35);
  }

  .omedev-development .cta-icon {
    width: 64px;
    height: 64px;

    margin: 0 auto 1.2rem;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 18px;

    color: #fff;

    box-shadow: 0 14px 30px rgba(0,0,0,.16);
  }

  .omedev-development .cta-title {
    color: #fff;

    font-family: 'Syne', sans-serif;

    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 800;

    margin-bottom: .75rem;
  }

  .omedev-development .cta-text {
    color: rgba(255,255,255,.72);

    line-height: 1.7;
    font-size: .9rem;

    max-width: 460px;

    margin: 0 auto 1.5rem;
  }

  .omedev-development .cta-light-button {
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

    transition: all .3s ease;
  }

  .omedev-development .cta-light-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 28px rgba(0,0,0,.15);
  }

  .omedev-development .cta-outline-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: .6rem;

    padding: .85rem 1.5rem;

    border-radius: 12px;

    background: rgba(255,255,255,.08);
    color: #fff;

    border: 1px solid rgba(255,255,255,.25);

    font-family: 'Syne', sans-serif;
    font-size: .85rem;
    font-weight: 700;

    text-decoration: none;

    transition: all .3s ease;
  }

  .omedev-development .cta-outline-button:hover {
    background: rgba(255,255,255,.15);
    transform: translateY(-3px);
  }

  /* ==========================================================
     ANIMATIONS
     ========================================================== */

  @keyframes developmentFloat {
    0%, 100% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-16px);
    }
  }

  @keyframes developmentPulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }

    50% {
      transform: scale(1.4);
      opacity: .65;
    }
  }

  /* ==========================================================
     RESPONSIVE
     ========================================================== */

  @media (max-width: 1024px) {
    .omedev-development .container {
      padding: 0 1.5rem;
    }

    .omedev-development .visual-card img {
      min-height: 400px;
    }
  }

  @media (max-width: 768px) {
    .omedev-development .container {
      padding: 0 1rem;
    }

    .omedev-development .development-hero {
      min-height: 620px;
      padding: 7rem 0 5rem;
    }

    .omedev-development .hero-title {
      font-size: clamp(2.5rem, 12vw, 4rem);
    }

    .omedev-development .hero-description {
      font-size: .96rem;
    }

    .omedev-development .hero-buttons {
      width: 100%;
      max-width: 320px;
      margin: 0 auto;

      flex-direction: column;
    }

    .omedev-development .hero-buttons a {
      width: 100%;
    }

    .omedev-development .visual-card img {
      min-height: 320px;
    }

    .omedev-development .portfolio-card {
      height: 220px;
    }
  }

  @media (max-width: 480px) {
    .omedev-development .development-hero {
      min-height: 650px;
    }

    .omedev-development .hero-title {
      font-size: 2.55rem;
    }

    .omedev-development .section-title {
      font-size: 2rem;
    }

    .omedev-development .service-card {
      padding: 1.35rem;
    }

    .omedev-development .stat-card {
      padding: 1.1rem .75rem;
    }

    .omedev-development .stat-value {
      font-size: 1.8rem;
    }

    .omedev-development .final-cta {
      padding: 4rem 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .omedev-development *,
    .omedev-development *::before,
    .omedev-development *::after {
      animation-duration: .01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: .01ms !important;
      scroll-behavior: auto !important;
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
      duration: .7,
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
      staggerChildren: .08,
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
    viewport={{
      once: true,
      margin: '-70px',
    }}
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
      style={
        light
          ? {
              color: '#fff',
            }
          : {}
      }
    >
      {title}
    </motion.h2>

    <motion.div
      variants={fadeUp}
      className="divider"
    />

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

/* ============================================================
   DONNÉES
   ============================================================ */

const digitalServices = [
  {
    id: 'sites-web',
    name: 'Sites web vitrines',
    icon: Globe,
    description:
      'Design moderne, responsive, optimisé SEO et administration facile.',
    price: 'Sur devis',
  },
  {
    id: 'ecommerce',
    name: 'E-commerce performant',
    icon: ShoppingCart,
    description:
      'Boutiques en ligne avec paiement sécurisé, gestion de stock et livraison.',
    price: 'Sur devis',
  },
  {
    id: 'applications-mobiles',
    name: 'Applications mobiles',
    icon: Smartphone,
    description:
      'iOS et Android natives ou hybrides avec React Native ou Flutter.',
    price: 'Sur devis',
  },
  {
    id: 'erp',
    name: 'ERP sur mesure',
    icon: Database,
    description:
      'Gestion complète : ventes, stocks, RH, facturation et reporting.',
    price: 'Sur devis',
  },
  {
    id: 'saas',
    name: 'Solutions SaaS multi-tenant',
    icon: Cloud,
    description:
      'Plateformes évolutives avec abonnements et espace client.',
    price: 'Sur devis',
  },
  {
    id: 'maintenance',
    name: 'Maintenance & évolutivité',
    icon: Code,
    description:
      'Support continu, mises à jour, sécurité et améliorations.',
    price: 'Sur devis',
  },
]

const technologies = [
  {
    name: 'React.js / Next.js',
    icon: Code,
  },
  {
    name: 'Node.js / Express',
    icon: Code,
  },
  {
    name: 'MongoDB / PostgreSQL',
    icon: Database,
  },
  {
    name: 'Tailwind CSS',
    icon: Code,
  },
  {
    name: 'Flutter / React Native',
    icon: Smartphone,
  },
  {
    name: 'AWS',
    icon: Cloud,
  },
  {
    name: 'Docker / Kubernetes',
    icon: Cpu,
  },
  {
    name: 'GraphQL / REST API',
    icon: Zap,
  },
]

const stats = [
  {
    value: '15+',
    label: 'Projets livrés',
    icon: Rocket,
  },
  {
    value: '100%',
    label: 'Satisfaction client',
    icon: Star,
  },
  {
    value: '24/7',
    label: 'Support technique',
    icon: Clock,
  },
  {
    value: '15+',
    label: 'Experts certifiés',
    icon: Award,
  },
]

const benefits = [
  'Méthodologie Agile (SCRUM)',
  'Design UX/UI centré utilisateur',
  'Code propre, documenté et maintenable',
  'Livraison continue et déploiement automatisé',
  'Accompagnement post-livraison : formation et support',
]

const testimonials = [
  {
    name: 'Marie L.',
    role: 'Fondatrice, Startup Innov',
    quote:
      "OMEDEV a développé notre MVP en 3 mois. L’équipe est réactive, professionnelle et à l’écoute.",
    photo:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  },
  {
    name: 'David K.',
    role: 'Directeur, Groupe Retail',
    quote:
      'Notre plateforme e-commerce génère +200% de ventes grâce à l’expertise d’OMEDEV.',
    photo:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  },
]

const process = [
  {
    number: '01',
    title: 'Analyse',
    description:
      'Nous comprenons votre besoin, vos utilisateurs, vos objectifs et vos contraintes.',
  },
  {
    number: '02',
    title: 'Conception',
    description:
      'UX/UI, architecture technique et définition d’une solution claire et évolutive.',
  },
  {
    number: '03',
    title: 'Développement',
    description:
      'Développement agile, tests continus et validations régulières avec votre équipe.',
  },
  {
    number: '04',
    title: 'Déploiement',
    description:
      'Mise en production, formation, documentation et accompagnement post-livraison.',
  },
]

const portfolioImages = [
  {
    image:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1000&h=700&fit=crop',
    label: 'Applications web',
  },
  {
    image:
      'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=1000&h=700&fit=crop',
    label: 'UX / UI Design',
  },
  {
    image:
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1000&h=700&fit=crop',
    label: 'Applications mobiles',
  },
  {
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&h=700&fit=crop',
    label: 'Équipe & projets',
  },
]

/* ============================================================
   COMPOSANTS
   ============================================================ */

const ServiceCard = ({
  service,
  index,
}) => {
  const Icon = service.icon

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        margin: '-50px',
      }}
      variants={fadeUp}
      transition={{
        delay: index * .06,
      }}
      className="card-hover service-card"
    >
      <div className="service-top">
        <div className="service-icon">
          <Icon size={25} />
        </div>

        <span className="service-price">
          {service.price}
        </span>
      </div>

      <h3 className="service-title">
        {service.name}
      </h3>

      <p className="service-description">
        {service.description}
      </p>

      <Link
        to="/demander-devis"
        className="service-link"
      >
        Demander un devis
        <ArrowRight size={15} />
      </Link>
    </motion.div>
  )
}

const TechnologyCard = ({
  tech,
  index,
}) => {
  const Icon = tech.icon

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        delay: index * .06,
      }}
      className="technology-card"
    >
      <div className="technology-icon">
        <Icon size={18} />
      </div>

      <span className="technology-name">
        {tech.name}
      </span>

      <span className="tech-dot" />
    </motion.div>
  )
}

/* ============================================================
   PAGE
   ============================================================ */

const DeveloppementDigital = () => {
  return (
    <div className="omedev-development">
      <style>{globalStyles}</style>

      {/* ======================================================
          HERO
          ====================================================== */}

      <PublicHero
        badge="Développement Digital"
        title="Développement Digital"
        highlight="Digital"
        subtitle={<>Sites web, applications mobiles, ERP et SaaS — des solutions sur mesure pour accélérer votre<strong> transformation digitale</strong>.</>}
        primaryAction={{ label: 'Demander un devis', to: '/contact' }}
        secondaryAction={{ label: 'Audit gratuit', to: '/audit', icon: <Gauge size={17} /> }}
      />

      {/* ======================================================
          STATS
          ====================================================== */}

      <section className="section-dark stats-section">
        <div className="container">

          <SectionHeader
            badge="Nos performances"
            title="Le développement en quelques chiffres"
            subtitle="Une expertise orientée qualité, performance et satisfaction client."
            light
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
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
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * .1,
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
          SERVICES
          ====================================================== */}

      <section
        className="section-white"
        style={{
          padding: '6rem 0',
        }}
      >
        <div className="container">

          <SectionHeader
            badge="Nos services"
            title="Nos prestations digitales"
            subtitle="Des solutions numériques pensées pour répondre précisément aux besoins de votre entreprise."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              margin: '-50px',
            }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {digitalServices.map(
              (service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={index}
                />
              )
            )}
          </motion.div>

        </div>
      </section>

      {/* ======================================================
          TECHNOLOGIES
          ====================================================== */}

      <section
        className="section-light"
        style={{
          padding: '6rem 0',
        }}
      >
        <div className="container">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            <motion.div
              initial={{
                opacity: 0,
                x: -40,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: .7,
              }}
            >
              <span className="section-badge">
                <Sparkles size={13} />
                Stack technique
              </span>

              <h2
                className="section-title"
                style={{
                  marginTop: '1.2rem',
                }}
              >
                Technologies de pointe
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
                  maxWidth: '58ch',
                  marginBottom: '1.5rem',
                }}
              >
                Nous utilisons des technologies modernes et
                éprouvées pour construire des applications
                performantes, sécurisées et faciles à faire évoluer.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {technologies.map(
                  (tech, index) => (
                    <TechnologyCard
                      key={tech.name}
                      tech={tech}
                      index={index}
                    />
                  )
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 40,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: .7,
              }}
              className="visual-card"
            >
              <img
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1000&h=800&fit=crop"
                alt="Développement logiciel"
                loading="lazy"
              />

              <div className="visual-overlay" />

              <div className="visual-badge">
                <Code size={15} />
                Architecture moderne & scalable
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ======================================================
          POURQUOI OMEDEV
          ====================================================== */}

      <section
        className="section-white"
        style={{
          padding: '6rem 0',
        }}
      >
        <div className="container">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            <motion.div
              initial={{
                opacity: 0,
                x: -40,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: .7,
              }}
              className="visual-card"
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&h=800&fit=crop"
                alt="Équipe de développement"
                loading="lazy"
              />

              <div className="visual-overlay" />

              <div className="visual-badge">
                <Shield size={15} />
                Qualité & sécurité
              </div>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 40,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: .7,
              }}
            >
              <span className="section-badge">
                <Zap size={13} />
                Pourquoi nous
              </span>

              <h2
                className="section-title"
                style={{
                  marginTop: '1.2rem',
                }}
              >
                Pourquoi OMEDEV Digital ?
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
                  marginBottom: '1.2rem',
                }}
              >
                Nous combinons expertise technique, design et
                compréhension métier pour transformer vos idées
                en solutions numériques réellement utiles.
              </p>

              <div>
                {benefits.map(
                  (benefit, index) => (
                    <motion.div
                      key={benefit}
                      initial={{
                        opacity: 0,
                        x: -20,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        delay: index * .08,
                      }}
                      className="benefit"
                    >
                      <span className="benefit-icon">
                        <CheckCircle size={16} />
                      </span>

                      <span className="benefit-text">
                        {benefit}
                      </span>
                    </motion.div>
                  )
                )}
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <Link
                  to="/devis"
                  className="btn-primary"
                >
                  Discuter de votre projet
                  <ArrowRight size={17} />
                </Link>
              </div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* ======================================================
          MÉTHODOLOGIE
          ====================================================== */}

      <section
        className="section-light"
        style={{
          padding: '6rem 0',
        }}
      >
        <div className="container">

          <SectionHeader
            badge="Notre méthode"
            title="Une démarche claire et maîtrisée"
            subtitle="De l'idée au déploiement, chaque étape est structurée pour réduire les risques et garantir la qualité."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {process.map(
              (step, index) => (
                <motion.div
                  key={step.number}
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * .08,
                  }}
                  className="card-hover"
                  style={{
                    padding: '1.6rem',
                  }}
                >
                  <div className="process-number">
                    {step.number}
                  </div>

                  <h3
                    className="font-syne"
                    style={{
                      color: colors.navy,
                      fontSize: '1.1rem',
                      fontWeight: 800,
                      marginTop: '1.1rem',
                      marginBottom: '.6rem',
                    }}
                  >
                    {step.title}
                  </h3>

                  <p
                    style={{
                      color: '#25364A',
                      fontSize: '.85rem',
                      lineHeight: 1.7,
                    }}
                  >
                    {step.description}
                  </p>
                </motion.div>
              )
            )}

          </div>
        </div>
      </section>

      {/* ======================================================
          TÉMOIGNAGES
          ====================================================== */}

      <section
        className="section-white"
        style={{
          padding: '6rem 0',
        }}
      >
        <div className="container">
          <TestimonialsCarousel
            badge="Témoignages"
            title="Ils nous font confiance"
            subtitle="Des partenaires qui nous confient leurs projets numériques."
            items={testimonials.map((t) => ({ name: t.name, role: t.role, content: t.quote, avatar: t.photo }))}
          />
        </div>
      </section>

      {/* ======================================================
          PORTFOLIO
          ====================================================== */}

      <section
        className="section-light"
        style={{
          padding: '6rem 0',
        }}
      >
        <div className="container">

          <SectionHeader
            badge="Portfolio"
            title="Nos réalisations"
            subtitle="Quelques exemples de l’univers digital que nous pouvons construire avec vous."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {portfolioImages.map(
              (item, index) => (
                <motion.div
                  key={item.label}
                  initial={{
                    opacity: 0,
                    scale: .94,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * .08,
                  }}
                  className="portfolio-card"
                >
                  <img
                    src={item.image}
                    alt={item.label}
                    loading="lazy"
                  />

                  <div className="portfolio-label">
                    {item.label}
                  </div>
                </motion.div>
              )
            )}

          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '2rem',
            }}
          >
            <Link
              to="/realisations"
              className="btn-outline"
            >
              Voir toutes nos réalisations
              <ArrowRight size={16} />
            </Link>
          </div>

        </div>
      </section>

      {/* ==================== CTA FINALE ==================== */}
      <CTASection
        badge="Passons à l'action"
        title="Transformons votre idée en solution digitale"
        highlight="solution digitale"
        subtitle="Parlez-nous de votre projet et notre équipe vous proposera une approche adaptée à vos objectifs."
        backgroundImage="https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1920&q=80"
        primaryAction={{ label: 'Demander un devis', to: '/demander-devis' }}
        secondaryAction={{ label: 'Appeler maintenant', href: 'tel:+24355550359', icon: <Phone size={16} /> }}
      />
    </div>
  )
}

export default DeveloppementDigital

