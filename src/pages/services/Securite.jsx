import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Shield,
  Lock,
  Eye,
  Video,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Server,
  Wifi,
  TrendingUp,
  HardDrive,
  Zap,
  Network,
  Users,
  GraduationCap,
  Smartphone,
  Radio,
  Database,
  Cloud,
  BarChart,
  Activity,
  Headphones,
  Phone,
  MessageCircle,
  Rocket,
  FileText
} from 'lucide-react'

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
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-pulse-ring { animation: pulse-ring 2s ease-out infinite; }
  .shimmer {
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
  }
`;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 0.68, 0, 1] } }
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 0.68, 0, 1] } }
};

const floatVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 0.68, 0, 1] }
  },
  hover: {
    y: -8,
    transition: { duration: 0.3, ease: [0.22, 0.68, 0, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};

const Securite = () => {
  const securityServices = [
    { icon: Video, title: 'Vidéosurveillance (CCTV/IP)', desc: 'Installation de caméras haute définition, accès à distance et détection d’intrusion.', gradient: 'from-blue-500 to-blue-600' },
    { icon: Shield, title: 'Audit de cybersécurité', desc: 'Tests d’intrusion, analyse de vulnérabilités et conformité RGPD.', gradient: 'from-cyan-500 to-cyan-600' },
    { icon: Lock, title: 'Firewalls & Protection réseau', desc: 'Mise en place de pare-feu nouvelle génération, filtrage et VPN.', gradient: 'from-indigo-500 to-indigo-600' },
    { icon: GraduationCap, title: 'Formation cybersécurité', desc: 'Sensibilisation des équipes, bonnes pratiques et gestion des incidents.', gradient: 'from-purple-500 to-purple-600' }
  ]

  const telecomServices = [
    { icon: Radio, title: 'Sécurité des réseaux 4G/5G', desc: 'Protection des liaisons mobiles et des infrastructures critiques.', color: 'from-blue-500 to-blue-600', bgHover: 'hover:border-blue-500/70 hover:bg-blue-500/10' },
    { icon: Wifi, title: 'Wi-Fi sécurisé', desc: 'Authentification avancée, segmentation et chiffrement des flux.', color: 'from-cyan-500 to-cyan-600', bgHover: 'hover:border-cyan-500/70 hover:bg-cyan-500/10' },
    { icon: Network, title: 'Voix sur IP (VoIP) sécurisée', desc: 'Chiffrement des appels, anti-fraude et conformité.', color: 'from-indigo-500 to-indigo-600', bgHover: 'hover:border-indigo-500/70 hover:bg-indigo-500/10' },
    { icon: Smartphone, title: 'Sécurité des terminaux mobiles', desc: 'MDM, conteneurisation et protection des données.', color: 'from-purple-500 to-purple-600', bgHover: 'hover:border-purple-500/70 hover:bg-purple-500/10' }
  ]

  const itSecurityServices = [
    { icon: Database, title: 'Protection des données', desc: 'Chiffrement, DLP, sauvegardes sécurisées.', color: 'from-blue-500 to-blue-600', bgHover: 'hover:border-blue-500/70 hover:bg-blue-500/10' },
    { icon: Cloud, title: 'Sécurité cloud', desc: 'CASB, IAM, conformité cloud.', color: 'from-cyan-500 to-cyan-600', bgHover: 'hover:border-cyan-500/70 hover:bg-cyan-500/10' },
    { icon: Server, title: 'Sécurité des serveurs', desc: 'Antivirus, HIDS, patch management.', color: 'from-indigo-500 to-indigo-600', bgHover: 'hover:border-indigo-500/70 hover:bg-indigo-500/10' },
    { icon: Activity, title: 'Monitoring SIEM', desc: 'Supervision centralisée des logs et alertes.', color: 'from-purple-500 to-purple-600', bgHover: 'hover:border-purple-500/70 hover:bg-purple-500/10' }
  ]

  const stats = [
    { value: '98%', label: 'Réduction des incidents après audit', icon: Shield, color: 'blue' },
    { value: '24/7', label: 'Monitoring et réponse', icon: Activity, color: 'cyan' },
    { value: '50+', label: 'Clients protégés', icon: Users, color: 'indigo' },
    { value: '100%', label: 'Conformité RGPD assurée', icon: CheckCircle, color: 'emerald' }
  ]

  const testimonials = [
    {
      name: 'Marc D.',
      role: 'Directeur IT, Groupe Bancaire',
      quote: 'OMDEVE a sécurisé l’ensemble de notre réseau et de nos télécoms. Leur expertise en cybersécurité est remarquable.',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
    },
    {
      name: 'Sophie L.',
      role: 'Responsable Sécurité, Opérateur Télécom',
      quote: 'La formation cybersécurité a sensibilisé nos équipes et réduit les risques de phishing de 80%.',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
    }
  ]

  const images = [
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop'
  ]

  const benefits = [
    'Experts certifiés (CISSP, CEH, ISO 27001)',
    'Solutions sur mesure pour PME et grands comptes',
    'Monitoring 24/7 et réponse aux incidents',
    'Rapports d’audit détaillés avec plan d’action',
    'Conformité RGPD, ISO 27001, HDS'
  ]

  const ServiceCard = ({ service, index }) => {
    return (
      <motion.div
        variants={floatVariants}
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        viewport={{ once: true }}
        custom={index}
        className="group bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:shadow-2xl hover:border-blue-500/50 hover:bg-white/10 cursor-pointer relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:via-blue-500/5 transition-all duration-700" />
        <div className="flex justify-between items-start mb-4">
          <motion.div 
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg`}
            whileHover={{ scale: 1.15, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <service.icon size={22} className="text-white" />
          </motion.div>
          <motion.span 
            className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            Sur devis
          </motion.span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2 font-syne group-hover:text-blue-300 transition-colors">
          {service.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-5 group-hover:text-gray-300 transition-colors">
          {service.desc}
        </p>
        <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
          <Link to="/demander-devis" className="inline-flex items-center gap-2 text-blue-400 text-sm font-semibold group-hover:text-blue-300 transition-all">
            Demander un devis <ArrowRight size={14} />
          </Link>
        </motion.div>
      </motion.div>
    )
  }

  const TelecomCard = ({ item, index }) => {
    return (
      <motion.div
        variants={floatVariants}
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        viewport={{ once: true }}
        custom={index}
        className={`group flex gap-3 items-start bg-white/5 p-4 rounded-xl border border-white/10 transition-all duration-300 ${item.bgHover} cursor-pointer relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 shimmer" />
        <motion.div 
          className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg flex-shrink-0`}
          whileHover={{ scale: 1.15, rotate: 8 }}
          transition={{ duration: 0.3 }}
        >
          <item.icon size={18} className="text-white" />
        </motion.div>
        <div className="flex-1">
          <h4 className="font-bold text-white group-hover:text-blue-300 transition-colors">{item.title}</h4>
          <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">{item.desc}</p>
        </div>
        <motion.div 
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ scale: 0 }}
          whileHover={{ scale: 1 }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
        </motion.div>
      </motion.div>
    )
  }

  return (
    <>
      <style>{globalStyles}</style>

    {/* Hero Section - Sécurité Globale (500px) */}
<section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white overflow-hidden pt-24 pb-12">
  
  {/* Image d'arrière-plan avec overlay */}
  <div className="absolute inset-0 overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 animate-slow-zoom"
      style={{
        backgroundImage: `url('https://img.freepik.com/photos-gratuite/contexte-energie-nucleaire-ia-innovation-future-technologie-rupture_53876-129783.jpg?semt=ais_hybrid&w=740&q=80')`
      }}
    />
    <div className="absolute inset-0 bg-black/65"></div>
  </div>

  <div className="absolute inset-0 opacity-20" style={{
    backgroundImage: `linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)`,
    backgroundSize: '60px 60px'
  }} />
  
  <div className="absolute inset-0 bg-[radial-gradient(at_top_right,#3b82f645_0%,transparent_65%)]" />
  
  <motion.div 
    className="absolute w-80 h-80 bg-blue-600/20 top-16 -left-20 rounded-full filter blur-[80px]"
    animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
  />
  <motion.div 
    className="absolute w-64 h-64 bg-indigo-700/15 bottom-16 right-10 rounded-full filter blur-[80px]"
    animate={{ x: [0, -15, 0], y: [0, -15, 0] }}
    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
  />
  <motion.div 
    className="absolute w-36 h-36 bg-cyan-500/10 top-1/2 left-1/2 -translate-x-1/2 rounded-full filter blur-[80px]"
    animate={{ scale: [1, 1.2, 1] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
  />

  <div className="container mx-auto px-4 relative z-10">
    <div className="max-w-3xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-blue-600/15 border border-blue-500/30"
      >
        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse-ring" />
        <span className="text-blue-300 font-semibold text-[10px] tracking-wide font-syne">Sécurité Globale</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 0.68, 0, 1] }}
        className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-3 font-syne"
      >
        Sécurisez votre{' '}
        <span className="relative inline-block">
          <span className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 blur-2xl opacity-50" />
          <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400">
            infrastructure
          </span>
        </span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-16 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 rounded-full mx-auto mb-3"
      />

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="text-gray-300 text-sm md:text-base mb-5 max-w-2xl mx-auto"
      >
        Cybersécurité, protection des réseaux, sécurité télécom et conformité.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="flex flex-wrap gap-3 justify-center"
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
          <Link to="/audit-gratuit" className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-5 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all hover:shadow-xl">
            Audit gratuit <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
          <Link to="/contact" className="group border-2 border-white/30 hover:border-white px-5 py-2 rounded-xl font-semibold text-white hover:bg-white/10 transition-all text-sm">
            Contacter un expert <CheckCircle size={14} />
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="mt-8 flex justify-center"
      >
        <motion.div 
          className="animate-bounce"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-5 h-8 rounded-full border-2 border-white/30 flex justify-center">
            <div className="w-1 h-1.5 bg-white/50 rounded-full mt-1.5 animate-pulse" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  </div>

  <div className="absolute bottom-0 left-0 right-0 text-white/10">
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-8">
      <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor" />
    </svg>
  </div>
