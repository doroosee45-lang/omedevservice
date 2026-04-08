import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, XCircle, Rocket, Star, Calendar, MapPin, Briefcase, Clock,
  Eye, X, Search, Quote, ThumbsUp, Award, Users,
  Network, Shield, Code, Cloud, Sun, Monitor, BookOpen,
  Wifi, GraduationCap, Filter, ChevronRight, Heart, Headphones,
  CreditCard, Zap, Crown, HelpCircle, ChevronDown, ChevronUp,
  TrendingUp, ShoppingBag, Euro
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
  
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-pulse-ring { animation: pulse-ring 2s ease-out infinite; }
`;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const Tarifs = () => {
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  // Services avec tarifs
  const services = [
    {
      id: 1,
      name: 'Réseau & Infrastructure',
      icon: Wifi,
      description: 'Installation et maintenance de réseaux informatiques',
      price: { monthly: '250€', quarterly: '680€', yearly: '2 400€' },
      features: [
        'Audit réseau initial',
        'Câblage structuré',
        'Configuration équipements',
        'Support technique 24/7',
        'Maintenance préventive',
        'Rapports mensuels'
      ],
      popular: false,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      name: 'Sécurité',
      icon: Shield,
      description: 'Solutions de sécurité complètes',
      price: { monthly: '350€', quarterly: '950€', yearly: '3 360€' },
      features: [
        'Vidéosurveillance HD',
        'Audit cybersécurité',
        'Firewall management',
        "Contrôle d'accès",
        'Alertes en temps réel',
        'Backup sécurisé'
      ],
      popular: true,
      gradient: 'from-red-500 to-orange-500'
    },
    {
      id: 3,
      name: 'Développement Digital',
      icon: Code,
      description: 'Création de sites et applications sur mesure',
      price: { monthly: '500€', quarterly: '1 350€', yearly: '4 800€' },
      features: [
        'Site vitrine / E-commerce',
        'Application mobile',
        'SEO optimisé',
        'Maintenance incluse',
        'Hébergement offert',
        'Support prioritaire'
      ],
      popular: false,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 4,
      name: 'Cloud & Hébergement',
      icon: Cloud,
      description: 'Solutions cloud haute disponibilité',
      price: { monthly: '180€', quarterly: '490€', yearly: '1 728€' },
      features: [
        'Hébergement sécurisé',
        'Backup automatique',
        'Migration cloud',
        'Monitoring 24/7',
        'Certificat SSL',
        'SLA 99.9%'
      ],
      popular: false,
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      id: 5,
      name: 'Énergie & Équipements',
      icon: Sun,
      description: 'Solutions énergétiques durables',
      price: { monthly: '300€', quarterly: '810€', yearly: '2 880€' },
      features: [
        'Audit énergétique',
        'Installation panneaux solaires',
        'Maintenance climatisation',
        'Optimisation consommation',
        'Certifications qualité',
        'Garantie 5 ans'
      ],
      popular: false,
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      id: 6,
      name: 'Formation',
      icon: GraduationCap,
      description: 'Formations professionnelles certifiantes',
      price: { monthly: '200€', quarterly: '540€', yearly: '1 920€' },
      features: [
        'Accès illimité formations',
        'Certifications reconnues',
        'Support pédagogique',
        'E-learning inclus',
        'Suivi personnalisé',
        'Mise à jour continue'
      ],
      popular: false,
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  // Packs pré-configurés
  const packs = [
    {
      name: 'Pack Start',
      price: '990€',
      originalPrice: '1 490€',
      description: 'Idéal pour les petites structures',
      features: [
        'Site vitrine (5 pages)',
        'Hébergement 1 an',
        'Email professionnel',
        'Support basique',
        'Formation utilisateur'
      ],
      recommended: false
    },
    {
      name: 'Pack Business',
      price: '2 490€',
      originalPrice: '3 490€',
      description: 'Pour les entreprises en croissance',
      features: [
        'Site e-commerce complet',
        'Application mobile',
        'SEO avancé',
        'Support prioritaire',
        'Maintenance incluse',
        'Analytics avancés'
      ],
      recommended: true
    },
    {
      name: 'Pack Enterprise',
      price: 'Sur devis',
      originalPrice: null,
      description: 'Solutions sur mesure',
      features: [
        'ERP personnalisé',
        'Infrastructure dédiée',
        'SLA personnalisé',
        'Support dédié 24/7',
        'Audit trimestriel',
        'Formations sur site'
      ],
      recommended: false
    }
  ];

  const getCurrentPrice = (service) => {
    return service.price[billingPeriod];
  };

  const getDiscountLabel = () => {
    if (billingPeriod === 'quarterly') return 'Économisez 10%';
    if (billingPeriod === 'yearly') return 'Économisez 20%';
    return '';
  };

  return (
    <>
      <style>{globalStyles}</style>

      {/* Hero Section (identique à TarifsPage) */}
      {/* ==================== HERO SECTION - TARIFS ==================== */}
      {/* ==================== HERO SECTION - TARIFS ==================== */}

      <section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white overflow-hidden pt-28 pb-16">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />

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

        <div className="absolute inset-0 bg-[radial-gradient(at_top_right,#3b82f645_0%,transparent_65%)]" />

        <div className="absolute w-80 h-80 bg-blue-600/20 top-20 -left-20 rounded-full filter blur-[80px] animate-float" />
        <div className="absolute w-64 h-64 bg-indigo-700/15 bottom-20 right-10 rounded-full filter blur-[80px] animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute w-40 h-40 bg-cyan-500/10 top-1/2 left-1/2 -translate-x-1/2 rounded-full filter blur-[80px] animate-float" style={{ animationDelay: '4s' }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-blue-600/15 border border-blue-500/30"
            >
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-ring" />
              <span className="text-blue-300 font-semibold text-xs tracking-wide font-syne">Blog & Actualités</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight mb-5 font-syne"
            >
              Des offres adaptées à {' '}
              <span className="relative inline-block">
                <span className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 blur-2xl opacity-50" />
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400">
                  vos besoins
                </span>
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-20 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 rounded-full mx-auto mb-5"
            />

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-gray-300 text-lg md:text-xl mb-6 max-w-2xl mx-auto"
            >
              Choisissez la formule qui correspond à votre activité. Sans engagement, évolutif.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link to="/contact" className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all hover:scale-105 hover:shadow-xl">
                Demander un conseil <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/tarifs" className="group border-2 border-white/30 hover:border-white px-6 py-3 rounded-xl font-semibold text-white hover:bg-white/10 transition-all hover:scale-105">
                faire un audit <ChevronRight size={18} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-12 flex justify-center"
            >
              <div className="animate-bounce">
                <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center">
                  <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-pulse" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 text-white/10">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-10">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor" />
          </svg>
        </div>
      </section>
















































































      {/* Billing Toggle (style modernisé) */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 sticky top-0 z-40 py-4 border-b border-white/10 backdrop-blur-xl bg-opacity-80">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="bg-white/10 border border-white/20 rounded-full p-1 inline-flex backdrop-blur-sm">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${billingPeriod === 'monthly'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
              >
                Mensuel
              </button>
              <button
                onClick={() => setBillingPeriod('quarterly')}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${billingPeriod === 'quarterly'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
              >
                Trimestriel
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${billingPeriod === 'yearly'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
              >
                Annuel
                <span className="ml-1 text-xs bg-green-500 text-white px-1 rounded-full">-20%</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white font-syne mb-3">Tarifs par service</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Des prix transparents sans surprise. Abonnement sans engagement.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  variants={fadeUp}
                  className={`relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 ${service.popular
                      ? 'bg-gradient-to-br from-amber-900/30 via-orange-900/20 to-slate-900 border-2 border-amber-500/50 shadow-2xl shadow-amber-500/10'
                      : 'bg-white/5 border border-white/10 hover:border-blue-500/30'
                    }`}
                >
                  {service.popular && (
                    <div className="absolute top-4 right-4 bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full z-10 flex items-center gap-1">
                      <Star size={12} className="fill-current" /> Populaire
                    </div>
                  )}
                  <div className={`p-6 bg-gradient-to-r ${service.gradient} bg-opacity-20`}>
                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                      <Icon size={28} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
                    <p className="text-white/80 text-sm">{service.description}</p>
                  </div>
                  <div className="p-6">
                    <div className="mb-6">
                      <span className="text-3xl font-extrabold text-white">{getCurrentPrice(service)}</span>
                      <span className="text-gray-400 text-sm ml-1">
                        / {billingPeriod === 'monthly' ? 'mois' : billingPeriod === 'quarterly' ? 'trimestre' : 'an'}
                      </span>
                      {billingPeriod !== 'monthly' && (
                        <p className="text-sm text-emerald-400 mt-1">{getDiscountLabel()}</p>
                      )}
                    </div>
                    <div className="space-y-3 mb-8">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Link
                      to="/contact"
                      className="block text-center py-3 px-4 rounded-xl font-semibold transition-all hover:scale-105 bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                    >
                      Demander ce service <ArrowRight size={16} className="inline ml-1" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Packs Section */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/5 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white font-syne mb-3">Packs pré-configurés</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">Des offres complètes à prix réduits. Tout compris.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packs.map((pack, index) => (
              <motion.div
                key={pack.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 ${pack.recommended
                    ? 'bg-gradient-to-br from-amber-900/30 via-orange-900/20 to-slate-900 border-2 border-amber-500/50 shadow-2xl shadow-amber-500/10'
                    : 'bg-white/5 border border-white/10 hover:border-blue-500/30'
                  }`}
              >
                {pack.recommended && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-amber-500 to-orange-600 text-black text-center text-sm font-bold py-1 z-10">
                    Recommandé
                  </div>
                )}
                <div className={`p-6 text-center ${pack.recommended ? 'pt-8' : ''}`}>
                  <h3 className="text-2xl font-bold text-white mb-2">{pack.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{pack.description}</p>
                  <div className="mb-4">
                    <span className="text-4xl font-extrabold text-white">{pack.price}</span>
                    {pack.originalPrice && (
                      <span className="text-gray-500 line-through ml-2">{pack.originalPrice}</span>
                    )}
                  </div>
                  <ul className="text-left space-y-2 mb-6">
                    {pack.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className={`block text-center py-3 px-4 rounded-xl font-semibold transition-all hover:scale-105 ${pack.recommended
                        ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg'
                        : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                      }`}
                  >
                    Choisir ce pack <ArrowRight size={16} className="inline ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us + Devis personnalisé (2 colonnes) */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/5 py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white font-syne mb-6">Pourquoi choisir OMDEVE ?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={20} className="text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Prix transparents</h3>
                    <p className="text-gray-400 text-sm">Pas de frais cachés. Ce que vous voyez est ce que vous payez.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <Headphones size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Support 24/7</h3>
                    <p className="text-gray-400 text-sm">Une équipe dédiée à votre écoute, jour et nuit.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Calendar size={20} className="text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Sans engagement</h3>
                    <p className="text-gray-400 text-sm">Résiliez à tout moment. Pas de période d'engagement obligatoire.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <TrendingUp size={20} className="text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Évolutif</h3>
                    <p className="text-gray-400 text-sm">Changez de formule à tout moment selon vos besoins.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Besoin d'un devis personnalisé ?</h2>
              <p className="text-gray-300 mb-6">
                Chaque projet est unique. Contactez-nous pour une offre adaptée à vos besoins spécifiques.
              </p>
              <div className="space-y-3">
                <Link
                  to="/contact"
                  className="flex items-center justify-between p-4 bg-white/10 rounded-xl hover:bg-white/20 transition group"
                >
                  <div>
                    <p className="font-semibold text-white">Demander un devis gratuit</p>
                    <p className="text-sm text-gray-400">Réponse sous 24h</p>
                  </div>
                  <ArrowRight size={20} className="text-blue-400 group-hover:translate-x-1 transition" />
                </Link>
                <Link
                  to="/audit"
                  className="flex items-center justify-between p-4 bg-white/10 rounded-xl hover:bg-white/20 transition group"
                >
                  <div>
                    <p className="font-semibold text-white">Audit gratuit</p>
                    <p className="text-sm text-gray-400">Diagnostic complet de votre infrastructure</p>
                  </div>
                  <ArrowRight size={20} className="text-blue-400 group-hover:translate-x-1 transition" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA finale */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900/50 to-indigo-900/50 border-t border-white/5">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 70% 30%, rgba(59,130,246,0.4) 0%, transparent 60%)`
        }} />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-syne">Prêt à démarrer ?</h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Rejoignez plus de 150 clients satisfaits qui nous font confiance pour leur transformation digitale.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-xl"
              >
                Demander un devis <ArrowRight size={18} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105 hover:bg-white/10"
              >
                Nous contacter <Headphones size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Tarifs;