import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import {
  ArrowRight, Server, Shield, Code, Cloud, Zap, GraduationCap,
  CheckCircle, Users, Clock, Award, Star, Quote, Briefcase, Globe,
  Cpu, Camera, Wifi, Wrench, Phone, ThermometerSun, Monitor,
  ChevronRight, Sparkles, TrendingUp, Rocket, TrendingDown, FileText,
  Lock, AlertTriangle, BarChart3, Mail, Heart, Truck, Layout, Smartphone,
  Database, Network, Eye, Fingerprint, CloudRain, Sun, Battery,
  ShoppingBag, Headphones, Target
} from 'lucide-react';

/* ─────────────────────────────────────────────
   DESIGN SYSTEM — Navy/Electric/Gold Theme
   ───────────────────────────────────────────── */
const styles = {
  colors: {
    navy: { 950: '#020818', 900: '#060f2e', 800: '#0a1850', 700: '#0e2272' },
    electric: { 400: '#3b82f6', 500: '#2563eb', 600: '#1d4ed8' },
    gold: '#e2a733',
    white: '#FFFFFF',
    gray: { 400: '#9CA3AF', 500: '#6B7280', 600: '#4B5563' },
    success: '#10B981',
    cyan: '#06b6d4',
    purple: '#8b5cf6',
    orange: '#f97316',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
    accent: 'linear-gradient(135deg, #e2a733, #f59e0b)',
    darkOverlay: 'linear-gradient(135deg, rgba(2,8,24,0.95) 0%, rgba(6,15,46,0.9) 100%)',
  },
  shadows: { md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
  animation: { duration: 0.6, stagger: 0.08 },
};

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'DM Sans', sans-serif; background: #020818; color: #e2e8f0; overflow-x: hidden; }
  .container { max-width: 1280px; margin: 0 auto; padding: 0 2rem; }
  .section-badge {
    display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.7rem;
    font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase;
    padding: 0.5rem 1.2rem; border-radius: 99px;
    background: rgba(37, 99, 235, 0.15); color: #3b82f6;
    border: 1px solid rgba(37, 99, 235, 0.3); font-family: 'Syne', sans-serif;
  }
  .section-title {
    font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; line-height: 1.2;
    letter-spacing: -0.02em; margin-bottom: 1rem; font-family: 'Syne', sans-serif;
    background: linear-gradient(135deg, #60a5fa, #2563eb, #818cf8);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .section-subtitle { font-size: 1.1rem; color: #9CA3AF; max-width: 48ch; margin: 0 auto; line-height: 1.6; }
  .divider { width: 60px; height: 4px; background: linear-gradient(90deg, transparent, #2563eb, #e2a733, transparent); border-radius: 99px; margin: 1rem auto 1.5rem; }
  .btn-primary, .btn-accent, .btn-outline-light, .btn-secondary { display: inline-flex; align-items: center; gap: 0.6rem; font-size: 0.9rem; font-weight: 600; padding: 0.9rem 2rem; border-radius: 12px; text-decoration: none; transition: all 0.3s ease; cursor: pointer; font-family: 'Syne', sans-serif; border: none; }
  .btn-primary { background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(37,99,235,0.4); }
  .btn-accent { background: linear-gradient(135deg, #e2a733, #f59e0b); color: white; }
  .btn-accent:hover { transform: translateY(-2px); filter: brightness(1.05); }
  .btn-outline-light { background: transparent; color: white; border: 1.5px solid rgba(255,255,255,0.3); }
  .btn-outline-light:hover { border-color: white; transform: translateY(-2px); background: rgba(255,255,255,0.1); }
  .btn-secondary { background: transparent; color: #e2e8f0; border: 1px solid rgba(37,99,235,0.5); }
  .btn-secondary:hover { border-color: #3b82f6; background: rgba(37,99,235,0.1); transform: translateY(-2px); color: white; }
  .card-hover { transition: all 0.3s ease; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 1.5rem; }
  .card-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(37,99,235,0.2); border-color: rgba(37,99,235,0.5); }
  .orb { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; z-index: 0; }
  @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
  .animate-float { animation: float 6s ease-in-out infinite; }
  @keyframes pulse-ring { 0% { transform: scale(0.8); opacity: 1; } 70% { transform: scale(1.3); opacity: 0; } 100% { transform: scale(0.8); opacity: 0; } }
  .pricing-popular { border-color: #2563eb !important; box-shadow: 0 0 40px rgba(37,99,235,0.2); }
`;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
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

// DONNÉES (sans images externes)
const services = [
  { icon: Server, title: 'Réseau & Infrastructure', description: 'Câblage structuré, WiFi entreprise, fibre optique haute performance', color: '#2563eb' },
  { icon: Shield, title: 'Cybersécurité & Surveillance', description: 'Firewalls, audits, vidéosurveillance intelligente 24/7', color: '#06b6d4' },
  { icon: Code, title: 'Développement Digital', description: 'Applications web, mobiles, ERP sur mesure', color: '#e2a733' },
  { icon: Cloud, title: 'Cloud & Télécommunications', description: 'Hébergement cloud, VoIP, solutions télécom intégrées', color: '#2563eb' },
  { icon: Zap, title: 'Énergie & Maintenance', description: 'Panneaux solaires, maintenance préventive et corrective', color: '#f97316' },
  { icon: GraduationCap, title: 'Formation & Accompagnement', description: 'Formations certifiantes et transfert de compétences', color: '#8b5cf6' },
];

const expertise = [
  { icon: Code, title: 'Développement Logiciel', desc: 'Apps web & mobiles sur mesure, API, IA intégrée', color: '#2563eb' },
  { icon: Phone, title: 'Télécommunications', desc: 'Réseaux VoIP, fibre, communication unifiée', color: '#06b6d4' },
  { icon: Camera, title: 'Vidéosurveillance', desc: 'Caméras IP, IA de reconnaissance, monitoring 24/7', color: '#e2a733' },
  { icon: Wrench, title: 'Maintenance & Support', desc: 'Maintenance préventive, corrective, assistance dédiée', color: '#2563eb' },
  { icon: Database, title: 'Base de données', desc: 'Optimisation, migration et sécurisation', color: '#8b5cf6' },
  { icon: Network, title: 'Infrastructure Cloud', desc: 'Architecture scalable haute disponibilité', color: '#06b6d4' },
  { icon: Eye, title: 'Monitoring 24/7', desc: 'Surveillance proactive de vos systèmes', color: '#f97316' },
  { icon: Fingerprint, title: 'Authentification sécurisée', desc: 'MFA, SSO, gestion des identités', color: '#2563eb' },
];

const products = [
  { icon: ThermometerSun, title: 'Climatisation Pro', description: 'Systèmes de refroidissement haute performance', color: '#2563eb' },
  { icon: Monitor, title: 'Matériel IT', description: 'PC, serveurs, écrans et accessoires', color: '#06b6d4' },
  { icon: Camera, title: 'Surveillance', description: 'Caméras IP 4K, PTZ, IA intégrée', color: '#e2a733' },
  { icon: Sun, title: 'Énergie Solaire', description: 'Panneaux photovoltaïques et solutions durables', color: '#f97316' },
  { icon: Battery, title: 'Onduleurs & UPS', description: 'Protection électrique équipements sensibles', color: '#8b5cf6' },
  { icon: CloudRain, title: 'Climatisation Industrielle', description: 'Solutions pour data centers et grands espaces', color: '#2563eb' },
];

const stats = [
  { icon: Users, value: 150, label: 'Clients satisfaits', suffix: '+' },
  { icon: Code, value: 200, label: 'Projets réalisés', suffix: '+' },
  { icon: Clock, value: 24, label: 'Support technique', suffix: '/7' },
  { icon: Award, value: 100, label: 'Qualité garantie', suffix: '%' },
];

const packs = [
  { name: 'Pack Essentiel', features: ['Réseau de base', 'Sécurité essentielle', 'Support standard', 'Maintenance incluse'], icon: Briefcase, price: 'Sur devis', featured: false },
  { name: 'Pack Business', features: ['Réseau complet + Sécurité', 'ERP sur mesure', 'Support prioritaire', 'Maintenance préventive', 'Formation incluse'], icon: Cpu, price: 'Sur devis', featured: true },
  { name: 'Pack Enterprise', features: ['Infrastructure complète', 'Solution digitale intégrée', 'Support dédié 24/7', 'Formation équipe', 'SLA personnalisé'], icon: Globe, price: 'Sur devis', featured: false },
];

const whyUs = [
  { icon: Users, title: 'Expertise locale', description: 'Une équipe basée à Kinshasa qui comprend vos enjeux locaux', color: '#2563eb' },
  { icon: Clock, title: 'Support 24/7', description: 'Assistance réactive et disponible à tout moment', color: '#06b6d4' },
  { icon: Award, title: 'Qualité certifiée', description: 'Standards internationaux et certifications', color: '#e2a733' },
  { icon: TrendingUp, title: 'Innovation constante', description: 'Veille technologique et solutions à jour', color: '#2563eb' },
  { icon: Heart, title: 'Relation client', description: 'Accompagnement personnalisé et humain', color: '#8b5cf6' },
  { icon: Truck, title: 'Déploiement rapide', description: 'Installation en quelques jours', color: '#f97316' },
];

const testimonials = [
  { name: 'Jean M.', position: 'CEO, TechCorp', content: 'OMDEVE a transformé notre infrastructure IT. Service impeccable et équipe très professionnelle.', rating: 5 },
  { name: 'Sarah K.', position: 'Directrice, Energy Solutions', content: "L'installation des panneaux solaires a été réalisée avec excellence.", rating: 5 },
  { name: 'Marc L.', position: 'CTO, Digital Africa', content: 'La plateforme e-commerce développée est performante et élégante.', rating: 5 },
];

const steps = [
  { number: '01', title: 'Audit & Conseil', desc: 'Analyse approfondie de vos besoins et diagnostic gratuit' },
  { number: '02', title: 'Proposition sur mesure', desc: 'Devis détaillé et planning transparent' },
  { number: '03', title: 'Déploiement', desc: 'Installation, configuration et tests qualité' },
  { number: '04', title: 'Support & Évolution', desc: 'Maintenance et améliorations continues' },
];

const challenges = [
  { icon: <TrendingDown size={28} />, title: 'Perte financière', desc: 'Des processus inefficaces coûtent 20% du CA chaque année.', color: '#ef4444' },
  { icon: <FileText size={28} />, title: 'Gestion manuelle', desc: 'Fichiers Excel, papier, erreurs humaines…', color: '#f59e0b' },
  { icon: <Lock size={28} />, title: 'Failles de sécurité', desc: 'Sans cybersécurité, vos données sont vulnérables.', color: '#3b82f6' },
  { icon: <AlertTriangle size={28} />, title: 'Croissance bloquée', desc: "L'absence d'outils digitaux freine votre expansion.", color: '#8b5cf6' },
];

const solutions = [
  { icon: <Layout size={28} />, title: 'Sites Web Modernes', desc: 'Design responsive, UX optimisée, SEO intégré', color: '#2563eb' },
  { icon: <Smartphone size={28} />, title: 'Applications Mobiles', desc: 'iOS & Android, performances et UX', color: '#06b6d4' },
  { icon: <ShoppingBag size={28} />, title: 'E-commerce', desc: 'Boutiques en ligne avec paiement sécurisé', color: '#e2a733' },
  { icon: <Database size={28} />, title: 'ERP sur mesure', desc: 'Gestion complète de votre entreprise', color: '#8b5cf6' },
  { icon: <Cloud size={28} />, title: 'Solutions Cloud', desc: 'Hébergement, migration, DevOps', color: '#f97316' },
  { icon: <BarChart3 size={28} />, title: 'Business Intelligence', desc: 'Tableaux de bord et analyses avancées', color: '#2563eb' },
];

const partners = [
  { name: 'Microsoft', icon: 'M', color: '#00A4EF' },
  { name: 'AWS', icon: 'A', color: '#FF9900' },
  { name: 'Google', icon: 'G', color: '#4285F4' },
  { name: 'Cisco', icon: 'C', color: '#1BA0D7' },
  { name: 'Fortinet', icon: 'F', color: '#EE3124' },
  { name: 'Dell', icon: 'D', color: '#007DB8' },
];

const blogPosts = [
  { title: 'Comment choisir son ERP en 2024', date: '15 Déc 2024', readTime: '5 min', category: 'ERP' },
  { title: 'Les tendances cybersécurité à connaître', date: '10 Déc 2024', readTime: '7 min', category: 'Sécurité' },
  { title: 'Pourquoi migrer vers le cloud ?', date: '5 Déc 2024', readTime: '4 min', category: 'Cloud' },
];

const faqs = [
  { q: 'Combien de temps dure un projet ?', a: 'Site vitrine : 1-2 semaines. Application web : 4-8 semaines. ERP complet : 2-4 mois.' },
  { q: 'Proposez-vous une maintenance ?', a: 'Oui, tous nos projets incluent 3 mois de maintenance gratuite. Des contrats de support sont disponibles.' },
  { q: 'Mes données sont-elles sécurisées ?', a: 'Absolument. Chiffrement, sauvegardes, contrôle d\'accès et conformité RGPD.' },
  { q: 'Travaillez-vous à distance ?', a: 'Oui ! Nous intervenons partout en Afrique avec des outils collaboratifs modernes.' },
];

const AvatarPlaceholder = ({ name }) => {
  const initial = name.charAt(0);
  return (
    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>
      {initial}
    </div>
  );
};

/* ─────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────── */
const Home = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <style>{globalStyles}</style>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: '#020818' }}>
        <div className="orb w-96 h-96 bg-blue-600/20 top-10 -left-20 animate-float" />
        <div className="orb w-72 h-72 bg-indigo-700/15 bottom-20 right-10 animate-float" style={{ animationDelay: '2s' }} />
        <div className="orb w-48 h-48 bg-blue-400/10 top-1/2 left-1/2 -translate-x-1/2 animate-float" style={{ animationDelay: '4s' }} />

        <div className="container relative z-10 py-20">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
            <motion.div variants={scaleIn}>
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full" style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.3)' }}>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-blue-300 text-xs font-semibold tracking-wider font-syne">OMDEVE Services • Kinshasa & Afrique</span>
              </div>
            </motion.div>
            <motion.h1 variants={fadeUp} style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 800, lineHeight: 1.1, color: 'white', marginBottom: '1.5rem' }}>
              Votre partenaire<br />
              <span style={{ background: 'linear-gradient(135deg, #e2a733, #f59e0b)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>technologique</span><br />
              de confiance
            </motion.h1>
            <motion.p variants={fadeUp} style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'rgba(255,255,255,.8)', maxWidth: '50ch', margin: '0 auto 3rem', lineHeight: 1.7 }}>
              Développement · Télécom · Vidéosurveillance · Climatisation · Matériel IT
            </motion.p>
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/demander-devis" className="btn-accent">Demander un devis <ArrowRight size={18} /></Link>
              <Link to="/audit-gratuit" className="btn-outline-light">Audit gratuit <CheckCircle size={18} /></Link>
              <Link to="/boutique" className="btn-outline-light">Voir nos produits <ChevronRight size={18} /></Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* DÉFIS SECTION */}
      <section className="py-24">
        <div className="container">
          <SectionHeader badge="⚠️ Problèmes courants" title="Ces défis vous parlent ?" subtitle="La plupart des entreprises africaines perdent des opportunités faute d'outils digitaux adaptés." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {challenges.map((c, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="card-hover p-6 text-center">
                <div style={{ color: c.color, marginBottom: '1rem' }}>{c.icon}</div>
                <h3 className="font-bold text-white text-lg mb-2 font-syne">{c.title}</h3>
                <p className="text-slate-400 text-sm">{c.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ textAlign: 'center', marginTop: '3rem' }}>
            <p className="text-slate-400 mb-6">Omedev a la solution pour chacun de ces défis.</p>
            <Link to="/services" className="btn-primary">Découvrir nos solutions <ArrowRight size={18} /></Link>
          </motion.div>
        </div>
      </section>

      {/* DOMAINES D'EXCELLENCE */}
      <section className="py-24" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="container">
          <SectionHeader badge="✨ Notre savoir-faire" title="Domaines d'excellence" subtitle="Nous maîtrisons l'ensemble des technologies essentielles à votre réussite" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertise.map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }}
                className="card-hover p-6 text-center">
                <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: `${item.color}20`, color: item.color }}>
                  <item.icon size={28} />
                </div>
                <h3 className="font-bold text-white text-lg mb-2 font-syne">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NOS SOLUTIONS */}
      <section className="py-24">
        <div className="container">
          <SectionHeader badge="Solutions" title="Solutions adaptées à vos besoins" subtitle="Des réponses concrètes pour chaque défi de votre entreprise" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((sol, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }}
                className="card-hover p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${sol.color}20`, color: sol.color }}>{sol.icon}</div>
                  <h3 className="font-bold text-white text-lg font-syne">{sol.title}</h3>
                </div>
                <p className="text-slate-400 text-sm">{sol.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="container">
          <SectionHeader badge="Nos services" title="Solutions Intégrées" subtitle="De l'infrastructure aux applications, nous couvrons tout le cycle technologique" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.07 }}
                className="card-hover p-8">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5" style={{ background: `${service.color}20`, color: service.color }}>
                  <service.icon size={28} />
                </div>
                <h3 className="font-bold text-white text-xl mb-3 font-syne">{service.title}</h3>
                <p className="text-slate-400 text-sm mb-4">{service.description}</p>
                <Link to="#" className="text-blue-400 text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">En savoir plus <ArrowRight size={14} /></Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)' }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-3"><stat.icon size={24} className="text-cyan-400" /></div>
                <div className="text-4xl font-bold text-white mb-1"><Counter end={stat.value} suffix={stat.suffix} /></div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUITS */}
      <section className="py-24">
        <div className="container">
          <SectionHeader badge="Produits" title="Achetez chez nous" subtitle="Climatiseurs · Matériel IT · Caméras — directement livrés et installés" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="card-hover p-8">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5" style={{ background: `${product.color}20`, color: product.color }}>
                  <product.icon size={28} />
                </div>
                <h3 className="font-bold text-white text-xl mb-3 font-syne">{product.title}</h3>
                <p className="text-slate-400 text-sm mb-4">{product.description}</p>
                <Link to="/boutique" className="text-blue-400 text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">Voir les produits <ArrowRight size={14} /></Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PACKS */}
      <section className="py-24" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="container">
          <SectionHeader badge="Offres packagées" title="Solutions Clé en Main" subtitle="Choisissez l'offre adaptée à votre entreprise" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packs.map((pack, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className={`card-hover p-8 relative ${pack.featured ? 'pricing-popular border-2 border-blue-500' : ''}`}>
                {pack.featured && <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">⭐ Populaire</div>}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(37,99,235,0.2)', color: '#2563eb' }}>
                  <pack.icon size={24} />
                </div>
                <h3 className="font-bold text-white text-2xl mb-2 font-syne">{pack.name}</h3>
                <p className="text-3xl font-bold text-blue-400 mb-6">{pack.price}</p>
                <ul className="space-y-3 mb-8">
                  {pack.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-300 text-sm"><CheckCircle size={16} className="text-blue-400" /> {f}</li>
                  ))}
                </ul>
                <Link to="/demander-devis" className={`block w-full text-center py-3 rounded-xl font-semibold transition-all ${pack.featured ? 'btn-primary' : 'btn-secondary'}`}>
                  Demander ce pack {pack.featured && <ArrowRight size={16} className="inline ml-1" />}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* POURQUOI NOUS CHOISIR */}
      <section className="py-24">
        <div className="container">
          <SectionHeader badge="Pourquoi OMDEVE" title="Pourquoi nous choisir" subtitle="Une expertise locale avec des standards internationaux" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyUs.map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }}
                className="card-hover p-6 text-center">
                <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: `${item.color}20`, color: item.color }}>
                  <item.icon size={28} />
                </div>
                <h3 className="font-bold text-white text-lg mb-2 font-syne">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESSUS */}
      <section className="py-24" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="container">
          <SectionHeader badge="Notre méthodologie" title="Comment ça marche" subtitle="Un processus simple et transparent" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center mx-auto mb-4 text-2xl font-black text-white">{step.number}</div>
                <h3 className="font-bold text-white text-lg mb-2 font-syne">{step.title}</h3>
                <p className="text-slate-400 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTENAIRES */}
      <section className="py-24">
        <div className="container">
          <SectionHeader badge="Nos partenaires" title="Ils nous font confiance" subtitle="Des partenaires technologiques de premier plan" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {partners.map((partner, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }}
                className="card-hover p-6 text-center">
                <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center text-2xl font-bold" style={{ background: `${partner.color}20`, color: partner.color }}>{partner.icon}</div>
                <p className="text-white font-semibold text-sm font-syne">{partner.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section className="py-24" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="container">
          <SectionHeader badge="Témoignages" title="Ils nous font confiance" subtitle="Ce que nos clients pensent de nous" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="card-hover p-6">
                <Quote size={28} className="text-blue-400 opacity-50 mb-4" />
                <p className="text-slate-300 text-sm italic mb-6">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <AvatarPlaceholder name={testimonial.name} />
                  <div><p className="font-semibold text-white text-sm font-syne">{testimonial.name}</p><p className="text-slate-500 text-xs">{testimonial.position}</p></div>
                  <div className="ml-auto flex gap-0.5">{[...Array(testimonial.rating)].map((_, i) => <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />)}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="py-24">
        <div className="container">
          <SectionHeader badge="Actualités" title="Blog & Ressources" subtitle="Tendances, conseils et retours d'expérience" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="card-hover p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-blue-400">{post.category}</span>
                  <span className="text-xs text-slate-500">• {post.date}</span>
                  <span className="text-xs text-slate-500">• {post.readTime}</span>
                </div>
                <h3 className="font-bold text-white text-lg mb-3 font-syne">{post.title}</h3>
                <Link to="#" className="text-blue-400 text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">Lire l'article <ArrowRight size={14} /></Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="container">
          <SectionHeader badge="FAQ" title="Questions fréquentes" subtitle="Toutes les réponses à vos questions" />
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="mb-4 rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full p-5 text-left flex justify-between items-center">
                  <span className="font-semibold text-white">{faq.q}</span>
                  <span className="text-blue-400 text-xl">{openFaq === idx ? '−' : '+'}</span>
                </button>
                {openFaq === idx && <div className="px-5 pb-5 text-slate-400 text-sm border-t border-white/10 pt-4">{faq.a}</div>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-24">
        <div className="container">
          <div className="rounded-3xl p-12 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)' }}>
            <div className="relative z-10">
              <Mail size={48} className="mx-auto mb-4 text-white/80" />
              <h2 className="text-3xl font-bold text-white mb-3 font-syne">Restez informé</h2>
              <p className="text-white/80 mb-6">Recevez nos actualités, conseils et offres exclusives</p>
              <div className="flex flex-wrap gap-3 justify-center max-w-md mx-auto">
                <input type="email" placeholder="Votre email" className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none" />
                <button className="btn-accent">S'abonner <ArrowRight size={18} /></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINALE */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)' }}>
        <div className="container text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6 text-amber-300 text-sm font-semibold"><Rocket size={16} /> Prêt à démarrer</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-syne">Prêt à transformer votre entreprise ?</h2>
            <p className="text-white/80 text-lg mb-8">Climatisation · Matériel IT · Caméras · Solutions digitales complètes</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/demander-devis" className="btn-accent">Demander un devis <ArrowRight size={18} /></Link>
              <Link to="/audit-gratuit" className="btn-outline-light">Audit gratuit <CheckCircle size={18} /></Link>
              <Link to="/boutique" className="btn-outline-light">Voir nos produits <ChevronRight size={18} /></Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;






































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
      <section className="relative bg-gradient-to-br from-navy-950 via-blue-950 to-indigo-950 text-white overflow-hidden min-h-screen flex items-center pt-20">

        {/* Grille de fond technologique */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.08) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(59,130,246,0.08) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />

        {/* Effet lumineux radial subtil */}
        <div className="absolute inset-0 bg-[radial-gradient(at_top_right,#3b82f630_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(at_bottom_left,#8b5cf620_0%,transparent_60%)]" />

        {/* Orbes flottants animés */}
        <div className="orb w-96 h-96 bg-blue-600/20 top-10 -left-20 animate-float" />
        <div className="orb w-72 h-72 bg-indigo-700/15 bottom-20 right-10 animate-float" style={{ animationDelay: '2s' }} />
        <div className="orb w-48 h-48 bg-cyan-500/10 top-1/2 left-1/2 -translate-x-1/2 animate-float" style={{ animationDelay: '4s' }} />

        {/* Contenu principal */}
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full"
              style={{ background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.3)' }}
            >
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-blue-300 font-semibold text-xs tracking-wide font-syne">Solutions Digitales Premium – Afrique</span>
            </motion.div>

            {/* Titre principal */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 font-syne"
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
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-gray-300 text-xl md:text-2xl mb-10 max-w-2xl mx-auto"
            >
              ERP • SaaS • Cybersécurité • Développement Web & Mobile.<br />
              Omedev vous accompagne dans votre <strong className="text-white">digitalisation complète</strong>.
            </motion.p>

            {/* Boutons */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <Link
                to="/contact"
                className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 transition-all hover:scale-[1.02] hover:shadow-xl"
              >
                <span>Demander un devis</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>

              <Link
                to="/solutions"
                className="group border-2 border-white/30 hover:border-white px-8 py-4 rounded-2xl font-semibold text-white hover:bg-white/10 flex items-center justify-center gap-2 transition-all"
              >
                <span>Voir les solutions</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>

              <Link
                to="/audit"
                className="px-6 py-4 rounded-2xl font-semibold text-amber-400 border border-amber-500/30 hover:bg-amber-500/10 transition-all flex items-center gap-2"
              >
                <span>🎁 Audit Gratuit</span>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {[
                { n: '150+', l: 'Projets livrés', icon: '🚀' },
                { n: '98%', l: 'Satisfaction client', icon: '⭐' },
                { n: '50+', l: 'Entreprises clientes', icon: '🏢' },
                { n: '5 ans', l: "D'expertise", icon: '📅' }
              ].map((s, i) => (
                <div
                  key={i}
                  className="group rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 hover:border-blue-500/40"
                  style={{
                    background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(30,64,175,0.03))',
                    border: '1px solid rgba(37,99,235,0.2)'
                  }}
                >
                  <div className="text-2xl mb-1 opacity-60 group-hover:opacity-100 transition-opacity">{s.icon}</div>
                  <div className="font-extrabold text-2xl text-white mb-1 font-syne">{s.n}</div>
                  <div className="text-gray-400 text-xs">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Vague décorative en bas */}
        <div className="absolute bottom-0 left-0 right-0 z-10 text-white/10">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16">
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

























import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import {
  ArrowRight, Server, Shield, Code, Cloud, Zap, GraduationCap,
  CheckCircle, Users, Clock, Award, Star, Quote, Briefcase, Globe,
  Cpu, Camera, Wifi, Wrench, Phone, ThermometerSun, Monitor,
  ChevronRight, Sparkles, TrendingUp, Rocket, TrendingDown, FileText,
  Lock, AlertTriangle, BarChart3, Mail
} from 'lucide-react';

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }
  
  body {
    font-family: 'DM Sans', sans-serif;
    background: #0f172a;
    color: #e2e8f0;
    overflow-x: hidden;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes pulse-ring {
    0% { transform: scale(0.8); opacity: 1; }
    70% { transform: scale(1.3); opacity: 0; }
    100% { transform: scale(0.8); opacity: 0; }
  }
  
  @keyframes slow-zoom {
    0% { transform: scale(1); }
    100% { transform: scale(1.1); }
  }
  
  @keyframes glow-pulse {
    0%, 100% { box-shadow: 0 0 5px rgba(59,130,246,0.3); }
    50% { box-shadow: 0 0 20px rgba(59,130,246,0.6); }
  }
  
  @keyframes icon-bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
  
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-slow-zoom { animation: slow-zoom 20s ease-out infinite alternate; }
  .animate-glow-pulse { animation: glow-pulse 2s ease-in-out infinite; }
  
  .hover-scale {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .hover-scale:hover {
    transform: scale(1.05);
  }
  
  .hover-icon-bounce:hover svg {
    animation: icon-bounce 0.5s ease-in-out;
  }
  
  .hover-lift {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .hover-lift:hover {
    transform: translateY(-4px);
  }
  
  .hover-glow {
    transition: all 0.3s ease;
  }
  .hover-glow:hover {
    box-shadow: 0 0 25px rgba(59,130,246,0.4);
  }
  
  .hover-border-glow {
    transition: all 0.3s ease;
  }
  .hover-border-glow:hover {
    border-color: rgba(59,130,246,0.6);
    box-shadow: 0 0 20px rgba(59,130,246,0.2);
  }
  
  .hover-rotate {
    transition: transform 0.3s ease;
  }
  .hover-rotate:hover {
    transform: rotate(5deg);
  }
  
  .card-hover-effect {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .card-hover-effect:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  }
`;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

const SectionHeader = ({ badge, title, subtitle }) => (
  <motion.div variants={staggerContainer} className="text-center mb-12">
    {badge && (
      <motion.div variants={fadeUp}>
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full bg-blue-600/15 text-blue-400 border border-blue-500/30 font-syne hover:bg-blue-600/25 transition-all duration-300 cursor-default">
          {badge}
        </span>
      </motion.div>
    )}
    <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-extrabold font-syne bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400 bg-clip-text text-transparent mt-4">
      {title}
    </motion.h2>
    <motion.div variants={fadeUp} className="w-16 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full mx-auto my-4" />
    {subtitle && <motion.p variants={fadeUp} className="text-gray-400 text-lg max-w-2xl mx-auto">{subtitle}</motion.p>}
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
  { icon: Server, title: 'Réseau & Infrastructure', description: 'Câblage structuré, WiFi entreprise, fibre optique haute performance', color: 'blue' },
  { icon: Shield, title: 'Cybersécurité & Surveillance', description: 'Firewalls, audits, vidéosurveillance intelligente 24/7', color: 'cyan' },
  { icon: Code, title: 'Développement Digital', description: 'Applications web, mobiles, ERP sur mesure', color: 'amber' },
  { icon: Cloud, title: 'Cloud & Télécommunications', description: 'Hébergement cloud, VoIP, solutions télécom intégrées', color: 'blue' },
  { icon: Zap, title: 'Énergie & Maintenance', description: 'Panneaux solaires, maintenance préventive et corrective', color: 'orange' },
  { icon: GraduationCap, title: 'Formation & Accompagnement', description: 'Formations certifiantes et transfert de compétences', color: 'purple' },
];

const expertise = [
  { icon: Code, title: 'Développement Logiciel', desc: 'Apps web & mobiles sur mesure, API, IA intégrée', color: 'blue' },
  { icon: Phone, title: 'Télécommunications', desc: 'Réseaux VoIP, fibre, communication unifiée', color: 'cyan' },
  { icon: Camera, title: 'Vidéosurveillance', desc: 'Caméras IP, IA de reconnaissance, monitoring 24/7', color: 'amber' },
  { icon: Wrench, title: 'Maintenance & Support', desc: 'Maintenance préventive, corrective, assistance dédiée', color: 'blue' },
];

const products = [
  { icon: ThermometerSun, title: 'Climatisation Pro', description: 'Systèmes de refroidissement haute performance pour entreprises', color: 'blue' },
  { icon: Monitor, title: 'Matériel IT', description: 'PC, serveurs, écrans et accessoires professionnels', color: 'cyan' },
  { icon: Camera, title: 'Surveillance', description: 'Caméras IP 4K, PTZ, IA intégrée', color: 'amber' },
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
  { icon: Users, title: 'Expertise locale', description: 'Une équipe basée à Kinshasa qui comprend vos enjeux locaux', color: 'blue' },
  { icon: Clock, title: 'Support 24/7', description: 'Assistance réactive et disponible à tout moment', color: 'cyan' },
  { icon: Award, title: 'Qualité certifiée', description: 'Standards internationaux et certifications professionnelles', color: 'amber' },
  { icon: TrendingUp, title: 'Innovation constante', description: 'Veille technologique et solutions toujours à jour', color: 'blue' },
];

const testimonials = [
  { name: 'Jean M.', position: 'CEO, TechCorp', content: 'OMDEVE a transformé notre infrastructure IT. Service impeccable et équipe très professionnelle.', rating: 5 },
  { name: 'Sarah K.', position: 'Directrice, Energy Solutions', content: "L'installation des panneaux solaires a été réalisée avec excellence. Économies d'énergie significatives.", rating: 5 },
  { name: 'Marc L.', position: 'CTO, Digital Africa', content: 'La plateforme e-commerce développée est performante et élégante. Hautement recommandé.', rating: 5 },
];

const steps = [
  { number: '01', title: 'Audit & Conseil', desc: 'Analyse approfondie de vos besoins et diagnostic gratuit' },
  { number: '02', title: 'Proposition sur mesure', desc: 'Devis détaillé et planning transparent' },
  { number: '03', title: 'Déploiement', desc: 'Installation, configuration et tests qualité' },
  { number: '04', title: 'Support & Évolution', desc: 'Maintenance et améliorations continues' },
];

const challenges = [
  { icon: TrendingDown, title: 'Perte financière', desc: 'Des processus inefficaces coûtent en moyenne 20% du CA chaque année.', color: 'red' },
  { icon: FileText, title: 'Gestion manuelle', desc: 'Fichiers Excel, papier, erreurs humaines… votre temps vaut plus que ça.', color: 'amber' },
  { icon: Lock, title: 'Failles de sécurité', desc: 'Sans cybersécurité, vos données et celles de vos clients sont vulnérables.', color: 'blue' },
  { icon: AlertTriangle, title: 'Croissance bloquée', desc: "L'absence d'outils digitaux freine votre expansion et votre compétitivité.", color: 'purple' },
];

const AvatarPlaceholder = ({ name }) => {
  const initial = name.charAt(0);
  return (
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm transition-all duration-300 hover:scale-110 hover:shadow-lg">
      {initial}
    </div>
  );
};

const Home = () => {
  return (
    <>
      <style>{globalStyles}</style>

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white overflow-hidden min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 animate-slow-zoom opacity-30"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')` }} />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: `linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />

        <div className="absolute w-96 h-96 bg-blue-600/20 top-10 -left-20 rounded-full filter blur-[80px] animate-float" />
        <div className="absolute w-72 h-72 bg-indigo-700/15 bottom-20 right-10 rounded-full filter blur-[80px] animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute w-48 h-48 bg-cyan-500/10 top-1/2 left-1/2 -translate-x-1/2 rounded-full filter blur-[80px] animate-float" style={{ animationDelay: '4s' }} />

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-600/15 border border-blue-500/30 hover:bg-blue-600/25 hover:border-blue-400 transition-all duration-300 cursor-default">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-blue-300 font-semibold text-xs tracking-wide font-syne">Solutions Digitales Premium – Afrique</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 font-syne">
              Transformez votre <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400">Business Digital</span><br />
              avec l'expertise
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="text-gray-300 text-xl md:text-2xl mb-10 max-w-2xl mx-auto">
              ERP • SaaS • Cybersécurité • Développement Web & Mobile.<br />
              Omedev vous accompagne dans votre <strong className="text-white">digitalisation complète</strong>.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link to="/contact" className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 transition-all hover:scale-[1.02] hover:shadow-xl">
                Demander un devis <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/solutions" className="group border-2 border-white/30 hover:border-white px-8 py-4 rounded-2xl font-semibold text-white hover:bg-white/10 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]">
                Voir les solutions <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/audit" className="px-6 py-4 rounded-2xl font-semibold text-amber-400 border border-amber-500/30 hover:bg-amber-500/10 transition-all hover:scale-[1.02] flex items-center gap-2">
                🎁 Audit Gratuit
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { n: '150+', l: 'Projets livrés', icon: '🚀' },
                { n: '98%', l: 'Satisfaction client', icon: '⭐' },
                { n: '50+', l: 'Entreprises clientes', icon: '🏢' },
                { n: '5 ans', l: "D'expertise", icon: '📅' }
              ].map((s, i) => (
                <div key={i} className="group rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 hover:bg-blue-600/20 bg-gradient-to-br from-blue-600/10 to-blue-800/5 border border-blue-500/20 hover:border-blue-400 cursor-pointer">
                  <div className="text-2xl mb-1 opacity-60 group-hover:opacity-100 transition-all group-hover:scale-110">{s.icon}</div>
                  <div className="font-extrabold text-2xl text-white mb-1 font-syne group-hover:text-blue-300 transition-colors">{s.n}</div>
                  <div className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 text-white/10">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* ==================== DÉFIS ==================== */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 font-syne hover:bg-amber-500/25 transition-all duration-300 cursor-default">⚠️ Problèmes courants</span>
            <h2 className="text-3xl md:text-5xl font-extrabold font-syne bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400 bg-clip-text text-transparent mt-4">Ces défis vous parlent ?</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full mx-auto my-4" />
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">La plupart des PME africaines perdent des opportunités faute d'outils digitaux adaptés.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {challenges.map((c, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="p-6 text-center transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl bg-white/5 border border-white/10 rounded-2xl hover:border-blue-500/50 hover:bg-white/10 cursor-pointer group">
                <div className={`mb-4 text-${c.color}-400 transition-all duration-300 group-hover:scale-110 group-hover:text-${c.color}-300`}><c.icon size={28} /></div>
                <h3 className="font-bold text-white text-lg mb-2 font-syne group-hover:text-blue-300 transition-colors">{c.title}</h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">{c.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-gray-400 mb-6 text-lg">Omedev a la solution pour chacun de ces défis.</p>
            <Link to="/services" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all hover:scale-[1.02] hover:shadow-xl">
              Découvrir nos solutions <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== DOMAINES D'EXCELLENCE ==================== */}
      <section className="py-24 bg-white/5">
        <div className="container mx-auto px-4">
          <SectionHeader badge="✨ Notre savoir-faire" title="Domaines d'excellence" subtitle="Nous maîtrisons l'ensemble des technologies essentielles à votre réussite" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertise.map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }}
                className="p-8 text-center transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl bg-white/5 border border-white/10 rounded-2xl hover:border-blue-500/50 hover:bg-white/10 cursor-pointer group">
                <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-${item.color}-500/20 text-${item.color}-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-${item.color}-500/30`}>
                  <item.icon size={32} />
                </div>
                <h3 className="font-bold text-white text-xl mb-2 font-syne group-hover:text-blue-300 transition-colors">{item.title}</h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SERVICES ==================== */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <SectionHeader badge="Nos services" title="Solutions Intégrées" subtitle="De l'infrastructure aux applications, nous couvrons tout le cycle technologique" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.07 }}
                className="p-8 transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl bg-white/5 border border-white/10 rounded-2xl hover:border-blue-500/50 hover:bg-white/10 cursor-pointer group">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 bg-${service.color}-500/20 text-${service.color}-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-${service.color}-500/30`}>
                  <service.icon size={28} />
                </div>
                <h3 className="font-bold text-white text-xl mb-3 font-syne group-hover:text-blue-300 transition-colors">{service.title}</h3>
                <p className="text-gray-400 text-sm mb-4 group-hover:text-gray-300 transition-colors">{service.description}</p>
                <Link to="#" className="text-blue-400 text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all group-hover:text-blue-300">
                  En savoir plus <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== STATS ==================== */}
      <section className="py-20 bg-gradient-to-br from-blue-900/50 to-indigo-900/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-white/10 cursor-pointer group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                  <stat.icon size={24} className="text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors"><Counter end={stat.value} suffix={stat.suffix} /></div>
                <div className="text-white/70 text-sm group-hover:text-white/90 transition-colors">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PRODUITS ==================== */}
      <section className="py-24 bg-white/5">
        <div className="container mx-auto px-4">
          <SectionHeader badge="Produits & Équipements" title="Achetez chez nous" subtitle="Climatiseurs · Matériel IT · Caméras — directement livrés et installés" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="p-8 transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl bg-white/5 border border-white/10 rounded-2xl hover:border-blue-500/50 hover:bg-white/10 cursor-pointer group">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 bg-${product.color}-500/20 text-${product.color}-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-${product.color}-500/30`}>
                  <product.icon size={28} />
                </div>
                <h3 className="font-bold text-white text-xl mb-3 font-syne group-hover:text-blue-300 transition-colors">{product.title}</h3>
                <p className="text-gray-400 text-sm mb-4 group-hover:text-gray-300 transition-colors">{product.description}</p>
                <Link to="/boutique" className="text-blue-400 text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all group-hover:text-blue-300">
                  Voir les produits <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PACKS ==================== */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <SectionHeader badge="Offres packagées" title="Solutions Clé en Main" subtitle="Choisissez l'offre adaptée à votre entreprise" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packs.map((pack, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className={`p-8 relative transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl bg-white/5 border rounded-2xl cursor-pointer group ${pack.featured ? 'border-blue-500 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40' : 'border-white/10 hover:border-blue-500/50'}`}>
                {pack.featured && <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl transition-all duration-300 group-hover:from-blue-600 group-hover:to-blue-700">⭐ Populaire</div>}
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-500/30">
                  <pack.icon size={24} />
                </div>
                <h3 className="font-bold text-white text-2xl mb-2 font-syne group-hover:text-blue-300 transition-colors">{pack.name}</h3>
                <p className="text-3xl font-bold text-blue-400 mb-6 group-hover:text-blue-300 transition-colors">{pack.price}</p>
                <ul className="space-y-3 mb-8">
                  {pack.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-300 text-sm group-hover:text-gray-200 transition-colors">
                      <CheckCircle size={16} className="text-blue-400 group-hover:text-blue-300 transition-colors" /> {f}
                    </li>
                  ))}
                </ul>
                <div className={`block w-full text-center py-3 rounded-xl font-semibold transition-all ${pack.featured ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white' : 'border border-blue-500/50 text-blue-400 hover:bg-blue-500/10'} hover:scale-[1.02]`}>
                  Demander ce pack {pack.featured && <ArrowRight size={16} className="inline ml-1" />}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== POURQUOI NOUS CHOISIR ==================== */}
      <section className="py-24 bg-white/5">
        <div className="container mx-auto px-4">
          <SectionHeader badge="Pourquoi OMDEVE" title="Pourquoi nous choisir" subtitle="Une expertise locale avec des standards internationaux" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyUs.map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }}
                className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-500/50 hover:bg-white/10 cursor-pointer group">
                <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center bg-${item.color}-500/20 text-${item.color}-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-${item.color}-500/30`}>
                  <item.icon size={32} />
                </div>
                <h3 className="font-bold text-white text-lg mb-2 font-syne group-hover:text-blue-300 transition-colors">{item.title}</h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PROCESSUS ==================== */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <SectionHeader badge="Notre méthodologie" title="Comment ça marche" subtitle="Un processus simple et transparent" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} 
                className="text-center transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4 text-2xl font-black text-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                  {step.number}
                </div>
                <h3 className="font-bold text-white text-lg mb-2 font-syne group-hover:text-blue-300 transition-colors">{step.title}</h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TÉMOIGNAGES ==================== */}
      <section className="py-24 bg-white/5">
        <div className="container mx-auto px-4">
          <SectionHeader badge="Témoignages" title="Ils nous font confiance" subtitle="Ce que nos clients pensent de nous" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="p-6 transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl bg-white/5 border border-white/10 rounded-2xl hover:border-blue-500/50 hover:bg-white/10 cursor-pointer group">
                <Quote size={28} className="text-blue-400 opacity-50 mb-4 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100" />
                <p className="text-gray-300 text-sm italic mb-6 group-hover:text-gray-200 transition-colors">"{t.content}"</p>
                <div className="flex items-center gap-3">
                  <AvatarPlaceholder name={t.name} />
                  <div>
                    <p className="font-semibold text-white text-sm group-hover:text-blue-300 transition-colors">{t.name}</p>
                    <p className="text-gray-500 text-xs group-hover:text-gray-400 transition-colors">{t.position}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(t.rating)].map((_, i) => <Star key={i} size={14} className="fill-amber-400 text-amber-400 transition-all duration-300 group-hover:scale-110" />)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA FINALE ==================== */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6 text-amber-300 text-sm font-semibold hover:bg-white/20 transition-all duration-300 cursor-default">
              <Rocket size={16} className="hover:animate-pulse" /> Prêt à démarrer
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-syne">Prêt à transformer votre entreprise ?</h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">Climatisation · Matériel IT · Caméras · Solutions digitales complètes</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/demander-devis" className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-4 rounded-xl font-semibold transition-all hover:scale-[1.05] hover:shadow-xl">
                Demander un devis <ArrowRight size={18} />
              </Link>
              <Link to="/audit-gratuit" className="inline-flex items-center gap-2 border border-white/30 hover:border-white px-8 py-4 rounded-xl font-semibold text-white hover:bg-white/10 transition-all hover:scale-[1.05]">
                Audit gratuit <CheckCircle size={18} />
              </Link>
              <Link to="/boutique" className="inline-flex items-center gap-2 border border-white/30 hover:border-white px-8 py-4 rounded-xl font-semibold text-white hover:bg-white/10 transition-all hover:scale-[1.05]">
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




























































































































































import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  GraduationCap,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  MessageSquare,
  Send,
  CheckCircle,
  ArrowRight,
  ArrowLeft
} from 'lucide-react'

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: #080e1f;
    color: #e2e8f0;
    overflow-x: hidden;
  }

  .font-syne { font-family: 'Syne', sans-serif; }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-24px) rotate(3deg); }
  }
  @keyframes float2 {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(18px) rotate(-2deg); }
  }
  @keyframes pulse-glow {
    0%, 100% { opacity: 0.18; }
    50% { opacity: 0.32; }
  }
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .animate-float  { animation: float  7s ease-in-out infinite; }
  .animate-float2 { animation: float2 9s ease-in-out infinite; }
  .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
  .animate-spin-slow  { animation: spin-slow 30s linear infinite; }

  /* Custom select arrow */
  select option { background: #1e2a44; color: #e2e8f0; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #080e1f; }
  ::-webkit-scrollbar-thumb { background: #3730a3; border-radius: 3px; }

  /* Focus ring */
  .field-input:focus { outline: none; border-color: #818cf8; box-shadow: 0 0 0 3px rgba(129,140,248,0.15); }

  /* Step indicator dots */
  .step-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(129,140,248,0.25); transition: all 0.3s; }
  .step-dot.active { background: #818cf8; box-shadow: 0 0 10px rgba(129,140,248,0.6); }
`;

