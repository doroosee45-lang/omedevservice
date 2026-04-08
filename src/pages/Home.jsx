

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
  TrendingUp,
  Headphones,
  Rocket,
  Target,
  Layers,
  BarChart3,
  TrendingDown,
  FileText,
  Lock,
  AlertTriangle,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   DESIGN SYSTEM — Inspired by HTML page (navy/electric/gold)
   ───────────────────────────────────────────── */
const styles = {
  colors: {
    navy: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554',
    },
    background: {
      light: 'rgba(248, 250, 255, 0.85)', // bleu très clair transparent
      default: 'rgba(235, 245, 255, 0.95)', // légèrement plus opaque
      dark: 'rgba(23, 37, 84, 0.92)', // pour sections foncées / overlay
    },
    electric: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },

    // ✨ gold amélioré (léger ajustement visuel)
    gold: '#e2a733',

    white: '#FFFFFF',

    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },

    // ✅ corrigé (violet → pas cohérent avec ton thème bleu)
    success: '#10B981',
  },

  gradients: {
    primary: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    accent: 'linear-gradient(135deg, #e2a733 0%, #f59e0b 100%)',
    darkOverlay: 'linear-gradient(135deg, rgba(2,14,24,0.9) 0%, rgba(10,24,80,0.85) 100%)',
  },

  shadows: {
    md: '0 4px 6px rgba(0, 0, 0, 0.08)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.12)',
    glow: '0 0 20px rgba(59, 130, 246, 0.35)',
  },

  animation: {
    duration: 0.5,
    stagger: 0.08,
  },
};







