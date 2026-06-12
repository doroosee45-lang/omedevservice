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


import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Server, 
  Wifi, 
  Shield, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight,
  Network,
  Zap,
  HardDrive
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
  
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-pulse-ring { animation: pulse-ring 2s ease-out infinite; }
`;

const ReseauInfrastructure = () => {
  const features = [
    { icon: Network, title: 'Architecture réseau sur mesure', desc: 'Conception et déploiement de réseaux adaptés à votre structure' },
    { icon: Shield, title: 'Sécurité avancée', desc: 'Protection contre les intrusions et filtrage de contenu' },
    { icon: Zap, title: 'Hautes performances', desc: 'Infrastructure optimisée pour la vitesse et la fiabilité' },
    { icon: HardDrive, title: 'Serveurs virtualisés', desc: 'Virtualisation et gestion centralisée de vos serveurs' },
    { icon: Wifi, title: 'Wi-Fi professionnel', desc: 'Couverture totale avec roaming et authentification' },
    { icon: TrendingUp, title: 'Évolutivité', desc: 'Solutions prêtes à grandir avec votre entreprise' }
  ]

  return (
    <>
      <style>{globalStyles}</style>
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
        <div className="absolute w-96 h-96 bg-blue-600/20 top-20 -left-20 rounded-full filter blur-[80px] animate-float" />
        <div className="absolute w-72 h-72 bg-indigo-700/15 bottom-20 right-10 rounded-full filter blur-[80px] animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-600/15 border border-blue-500/30"
            >
              <Server className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 font-semibold text-xs tracking-wide font-syne">Réseau & Infrastructure</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 font-syne"
            >
              Infrastructure{' '}
              <span className="relative inline-block">
                <span className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 blur-2xl opacity-50" />
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400">
                  Hautes Performances
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-gray-300 text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
            >
              Conception, déploiement et maintenance de réseaux d'entreprise robustes, sécurisés et évolutifs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link to="/devis" className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 transition-all hover:scale-105">
                Demander un devis <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
              </Link>
              <Link to="/contact" className="group border-2 border-white/30 hover:border-white px-8 py-4 rounded-xl font-semibold text-white hover:bg-white/10 transition-all">
                Contacter un expert
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-syne mb-4">Ce que nous vous apportons</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-blue-500/50 transition-all hover:-translate-y-1"
              >
                <feature.icon className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold font-syne mb-4">Pourquoi choisir OMDEVE ?</h2>
              <div className="w-20 h-1 bg-blue-500 rounded-full mb-6" />
              <ul className="space-y-4">
                {[
                  'Ingénieurs certifiés Cisco, MikroTik, Ubiquiti',
                  'Support technique 24/7',
                  'Audit et optimisation de votre réseau existant',
                  'Solutions hybrides (on-premise & cloud)',
                  'Contrats de maintenance adaptés'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/devis" className="inline-flex items-center gap-2 mt-8 text-blue-400 hover:text-blue-300 font-semibold">
                En savoir plus <ArrowRight size={16} />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-8 border border-white/10 text-center"
            >
              <Server className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <p className="text-gray-300 italic">
                "OMDEVE a transformé notre infrastructure obsolète en un réseau hautement performant. Notre productivité a augmenté de 40%."
              </p>
              <p className="text-sm text-gray-400 mt-4">— Directeur IT, Groupe Industriel</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl md:text-3xl font-bold font-syne mb-4">Prêt à moderniser votre infrastructure ?</h2>
            <p className="text-gray-300 mb-6">Obtenez un audit gratuit et un devis personnalisé sous 48h.</p>
            <Link to="/audit-gratuit" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition">
              Audit gratuit <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default ReseauInfrastructure


import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Computer, 
  Server, 
  Wifi, 
  HardDrive, 
  ShoppingBag, 
  CheckCircle, 
  ArrowRight,
  Truck,
  ShoppingCart,
  Camera,
  Wind,
  Mouse,
  ChevronRight,
  ChevronLeft,
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Lock,
  Headphones,
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

const VenteMateriel = () => {
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [step, setStep] = useState(1)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'RDC',
    paymentMethod: 'card'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')

  const products = [
    { id: 1, name: "Ordinateur Portable Professionnel", category: "Ordinateurs", description: "PC portable 15.6\" Intel Core i7, 16 Go RAM, SSD 512 Go", price: 899, priceFormatted: "899 €", image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=250&fit=crop", icon: Computer, gradient: "from-blue-500 to-blue-600" },
    { id: 2, name: "Climatiseur Mobile 12000 BTU", category: "Climatisation", description: "Climatiseur monobloc, mode froid/chauffage", price: 449, priceFormatted: "449 €", image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=250&fit=crop", icon: Wind, gradient: "from-cyan-500 to-cyan-600" },
    { id: 3, name: "Caméra de Surveillance 4K", category: "Sécurité", description: "Caméra IP extérieure, vision nocturne, détection mouvement", price: 129, priceFormatted: "129 €", image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=400&h=250&fit=crop", icon: Camera, gradient: "from-indigo-500 to-indigo-600" },
    { id: 4, name: "Switch Gigabit 24 ports", category: "Réseau", description: "Switch administrable, 24 ports Gigabit, PoE+", price: 349, priceFormatted: "349 €", image: "https://images.unsplash.com/photo-1611095556210-4f2e6a8b4e1a?w=400&h=250&fit=crop", icon: Wifi, gradient: "from-purple-500 to-purple-600" },
    { id: 5, name: "SSD NVMe 1 To", category: "Composants", description: "Disque SSD ultra-rapide, lecture 7000 Mo/s", price: 109, priceFormatted: "109 €", image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=250&fit=crop", icon: HardDrive, gradient: "from-blue-500 to-cyan-500" },
    { id: 6, name: "Souris & Clavier sans fil", category: "Accessoires", description: "Set ergonomique, connexion 2.4 GHz", price: 49, priceFormatted: "49 €", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=250&fit=crop", icon: Mouse, gradient: "from-emerald-500 to-emerald-600" },
    { id: 7, name: "Serveur Tour Dell PowerEdge", category: "Serveurs", description: "Intel Xeon, 32 Go RAM, 4 baies SAS", price: 1899, priceFormatted: "1 899 €", image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&h=250&fit=crop", icon: Server, gradient: "from-blue-500 to-indigo-500" },
    { id: 8, name: "Kit Caméras Wi-Fi (4 caméras)", category: "Sécurité", description: "Pack 4 caméras intérieures, vision 360°", price: 199, priceFormatted: "199 €", image: "https://images.unsplash.com/photo-1580128665081-1fbf9b8a1c3d?w=400&h=250&fit=crop", icon: Camera, gradient: "from-cyan-500 to-indigo-500" },
    { id: 9, name: "Climatiseur Réversible Gainable", category: "Climatisation", description: "Puissance 18000 BTU, silence, gain énergétique", price: 2290, priceFormatted: "2 290 €", image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=250&fit=crop", icon: Wind, gradient: "from-teal-500 to-cyan-500" }
  ]

  const features = [
    { icon: Computer, title: 'Ordinateurs & périphériques', desc: 'PC, Mac, écrans, claviers, souris', gradient: 'from-blue-500 to-blue-600' },
    { icon: Server, title: 'Serveurs & stockage', desc: 'HP, Dell, Lenovo, Synology', gradient: 'from-cyan-500 to-cyan-600' },
    { icon: Wifi, title: 'Équipements réseau', desc: 'Routeurs, switches, bornes Wi-Fi', gradient: 'from-indigo-500 to-indigo-600' },
    { icon: HardDrive, title: 'Composants & upgrades', desc: 'RAM, SSD, cartes graphiques', gradient: 'from-purple-500 to-purple-600' },
    { icon: ShoppingBag, title: 'Licences logicielles', desc: 'Microsoft, Adobe, antivirus', gradient: 'from-emerald-500 to-emerald-600' },
    { icon: Truck, title: 'Livraison rapide', desc: 'Sous 48h en France métropolitaine', gradient: 'from-amber-500 to-amber-600' }
  ]

  const totalPrice = selectedProduct ? selectedProduct.price * quantity : 0
  const totalFormatted = totalPrice.toLocaleString('fr-FR') + ' €'

  const openOrderForm = (product) => {
    setSelectedProduct(product)
    setQuantity(1)
    setStep(1)
    setShowOrderForm(true)
    setOrderComplete(false)
    setFormData({ fullName: '', email: '', phone: '', address: '', city: '', postalCode: '', country: 'RDC', paymentMethod: 'card' })
    setTimeout(() => {
      document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const closeOrderForm = () => {
    setShowOrderForm(false)
    setSelectedProduct(null)
    setStep(1)
    setOrderComplete(false)
  }

  const nextStep = () => {
    if (step === 1 && !selectedProduct) { alert('Veuillez sélectionner un produit'); return }
    if (step === 2 && quantity < 1) { alert('Quantité invalide'); return }
    setStep(step + 1)
    setTimeout(() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' }), 100)
  }

  const prevStep = () => {
    setStep(step - 1)
    setTimeout(() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' }), 100)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const submitOrder = async () => {
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    const newOrderNumber = 'CMD-' + Math.floor(Math.random() * 1000000)
    setOrderNumber(newOrderNumber)
    setOrderComplete(true)
    setIsSubmitting(false)
    console.log('Commande envoyée', { product: selectedProduct, quantity, ...formData, total: totalPrice, orderNumber: newOrderNumber })
  }

  const steps = [
    { number: 1, title: 'Produit', icon: ShoppingCart },
    { number: 2, title: 'Quantité', icon: Truck },
    { number: 3, title: 'Livraison', icon: MapPin },
    { number: 4, title: 'Paiement', icon: CreditCard },
    { number: 5, title: 'Confirmation', icon: CheckCircle }
  ]

  return (
    <>
      <style>{globalStyles}</style>

    {/* Hero Section - Vente de Matériel (500px) */}
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
        <span className="text-blue-300 font-semibold text-[10px] tracking-wide font-syne">Vente de Matériel</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 0.68, 0, 1] }}
        className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-3 font-syne"
      >
        Le matériel qu’il vous faut,{' '}
        <span className="relative inline-block">
          <span className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 blur-2xl opacity-50" />
          <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400">
            au meilleur prix
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
        Ordinateurs, climatiseurs, caméras, serveurs, accessoires... Livraison rapide et support technique inclus.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="flex flex-wrap gap-3 justify-center"
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
          <Link to="/devis" className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-5 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all hover:shadow-xl">
            Demander un devis <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
          <Link to="/contact" className="group border-2 border-white/30 hover:border-white px-5 py-2 rounded-xl font-semibold text-white hover:bg-white/10 transition-all text-sm">
            Contacter un commercial <CheckCircle size={14} />
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
      {/* Features Grid */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={floatVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                custom={idx}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:shadow-2xl hover:border-blue-500/50 hover:bg-white/10 cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:via-blue-500/5 transition-all duration-700" />
                  <motion.div 
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg mb-4`}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">{feature.title}</h3>
                  <p className="text-gray-400 text-base group-hover:text-gray-300 transition-colors">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Catalogue Produits */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
              🛒 Catalogue
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-syne mb-4">Nos meilleures ventes</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto" />
            <p className="text-gray-300 text-lg mt-4 max-w-2xl mx-auto">Découvrez notre sélection de matériel informatique, climatisation et sécurité.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <motion.div
                key={product.id}
                variants={floatVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                custom={idx}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-blue-500/50 cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <motion.img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute top-2 right-2 bg-blue-600/95 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                    {product.category}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <motion.div 
                      className={`w-8 h-8 rounded-lg bg-gradient-to-br ${product.gradient} flex items-center justify-center shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <product.icon className="w-4 h-4 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">{product.name}</h3>
                  </div>
                  <p className="text-gray-400 text-base mb-3 leading-relaxed group-hover:text-gray-300 transition-colors">{product.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-2xl font-bold text-blue-400">{product.priceFormatted}</span>
                    <motion.button 
                      onClick={() => openOrderForm(product)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-md"
                    >
                      <ShoppingCart size={16} /> Acheter
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulaire d'achat */}
      {showOrderForm && (
        <section id="order-form" className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/10">
          <div className="container mx-auto max-w-4xl px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="text-center mb-8"
            >
              <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
                📝 Commande
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-syne text-white mb-2">Formulaire d'achat</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto mb-4" />
              <p className="text-gray-300 text-lg">Commandez en quelques étapes et recevez votre matériel sous 48h.</p>
              <button onClick={closeOrderForm} className="absolute right-4 top-4 text-gray-400 hover:text-white text-2xl">✕</button>
            </motion.div>

            {/* Barre de progression */}
            <div className="flex justify-between items-center mb-8 relative">
              {steps.map((s, idx) => (
                <div key={s.number} className="flex-1 relative">
                  <div className="flex flex-col items-center">
                    <motion.div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                        step > s.number ? 'bg-emerald-500 text-white' : step === s.number ? 'bg-blue-500 text-white ring-4 ring-blue-500/30' : 'bg-white/10 text-gray-400 border border-white/20'
                      }`}
                      animate={step === s.number ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      {step > s.number ? <CheckCircle className="w-5 h-5" /> : s.number}
                    </motion.div>
                    <span className="text-xs mt-2 text-gray-400 hidden sm:block">{s.title}</span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className={`absolute top-5 left-1/2 w-full h-0.5 transition-all duration-300 ${step > s.number ? 'bg-emerald-500' : 'bg-white/20'}`} style={{ right: '-50%' }} />
                  )}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden">
                <div className="p-6 md:p-8">
                  {orderComplete ? (
                    <div className="text-center py-8">
                      <motion.div 
                        className="w-20 h-20 mx-auto bg-emerald-500/20 rounded-full flex items-center justify-center mb-6"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <CheckCircle className="w-10 h-10 text-emerald-400" />
                      </motion.div>
                      <h2 className="text-2xl font-bold font-syne text-white mb-2">Commande confirmée !</h2>
                      <p className="text-gray-300 mb-4">Votre commande a été enregistrée sous le numéro :</p>
                      <div className="text-2xl font-mono font-bold text-blue-400 bg-white/10 inline-block px-6 py-2 rounded-xl mb-6">{orderNumber}</div>
                      <p className="text-gray-300">Un email de confirmation vous a été envoyé à <strong>{formData.email}</strong>.</p>
                      <button onClick={closeOrderForm} className="mt-8 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition">Nouvelle commande</button>
                    </div>
                  ) : (
                    <>
                      {step === 1 && (
                        <div>
                          <h2 className="text-xl font-bold mb-4 text-white flex items-center"><ShoppingCart className="w-5 h-5 mr-2 text-blue-400" />Choisissez votre produit</h2>
                          <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto pr-2">
                            {products.map(prod => (
                              <motion.div 
                                key={prod.id} 
                                onClick={() => setSelectedProduct(prod)} 
                                className={`cursor-pointer p-4 rounded-xl border transition-all ${selectedProduct?.id === prod.id ? 'bg-blue-500/20 border-blue-500' : 'bg-white/5 border-white/20 hover:bg-white/10'}`}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                              >
                                <div className="flex items-center gap-4">
                                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${prod.gradient} flex items-center justify-center`}>
                                    <prod.icon className="w-5 h-5 text-white" />
                                  </div>
                                  <div className="flex-1">
                                    <h3 className="font-bold text-white">{prod.name}</h3>
                                    <p className="text-sm text-gray-400">{prod.description.substring(0, 60)}...</p>
                                  </div>
                                  <div className="text-lg font-bold text-blue-400">{prod.priceFormatted}</div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {step === 2 && selectedProduct && (
                        <div>
                          <h2 className="text-xl font-bold mb-4 text-white flex items-center"><Truck className="w-5 h-5 mr-2 text-blue-400" />Quantité souhaitée</h2>
                          <div className="bg-white/5 rounded-xl p-6">
                            <div className="flex justify-between items-center mb-4"><span className="text-gray-300">Produit :</span><span className="font-semibold text-white">{selectedProduct.name}</span></div>
                            <div className="flex justify-between items-center mb-4"><span className="text-gray-300">Prix unitaire :</span><span className="font-semibold text-blue-400">{selectedProduct.priceFormatted}</span></div>
                            <div className="flex items-center justify-between gap-4 mt-4">
                              <label className="text-gray-300">Quantité :</label>
                              <div className="flex items-center gap-3">
                                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-full bg-white/10 text-white hover:bg-white/20">-</motion.button>
                                <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="w-20 text-center bg-white/10 border border-white/20 rounded-lg py-2 text-white" />
                                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 rounded-full bg-white/10 text-white hover:bg-white/20">+</motion.button>
                              </div>
                            </div>
                            <div className="border-t border-white/20 mt-6 pt-4 flex justify-between">
                              <span className="text-lg font-bold text-white">Total :</span>
                              <span className="text-2xl font-bold text-blue-400">{totalFormatted}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {step === 3 && (
                        <div>
                          <h2 className="text-xl font-bold mb-4 text-white flex items-center"><MapPin className="w-5 h-5 mr-2 text-blue-400" />Adresse de livraison</h2>
                          <div className="space-y-4">
                            <div><label className="block text-sm text-gray-300 mb-1">Nom complet *</label><input value={formData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white" placeholder="Jean Dupont" /></div>
                            <div><label className="block text-sm text-gray-300 mb-1">Email *</label><input type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white" placeholder="contact@exemple.com" /></div>
                            <div><label className="block text-sm text-gray-300 mb-1">Téléphone *</label><input value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white" placeholder="+243 XXX XXX XXX" /></div>
                            <div><label className="block text-sm text-gray-300 mb-1">Adresse *</label><input value={formData.address} onChange={(e) => handleInputChange('address', e.target.value)} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white" placeholder="Numéro et rue" /></div>
                            <div className="grid grid-cols-2 gap-4"><div><label className="block text-sm text-gray-300 mb-1">Ville *</label><input value={formData.city} onChange={(e) => handleInputChange('city', e.target.value)} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white" /></div><div><label className="block text-sm text-gray-300 mb-1">Code postal *</label><input value={formData.postalCode} onChange={(e) => handleInputChange('postalCode', e.target.value)} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white" /></div></div>
                            <div><label className="block text-sm text-gray-300 mb-1">Pays</label><input value={formData.country} onChange={(e) => handleInputChange('country', e.target.value)} className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white" /></div>
                          </div>
                        </div>
                      )}

                      {step === 4 && (
                        <div>
                          <h2 className="text-xl font-bold mb-4 text-white flex items-center"><CreditCard className="w-5 h-5 mr-2 text-blue-400" />Mode de paiement</h2>
                          <div className="space-y-4">
                            <div className="flex gap-4 flex-wrap">
                              {['card', 'mobile', 'bank'].map(method => (
                                <label key={method} className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full cursor-pointer hover:bg-white/20 transition">
                                  <input type="radio" name="paymentMethod" value={method} checked={formData.paymentMethod === method} onChange={() => handleInputChange('paymentMethod', method)} /> 
                                  {method === 'card' ? 'Carte bancaire' : method === 'mobile' ? 'Mobile Money' : 'Virement bancaire'}
                                </label>
                              ))}
                            </div>
                            {formData.paymentMethod === 'card' && (
                              <div className="bg-white/5 p-4 rounded-xl mt-4">
                                <div className="flex items-center gap-2 mb-3"><Lock className="w-4 h-4 text-blue-400" /><span className="text-sm">Paiement sécurisé</span></div>
                                <div><input type="text" placeholder="Numéro de carte" className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white mb-2" /></div>
                                <div className="grid grid-cols-2 gap-2"><input type="text" placeholder="MM/AA" className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white" /><input type="text" placeholder="CVV" className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white" /></div>
                                <p className="text-xs text-gray-400 mt-2">Simulation de paiement - Aucune carte n'est débitée</p>
                              </div>
                            )}
                            {formData.paymentMethod === 'mobile' && (
                              <div className="bg-white/5 p-4 rounded-xl mt-4"><input type="text" placeholder="Numéro de téléphone (M-Pesa, Airtel Money)" className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white" /><p className="text-xs text-gray-400 mt-2">Vous recevrez une demande de paiement sur votre téléphone.</p></div>
                            )}
                            {formData.paymentMethod === 'bank' && (
                              <div className="bg-white/5 p-4 rounded-xl mt-4"><p className="text-sm">IBAN : OMDEVE******<br />Vous recevrez les coordonnées bancaires complètes par email.</p></div>
                            )}
                            <div className="border-t border-white/20 pt-4 mt-4 flex justify-between">
                              <span className="font-bold text-white">Total à payer :</span>
                              <span className="text-2xl font-bold text-blue-400">{totalFormatted}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {step === 5 && selectedProduct && (
                        <div>
                          <h2 className="text-xl font-bold mb-4 text-white flex items-center"><CheckCircle className="w-5 h-5 mr-2 text-blue-400" />Confirmation de commande</h2>
                          <div className="bg-white/5 rounded-xl p-5 space-y-3">
                            <div className="flex justify-between"><span className="text-gray-300">Produit :</span><span className="font-semibold text-white">{selectedProduct.name}</span></div>
                            <div className="flex justify-between"><span className="text-gray-300">Quantité :</span><span className="font-semibold text-white">{quantity}</span></div>
                            <div className="flex justify-between"><span className="text-gray-300">Prix unitaire :</span><span className="font-semibold text-white">{selectedProduct.priceFormatted}</span></div>
                            <div className="flex justify-between"><span className="text-gray-300">Total :</span><span className="text-xl font-bold text-blue-400">{totalFormatted}</span></div>
                            <div className="border-t border-white/20 my-3"></div>
                            <div><span className="text-gray-300">Livraison :</span> <span className="text-white">{formData.address}, {formData.city}</span></div>
                            <div><span className="text-gray-300">Contact :</span> <span className="text-white">{formData.fullName} - {formData.email}</span></div>
                            <div><span className="text-gray-300">Paiement :</span> <span className="text-white">{formData.paymentMethod === 'card' ? 'Carte bancaire' : formData.paymentMethod === 'mobile' ? 'Mobile Money' : 'Virement bancaire'}</span></div>
                          </div>
                          <p className="text-sm text-gray-400 mt-4 text-center">En cliquant sur "Confirmer", vous acceptez nos conditions générales de vente.</p>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {!orderComplete && (
                  <div className="px-6 md:px-8 py-4 bg-white/5 border-t border-white/20 flex justify-between">
                    {step > 1 && <button onClick={prevStep} className="flex items-center px-4 py-2 border border-white/20 rounded-xl text-white hover:bg-white/10 transition"><ChevronLeft size={16} className="mr-1" /> Précédent</button>}
                    {step < 5 && <button onClick={nextStep} className="flex items-center px-5 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-xl font-semibold ml-auto transition">Suivant <ChevronRight size={16} className="ml-1" /></button>}
                    {step === 5 && <button onClick={submitOrder} disabled={isSubmitting} className="flex items-center px-6 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold ml-auto transition disabled:opacity-50">{isSubmitting ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div> : 'Confirmer'} <CheckCircle size={16} className="ml-1" /></button>}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      )}

      {/* Partenaires officiels */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
              🤝 Partenaires
            </div>
            <h2 className="text-3xl font-bold font-syne text-white mb-4">Partenaires officiels</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto mb-8" />
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {['HP', 'Dell', 'Lenovo', 'Cisco', 'Microsoft', 'Synology', 'Mitsubishi', 'Hikvision'].map((brand, idx) => (
                <motion.span 
                  key={brand} 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-4 py-2 bg-white/20 rounded-full text-sm font-semibold text-white shadow-sm cursor-pointer transition-all hover:bg-white/30"
                >
                  {brand}
                </motion.span>
              ))}
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-md">
                Contacter un commercial <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default VenteMateriel


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

const Inscription = () => {
  const [formData, setFormData] = useState({
    nom: '', email: '', telephone: '', formation: '',
    centre: '', disponibilite: '', financement: '', message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

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

  const fields     = ['nom','email','telephone','formation','centre','disponibilite','financement']
  const filled     = fields.filter(k => formData[k]).length
  const pct        = Math.round((filled / fields.length) * 100)

  return (
    <>
      <style>{globalStyles}</style>

      {/* Hero Section - style Contact (bleu) */}
      <section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
        <motion.div 
          className="absolute w-96 h-96 bg-blue-600/20 top-20 -left-20 rounded-full filter blur-[80px]"
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute w-72 h-72 bg-indigo-700/15 bottom-20 right-10 rounded-full filter blur-[80px]"
          animate={{ x: [0, -15, 0], y: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className="absolute w-48 h-48 bg-cyan-500/10 top-1/2 left-1/2 -translate-x-1/2 rounded-full filter blur-[80px]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-600/15 border border-blue-500/30"
            >
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-ring" />
              <span className="text-blue-300 font-semibold text-xs tracking-wide font-syne">Formulaire d'inscription</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 0.68, 0, 1] }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 font-syne"
            >
              Rejoignez{' '}
              <span className="relative inline-block">
                <span className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 blur-2xl opacity-50" />
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400">
                  nos formations
                </span>
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-24 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 rounded-full mx-auto mb-6"
            />

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-gray-300 text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
            >
              Remplissez le formulaire ci-dessous. Un conseiller vous recontactera
              sous <strong className="text-white">24h</strong> pour valider votre inscription.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-16 flex justify-center"
            >
              <motion.div 
                className="animate-bounce"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center">
                  <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-pulse" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 text-white/10">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* Formulaire d'inscription */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/10 shadow-2xl"
          >
            {/* Barre de progression */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold tracking-wider uppercase text-blue-300">Progression</span>
                <span className="text-xs font-bold text-blue-400">{pct}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/20 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            {submitted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-12"
              >
                <motion.div 
                  className="w-20 h-20 mx-auto bg-emerald-500/20 rounded-full flex items-center justify-center mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <CheckCircle className="w-10 h-10 text-emerald-400" />
                </motion.div>
                <h3 className="text-2xl font-bold font-syne text-white mb-3">
                  Inscription envoyée !
                </h3>
                <p className="text-gray-300 text-sm mb-8 max-w-xs mx-auto leading-relaxed">
                  Merci, notre équipe vous recontactera dans les plus brefs délais.
                </p>
                <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Link to="/formation"
                    className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
                    Retour aux formations <ArrowRight size={15} />
                  </Link>
                </motion.div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                      <User size={13} className="text-blue-400" /> Nom complet *
                    </label>
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
                      placeholder="Jean Dupont"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                      <Mail size={13} className="text-blue-400" /> Email professionnel *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
                      placeholder="jean@entreprise.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                      <Phone size={13} className="text-blue-400" /> Téléphone *
                    </label>
                    <input
                      type="tel"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                      <GraduationCap size={13} className="text-blue-400" /> Formation souhaitée *
                    </label>
                    <select
                      name="formation"
                      value={formData.formation}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
                    >
                      <option value="">Sélectionnez une formation</option>
                      {formationsList.map(f => <option key={f}>{f}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                      <MapPin size={13} className="text-blue-400" /> Centre de formation *
                    </label>
                    <select
                      name="centre"
                      value={formData.centre}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
                    >
                      <option value="">Choisissez un centre</option>
                      {centresList.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                      <Calendar size={13} className="text-blue-400" /> Disponibilité *
                    </label>
                    <select
                      name="disponibilite"
                      value={formData.disponibilite}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
                    >
                      <option value="">Choisissez une période</option>
                      {disponibilitesList.map(d => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                    <DollarSign size={13} className="text-blue-400" /> Mode de financement *
                  </label>
                  <select
                    name="financement"
                    value={formData.financement}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
                  >
                    <option value="">Sélectionnez un mode de financement</option>
                    {financementsList.map(f => <option key={f}>{f}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                    <MessageSquare size={13} className="text-blue-400" /> Message complémentaire
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all resize-y"
                    placeholder="Informations supplémentaires, besoins spécifiques…"
                  />
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative w-full rounded-xl py-4 text-sm font-semibold text-white flex items-center justify-center gap-2.5 overflow-hidden transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 shadow-lg"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Envoi en cours…
                    </>
                  ) : (
                    <>
                      Envoyer ma demande d'inscription
                      <Send size={15} />
                    </>
                  )}
                </motion.button>

                <p className="text-center text-xs text-gray-500 leading-relaxed">
                  En soumettant ce formulaire, vous acceptez que vos données soient traitées pour vous recontacter.<br/>
                  Conformément au RGPD, vous disposez d'un droit d'accès et de suppression.
                </p>
              </form>
            )}
          </motion.div>

          {/* Lien retour */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <motion.div whileHover={{ x: -5 }} transition={{ duration: 0.2 }}>
              <Link to="/formation"
                className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-400 transition-colors duration-200">
                <ArrowLeft size={14} />
                Retour aux formations
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Inscription


import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  GraduationCap,
  Users,
  BookOpen,
  Award,
  Clock,
  CheckCircle,
  ArrowRight,
  Calendar,
  Star,
  Quote,
  Shield,
  Cloud,
  Code,
  MapPin,
  Phone,
  Mail
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

const Formation = () => {
  // Cartes formation avec images
  const formationCards = [
    {
      title: "Réseaux & Infrastructure",
      desc: "Cisco, MikroTik, conception et dépannage avancé",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
      icon: BookOpen,
      gradient: "from-blue-500 to-blue-600"
    },
    {
      title: "Cybersécurité",
      desc: "Protection des données, pare-feu, sensibilisation",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop",
      icon: Shield,
      gradient: "from-cyan-500 to-cyan-600"
    },
    {
      title: "Cloud & Virtualisation",
      desc: "AWS, Azure, VMware, Docker",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
      icon: Cloud,
      gradient: "from-indigo-500 to-indigo-600"
    },
    {
      title: "Développement DevOps",
      desc: "CI/CD, Git, Python, automatisation",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
      icon: Code,
      gradient: "from-purple-500 to-purple-600"
    },
    {
      title: "Soft skills IT",
      desc: "Gestion de projet agile, leadership technique",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
      icon: Users,
      gradient: "from-emerald-500 to-emerald-600"
    },
    {
      title: "Préparation certifications",
      desc: "CCNA, Security+, Cloud Practitioner",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop",
      icon: Award,
      gradient: "from-amber-500 to-amber-600"
    }
  ]

  // Formations accélérées
  const acceleratedTrainings = [
    { title: "Bootcamp Réseaux (5 jours)", duration: "40h", price: "1 490€ HT", start: "14 avril 2025", spots: 8, gradient: "from-blue-500 to-blue-600" },
    { title: "Cybersécurité intensive", duration: "35h", price: "1 790€ HT", start: "5 mai 2025", spots: 6, gradient: "from-cyan-500 to-cyan-600" },
    { title: "DevOps en 4 jours", duration: "32h", price: "1 590€ HT", start: "2 juin 2025", spots: 10, gradient: "from-indigo-500 to-indigo-600" }
  ]

  // Témoignages
  const testimonials = [
    {
      name: "Sophie Martin",
      role: "Responsable Infrastructure",
      company: "Groupe Logistique France",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      quote: "La formation Réseaux a complètement monté en compétence mon équipe. Les cas pratiques sur du vrai matériel ont fait la différence.",
      rating: 5
    },
    {
      name: "Thomas Lefebvre",
      role: "Admin Sys",
      company: "Digital Solutions",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      quote: "Formation Cybersécurité très concrète. Le formateur est un expert du terrain, je recommande vivement.",
      rating: 5
    },
    {
      name: "Amel Benali",
      role: "DevOps Engineer",
      company: "Startup Innov",
      photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop",
      quote: "Le bootcamp DevOps m'a permis d'être opérationnelle en moins d'une semaine. Un vrai accélérateur de carrière.",
      rating: 5
    }
  ]

  // Statistiques
  const stats = [
    { value: "1 200+", label: "Élèves formés", icon: Users, gradient: "from-blue-500 to-cyan-500" },
    { value: "98%", label: "Taux de satisfaction", icon: Star, gradient: "from-amber-500 to-orange-500" },
    { value: "45+", label: "Sessions par an", icon: Calendar, gradient: "from-emerald-500 to-teal-500" },
    { value: "15", label: "Formateurs experts", icon: Award, gradient: "from-purple-500 to-pink-500" }
  ]

  // Centres de formation
  const centers = [
    { city: "Paris", address: "123 avenue des Champs-Élysées, 75008", phone: "+33 1 23 45 67 89", email: "paris@omdeve.com", gradient: "from-blue-500 to-cyan-500" },
    { city: "Lyon", address: "45 rue de la République, 69002", phone: "+33 4 56 78 90 12", email: "lyon@omdeve.com", gradient: "from-indigo-500 to-purple-500" },
    { city: "Bordeaux", address: "78 cours de l'Intendance, 33000", phone: "+33 5 67 89 01 23", email: "bordeaux@omdeve.com", gradient: "from-cyan-500 to-blue-500" }
  ]

  return (
    <>
      <style>{globalStyles}</style>

      {/* Hero Section - style VenteMateriel (bleu) */}
      {/* Hero Section - Formation IT (500px) */}
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
        <span className="text-blue-300 font-semibold text-[10px] tracking-wide font-syne">Formation IT professionnelle</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 0.68, 0, 1] }}
        className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-3 font-syne"
      >
        Montez en compétences{' '}
        <span className="relative inline-block">
          <span className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 blur-2xl opacity-50" />
          <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400">
            avec nos experts
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
        Formations techniques et soft skills, en présentiel ou à distance, pour vos équipes IT.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="flex flex-wrap gap-3 justify-center"
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
          <Link to="/devis" className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-5 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all hover:shadow-xl">
            Demander un catalogue <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
          <Link to="/contact" className="group border-2 border-white/30 hover:border-white px-5 py-2 rounded-xl font-semibold text-white hover:bg-white/10 transition-all text-sm">
            Parler à un conseiller
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

      {/* Nos formations - Cartes avec images */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
              📚 Nos formations
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-syne mb-4">Nos formations</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {formationCards.map((card, idx) => (
              <motion.div
                key={idx}
                variants={floatVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                custom={idx}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-500 cursor-pointer group"
              >
                <div className="relative overflow-hidden">
                  <motion.img 
                    src={card.image} 
                    alt={card.title} 
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-6">
                  <motion.div 
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-3 shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <card.icon className="w-5 h-5 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">{card.title}</h3>
                  <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors">{card.desc}</p>
                  <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Link to="/inscription" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold">
                      S'inscrire <ArrowRight size={16} />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistiques élèves formés */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
              📊 Chiffres clés
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-syne mb-4">Nos élèves en chiffres</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                  className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                >
                  <stat.icon size={22} className="text-white" />
                </motion.div>
                <div className="text-4xl font-bold text-white font-syne">{stat.value}</div>
                <div className="text-gray-400 mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Formations accélérées + image */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 0.68, 0, 1] }}
            >
              <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
                ⚡ Accéléré
              </div>
              <h2 className="text-3xl font-bold font-syne mb-4">Formations accélérées</h2>
              <div className="w-20 h-1 bg-cyan-500 rounded-full mb-6" />
              <p className="text-gray-300 mb-6">
                Des bootcamps intensifs de 2 à 5 jours pour monter en compétences rapidement. 
                Travaux pratiques sur cas réels, formateurs experts et petit groupe.
              </p>
              <div className="space-y-4">
                {acceleratedTrainings.map((training, i) => (
                  <motion.div 
                    key={i} 
                    className="bg-white/10 rounded-xl p-4 flex flex-wrap justify-between items-center gap-3 group cursor-pointer"
                    whileHover={{ scale: 1.02, x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div>
                      <h4 className="font-bold text-white group-hover:text-blue-300 transition-colors">{training.title}</h4>
                      <div className="flex gap-3 text-sm text-gray-400">
                        <span className="flex items-center gap-1"><Clock size={14}/> {training.duration}</span>
                        <span className="flex items-center gap-1"><Calendar size={14}/> {training.start}</span>
                        <span>{training.spots} places</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-blue-300 font-bold">{training.price}</span>
                      <motion.div whileHover={{ x: 5 }}>
                        <Link to="/inscription" className="text-blue-400 hover:text-blue-300">
                          <ArrowRight size={18} />
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link to="/formations-accelerees" className="inline-flex items-center gap-2 mt-8 text-blue-400 hover:text-blue-300 font-semibold">
                  Voir toutes nos sessions <ArrowRight size={16} />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 0.68, 0, 1] }}
              className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 group"
            >
              <motion.img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop" 
                alt="Session de formation en présentiel"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
              🗣️ Témoignages
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-syne mb-4">Ils ont suivi nos formations</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
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
                <Quote className="w-10 h-10 text-blue-400/50 mb-4" />
                <motion.p 
                  className="text-gray-300 italic mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  "{t.quote}"
                </motion.p>
                <div className="flex items-center gap-4">
                  <motion.img 
                    src={t.photo} 
                    alt={t.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-400"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  />
                  <div>
                    <div className="font-bold text-white">{t.name}</div>
                    <div className="text-sm text-gray-400">{t.role}, {t.company}</div>
                    <div className="flex gap-1 mt-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA double : inscription centre + catalogue */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              whileHover={{ y: -8 }}
              className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl p-8 text-center border border-white/10 hover:border-blue-500/50 transition-all duration-300"
            >
              <motion.div 
                className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <GraduationCap className="w-6 h-6 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-2">Inscription en centre</h3>
              <p className="text-gray-300 mb-6">Rejoignez nos sessions en présentiel à Paris, Lyon ou Bordeaux.</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link to="/inscription" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition">
                  Je m'inscris <ArrowRight size={18} />
                </Link>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -8 }}
              className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-8 text-center border border-white/10 hover:border-purple-500/50 transition-all duration-300"
            >
              <motion.div 
                className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <BookOpen className="w-6 h-6 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-2">Catalogue complet</h3>
              <p className="text-gray-300 mb-6">Recevez toutes nos formations par email.</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link to="/devis" className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl font-semibold transition">
                  Télécharger <ArrowRight size={18} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Localisation des centres */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
              📍 Nous trouver
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-syne mb-4">Nos centres de formation</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto" />
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {centers.map((center, idx) => (
              <motion.div
                key={idx}
                variants={floatVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                custom={idx}
                className="bg-white/10 rounded-2xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300"
              >
                <motion.div 
                  className={`w-12 h-12 mb-3 rounded-xl bg-gradient-to-br ${center.gradient} flex items-center justify-center shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <MapPin className="w-6 h-6 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-white">{center.city}</h3>
                <p className="text-gray-400 text-sm mt-2">{center.address}</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-300 group cursor-pointer">
                    <Phone size={14} className="text-blue-400 group-hover:text-blue-300 transition-colors" /> 
                    <span className="group-hover:text-white transition-colors">{center.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300 group cursor-pointer">
                    <Mail size={14} className="text-blue-400 group-hover:text-blue-300 transition-colors" /> 
                    <span className="group-hover:text-white transition-colors">{center.email}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Carte Google Maps */}
          <motion.div 
            className="mt-12 rounded-2xl overflow-hidden border border-white/10 shadow-xl group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <iframe
              title="Carte des centres OMDEVE"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.991440608414!2d2.292292615509614!3d48.85837360869918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1647863945678!5m2!1sfr!2sfr"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="grayscale group-hover:grayscale-0 transition-all duration-700"
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* Call to Action final */}
      <section className="py-20 bg-white/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, rgba(59,130,246,0.2) 0%, transparent 60%)`
        }} />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6 text-amber-300 text-sm font-semibold">
              🚀 Besoin d'un service personnalisé ?
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-syne">Prêt à faire évoluer vos compétences ?</h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Recevez notre catalogue complet et un devis personnalisé sous 24h.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link to="/devis" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition">
                  Devis gratuit <ArrowRight size={18} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link to="/contact" className="inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 px-6 py-3 rounded-xl font-semibold transition">
                  Contacter un expert
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Formation


import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Sun,
  Wind,
  Battery,
  Thermometer,
  Laptop,
  Smartphone,
  Home,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Zap,
  Shield,
  Users,
  Star,
  Calendar,
  Award,
  DollarSign,
  Clock,
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
  
  @keyframes glow-pulse {
    0%, 100% { box-shadow: 0 0 5px rgba(59,130,246,0.3); }
    50% { box-shadow: 0 0 20px rgba(59,130,246,0.6); }
  }
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-pulse-ring { animation: pulse-ring 2s ease-out infinite; }
  .glow-pulse { animation: glow-pulse 2s ease-in-out infinite; }
  .shimmer {
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
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

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};

const floatVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: [0.22, 0.68, 0, 1]
    }
  },
  hover: {
    y: -8,
    transition: { duration: 0.3, ease: [0.22, 0.68, 0, 1] }
  }
};

// Services Énergie
const energyServices = [
  { icon: Sun, title: 'Panneaux photovoltaïques', desc: 'Étude, installation et maintenance de centrales solaires pour particuliers et entreprises.', gradient: 'from-blue-500 to-blue-600', price: 'Sur devis' },
  { icon: Thermometer, title: 'Climatisation (split system)', desc: 'Installation, réparation et entretien de climatiseurs réversibles.', gradient: 'from-cyan-500 to-cyan-600', price: 'Sur devis' },
  { icon: TrendingUp, title: 'Audit énergétique', desc: 'Diagnostic complet de votre consommation et optimisation des coûts.', gradient: 'from-blue-500 to-cyan-500', price: 'Gratuit' },
  { icon: Battery, title: 'Stockage d’énergie', desc: 'Batteries domestiques et industrielles pour autoconsommation.', gradient: 'from-indigo-500 to-blue-500', price: 'Sur devis' }
]

// Vente de matériel avec couleurs
const equipmentSales = [
  { icon: Laptop, title: 'Ordinateurs professionnels', desc: 'PC, Mac, laptops haute performance – marques certifiées.', color: 'from-blue-500 to-blue-600', bgHover: 'hover:border-blue-500/70 hover:bg-blue-500/10' },
  { icon: Smartphone, title: 'Smartphones & tablettes', desc: 'iPhone, Samsung, Huawei – neuf et reconditionné.', color: 'from-cyan-500 to-cyan-600', bgHover: 'hover:border-cyan-500/70 hover:bg-cyan-500/10' },
  { icon: Thermometer, title: 'Climatiseurs', desc: 'Split, mural, gainable – toutes marques.', color: 'from-blue-500 to-indigo-500', bgHover: 'hover:border-blue-500/70 hover:bg-blue-500/10' },
  { icon: Sun, title: 'Panneaux solaires', desc: 'Monocristallins, polycristallins, kits complets.', color: 'from-sky-500 to-blue-500', bgHover: 'hover:border-sky-500/70 hover:bg-sky-500/10' }
]

// Statistiques
const stats = [
  { value: '200+', label: 'Installations solaires', icon: Sun, color: 'blue' },
  { value: '150+', label: 'Climatisations posées', icon: Thermometer, color: 'cyan' },
  { value: '98%', label: 'Clients satisfaits', icon: Star, color: 'amber' },
  { value: '24/7', label: 'Support technique', icon: Clock, color: 'blue' }
]

// Témoignages
const testimonials = [
  {
    name: 'Jean-Paul M.',
    role: 'Propriétaire, Maison individuelle',
    quote: 'OMDEVE a installé 12 panneaux solaires chez moi. En un an, j’ai réduit ma facture d’électricité de 60%.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
  },
  {
    name: 'Catherine D.',
    role: 'Directrice, Hôtel 3 étoiles',
    quote: 'Ils ont remplacé toute notre climatisation en 3 jours, avec un suivi impeccable.',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
  }
]

// Avantages
const benefits = [
  'Installateurs certifiés RGE (Reconnu Garant de l’Environnement)',
  'Matériel de marques premium (LG, Daikin, SunPower)',
  'Suivi de chantier et garantie décennale',
  'Aide au montage des dossiers de subventions',
  'Service après-vente réactif'
]

// Images pour galerie
const galleryImages = [
  'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=500&fit=crop'
]

const ServiceCard = ({ service, index }) => {
  return (
    <motion.div
      custom={index}
      variants={floatVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-50px" }}
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
          className={`text-xs font-semibold ${service.price === 'Gratuit' ? 'text-amber-400 bg-amber-500/10' : 'text-blue-400 bg-blue-500/10'} px-3 py-1 rounded-full`}
          whileHover={{ scale: 1.05 }}
        >
          {service.price}
        </motion.span>
      </div>
      <h3 className="text-xl font-bold text-white mb-2 font-syne group-hover:text-blue-300 transition-colors">
        {service.title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-5 group-hover:text-gray-300 transition-colors">
        {service.desc}
      </p>
      <motion.div
        whileHover={{ x: 5 }}
        transition={{ duration: 0.2 }}
      >
        <Link
          to="/demander-devis"
          className="inline-flex items-center gap-2 text-blue-400 text-sm font-semibold group-hover:text-blue-300 transition-all"
        >
          Demander un devis <ArrowRight size={14} />
        </Link>
      </motion.div>
    </motion.div>
  )
}

const EquipmentCard = ({ item, index }) => {
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

const EnergieEquipements = () => {
  return (
    <>
      <style>{globalStyles}</style>

     {/* Hero Section - Énergie & Équipements (500px) */}
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
        <span className="text-blue-300 font-semibold text-[10px] tracking-wide font-syne">Énergie & Équipements</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 0.68, 0, 1] }}
        className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-3 font-syne"
      >
        Solutions énergétiques{' '}
        <span className="relative inline-block">
          <span className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 blur-2xl opacity-50" />
          <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400">
            durables
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
        Panneaux solaires, climatisation, audit énergétique et vente de matériel high-tech.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="flex flex-wrap gap-3 justify-center"
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
          <Link to="/audit-gratuit" className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-5 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all hover:shadow-xl">
            Audit énergétique gratuit <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
          <Link to="/contact" className="group border-2 border-white/30 hover:border-white px-5 py-2 rounded-xl font-semibold text-white hover:bg-white/10 transition-all text-sm">
            Demander un devis <CheckCircle size={14} />
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




      

      {/* Services Énergie */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
              ⚡ Services
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-syne mb-4">Nos prestations énergétiques</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {energyServices.map((service, idx) => (
              <ServiceCard key={idx} service={service} index={idx} />
            ))}
          </div>
        </div>
      </div>

      {/* Vente de matériel avec effets améliorés */}
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
                🛒 Matériel
              </div>
              <h2 className="text-3xl font-bold font-syne mb-4">Vente de matériel</h2>
              <div className="w-20 h-1 bg-blue-500 rounded-full mb-6" />
              <p className="text-gray-300 mb-6">
                Équipez votre entreprise ou votre foyer avec du matériel neuf ou reconditionné, garanti 1 an.
              </p>
              <div className="grid grid-cols-1 gap-4">
                {equipmentSales.map((item, i) => (
                  <EquipmentCard key={i} item={item} index={i} />
                ))}
              </div>
              <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link to="/devis" className="inline-flex items-center gap-2 mt-8 text-blue-400 hover:text-blue-300 font-semibold group">
                  Commander du matériel <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
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
                  src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&h=600&fit=crop" 
                  alt="Matériel informatique" 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
              <motion.div 
                className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500"
                initial={{ y: 20, scale: 0 }}
                whileHover={{ scale: 1.1, rotate: 90 }}
              >
                <Zap size={20} className="text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Audit énergétique & optimisation */}
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
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=600&fit=crop" 
                  alt="Audit énergétique" 
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
                📊 Diagnostic
              </div>
              <h2 className="text-3xl font-bold font-syne mb-4">Audit énergétique et optimisation</h2>
              <div className="w-20 h-1 bg-cyan-500 rounded-full mb-6" />
              <ul className="space-y-4">
                {[
                  'Analyse complète de vos consommations',
                  'Détection des fuites et gaspillages',
                  'Recommandations sur mesure (isolation, équipements)',
                  'Simulation de rentabilité pour panneaux solaires',
                  'Accompagnement aux aides financières (MaPrimeRénov, CEE)'
                ].map((item, i) => (
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
                <Link to="/audit-gratuit" className="inline-flex items-center gap-2 mt-8 text-blue-400 hover:text-blue-300 font-semibold group">
                  Bénéficier d’un audit gratuit <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
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

      {/* Galerie d'installations */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
              📷 Portfolio
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-syne mb-4">Nos réalisations</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryImages.map((img, idx) => (
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
                  alt="Installation énergie" 
                  className="w-full h-48 object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
              🗣️ Témoignages
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-syne mb-4">Ils nous font confiance</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto" />
          </motion.div>
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
                <motion.p 
                  className="text-gray-300 italic mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  "{t.quote}"
                </motion.p>
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

      {/* Pourquoi OMDEVE Énergie */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
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
              <h2 className="text-3xl font-bold font-syne mb-4">Pourquoi OMDEVE Énergie ?</h2>
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
                <Link to="/devis" className="inline-flex items-center gap-2 mt-8 text-blue-400 hover:text-blue-300 font-semibold group">
                  Demander un devis personnalisé <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
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
                <Sun size={28} className="text-white" />
              </motion.div>
              <p className="text-gray-300 italic">"Économisez jusqu’à 70% sur votre facture d’électricité avec nos solutions solaires."</p>
              <p className="text-sm text-gray-400 mt-4">— Étude de cas, Client résidentiel</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA double - style Contact */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/5">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, rgba(59,130,246,0.3) 0%, transparent 60%),
                            radial-gradient(circle at 80% 70%, rgba(6,182,212,0.2) 0%, transparent 60%)`
        }} />
        <motion.div 
          className="absolute w-96 h-96 bg-blue-600/20 top-20 left-1/4 rounded-full filter blur-[100px]"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute w-72 h-72 bg-cyan-500/10 bottom-10 right-1/3 rounded-full filter blur-[80px]"
          animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Carte 1 : Assistance */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              whileHover={{ y: -10 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/50"
            >
              <div className="relative z-10 text-center">
                <motion.div 
                  className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                >
                  <Headphones size={28} className="text-white" />
                </motion.div>
                <h3 className="text-2xl md:text-3xl font-bold text-white font-syne mb-3">Assistance immédiate</h3>
                <p className="text-gray-300 mb-6">
                  Notre support technique est disponible <strong className="text-blue-400">24h/24 et 7j/7</strong> pour répondre à vos urgences.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <motion.a
                    href="tel:+24355550359"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl font-semibold transition-all"
                  >
                    <Phone size={16} /> Appeler maintenant
                  </motion.a>
                  <motion.a
                    href="https://wa.me/24355550359"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all"
                  >
                    <MessageCircle size={16} /> WhatsApp
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Carte 2 : Devis */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/50"
            >
              <div className="relative z-10 text-center">
                <motion.div 
                  className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                >
                  <Rocket size={28} className="text-white" />
                </motion.div>
                <h3 className="text-2xl md:text-3xl font-bold text-white font-syne mb-3">Un projet sur mesure ?</h3>
                <p className="text-gray-300 mb-6">
                  Étudions ensemble votre besoin et obtenez un <strong className="text-amber-400">devis personnalisé</strong> sans engagement.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-all group"
                  >
                    Demander un devis <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  )
}

export default EnergieEquipements



import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Send, CheckCircle, ChevronLeft } from 'lucide-react'

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: #0d1b2a;
    color: #e2e8f0;
    overflow-x: hidden;
  }

  .fc-badge-dot {
    width: 6px; height: 6px;
    background: #22d3ee;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  .fc-input, .fc-select, .fc-textarea {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    padding: 11px 14px;
    color: #e2e8f0;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 400;
    transition: border-color 0.2s, background 0.2s;
    width: 100%;
    outline: none;
  }
  .fc-input:focus, .fc-select:focus, .fc-textarea:focus {
    border-color: rgba(34,211,238,0.5);
    background: rgba(34,211,238,0.04);
  }
  .fc-input::placeholder, .fc-textarea::placeholder { color: #475569; }

  .fc-select {
    appearance: none;
    cursor: pointer;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2367e8f9' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    padding-right: 36px;
    background-color: rgba(255,255,255,0.03);
  }
  .fc-select option { background: #0d1b2a; color: #e2e8f0; }

  .fc-textarea { resize: vertical; min-height: 110px; line-height: 1.6; }

  .fc-input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(0.6) sepia(1) hue-rotate(160deg);
    cursor: pointer;
  }
`

const SERVICES = [
  'Hébergement cloud scalable (AWS/Azure/GCP)',
  'Serveurs dédiés & VPS',
  'Sécurité & sauvegarde cloud',
  'Migration assistée vers le cloud',
  'Pack Start (49€/mois)',
  'Pack Business (129€/mois)',
  'Pack Enterprise (Sur devis)',
  'Solution personnalisée',
]

const BUDGETS = [
  'Moins de 500€ / mois',
  '500€ – 1 000€ / mois',
  '1 000€ – 5 000€ / mois',
  '5 000€ – 10 000€ / mois',
  'Plus de 10 000€ / mois',
  'Je ne sais pas encore',
]

const TYPES_PROJET = [
  'Migration complète',
  'Nouvelle infrastructure',
  'Optimisation des coûts',
  'Sécurité & conformité',
  'Autre',
]

const EMPTY_FORM = {
  nom: '', email: '', telephone: '', entreprise: '',
  service: '', budget: '', dateSouhaitee: '', typeProjet: '', message: '',
}

/* ─── Sous-composants ─────────────────────────────────────── */

const SectionTitle = ({ children }) => (
  <div style={{
    fontFamily: "'Syne', sans-serif",
    fontSize: 11,
    fontWeight: 600,
    color: '#22d3ee',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    marginBottom: '1.25rem',
    paddingBottom: '0.75rem',
    borderBottom: '1px solid rgba(6,182,212,0.15)',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  }}>
    <span style={{
      display: 'block', width: 3, height: 14,
      background: 'linear-gradient(to bottom, #22d3ee, #60a5fa)',
      borderRadius: 2, flexShrink: 0,
    }} />
    {children}
  </div>
)

const Divider = () => (
  <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '1.75rem 0' }} />
)

const Field = ({ label, required, icon, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <label style={{
      fontSize: 12, fontWeight: 500, color: '#94a3b8',
      display: 'flex', alignItems: 'center', gap: 5, letterSpacing: '0.03em',
    }}>
      {icon}
      {label}
      {required && <span style={{ color: '#22d3ee', fontSize: 10 }}>*</span>}
    </label>
    {children}
  </div>
)

/* ─── Icons inline (pas d'import lourd) ──────────────────── */
const Icon = ({ d, d2, cx, cy, r, type }) => {
  const props = { width: 12, height: 12, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, opacity: 0.7 }
  if (type === 'user') return <svg {...props}><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
  if (type === 'mail') return <svg {...props}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
  if (type === 'phone') return <svg {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 17z"/></svg>
  if (type === 'building') return <svg {...props}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
  if (type === 'pulse') return <svg {...props}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
  if (type === 'dollar') return <svg {...props}><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
  if (type === 'calendar') return <svg {...props}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
  if (type === 'file') return <svg {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
  if (type === 'msg') return <svg {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
  return null
}

/* ─── Composant principal ─────────────────────────────────── */
const DevisCloud = () => {
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      console.log('Devis cloud :', formData)
      setSubmitted(true)
      setLoading(false)
      setTimeout(() => {
        setSubmitted(false)
        setFormData(EMPTY_FORM)
      }, 3500)
    }, 1500)
  }

  /* ── styles communs ── */
  const row2 = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1.25rem',
  }

  return (
    <>
      <style>{globalStyles}</style>

      {/* ── Hero ── */}
      <section style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #0d1b2a 0%, #0a2a3d 50%, #0d1f35 100%)',
        padding: '5rem 1.5rem 3rem',
        textAlign: 'center',
        overflow: 'hidden',
      }}>
        {/* grille décorative */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.15,
          backgroundImage: `linear-gradient(rgba(6,182,212,0.2) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(6,182,212,0.2) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }} />
        {/* halo */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: 500, height: 300,
          background: 'radial-gradient(ellipse, rgba(6,182,212,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', maxWidth: 640, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.25)',
              borderRadius: 20, padding: '6px 16px', marginBottom: '1.25rem',
            }}
          >
            <div className="fc-badge-dot" />
            <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 11, color: '#67e8f9', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Demande de devis
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(28px,5vw,48px)', fontWeight: 800, color: '#f1f5f9', lineHeight: 1.15, marginBottom: '0.75rem' }}
          >
            Devis{' '}
            <span style={{ background: 'linear-gradient(90deg,#22d3ee,#60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Cloud & Hébergement
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ color: '#94a3b8', fontSize: 15, fontWeight: 300 }}
          >
            Un expert cloud vous recontactera sous 24h avec une offre personnalisée.
          </motion.p>
        </div>
      </section>

      {/* ── Formulaire ── */}
      <section style={{ background: 'linear-gradient(180deg,#0a2a3d 0%,#0d1b2a 100%)', padding: '3rem 1.5rem 4rem' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 20,
              padding: 'clamp(1.5rem,4vw,2.5rem)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {submitted ? (
              /* ── Confirmation ── */
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ textAlign: 'center', padding: '3rem 1rem' }}
              >
                <CheckCircle size={64} color="#22d3ee" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 700, color: '#f1f5f9', marginBottom: 8 }}>
                  Demande envoyée !
                </h3>
                <p style={{ color: '#94a3b8', fontSize: 15, marginBottom: '1.5rem' }}>
                  Merci, nous vous contacterons sous 24h avec un devis personnalisé.
                </p>
                <Link
                  to="/cloud-hebergement"
                  style={{ color: '#22d3ee', fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 4, textDecoration: 'none' }}
                >
                  <ChevronLeft size={16} /> Retour à la page Cloud
                </Link>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>

                {/* Section 1 — Coordonnées */}
                <SectionTitle>Coordonnées</SectionTitle>

                <div style={{ ...row2, marginBottom: '1.25rem' }}>
                  <Field label="Nom complet" required icon={<Icon type="user" />}>
                    <input className="fc-input" type="text" name="nom" value={formData.nom} onChange={handleChange} required placeholder="Jean Dupont" />
                  </Field>
                  <Field label="Email professionnel" required icon={<Icon type="mail" />}>
                    <input className="fc-input" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="jean@entreprise.com" />
                  </Field>
                </div>

                <div style={{ ...row2, marginBottom: '1.25rem' }}>
                  <Field label="Téléphone" required icon={<Icon type="phone" />}>
                    <input className="fc-input" type="tel" name="telephone" value={formData.telephone} onChange={handleChange} required placeholder="+33 6 12 34 56 78" />
                  </Field>
                  <Field label="Entreprise / Organisation" icon={<Icon type="building" />}>
                    <input className="fc-input" type="text" name="entreprise" value={formData.entreprise} onChange={handleChange} placeholder="Nom de votre entreprise" />
                  </Field>
                </div>

                <Divider />

                {/* Section 2 — Détails du projet */}
                <SectionTitle>Détails du projet</SectionTitle>

                <div style={{ ...row2, marginBottom: '1.25rem' }}>
                  <Field label="Service souhaité" required icon={<Icon type="pulse" />}>
                    <select className="fc-select" name="service" value={formData.service} onChange={handleChange} required>
                      <option value="">Sélectionnez un service</option>
                      {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </Field>
                  <Field label="Budget estimé" required icon={<Icon type="dollar" />}>
                    <select className="fc-select" name="budget" value={formData.budget} onChange={handleChange} required>
                      <option value="">Sélectionnez un budget</option>
                      {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </Field>
                </div>

                <div style={{ ...row2, marginBottom: '1.25rem' }}>
                  <Field label="Date de mise en production" icon={<Icon type="calendar" />}>
                    <input className="fc-input" type="date" name="dateSouhaitee" value={formData.dateSouhaitee} onChange={handleChange} />
                  </Field>
                  <Field label="Type de projet" icon={<Icon type="file" />}>
                    <select className="fc-select" name="typeProjet" value={formData.typeProjet} onChange={handleChange}>
                      <option value="">Sélectionnez</option>
                      {TYPES_PROJET.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </Field>
                </div>

                <Field label="Description & besoins spécifiques" icon={<Icon type="msg" />}>
                  <textarea
                    className="fc-textarea"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Décrivez votre infrastructure actuelle, vos contraintes techniques, vos objectifs, le nombre d'utilisateurs..."
                  />
                </Field>

                <Divider />

                {/* Bouton */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    background: loading ? 'rgba(14,116,144,0.5)' : 'linear-gradient(135deg,#0e7490,#1d4ed8)',
                    border: 'none',
                    borderRadius: 12,
                    padding: '14px 20px',
                    color: '#fff',
                    fontFamily: "'Syne',sans-serif",
                    fontSize: 15,
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    transition: 'opacity 0.2s',
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  {loading ? 'Envoi en cours…' : (
                    <>Envoyer ma demande de devis <Send size={16} /></>
                  )}
                </button>

                <p style={{ fontSize: 11, color: '#475569', textAlign: 'center', marginTop: '1rem', lineHeight: 1.6 }}>
                  En soumettant ce formulaire, vous acceptez que vos données soient traitées pour vous recontacter.
                  Un devis personnalisé vous sera envoyé sous 24h ouvrées.
                </p>
              </form>
            )}
          </motion.div>

          {/* Lien retour */}
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Link
              to="/cloud-hebergement"
              style={{ color: '#64748b', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 4, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#22d3ee'}
              onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
            >
              <ChevronLeft size={16} /> Retour à la page Cloud & Hébergement
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default DevisCloud


import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Code, Globe, ShoppingCart, Smartphone, Database, Cloud,
  CheckCircle, Star, Clock, Award, Rocket, Headphones, FileText,
  Phone, MessageCircle, Cpu, Zap
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
  
  @keyframes glow-pulse {
    0%, 100% { box-shadow: 0 0 5px rgba(59,130,246,0.3); }
    50% { box-shadow: 0 0 20px rgba(59,130,246,0.6); }
  }
  
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-pulse-ring { animation: pulse-ring 2s ease-out infinite; }
  .glow-pulse { animation: glow-pulse 2s ease-in-out infinite; }
`;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

// Données des services développement digital
const digitalServices = [
  {
    id: 'sites-web',
    name: 'Sites web vitrines',
    icon: Globe,
    gradient: 'from-blue-500 to-blue-600',
    description: 'Design moderne, responsive, optimisé SEO et administration facile.',
    price: 'Sur devis'
  },
  {
    id: 'ecommerce',
    name: 'E-commerce performant',
    icon: ShoppingCart,
    gradient: 'from-cyan-500 to-cyan-600',
    description: 'Boutiques en ligne avec paiement sécurisé, gestion de stock et livraison.',
    price: 'Sur devis'
  },
  {
    id: 'applications-mobiles',
    name: 'Applications mobiles',
    icon: Smartphone,
    gradient: 'from-emerald-500 to-emerald-600',
    description: 'iOS et Android natives ou hybrides (React Native, Flutter).',
    price: 'Sur devis'
  },
  {
    id: 'erp',
    name: 'ERP sur mesure',
    icon: Database,
    gradient: 'from-blue-500 to-blue-600',
    description: 'Gestion complète : ventes, stocks, RH, facturation, reporting.',
    price: 'Sur devis'
  },
  {
    id: 'saas',
    name: 'Solutions SaaS multi-tenant',
    icon: Cloud,
    gradient: 'from-cyan-500 to-cyan-600',
    description: 'Plateformes évolutives avec abonnements et espace client.',
    price: 'Sur devis'
  },
  {
    id: 'maintenance',
    name: 'Maintenance & évolutivité',
    icon: Code,
    gradient: 'from-amber-500 to-amber-600',
    description: 'Support continu, mises à jour et améliorations.',
    price: 'Sur devis'
  }
];

// Technologies utilisées avec couleurs personnalisées
const technologies = [
  { name: 'React.js / Next.js', icon: Code, color: 'from-blue-500 to-blue-600', bgHover: 'hover:border-blue-500/70 hover:bg-blue-500/10' },
  { name: 'Node.js / Express', icon: Code, color: 'from-green-500 to-green-600', bgHover: 'hover:border-green-500/70 hover:bg-green-500/10' },
  { name: 'MongoDB / PostgreSQL', icon: Database, color: 'from-emerald-500 to-emerald-600', bgHover: 'hover:border-emerald-500/70 hover:bg-emerald-500/10' },
  { name: 'Tailwind CSS', icon: Code, color: 'from-sky-500 to-sky-600', bgHover: 'hover:border-sky-500/70 hover:bg-sky-500/10' },
  { name: 'Flutter / React Native', icon: Smartphone, color: 'from-purple-500 to-purple-600', bgHover: 'hover:border-purple-500/70 hover:bg-purple-500/10' },
  { name: 'AWS / Vercel', icon: Cloud, color: 'from-orange-500 to-orange-600', bgHover: 'hover:border-orange-500/70 hover:bg-orange-500/10' },
  { name: 'Docker / Kubernetes', icon: Cpu, color: 'from-blue-400 to-cyan-400', bgHover: 'hover:border-cyan-500/70 hover:bg-cyan-500/10' },
  { name: 'GraphQL / REST API', icon: Zap, color: 'from-pink-500 to-pink-600', bgHover: 'hover:border-pink-500/70 hover:bg-pink-500/10' }
];

// Statistiques
const stats = [
  { value: '50+', label: 'Projets livrés', color: 'blue' },
  { value: '100%', label: 'Satisfaction client', color: 'amber' },
  { value: '24/7', label: 'Support technique', color: 'cyan' },
  { value: '15+', label: 'Experts certifiés', color: 'blue' }
];

// Témoignages
const testimonials = [
  {
    name: 'Marie L.',
    role: 'Fondatrice, Startup Innov',
    quote: 'OMDEVE a développé notre MVP en 3 mois. L’équipe est réactive, professionnelle et à l’écoute.',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
  },
  {
    name: 'David K.',
    role: 'Directeur, Groupe Retail',
    quote: 'Notre plateforme e-commerce génère +200% de ventes grâce à l’expertise d’OMDEVE.',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
  }
];

// Avantages
const benefits = [
  'Méthodologie Agile (SCRUM)',
  'Design UX/UI centré utilisateur',
  'Code propre, documenté et maintenable',
  'Livraison continue et déploiement automatisé',
  'Accompagnement post-livraison (formation, support)'
];

const ServiceCard = ({ service, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500/50 hover:bg-white/10 cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110`}>
          <service.icon size={22} className="text-white" />
        </div>
        <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
          {service.price}
        </span>
      </div>
      <h3 className="text-xl font-bold text-white mb-2 font-syne group-hover:text-blue-300 transition-colors">
        {service.name}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-5 group-hover:text-gray-300 transition-colors">
        {service.description}
      </p>
      <Link
        to="/demander-devis"
        className="inline-flex items-center gap-2 text-blue-400 text-sm font-semibold group-hover:text-blue-300 transition-all group-hover:gap-3"
      >
        Demander un devis <ArrowRight size={14} />
      </Link>
    </motion.div>
  );
};

const TechnologyCard = ({ tech, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className={`group flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10 transition-all duration-300 ${tech.bgHover} cursor-pointer`}
    >
      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tech.color} flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
        <tech.icon size={18} className="text-white" />
      </div>
      <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">
        {tech.name}
      </span>
      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
      </div>
    </motion.div>
  );
};

const DeveloppementDigital = () => {
  return (
    <>
      <style>{globalStyles}</style>





      {/* Hero Section - style Contact */}
{/* Hero Section - Cloud & Hébergement (500px) */}
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

  {/* Grille de fond */}
  <div className="absolute inset-0 opacity-20" style={{
    backgroundImage: `linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)`,
    backgroundSize: '60px 60px'
  }} />
  
  {/* Effet lumineux */}
  <div className="absolute inset-0 bg-[radial-gradient(at_top_right,#3b82f645_0%,transparent_65%)]" />
  
  {/* Orbes flottants (ajustés pour 500px) */}
  <div className="absolute w-72 h-72 bg-cyan-600/20 top-12 -left-20 rounded-full filter blur-[80px] animate-float" />
  <div className="absolute w-56 h-56 bg-blue-700/15 bottom-12 right-10 rounded-full filter blur-[80px] animate-float" style={{ animationDelay: '2s' }} />
  <div className="absolute w-36 h-36 bg-cyan-500/10 top-1/2 left-1/2 -translate-x-1/2 rounded-full filter blur-[80px] animate-float" style={{ animationDelay: '4s' }} />

  <div className="container mx-auto px-4 relative z-10">
    <div className="max-w-3xl mx-auto text-center">
      
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-cyan-600/15 border border-cyan-500/30"
      >
        <Cloud className="w-3 h-3 text-cyan-400" />
        <span className="text-cyan-300 font-semibold text-[10px] tracking-wide font-syne">Cloud & Hébergement</span>
      </motion.div>

      {/* Titre */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-3 font-syne"
      >
        Développement{' '}
        <span className="relative inline-block">
          <span className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-400 to-indigo-400 blur-2xl opacity-50" />
          <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
            Digital 
          </span>
        </span>
      </motion.h1>

      {/* Ligne décorative */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-16 h-0.5 bg-gradient-to-r from-cyan-500 via-blue-400 to-indigo-400 rounded-full mx-auto mb-3"
      />

      {/* Paragraphe */}
      <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-gray-300 text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
            >
              Sites web, applications mobiles, ERP, SaaS – Des solutions sur mesure pour votre <strong className="text-white">transformation digitale</strong>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-4 justify-center"
            >

         <Link to="/contact" className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 transition-all hover:scale-105 hover:shadow-xl">
                Demander un devis <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/audit" className="group border-2 border-white/30 hover:border-white px-8 py-4 rounded-xl font-semibold text-white hover:bg-white/10 transition-all hover:scale-105">
                Audit gratuit <CheckCircle size={18} />
              </Link>
            </motion.div>

      {/* Flèche de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-8 flex justify-center"
      >
        <div className="animate-bounce">
          <div className="w-5 h-8 rounded-full border-2 border-white/30 flex justify-center">
            <div className="w-1 h-1.5 bg-white/50 rounded-full mt-1.5 animate-pulse" />
          </div>
        </div>
      </motion.div>
    </div>
  </div>

  {/* Vague décorative */}
  <div className="absolute bottom-0 left-0 right-0 text-white/10">
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-8">
      <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor" />
    </svg>
  </div>
</section>



















      {/* Statistiques clés - style Contact */}
      <section className="py-12 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/5 border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 transition-all duration-300 hover:scale-105 hover:bg-white/10">
                <div className="text-3xl font-bold text-blue-400 font-syne">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
              💻 Services
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-syne mb-4">Nos prestations digitales</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {digitalServices.map((service, idx) => (
              <ServiceCard key={idx} service={service} index={idx} />
            ))}
          </div>
        </div>
      </div>

      {/* Technologies Section - AVEC EFFETS DE SURVOLE AMÉLIORÉS */}
      <section className="py-20 bg-white/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, rgba(59,130,246,0.1) 0%, transparent 60%)`
        }} />
        
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
                🚀 Stack technique
              </div>
              <h2 className="text-3xl font-bold font-syne mb-4">Technologies de pointe</h2>
              <div className="w-20 h-1 bg-blue-500 rounded-full mb-6" />
              <p className="text-gray-300 mb-8">
                Nous utilisons les dernières technologies pour garantir performance, sécurité et évolutivité.
                Chaque stack est choisie selon les besoins spécifiques de votre projet.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {technologies.map((tech, i) => (
                  <TechnologyCard key={i} tech={tech} index={i} />
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                <img 
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop" 
                  alt="Développement logiciel"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              {/* Badge flottant au survol */}
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <Zap size={20} className="text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pourquoi OMDEVE Digital */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop" 
                alt="Équipe de développement"
                className="rounded-2xl border border-white/10 shadow-xl transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
                🎯 Pourquoi nous
              </div>
              <h2 className="text-3xl font-bold font-syne mb-4">Pourquoi OMDEVE Digital ?</h2>
              <div className="w-20 h-1 bg-blue-500 rounded-full mb-6" />
              <ul className="space-y-4">
                {benefits.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/devis" className="inline-flex items-center gap-2 mt-8 text-blue-400 hover:text-blue-300 font-semibold group">
                Discuter de votre projet <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
              🗣️ Témoignages
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-syne mb-4">Ils nous font confiance</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto" />
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-blue-500/50 transition-all hover:-translate-y-1"
              >
                <p className="text-gray-300 italic mb-4">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.photo} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-blue-400" />
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

      {/* Galerie de réalisations */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
              📷 Portfolio
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-syne mb-4">Nos réalisations</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop',
              'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&h=500&fit=crop',
              'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=500&fit=crop',
              'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop'
            ].map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-2xl overflow-hidden border border-white/10 shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer group"
              >
                <img src={img} alt="Réalisation digitale" className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA double - style Contact */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/5">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, rgba(59,130,246,0.3) 0%, transparent 60%),
                            radial-gradient(circle at 80% 70%, rgba(6,182,212,0.2) 0%, transparent 60%)`
        }} />
        <div className="absolute w-96 h-96 bg-blue-600/20 top-20 left-1/4 rounded-full filter blur-[100px] animate-float" />
        <div className="absolute w-72 h-72 bg-cyan-500/10 bottom-10 right-1/3 rounded-full filter blur-[80px] animate-float" style={{ animationDelay: '3s' }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Carte 1 : Assistance */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/50"
            >
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110">
                  <Headphones size={28} className="text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white font-syne mb-3">Assistance immédiate</h3>
                <p className="text-gray-300 mb-6">
                  Notre support technique est disponible <strong className="text-blue-400">24h/24 et 7j/7</strong> pour répondre à vos urgences.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="tel:+24355550359"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl font-semibold transition-all hover:scale-105"
                  >
                    <Phone size={16} /> Appeler maintenant
                  </a>
                  <a
                    href="https://wa.me/24355550359"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all hover:scale-105"
                  >
                    <MessageCircle size={16} /> WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Carte 2 : Devis */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/50"
            >
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110">
                  <Rocket size={28} className="text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white font-syne mb-3">Un projet sur mesure ?</h3>
                <p className="text-gray-300 mb-6">
                  Étudions ensemble votre besoin et obtenez un <strong className="text-amber-400">devis personnalisé</strong> sans engagement.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-all hover:scale-105 group"
                >
                  Demander un devis <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
};

export default DeveloppementDigital;


import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
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
  Users,
  Star,
  Zap,
  HardDrive,
  Activity,
  Award
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
  
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-pulse-ring { animation: pulse-ring 2s ease-out infinite; }
`;

const CloudHebergement = () => {
  // Services cloud détaillés
  const cloudServices = [
    { icon: Database, title: 'Hébergement cloud scalable', desc: 'AWS, Azure, Google Cloud, OVH – ressources élastiques' },
    { icon: Server, title: 'Serveurs dédiés & VPS', desc: 'Performances garanties, bare metal ou virtualisation' },
    { icon: Shield, title: 'Sécurité & sauvegarde', desc: 'Backups automatiques, chiffrement, conformité RGPD' },
    { icon: Clock, title: 'Disponibilité 99.9%', desc: 'SLA strict, monitoring 24/7 et redondance' },
    { icon: DollarSign, title: 'Paiement à l’usage', desc: 'Optimisez vos coûts, pas de surprises' },
    { icon: TrendingUp, title: 'Migration assistée', desc: 'Transition en douceur vers le cloud' }
  ]

  // Avantages spécifiques
  const benefits = [
    'Infrastructure certifiée ISO 27001',
    'Support technique 24/7 par des experts cloud',
    'Architecture multi-régions pour une haute disponibilité',
    'Migration sans interruption de service',
    'Facturation transparente et devis personnalisé'
  ]

  // Statistiques
  const stats = [
    { value: '99.99%', label: 'Disponibilité garantie', icon: Activity },
    { value: '50+', label: 'Projets migrés', icon: Cloud },
    { value: '24/7', label: 'Support technique', icon: Clock },
    { value: '100%', label: 'Satisfaction client', icon: Star }
  ]

  // Témoignages
  const testimonials = [
    {
      name: 'Nicolas R.',
      role: 'CTO, FinTech',
      quote: 'La migration de notre infrastructure legacy vers AWS a été fluide et sans downtime. OMDEVE a fait preuve d’un professionnalisme exceptionnel.',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
    },
    {
      name: 'Claire M.',
      role: 'Directrice Technique, E-commerce',
      quote: 'Leur solution d’hébergement cloud nous permet de scaler pendant les pics de trafic sans souci. Je recommande vivement.',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
    }
  ]

  // Images pour galerie
  const galleryImages = [
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop'
  ]

  // Offres packagées
  const packs = [
    { name: 'Pack Start', price: '49€/mois', features: ['1 vCPU', '2 Go RAM', '20 Go SSD', '1 To trafic'] },
    { name: 'Pack Business', price: '129€/mois', features: ['4 vCPU', '8 Go RAM', '100 Go SSD', '5 To trafic', 'Backup quotidien'] },
    { name: 'Pack Enterprise', price: 'Sur devis', features: ['Dédié', 'Stockage illimité', 'SLA 99.99%', 'Support prioritaire', 'Architecture multi-AZ'] }
  ]

  return (
    <>
      <style>{globalStyles}</style>

     {/* Hero Section */}
{/* Hero Section - Cloud & Hébergement (450px) */}



{/* Hero Section - Cloud & Hébergement (500px) */}
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

  {/* Grille de fond */}
  <div className="absolute inset-0 opacity-20" style={{
    backgroundImage: `linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)`,
    backgroundSize: '60px 60px'
  }} />
  
  {/* Effet lumineux */}
  <div className="absolute inset-0 bg-[radial-gradient(at_top_right,#3b82f645_0%,transparent_65%)]" />
  
  {/* Orbes flottants (ajustés pour 500px) */}
  <div className="absolute w-72 h-72 bg-cyan-600/20 top-12 -left-20 rounded-full filter blur-[80px] animate-float" />
  <div className="absolute w-56 h-56 bg-blue-700/15 bottom-12 right-10 rounded-full filter blur-[80px] animate-float" style={{ animationDelay: '2s' }} />
  <div className="absolute w-36 h-36 bg-cyan-500/10 top-1/2 left-1/2 -translate-x-1/2 rounded-full filter blur-[80px] animate-float" style={{ animationDelay: '4s' }} />

  <div className="container mx-auto px-4 relative z-10">
    <div className="max-w-3xl mx-auto text-center">
      
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-cyan-600/15 border border-cyan-500/30"
      >
        <Cloud className="w-3 h-3 text-cyan-400" />
        <span className="text-cyan-300 font-semibold text-[10px] tracking-wide font-syne">Cloud & Hébergement</span>
      </motion.div>

      {/* Titre */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-3 font-syne"
      >
        Passez au{' '}
        <span className="relative inline-block">
          <span className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-400 to-indigo-400 blur-2xl opacity-50" />
          <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
            cloud
          </span>
        </span>
      </motion.h1>

      {/* Ligne décorative */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-16 h-0.5 bg-gradient-to-r from-cyan-500 via-blue-400 to-indigo-400 rounded-full mx-auto mb-3"
      />

      {/* Paragraphe */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-gray-300 text-sm md:text-base mb-5 max-w-2xl mx-auto"
      >
        Solutions d’hébergement flexibles, sécurisées et performantes pour toutes vos applications.
      </motion.p>

      {/* Boutons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-wrap gap-3 justify-center"
      >
        <Link to="/devis" className="group bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-5 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all hover:scale-105">
          Migrez dès maintenant <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
        </Link>
        <Link to="/contact" className="group border-2 border-white/30 hover:border-white px-5 py-2 rounded-xl font-semibold text-white hover:bg-white/10 transition-all text-sm">
          Contacter un expert
        </Link>
      </motion.div>

      {/* Flèche de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-8 flex justify-center"
      >
        <div className="animate-bounce">
          <div className="w-5 h-8 rounded-full border-2 border-white/30 flex justify-center">
            <div className="w-1 h-1.5 bg-white/50 rounded-full mt-1.5 animate-pulse" />
          </div>
        </div>
      </motion.div>
    </div>
  </div>

  {/* Vague décorative */}
  <div className="absolute bottom-0 left-0 right-0 text-white/10">
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-8">
      <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor" />
    </svg>
  </div>
</section>
















      {/* Services Cloud (grille) */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-syne mb-4">Nos prestations cloud</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cloudServices.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-cyan-500/50 transition-all hover:-translate-y-1"
              >
                <service.icon className="w-12 h-12 text-cyan-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-400">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi OMDEVE Cloud */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold font-syne mb-4">Pourquoi OMDEVE Cloud ?</h2>
              <div className="w-20 h-1 bg-cyan-500 rounded-full mb-6" />
              <ul className="space-y-4">
                {benefits.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/devis" className="inline-flex items-center gap-2 mt-8 text-cyan-400 hover:text-cyan-300 font-semibold">
                Demander un devis cloud <ArrowRight size={16} />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl p-8 border border-white/10 text-center"
            >
              <Cloud className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
              <p className="text-gray-300 italic">
                "Avec OMDEVE, notre infrastructure cloud est devenue plus robuste et économique. Leur expertise AWS nous a fait gagner 30% sur notre facture."
              </p>
              <p className="text-sm text-gray-400 mt-4">— Directeur Technique, Scale-up SaaS</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Offres packagées */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-syne mb-4">Nos packs cloud clé en main</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full mx-auto" />
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {packs.map((pack, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-cyan-500/50 transition-all hover:-translate-y-1"
              >
                <h3 className="text-2xl font-bold text-white mb-2">{pack.name}</h3>
                <div className="text-3xl font-bold text-cyan-400 my-4">{pack.price}</div>
                <ul className="space-y-2 mb-6">
                  {pack.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-400" /> {feat}
                    </li>
                  ))}
                </ul>
                <Link to="/devis-cloud" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold">
                  Choisir ce pack <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Statistiques */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/10 rounded-2xl p-6 text-center backdrop-blur-sm border border-white/10"
              >
                <stat.icon className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                <div className="text-4xl font-bold text-white font-syne">{stat.value}</div>
                <div className="text-gray-400 mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Galerie d'infrastructures */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-syne mb-4">Nos infrastructures & datacenters</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full mx-auto" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryImages.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-2xl overflow-hidden border border-white/10 shadow-xl hover:scale-105 transition-transform duration-300"
              >
                <img src={img} alt="Infrastructure cloud" className="w-full h-48 object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <p className="text-gray-300 italic mb-4">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.photo} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-cyan-400" />
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

      {/* CTA final */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl md:text-3xl font-bold font-syne mb-4">Prêt à migrer vers le cloud ?</h2>
            <p className="text-gray-300 mb-6">Bénéficiez d’un audit de votre infrastructure et d’un plan de migration personnalisé.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/audit-gratuit" className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-xl font-semibold transition">
                Audit gratuit <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 px-6 py-3 rounded-xl font-semibold transition">
                Contacter un expert
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default CloudHebergement