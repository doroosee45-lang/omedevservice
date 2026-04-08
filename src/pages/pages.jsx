import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import {
  ArrowRight,
  Server,
  Shield,
  Code,
  Cloud,
  Zap,
  GraduationCap,
  CheckCircle,
  Users,
  Clock,
  Award,
  Star,
  Quote,
  Briefcase,
  Globe,
  Cpu,
  Camera,
  Wifi,
  Wrench,
  Phone,
  ThermometerSun,
  Monitor,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   DESIGN SYSTEM — Warm Off-White + Deep Slate
   ───────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  :root {
    --cream:     #f7f5f2;
    --cream-2:   #f0ede8;
    --cream-3:   #e8e3db;
    --ink:       #1a1814;
    --ink-2:     #2e2b26;
    --ink-3:     #4a4640;
    --slate:     #23201c;
    --slate-2:   #302d28;
    --accent:    #c8a96e;
    --accent-2:  #e8c97a;
    --azure:     #3b7dd8;
    --azure-2:   #6fa3e8;
    --ember:     #d45c2a;
    --emerald:   #2a8c5c;
    --muted:     #7a7570;
    --border:    rgba(26,24,20,.08);
    --border-2:  rgba(26,24,20,.14);
    --shadow-sm: 0 2px 12px rgba(26,24,20,.06);
    --shadow-md: 0 8px 40px rgba(26,24,20,.10);
    --shadow-lg: 0 24px 80px rgba(26,24,20,.14);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  /* Grain overlay on body */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: multiply;
  }

  /* ── Utility ── */
  .container-custom {
    max-width: 1240px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  /* ── Section helpers ── */
  .section-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: .5rem;
    font-family: 'Sora', sans-serif;
    font-size: .72rem;
    font-weight: 600;
    letter-spacing: .18em;
    text-transform: uppercase;
    padding: .45rem 1.1rem;
    border-radius: 99px;
    margin-bottom: 1.2rem;
  }

  .section-title {
    font-family: 'Sora', sans-serif;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -.03em;
    color: var(--ink);
    margin-bottom: .9rem;
  }

  .section-subtitle {
    font-size: 1.05rem;
    color: var(--muted);
    max-width: 48ch;
    margin: 0 auto;
    line-height: 1.7;
  }

  /* ── Divider ── */
  .ink-divider {
    width: 48px;
    height: 3px;
    background: var(--accent);
    border-radius: 99px;
    margin: 0 auto 1.5rem;
  }

  /* ── Buttons ── */
  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: .6rem;
    background: var(--ink);
    color: var(--cream);
    font-family: 'Sora', sans-serif;
    font-size: .92rem;
    font-weight: 600;
    padding: .9rem 2rem;
    border-radius: 99px;
    text-decoration: none;
    letter-spacing: .01em;
    transition: background .25s, transform .2s, box-shadow .25s;
    box-shadow: 0 4px 20px rgba(26,24,20,.2);
  }
  .btn-primary:hover {
    background: var(--ink-2);
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(26,24,20,.28);
  }

  .btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: .6rem;
    background: transparent;
    color: var(--ink);
    font-family: 'Sora', sans-serif;
    font-size: .92rem;
    font-weight: 600;
    padding: .85rem 2rem;
    border-radius: 99px;
    border: 1.5px solid var(--border-2);
    text-decoration: none;
    letter-spacing: .01em;
    transition: background .25s, border-color .25s, transform .2s;
  }
  .btn-ghost:hover {
    background: var(--cream-2);
    border-color: var(--accent);
    transform: translateY(-2px);
  }

  .btn-accent {
    display: inline-flex;
    align-items: center;
    gap: .6rem;
    background: var(--accent);
    color: var(--ink);
    font-family: 'Sora', sans-serif;
    font-size: .92rem;
    font-weight: 700;
    padding: .9rem 2rem;
    border-radius: 99px;
    text-decoration: none;
    letter-spacing: .01em;
    transition: background .25s, transform .2s, box-shadow .25s;
    box-shadow: 0 4px 20px rgba(200,169,110,.3);
  }
  .btn-accent:hover {
    background: var(--accent-2);
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(200,169,110,.4);
  }

  /* ── Card base ── */
  .card {
    background: white;
    border: 1px solid var(--border);
    border-radius: 20px;
    box-shadow: var(--shadow-sm);
    transition: box-shadow .35s, transform .35s, border-color .35s;
  }
  .card:hover {
    box-shadow: var(--shadow-lg);
    border-color: var(--border-2);
  }

  /* ── Hero ── */
  .hero-section {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    background: var(--ink);
    overflow: hidden;
    padding: 8rem 0 6rem;
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    background-image: url('https://img.freepik.com/photos-gratuite/contexte-energie-nucleaire-ia-innovation-future-technologie-rupture_53876-129783.jpg?semt=ais_hybrid&w=2000&q=90');
    background-size: cover;
    background-position: center;
    opacity: .22;
    transform: scale(1.05);
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(26,24,20,.95) 0%, rgba(26,24,20,.7) 60%, rgba(26,24,20,.85) 100%);
  }

  .hero-glow {
    position: absolute;
    top: -10%;
    left: -5%;
    width: 60%;
    height: 80%;
    background: radial-gradient(ellipse at center, rgba(200,169,110,.12) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-glow-2 {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50%;
    height: 60%;
    background: radial-gradient(ellipse at center, rgba(59,125,216,.08) 0%, transparent 70%);
    pointer-events: none;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: .6rem;
    background: rgba(200,169,110,.12);
    border: 1px solid rgba(200,169,110,.25);
    color: var(--accent-2);
    font-family: 'Sora', sans-serif;
    font-size: .72rem;
    font-weight: 600;
    letter-spacing: .18em;
    text-transform: uppercase;
    padding: .5rem 1.4rem;
    border-radius: 99px;
    backdrop-filter: blur(12px);
    margin-bottom: 2.2rem;
  }

  .hero-title {
    font-family: 'Sora', sans-serif;
    font-size: clamp(2.8rem, 7vw, 5.5rem);
    font-weight: 800;
    line-height: 1.0;
    letter-spacing: -.04em;
    color: #fff;
    margin-bottom: 1.5rem;
  }

  .hero-title .accent-word {
    color: var(--accent);
    font-style: italic;
  }

  .hero-subtitle {
    font-size: clamp(1rem, 2vw, 1.2rem);
    color: rgba(255,255,255,.6);
    max-width: 50ch;
    margin: 0 auto 3rem;
    line-height: 1.75;
    font-weight: 300;
  }

  .hero-wave {
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
  }

  /* ── Stat cards (dark) ── */
  .stat-section {
    background: var(--slate);
    padding: 5rem 0;
  }

  .stat-card {
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.06);
    border-radius: 20px;
    padding: 2.5rem 1.5rem;
    text-align: center;
  }

  /* ── Service card ── */
  .service-card {
    background: white;
    border: 1px solid var(--border);
    border-radius: 24px;
    overflow: hidden;
    box-shadow: var(--shadow-sm);
    transition: box-shadow .4s, transform .4s;
    position: relative;
  }
  .service-card:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-10px);
  }
  .service-card .icon-box {
    width: 64px;
    height: 64px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.4rem;
    transition: transform .3s;
  }
  .service-card:hover .icon-box {
    transform: scale(1.1) rotate(4deg);
  }
  .service-card-bottom-bar {
    height: 3px;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform .5s;
  }
  .service-card:hover .service-card-bottom-bar {
    transform: scaleX(1);
  }

  /* ── Product card ── */
  .product-card {
    background: var(--cream-2);
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: 2.5rem;
    transition: box-shadow .4s, transform .4s, background .4s;
    position: relative;
    overflow: hidden;
  }
  .product-card:hover {
    background: white;
    box-shadow: var(--shadow-lg);
    transform: translateY(-10px);
  }
  .product-card .accent-line {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--accent), var(--accent-2));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform .5s;
    border-radius: 99px 99px 0 0;
  }
  .product-card:hover .accent-line { transform: scaleX(1); }

  /* ── Expertise card ── */
  .expertise-card {
    padding: 2.5rem;
    border-radius: 20px;
    background: white;
    border: 1px solid var(--border);
    box-shadow: var(--shadow-sm);
    transition: box-shadow .4s, transform .4s, border-color .4s;
  }
  .expertise-card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-8px);
    border-color: var(--border-2);
  }

  /* ── Pack card ── */
  .pack-card {
    background: white;
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: 2.5rem;
    box-shadow: var(--shadow-sm);
    transition: box-shadow .4s, transform .4s, border-color .4s;
  }
  .pack-card:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-8px);
    border-color: var(--accent);
  }
  .pack-card.featured {
    background: var(--ink);
    border-color: var(--accent);
  }

  /* ── Testimonial card ── */
  .testimonial-card {
    background: var(--cream-2);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 2.2rem;
    transition: box-shadow .3s, transform .3s;
  }
  .testimonial-card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-4px);
  }

  /* ── Step ── */
  .step-number {
    font-family: 'Sora', sans-serif;
    font-size: 5rem;
    font-weight: 800;
    line-height: 1;
    color: var(--cream-3);
    letter-spacing: -.04em;
    margin-bottom: .8rem;
  }

  /* ── CTA ── */
  .cta-section {
    background: var(--ink);
    position: relative;
    overflow: hidden;
    padding: 7rem 0;
  }
  .cta-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 20% 50%, rgba(200,169,110,.12) 0%, transparent 55%),
      radial-gradient(ellipse at 80% 50%, rgba(59,125,216,.08) 0%, transparent 55%);
  }

  /* ── Tech logos ── */
  .tech-logo {
    height: 40px;
    width: auto;
    filter: grayscale(100%) opacity(0.4);
    transition: filter .3s;
  }
  .tech-logo:hover { filter: grayscale(0%) opacity(1); }

  /* ── Pulse dot ── */
  @keyframes pulse-ring {
    0%   { transform: scale(.9); opacity: 1; }
    70%  { transform: scale(1.4); opacity: 0; }
    100% { transform: scale(.9); opacity: 0; }
  }
  .pulse-dot {
    width: 10px; height: 10px;
    border-radius: 50%;
    background: #2a8c5c;
    position: relative;
  }
  .pulse-dot::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: #2a8c5c;
    animation: pulse-ring 2s ease-out infinite;
  }

  /* ── Why us strip ── */
  .why-strip {
    background: var(--cream-2);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  /* ── Scrollbar ── */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--cream); }
  ::-webkit-scrollbar-thumb { background: var(--cream-3); border-radius: 99px; }