/* ─── Field wrapper ─── */
const Field = ({ label, icon: Icon, children }) => (
  <div className="flex flex-col gap-2">
    <label className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-slate-400">
      <Icon size={13} className="text-indigo-400" />
      {label}
    </label>
    {children}
  </div>
)

const inputCls =
  'field-input w-full bg-slate-900/60 border border-slate-700/60 rounded-xl px-4 py-3.5 text-sm text-slate-100 placeholder-slate-600 transition-all duration-200 hover:border-slate-600 appearance-none'

/* ─── Main component ─── */
const Inscription = () => {
  const [formData, setFormData] = useState({
    nom: '', email: '', telephone: '', formation: '',
    centre: '', disponibilite: '', financement: '', message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setSubmitted(true)
      setLoading(false)
      setTimeout(() => {
        setSubmitted(false)
        setFormData({ nom:'', email:'', telephone:'', formation:'', centre:'', disponibilite:'', financement:'', message:'' })
      }, 4000)
    }, 1600)
  }

  const formationsList    = ["Réseaux & Infrastructure","Cybersécurité","Cloud & Virtualisation","Développement DevOps","Soft skills IT","Préparation certifications"]
  const centresList       = ["Paris","Lyon","Bordeaux"]
  const disponibilitesList= ["Matin (9h–12h)","Après-midi (14h–17h)","Soir (18h–21h)","Week-end","Intra-entreprise (dates à définir)"]
  const financementsList  = ["Entreprise (OPCO, plan de formation)","CPF (Compte Personnel de Formation)","Financement personnel","Pôle Emploi / AIF","Je ne sais pas encore"]

  /* Progress dots */
  const fields     = ['nom','email','telephone','formation','centre','disponibilite','financement']
  const filled     = fields.filter(k => formData[k]).length
  const pct        = Math.round((filled / fields.length) * 100)

  return (
    <>
      <style>{globalStyles}</style>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-36 pb-24" style={{ background: 'linear-gradient(135deg, #080e1f 0%, #0d1530 40%, #120b2e 100%)' }}>

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: `linear-gradient(rgba(129,140,248,1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(129,140,248,1) 1px, transparent 1px)`,
          backgroundSize: '56px 56px'
        }} />

        {/* Orbs */}
        <div className="absolute w-[520px] h-[520px] rounded-full animate-float animate-pulse-glow -top-32 -left-40"
          style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.35) 0%, transparent 70%)' }} />
        <div className="absolute w-[380px] h-[380px] rounded-full animate-float2 animate-pulse-glow bottom-0 right-[-80px]"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)' }} />

        {/* Spinning ring */}
        <div className="absolute top-24 right-24 w-32 h-32 rounded-full border border-indigo-500/20 animate-spin-slow" />
        <div className="absolute top-28 right-28 w-20 h-20 rounded-full border border-purple-500/15 animate-spin-slow" style={{ animationDirection:'reverse', animationDuration:'20s' }} />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center">

            {/* Badge */}
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border"
              style={{ background:'rgba(79,70,229,0.12)', borderColor:'rgba(129,140,248,0.25)' }}>
              <GraduationCap size={14} className="text-indigo-400" />
              <span className="font-syne text-[11px] font-semibold tracking-[0.18em] uppercase text-indigo-300">
                Formulaire d'inscription
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
              className="font-syne text-5xl md:text-6xl font-extrabold leading-[1.1] mb-6">
              Rejoignez{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text"
                  style={{ backgroundImage:'linear-gradient(135deg, #818cf8 0%, #a78bfa 50%, #c084fc 100%)' }}>
                  nos formations
                </span>
                {/* Underline accent */}
                <span className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
                  style={{ background:'linear-gradient(90deg, #818cf8, #a78bfa, transparent)' }} />
              </span>
            </motion.h1>

            <motion.p initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
              className="text-slate-400 text-lg leading-relaxed">
              Remplissez le formulaire ci-dessous. Un conseiller vous recontactera
              sous&nbsp;<strong className="text-slate-300 font-medium">24&nbsp;h</strong> pour valider votre inscription.
            </motion.p>

            {/* Scroll hint */}
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.6 }}
              className="mt-10 flex justify-center">
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-px h-8 bg-gradient-to-b from-indigo-500/50 to-transparent" />
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400/60" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FORM
      ══════════════════════════════════════ */}
      <section className="py-20 relative" style={{ background: 'linear-gradient(180deg, #0d1530 0%, #080e1f 100%)' }}>

        {/* Subtle side glow */}
        <div className="absolute left-0 top-1/3 w-64 h-64 rounded-full pointer-events-none"
          style={{ background:'radial-gradient(circle, rgba(79,70,229,0.12) 0%, transparent 70%)' }} />

        <div className="container mx-auto px-6 max-w-2xl relative z-10">

          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            className="rounded-2xl overflow-hidden"
            style={{ background:'rgba(15,23,42,0.7)', border:'1px solid rgba(129,140,248,0.14)', backdropFilter:'blur(20px)', boxShadow:'0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)' }}>

            {/* Form top bar */}
            <div className="px-8 pt-8 pb-0">
              <div className="flex items-center justify-between mb-1">
                <span className="font-syne text-xs font-semibold tracking-widest uppercase text-slate-500">
                  Progression
                </span>
                <span className="font-syne text-xs font-bold text-indigo-400">{pct}%</span>
              </div>
              {/* Progress bar */}
              <div className="h-[3px] rounded-full bg-slate-800 mb-8">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background:'linear-gradient(90deg, #6366f1, #a78bfa)' }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration:0.4 }}
                />
              </div>
            </div>

            <div className="px-8 pb-10">
              {submitted ? (
                <motion.div initial={{ scale:0.88, opacity:0 }} animate={{ scale:1, opacity:1 }}
                  className="text-center py-16">
                  <div className="relative inline-flex items-center justify-center mb-6">
                    <div className="absolute w-24 h-24 rounded-full animate-pulse"
                      style={{ background:'rgba(52,211,153,0.12)' }} />
                    <CheckCircle size={52} className="text-emerald-400 relative z-10" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-syne text-2xl font-bold text-white mb-3">
                    Inscription envoyée !
                  </h3>
                  <p className="text-slate-400 text-sm mb-8 max-w-xs mx-auto leading-relaxed">
                    Merci, notre équipe vous recontactera dans les plus brefs délais.
                  </p>
                  <Link to="/"
                    className="inline-flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                    Retour à l'accueil <ArrowRight size={15} />
                  </Link>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* Row 1 */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <Field label="Nom complet" icon={User}>
                      <input type="text" name="nom" value={formData.nom}
                        onChange={handleChange} required placeholder="Jean Dupont"
                        className={inputCls} />
                    </Field>
                    <Field label="Email professionnel" icon={Mail}>
                      <input type="email" name="email" value={formData.email}
                        onChange={handleChange} required placeholder="jean@entreprise.com"
                        className={inputCls} />
                    </Field>
                  </div>

                  {/* Row 2 */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <Field label="Téléphone" icon={Phone}>
                      <input type="tel" name="telephone" value={formData.telephone}
                        onChange={handleChange} required placeholder="+33 6 12 34 56 78"
                        className={inputCls} />
                    </Field>
                    <Field label="Formation souhaitée" icon={GraduationCap}>
                      <select name="formation" value={formData.formation}
                        onChange={handleChange} required className={inputCls}
                        style={{ cursor:'pointer' }}>
                        <option value="">Sélectionnez une formation</option>
                        {formationsList.map(f => <option key={f}>{f}</option>)}
                      </select>
                    </Field>
                  </div>

                  {/* Row 3 */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <Field label="Centre de formation" icon={MapPin}>
                      <select name="centre" value={formData.centre}
                        onChange={handleChange} required className={inputCls}
                        style={{ cursor:'pointer' }}>
                        <option value="">Choisissez un centre</option>
                        {centresList.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </Field>
                    <Field label="Disponibilité" icon={Calendar}>
                      <select name="disponibilite" value={formData.disponibilite}
                        onChange={handleChange} required className={inputCls}
                        style={{ cursor:'pointer' }}>
                        <option value="">Choisissez une période</option>
                        {disponibilitesList.map(d => <option key={d}>{d}</option>)}
                      </select>
                    </Field>
                  </div>

                  {/* Financement */}
                  <Field label="Mode de financement" icon={DollarSign}>
                    <select name="financement" value={formData.financement}
                      onChange={handleChange} required className={inputCls}
                      style={{ cursor:'pointer' }}>
                      <option value="">Sélectionnez un mode de financement</option>
                      {financementsList.map(f => <option key={f}>{f}</option>)}
                    </select>
                  </Field>

                  {/* Message */}
                  <Field label="Message complémentaire" icon={MessageSquare}>
                    <textarea name="message" value={formData.message}
                      onChange={handleChange} rows={4}
                      placeholder="Informations supplémentaires, besoins spécifiques…"
                      className={inputCls} style={{ resize:'vertical', minHeight:'110px' }} />
                  </Field>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-slate-700/60 to-transparent" />

                  {/* Submit */}
                  <button type="submit" disabled={loading}
                    className="relative w-full rounded-xl py-4 text-sm font-semibold text-white flex items-center justify-center gap-2.5 overflow-hidden group transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ background:'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', boxShadow:'0 8px 32px rgba(79,70,229,0.35)' }}>
                    {/* Hover shimmer */}
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background:'linear-gradient(135deg, #6366f1 0%, #9333ea 100%)' }} />
                    <span className="relative z-10 font-syne tracking-wide flex items-center gap-2.5">
                      {loading ? (
                        <>
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                          </svg>
                          Envoi en cours…
                        </>
                      ) : (
                        <>
                          Envoyer ma demande d'inscription
                          <Send size={15} />
                        </>
                      )}
                    </span>
                  </button>

                  <p className="text-center text-[11px] text-slate-600 leading-relaxed">
                    En soumettant ce formulaire, vous acceptez que vos données soient traitées pour vous recontacter.<br/>
                    Conformément au RGPD, vous disposez d'un droit d'accès et de suppression.
                  </p>
                </form>
              )}
            </div>
          </motion.div>

          {/* Back link */}
          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
            className="text-center mt-8">
            <Link to="/formation"
              className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-400 transition-colors duration-200">
              <ArrowLeft size={14} />
              Retour aux formations
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Inscription