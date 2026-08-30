import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import CTASection from '../components/Public/CTASection';
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
  TrendingUp,
  Headphones,
  Rocket,
  Target,
  Layers,
  BarChart3,
  TrendingDown,
  FileText,
  Lock,
  AlertTriangle, Handshake
} from 'lucide-react';








/* ─────────────────────────────────────────────
   DESIGN SYSTEM — Inspired by HTML page (navy/electric/gold)
   ───────────────────────────────────────────── */
const styles = {
  colors: {
    navy: '#053876',
    blueDark: '#1D5B9B',
    blue: '#0B74C1',
    blueLight: '#4681B7',
    cyan: '#72A5CE',
    cyanLight: '#A6C3D7',
    turquoise: '#2AACB2',
    energy: '#55DDB5',
    white: '#F6F6F7',
    gray: '#D5DCE1',
    dark: '#0B1213',
    textSecondary: '#25364A',
    // Aliases conservés pour la logique existante
    electric: { 400: '#4681B7', 500: '#0B74C1' },
    gold: '#2AACB2',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #053876 0%, #1D5B9B 35%, #4681B7 60%, #72A5CE 80%, #A6C3D7 100%)',
    energy: 'linear-gradient(135deg, #0B74C1 0%, #2AACB2 55%, #55DDB5 100%)',
    digital: 'linear-gradient(135deg, #053876 0%, #0B74C1 55%, #2AACB2 100%)',
  },
  shadows: {
    md: '0 8px 24px rgba(5, 56, 118, 0.10)',
    xl: '0 20px 50px rgba(5, 56, 118, 0.14)',
    glow: '0 0 30px rgba(85, 221, 181, 0.24)',
  },
  animation: { duration: 0.5, stagger: 0.08 },
};

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  .omedev-home {
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
    overflow: hidden;
  }

  .omedev-home .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .omedev-home .section-badge {
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

  .omedev-home .section-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -.03em;
    margin-bottom: 1rem;
    font-family: 'Syne', sans-serif;
    color: #053876;
  }

  .omedev-home .section-subtitle {
    font-size: 1rem;
    color: #25364A;
    max-width: 52ch;
    margin: 0 auto;
    line-height: 1.7;
  }

  .omedev-home .divider {
    width: 64px;
    height: 4px;
    background: linear-gradient(90deg, #0B74C1, #2AACB2, #55DDB5);
    border-radius: 99px;
    margin: 1rem auto 1.5rem;
  }

  .omedev-home .btn-primary,
  .omedev-home .btn-accent {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: .6rem;
    background: linear-gradient(135deg, #0B74C1 0%, #2AACB2 55%, #55DDB5 100%);
    color: #fff;
    font-size: .9rem;
    font-weight: 700;
    padding: .9rem 1.7rem;
    border-radius: 12px;
    text-decoration: none;
    transition: all .3s ease;
    cursor: pointer;
    border: none;
    font-family: 'Syne', sans-serif;
    box-shadow: 0 10px 28px rgba(11,116,193,.20);
  }

  .omedev-home .btn-primary:hover,
  .omedev-home .btn-accent:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 36px rgba(42,172,178,.28);
  }

  .omedev-home .btn-outline {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: .6rem;
    background: #fff;
    color: #053876;
    font-size: .9rem;
    font-weight: 700;
    padding: .85rem 1.7rem;
    border-radius: 12px;
    border: 1px solid rgba(5,56,118,.18);
    text-decoration: none;
    transition: all .3s ease;
    cursor: pointer;
    font-family: 'Syne', sans-serif;
  }

  .omedev-home .btn-outline:hover {
    border-color: #2AACB2;
    color: #0B74C1;
    background: rgba(85,221,181,.08);
    transform: translateY(-3px);
  }

  .omedev-home .card-hover {
    position: relative;
    overflow: hidden;
    transition: transform .4s cubic-bezier(.22,.68,0,1), box-shadow .4s ease, border-color .4s ease;
    background: #fff;
    border: 1px solid rgba(5,56,118,.09);
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(5,56,118,.06);
  }
  .omedev-home .card-hover::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, #0B74C1, #2AACB2, #55DDB5);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform .45s ease;
  }
  .omedev-home .card-hover:hover {
    transform: translateY(-8px);
    box-shadow: 0 26px 55px rgba(11,116,193,.16);
    border-color: rgba(42,172,178,.45);
  }
  .omedev-home .card-hover:hover::before { transform: scaleX(1); }
  .omedev-home .card-featured { border: 2px solid rgba(11,116,193,.45); }
  .omedev-home .card-featured::before { transform: scaleX(1); }

  .omedev-home .stat-card {
    transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease;
  }
  .omedev-home .stat-card:hover {
    transform: translateY(-6px);
    border-color: rgba(85,221,181,.45) !important;
    box-shadow: 0 16px 36px rgba(0,0,0,.28);
  }

  .omedev-home .grid-bg {
    background-image: linear-gradient(rgba(11,116,193,.055) 1px, transparent 1px),
      linear-gradient(90deg, rgba(11,116,193,.055) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  .omedev-home .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
  }

  .omedev-home .omedev-hero {
    background: linear-gradient(135deg, #053876 0%, #1D5B9B 35%, #4681B7 60%, #72A5CE 80%, #A6C3D7 100%);
    position: relative;
  }

  .omedev-home .omedev-light-section {
    background: #F6F6F7;
  }

  .omedev-home .omedev-white-section {
    background: #fff;
  }

  .omedev-home .omedev-energy-section {
    background: linear-gradient(135deg, #0B74C1 0%, #2AACB2 55%, #55DDB5 100%);
  }

  .omedev-home .omedev-dark-section {
    background: linear-gradient(135deg, #053876 0%, #1D5B9B 55%, #0B74C1 100%);
  }

  .omedev-home .hero-grid {
    background-image: linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px);
    background-size: 56px 56px;
  }

  .omedev-home .hero-glass {
    background: rgba(255,255,255,.14);
    border: 1px solid rgba(255,255,255,.30);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 0 24px 60px rgba(5,56,118,.30);
  }

  .omedev-home .hero-glass-item {
    background: rgba(255,255,255,.10);
    border: 1px solid rgba(255,255,255,.20);
    backdrop-filter: blur(10px);
  }

  .omedev-home .energy-icon {
    background: rgba(85,221,181,.14);
    color: #2AACB2;
    border: 1px solid rgba(42,172,178,.20);
  }

  .omedev-home .light-card {
    background: #fff;
    border: 1px solid rgba(5,56,118,.08);
    box-shadow: 0 14px 36px rgba(5,56,118,.07);
  }

  .omedev-home .dark-section .text-white,
  .omedev-home .omedev-dark-section .text-white,
  .omedev-home .omedev-energy-section .text-white,
  .omedev-home .omedev-hero .text-white { color: #fff !important; }

  .omedev-home .light-content .text-white,
  .omedev-home .omedev-light-section .text-white,
  .omedev-home .omedev-white-section .text-white { color: #0B1213 !important; }

  .omedev-home .light-content .text-[#25364A],
  .omedev-home .light-content .text-[#25364A],
  .omedev-home .omedev-light-section .text-[#25364A],
  .omedev-home .omedev-light-section .text-[#25364A],
  .omedev-home .omedev-white-section .text-[#25364A],
  .omedev-home .omedev-white-section .text-[#25364A] { color: #25364A !important; }

  .omedev-home .light-content .text-blue-400,
  .omedev-home .omedev-light-section .text-blue-400,
  .omedev-home .omedev-white-section .text-blue-400 { color: #0B74C1 !important; }

  .omedev-home .light-content .bg-white\/5,
  .omedev-home .omedev-light-section .bg-white\/5,
  .omedev-home .omedev-white-section .bg-white\/5 { background: #fff !important; }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-16px); }
  }
  .omedev-home .animate-float { animation: float 6s ease-in-out infinite; }

  /* Zoom/pan doux ("Ken Burns") sur la photo du hero */
  @keyframes heroZoom {
    0%   { transform: scale(1.06) translate(0, 0); }
    50%  { transform: scale(1.14) translate(-1.5%, -1.5%); }
    100% { transform: scale(1.06) translate(0, 0); }
  }
  .omedev-home .hero-photo {
    animation: heroZoom 20s ease-in-out infinite;
    will-change: transform;
    /* Rendu plus net et moderne : léger boost de contraste/saturation */
    filter: saturate(1.08) contrast(1.06) brightness(1.02);
  }

  @media (max-width: 768px) {
    .omedev-home .container { padding: 0 1rem; }
  }
`;

// ─── IMAGES DE FOND (élégantes, palette OMEDEV, haute résolution) ─────────
const bgImages = {
  // Équipe digitale / open-space lumineux — même photo que sur les autres pages publiques (PublicHero)
  hero: 'https://www.dmi40.fr/wp-content/uploads/2026/05/Actualite.webp',
  // Open-space moderne / transformation digitale
  cta: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80',
  // Réseau / globe connecté — pour la section CTA sombre
  ctaDark: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80',
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const SectionHeader = ({ badge, title, subtitle }) => (
  <motion.div variants={staggerContainer} style={{ textAlign: 'center', marginBottom: '3rem' }}>
    {badge && <motion.div variants={fadeUp}><span className="section-badge">{badge}</span></motion.div>}
    <motion.h2 variants={fadeUp} className="section-title">{title}</motion.h2>
    <motion.div variants={fadeUp} className="divider" />
    {subtitle && <motion.p variants={fadeUp} className="section-subtitle">{subtitle}</motion.p>}
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
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
};

// Données
const services = [
  { icon: Server, title: 'Réseau & Infrastructure', description: 'Câblage structuré, WiFi entreprise, fibre optique haute performance', color: styles.colors.electric[500] },
  { icon: Shield, title: 'Cybersécurité & Surveillance', description: 'Firewalls, audits, vidéosurveillance intelligente 24/7', color: styles.colors.electric[400] },
  { icon: Code, title: 'Développement Digital', description: 'Applications web, mobiles, ERP sur mesure', color: styles.colors.gold },
  { icon: Cloud, title: 'Cloud & Télécommunications', description: 'Hébergement cloud, VoIP, solutions télécom intégrées', color: styles.colors.electric[500] },
  { icon: Zap, title: 'Énergie & Maintenance', description: 'Panneaux solaires, maintenance préventive et corrective', color: styles.colors.electric[400] },
  { icon: GraduationCap, title: 'Formation & Accompagnement', description: 'Formations certifiantes et transfert de compétences', color: styles.colors.gold },
];

const expertise = [
  { icon: Code, title: 'Développement Logiciel', desc: 'Apps web & mobiles sur mesure, API, IA intégrée', color: styles.colors.electric[500] },
  { icon: Phone, title: 'Télécommunications', desc: 'Réseaux VoIP, fibre, communication unifiée', color: styles.colors.electric[400] },
  { icon: Camera, title: 'Vidéosurveillance', desc: 'Caméras IP, IA de reconnaissance, monitoring 24/7', color: styles.colors.gold },
  { icon: Wrench, title: 'Maintenance & Support', desc: 'Maintenance préventive, corrective, assistance dédiée', color: styles.colors.electric[500] },
];

const products = [
  { icon: ThermometerSun, title: 'Climatisation Pro', description: 'Systèmes de refroidissement haute performance pour entreprises', color: styles.colors.electric[500] },
  { icon: Monitor, title: 'Matériel IT', description: 'PC, serveurs, écrans et accessoires professionnels', color: styles.colors.electric[400] },
  { icon: Camera, title: 'Surveillance', description: 'Caméras IP 4K, PTZ, IA intégrée', color: styles.colors.gold },
];

const stats = [
  { icon: Users, value: 7, label: 'Clients satisfaits', suffix: '+' },
  { icon: Code, value: 15, label: 'Projets réalisés', suffix: '+' },
  { icon: Clock, value: 24, label: 'Support technique', suffix: '/7' },
  { icon: Award, value: 100, label: 'Qualité garantie', suffix: '%' },
];

const packs = [
  { name: 'Pack Essentiel', features: ['Réseau de base', 'Sécurité essentielle', 'Support standard', 'Maintenance incluse'], icon: Briefcase, price: 'Sur devis', featured: false },
  { name: 'Pack Business', features: ['Réseau complet + Sécurité', 'ERP sur mesure', 'Support prioritaire', 'Maintenance préventive'], icon: Cpu, price: 'Sur devis', featured: true },
  { name: 'Pack Enterprise', features: ['Infrastructure complète', 'Solution digitale intégrée', 'Support dédié 24/7', 'Formation équipe'], icon: Globe, price: 'Sur devis', featured: false },
];

const whyUs = [
  { icon: Users, title: 'Expertise locale', description: 'Une équipe basée à Kinshasa qui comprend vos enjeux locaux', color: styles.colors.electric[500] },
  { icon: Clock, title: 'Support 24/7', description: 'Assistance réactive et disponible à tout moment', color: styles.colors.electric[400] },
  { icon: Award, title: 'Qualité certifiée', description: 'Standards internationaux et certifications professionnelles', color: styles.colors.gold },
  { icon: TrendingUp, title: 'Innovation constante', description: 'Veille technologique et solutions toujours à jour', color: styles.colors.electric[500] },
];

const testimonials = [
  { name: 'Jean M.', position: 'CEO, TechCorp', content: 'OMEDEV a transformé notre infrastructure IT. Service impeccable et équipe très professionnelle.', rating: 5, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Sarah K.', position: 'Directrice, Energy Solutions', content: "L'installation des panneaux solaires a été réalisée avec excellence. Économies d'énergie significatives.", rating: 5, avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { name: 'Marc L.', position: 'CTO, Digital Africa', content: 'La plateforme e-commerce développée est performante et élégante. Hautement recommandé.', rating: 5, avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
];

const steps = [
  { number: '01', title: 'Audit & Conseil', desc: 'Analyse approfondie de vos besoins et diagnostic gratuit' },
  { number: '02', title: 'Proposition sur mesure', desc: 'Devis détaillé et planning transparent' },
  { number: '03', title: 'Déploiement', desc: 'Installation, configuration et tests qualité' },
  { number: '04', title: 'Support & Évolution', desc: 'Maintenance et améliorations continues' },
];

const challenges = [
  { icon: <TrendingDown size={28} />, title: 'Perte financière', desc: 'Des processus inefficaces coûtent en moyenne 20% du CA chaque année.', color: '#ef4444' },
  { icon: <FileText size={28} />, title: 'Gestion manuelle', desc: 'Fichiers Excel, papier, erreurs humaines… votre temps vaut plus que ça.', color: '#f59e0b' },
  { icon: <Lock size={28} />, title: 'Failles de sécurité', desc: 'Sans cybersécurité, vos données et celles de vos clients sont vulnérables.', color: '#0B74C1' },
  { icon: <AlertTriangle size={28} />, title: 'Croissance bloquée', desc: "L'absence d'outils digitaux freine votre expansion et votre compétitivité.", color: '#8b5cf6' },
];

// ─── PROJETS DIGITAUX — remplace galleryImages ───────────────────────────

const projects = [
  {
    title: 'Plateforme ERP Pour la gestion de clinique ',
    description: 'Solution de gestion complète pour ',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    link: 'https://cliniquecanadienne.onrender.com/',
    featured: true,
  },
  {
    title: 'Système complet de logistique de colis',
    description: 'Application de suivi de livraison en temps réel avec géolocalisation et marketplace intégré pour les transporteurs.',
    image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&h=400&fit=crop',
    tags: ['React Native', 'Firebase'],
    link: 'https://colis-frontend-l5k4.onrender.com/',
    featured: false,
  },
  {
    title: 'Application complet de gestion d un bureau d\'études architecturale',
    description: 'application de gestion de projets architecturaux avec suivi des tâches, partage de plans et communication intégrée pour les équipes de conception.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop',
    tags: ['Vue.js', 'Python', 'Docker'],
    link: 'https://chic-mandazi-9ae240.netlify.app/',
    featured: false,
  },
  {
    title: 'Site complet de vente de voitures ',
    description: 'Marketplace de vente de voitures d\'occasion avec gestion des annonces, système de paiement intégré et espace client pour les vendeurs et acheteurs.',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop',
    tags: ['Next.js', 'Stripe', 'MongoDB'],
    link: 'https://doroosee45-lang.github.io/1000voitures/',
    featured: false,
  },

  {
    title: 'Application de nettoyage et de construction pour l\'entreprise canadclinning',
    description: 'Application de gestion de services de nettoyage et de construction pour l\'entreprise canadclinning, avec prise de rendez-vous en ligne, suivi des interventions et facturation automatisée.',
    image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600&h=400&fit=crop',
    tags: ['Python', 'OpenCV', 'React'],
    link: 'https://canadclinning.netlify.app/',
    featured: false,
  },
];

const Home = () => {
  // Témoignages — carrousel automatique (3 s)
  const [tIndex, setTIndex] = useState(0)
  const [tDir, setTDir] = useState(1)
  useEffect(() => {
    const id = setInterval(() => {
      setTDir(1)
      setTIndex(i => (i + 1) % testimonials.length)
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="omedev-home">
      <style>{globalStyles}</style>

      {/* ==================== HERO SECTION ==================== */}
      <section className="omedev-hero relative text-white overflow-hidden flex items-center min-h-[300px] py-8 md:py-10" style={{
        background: 'linear-gradient(135deg, #053876 0%, #1D5B9B 35%, #4681B7 60%, #72A5CE 80%, #A6C3D7 100%)',
      }}>
        {/* Photo de fond élégante (animation Ken Burns) */}
        <div className="absolute inset-0 z-0">
          <img
            src={bgImages.hero}
            alt=""
            className="hero-photo w-full h-full object-cover object-center"
          />
        </div>
        {/* Overlay dégradé allégé — photo bien visible, texte lisible à gauche */}
        <div className="absolute inset-0 z-0" style={{
          background: 'linear-gradient(100deg, rgba(5,56,118,0.62) 0%, rgba(11,116,193,0.34) 48%, rgba(42,172,178,0.20) 100%)'
        }} />
        {/* Vignette très douce */}
        <div className="absolute inset-0 z-0" style={{
          background: 'radial-gradient(120% 80% at 50% 40%, transparent 55%, rgba(5,56,118,0.15) 100%)'
        }} />
        {/* Grille subtile */}
        <div className="hero-grid absolute inset-0 opacity-[0.14] z-[1]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`,
          backgroundSize: '56px 56px'
        }} />
        {/* Orbes lumineux — atténués pour ne pas noyer la photo */}
        <div className="absolute w-[26rem] h-[26rem] bg-cyan-300/15 top-10 -left-24 rounded-full filter blur-[100px] animate-float" />
        <div className="absolute w-[22rem] h-[22rem] bg-teal-300/15 bottom-0 right-0 rounded-full filter blur-[110px] animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute w-64 h-64 bg-white/10 top-1/3 right-1/4 rounded-full filter blur-[90px] animate-float" style={{ animationDelay: '4s' }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-14 items-center">

            {/* ── Colonne texte ── */}
            <div className="text-center lg:text-left min-w-0">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 mb-7 px-4 py-2 rounded-full bg-white/10 border border-white/25 backdrop-blur-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#55DDB5] animate-pulse" />
                <span className="text-white font-bold text-[11px] tracking-[0.2em] uppercase font-syne">Croissance &amp; Innovation</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-[1.75rem] sm:text-5xl md:text-6xl lg:text-[4.2rem] font-extrabold leading-[1.15] mb-6 font-syne tracking-tight"
                style={{ textShadow: '0 2px 20px rgba(5,56,118,0.35)' }}
              >
                Accélérez votre{' '}
                <span className="relative inline-block max-w-full break-words">
                  <span className="absolute -inset-2 bg-gradient-to-r from-[#55DDB5] to-[#72A5CE] blur-3xl opacity-30" />
                  <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-[#55DDB5] via-teal-300 to-blue-400">
                    Transformation Digitale
                  </span>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-white/90 text-base sm:text-lg md:text-xl mb-10 max-w-xl mx-auto lg:mx-0"
                style={{ textShadow: '0 1px 12px rgba(5,56,118,0.35)' }}
              >
                ERP · Cybersécurité · Cloud · Développement Web &amp; Mobile.
                OMEDEV vous accompagne dans votre <strong className="text-white font-semibold">digitalisation complète</strong>, de l'audit au déploiement.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="flex flex-wrap gap-4 justify-center lg:justify-start mb-4"
              >
                <Link to="/demander-devis" className="group bg-gradient-to-r from-[#0B74C1] via-[#2AACB2] to-[#55DDB5] hover:brightness-110 text-white px-6 py-3.5 sm:px-8 sm:py-4 rounded-full font-semibold flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-blue-900/30 hover:shadow-2xl hover:shadow-cyan-500/30">
                  Demander un devis <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/solutions"
                  className="group border border-white/25 hover:border-white/60 px-6 py-3.5 sm:px-8 sm:py-4 rounded-full font-semibold text-white hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: 'rgba(5,56,118,0.15)', backdropFilter: 'blur(4px)' }}
                >
                  Voir les solutions
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.55 }}
              >
                <Link to="/audit-gratuit" className="inline-flex items-center gap-1.5 text-[#55DDB5] hover:text-white text-sm font-semibold link-underline transition-colors">
                  Audit gratuit sans engagement <ChevronRight size={14} />
                </Link>
              </motion.div>
            </div>

            {/* ── Colonne carte flottante (stats + visuel) ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative mx-auto max-w-sm lg:max-w-none"
            >
              <div
                className="hero-glass relative rounded-3xl p-7 backdrop-blur-xl overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.14)',
                  border: '1px solid rgba(255,255,255,0.30)',
                  boxShadow: '0 30px 80px -20px rgba(5,56,118,0.35)',
                }}
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#55DDB5]/20 rounded-full blur-3xl" />
                <div className="relative flex items-center gap-2 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#55DDB5] to-[#0B74C1] flex items-center justify-center shadow-lg">
                    <Rocket size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm font-syne leading-none">OMEDEV Services</p>
                    <p className="text-white/80 text-[11px] mt-1">Partenaire digital de confiance</p>
                  </div>
                </div>

                <div className="relative grid grid-cols-2 gap-3">
                  {[
                    { n: '15+', l: 'Projets livrés', icon: '🚀' },
                    { n: '98%', l: 'Satisfaction client', icon: '⭐' },
                    { n: '7+', l: 'Entreprises clientes', icon: '🏢' },
                    { n: '4 ans', l: "D'expertise", icon: '📅' }
                  ].map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.08 }}
                      whileHover={{ y: -3 }}
                      className="hero-glass-item rounded-2xl p-4 text-center transition-all duration-300 hover:bg-white/20"
                      style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)' }}
                    >
                      <div className="text-lg mb-1 opacity-70">{s.icon}</div>
                      <div className="font-extrabold text-xl text-white mb-0.5 font-syne">{s.n}</div>
                      <div className="text-white/80 text-[11px] leading-tight">{s.l}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="relative mt-5 pt-5 border-t border-white/10 flex items-center justify-between">
                  <span className="text-white/80 text-xs">Disponible 24/7</span>
                  <span className="flex items-center gap-1.5 text-[#55DDB5] text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#55DDB5] animate-pulse" /> En ligne
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ==================== DÉFIS (Ces défis vous parlent ?) ==================== */}
      <section className="omedev-light-section light-content py-16 relative overflow-hidden">
        <div className="container">
          <div className="text-center mb-10">
            <span className="section-badge" style={{ background: '#D5DCE1', color: '#053876', borderColor: '#72A5CE' }}>⚠️ Problèmes courants</span>
            <h2 className="section-title">Ces défis vous parlent ?</h2>
            <div className="divider" />
            <p className="section-subtitle">La plupart des PME africaines perdent des opportunités faute d'outils digitaux adaptés.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {challenges.map((c, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="card-hover group p-6 text-center">
                <div className="group-hover:scale-110 transition-transform duration-300" style={{ color: c.color, marginBottom: '1rem' }}>{c.icon}</div>
                <h3 className="font-display font-bold text-white text-lg mb-2">{c.title}</h3>
                <p className="text-[#25364A] text-sm leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-[#25364A] mb-6 text-lg">OMEDEV a la solution pour chacun de ces défis.</p>
            <Link to="/services" className="btn-primary">Découvrir nos solutions <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>




      {/* ==================== DOMAINES D'EXCELLENCE ==================== */}
      <section className="omedev-white-section light-content py-16">
        <div className="container">
          <SectionHeader badge="Notre savoir-faire" title="Domaines d'excellence" subtitle="Nous maîtrisons l'ensemble des technologies essentielles à votre réussite" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertise.map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }}
                className="card-hover group p-8 text-center">
                <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ background: `${item.color}20`, color: item.color }}>
                  <item.icon size={32} />
                </div>
                <h3 className="font-display font-bold text-white text-xl mb-2">{item.title}</h3>
                <p className="text-[#25364A] text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>





      {/* ==================== PROJETS DIGITAUX ==================== */}
      <section className="omedev-light-section light-content py-16">
        <div className="container">
          <SectionHeader
            badge="Notre travail"
            title="Projets réalisés"
            subtitle="Découvrez quelques-unes de nos réalisations digitales"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* ── 4 miniatures à gauche ── */}
            <div className="grid grid-cols-2 gap-4">
              {projects.slice(1, 5).map((project, idx) => (
                <motion.a
                  key={idx}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                  style={{ aspectRatio: '16/9' }}
                >
                  {/* Image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Overlay permanent léger */}
                  <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(to top, rgba(10,20,60,0.85) 0%, rgba(10,20,60,0.2) 55%, transparent 100%)',
                    }}
                  />

                  {/* Overlay hover bleu */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'rgba(37,99,235,0.55)' }}
                  />

                  {/* Contenu bas */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                    <p className="text-white font-bold text-xs leading-tight truncate">{project.title}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {project.tags.slice(0, 2).map((tag, t) => (
                        <span
                          key={t}
                          className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
                          style={{ background: 'rgba(59,130,246,0.35)', color: '#0B74C1', border: '1px solid rgba(59,130,246,0.4)' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Icône lien au hover */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 z-10">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                      <ArrowRight size={16} className="text-white" />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* ── Grande carte featured à droite ── */}
            <motion.a
              href={projects[0].link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative rounded-2xl overflow-hidden shadow-xl cursor-pointer flex flex-col"
              style={{ minHeight: '360px' }}
            >
              {/* Image */}
              <img
                src={projects[0].image}
                alt={projects[0].title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay permanent */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(10,20,60,0.95) 0%, rgba(10,20,60,0.4) 50%, rgba(10,20,60,0.1) 100%)',
                }}
              />

              {/* Badge "Featured" */}
              <div className="absolute top-4 left-4 z-10">
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: 'linear-gradient(135deg, #0B74C1, #053876)', color: 'white' }}
                >
                  ★ Projet phare
                </span>
              </div>

              {/* Icône lien hover */}
              <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                  <ArrowRight size={16} className="text-white" />
                </div>
              </div>

              {/* Contenu bas */}
              <div className="relative z-10 mt-auto p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {projects[0].tags.map((tag, t) => (
                    <span
                      key={t}
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(11,116,193,0.12)', color: '#0B74C1', border: '1px solid rgba(59,130,246,0.4)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 font-syne group-hover:text-blue-300 transition-colors">
                  {projects[0].title}
                </h3>
                <p className="text-[#25364A] text-sm leading-relaxed mb-4">
                  {projects[0].description}
                </p>
                <span className="inline-flex items-center gap-2 text-blue-400 text-sm font-semibold group-hover:gap-3 transition-all">
                  Voir le projet <ArrowRight size={14} />
                </span>
              </div>
            </motion.a>
          </div>

          {/* Lien "Voir tous les projets" */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <Link
              to="/realisations"
              className="btn-outline inline-flex items-center gap-2"
            >
              Voir tous nos projets <ChevronRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>


      {/* ==================== SERVICES ==================== */}
      <section className="omedev-white-section light-content py-16">
        <div className="container">
          <SectionHeader badge="Nos services" title="Solutions Intégrées" subtitle="De l'infrastructure aux applications, nous couvrons tout le cycle technologique" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.07 }}
                className="card-hover group p-5 sm:p-8">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300" style={{ background: `${service.color}20`, color: service.color }}>
                  <service.icon size={28} />
                </div>
                <h3 className="font-display font-bold text-white text-xl mb-3">{service.title}</h3>
                <p className="text-[#25364A] text-sm leading-relaxed mb-4">{service.description}</p>
                <Link to="/solutions" className="text-blue-400 text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">En savoir plus <ArrowRight size={14} /></Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>




      {/* ==================== STATS ==================== */}
      <section className="omedev-dark-section py-16"> {/* navy foncé transparent */}
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-2xl backdrop-blur-md stat-card"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)', // léger overlay transparent
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: 'linear-gradient(135deg, #4681B7, #053876)' }} // bleu moderne
                >
                  <stat.icon size={24} className="text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-1">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>





      {/* ==================== PRODUITS & ÉQUIPEMENTS ==================== */}
      <section className="omedev-light-section light-content py-16">
        <div className="container">
          <SectionHeader badge="Produits & Équipements" title="Achetez chez nous" subtitle="Climatiseurs · Matériel IT · Caméras — directement livrés et installés" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="card-hover group p-5 sm:p-8">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300" style={{ background: `${product.color}20`, color: product.color }}>
                  <product.icon size={28} />
                </div>
                <h3 className="font-display font-bold text-white text-xl mb-3">{product.title}</h3>
                <p className="text-[#25364A] text-sm leading-relaxed mb-4">{product.description}</p>
                <Link to="/services/vente-materiel" className="text-blue-400 text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">Voir les produits <ArrowRight size={14} /></Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>




      {/* ==================== SOLUTIONS PACKAGÉES ==================== */}
      <section className="omedev-white-section light-content py-16">
        <div className="container">
          <SectionHeader badge="Offres packagées" title="Solutions Clé en Main" subtitle="Choisissez l'offre adaptée à votre entreprise" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packs.map((pack, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className={`card-hover group p-8 relative ${pack.featured ? 'card-featured' : ''}`}>
                {pack.featured && <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">Populaire</div>}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300" style={{ background: `${styles.colors.electric[500]}20`, color: styles.colors.electric[500] }}>
                  <pack.icon size={24} />
                </div>
                <h3 className="font-display font-bold text-white text-2xl mb-2">{pack.name}</h3>
                <p className="text-3xl font-bold text-blue-400 mb-6">{pack.price}</p>
                <ul className="space-y-3 mb-8">
                  {pack.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-[#25364A] text-sm"><CheckCircle size={16} className="text-blue-400 flex-shrink-0" /> {f}</li>
                  ))}
                </ul>
                <Link to="/demander-devis" className={`block w-full text-center py-3 rounded-xl font-semibold transition-all ${pack.featured ? 'btn-primary' : 'btn-outline'}`}>
                  Demander ce pack {pack.featured && <ArrowRight size={16} className="inline ml-1" />}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== POURQUOI NOUS CHOISIR ==================== */}
      <section className="omedev-light-section light-content py-16">
        <div className="container">
          <SectionHeader badge="Pourquoi OMEDEV" title="Pourquoi nous choisir" subtitle="Une expertise locale avec des standards internationaux" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyUs.map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }}
                className="card-hover group text-center p-6">
                <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: `${item.color}20`, color: item.color }}>
                  <item.icon size={32} />
                </div>
                <h3 className="font-display font-bold text-white text-lg mb-2">{item.title}</h3>
                <p className="text-[#25364A] text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PROCESSUS ==================== */}
      <section className="omedev-white-section light-content py-16">
        <div className="container">
          <SectionHeader badge="Notre méthodologie" title="Comment ça marche" subtitle="Un processus simple et transparent" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center mx-auto mb-4 text-2xl font-black text-white">{step.number}</div>
                <h3 className="font-display font-bold text-white text-lg mb-2">{step.title}</h3>
                <p className="text-[#25364A] text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>




      {/* ==================== TÉMOIGNAGES (CARROUSEL) ==================== */}
      <section className="omedev-white-section light-content py-16">
        <div className="container">
          <SectionHeader badge="Témoignages" title="Ils nous font confiance" subtitle="Ce que nos clients pensent de nous" />
          <div className="relative max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={tIndex}
                initial={{ opacity: 0, x: tDir * 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: tDir * -50 }}
                transition={{ duration: 0.5, ease: [0.22, 0.68, 0, 1] }}
                className="card-hover p-8 sm:p-10 text-center"
              >
                <Quote size={32} className="text-[#0B74C1] opacity-50 mb-5 mx-auto" />
                <p className="text-[#25364A] text-base sm:text-lg italic mb-6 leading-relaxed">"{testimonials[tIndex].content}"</p>
                <div className="flex items-center justify-center gap-3">
                  <img src={testimonials[tIndex].avatar} alt={testimonials[tIndex].name} className="w-12 h-12 rounded-full object-cover" />
                  <div className="text-left">
                    <p className="font-semibold text-[#053876] text-sm">{testimonials[tIndex].name}</p>
                    <p className="text-[#25364A]/70 text-xs">{testimonials[tIndex].position}</p>
                  </div>
                  <div className="ml-1 flex gap-0.5">
                    {[...Array(testimonials[tIndex].rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-[#55DDB5] text-[#55DDB5]" />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Indicateurs */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setTDir(i > tIndex ? 1 : -1); setTIndex(i) }}
                  aria-label={`Témoignage ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${i === tIndex ? 'w-7 bg-[#0B74C1]' : 'w-2.5 bg-[#25364A]/20 hover:bg-[#25364A]/40'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CTA FINALE ==================== */}
      <CTASection
        badge="Prêt à démarrer"
        title="Prêt à transformer votre entreprise ?"
        highlight="votre entreprise"
        subtitle="Climatisation · Matériel IT · Caméras · Solutions digitales complètes, accompagnées par une équipe d'experts à votre écoute."
        backgroundImage={bgImages.cta}
        primaryAction={{ label: 'Demander un devis', to: '/demander-devis' }}
        secondaryAction={{ label: 'Audit gratuit', to: '/audit-gratuit' }}
      />
    </div>
  );
};

export default Home;