`;

/* ─────────────────────────────────────────────
   COUNTER COMPONENT
   ───────────────────────────────────────────── */
const Counter = ({ end, suffix, duration = 2.5 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const inc = end / (duration * 60);
    const timer = setInterval(() => {
      start += inc;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

/* ─────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────── */
const services = [
  { icon: Server,       title: 'Réseau & Infrastructure',    description: 'Câblage structuré, WiFi entreprise, fibre optique',     color: '#3b7dd8', bg: 'linear-gradient(135deg,#3b7dd8,#2ec4dd)', bar: 'linear-gradient(90deg,#3b7dd8,#2ec4dd)', link: '/services/reseau' },
  { icon: Shield,       title: 'Cybersécurité & Surveillance', description: 'Firewalls, audits, vidéosurveillance intelligente',  color: '#d45c2a', bg: 'linear-gradient(135deg,#d45c2a,#f09030)', bar: 'linear-gradient(90deg,#d45c2a,#f09030)', link: '/services/securite' },
  { icon: Code,         title: 'Développement Digital',       description: 'Applications web, mobiles, ERP sur mesure',            color: '#7c3aed', bg: 'linear-gradient(135deg,#7c3aed,#c026d3)', bar: 'linear-gradient(90deg,#7c3aed,#c026d3)', link: '/services/developpement' },
  { icon: Cloud,        title: 'Cloud & Télécommunications',  description: 'Hébergement cloud, VoIP, solutions télécom',           color: '#0ea5e9', bg: 'linear-gradient(135deg,#0ea5e9,#3b7dd8)', bar: 'linear-gradient(90deg,#0ea5e9,#3b7dd8)', link: '/services/cloud' },
  { icon: Zap,          title: 'Énergie & Maintenance',       description: 'Panneaux solaires, maintenance préventive 24/7',       color: '#d4a017', bg: 'linear-gradient(135deg,#d4a017,#f09030)', bar: 'linear-gradient(90deg,#d4a017,#f09030)', link: '/services/energie' },
  { icon: GraduationCap, title: 'Formation & Accompagnement', description: 'Formations certifiantes et transfert de compétences',  color: '#2a8c5c', bg: 'linear-gradient(135deg,#2a8c5c,#0ea5e9)', bar: 'linear-gradient(90deg,#2a8c5c,#0ea5e9)', link: '/services/formation' },
];

const products = [
  { icon: ThermometerSun, title: 'Climatisation Professionnelle', description: 'Split, VRV, gainables — systèmes de refroidissement haute performance pour bureaux et data centres.', color: '#0ea5e9', bg: 'linear-gradient(135deg,#0ea5e9,#2ec4dd)' },
  { icon: Monitor,        title: 'Ordinateurs & Matériel IT',    description: 'PC de bureau, laptops pro, serveurs, écrans et accessoires issus des meilleures marques mondiales.', color: '#7c3aed', bg: 'linear-gradient(135deg,#7c3aed,#a855f7)' },
  { icon: Camera,         title: 'Caméras de Surveillance',      description: 'Caméras IP 4K, PTZ, IA de détection intégrée, enregistrement cloud sécurisé et monitoring continu.', color: '#d45c2a', bg: 'linear-gradient(135deg,#d45c2a,#f09030)' },
];

const expertise = [
  { icon: Code,  title: 'Développement Logiciel',    desc: 'Apps web & mobiles sur mesure, API, IA intégrée',          bg: 'linear-gradient(135deg,#7c3aed,#c026d3)' },
  { icon: Phone, title: 'Télécommunications',         desc: 'Réseaux VoIP, fibre, communication unifiée',               bg: 'linear-gradient(135deg,#0ea5e9,#3b7dd8)' },
  { icon: Camera, title: 'Vidéosurveillance',         desc: 'Caméras IP, IA de reconnaissance, monitoring 24/7',        bg: 'linear-gradient(135deg,#d45c2a,#f09030)' },
  { icon: Wrench, title: 'Maintenance & Support',     desc: 'Maintenance préventive, corrective, assistance dédiée',    bg: 'linear-gradient(135deg,#2a8c5c,#0ea5e9)' },
];

const stats = [
  { icon: Users,  value: 150, label: 'Clients satisfaits', suffix: '+' },
  { icon: Code,   value: 200, label: 'Projets réalisés',   suffix: '+' },
  { icon: Clock,  value: 24,  label: 'Support technique',  suffix: '/7' },
  { icon: Award,  value: 100, label: 'Qualité garantie',   suffix: '%' },
];

const packs = [
  { name: 'Pack Entreprise', features: ['Réseau complet + Sécurité', 'ERP sur mesure', 'Support prioritaire', 'Maintenance incluse'], icon: Briefcase, featured: false },
  { name: 'Pack Digital Complet', features: ['Site + Application', 'Télécom & Surveillance', 'Cloud sécurisé', 'Formation équipe'], icon: Cpu, featured: true },
  { name: 'Pack E-commerce', features: ['Site performant + Mobile', 'Paiement intégré', 'SEO local', 'Hébergement cloud'], icon: Globe, featured: false },
];

const testimonials = [
  { name: 'Jean M.', position: 'CEO, TechCorp', content: 'OMDEVE a transformé notre infrastructure IT. Service impeccable et équipe très professionnelle.', rating: 5, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Sarah K.', position: 'Directrice, Energy Solutions', content: "L'installation des panneaux solaires a été réalisée avec excellence. Économies d'énergie significatives.", rating: 5, avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { name: 'Marc L.', position: 'CTO, Digital Africa', content: 'La plateforme e-commerce développée est performante et élégante. Hautement recommandé.', rating: 5, avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
];

const steps = [
  { n: '01', title: 'Audit & Conseil',        desc: 'Analyse de vos besoins et diagnostic gratuit.' },
  { n: '02', title: 'Proposition sur mesure', desc: 'Devis détaillé et planning transparent.' },
  { n: '03', title: 'Déploiement',            desc: 'Installation, configuration et tests qualité.' },
  { n: '04', title: 'Support & Évolution',    desc: 'Maintenance et améliorations continues.' },
];

const techLogos = [
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftazure/microsoftazure-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
];

/* ─────────────────────────────────────────────
   ANIMATION PRESETS
   ───────────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: .7, ease: 'easeOut' } },
};
const stagger = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: .1 } },
};

/* ─────────────────────────────────────────────
   HOME COMPONENT
   ───────────────────────────────────────────── */
const Home = () => (
  <>
    <style>{css}</style>
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: 'var(--cream)' }}>

      {/* ══════════════ HERO ══════════════ */}
      <section className="hero-section">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-glow" />
        <div className="hero-glow-2" />

        <div className="container-custom" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            initial="hidden" animate="visible" variants={stagger}
            style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center' }}
          >
            <motion.div variants={fadeUp}>
              <div className="hero-badge">
                <div className="pulse-dot" />
                OMDEVE Services • Kinshasa & Afrique
              </div>
            </motion.div>

            <motion.h1 variants={fadeUp} className="hero-title">
              Votre partenaire<br />
              <span className="accent-word">technologique</span><br />
              de confiance
            </motion.h1>

            <motion.p variants={fadeUp} className="hero-subtitle">
              Développement · Télécom · Vidéosurveillance · Climatisation · Matériel IT
            </motion.p>

            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/demander-devis" className="btn-accent" style={{ fontSize: '1rem' }}>
                Demander un devis <ArrowRight size={18} />
              </Link>
              <Link to="/audit-gratuit" className="btn-ghost" style={{ color: 'rgba(255,255,255,.75)', borderColor: 'rgba(255,255,255,.2)', fontSize: '1rem' }}>
                Audit gratuit <CheckCircle size={18} />
              </Link>
              <Link to="/boutique" className="btn-ghost" style={{ color: 'rgba(255,255,255,.75)', borderColor: 'rgba(255,255,255,.2)', fontSize: '1rem' }}>
                Voir nos produits <ChevronRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Wave */}
        <div className="hero-wave">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" style={{ width: '100%', height: 80, display: 'block' }}>
            <path d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,100 L0,100 Z" fill="var(--cream)" />
          </svg>
        </div>
      </section>

      {/* ══════════════ EXPERTISE CARDS ══════════════ */}
      <section style={{ padding: '6rem 0', background: 'var(--cream)' }}>
        <div className="container-custom">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <motion.div variants={fadeUp}>
              <span className="section-eyebrow" style={{ background: 'var(--cream-3)', color: 'var(--ink-3)' }}>
                <Sparkles size={13} /> Savoir-faire technique
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="section-title">Domaines d'excellence</motion.h2>
            <motion.div variants={fadeUp} className="ink-divider" />
            <motion.p variants={fadeUp} className="section-subtitle">
              Nous maîtrisons l'ensemble de votre écosystème technologique
            </motion.p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {expertise.map((item, idx) => (
              <motion.div
                key={idx}
                className="expertise-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * .08 }}
              >
                <div style={{ width: 56, height: 56, borderRadius: 14, background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem', boxShadow: '0 6px 20px rgba(0,0,0,.12)' }}>
                  <item.icon size={26} color="white" />
                </div>
                <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.1rem', fontWeight: 700, marginBottom: '.5rem', color: 'var(--ink)' }}>{item.title}</h3>
                <p style={{ fontSize: '.92rem', color: 'var(--muted)', lineHeight: 1.65 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ SERVICES ══════════════ */}
      <section style={{ padding: '6rem 0', background: 'var(--cream-2)' }}>
        <div className="container-custom">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <motion.div variants={fadeUp}>
              <span className="section-eyebrow" style={{ background: 'rgba(59,125,216,.08)', color: 'var(--azure)' }}>
                Nos services
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="section-title">Solutions Intégrées</motion.h2>
            <motion.div variants={fadeUp} className="ink-divider" />
            <motion.p variants={fadeUp} className="section-subtitle">
              De l'infrastructure aux applications, nous couvrons tout le cycle technologique
            </motion.p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {services.map((svc, idx) => (
              <motion.div
                key={idx}
                className="service-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * .07 }}
              >
                <div style={{ padding: '2.2rem' }}>
                  <div className="icon-box" style={{ background: svc.bg, boxShadow: `0 6px 20px ${svc.color}30` }}>
                    <svc.icon size={28} color="white" />
                  </div>
                  <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.15rem', fontWeight: 700, marginBottom: '.55rem', color: 'var(--ink)' }}>{svc.title}</h3>
                  <p style={{ fontSize: '.9rem', color: 'var(--muted)', lineHeight: 1.65, marginBottom: '1.4rem' }}>{svc.description}</p>
                  <Link to={svc.link} style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', fontSize: '.88rem', fontWeight: 600, fontFamily: "'Sora', sans-serif", color: svc.color, textDecoration: 'none' }}>
                    Découvrir <ArrowRight size={15} />
                  </Link>
                </div>
                <div className="service-card-bottom-bar" style={{ background: svc.bar }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ STATS ══════════════ */}
      <section className="stat-section">
        <div className="container-custom">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
            {stats.map((s, idx) => (
              <motion.div
                key={idx}
                className="stat-card"
                initial={{ opacity: 0, scale: .85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * .1 }}
              >
                <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(200,169,110,.12)', border: '1px solid rgba(200,169,110,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.2rem' }}>
                  <s.icon size={24} color="var(--accent)" />
                </div>
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '3rem', fontWeight: 800, color: 'white', letterSpacing: '-.04em', marginBottom: '.4rem' }}>
                  <Counter end={s.value} suffix={s.suffix} />
                </div>
                <p style={{ fontSize: '.88rem', color: 'rgba(255,255,255,.5)' }}>{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ PRODUITS ══════════════ */}
      <section style={{ padding: '6rem 0', background: 'var(--cream)' }}>
        <div className="container-custom">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <motion.div variants={fadeUp}>
              <span className="section-eyebrow" style={{ background: 'rgba(200,169,110,.12)', color: 'var(--accent)' }}>
                Produits & Équipements
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="section-title">Achetez chez nous</motion.h2>
            <motion.div variants={fadeUp} className="ink-divider" />
            <motion.p variants={fadeUp} className="section-subtitle">
              Climatiseurs · Matériel IT · Caméras — directement livrés et installés
            </motion.p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.5rem' }}>
            {products.map((p, idx) => (
              <motion.div
                key={idx}
                className="product-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * .1 }}
              >
                <div className="accent-line" />
                <div style={{ width: 60, height: 60, borderRadius: 16, background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.4rem', boxShadow: `0 6px 20px ${p.color}25` }}>
                  <p.icon size={28} color="white" />
                </div>
                <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.2rem', fontWeight: 700, marginBottom: '.6rem', color: 'var(--ink)' }}>{p.title}</h3>
                <p style={{ fontSize: '.9rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1.6rem' }}>{p.description}</p>
                <Link to="/boutique" style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', fontSize: '.88rem', fontWeight: 700, fontFamily: "'Sora', sans-serif", color: 'var(--ink)', textDecoration: 'none', borderBottom: '1.5px solid var(--accent)', paddingBottom: '1px' }}>
                  Voir les produits <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ PROCESSUS ══════════════ */}
      <section style={{ padding: '6rem 0', background: 'var(--cream-2)' }}>
        <div className="container-custom">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <motion.div variants={fadeUp}>
              <span className="section-eyebrow" style={{ background: 'var(--cream-3)', color: 'var(--ink-3)' }}>Méthodologie</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="section-title">Notre processus</motion.h2>
            <motion.div variants={fadeUp} className="ink-divider" />
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', position: 'relative' }}>
            {steps.map((s, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * .1 }}
                style={{ background: 'white', borderRadius: 20, padding: '2.2rem', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', position: 'relative' }}
              >
                <div className="step-number">{s.n}</div>
                <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: '1.05rem', marginBottom: '.5rem', color: 'var(--ink)' }}>{s.title}</h3>
                <p style={{ fontSize: '.88rem', color: 'var(--muted)', lineHeight: 1.65 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ PACK SOLUTIONS ══════════════ */}
      <section style={{ padding: '6rem 0', background: 'var(--cream)' }}>
        <div className="container-custom">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <motion.div variants={fadeUp}>
              <span className="section-eyebrow" style={{ background: 'rgba(124,58,237,.08)', color: '#7c3aed' }}>Solutions packagées</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="section-title">Offres Clé en Main</motion.h2>
            <motion.div variants={fadeUp} className="ink-divider" />
            <motion.p variants={fadeUp} className="section-subtitle">Choisissez l'offre adaptée à votre entreprise</motion.p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
            {packs.map((pack, idx) => (
              <motion.div
                key={idx}
                className={`pack-card ${pack.featured ? 'featured' : ''}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * .1 }}
              >
                <div style={{ width: 52, height: 52, borderRadius: 14, background: pack.featured ? 'rgba(200,169,110,.15)' : 'var(--cream-2)', border: `1px solid ${pack.featured ? 'rgba(200,169,110,.3)' : 'var(--border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.4rem' }}>
                  <pack.icon size={24} color={pack.featured ? 'var(--accent)' : 'var(--ink-3)'} />
                </div>
                <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.3rem', fontWeight: 800, marginBottom: '.4rem', color: pack.featured ? 'white' : 'var(--ink)' }}>{pack.name}</h3>
                <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '1.6rem', fontFamily: "'Sora', sans-serif" }}>Sur devis</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '.85rem', marginBottom: '2rem' }}>
                  {pack.features.map((f, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '.65rem', fontSize: '.9rem', color: pack.featured ? 'rgba(255,255,255,.75)' : 'var(--ink-3)' }}>
                      <CheckCircle size={17} color={pack.featured ? 'var(--accent)' : '#2a8c5c'} style={{ flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/demander-devis" className={pack.featured ? 'btn-accent' : 'btn-primary'} style={{ width: '100%', justifyContent: 'center' }}>
                  Demander ce pack <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ TÉMOIGNAGES ══════════════ */}
      <section style={{ padding: '6rem 0', background: 'var(--cream-2)' }}>
        <div className="container-custom">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <motion.div variants={fadeUp}>
              <span className="section-eyebrow" style={{ background: 'rgba(42,140,92,.08)', color: 'var(--emerald)' }}>Témoignages</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="section-title">Ils nous font confiance</motion.h2>
            <motion.div variants={fadeUp} className="ink-divider" />
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.5rem' }}>
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                className="testimonial-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * .1 }}
              >
                <Quote size={28} color="var(--cream-3)" style={{ marginBottom: '1rem' }} />
                <p style={{ fontSize: '.95rem', color: 'var(--ink-3)', fontStyle: 'italic', lineHeight: 1.75, marginBottom: '1.8rem' }}>"{t.content}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img src={t.avatar} alt={t.name} style={{ width: 48, height: 48, borderRadius: 12, objectFit: 'cover', border: '2px solid var(--cream-3)' }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, fontSize: '.92rem', color: 'var(--ink)', fontFamily: "'Sora', sans-serif" }}>{t.name}</p>
                    <p style={{ fontSize: '.8rem', color: 'var(--muted)' }}>{t.position}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[...Array(t.rating)].map((_, i) => <Star key={i} size={14} fill="#d4a017" color="#d4a017" />)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ WHY US ══════════════ */}
      <section className="why-strip" style={{ padding: '5rem 0' }}>
        <div className="container-custom">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
            <div style={{ gridColumn: 'span 1' }}>
              <span className="section-eyebrow" style={{ background: 'var(--cream-3)', color: 'var(--ink-3)' }}>Pourquoi OMDEVE</span>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 'clamp(1.8rem,3.5vw,2.4rem)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-.03em', color: 'var(--ink)', marginTop: '1rem' }}>
                Une expertise locale,<br />des standards mondiaux
              </h2>
            </div>
            {[
              { icon: CheckCircle, label: 'Expertise locale & internationale', color: '#2a8c5c' },
              { icon: Clock,       label: 'Support 24/7 réactif',              color: '#3b7dd8' },
              { icon: Award,       label: 'Qualité & Garantie SLA',            color: '#d4a017' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * .1 }}
                style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${item.color}12`, border: `1px solid ${item.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <item.icon size={20} color={item.color} />
                </div>
                <div>
                  <p style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: '.95rem', color: 'var(--ink)', marginBottom: '.3rem' }}>{item.label}</p>
                  <p style={{ fontSize: '.85rem', color: 'var(--muted)', lineHeight: 1.6 }}>Un engagement concret et mesurable pour votre succès.</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ TECH LOGOS ══════════════ */}
      <section style={{ padding: '4rem 0', background: 'var(--cream)' }}>
        <div className="container-custom" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '.75rem', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '2.5rem', fontFamily: "'Sora', sans-serif" }}>
            Nos partenaires technologiques
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '2.5rem' }}>
            {techLogos.map((logo, idx) => (
              <motion.img
                key={idx}
                src={logo}
                alt="tech"
                className="tech-logo"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * .06 }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ CTA ══════════════ */}
      <section className="cta-section">
        <div className="container-custom" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .8 }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', background: 'rgba(200,169,110,.12)', border: '1px solid rgba(200,169,110,.22)', color: 'var(--accent)', fontFamily: "'Sora', sans-serif", fontSize: '.72rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', padding: '.45rem 1.1rem', borderRadius: 99, marginBottom: '2rem' }}>
              <Sparkles size={13} /> Passez à l'action
            </div>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 'clamp(2.2rem,5vw,3.5rem)', fontWeight: 800, color: 'white', letterSpacing: '-.035em', lineHeight: 1.1, marginBottom: '1.2rem' }}>
              Prêt à transformer<br />votre entreprise ?
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,.5)', marginBottom: '3rem', maxWidth: '44ch', margin: '0 auto 3rem', lineHeight: 1.7 }}>
              Climatisation · Matériel IT · Caméras · Solutions digitales complètes
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/demander-devis" className="btn-accent" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
                Demander un devis <ArrowRight size={18} />
              </Link>
              <Link to="/audit-gratuit" className="btn-ghost" style={{ color: 'rgba(255,255,255,.7)', borderColor: 'rgba(255,255,255,.15)', fontSize: '1rem', padding: '1rem 2.5rem' }}>
                Audit gratuit <CheckCircle size={18} />
              </Link>
              <Link to="/boutique" className="btn-ghost" style={{ color: 'rgba(255,255,255,.7)', borderColor: 'rgba(255,255,255,.15)', fontSize: '1rem', padding: '1rem 2.5rem' }}>
                Voir nos produits <ChevronRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  </>
);

export default Home;
































changer vraiment ces couleur mettez un couleur profesionnelle rend ca propre moderne et dynamique import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import {
  ArrowRight,
  Server,
  Shield,
  Code,
  Cloud,
  Zap,
  GraduationCap,
  CheckCircle,
  Users,
  Clock,
  Award,
  Star,
  Quote,
  Briefcase,
  Globe,
  Cpu,
  Camera,
  Wifi,
  Wrench,
  Phone,
  ThermometerSun,
  Monitor,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   DESIGN SYSTEM — Warm Off-White + Deep Slate
   ───────────────────────────────────────────── */
const styles = {
  colors: {
    cream: '#f7f5f2',
    cream2: '#f0ede8',
    cream3: '#e8e3db',
    ink: '#1a1814',
    ink2: '#2e2b26',
    ink3: '#4a4640',
    slate: '#23201c',
    accent: '#c8a96e',
    accent2: '#e8c97a',
    azure: '#3b7dd8',
    emerald: '#2a8c5c',
    muted: '#7a7570',
  },
  shadows: {
    sm: '0 2px 12px rgba(26,24,20,.06)',
    md: '0 8px 40px rgba(26,24,20,.10)',
    lg: '0 24px 80px rgba(26,24,20,.14)',
  },
  animation: {
    duration: 0.7,
    stagger: 0.1,
  },
};

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: ${styles.colors.cream};
    color: ${styles.colors.ink};
    overflow-x: hidden;
  }

  .container {
    max-width: 1240px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .section-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: 'Sora', sans-serif;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 0.45rem 1.1rem;
    border-radius: 99px;
    margin-bottom: 1.2rem;
  }

  .section-title {
    font-family: 'Sora', sans-serif;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.03em;
    margin-bottom: 0.9rem;
  }

  .section-subtitle {
    font-size: 1.05rem;
    color: ${styles.colors.muted};
    max-width: 48ch;
    margin: 0 auto;
    line-height: 1.7;
  }

  .divider {
    width: 48px;
    height: 3px;
    background: ${styles.colors.accent};
    border-radius: 99px;
    margin: 0 auto 1.5rem;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    background: ${styles.colors.ink};
    color: ${styles.colors.cream};
    font-family: 'Sora', sans-serif;
    font-size: 0.92rem;
    font-weight: 600;
    padding: 0.9rem 2rem;
    border-radius: 99px;
    text-decoration: none;
    transition: all 0.25s ease;
    cursor: pointer;
    border: none;
  }

  .btn-primary:hover {
    background: ${styles.colors.ink2};
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(26,24,20,.28);
  }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    background: transparent;
    color: ${styles.colors.ink};
    font-family: 'Sora', sans-serif;
    font-size: 0.92rem;
    font-weight: 600;
    padding: 0.85rem 2rem;
    border-radius: 99px;
    border: 1.5px solid rgba(26,24,20,.14);
    text-decoration: none;
    transition: all 0.25s ease;
    cursor: pointer;
  }

  .btn-secondary:hover {
    background: ${styles.colors.cream2};
    border-color: ${styles.colors.accent};
    transform: translateY(-2px);
  }

  .btn-accent {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    background: ${styles.colors.accent};
    color: ${styles.colors.ink};
    font-family: 'Sora', sans-serif;
    font-size: 0.92rem;
    font-weight: 700;
    padding: 0.9rem 2rem;
    border-radius: 99px;
    text-decoration: none;
    transition: all 0.25s ease;
    cursor: pointer;
    border: none;
  }

  .btn-accent:hover {
    background: ${styles.colors.accent2};
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(200,169,110,.4);
  }

  .card {
    background: white;
    border: 1px solid rgba(26,24,20,.08);
    border-radius: 20px;
    transition: all 0.35s ease;
  }

  .card:hover {
    box-shadow: ${styles.shadows.lg};
    border-color: rgba(26,24,20,.14);
    transform: translateY(-4px);
  }

  @keyframes pulse-ring {
    0% { transform: scale(0.9); opacity: 1; }
    70% { transform: scale(1.4); opacity: 0; }
    100% { transform: scale(0.9); opacity: 0; }
  }
`;

/* ─────────────────────────────────────────────
   ANIMATION PRESETS
   ───────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: styles.animation.duration, ease: 'easeOut' } 
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: styles.animation.duration } 
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: styles.animation.stagger },
  },
};

/* ─────────────────────────────────────────────
   COMPONENTS
   ───────────────────────────────────────────── */
const SectionHeader = ({ badge, title, subtitle }) => (
  <motion.div variants={staggerContainer} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
    {badge && (
      <motion.div variants={fadeUp}>
        <span className="section-badge">{badge}</span>
      </motion.div>
    )}
    <motion.h2 variants={fadeUp} className="section-title">{title}</motion.h2>
    <motion.div variants={fadeUp} className="divider" />
    {subtitle && (
      <motion.p variants={fadeUp} className="section-subtitle">{subtitle}</motion.p>
    )}
  </motion.div>
);

const Counter = ({ end, suffix, duration = 2.5 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const inc = end / (duration * 60);
    const timer = setInterval(() => {
      start += inc;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

/* ─────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────── */
const services = [
  { icon: Server, title: 'Réseau & Infrastructure', description: 'Câblage structuré, WiFi entreprise, fibre optique', color: '#3b7dd8', gradient: 'linear-gradient(135deg,#3b7dd8,#2ec4dd)' },
  { icon: Shield, title: 'Cybersécurité & Surveillance', description: 'Firewalls, audits, vidéosurveillance intelligente', color: '#d45c2a', gradient: 'linear-gradient(135deg,#d45c2a,#f09030)' },
  { icon: Code, title: 'Développement Digital', description: 'Applications web, mobiles, ERP sur mesure', color: '#7c3aed', gradient: 'linear-gradient(135deg,#7c3aed,#c026d3)' },
  { icon: Cloud, title: 'Cloud & Télécommunications', description: 'Hébergement cloud, VoIP, solutions télécom', color: '#0ea5e9', gradient: 'linear-gradient(135deg,#0ea5e9,#3b7dd8)' },
  { icon: Zap, title: 'Énergie & Maintenance', description: 'Panneaux solaires, maintenance préventive 24/7', color: '#d4a017', gradient: 'linear-gradient(135deg,#d4a017,#f09030)' },
  { icon: GraduationCap, title: 'Formation & Accompagnement', description: 'Formations certifiantes et transfert de compétences', color: '#2a8c5c', gradient: 'linear-gradient(135deg,#2a8c5c,#0ea5e9)' },
];

const products = [
  { icon: ThermometerSun, title: 'Climatisation Professionnelle', description: 'Split, VRV, gainables — systèmes de refroidissement haute performance', color: '#0ea5e9', gradient: 'linear-gradient(135deg,#0ea5e9,#2ec4dd)' },
  { icon: Monitor, title: 'Ordinateurs & Matériel IT', description: 'PC de bureau, laptops pro, serveurs, écrans et accessoires', color: '#7c3aed', gradient: 'linear-gradient(135deg,#7c3aed,#a855f7)' },
  { icon: Camera, title: 'Caméras de Surveillance', description: 'Caméras IP 4K, PTZ, IA de détection intégrée', color: '#d45c2a', gradient: 'linear-gradient(135deg,#d45c2a,#f09030)' },
];

const stats = [
  { icon: Users, value: 150, label: 'Clients satisfaits', suffix: '+' },
  { icon: Code, value: 200, label: 'Projets réalisés', suffix: '+' },
  { icon: Clock, value: 24, label: 'Support technique', suffix: '/7' },
  { icon: Award, value: 100, label: 'Qualité garantie', suffix: '%' },
];

const testimonials = [
  { name: 'Jean M.', position: 'CEO, TechCorp', content: 'OMDEVE a transformé notre infrastructure IT. Service impeccable et équipe très professionnelle.', rating: 5, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Sarah K.', position: 'Directrice, Energy Solutions', content: "L'installation des panneaux solaires a été réalisée avec excellence.", rating: 5, avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { name: 'Marc L.', position: 'CTO, Digital Africa', content: 'La plateforme e-commerce développée est performante et élégante.', rating: 5, avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
];

/* ─────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────── */
const Home = () => {
  return (
    <>
      <style>{globalStyles}</style>
      
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: styles.colors.slate,
        overflow: 'hidden',
        padding: '8rem 0 6rem',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(26,24,20,.95) 0%, rgba(26,24,20,.7) 100%)',
        }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            style={{ maxWidth: 820, margin: '0 auto' }}
          >
            <motion.div variants={fadeUp}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                background: 'rgba(200,169,110,.12)',
                border: '1px solid rgba(200,169,110,.25)',
                color: styles.colors.accent2,
                padding: '0.5rem 1.4rem',
                borderRadius: 99,
                marginBottom: '2.2rem',
              }}>
                <div style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: styles.colors.emerald,
                  position: 'relative',
                }}>
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    background: styles.colors.emerald,
                    animation: 'pulse-ring 2s ease-out infinite',
                  }} />
                </div>
                OMDEVE Services • Kinshasa & Afrique
              </div>
            </motion.div>

            <motion.h1 variants={fadeUp} style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              color: '#fff',
              marginBottom: '1.5rem',
            }}>
              Votre partenaire<br />
              <span style={{ color: styles.colors.accent, fontStyle: 'italic' }}>technologique</span><br />
              de confiance
            </motion.h1>

            <motion.p variants={fadeUp} style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'rgba(255,255,255,.6)',
              maxWidth: '50ch',
              margin: '0 auto 3rem',
              lineHeight: 1.75,
            }}>
              Développement · Télécom · Vidéosurveillance · Climatisation · Matériel IT
            </motion.p>

            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/demander-devis" className="btn-accent">Demander un devis <ArrowRight size={18} /></Link>
              <Link to="/audit-gratuit" className="btn-secondary" style={{ color: 'rgba(255,255,255,.75)', borderColor: 'rgba(255,255,255,.2)' }}>Audit gratuit <CheckCircle size={18} /></Link>
              <Link to="/boutique" className="btn-secondary" style={{ color: 'rgba(255,255,255,.75)', borderColor: 'rgba(255,255,255,.2)' }}>Voir nos produits <ChevronRight size={18} /></Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section style={{ padding: '6rem 0', background: styles.colors.cream2 }}>
        <div className="container">
          <SectionHeader 
            badge={<><Sparkles size={13} /> Nos services</>}
            title="Solutions Intégrées"
            subtitle="De l'infrastructure aux applications, nous couvrons tout le cycle technologique"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                className="card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07 }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ padding: '2.2rem' }}>
                  <div style={{
                    width: 64,
                    height: 64,
                    borderRadius: 16,
                    background: service.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.4rem',
                    boxShadow: `0 6px 20px ${service.color}30`,
                  }}>
                    <service.icon size={28} color="white" />
                  </div>
                  <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.55rem' }}>{service.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: styles.colors.muted, lineHeight: 1.65, marginBottom: '1.4rem' }}>{service.description}</p>
                  <Link to="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem', fontWeight: 600, color: service.color, textDecoration: 'none' }}>
                    Découvrir <ArrowRight size={15} />
                  </Link>
                </div>
                <div style={{ height: 3, background: service.gradient, transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.5s' }} className="hover-line" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ background: styles.colors.slate, padding: '5rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                style={{
                  background: 'rgba(255,255,255,.04)',
                  border: '1px solid rgba(255,255,255,.06)',
                  borderRadius: 20,
                  padding: '2.5rem 1.5rem',
                  textAlign: 'center',
                }}
              >
                <div style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: 'rgba(200,169,110,.12)',
                  border: '1px solid rgba(200,169,110,.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.2rem',
                }}>
                  <stat.icon size={24} color={styles.colors.accent} />
                </div>
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '3rem', fontWeight: 800, color: 'white', marginBottom: '0.4rem' }}>
                  <Counter end={stat.value} suffix={stat.suffix} />
                </div>
                <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,.5)' }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section style={{ padding: '6rem 0', background: styles.colors.cream }}>
        <div className="container">
          <SectionHeader 
            badge="Produits & Équipements"
            title="Achetez chez nous"
            subtitle="Climatiseurs · Matériel IT · Caméras — directement livrés et installés"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.5rem' }}>
            {products.map((product, idx) => (
              <motion.div
                key={idx}
                className="card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                style={{ padding: '2.5rem', position: 'relative', overflow: 'hidden' }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: `linear-gradient(90deg, ${styles.colors.accent}, ${styles.colors.accent2})`,
                  transform: 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 0.5s',
                }} className="hover-line" />
                
                <div style={{
                  width: 60,
                  height: 60,
                  borderRadius: 16,
                  background: product.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.4rem',
                  boxShadow: `0 6px 20px ${product.color}25`,
                }}>
                  <product.icon size={28} color="white" />
                </div>
                <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.6rem' }}>{product.title}</h3>
                <p style={{ fontSize: '0.9rem', color: styles.colors.muted, lineHeight: 1.7, marginBottom: '1.6rem' }}>{product.description}</p>
                <Link to="/boutique" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem', fontWeight: 700, color: styles.colors.ink, textDecoration: 'none', borderBottom: `1.5px solid ${styles.colors.accent}` }}>
                  Voir les produits <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{ padding: '6rem 0', background: styles.colors.cream2 }}>
        <div className="container">
          <SectionHeader 
            badge="Témoignages"
            title="Ils nous font confiance"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.5rem' }}>
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                className="card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                style={{ padding: '2.2rem' }}
              >
                <Quote size={28} color={styles.colors.cream3} style={{ marginBottom: '1rem' }} />
                <p style={{ fontSize: '0.95rem', color: styles.colors.ink3, fontStyle: 'italic', lineHeight: 1.75, marginBottom: '1.8rem' }}>"{testimonial.content}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img src={testimonial.avatar} alt={testimonial.name} style={{ width: 48, height: 48, borderRadius: 12, objectFit: 'cover', border: `2px solid ${styles.colors.cream3}` }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, fontSize: '0.92rem', fontFamily: "'Sora', sans-serif" }}>{testimonial.name}</p>
                    <p style={{ fontSize: '0.8rem', color: styles.colors.muted }}>{testimonial.position}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="#d4a017" color="#d4a017" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        background: styles.colors.ink,
        position: 'relative',
        overflow: 'hidden',
        padding: '7rem 0',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 20% 50%, rgba(200,169,110,.12) 0%, transparent 55%),
                       radial-gradient(ellipse at 80% 50%, rgba(59,125,216,.08) 0%, transparent 55%)`,
        }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(200,169,110,.12)',
              border: '1px solid rgba(200,169,110,.22)',
              color: styles.colors.accent,
              padding: '0.45rem 1.1rem',
              borderRadius: 99,
              marginBottom: '2rem',
            }}>
              <Sparkles size={13} /> Passez à l'action
            </div>
            
            <h2 style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: 'clamp(2.2rem,5vw,3.5rem)',
              fontWeight: 800,
              color: 'white',
              letterSpacing: '-0.035em',
              lineHeight: 1.1,
              marginBottom: '1.2rem',
            }}>
              Prêt à transformer<br />votre entreprise ?
            </h2>
            
            <p style={{
              fontSize: '1.1rem',
              color: 'rgba(255,255,255,.5)',
              marginBottom: '3rem',
              maxWidth: '44ch',
              margin: '0 auto 3rem',
              lineHeight: 1.7,
            }}>
              Climatisation · Matériel IT · Caméras · Solutions digitales complètes
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/demander-devis" className="btn-accent" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
                Demander un devis <ArrowRight size={18} />
              </Link>
              <Link to="/audit-gratuit" className="btn-secondary" style={{ color: 'rgba(255,255,255,.7)', borderColor: 'rgba(255,255,255,.15)', fontSize: '1rem', padding: '1rem 2.5rem' }}>
                Audit gratuit <CheckCircle size={18} />
              </Link>
              <Link to="/boutique" className="btn-secondary" style={{ color: 'rgba(255,255,255,.7)', borderColor: 'rgba(255,255,255,.15)', fontSize: '1rem', padding: '1rem 2.5rem' }}>
                Voir nos produits <ChevronRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        .hover-line {
          transition: transform 0.5s ease;
        }
        .card:hover .hover-line {
          transform: scaleX(1);
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.9); opacity: 1; }
          70% { transform: scale(1.4); opacity: 0; }
          100% { transform: scale(0.9); opacity: 0; }
        }
      `}</style>
    </>
  );
};

export default Home;