const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: ${styles.colors.navy[950]};
    color: #e2e8f0;
    overflow-x: hidden;
  }

  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .section-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 0.5rem 1.2rem;
    border-radius: 99px;
    background: rgba(37, 99, 235, 0.15);
    color: ${styles.colors.electric[400]};
    border: 1px solid rgba(37, 99, 235, 0.3);
    font-family: 'Syne', sans-serif;
  }

  .section-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: -0.02em;
    margin-bottom: 1rem;
    font-family: 'Syne', sans-serif;
    background: linear-gradient(135deg, #60a5fa, #2563eb, #818cf8);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .section-subtitle {
    font-size: 1.1rem;
    color: ${styles.colors.gray[400]};
    max-width: 48ch;
    margin: 0 auto;
    line-height: 1.6;
  }

  .divider {
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, transparent, ${styles.colors.electric[500]}, transparent);
    border-radius: 99px;
    margin: 1rem auto 1.5rem;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    background: ${styles.gradients.primary};
    color: white;
    font-size: 0.9rem;
    font-weight: 600;
    padding: 0.9rem 2rem;
    border-radius: 12px;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
    border: none;
    font-family: 'Syne', sans-serif;
    box-shadow: ${styles.shadows.md};
    position: relative;
    overflow: hidden;
  }
  .btn-primary::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .btn-primary:hover::before { opacity: 1; }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(37,99,235,0.4); }

  .btn-outline {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    background: transparent;
    color: ${styles.colors.gray[300]};
    font-size: 0.9rem;
    font-weight: 600;
    padding: 0.85rem 2rem;
    border-radius: 12px;
    border: 1px solid rgba(37,99,235,0.5);
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
    font-family: 'Syne', sans-serif;
  }
  .btn-outline:hover {
    border-color: ${styles.colors.electric[500]};
    background: rgba(37,99,235,0.1);
    transform: translateY(-2px);
    color: white;
  }

  .btn-accent {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    background: linear-gradient(135deg, #e2a733, #f59e0b);
    color: white;
    font-size: 0.9rem;
    font-weight: 700;
    padding: 0.9rem 2rem;
    border-radius: 12px;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
    border: none;
    font-family: 'Syne', sans-serif;
    box-shadow: ${styles.shadows.md};
  }
  .btn-accent:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(245,158,11,0.4);
    filter: brightness(1.05);
  }

  .card-hover {
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 1.5rem;
  }
  .card-hover:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 60px rgba(37,99,235,0.2);
    border-color: rgba(37,99,235,0.5);
  }

  .grid-bg {
    background-image: linear-gradient(rgba(37,99,235,0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(37,99,235,0.07) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
`;

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
  { icon: Users, value: 150, label: 'Clients satisfaits', suffix: '+' },
  { icon: Code, value: 200, label: 'Projets réalisés', suffix: '+' },
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
  { name: 'Jean M.', position: 'CEO, TechCorp', content: 'OMDEVE a transformé notre infrastructure IT. Service impeccable et équipe très professionnelle.', rating: 5, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
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
  { icon: <Lock size={28} />, title: 'Failles de sécurité', desc: 'Sans cybersécurité, vos données et celles de vos clients sont vulnérables.', color: '#3b82f6' },
  { icon: <AlertTriangle size={28} />, title: 'Croissance bloquée', desc: "L'absence d'outils digitaux freine votre expansion et votre compétitivité.", color: '#8b5cf6' },
];

const galleryImages = [
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400&h=300&fit=crop',
];

const Home = () => {
  return (
    <>
      <style>{globalStyles}</style>

      {/* ==================== HERO SECTION - Premium Navy ==================== */}
      {/* ==================== HERO SECTION - HOME avec image de fond ==================== */}
    <section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white overflow-hidden pt-20 pb-12">

  {/* Image de fond avec zoom lent */}
  <div className="absolute inset-0 overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 animate-slow-zoom"
      style={{
        backgroundImage: `url('https://img.freepik.com/photos-gratuite/contexte-energie-nucleaire-ia-innovation-future-technologie-rupture_53876-129783.jpg?semt=ais_hybrid&w=740&q=80')`
      }}
    />
    <div className="absolute inset-0 bg-black/65"></div>
  </div>

  {/* Grille de fond technologique */}
  <div className="absolute inset-0 opacity-20" style={{
    backgroundImage: `linear-gradient(rgba(59,130,246,0.08) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(59,130,246,0.08) 1px, transparent 1px)`,
    backgroundSize: '60px 60px'
  }} />

  {/* Effet lumineux radial subtil */}
  <div className="absolute inset-0 bg-[radial-gradient(at_top_right,#3b82f630_0%,transparent_60%)]" />
  <div className="absolute inset-0 bg-[radial-gradient(at_bottom_left,#8b5cf620_0%,transparent_60%)]" />

  {/* Orbes flottants animés (réduits) */}
  <div className="absolute w-80 h-80 bg-blue-600/20 top-10 -left-20 rounded-full filter blur-[80px] animate-float" />
  <div className="absolute w-64 h-64 bg-indigo-700/15 bottom-20 right-10 rounded-full filter blur-[80px] animate-float" style={{ animationDelay: '2s' }} />
  <div className="absolute w-40 h-40 bg-cyan-500/10 top-1/2 left-1/2 -translate-x-1/2 rounded-full filter blur-[80px] animate-float" style={{ animationDelay: '4s' }} />

  {/* Contenu principal */}
  <div className="container mx-auto px-4 relative z-10 py-8">
    <div className="max-w-3xl mx-auto text-center">

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full"
        style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.3)' }}
      >
        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
        <span className="text-blue-300 font-semibold text-[10px] tracking-wide font-syne">Solutions Digitales Premium – Afrique</span>
      </motion.div>

      {/* Titre principal */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 font-syne"
      >
        Transformez votre <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400">
          Business Digital
        </span>
        <br />
        avec l'expertise
      </motion.h1>

      {/* Sous-titre */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-gray-300 text-base md:text-lg mb-6 max-w-2xl mx-auto"
      >
        ERP • SaaS • Cybersécurité • Développement Web & Mobile.<br />
        Omedev vous accompagne dans votre <strong className="text-white">digitalisation complète</strong>.
      </motion.p>

      {/* Boutons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8"
      >
        <Link
          to="/demander-devis"
          className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-5 py-2 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 transition-all hover:scale-[1.02] hover:shadow-xl text-sm"
        >
          <span>Demander un devis</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
        </Link>

        <Link
          to="/admin"
          className="group border-2 border-white/30 hover:border-white px-5 py-2 rounded-xl font-semibold text-white hover:bg-white/10 flex items-center justify-center gap-2 transition-all text-sm"
        >
          <span>Voir les solutions</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
        </Link>

        <Link
          to="/audit-gratuit"
          className="px-4 py-2 rounded-xl font-semibold text-amber-400 border border-amber-500/30 hover:bg-amber-500/10 transition-all flex items-center gap-2 text-sm"
        >
          <span>🎁 Audit Gratuit</span>
        </Link>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        {[
          { n: '150+', l: 'Projets livrés', icon: '🚀' },
          { n: '98%', l: 'Satisfaction client', icon: '⭐' },
          { n: '50+', l: 'Entreprises clientes', icon: '🏢' },
          { n: '5 ans', l: "D'expertise", icon: '📅' }
        ].map((s, i) => (
          <div
            key={i}
            className="group rounded-xl p-3 text-center transition-all duration-300 hover:scale-105 hover:border-blue-500/40"
            style={{
              background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(30,64,175,0.03))',
              border: '1px solid rgba(37,99,235,0.2)'
            }}
          >
            <div className="text-xl mb-0.5 opacity-60 group-hover:opacity-100 transition-opacity">{s.icon}</div>
            <div className="font-extrabold text-xl text-white mb-0.5 font-syne">{s.n}</div>
            <div className="text-gray-400 text-[11px]">{s.l}</div>
          </div>
        ))}
      </motion.div>
    </div>
  </div>

  {/* Vague décorative en bas */}
  <div className="absolute bottom-0 left-0 right-0 z-10 text-white/10">
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-8">
      <path
        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
        fill="currentColor"
      />
    </svg>
  </div>
</section>
      {/* Styles CSS à ajouter dans votre fichier global */}
      <style jsx>{`
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
  }
`}</style>


      {/* ==================== DÉFIS (Ces défis vous parlent ?) ==================== */}
      <section className="py-24 relative overflow-hidden">
        <div className="container">
          <div className="text-center mb-14">
            <span className="section-badge" style={{ background: '#fef3c7', color: '#b45309', borderColor: '#fde68a' }}>⚠️ Problèmes courants</span>
            <h2 className="section-title">Ces défis vous parlent ?</h2>
            <div className="divider" />
            <p className="section-subtitle">La plupart des PME africaines perdent des opportunités faute d'outils digitaux adaptés.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {challenges.map((c, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="card-hover p-6 text-center" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '1.5rem' }}>
                <div style={{ color: c.color, marginBottom: '1rem' }}>{c.icon}</div>
                <h3 className="font-display font-bold text-white text-lg mb-2">{c.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-slate-400 mb-6 text-lg">Omedev a la solution pour chacun de ces défis.</p>
            <Link to="/services" className="btn-primary">Découvrir nos solutions <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>




      {/* ==================== DOMAINES D'EXCELLENCE ==================== */}
      <section className="py-24 bg-white/5">
        <div className="container">
          <SectionHeader badge="Notre savoir-faire" title="Domaines d'excellence" subtitle="Nous maîtrisons l'ensemble des technologies essentielles à votre réussite" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertise.map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }}
                className="card-hover p-8 text-center">
                <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: `${item.color}20`, color: item.color }}>
                  <item.icon size={32} />
                </div>
                <h3 className="font-display font-bold text-white text-xl mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>




      {/* ==================== GALERIE (1 droite + 4 gauche) ==================== */}
      <section className="py-24">
        <div className="container">
          <SectionHeader badge="Notre travail" title="Galerie" subtitle="Découvrez quelques-unes de nos réalisations" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 4 miniatures à gauche */}
            <div className="grid grid-cols-2 gap-4">
              {galleryImages.slice(1, 5).map((img, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                  className="rounded-2xl overflow-hidden shadow-lg cursor-pointer aspect-video" whileHover={{ scale: 1.02 }}>
                  <img src={img} alt={`galerie-${idx}`} className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </div>
            {/* Grande image à droite */}
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden shadow-xl cursor-pointer aspect-video" whileHover={{ scale: 1.01 }}>
              <img src={galleryImages[0]} alt="galerie-principale" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>




      {/* ==================== SERVICES ==================== */}
      <section className="py-24 bg-white/5">
        <div className="container">
          <SectionHeader badge="Nos services" title="Solutions Intégrées" subtitle="De l'infrastructure aux applications, nous couvrons tout le cycle technologique" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.07 }}
                className="card-hover p-8">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5" style={{ background: `${service.color}20`, color: service.color }}>
                  <service.icon size={28} />
                </div>
                <h3 className="font-display font-bold text-white text-xl mb-3">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{service.description}</p>
                <Link to="#" className="text-blue-400 text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">En savoir plus <ArrowRight size={14} /></Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>




      {/* ==================== STATS ==================== */}
      <section className="py-20" style={{ background: 'rgba(23,37,84,0.9)' }}> {/* navy foncé transparent */}
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-2xl backdrop-blur-md"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)', // léger overlay transparent
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: 'linear-gradient(135deg, #60a5fa, #1e40af)' }} // bleu moderne
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
      <section className="py-24">
        <div className="container">
          <SectionHeader badge="Produits & Équipements" title="Achetez chez nous" subtitle="Climatiseurs · Matériel IT · Caméras — directement livrés et installés" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="card-hover p-8">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5" style={{ background: `${product.color}20`, color: product.color }}>
                  <product.icon size={28} />
                </div>
                <h3 className="font-display font-bold text-white text-xl mb-3">{product.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{product.description}</p>
                <Link to="/boutique" className="text-blue-400 text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">Voir les produits <ArrowRight size={14} /></Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SOLUTIONS PACKAGÉES ==================== */}
      <section className="py-24 bg-white/5">
        <div className="container">
          <SectionHeader badge="Offres packagées" title="Solutions Clé en Main" subtitle="Choisissez l'offre adaptée à votre entreprise" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packs.map((pack, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className={`card-hover p-8 relative ${pack.featured ? 'border-2 border-blue-500' : ''}`}>
                {pack.featured && <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">Populaire</div>}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: `${styles.colors.electric[500]}20`, color: styles.colors.electric[500] }}>
                  <pack.icon size={24} />
                </div>
                <h3 className="font-display font-bold text-white text-2xl mb-2">{pack.name}</h3>
                <p className="text-3xl font-bold text-blue-400 mb-6">{pack.price}</p>
                <ul className="space-y-3 mb-8">
                  {pack.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-300 text-sm"><CheckCircle size={16} className="text-blue-400 flex-shrink-0" /> {f}</li>
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
      <section className="py-24">
        <div className="container">
          <SectionHeader badge="Pourquoi OMDEVE" title="Pourquoi nous choisir" subtitle="Une expertise locale avec des standards internationaux" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyUs.map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }}
                className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: `${item.color}20`, color: item.color }}>
                  <item.icon size={32} />
                </div>
                <h3 className="font-display font-bold text-white text-lg mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PROCESSUS ==================== */}
      <section className="py-24 bg-white/5">
        <div className="container">
          <SectionHeader badge="Notre méthodologie" title="Comment ça marche" subtitle="Un processus simple et transparent" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center mx-auto mb-4 text-2xl font-black text-white">{step.number}</div>
                <h3 className="font-display font-bold text-white text-lg mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>




      {/* ==================== TÉMOIGNAGES ==================== */}
      <section className="py-24">
        <div className="container">
          <SectionHeader badge="Témoignages" title="Ils nous font confiance" subtitle="Ce que nos clients pensent de nous" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="card-hover p-6">
                <Quote size={28} className="text-blue-400 opacity-50 mb-4" />
                <p className="text-slate-300 text-sm italic mb-6">"{t.content}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div><p className="font-semibold text-white text-sm">{t.name}</p><p className="text-slate-500 text-xs">{t.position}</p></div>
                  <div className="ml-auto flex gap-0.5">{[...Array(t.rating)].map((_, i) => <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />)}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA FINALE ==================== */}
      <section
        className="py-24 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(23,37,84,0.95) 0%, rgba(15, 27, 66, 0.9) 100%)', // bleu foncé moderne
        }}
      >
        <div className="container text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6 text-amber-300 text-sm font-semibold">
              <Rocket size={16} /> Prêt à démarrer
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Prêt à transformer votre entreprise ?
            </h2>

            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Climatisation · Matériel IT · Caméras · Solutions digitales complètes
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/demander-devis"
                className="btn-accent"
                style={{
                  background: 'linear-gradient(135deg, #1d1141 0%,#172554 100%)',
                  color: 'white',
                }}
              >
                Demander un devis <ArrowRight size={18} />
              </Link>

              <Link
                to="/audit-gratuit"
                className="btn-outline"
                style={{
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.3)',
                  background: 'rgba(255,255,255,0.05)',
                }}
              >
                Audit gratuit <CheckCircle size={18} />
              </Link>

              <Link
                to="/boutique"
                className="btn-outline"
                style={{
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.3)',
                  background: 'rgba(255,255,255,0.05)',
                }}
              >
                Voir nos produits <ChevronRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;






