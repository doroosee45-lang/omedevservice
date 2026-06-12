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