</section>
      {/* Services cybersécurité */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
              🛡️ Cybersécurité
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-syne mb-4">Cybersécurité & Protection des actifs</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {securityServices.map((service, idx) => (
              <ServiceCard key={idx} service={service} index={idx} />
            ))}
          </div>
        </div>
      </div>

      {/* Sécurité Télécom */}
      <section className="py-20 bg-white/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, rgba(59,130,246,0.1) 0%, transparent 60%)`
        }} />
        
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 0.68, 0, 1] }}
            >
              <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
                📡 Télécom
              </div>
              <h2 className="text-3xl font-bold font-syne mb-4">Sécurité Télécommunications</h2>
              <div className="w-20 h-1 bg-blue-500 rounded-full mb-6" />
              <p className="text-gray-300 mb-6">Protégez vos infrastructures voix, données et mobiles contre les cybermenaces et les fraudes.</p>
              <div className="grid grid-cols-1 gap-4">
                {telecomServices.map((item, i) => (
                  <TelecomCard key={i} item={item} index={i} />
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 0.68, 0, 1] }}
              className="relative group"
            >
              <motion.div 
                className="rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop" 
                  alt="Sécurité télécom" 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sécurité Informatique */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 0.68, 0, 1] }}
              className="order-2 md:order-1 relative group"
            >
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                <img 
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop" 
                  alt="Sécurité informatique" 
                  className="rounded-2xl border border-white/10 shadow-xl transition-transform duration-500"
                />
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 0.68, 0, 1] }}
              className="order-1 md:order-2"
            >
              <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
                💻 Informatique
              </div>
              <h2 className="text-3xl font-bold font-syne mb-4">Sécurité Informatique & Données</h2>
              <div className="w-20 h-1 bg-cyan-500 rounded-full mb-6" />
              <div className="grid grid-cols-1 gap-4">
                {itSecurityServices.map((item, i) => (
                  <TelecomCard key={i} item={item} index={i} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                variants={fadeScale}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="bg-white/10 rounded-2xl p-6 text-center backdrop-blur-sm border border-white/10 transition-all duration-300 cursor-pointer group"
              >
                <motion.div 
                  className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                >
                  <stat.icon size={22} className="text-white" />
                </motion.div>
                <div className="text-4xl font-bold text-white font-syne">{stat.value}</div>
                <div className="text-gray-400 mt-2 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Galerie d'images */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
              📷 Infrastructures
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-syne mb-4">Nos infrastructures & équipements</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {images.map((img, idx) => (
              <motion.div
                key={idx}
                variants={fadeScale}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="rounded-2xl overflow-hidden border border-white/10 shadow-xl cursor-pointer group"
              >
                <motion.img 
                  src={img} 
                  alt="Équipement sécurité" 
                  className="w-full h-48 object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions intégrées */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
              🔗 Solutions intégrées
            </div>
            <h2 className="text-3xl font-bold font-syne mb-4">Solutions intégrées : Sécurité + Télécom + IT</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto mb-8" />
            <p className="text-gray-300 mb-8">Une approche globale pour protéger l’ensemble de votre écosystème numérique.</p>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { icon: Lock, name: 'Zero Trust' },
                { icon: Network, name: 'SASE' },
                { icon: Cloud, name: 'Cloud Security' },
                { icon: Shield, name: 'SOC interne' }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="bg-white/10 rounded-xl p-4 w-40 text-center cursor-pointer transition-all duration-300 hover:bg-white/15"
                >
                  <item.icon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <span className="text-sm text-gray-300">{item.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                variants={floatVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                custom={idx}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:border-blue-500/50"
              >
                <p className="text-gray-300 italic mb-4">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <motion.img 
                    src={t.photo} 
                    alt={t.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-400"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  />
                  <div>
                    <div className="font-bold text-white">{t.name}</div>
                    <div className="text-sm text-gray-400">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi OMDEVE Sécurité */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 0.68, 0, 1] }}
            >
              <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
                🎯 Pourquoi nous
              </div>
              <h2 className="text-3xl font-bold font-syne mb-4">Pourquoi OMDEVE Sécurité ?</h2>
              <div className="w-20 h-1 bg-blue-500 rounded-full mb-6" />
              <ul className="space-y-4">
                {benefits.map((item, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5" />
                    <span className="text-gray-300">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link to="/devis" className="inline-flex items-center gap-2 mt-8 text-blue-400 hover:text-blue-300 font-semibold">
                  Demander un devis sécurité <ArrowRight size={16} />
                </Link>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 0.68, 0, 1] }}
              whileHover={{ y: -8 }}
              className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-8 border border-white/10 text-center transition-all duration-300"
            >
              <motion.div 
                className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                <Shield size={28} className="text-white" />
              </motion.div>
              <p className="text-gray-300 italic">"Grâce à OMDEVE, nous avons réduit les incidents de sécurité de 90% en 6 mois."</p>
              <p className="text-sm text-gray-400 mt-4">— Directeur Technique, Opérateur Télécom</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl md:text-3xl font-bold font-syne mb-4">Prêt à renforcer votre sécurité ?</h2>
            <p className="text-gray-300 mb-6">Audit gratuit, devis personnalisé sous 24h.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link to="/audit-gratuit" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition">
                  Audit gratuit <ArrowRight size={18} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link to="/contact" className="inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 px-6 py-3 rounded-xl font-semibold transition">
                  Contacter un expert
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Securite