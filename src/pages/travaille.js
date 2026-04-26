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

import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import {
  ArrowRight, Server, Shield, Code, Cloud, Zap, GraduationCap,
  CheckCircle, Users, Clock, Award, Star, Quote, Briefcase, Globe,
  Cpu, Camera, Wifi, Wrench, Phone, ThermometerSun, Monitor,
  ChevronRight, Sparkles, TrendingUp, Rocket, TrendingDown, FileText,
  Lock, AlertTriangle, BarChart3, Mail, ShoppingBag, Database,
  Network, Eye, Fingerprint, Sun, Battery, Headphones, BookOpen,
  Building2, ShoppingCart, Smartphone, DollarSign, Leaf, GraduationCap as Graduation,
  Briefcase as BriefcaseIcon, Settings, ShieldCheck, Layers, X,
  Video, Webcam, Fan, Wind, Snowflake
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

// Monnaie: FC (Francs Congolais) ou $
const CURRENCY = 'FC'; // Changez à '$' pour dollars

// Données des packs solutions
const packs = [
  {
    id: 'entreprise',
    name: 'Pack Entreprise',
    tagline: 'La solution complète pour les grandes entreprises',
    icon: Building2,
    color: 'blue',
    gradient: 'from-blue-500 to-blue-600',
    bgLight: 'bg-blue-500/10',
    textLight: 'text-blue-400',
    borderLight: 'border-blue-500/30',
    price: CURRENCY === 'FC' ? 'À partir de 5 000 000 FC' : 'À partir de 2 500 $',
    priceRange: CURRENCY === 'FC' ? '5M - 20M FC' : '2 500 - 10 000 $',
    popular: true,
    description: 'Une infrastructure IT complète pour les entreprises de taille moyenne à grande.',
    features: [
      'Infrastructure réseau complète (fibre + WiFi entreprise)',
      'Sécurité avancée (Firewall, antivirus, sauvegarde)',
      'ERP sur mesure adapté à votre secteur',
      'Serveurs dédiés et cloud privé',
      'Support technique 24/7 avec SLA',
      'Formation des équipes (20 personnes)',
      'Maintenance préventive et corrective',
      'Téléphonie d\'entreprise VoIP'
    ],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop',
    bonus: '✅ Audit de sécurité offert'
  },
  {
    id: 'ecommerce',
    name: 'Pack E-commerce',
    tagline: 'Vendez en ligne avec une boutique professionnelle',
    icon: ShoppingCart,
    color: 'cyan',
    gradient: 'from-cyan-500 to-cyan-600',
    bgLight: 'bg-cyan-500/10',
    textLight: 'text-cyan-400',
    borderLight: 'border-cyan-500/30',
    price: CURRENCY === 'FC' ? 'À partir de 1 500 000 FC' : 'À partir de 750 $',
    priceRange: CURRENCY === 'FC' ? '1.5M - 5M FC' : '750 - 2 500 $',
    popular: false,
    description: 'Une boutique en ligne performante pour développer vos ventes sur internet.',
    features: [
      'Site e-commerce complet (jusqu\'à 1000 produits)',
      'Design responsive et moderne',
      'Paiement sécurisé (Mobile Money, Carte, Orange Money)',
      'Gestion des stocks et commandes',
      'Dashboard administrateur',
      'SEO optimisé pour le référencement',
      'Intégration des réseaux sociaux',
      'Formation à l\'administration du site'
    ],
    image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=800&h=500&fit=crop',
    bonus: '✅ 3 mois de maintenance offerts'
  },
  {
    id: 'digital',
    name: 'Pack Digital Complet',
    tagline: 'La transformation digitale totale de votre entreprise',
    icon: Smartphone,
    color: 'amber',
    gradient: 'from-amber-500 to-amber-600',
    bgLight: 'bg-amber-500/10',
    textLight: 'text-amber-400',
    borderLight: 'border-amber-500/30',
    price: CURRENCY === 'FC' ? 'À partir de 8 000 000 FC' : 'À partir de 4 000 $',
    priceRange: CURRENCY === 'FC' ? '8M - 30M FC' : '4 000 - 15 000 $',
    popular: true,
    description: 'Une solution tout-en-un pour digitaliser l\'ensemble de vos processus.',
    features: [
      'Site web vitrine + Application mobile',
      'CRM et ERP intégrés',
      'Solution cloud complète',
      'Cybersécurité avancée',
      'Stratégie digitale et SEO',
      'Formation complète des équipes',
      'Support prioritaire 24/7',
      'Dashboard de pilotage en temps réel'
    ],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
    bonus: '✅ Audit digital offert + 6 mois de maintenance'
  },
  {
    id: 'energie',
    name: 'Pack Énergie Solaire',
    tagline: 'Économisez avec une énergie propre et durable',
    icon: Sun,
    color: 'orange',
    gradient: 'from-orange-500 to-orange-600',
    bgLight: 'bg-orange-500/10',
    textLight: 'text-orange-400',
    borderLight: 'border-orange-500/30',
    price: CURRENCY === 'FC' ? 'À partir de 3 000 000 FC' : 'À partir de 1 500 $',
    priceRange: CURRENCY === 'FC' ? '3M - 15M FC' : '1 500 - 7 500 $',
    popular: false,
    description: 'Solutions solaires pour réduire votre facture énergétique.',
    features: [
      'Installation de panneaux solaires (5-50 kWp)',
      'Onduleurs et batteries de stockage',
      'Système de monitoring à distance',
      'Éclairage public solaire',
      'Maintenance préventive',
      'Étude de faisabilité gratuite',
      'Garantie 5 ans sur les équipements',
      'Financement possible'
    ],
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=500&fit=crop',
    bonus: '✅ Énergie gratuite pendant 25 ans'
  },
  {
    id: 'formation',
    name: 'Pack Formation',
    tagline: 'Montez en compétences avec nos formations certifiantes',
    icon: Graduation,
    color: 'green',
    gradient: 'from-green-500 to-green-600',
    bgLight: 'bg-green-500/10',
    textLight: 'text-green-400',
    borderLight: 'border-green-500/30',
    price: CURRENCY === 'FC' ? 'À partir de 500 000 FC' : 'À partir de 250 $',
    priceRange: CURRENCY === 'FC' ? '500K - 3M FC' : '250 - 1 500 $',
    popular: false,
    description: 'Formez vos équipes aux technologies digitales.',
    features: [
      'Formation en développement web et mobile',
      'Formation en cybersécurité',
      'Formation en marketing digital',
      'Formation en cloud computing',
      'Certification reconnue',
      'Support post-formation',
      'Accès à la plateforme e-learning',
      'Suivi personnalisé'
    ],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop',
    bonus: '✅ 5 places offertes pour 10 inscrits'
  },
  {
    id: 'camera',
    name: 'Pack Caméra de Surveillance',
    tagline: 'Protection 360° pour votre entreprise',
    icon: Camera,
    color: 'purple',
    gradient: 'from-purple-500 to-purple-600',
    bgLight: 'bg-purple-500/10',
    textLight: 'text-purple-400',
    borderLight: 'border-purple-500/30',
    price: CURRENCY === 'FC' ? 'À partir de 2 000 000 FC' : 'À partir de 1 000 $',
    priceRange: CURRENCY === 'FC' ? '2M - 8M FC' : '1 000 - 4 000 $',
    popular: false,
    description: 'Un système de surveillance complet pour sécuriser vos locaux 24h/24 et 7j/7.',
    features: [
      'Caméras IP 4K (4 à 16 caméras selon configuration)',
      'Enregistreur vidéo (NVR) haute capacité',
      'Vision nocturne jusqu\'à 30 mètres',
      'Détection de mouvement et alertes en temps réel',
      'Accès à distance via application mobile',
      'Stockage cloud sécurisé (30 jours)',
      'Installation et câblage professionnel',
      'Support technique inclus'
    ],
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&h=500&fit=crop',
    bonus: '✅ 1 an de stockage cloud offert'
  },
  {
    id: 'climatisation',
    name: 'Pack Climatisation',
    tagline: 'Confort thermique et économies d\'énergie',
    icon: Snowflake,
    color: 'teal',
    gradient: 'from-teal-500 to-teal-600',
    bgLight: 'bg-teal-500/10',
    textLight: 'text-teal-400',
    borderLight: 'border-teal-500/30',
    price: CURRENCY === 'FC' ? 'À partir de 3 500 000 FC' : 'À partir de 1 800 $',
    priceRange: CURRENCY === 'FC' ? '3.5M - 12M FC' : '1 800 - 6 000 $',
    popular: false,
    description: 'Solutions de climatisation performantes pour vos bureaux et locaux professionnels.',
    features: [
      'Climatiseurs split ou gainables (2 à 8 unités)',
      'Installation par des techniciens certifiés',
      'Maintenance préventive annuelle incluse',
      'Garantie 3 ans sur les équipements',
      'Télécommande et programmation',
      'Filtres antibactériens et purification d\'air',
      'Consommation énergétique optimisée',
      'Support après-vente réactif'
    ],
    image: 'https://images.unsplash.com/photo-1634723424278-2b59a58e8195?w=800&h=500&fit=crop',
    bonus: '✅ 2 ans de maintenance gratuite'
  }, 

   {
    id: 'Installation de salle informatique',
    name: 'Pack Installation de salle informatique',
    tagline: 'Performance, fiabilité et sécurité pour votre infrastructure IT',
    icon: Wrench, 
    color: 'teal',
    gradient: 'from-teal-500 to-teal-600',
    bgLight: 'bg-teal-500/10',
    textLight: 'text-teal-400',
    borderLight: 'border-teal-500/30',
    price: CURRENCY === 'FC' ? 'À partir de 4 500 000 FC' : 'À partir de 2 300 $',
    priceRange: CURRENCY === 'FC' ? '4.5M - 15M FC' : '2 300 - 7 500 $',
    popular: false,
    description: 'Solutions complètes pour l’aménagement et l’équipement de salles informatiques professionnelles.',
    features: [
      'Câblage structuré cuivre / fibre optique (jusqu’à 24 points)',
      'Baies de brassage et armoires serveur 19 pouces',
      'Postes de travail complets (PC, écrans, claviers, souris)',
      'Switch réseau PoE + routeur professionnel',
      'Onduleurs avec régulation de tension',
      'Système de refroidissement adapté (climatisation / ventilation)',
      'Mise en conformité électrique (prises, disjoncteurs, parafoudre)',
      'Support technique pendant 1 an'
    ],
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&h=500&fit=crop',
    bonus: '✅ Audit gratuit de la salle avant installation'
}
];

// Fonctionnalités communes pour la comparaison
const comparisonFeatures = [
  'Infrastructure réseau', 'Sécurité avancée', 'Application mobile',
  'ERP intégré', 'Support 24/7', 'Formation incluse', 'Maintenance', 'Cloud',
  'Vidéosurveillance', 'Climatisation', 'Énergie solaire'
];

const PackCard = ({ pack, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getPriceColor = (color) => {
    const colors = {
      blue: 'text-blue-400',
      cyan: 'text-cyan-400',
      amber: 'text-amber-400',
      orange: 'text-orange-400',
      green: 'text-green-400',
      purple: 'text-purple-400',
      teal: 'text-teal-400'
    };
    return colors[color] || 'text-blue-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative rounded-2xl overflow-hidden transition-all duration-500 ${
        pack.popular ? 'ring-2 ring-blue-500 shadow-xl shadow-blue-500/20' : ''
      }`}
    >
      {/* Image d'arrière-plan */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url('${pack.image}')` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60" />
      </div>

      {/* Badge populaire */}
      {pack.popular && (
        <div className="absolute top-4 right-4 z-20">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            ⭐ Populaire
          </div>
        </div>
      )}

      {/* Contenu */}
      <div className="relative z-10 p-8 backdrop-blur-sm bg-slate-950/40">
        {/* En-tête */}
        <div className="flex items-start justify-between mb-6">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pack.gradient} flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
            <pack.icon size={32} className="text-white" />
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${getPriceColor(pack.color)} font-syne`}>{pack.price}</div>
            <div className="text-gray-400 text-xs">{pack.priceRange}</div>
          </div>
        </div>

        {/* Titre et description */}
        <h3 className="text-2xl font-bold text-white mb-2 font-syne group-hover:text-blue-300 transition-colors">
          {pack.name}
        </h3>
        <p className="text-cyan-400 text-sm font-medium mb-3">{pack.tagline}</p>
        <p className="text-gray-300 text-sm leading-relaxed mb-6">{pack.description}</p>

        {/* Caractéristiques */}
        <div className="mb-6">
          <h4 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
            <CheckCircle size={16} className="text-emerald-400" />
            Ce que comprend ce pack :
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {pack.features.slice(0, 6).map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-400 text-sm">
                <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${pack.gradient}`} />
                {feature}
              </div>
            ))}
            {pack.features.length > 6 && (
              <div className="text-gray-500 text-xs mt-1">+{pack.features.length - 6} autres services</div>
            )}
          </div>
        </div>

        {/* Bonus */}
        <div className={`mb-6 p-3 rounded-xl ${pack.bgLight} border ${pack.borderLight}`}>
          <div className="flex items-center gap-2">
            <Sparkles size={16} className={pack.textLight} />
            <span className={`text-xs font-semibold ${pack.textLight}`}>🎁 Offre spéciale</span>
          </div>
          <p className="text-white text-sm mt-1">{pack.bonus}</p>
        </div>

        {/* Boutons d'action */}
        <div className="flex gap-3">
          <Link
            to="/demander-devis"
            className={`flex-1 text-center py-3 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r ${pack.gradient} text-white hover:shadow-lg hover:scale-105`}
          >
            Demander un devis
          </Link>
          <Link
            to="/contact"
            className="px-4 py-3 rounded-xl border border-white/30 text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            <Phone size={18} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// Carte de comparaison
const ComparisonCard = ({ pack, index }) => {
  const hasFeature = (feature) => {
    return pack.features.some(f => f.toLowerCase().includes(feature.toLowerCase()) || 
      (feature === 'Infrastructure réseau' && (f.includes('réseau') || f.includes('fibre'))) ||
      (feature === 'Sécurité avancée' && (f.includes('Sécurité') || f.includes('Firewall'))) ||
      (feature === 'Application mobile' && f.includes('mobile')) ||
      (feature === 'ERP intégré' && f.includes('ERP')) ||
      (feature === 'Support 24/7' && f.includes('Support')) ||
      (feature === 'Formation incluse' && f.includes('Formation')) ||
      (feature === 'Maintenance' && f.includes('Maintenance')) ||
      (feature === 'Cloud' && f.includes('cloud')) ||
      (feature === 'Vidéosurveillance' && (f.includes('Caméra') || f.includes('surveillance'))) ||
      (feature === 'Climatisation' && (f.includes('Climatisation') || f.includes('Climatiseur'))) ||
      (feature === 'Énergie solaire' && (f.includes('solaire') || f.includes('panneaux')))
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={`rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
        pack.popular ? 'ring-1 ring-blue-500/50' : ''
      }`}
    >
      <div className={`p-5 ${pack.bgLight} border-b ${pack.borderLight}`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${pack.gradient} flex items-center justify-center`}>
            <pack.icon size={18} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm font-syne">{pack.name}</h3>
            <p className="text-gray-400 text-xs">{pack.priceRange.split(' - ')[0]}</p>
          </div>
        </div>
      </div>
      <div className="p-4 bg-white/5 space-y-3">
        {comparisonFeatures.map((feature, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <span className="text-gray-400 text-xs">{feature}</span>
            {hasFeature(feature) ? (
              <CheckCircle size={14} className={`${pack.textLight}`} />
            ) : (
              <X size={14} className="text-gray-600" />
            )}
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-white/10">
        <Link
          to="/demander-devis"
          className={`block text-center py-2 rounded-xl text-xs font-semibold transition-all duration-300 bg-gradient-to-r ${pack.gradient} text-white hover:opacity-90`}
        >
          Demander un devis
        </Link>
      </div>
    </motion.div>
  );
};

const SolutionsPage = () => {
  return (
    <>
      <style>{globalStyles}</style>

      {/* Hero Section */}
{/* ==================== HERO SECTION - SOLUTIONS ==================== */}
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
        <span className="text-blue-300 font-semibold text-xs tracking-wide font-syne">Solutions clé en main</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight mb-5 font-syne"
      >
        Nos{' '}
        <span className="relative inline-block">
          <span className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 blur-2xl opacity-50" />
          <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400">
            Solutions
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
        Des packs complets et prêts à déployer pour <strong className="text-white">accélérer votre croissance</strong>
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="flex flex-wrap gap-4 justify-center"
      >
        <Link to="/contact" className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all hover:scale-105 hover:shadow-xl">
          Tous nos packs <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link to="/audit" className="group border-2 border-white/30 hover:border-white px-6 py-3 rounded-xl font-semibold text-white hover:bg-white/10 transition-all hover:scale-105">
          Audit gratuit <CheckCircle size={18} />
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

      {/* Pourquoi choisir nos packs */}
      <section className="py-16 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white font-syne mb-4">Pourquoi choisir nos packs ?</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: CheckCircle, title: 'Clé en main', desc: 'Solutions prêtes à déployer', color: 'text-blue-400' },
              { icon: Clock, title: 'Déploiement rapide', desc: 'Installation en quelques jours', color: 'text-cyan-400' },
              { icon: DollarSign, title: 'Tarifs transparents', desc: `Sans frais cachés (en ${CURRENCY})`, color: 'text-amber-400' },
              { icon: Headphones, title: 'Support inclus', desc: 'Assistance 24/7', color: 'text-emerald-400' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-6 rounded-xl bg-white/5 border border-white/10 transition-all duration-300 hover:scale-105 hover:bg-white/10"
              >
                <item.icon size={40} className={`mx-auto mb-3 ${item.color}`} />
                <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Grille des packs - Maintenant 7 packs */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {packs.map((pack, idx) => (
              <PackCard key={idx} pack={pack} index={idx} />
            ))}
          </div>
        </div>
      </div>

      {/* Comparaison des packs - Version Cartes */}
      <section className="py-16 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/5 border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-blue-600/15 border border-blue-500/30">
              <Layers size={14} className="text-blue-400" />
              <span className="text-blue-300 font-semibold text-xs tracking-wide font-syne">Comparaison</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-syne mb-4">Comparez nos packs</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto" />
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Trouvez la solution qui correspond le mieux à vos besoins avec notre tableau comparatif
            </p>
          </div>

          {/* Grille de cartes de comparaison - 7 cartes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {packs.map((pack, idx) => (
              <ComparisonCard key={idx} pack={pack} index={idx} />
            ))}
          </div>

          {/* Légende */}
          <div className="flex justify-center gap-6 mt-8 text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle size={14} className="text-emerald-400" />
              <span className="text-gray-400">Inclus</span>
            </div>
            <div className="flex items-center gap-2">
              <X size={14} className="text-gray-600" />
              <span className="text-gray-400">Non inclus</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Finale */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(59,130,246,0.3) 0%, transparent 50%)`
        }} />
        
        <div className="absolute w-96 h-96 bg-blue-600/20 bottom-0 left-1/2 -translate-x-1/2 rounded-full filter blur-[100px]" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6 text-amber-300 text-sm font-semibold">
              <Rocket size={16} /> Besoin d'un pack personnalisé ?
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-syne">Vous avez un besoin spécifique ?</h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Notre équipe peut créer un pack sur mesure adapté exactement à vos besoins et à votre budget.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-xl">
                Contactez-nous <ArrowRight size={18} />
              </Link>
              <Link to="/services" className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white px-8 py-4 rounded-xl font-semibold text-white hover:bg-white/10 transition-all hover:scale-105">
                Voir tous les services <ChevronRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default SolutionsPage;




import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import {
  ArrowRight, Server, Shield, Code, Cloud, Zap, GraduationCap,
  CheckCircle, Users, Clock, Award, Star, Quote, Briefcase, Globe,
  Cpu, Camera, Wifi, Wrench, Phone, ThermometerSun, Monitor,
  ChevronRight, Sparkles, TrendingUp, Rocket, TrendingDown, FileText,
  Lock, AlertTriangle, BarChart3, Mail, ShoppingBag, Database,
  Network, Eye, Fingerprint, Sun, Battery, Headphones, BookOpen
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

// Données des services par catégorie
const serviceCategories = [
  {
    id: 'reseau',
    name: 'Réseau & Infrastructure',
    icon: Network,
    color: 'blue',
    gradient: 'from-blue-500 to-blue-600',
    bgLight: 'bg-blue-500/10',
    textLight: 'text-blue-400',
    borderLight: 'border-blue-500/30',
    description: 'Des infrastructures réseau robustes et performantes pour connecter votre entreprise',
    services: [
      { name: 'Câblage structuré', description: 'Installation de câblage cuivre et fibre optique pour une infrastructure réseau fiable', price: 'Sur devis' },
      { name: 'WiFi entreprise', description: 'Solutions WiFi haute performance pour PME, grandes surfaces et espaces ouverts', price: 'Sur devis' },
      { name: 'Fibre optique', description: 'Déploiement de réseaux fibre optique pour une connectique ultra-rapide', price: 'Sur devis' },
      { name: 'Infrastructure réseau', description: 'Conception et déploiement d\'infrastructures réseau complètes', price: 'Sur devis' },
    ]
  },
  {
    id: 'securite',
    name: 'Sécurité & Surveillance',
    icon: Shield,
    color: 'cyan',
    gradient: 'from-cyan-500 to-cyan-600',
    bgLight: 'bg-cyan-500/10',
    textLight: 'text-cyan-400',
    borderLight: 'border-cyan-500/30',
    description: 'Protection avancée de vos données et surveillance intelligente de vos sites',
    services: [
      { name: 'Cybersécurité', description: 'Protection avancée contre les cyberattaques et les intrusions', price: 'Sur devis' },
      { name: 'Vidéosurveillance', description: 'Caméras IP, PTZ, enregistrement cloud et monitoring 24/7', price: 'Sur devis' },
      { name: 'Audit de sécurité', description: 'Analyse complète de vos vulnérabilités et recommandations', price: 'Sur devis' },
      { name: "Contrôle d'accès", description: 'Systèmes biométriques, badgeuses et gestion d\'accès', price: 'Sur devis' },
    ]
  },
  {
    id: 'developpement',
    name: 'Développement Digital',
    icon: Code,
    color: 'amber',
    gradient: 'from-amber-500 to-amber-600',
    bgLight: 'bg-amber-500/10',
    textLight: 'text-amber-400',
    borderLight: 'border-amber-500/30',
    description: 'Des solutions digitales sur mesure pour booster votre activité',
    services: [
      { name: 'Sites web & e-commerce', description: 'Création de sites vitrine, boutiques en ligne sur mesure', price: 'Sur devis' },
      { name: 'Applications mobiles', description: 'Développement iOS/Android, React Native, Flutter', price: 'Sur devis' },
      { name: 'ERP sur mesure', description: 'Solutions ERP adaptées à votre secteur d\'activité', price: 'Sur devis' },
      { name: 'API & intégrations', description: 'Création d\'API REST et intégration de services tiers', price: 'Sur devis' },
    ]
  },
  {
    id: 'cloud',
    name: 'Cloud & Hébergement',
    icon: Cloud,
    color: 'blue',
    gradient: 'from-blue-500 to-blue-600',
    bgLight: 'bg-blue-500/10',
    textLight: 'text-blue-400',
    borderLight: 'border-blue-500/30',
    description: 'Infrastructures cloud scalable et sécurisées pour votre entreprise',
    services: [
      { name: 'Hébergement cloud', description: 'Hébergement sécurisé haute disponibilité 99.9% uptime', price: 'Sur devis' },
      { name: 'Migration cloud', description: 'Migration de vos infrastructures vers le cloud', price: 'Sur devis' },
      { name: 'DevOps', description: 'CI/CD, conteneurisation Docker, orchestration Kubernetes', price: 'Sur devis' },
      { name: 'SaaS personnalisé', description: 'Développement de solutions SaaS clé en main', price: 'Sur devis' },
    ]
  },
  {
    id: 'energie',
    name: 'Énergie & Équipements',
    icon: Sun,
    color: 'orange',
    gradient: 'from-orange-500 to-orange-600',
    bgLight: 'bg-orange-500/10',
    textLight: 'text-orange-400',
    borderLight: 'border-orange-500/30',
    description: 'Solutions énergétiques durables et équipements haute performance',
    services: [
      { name: 'Panneaux solaires', description: 'Installation de systèmes photovoltaïques pour entreprises', price: 'Sur devis' },
      { name: 'Climatisation', description: 'Solutions de climatisation pour bureaux et data centers', price: 'Sur devis' },
      { name: 'Onduleurs & UPS', description: 'Protection électrique et alimentation de secours', price: 'Sur devis' },
      { name: 'Maintenance énergétique', description: 'Contrats de maintenance préventive et corrective', price: 'Sur devis' },
    ]
  },
  {
    id: 'materiel',
    name: 'Vente de Matériel',
    icon: Monitor,
    color: 'purple',
    gradient: 'from-purple-500 to-purple-600',
    bgLight: 'bg-purple-500/10',
    textLight: 'text-purple-400',
    borderLight: 'border-purple-500/30',
    description: 'Matériel IT professionnel des meilleures marques',
    services: [
      { name: 'Ordinateurs & serveurs', description: 'PC, laptops, serveurs haute performance', price: 'Sur devis' },
      { name: 'Équipements réseau', description: 'Switches, routeurs, firewalls, access points', price: 'Sur devis' },
      { name: 'Caméras de surveillance', description: 'Caméras IP, 4K, PTZ avec IA intégrée', price: 'Sur devis' },
      { name: 'Accessoires IT', description: 'Écrans, périphériques, câblage, connectiques', price: 'Sur devis' },
    ]
  },
  {
    id: 'formation',
    name: 'Formation & Accompagnement',
    icon: BookOpen,
    color: 'green',
    gradient: 'from-green-500 to-green-600',
    bgLight: 'bg-green-500/10',
    textLight: 'text-green-400',
    borderLight: 'border-green-500/30',
    description: 'Formation et support pour maîtriser vos outils digitaux',
    services: [
      { name: 'Formation IT', description: 'Formations certifiantes en développement, réseau, sécurité', price: 'Sur devis' },
      { name: 'Support technique', description: 'Assistance technique réactive 24/7', price: 'Sur devis' },
      { name: 'Accompagnement digital', description: 'Conseil et accompagnement dans votre transformation digitale', price: 'Sur devis' },
      { name: 'Maintenance', description: 'Contrats de maintenance pour vos équipements et logiciels', price: 'Sur devis' },
    ]
  }
];

const ServiceCard = ({ service, gradient, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500/50 hover:bg-white/10 cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110`}>
          <CheckCircle size={22} className="text-white" />
        </div>
        <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">{service.price}</span>
      </div>
      <h3 className="text-xl font-bold text-white mb-2 font-syne group-hover:text-blue-300 transition-colors">{service.name}</h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-5 group-hover:text-gray-300 transition-colors">{service.description}</p>
      <Link
        to="/demander-devis"
        className="inline-flex items-center gap-2 text-blue-400 text-sm font-semibold group-hover:text-blue-300 transition-all group-hover:gap-3"
      >
        Demander un devis <ArrowRight size={14} />
      </Link>
    </motion.div>
  );
};

const CategorySection = ({ category, index }) => {
  return (
    <section className="py-16 border-b border-white/10 last:border-0">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="mb-10"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-3">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${category.bgLight} ${category.textLight} transition-all duration-300 hover:scale-110`}>
                <category.icon size={28} />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white font-syne">{category.name}</h2>
                <div className={`w-12 h-0.5 bg-gradient-to-r ${category.gradient} rounded-full mt-2`} />
              </div>
            </div>
            <span className="text-sm text-gray-500">4 services disponibles</span>
          </div>
          <p className="text-gray-400 text-base max-w-3xl">{category.description}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {category.services.map((service, idx) => (
            <ServiceCard key={idx} service={service} gradient={category.gradient} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServicesPage = () => {
  return (
    <>
      <style>{globalStyles}</style>

      {/* Hero Section */}
     {/* ==================== HERO SECTION - SERVICES ==================== */}
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
         <span className="text-blue-300 font-semibold text-xs tracking-wide font-syne">Expertise & innovations ?</span>
       </motion.div>
 

       <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight mb-5 font-syne"
            >
        Nos{' '}
        <span className="relative inline-block">
          <span className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 blur-2xl opacity-50" />
          <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400">
            Services
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
        Des solutions complètes pour la <strong className="text-white">transformation digitale</strong> de votre entreprise
      </motion.p>

       <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-4 justify-center"
            >
        <Link to="/contact" className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all hover:scale-105 hover:shadow-xl">
                 Nous contacter <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
               </Link>
               <Link to="/realisations" className="group border-2 border-white/30 hover:border-white px-6 py-3 rounded-xl font-semibold text-white hover:bg-white/10 transition-all hover:scale-105">
                 Voir nos réalisations <CheckCircle size={18} />
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
       
      {/* Statistiques clés - Même fond que hero */}
      <section className="py-12 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/5 border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 transition-all duration-300 hover:scale-105 hover:bg-white/10">
              <div className="text-3xl font-bold text-blue-400 font-syne">7+</div>
              <div className="text-gray-400 text-sm">Catégories de services</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 transition-all duration-300 hover:scale-105 hover:bg-white/10">
              <div className="text-3xl font-bold text-cyan-400 font-syne">28+</div>
              <div className="text-gray-400 text-sm">Services proposés</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 transition-all duration-300 hover:scale-105 hover:bg-white/10">
              <div className="text-3xl font-bold text-amber-400 font-syne">150+</div>
              <div className="text-gray-400 text-sm">Clients satisfaits</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 transition-all duration-300 hover:scale-105 hover:bg-white/10">
              <div className="text-3xl font-bold text-emerald-400 font-syne">24/7</div>
              <div className="text-gray-400 text-sm">Support technique</div>
            </div>
          </div>
        </div>
      </section>

      {/* Catégories de services - Même fond que hero */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4 py-8">
          {/* Navigation rapide */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {serviceCategories.map((cat, idx) => (
              <a
                key={idx}
                href={`#${cat.id}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${cat.bgLight} ${cat.textLight} border ${cat.borderLight} hover:scale-105 hover:brightness-110`}
              >
                {cat.name}
              </a>
            ))}
          </div>

          {/* Sections des catégories */}
          {serviceCategories.map((category, idx) => (
            <div key={idx} id={category.id}>
              <CategorySection category={category} index={idx} />
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section - Même fond que hero */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/5">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(59,130,246,0.3) 0%, transparent 50%)`
        }} />
        
        <div className="absolute w-96 h-96 bg-blue-600/20 bottom-0 left-1/2 -translate-x-1/2 rounded-full filter blur-[100px]" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6 text-amber-300 text-sm font-semibold">
              <Rocket size={16} /> Besoin d'un service personnalisé ?
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-syne">Vous avez un projet spécifique ?</h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Notre équipe d'experts est à votre écoute pour étudier votre besoin et vous proposer une solution sur mesure.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-xl">
              Contactez-nous <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;



// Realisations.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  ArrowRight, CheckCircle, Rocket, Star, Calendar, MapPin, Briefcase, Clock,
  Eye, X, Search, Quote, ThumbsUp, Award, Users,
  Network, Shield, Code, Cloud, Sun, Monitor, BookOpen,
  Wifi, GraduationCap, Filter, ChevronRight, Heart, Headphones,
  Grid, Camera
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

// Données des projets (conservées et corrigées)
const projects = [
  // IT & Réseau -> catégorie 'reseau'
  {
    id: 1,
    title: 'Infrastructure réseau Groupe Congo Telecom',
    category: 'reseau',
    categoryName: 'Réseau & Télécom',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop',
    client: 'Groupe Congo Telecom',
    location: 'Kinshasa, RDC',
    year: '2024',
    duration: '6 semaines',
    description: 'Déploiement complet de l\'infrastructure réseau pour le siège social. Installation de switches Cisco, routeurs haute performance et WiFi 6 sur 5 étages.',
    fullDescription: `Le Groupe Congo Telecom, leader des télécommunications en RDC, nous a confié la modernisation complète de son infrastructure réseau.

**Défis techniques :**
- Connecter plus de 500 utilisateurs simultanément
- Assurer une redondance et une haute disponibilité
- Sécuriser les flux de données sensibles

**Solutions déployées :**
- Installation de 12 switches Cisco Catalyst 9300
- Déploiement de 35 points d'accès WiFi 6
- Configuration VLAN pour segmentation des services
- Mise en place d'un firewall Fortinet nouvelle génération
- Supervision réseau 24/7

**Résultats :**
- +200% de débit réseau
- 99.99% de disponibilité
- Réduction de 60% des incidents réseau`,
    technologies: ['Cisco', 'WiFi 6', 'Fortinet', 'VLAN', 'Fiber Optic'],
    testimonial: {
      author: 'Jean Mukendi',
      position: 'Directeur Technique',
      content: 'OMDEVE a réalisé un travail exceptionnel. Notre infrastructure réseau est désormais performante, sécurisée et fiable.',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    stats: [
      { label: 'Points d\'accès', value: '35' },
      { label: 'Utilisateurs', value: '500+' },
      { label: 'Uptime', value: '99.99%' }
    ]
  },
  {
    id: 2,
    title: 'Migration cloud Banque Internationale',
    category: 'cloud',
    categoryName: 'Cloud & Hébergement',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop',
    client: 'Banque Internationale',
    location: 'Lubumbashi, RDC',
    year: '2024',
    duration: '8 semaines',
    description: 'Migration complète de l\'infrastructure on-premise vers le cloud AWS pour une banque majeure.',
    fullDescription: `Migration complète de l'infrastructure de la Banque Internationale vers AWS Cloud.`,
    technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CloudFlare'],
    testimonial: {
      author: 'Marie Kalenga',
      position: 'Directrice des Systèmes d\'Information',
      content: 'La migration cloud a été réalisée sans aucune interruption de service.',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    stats: [
      { label: 'Serveurs migrés', value: '45' },
      { label: 'Temps d\'arrêt', value: '0h' },
      { label: 'Économies', value: '35%' }
    ]
  },
  // Digital -> catégorie 'developpement'
  {
    id: 3,
    title: 'Plateforme e-commerce AfricaMart',
    category: 'developpement',
    categoryName: 'Développement Digital',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&fit=crop',
    client: 'AfricaMart',
    location: 'Kinshasa, RDC',
    year: '2024',
    duration: '10 semaines',
    description: 'Développement d\'une plateforme e-commerce complète pour la vente de produits locaux et internationaux.',
    fullDescription: `AfricaMart est la première marketplace congolaise dédiée aux produits locaux et internationaux.`,
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redis'],
    testimonial: {
      author: 'Paul Mbemba',
      position: 'CEO, AfricaMart',
      content: 'Notre boutique en ligne a généré 5000 commandes dès le premier mois.',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
    stats: [
      { label: 'Commandes/mois', value: '5K+' },
      { label: 'Produits', value: '10K+' },
      { label: 'Conversion', value: '4.5%' }
    ]
  },
  {
    id: 4,
    title: 'Application mobile CongoRide',
    category: 'developpement',
    categoryName: 'Développement Digital',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop',
    client: 'CongoRide',
    location: 'Kinshasa, RDC',
    year: '2023',
    duration: '14 semaines',
    description: 'Application mobile de VTC et livraison avec géolocalisation temps réel.',
    fullDescription: `CongoRide est une application de VTC et livraison qui connecte les conducteurs et les passagers.`,
    technologies: ['React Native', 'Firebase', 'Google Maps API', 'Node.js'],
    testimonial: {
      author: 'Sarah Tshibola',
      position: 'Fondatrice, CongoRide',
      content: 'L\'application a été téléchargée plus de 50 000 fois.',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
    },
    stats: [
      { label: 'Téléchargements', value: '50K+' },
      { label: 'Conducteurs', value: '1500+' },
      { label: 'Courses/jour', value: '2000+' }
    ]
  },
  // Énergie -> catégorie 'energie'
  {
    id: 5,
    title: 'Installation solaire Minoterie Kisantu',
    category: 'energie',
    categoryName: 'Énergie',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=500&fit=crop',
    client: 'Minoterie Kisantu',
    location: 'Kisantu, RDC',
    year: '2024',
    duration: '3 semaines',
    description: 'Installation de 150 kWc de panneaux photovoltaïques pour une minoterie industrielle.',
    fullDescription: `Installation de 150 kWc de panneaux solaires pour alimenter la minoterie Kisantu.`,
    technologies: ['Panneaux monocristallins', 'Onduleurs SMA', 'Batteries lithium', 'Monitoring IoT'],
    testimonial: {
      author: 'Joseph Nzita',
      position: 'Directeur, Minoterie Kisantu',
      content: 'Notre facture d\'électricité a diminué de 65% !',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
    },
    stats: [
      { label: 'Puissance', value: '150 kWc' },
      { label: 'Production/an', value: '220 MWh' },
      { label: 'CO2 évité', value: '95 tonnes' }
    ]
  },
  {
    id: 6,
    title: 'Installation climatisation Hôtel Memling',
    category: 'energie',
    categoryName: 'Énergie',
    image: 'https://images.unsplash.com/photo-1626178793926-22b28830aa30?w=800&h=500&fit=crop',
    client: 'Hôtel Memling',
    location: 'Kinshasa, RDC',
    year: '2024',
    duration: '4 semaines',
    description: 'Installation de climatisation split system pour 120 chambres d\'hôtel.',
    fullDescription: `Installation complète de climatisation réversible pour l'Hôtel Memling.`,
    technologies: ['Daikin', 'Split system', 'Thermostats connectés', 'Maintenance planifiée'],
    testimonial: {
      author: 'Pierre Delacroix',
      position: 'Directeur, Hôtel Memling',
      content: 'Le confort de nos clients s\'est considérablement amélioré.',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/men/6.jpg'
    },
    stats: [
      { label: 'Unités installées', value: '120' },
      { label: 'Économie énergie', value: '30%' },
      { label: 'Délai', value: '4 semaines' }
    ]
  },
  // Sécurité -> catégorie 'securite'
  {
    id: 7,
    title: 'Vidéosurveillance Aéroport Ndjili',
    category: 'securite',
    categoryName: 'Sécurité & Surveillance',
    image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=800&h=500&fit=crop',
    client: 'Régie des Voies Aériennes',
    location: 'Kinshasa, RDC',
    year: '2024',
    duration: '6 semaines',
    description: 'Installation d\'un système de vidéosurveillance IP avec 200 caméras 4K.',
    fullDescription: `Déploiement d'un système de vidéosurveillance complet pour l'aéroport international de Ndjili.`,
    technologies: ['Caméras Hikvision 4K', 'NVR 64 canaux', 'Stockage 30 jours', 'Accès mobile'],
    testimonial: {
      author: 'Général Kabila',
      position: 'Directeur Sécurité Aéroportuaire',
      content: 'La sécurité de l\'aéroport a été considérablement renforcée.',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg'
    },
    stats: [
      { label: 'Caméras', value: '200+' },
      { label: 'Couverture', value: '100%' },
      { label: 'Stockage', value: '30 jours' }
    ]
  },
  {
    id: 8,
    title: 'Cybersécurité Société Générale',
    category: 'securite',
    categoryName: 'Sécurité & Surveillance',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=500&fit=crop',
    client: 'Société Générale RDC',
    location: 'Kinshasa, RDC',
    year: '2024',
    duration: '4 semaines',
    description: 'Audit de cybersécurité et mise en place d\'un SOC interne.',
    fullDescription: `Audit complet et déploiement d'un Security Operations Center.`,
    technologies: ['Fortinet', 'CrowdStrike', 'Splunk', 'EDR', 'MFA'],
    testimonial: {
      author: 'Marc Lumbala',
      position: 'RSSI, Société Générale',
      content: 'Aucune faille critique détectée après l\'audit.',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/men/8.jpg'
    },
    stats: [
      { label: 'Vulnérabilités', value: '0 critique' },
      { label: 'Conformité', value: '100%' },
      { label: 'Temps réponse', value: '< 15min' }
    ]
  },
  // Formation -> catégorie 'formation'
  {
    id: 9,
    title: 'Certification IT 500 employés',
    category: 'formation',
    categoryName: 'Formation & Accompagnement',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop',
    client: 'Ministère du Numérique',
    location: 'Kinshasa, RDC',
    year: '2024',
    duration: '6 mois',
    description: 'Programme de certification pour 500 agents publics en bureautique et cybersécurité.',
    fullDescription: `Programme de formation massif pour certifier 500 agents du Ministère du Numérique.`,
    technologies: ['Microsoft Office', 'Cybersécurité', 'Administration réseau', 'E-learning'],
    testimonial: {
      author: 'Aline Kabamba',
      position: 'Secrétaire Générale',
      content: 'Le taux de certification a atteint 92%. Un projet d\'envergure parfaitement exécuté.',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/women/9.jpg'
    },
    stats: [
      { label: 'Apprenants', value: '500' },
      { label: 'Certifiés', value: '92%' },
      { label: 'Satisfaction', value: '4.8/5' }
    ]
  },
  {
    id: 10,
    title: 'Lab IoT Université Kinshasa',
    category: 'formation',
    categoryName: 'Formation & Accompagnement',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=500&fit=crop',
    client: 'Université de Kinshasa',
    location: 'Kinshasa, RDC',
    year: '2024',
    duration: '3 mois',
    description: 'Mise en place d\'un laboratoire IoT et formation des enseignants.',
    fullDescription: `Création d'un laboratoire IoT et formation des enseignants.`,
    technologies: ['Arduino', 'Raspberry Pi', 'Capteurs IoT', 'Python'],
    testimonial: {
      author: 'Prof. Mbungu',
      position: 'Doyen, Faculté des Sciences',
      content: 'Nos étudiants peuvent désormais se former aux technologies de pointe.',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/men/10.jpg'
    },
    stats: [
      { label: 'Étudiants formés', value: '200+' },
      { label: 'Projets réalisés', value: '35' },
      { label: 'Lab fonctionnel', value: '24/7' }
    ]
  }
];

// Catégories
const categories = [
  { id: 'all', name: 'Tous', icon: CheckCircle, gradient: 'from-gray-500 to-gray-600', bgLight: 'bg-gray-500/10', textLight: 'text-gray-400', borderLight: 'border-gray-500/30' },
  { id: 'reseau', name: 'Réseau & Télécom', icon: Network, gradient: 'from-blue-500 to-blue-600', bgLight: 'bg-blue-500/10', textLight: 'text-blue-400', borderLight: 'border-blue-500/30' },
  { id: 'securite', name: 'Sécurité & Surveillance', icon: Shield, gradient: 'from-cyan-500 to-cyan-600', bgLight: 'bg-cyan-500/10', textLight: 'text-cyan-400', borderLight: 'border-cyan-500/30' },
  { id: 'developpement', name: 'Développement Digital', icon: Code, gradient: 'from-amber-500 to-amber-600', bgLight: 'bg-amber-500/10', textLight: 'text-amber-400', borderLight: 'border-amber-500/30' },
  { id: 'cloud', name: 'Cloud & Hébergement', icon: Cloud, gradient: 'from-blue-500 to-blue-600', bgLight: 'bg-blue-500/10', textLight: 'text-blue-400', borderLight: 'border-blue-500/30' },
  { id: 'energie', name: 'Énergie', icon: Sun, gradient: 'from-orange-500 to-orange-600', bgLight: 'bg-orange-500/10', textLight: 'text-orange-400', borderLight: 'border-orange-500/30' },
  { id: 'formation', name: 'Formation & Accompagnement', icon: BookOpen, gradient: 'from-green-500 to-green-600', bgLight: 'bg-green-500/10', textLight: 'text-green-400', borderLight: 'border-green-500/30' }
];

const ProjectCard = ({ project, index, onOpenModal }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cat = categories.find(c => c.id === project.category) || categories[0];

  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpenModal(project)}
      className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500/50 hover:bg-white/10 cursor-pointer"
    >
      <div className="relative overflow-hidden h-56">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${cat.gradient} text-white shadow-lg`}>
            {project.categoryName}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="px-2 py-1 rounded-full bg-black/50 text-white text-xs flex items-center gap-1 backdrop-blur-sm">
            <Calendar size={12} /> {project.year}
          </span>
        </div>
        <div className={`absolute inset-0 bg-blue-600/30 flex items-center justify-center transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="bg-white text-blue-600 p-3 rounded-full hover:scale-110 transition-transform">
            <Eye size={24} />
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white font-syne mb-2 group-hover:text-blue-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.technologies.slice(0, 3).map((tech, i) => (
            <span key={i} className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-full">
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-full">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <MapPin size={12} />
            <span>{project.location}</span>
          </div>
          <div className="flex items-center gap-1 text-amber-400">
            <Star size={14} fill="currentColor" />
            <span className="text-xs font-semibold">{project.testimonial.rating}.0</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Composant Download (factice)
const Download = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" x2="12" y1="15" y2="3"/>
  </svg>
);

const RealisationsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filteredProjects = projects.filter(project => {
    const matchesFilter = activeFilter === 'all' || project.category === activeFilter;
    const matchesSearch = searchTerm === '' || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const openModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  const stats = [
    { value: '120+', label: 'Projets réalisés', icon: Briefcase },
    { value: '95+', label: 'Clients satisfaits', icon: Users },
    { value: '8+', label: "Années d'expérience", icon: Award },
    { value: '98%', label: 'Taux de satisfaction', icon: ThumbsUp }
  ];

  // Images pour la galerie (utilisation des 5 premières images des projets)
  const galleryImages = projects.slice(0, 5).map(p => p.image);
  const mainImage = galleryImages[0];
  const thumbnails = galleryImages.slice(1, 5);

  return (
    <>
      <style>{globalStyles}</style>

      {/* Hero Section */}
     {/* ==================== HERO SECTION - RÉALISATIONS ==================== */}

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
        <span className="text-blue-300 font-semibold text-xs tracking-wide font-syne">Contactez-nous</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight mb-5 font-syne"
      >
        Nos{' '}
        <span className="relative inline-block">
          <span className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 blur-2xl opacity-50" />
          <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400">
           Réalisations
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
        Découvrez des projets concrets qui ont transformé nos clients en <strong className="text-white">clients en leaders de leur secteur</strong>
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="flex flex-wrap gap-4 justify-center"
      >
        <Link to="/contact" className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all hover:scale-105 hover:shadow-xl">
          Nous écrire <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link to="/audit" className="group border-2 border-white/30 hover:border-white px-6 py-3 rounded-xl font-semibold text-white hover:bg-white/10 transition-all hover:scale-105">
          Audit gratuit <CheckCircle size={18} />
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





































































      {/* Statistiques clés */}
      <section className="py-12 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/5 border-b border-white/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          >
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div key={idx} variants={fadeUp} className="p-4 rounded-xl bg-white/5 border border-white/10 transition-all duration-300 hover:scale-105 hover:bg-white/10">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Icon size={24} className="text-blue-400" />
                  </div>
                  <div className="text-3xl font-bold text-blue-400 font-syne">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Filtres et recherche */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 sticky top-0 z-40 py-4 border-b border-white/10 backdrop-blur-xl bg-opacity-80">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveFilter(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                      activeFilter === cat.id
                        ? `bg-gradient-to-r ${cat.gradient} text-white shadow-lg`
                        : `${cat.bgLight} ${cat.textLight} border ${cat.borderLight} hover:scale-105 hover:brightness-110`
                    }`}
                  >
                    <Icon size={16} />
                    {cat.name}
                  </button>
                );
              })}
            </div>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un projet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-2 rounded-full text-sm bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Grille des projets */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4 py-12">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                <Search size={40} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Aucun projet trouvé</h3>
              <p className="text-gray-400">Aucun projet ne correspond à vos critères de recherche.</p>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, idx) => (
                <ProjectCard key={project.id} project={project} index={idx} onOpenModal={openModal} />
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Modal Détails Projet */}
      {showModal && selectedProject && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={closeModal}>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-64 md:h-80">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover rounded-t-2xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent rounded-t-2xl"></div>
              <button onClick={closeModal} className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm rounded-full p-2 hover:bg-white/20 transition">
                <X size={24} className="text-white" />
              </button>
              <div className="absolute bottom-6 left-6">
                <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${categories.find(c => c.id === selectedProject.category)?.gradient} text-white shadow-lg`}>
                  {selectedProject.categoryName}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white mt-2">{selectedProject.title}</h2>
                <p className="text-gray-300">{selectedProject.client}</p>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h3 className="text-xl font-bold text-white mb-4">Description du projet</h3>
                  <div className="text-gray-300 whitespace-pre-line mb-6 leading-relaxed">
                    {selectedProject.fullDescription}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Technologies utilisées</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.technologies.map((tech, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-white/10 text-gray-300 rounded-lg text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Résultats clés</h3>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {selectedProject.stats.map((stat, idx) => (
                      <div key={idx} className="text-center p-3 bg-white/5 rounded-xl border border-white/10">
                        <div className="text-2xl font-bold text-blue-400">{stat.value}</div>
                        <div className="text-xs text-gray-400">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="bg-white/5 rounded-xl p-5 mb-6 border border-white/10">
                    <h3 className="font-bold text-white mb-4">Informations client</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Briefcase size={16} className="text-blue-400" />
                        <span>{selectedProject.client}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <MapPin size={16} className="text-blue-400" />
                        <span>{selectedProject.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Calendar size={16} className="text-blue-400" />
                        <span>{selectedProject.year}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Clock size={16} className="text-blue-400" />
                        <span>Durée: {selectedProject.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-xl p-5 border border-blue-500/20">
                    <div className="flex items-center gap-2 mb-3">
                      <Quote size={18} className="text-blue-400" />
                      <h3 className="font-bold text-white">Témoignage client</h3>
                    </div>
                    <p className="text-gray-300 text-sm italic mb-4">"{selectedProject.testimonial.content}"</p>
                    <div className="flex items-center gap-3">
                      <img src={selectedProject.testimonial.avatar} alt={selectedProject.testimonial.author} className="w-10 h-10 rounded-full object-cover border border-blue-500" />
                      <div>
                        <div className="font-semibold text-white text-sm">{selectedProject.testimonial.author}</div>
                        <div className="text-xs text-gray-400">{selectedProject.testimonial.position}</div>
                        <div className="flex gap-0.5 mt-1">
                          {[...Array(selectedProject.testimonial.rating)].map((_, i) => (
                            <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-white/10">
                <Link to="/contact" className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all flex items-center gap-2">
                  Demander un projet similaire <ArrowRight size={18} />
                </Link>
                <button className="border border-white/20 text-gray-300 px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all flex items-center gap-2">
                  Télécharger l'étude de cas <Download size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========== NOUVELLE SECTION : GALERIE D'IMAGES (1 droite, 4 gauche) ========== */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-4">
              <Camera size={16} className="text-blue-400" />
              <span className="text-blue-300 text-sm font-semibold">Notre galerie</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-syne mb-3">
              Dernières réalisations en images
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Découvrez en un coup d’œil la qualité de nos interventions.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-6 items-stretch">
            {/* Gauche : grille 2x2 de 4 images */}
            <div className="lg:w-1/2">
              <div className="grid grid-cols-2 gap-4 h-full">
                {thumbnails.map((img, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative group overflow-hidden rounded-2xl aspect-square cursor-pointer"
                    onClick={() => window.open(img, '_blank')}
                  >
                    <img
                      src={img}
                      alt={`Galerie ${idx + 2}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
                      <Eye size={20} className="text-white" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Droite : grande image principale */}
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative group overflow-hidden rounded-2xl h-full min-h-[300px] lg:min-h-full cursor-pointer"
                onClick={() => window.open(mainImage, '_blank')}
              >
                <img
                  src={mainImage}
                  alt="Galerie principale"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-6">
                  <div className="flex items-center gap-2 text-white">
                    <Eye size={24} />
                    <span className="font-semibold">Voir en grand</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Boutons de la galerie */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mt-10"
          >
            <button className="group bg-white/10 border border-white/20 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all hover:scale-105">
              <Grid size={18} />
              Voir toute la galerie
            </button>
            <Link
              to="/contact"
              className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all hover:scale-105"
            >
              Demander un devis
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>




            {/* SECTION CTA DOUBLE : les deux blocs en parallèle */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        {/* Arrière-plan commun */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(59,130,246,0.3) 0%, transparent 50%)`
        }} />
        <div className="absolute w-96 h-96 bg-blue-600/20 bottom-0 left-1/2 -translate-x-1/2 rounded-full filter blur-[100px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
            
            {/* Bloc CTA gauche : Construisons ensemble votre succès */}
            <div className="flex-1 bg-gradient-to-br from-slate-900/50 via-blue-900/30 to-indigo-900/30 rounded-2xl border border-white/10 backdrop-blur-sm p-8 md:p-10 transition-all duration-300 hover:shadow-2xl hover:border-blue-500/30">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6 text-amber-300 text-sm font-semibold">
                  <Rocket size={16} /> Prêt à transformer vos idées ?
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 font-syne">
                  Construisons ensemble votre succès
                </h2>
                <p className="text-white/80 text-base md:text-lg mb-8 max-w-md mx-auto">
                  Profitez d’un accompagnement sur-mesure et de solutions innovantes adaptées à votre secteur.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-xl"
                  >
                    Devenir partenaire <ArrowRight size={18} />
                  </Link>
                  <Link
                    to="/audit"
                    className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 hover:bg-white/10"
                  >
                    Audit gratuit <CheckCircle size={18} />
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Bloc CTA droite : Vous avez un projet similaire ? */}
            <div className="flex-1 bg-gradient-to-br from-slate-900/50 via-indigo-900/30 to-blue-900/30 rounded-2xl border border-white/10 backdrop-blur-sm p-8 md:p-10 transition-all duration-300 hover:shadow-2xl hover:border-amber-500/30">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6 text-amber-300 text-sm font-semibold">
                  <Rocket size={16} /> Vous avez un projet similaire ?
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 font-syne">
                  Prêt à donner vie à votre projet ?
                </h2>
                <p className="text-white/80 text-base md:text-lg mb-8 max-w-md mx-auto">
                  Contactez-nous pour discuter de votre besoin et obtenir un devis personnalisé.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-xl"
                >
                  Contactez-nous <ArrowRight size={18} />
                </Link>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default RealisationsPage;



import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Calendar, Clock, User, Search, X,
  BookOpen, TrendingUp, ChevronRight, ChevronLeft
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

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  // Données des articles (avec slug)
  const articles = [
    {
      id: 1,
      slug: "securiser-reseau-entreprise-2026",
      title: "Comment sécuriser votre réseau d'entreprise en 2026 : Guide complet",
      excerpt: "Découvrez les meilleures pratiques et outils pour protéger votre infrastructure réseau contre les cybermenaces actuelles.",
      category: "Cybersécurité",
      date: "2026-03-28",
      readTime: "8 min",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=500&fit=crop",
      author: "Jean Meya",
      tags: ["sécurité", "réseau", "firewall"]
    },
    {
      id: 2,
      slug: "panneaux-solaires-rdc-rentabilite",
      title: "Installation de panneaux solaires en RDC : Rentabilité et retour sur investissement",
      excerpt: "Analyse détaillée des coûts, avantages et retour sur investissement des systèmes photovoltaïques en milieu congolais.",
      category: "Énergie",
      date: "2026-03-25",
      readTime: "12 min",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=500&fit=crop",
      author: "Dr. Amina Kabongo",
      tags: ["solaire", "énergie", "RDC"]
    },
    {
      id: 3,
      slug: "erp-sur-mesure-avantages-2026",
      title: "Pourquoi passer à un ERP sur mesure en 2026 ? Avantages et cas d'usage",
      excerpt: "Comment un ERP personnalisé peut transformer la gestion de votre entreprise au Congo.",
      category: "Digital",
      date: "2026-03-20",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
      author: "Meya Dorodoro",
      tags: ["ERP", "gestion", "digitalisation"]
    },
    {
      id: 4,
      slug: "formation-cybersecurite-indispensable",
      title: "Formation cybersécurité : Pourquoi c'est devenu indispensable pour vos équipes",
      excerpt: "Les formations en cybersécurité réduisent de 70% les risques d'attaques humaines.",
      category: "Formation",
      date: "2026-03-15",
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop",
      author: "Sarah Nsimba",
      tags: ["formation", "cybersécurité"]
    },
    {
      id: 5,
      slug: "wifi-professionnel-erreurs-eviter",
      title: "Déploiement WiFi professionnel : Erreurs à éviter en entreprise",
      excerpt: "Guide pratique pour une couverture WiFi optimale et sécurisée dans vos locaux.",
      category: "Réseau",
      date: "2026-03-10",
      readTime: "7 min",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=500&fit=crop",
      author: "Paul Kabila",
      tags: ["wifi", "réseau"]
    },
    {
      id: 6,
      slug: "cloud-hybride-avantages-entreprises",
      title: "Cloud hybride : l'avenir des entreprises africaines",
      excerpt: "Découvrez comment le cloud hybride combine flexibilité et sécurité pour les entreprises en Afrique.",
      category: "Cloud",
      date: "2026-03-05",
      readTime: "9 min",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop",
      author: "Claire Mbenza",
      tags: ["cloud", "hybride", "stockage"]
    }
  ];

  const categories = ['Tous', 'Cybersécurité', 'Énergie', 'Digital', 'Formation', 'Réseau', 'Cloud'];

  // Filtrage
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + articlesPerPage);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <style>{globalStyles}</style>




      {/* Hero Section - Blog */}
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
        Blog{' '}
        <span className="relative inline-block">
          <span className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 blur-2xl opacity-50" />
          <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400">
            OMDEVE
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
        Découvrez nos articles sur la digitalisation, la cybersécurité, l'énergie solaire
        et les meilleures pratiques IT en Afrique Centrale.
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
          Voir nos tarifs <ChevronRight size={18} />
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






      {/* Filtres et recherche */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 sticky top-0 z-40 py-4 border-b border-white/10 backdrop-blur-xl bg-opacity-80">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
            <div className="relative w-full lg:w-96">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="w-full pl-9 pr-3 py-2 rounded-full text-sm bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
              {searchTerm && (
                <button onClick={() => { setSearchTerm(''); setCurrentPage(1); }} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
                  <X size={14} />
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                      : 'bg-white/10 text-gray-300 border border-white/20 hover:bg-white/20 hover:scale-105'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grille des articles */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white font-syne">
              {selectedCategory === 'Tous' ? 'Tous les articles' : selectedCategory}
            </h2>
            <p className="text-gray-400 text-sm">{filteredArticles.length} article{filteredArticles.length > 1 ? 's' : ''}</p>
          </div>

          {paginatedArticles.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                <Search size={40} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Aucun article trouvé</h3>
              <p className="text-gray-400">Aucun article ne correspond à vos critères de recherche.</p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedCategory('Tous'); setCurrentPage(1); }}
                className="mt-6 text-blue-400 hover:text-blue-300 underline"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {paginatedArticles.map((article) => (
                  <motion.div
                    key={article.id}
                    variants={fadeUp}
                    className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500/50 hover:bg-white/10"
                  >
                    <Link to={`/blog/${article.slug}`} className="block">
                      <div className="relative overflow-hidden h-56">
                        <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
                            {article.category}
                          </span>
                        </div>
                        <div className="absolute top-4 right-4">
                          <span className="px-2 py-1 rounded-full bg-black/50 text-white text-xs flex items-center gap-1 backdrop-blur-sm">
                            <Clock size={12} /> {article.readTime}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar size={12} />
                            <span>{new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User size={12} />
                            <span>{article.author}</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-white font-syne mb-3 group-hover:text-blue-300 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                          {article.excerpt}
                        </p>
                        <div className="mt-4 flex items-center text-blue-400 text-sm font-medium">
                          Lire la suite <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12 gap-2">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg bg-white/10 border border-white/20 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/20 transition"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToPage(i + 1)}
                      className={`px-4 py-2 rounded-lg font-medium transition ${
                        currentPage === i + 1
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                          : 'bg-white/10 border border-white/20 hover:bg-white/20'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg bg-white/10 border border-white/20 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/20 transition"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

           {/* Section double : Newsletter + CTA côte à côte */}
           {/* Section double : Newsletter + CTA sous forme de cartes */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/5 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Carte Newsletter - à gauche */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/50"
            >
              {/* Effet de lueur au survol */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/0 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:from-blue-500/5 group-hover:via-blue-500/10 group-hover:to-blue-500/5 pointer-events-none" />
              
              <div className="relative z-10 text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6 group-hover:bg-white/15 transition-all">
                  <TrendingUp size={16} className="text-blue-400" />
                  <span className="text-blue-300 text-sm font-semibold">Ne rien manquer</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white font-syne mb-4">Restez informé</h2>
                <p className="text-gray-300 mb-8 max-w-md mx-auto md:mx-0">
                  Recevez nos meilleurs articles et conseils technologiques directement dans votre boîte mail.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto md:mx-0">
                  <input
                    type="email"
                    placeholder="Votre adresse email"
                    className="flex-1 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all group-hover:bg-white/15"
                  />
                  <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-lg">
                    S'abonner
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-4">Nous respectons votre vie privée. Désabonnement en 1 clic.</p>
              </div>
            </motion.div>

            {/* Carte CTA - à droite */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/50 text-center md:text-right"
            >
              {/* Effet de lueur au survol */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/0 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:from-blue-500/5 group-hover:via-blue-500/10 group-hover:to-blue-500/5 pointer-events-none" />
              
              {/* Effet radial décoratif (plus discret) */}
              <div className="absolute inset-0 opacity-30 rounded-2xl -z-10" style={{
                backgroundImage: `radial-gradient(circle at 70% 30%, rgba(59,130,246,0.4) 0%, transparent 60%)`
              }} />
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-syne">
                  Vous avez un projet ?
                </h2>
                <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto md:ml-auto md:mr-0">
                  Discutons de vos besoins et trouvons ensemble la solution la plus adaptée.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-xl group-hover:shadow-blue-500/30"
                >
                  Prendre rendez-vous <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;








import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Calendar, Clock, User, Search, X,
  BookOpen, TrendingUp, ChevronRight, ChevronLeft
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

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  // Données des articles (avec slug)
  const articles = [
    {
      id: 1,
      slug: "securiser-reseau-entreprise-2026",
      title: "Comment sécuriser votre réseau d'entreprise en 2026 : Guide complet",
      excerpt: "Découvrez les meilleures pratiques et outils pour protéger votre infrastructure réseau contre les cybermenaces actuelles.",
      category: "Cybersécurité",
      date: "2026-03-28",
      readTime: "8 min",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=500&fit=crop",
      author: "Jean Meya",
      tags: ["sécurité", "réseau", "firewall"]
    },
    {
      id: 2,
      slug: "panneaux-solaires-rdc-rentabilite",
      title: "Installation de panneaux solaires en RDC : Rentabilité et retour sur investissement",
      excerpt: "Analyse détaillée des coûts, avantages et retour sur investissement des systèmes photovoltaïques en milieu congolais.",
      category: "Énergie",
      date: "2026-03-25",
      readTime: "12 min",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=500&fit=crop",
      author: "Dr. Amina Kabongo",
      tags: ["solaire", "énergie", "RDC"]
    },
    {
      id: 3,
      slug: "erp-sur-mesure-avantages-2026",
      title: "Pourquoi passer à un ERP sur mesure en 2026 ? Avantages et cas d'usage",
      excerpt: "Comment un ERP personnalisé peut transformer la gestion de votre entreprise au Congo.",
      category: "Digital",
      date: "2026-03-20",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
      author: "Meya Dorodoro",
      tags: ["ERP", "gestion", "digitalisation"]
    },
    {
      id: 4,
      slug: "formation-cybersecurite-indispensable",
      title: "Formation cybersécurité : Pourquoi c'est devenu indispensable pour vos équipes",
      excerpt: "Les formations en cybersécurité réduisent de 70% les risques d'attaques humaines.",
      category: "Formation",
      date: "2026-03-15",
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop",
      author: "Sarah Nsimba",
      tags: ["formation", "cybersécurité"]
    },
    {
      id: 5,
      slug: "wifi-professionnel-erreurs-eviter",
      title: "Déploiement WiFi professionnel : Erreurs à éviter en entreprise",
      excerpt: "Guide pratique pour une couverture WiFi optimale et sécurisée dans vos locaux.",
      category: "Réseau",
      date: "2026-03-10",
      readTime: "7 min",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=500&fit=crop",
      author: "Paul Kabila",
      tags: ["wifi", "réseau"]
    },
    {
      id: 6,
      slug: "cloud-hybride-avantages-entreprises",
      title: "Cloud hybride : l'avenir des entreprises africaines",
      excerpt: "Découvrez comment le cloud hybride combine flexibilité et sécurité pour les entreprises en Afrique.",
      category: "Cloud",
      date: "2026-03-05",
      readTime: "9 min",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop",
      author: "Claire Mbenza",
      tags: ["cloud", "hybride", "stockage"]
    }
  ];

  const categories = ['Tous', 'Cybersécurité', 'Énergie', 'Digital', 'Formation', 'Réseau', 'Cloud'];

  // Filtrage
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + articlesPerPage);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <style>{globalStyles}</style>




      {/* Hero Section - Blog */}
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
        Blog{' '}
        <span className="relative inline-block">
          <span className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 blur-2xl opacity-50" />
          <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400">
            OMDEVE
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
        Découvrez nos articles sur la digitalisation, la cybersécurité, l'énergie solaire
        et les meilleures pratiques IT en Afrique Centrale.
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
          Voir nos tarifs <ChevronRight size={18} />
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






      {/* Filtres et recherche */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 sticky top-0 z-40 py-4 border-b border-white/10 backdrop-blur-xl bg-opacity-80">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
            <div className="relative w-full lg:w-96">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="w-full pl-9 pr-3 py-2 rounded-full text-sm bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
              {searchTerm && (
                <button onClick={() => { setSearchTerm(''); setCurrentPage(1); }} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
                  <X size={14} />
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                      : 'bg-white/10 text-gray-300 border border-white/20 hover:bg-white/20 hover:scale-105'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grille des articles */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white font-syne">
              {selectedCategory === 'Tous' ? 'Tous les articles' : selectedCategory}
            </h2>
            <p className="text-gray-400 text-sm">{filteredArticles.length} article{filteredArticles.length > 1 ? 's' : ''}</p>
          </div>

          {paginatedArticles.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                <Search size={40} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Aucun article trouvé</h3>
              <p className="text-gray-400">Aucun article ne correspond à vos critères de recherche.</p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedCategory('Tous'); setCurrentPage(1); }}
                className="mt-6 text-blue-400 hover:text-blue-300 underline"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {paginatedArticles.map((article) => (
                  <motion.div
                    key={article.id}
                    variants={fadeUp}
                    className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500/50 hover:bg-white/10"
                  >
                    <Link to={`/blog/${article.slug}`} className="block">
                      <div className="relative overflow-hidden h-56">
                        <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
                            {article.category}
                          </span>
                        </div>
                        <div className="absolute top-4 right-4">
                          <span className="px-2 py-1 rounded-full bg-black/50 text-white text-xs flex items-center gap-1 backdrop-blur-sm">
                            <Clock size={12} /> {article.readTime}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar size={12} />
                            <span>{new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User size={12} />
                            <span>{article.author}</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-white font-syne mb-3 group-hover:text-blue-300 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                          {article.excerpt}
                        </p>
                        <div className="mt-4 flex items-center text-blue-400 text-sm font-medium">
                          Lire la suite <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12 gap-2">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg bg-white/10 border border-white/20 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/20 transition"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToPage(i + 1)}
                      className={`px-4 py-2 rounded-lg font-medium transition ${
                        currentPage === i + 1
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                          : 'bg-white/10 border border-white/20 hover:bg-white/20'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg bg-white/10 border border-white/20 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/20 transition"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

           {/* Section double : Newsletter + CTA côte à côte */}
           {/* Section double : Newsletter + CTA sous forme de cartes */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/5 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Carte Newsletter - à gauche */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/50"
            >
              {/* Effet de lueur au survol */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/0 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:from-blue-500/5 group-hover:via-blue-500/10 group-hover:to-blue-500/5 pointer-events-none" />
              
              <div className="relative z-10 text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6 group-hover:bg-white/15 transition-all">
                  <TrendingUp size={16} className="text-blue-400" />
                  <span className="text-blue-300 text-sm font-semibold">Ne rien manquer</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white font-syne mb-4">Restez informé</h2>
                <p className="text-gray-300 mb-8 max-w-md mx-auto md:mx-0">
                  Recevez nos meilleurs articles et conseils technologiques directement dans votre boîte mail.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto md:mx-0">
                  <input
                    type="email"
                    placeholder="Votre adresse email"
                    className="flex-1 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all group-hover:bg-white/15"
                  />
                  <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-lg">
                    S'abonner
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-4">Nous respectons votre vie privée. Désabonnement en 1 clic.</p>
              </div>
            </motion.div>

            {/* Carte CTA - à droite */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/50 text-center md:text-right"
            >
              {/* Effet de lueur au survol */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/0 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:from-blue-500/5 group-hover:via-blue-500/10 group-hover:to-blue-500/5 pointer-events-none" />
              
              {/* Effet radial décoratif (plus discret) */}
              <div className="absolute inset-0 opacity-30 rounded-2xl -z-10" style={{
                backgroundImage: `radial-gradient(circle at 70% 30%, rgba(59,130,246,0.4) 0%, transparent 60%)`
              }} />
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-syne">
                  Vous avez un projet ?
                </h2>
                <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto md:ml-auto md:mr-0">
                  Discutons de vos besoins et trouvons ensemble la solution la plus adaptée.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-xl group-hover:shadow-blue-500/30"
                >
                  Prendre rendez-vous <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;


import React from 'react';
import { 
  Calendar, Clock, User, ArrowLeft, 
  Share2, Bookmark, ThumbsUp 
} from 'lucide-react';

const BlogPost = () => {
  // Données de l'article (à remplacer par useParams + fetch depuis MongoDB)
  const article = {
    id: 1,
    title: "Comment sécuriser votre réseau d'entreprise en 2026 : Guide complet",
    category: "Cybersécurité",
    date: "2026-03-28",
    readTime: "12 min",
    author: "Jean Meya",
    authorRole: "Expert en Cybersécurité & Infrastructure",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    content: `
      <h2>Pourquoi la cybersécurité réseau est-elle plus critique que jamais en 2026 ?</h2>
      <p>Avec l'augmentation massive des attaques ransomware et des menaces sophistiquées en Afrique Centrale, protéger son infrastructure réseau n'est plus une option, mais une nécessité vitale pour la continuité des activités.</p>
      
      <h3>1. Les menaces les plus courantes en RDC et en Afrique</h3>
      <p>Les entreprises congolaises font face à des attaques de phishing ciblé, des intrusions via WiFi non sécurisé, et des ransomwares qui exploitent les faiblesses des parcs informatiques mal maintenus.</p>
      
      <h3>2. Les meilleures pratiques recommandées par OMDEVE</h3>
      <ul>
        <li>Mise en place d'une segmentation réseau avec VLAN</li>
        <li>Installation de firewalls nouvelle génération (NGFW)</li>
        <li>Déploiement d'un système de détection et réponse aux intrusions (IDS/IPS)</li>
        <li>Authentification multi-facteurs (MFA) sur tous les accès critiques</li>
        <li>Formation régulière des équipes aux bonnes pratiques de sécurité</li>
      </ul>
      
      <h3>3. Notre solution : Audit & Sécurisation Complète</h3>
      <p>Chez OMDEVE Services, nous proposons un audit complet suivi d'une mise en place progressive de mesures de protection adaptées à votre taille d'entreprise et à votre secteur d'activité.</p>
      
      <blockquote>
        "Une entreprise non sécurisée perd en moyenne 4,5 millions USD par incident de cybersécurité. Mieux vaut prévenir que guérir."
      </blockquote>
      
      <h3>Conclusion</h3>
      <p>La sécurité de votre réseau doit être pensée dès la conception et maintenue en continu. OMDEVE vous accompagne avec des solutions sur-mesure, adaptées au contexte congolais.</p>
    `,
    tags: ["cybersécurité", "réseau", "firewall", "ransomware", "RDC"],
    relatedArticles: [
      { title: "Formation cybersécurité : Pourquoi former vos équipes ?", slug: "formation-cybersecurite" },
      { title: "Déploiement WiFi professionnel sécurisé en entreprise", slug: "wifi-professionnel" },
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Retour */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
          <a 
            href="/blog" 
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour au blog
          </a>
          
          <div className="flex items-center gap-4">
            <button className="p-3 hover:bg-gray-100 rounded-2xl transition">
              <Bookmark className="w-5 h-5" />
            </button>
            <button className="p-3 hover:bg-gray-100 rounded-2xl transition">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Image */}
      <div className="relative h-[500px] md:h-[620px] overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-6 pb-16 text-white">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full mb-6">
            <span className="text-sm font-semibold tracking-wider">{article.category}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold">
                {article.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-medium">{article.author}</p>
                <p className="text-blue-200 text-xs">{article.authorRole}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-blue-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(article.date).toLocaleDateString('fr-FR', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {article.readTime} de lecture
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu Principal */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <article 
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-blue-700"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Tags */}
        <div className="mt-16 pt-10 border-t border-gray-200">
          <h4 className="text-sm uppercase tracking-widest text-gray-500 mb-4">Tags</h4>
          <div className="flex flex-wrap gap-3">
            {article.tags.map((tag, index) => (
              <span 
                key={index}
                className="bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 px-5 py-2 rounded-3xl text-sm transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Partage */}
        <div className="mt-12 flex flex-col md:flex-row gap-6 items-center justify-between border-t border-gray-200 pt-10">
          <div>
            <p className="text-gray-500 text-sm mb-2">Vous avez trouvé cet article utile ?</p>
            <button className="flex items-center gap-3 text-blue-600 hover:text-blue-700 font-medium">
              <ThumbsUp className="w-5 h-5" />
              J'aime cet article
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-sm">Partager :</span>
            <button className="p-4 hover:bg-gray-100 rounded-2xl transition">LinkedIn</button>
            <button className="p-4 hover:bg-gray-100 rounded-2xl transition">WhatsApp</button>
            <button className="p-4 hover:bg-gray-100 rounded-2xl transition">X</button>
          </div>
        </div>
      </div>

      {/* Articles Similaires */}
      <div className="bg-white py-20 border-t">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-3xl font-bold mb-10">Articles similaires</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {article.relatedArticles.map((related, index) => (
              <a 
                key={index}
                href={`/blog/${related.slug}`}
                className="group flex gap-6 hover:bg-gray-50 p-4 -mx-4 rounded-3xl transition"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-xl leading-tight group-hover:text-blue-600 transition-colors">
                    {related.title}
                  </h4>
                  <p className="text-blue-600 text-sm mt-3 group-hover:underline">Lire l'article →</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-20 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6">
            Besoin d'une expertise en cybersécurité ?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Contactez OMDEVE pour un audit gratuit de votre infrastructure réseau.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/audit-gratuit" 
              className="bg-white text-blue-900 px-10 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition"
            >
              Demander un Audit Gratuit
            </a>
            <a 
              href="/demander-devis" 
              className="border-2 border-white px-10 py-4 rounded-2xl font-semibold hover:bg-white/10 transition"
            >
              Obtenir un Devis
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;






import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Shield,
  Server,
  Zap,
  Users,
  Building,
  AlertCircle,
  Download,
  Mail,
  Phone,
  User,
  TrendingUp,
  ArrowRight,
  Clock
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
  
  @keyframes slow-zoom {
    0% { transform: scale(1); }
    100% { transform: scale(1.1); }
  }
  
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-pulse-ring { animation: pulse-ring 2s ease-out infinite; }
  .animate-slow-zoom { animation: slow-zoom 20s ease-out forwards; }
`;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const AuditGratuit = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    companyName: '',
    sector: '',
    employeeCount: '',
    hasNetwork: '',
    hasServer: '',
    hasFirewall: '',
    internetSpeed: '',
    hasAntivirus: '',
    hasBackup: '',
    hasCyberPolicy: '',
    lastAudit: '',
    mainIssues: [],
    priorityServices: [],
    budget: '',
    name: '',
    email: '',
    phone: '',
    position: '',
    preferredContact: '',
    newsletter: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [auditResult, setAuditResult] = useState(null)
  const { register, handleSubmit, formState: { errors }, trigger, setValue } = useForm()

  const sectors = [
    'Commerce / Distribution',
    'Industrie / Manufacturing',
    'Services / Consulting',
    'Banque / Finance',
    'Santé / Medical',
    'Éducation / Formation',
    'ONG / Association',
    'Administration publique',
    'Autre'
  ]

  const employeeRanges = ['1-10', '11-50', '51-200', '201-500', '500+']
  const internetSpeeds = ['< 10 Mbps', '10-50 Mbps', '50-100 Mbps', '100-500 Mbps', '> 500 Mbps', 'Je ne sais pas']
  const auditOptions = ['moins-6-mois', '6-12-mois', '1-2-ans', 'plus-2-ans', 'jamais']
  const auditLabels = {
    'moins-6-mois': 'Moins de 6 mois',
    '6-12-mois': '6 à 12 mois',
    '1-2-ans': '1 à 2 ans',
    'plus-2-ans': 'Plus de 2 ans',
    'jamais': 'Jamais réalisé'
  }
  const mainIssuesOptions = [
    'Lenteur du réseau',
    'Problèmes de sécurité',
    'Pannes fréquentes',
    'Manque de sauvegarde',
    'Site internet obsolète',
    'Absence de visibilité en ligne',
    'Gestion client inefficace',
    'Consommation énergétique élevée'
  ]
  const priorityServicesOptions = [
    'Réseau & Infrastructure',
    'Sécurité informatique',
    'Développement web',
    'Cloud & Hébergement',
    'Solutions énergétiques',
    'Formation IT'
  ]
  const budgetRanges = ['< 5 000 €', '5 000 - 15 000 €', '15 000 - 30 000 €', '30 000 - 50 000 €', '> 50 000 €', 'À déterminer']

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setValue(field, value)
  }

  const handleCheckboxChange = (field, value) => {
    setFormData(prev => {
      const current = prev[field]
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value]
      return { ...prev, [field]: updated }
    })
  }

  const handleRadioChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setValue(field, value)
  }

  const nextStep = async () => {
    let isValid = true
    if (step === 1) isValid = await trigger(['companyName', 'sector', 'employeeCount'])
    if (step === 2) isValid = await trigger(['hasNetwork', 'hasServer', 'hasFirewall', 'internetSpeed'])
    if (step === 3) isValid = await trigger(['hasAntivirus', 'hasBackup', 'hasCyberPolicy', 'lastAudit'])
    if (step === 5) isValid = await trigger(['name', 'email', 'phone'])
    if (isValid) {
      setStep(step + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const prevStep = () => {
    setStep(step - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const calculateAuditScore = () => {
    let score = 0
    if (formData.hasNetwork === 'yes') score += 10
    if (formData.hasServer === 'yes') score += 10
    if (formData.hasFirewall === 'yes') score += 10
    if (formData.hasAntivirus === 'yes') score += 10
    if (formData.hasBackup === 'yes') score += 15
    if (formData.hasCyberPolicy === 'yes') score += 10
    if (formData.lastAudit === 'moins-6-mois') score += 5
    else if (formData.lastAudit === '6-12-mois') score += 3
    else if (formData.lastAudit === '1-2-ans') score += 1
    score -= formData.mainIssues.length * 2
    return Math.max(0, Math.min(100, score))
  }

  const getAuditRecommendations = (score) => {
    if (score >= 80) {
      return {
        level: 'Excellent',
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/20',
        border: 'border-emerald-500/30',
        icon: '🏆',
        message: 'Votre infrastructure est très bien configurée. Quelques optimisations mineures peuvent encore améliorer vos performances.',
        recommendations: [
          'Mettre en place une veille technologique régulière',
          'Former les équipes aux bonnes pratiques',
          'Envisager une migration vers le cloud pour plus d\'agilité',
          'Automatiser les processus de sauvegarde'
        ]
      }
    } else if (score >= 60) {
      return {
        level: 'Bon',
        color: 'text-blue-400',
        bg: 'bg-blue-500/20',
        border: 'border-blue-500/30',
        icon: '👍',
        message: 'Votre infrastructure est fonctionnelle mais présente des axes d\'amélioration significatifs.',
        recommendations: [
          'Renforcer la sécurité réseau avec un firewall nouvelle génération',
          'Mettre en place des sauvegardes automatisées',
          'Auditer les accès et les permissions utilisateurs',
          'Optimiser la bande passante internet'
        ]
      }
    } else if (score >= 40) {
      return {
        level: 'Moyen',
        color: 'text-yellow-400',
        bg: 'bg-yellow-500/20',
        border: 'border-yellow-500/30',
        icon: '⚠️',
        message: 'Des vulnérabilités importantes ont été identifiées. Une action rapide est recommandée.',
        recommendations: [
          'Installer un antivirus centralisé',
          'Mettre en place une politique de mots de passe stricts',
          'Réaliser un audit de sécurité complet',
          'Former les employés à la cybersécurité',
          'Mettre en place des sauvegardes régulières'
        ]
      }
    } else {
      return {
        level: 'Critique',
        color: 'text-red-400',
        bg: 'bg-red-500/20',
        border: 'border-red-500/30',
        icon: '🚨',
        message: 'Votre infrastructure présente des risques majeurs. Une intervention urgente est nécessaire.',
        recommendations: [
          'Audit complet de l\'infrastructure IT',
          'Mise en place d\'une solution de sécurité globale',
          'Migration vers une infrastructure moderne',
          'Formation cybersécurité pour toute l\'équipe',
          'Mise en place d\'un plan de reprise d\'activité'
        ]
      }
    }
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    const score = calculateAuditScore()
    const recommendations = getAuditRecommendations(score)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setAuditResult({ score, recommendations, ...formData })
    setStep(6)
    setIsSubmitting(false)
  }

  const downloadPDFReport = () => {
    alert("Le rapport PDF sera généré et téléchargé.")
  }

  const steps = [
    { number: 1, title: 'Entreprise', icon: Building },
    { number: 2, title: 'Infrastructure', icon: Server },
    { number: 3, title: 'Sécurité', icon: Shield },
    { number: 4, title: 'Besoins', icon: Users },
    { number: 5, title: 'Contact', icon: User }
  ]

  if (auditResult && step === 6) {
    const rec = auditResult.recommendations
    return (
      <>
        <style>{globalStyles}</style>
        <div className="pt-24 pb-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 min-h-screen">
          <div className="container mx-auto max-w-4xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
            >
              <div className={`p-8 text-center ${rec.bg} relative overflow-hidden border-b border-white/10`}>
                <div className="relative z-10">
                  <div className="text-6xl mb-4">{rec.icon}</div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white font-syne mb-2">Rapport d'Audit</h1>
                  <p className="text-gray-300">{auditResult.companyName || 'Votre entreprise'}</p>
                  <p className="text-sm text-gray-400 mt-1">Généré le {new Date().toLocaleDateString('fr-FR')}</p>
                </div>
              </div>

              <div className="p-8 border-b border-white/10">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center relative">
                    <svg className="w-36 h-36">
                      <circle className="text-white/10" strokeWidth="8" stroke="currentColor" fill="transparent" r="62" cx="72" cy="72" />
                      <circle
                        className="text-blue-400 transition-all duration-1000"
                        strokeWidth="8"
                        strokeDasharray={2 * Math.PI * 62}
                        strokeDashoffset={2 * Math.PI * 62 * (1 - auditResult.score / 100)}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="62"
                        cx="72"
                        cy="72"
                        transform="rotate(-90 72 72)"
                      />
                    </svg>
                    <div className="absolute text-center">
                      <span className="text-3xl font-bold text-blue-400">{auditResult.score}</span>
                      <span className="text-gray-400">/100</span>
                    </div>
                  </div>
                  <h2 className={`text-xl font-bold ${rec.color} mt-4`}>Niveau: {rec.level}</h2>
                  <p className="text-gray-300 max-w-md mx-auto mt-2">{rec.message}</p>
                </div>
              </div>

              <div className="p-8 border-b border-white/10 bg-white/5">
                <h2 className="text-lg font-bold text-white mb-4">Synthèse de l'audit</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <p className="text-sm text-gray-400">Secteur d'activité</p>
                    <p className="font-semibold text-white">{auditResult.sector || 'Non spécifié'}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <p className="text-sm text-gray-400">Effectif</p>
                    <p className="font-semibold text-white">{auditResult.employeeCount || 'Non spécifié'} employés</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <p className="text-sm text-gray-400">Problèmes identifiés</p>
                    <p className="font-semibold text-white">{auditResult.mainIssues.length} point(s)</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <p className="text-sm text-gray-400">Budget envisagé</p>
                    <p className="font-semibold text-white">{auditResult.budget || 'À déterminer'}</p>
                  </div>
                </div>
              </div>

              <div className="p-8 border-b border-white/10">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-blue-400" />
                  Recommandations prioritaires
                </h2>
                <ul className="space-y-3">
                  {rec.recommendations.map((recItem, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start"
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{recItem}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {auditResult.priorityServices.length > 0 && (
                <div className="p-8 border-b border-white/10">
                  <h2 className="text-lg font-bold text-white mb-4">Services qui pourraient vous intéresser</h2>
                  <div className="flex flex-wrap gap-2">
                    {auditResult.priorityServices.map((service, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-8 bg-white/5 border-t border-white/10">
                <h2 className="text-lg font-bold text-white mb-4">Prochaines étapes</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link
                    to="/demander-devis"
                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all group border border-white/10"
                  >
                    <div>
                      <p className="font-semibold text-white">Demander un devis personnalisé</p>
                      <p className="text-sm text-gray-400">Obtenez une offre sur mesure</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition" />
                  </Link>
                  <Link
                    to="/contact"
                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all group border border-white/10"
                  >
                    <div>
                      <p className="font-semibold text-white">Planifier un appel avec un expert</p>
                      <p className="text-sm text-gray-400">Discussion gratuite de 30 min</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition" />
                  </Link>
                </div>
              </div>

              <div className="p-8 text-center border-t border-white/10">
                <button
                  onClick={downloadPDFReport}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Télécharger le rapport PDF
                </button>
                <p className="text-xs text-gray-400 mt-4">
                  Un email avec le rapport vous sera également envoyé à {auditResult.email}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </>
    )
  }

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
        <div className="absolute w-48 h-48 bg-cyan-500/10 top-1/2 left-1/2 -translate-x-1/2 rounded-full filter blur-[80px] animate-float" style={{ animationDelay: '4s' }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-600/15 border border-blue-500/30"
            >
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-ring" />
              <span className="text-blue-300 font-semibold text-xs tracking-wide font-syne">Diagnostic gratuit</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tight mb-6 font-syne"
            >
              Audit{' '}
              <span className="relative inline-block">
                <span className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 blur-2xl opacity-50" />
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400">
                  Gratuit
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
              Diagnostiquez gratuitement l'état de votre infrastructure IT et obtenez un rapport personnalisé avec nos recommandations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link to="/contact" className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 transition-all hover:scale-105 hover:shadow-xl">
                Nous contacter <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/solutions" className="group border-2 border-white/30 hover:border-white px-8 py-4 rounded-xl font-semibold text-white hover:bg-white/10 transition-all hover:scale-105">
                Voir nos solutions <CheckCircle size={18} />
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 text-white/10">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* Progress Steps */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 -mt-16 relative z-10 pb-8">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="flex justify-between items-center relative">
            {steps.map((s, idx) => (
              <div key={s.number} className="flex-1 relative">
                <div className="flex flex-col items-center">
                  <motion.div
                    initial={false}
                    animate={{
                      scale: step === s.number ? 1.1 : 1,
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all shadow-md ${
                      step > s.number
                        ? 'bg-emerald-500 text-white'
                        : step === s.number
                        ? 'bg-blue-600 text-white ring-4 ring-blue-500/30'
                        : 'bg-white/10 text-gray-400 border border-white/20'
                    }`}
                  >
                    {step > s.number ? <CheckCircle className="w-5 h-5" /> : s.number}
                  </motion.div>
                  <span className="text-xs mt-2 text-gray-400 hidden sm:block">{s.title}</span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`absolute top-5 left-1/2 w-full h-0.5 transition-all duration-300 ${
                      step > s.number ? 'bg-emerald-500' : 'bg-white/20'
                    }`}
                    style={{ right: '-50%' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Formulaire */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto max-w-4xl px-4 pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-6 md:p-8">
                  {/* Step 1 - Company Info */}
                  {step === 1 && (
                    <div>
                      <h2 className="text-xl font-bold mb-6 text-white flex items-center">
                        <Building className="w-6 h-6 mr-2 text-blue-400" />
                        Informations de l'entreprise
                      </h2>
                      <div className="space-y-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Nom de l'entreprise <span className="text-red-400">*</span>
                          </label>
                          <input
                            {...register('companyName', { required: 'Champ requis' })}
                            onChange={(e) => handleInputChange('companyName', e.target.value)}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 transition-all"
                            placeholder="OMDEVE Services"
                          />
                          {errors.companyName && <p className="text-red-400 text-xs mt-1">{errors.companyName.message}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Secteur d'activité <span className="text-red-400">*</span>
                          </label>
                          <select
                            {...register('sector', { required: 'Champ requis' })}
                            onChange={(e) => handleInputChange('sector', e.target.value)}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                          >
                            <option value="" className="bg-slate-800">Sélectionnez un secteur</option>
                            {sectors.map(s => <option key={s} value={s} className="bg-slate-800">{s}</option>)}
                          </select>
                          {errors.sector && <p className="text-red-400 text-xs mt-1">{errors.sector.message}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Nombre d'employés <span className="text-red-400">*</span>
                          </label>
                          <select
                            {...register('employeeCount', { required: 'Champ requis' })}
                            onChange={(e) => handleInputChange('employeeCount', e.target.value)}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                          >
                            <option value="" className="bg-slate-800">Sélectionnez une tranche</option>
                            {employeeRanges.map(r => <option key={r} value={r} className="bg-slate-800">{r} employés</option>)}
                          </select>
                          {errors.employeeCount && <p className="text-red-400 text-xs mt-1">{errors.employeeCount.message}</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2 - Infrastructure IT */}
                  {step === 2 && (
                    <div>
                      <h2 className="text-xl font-bold mb-6 text-white flex items-center">
                        <Server className="w-6 h-6 mr-2 text-blue-400" />
                        Infrastructure IT
                      </h2>
                      <div className="space-y-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">Disposez-vous d'un réseau informatique ?</label>
                          <div className="flex gap-4">
                            {['yes', 'no', 'partial'].map(opt => (
                              <label key={opt} className="flex items-center text-gray-300">
                                <input type="radio" value={opt} checked={formData.hasNetwork === opt} onChange={() => handleRadioChange('hasNetwork', opt)} className="mr-2 text-blue-600" />
                                <span>{opt === 'yes' ? 'Oui' : opt === 'no' ? 'Non' : 'Partiellement'}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">Avez-vous des serveurs ?</label>
                          <div className="flex gap-4">
                            {['yes', 'no', 'cloud'].map(opt => (
                              <label key={opt} className="flex items-center text-gray-300">
                                <input type="radio" value={opt} checked={formData.hasServer === opt} onChange={() => handleRadioChange('hasServer', opt)} className="mr-2 text-blue-600" />
                                <span>{opt === 'yes' ? 'Oui' : opt === 'no' ? 'Non' : 'Cloud uniquement'}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">Disposez-vous d'un pare-feu ?</label>
                          <div className="flex gap-4">
                            {['yes', 'no', 'basic'].map(opt => (
                              <label key={opt} className="flex items-center text-gray-300">
                                <input type="radio" value={opt} checked={formData.hasFirewall === opt} onChange={() => handleRadioChange('hasFirewall', opt)} className="mr-2 text-blue-600" />
                                <span>{opt === 'yes' ? 'Oui' : opt === 'no' ? 'Non' : 'Basique'}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Débit internet</label>
                          <select onChange={(e) => handleInputChange('internetSpeed', e.target.value)} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white">
                            <option value="" className="bg-slate-800">Sélectionnez le débit</option>
                            {internetSpeeds.map(s => <option key={s} value={s} className="bg-slate-800">{s}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3 - Sécurité */}
                  {step === 3 && (
                    <div>
                      <h2 className="text-xl font-bold mb-6 text-white flex items-center">
                        <Shield className="w-6 h-6 mr-2 text-blue-400" />
                        Sécurité Informatique
                      </h2>
                      <div className="space-y-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">Utilisez-vous un antivirus ?</label>
                          <div className="flex gap-4">
                            {['yes', 'no', 'basic'].map(opt => (
                              <label key={opt} className="flex items-center text-gray-300">
                                <input type="radio" value={opt} checked={formData.hasAntivirus === opt} onChange={() => handleRadioChange('hasAntivirus', opt)} className="mr-2 text-blue-600" />
                                <span>{opt === 'yes' ? 'Oui, centralisé' : opt === 'no' ? 'Non' : 'Basique / individuel'}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">Avez-vous un système de sauvegarde ?</label>
                          <div className="flex gap-4">
                            {['yes', 'no', 'partial'].map(opt => (
                              <label key={opt} className="flex items-center text-gray-300">
                                <input type="radio" value={opt} checked={formData.hasBackup === opt} onChange={() => handleRadioChange('hasBackup', opt)} className="mr-2 text-blue-600" />
                                <span>{opt === 'yes' ? 'Oui' : opt === 'no' ? 'Non' : 'Partiel'}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">Existe-t-il une politique de cybersécurité ?</label>
                          <div className="flex gap-4">
                            {['yes', 'no', 'inprogress'].map(opt => (
                              <label key={opt} className="flex items-center text-gray-300">
                                <input type="radio" value={opt} checked={formData.hasCyberPolicy === opt} onChange={() => handleRadioChange('hasCyberPolicy', opt)} className="mr-2 text-blue-600" />
                                <span>{opt === 'yes' ? 'Oui' : opt === 'no' ? 'Non' : 'En cours'}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Date du dernier audit de sécurité</label>
                          <select onChange={(e) => handleInputChange('lastAudit', e.target.value)} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white">
                            <option value="" className="bg-slate-800">Sélectionnez</option>
                            {auditOptions.map(opt => <option key={opt} value={opt} className="bg-slate-800">{auditLabels[opt]}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4 - Besoins */}
                  {step === 4 && (
                    <div>
                      <h2 className="text-xl font-bold mb-6 text-white flex items-center">
                        <Users className="w-6 h-6 mr-2 text-blue-400" />
                        Vos besoins
                      </h2>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">Quels sont vos principaux problèmes ?</label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {mainIssuesOptions.map(issue => (
                              <label key={issue} className="flex items-center text-gray-300">
                                <input type="checkbox" checked={formData.mainIssues.includes(issue)} onChange={() => handleCheckboxChange('mainIssues', issue)} className="mr-2 text-blue-600 rounded" />
                                <span className="text-sm">{issue}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">Services prioritaires</label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {priorityServicesOptions.map(service => (
                              <label key={service} className="flex items-center text-gray-300">
                                <input type="checkbox" checked={formData.priorityServices.includes(service)} onChange={() => handleCheckboxChange('priorityServices', service)} className="mr-2 text-blue-600 rounded" />
                                <span className="text-sm">{service}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Budget envisagé</label>
                          <select onChange={(e) => handleInputChange('budget', e.target.value)} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white">
                            <option value="" className="bg-slate-800">Sélectionnez un budget</option>
                            {budgetRanges.map(b => <option key={b} value={b} className="bg-slate-800">{b}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 5 - Contact */}
                  {step === 5 && (
                    <div>
                      <h2 className="text-xl font-bold mb-6 text-white flex items-center">
                        <User className="w-6 h-6 mr-2 text-blue-400" />
                        Vos coordonnées
                      </h2>
                      <div className="space-y-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Nom complet <span className="text-red-400">*</span></label>
                          <input {...register('name', { required: 'Champ requis' })} onChange={(e) => handleInputChange('name', e.target.value)} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400" placeholder="omedev " />
                          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Email <span className="text-red-400">*</span></label>
                          <input type="email" {...register('email', { required: 'Champ requis', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Email invalide' } })} onChange={(e) => handleInputChange('email', e.target.value)} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400" placeholder="contact@omdeve.com" />
                          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Téléphone <span className="text-red-400">*</span></label>
                          <input type="tel" {...register('phone', { required: 'Champ requis' })} onChange={(e) => handleInputChange('phone', e.target.value)} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400" placeholder="+243 XXX XXX XXX" />
                          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">Poste / Fonction</label>
                          <input onChange={(e) => handleInputChange('position', e.target.value)} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400" placeholder="Directeur IT" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-3">Préférence de contact</label>
                          <div className="flex gap-4">
                            {['email', 'phone'].map(opt => (
                              <label key={opt} className="flex items-center text-gray-300">
                                <input type="radio" value={opt} checked={formData.preferredContact === opt} onChange={() => handleRadioChange('preferredContact', opt)} className="mr-2 text-blue-600" />
                                <span className="flex items-center">{opt === 'email' ? <Mail className="w-4 h-4 mr-1" /> : <Phone className="w-4 h-4 mr-1" />}{opt === 'email' ? 'Email' : 'Téléphone'}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="flex items-center text-gray-300">
                            <input type="checkbox" checked={formData.newsletter} onChange={(e) => handleInputChange('newsletter', e.target.checked)} className="mr-2 text-blue-600 rounded" />
                            <span className="text-sm">Je souhaite recevoir la newsletter et les offres spéciales</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="px-6 md:px-8 py-4 bg-white/5 border-t border-white/10 flex justify-between">
                  {step > 1 && (
                    <button type="button" onClick={prevStep} className="flex items-center px-5 py-2.5 border border-white/20 rounded-xl font-medium text-white hover:bg-white/10 transition">
                      <ChevronLeft className="w-4 h-4 mr-1" /> Précédent
                    </button>
                  )}
                  {step < 5 && (
                    <button type="button" onClick={nextStep} className="flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition ml-auto">
                      Suivant <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  )}
                  {step === 5 && (
                    <button type="submit" disabled={isSubmitting} className="flex items-center px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-medium hover:from-emerald-600 hover:to-emerald-700 transition ml-auto disabled:opacity-50">
                      {isSubmitting ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>Génération...</> : <>Générer mon audit <ChevronRight className="w-4 h-4 ml-1" /></>}
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
          </AnimatePresence>

          {/* Trust Badges */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8 text-center">
            <p className="text-sm text-gray-400 mb-3">Plus de 500 entreprises nous font confiance</p>
            <div className="flex justify-center gap-6">
              <span className="text-xs text-gray-500">🔒 Données confidentielles</span>
              <span className="text-xs text-gray-500">⚡ Rapport instantané</span>
              <span className="text-xs text-gray-500">💯 Sans engagement</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Double */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/5">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, rgba(59,130,246,0.3) 0%, transparent 60%),
                            radial-gradient(circle at 80% 70%, rgba(6,182,212,0.2) 0%, transparent 60%)`
        }} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/50 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110">
                <Shield size={28} className="text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white font-syne mb-3">Sécurisez votre entreprise</h3>
              <p className="text-gray-300 mb-6">
                Découvrez nos solutions de cybersécurité adaptées à votre secteur d'activité.
              </p>
              <Link to="/solutions" className="inline-flex items-center gap-2 bg-white/10 border border-white/20 hover:bg-white/20 text-white px-6 py-2.5 rounded-xl font-semibold transition-all hover:scale-105">
                Voir les solutions <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/20 hover:border-amber-500/50 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110">
                <Users size={28} className="text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white font-syne mb-3">Accompagnement expert</h3>
              <p className="text-gray-300 mb-6">
                Bénéficiez d'un accompagnement personnalisé par nos experts en IT et énergie.
              </p>
              <Link to="/demander-devis" className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-all hover:scale-105">
                Prendre rendez-vous <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AuditGratuit


import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Users, Award, Target, Globe, Zap, Shield, Lightbulb, TrendingUp,
  ArrowRight, Headphones, CheckCircle, Rocket, Heart, Briefcase,
  Calendar, MapPin, Star, Phone, Mail, Handshake
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
  
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-pulse-ring { animation: pulse-ring 2s ease-out infinite; }
  .animate-slow-zoom { animation: slow-zoom 20s ease-out forwards; }
`;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const About = () => {
  // Valeurs
  const valeurs = [
    { icon: Target, title: 'Excellence', text: 'Nous visons l\'excellence dans chaque projet, avec des standards internationaux.', gradient: 'from-blue-500 to-blue-600' },
    { icon: Shield, title: 'Sécurité', text: 'La protection de vos données et infrastructures est notre priorité absolue.', gradient: 'from-emerald-500 to-emerald-600' },
    { icon: Lightbulb, title: 'Innovation', text: 'Nous anticipons les besoins futurs pour vous offrir des solutions modernes et évolutives.', gradient: 'from-amber-500 to-amber-600' },
    { icon: Users, title: 'Proximité', text: 'Un accompagnement humain et personnalisé, proche de vos réalités terrain.', gradient: 'from-purple-500 to-purple-600' }
  ];

  // Domaines d'expertise
  const expertises = [
    { icon: Globe, title: "Réseau & Infrastructure", desc: "Câblage, WiFi pro, VLAN, parcs informatiques", gradient: "from-blue-500 to-blue-600" },
    { icon: Shield, title: "Cybersécurité", desc: "Audit, vidéosurveillance, firewalls, formations", gradient: "from-cyan-500 to-cyan-600" },
    { icon: Zap, title: "Développement Digital", desc: "Sites web, e-commerce, apps mobiles, ERP", gradient: "from-amber-500 to-amber-600" },
    { icon: TrendingUp, title: "Cloud & Hébergement", desc: "Solutions haute disponibilité et migration", gradient: "from-indigo-500 to-indigo-600" },
    { icon: Lightbulb, title: "Énergie Solaire", desc: "Panneaux photovoltaïques et optimisation énergétique", gradient: "from-orange-500 to-orange-600" },
    { icon: Award, title: "Formation & Coaching", desc: "Formations certifiantes et e-learning", gradient: "from-green-500 to-green-600" },
  ];

  // Chiffres clés
  const stats = [
    { value: '8+', label: 'Années d’expertise', icon: Calendar },
    { value: '150+', label: 'Projets réalisés', icon: Briefcase },
    { value: '95%', label: 'Clients satisfaits', icon: Star },
    { value: '24/7', label: 'Support technique', icon: Headphones },
  ];

  // Engagements
  const engagements = [
    { icon: Award, title: 'Qualité Certifiée', desc: 'Solutions conformes aux meilleures pratiques internationales.', gradient: 'from-green-500 to-green-600' },
    { icon: Target, title: 'Résultats Mesurables', desc: 'Nous nous engageons sur des objectifs concrets et vérifiables.', gradient: 'from-blue-500 to-blue-600' },
    { icon: Users, title: 'Accompagnement Continu', desc: 'Support technique et formation tout au long de votre projet.', gradient: 'from-amber-500 to-amber-600' },
  ];

  // Équipe - version simplifiée
  const team = [
    {
      name: 'Meya Dorodoro ',
      role: 'CEO & Fondateur',
      position: 'Expert en Informatique Appliqué & developpeur full-stack',
      bio: 'Expert en infrastructure IT et cybersécurité avec plus de 15 ans d’expérience en Afrique centrale.',
      image: 'https://meyaosee.github.io/ensein/me1.jpg',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      name: 'Osee Mbongo ',
      role: 'Directrice Technique',
      position: 'Ingénieur télécoms',
      bio: 'Ingénieur en télécommunications, spécialiste des réseaux haut débit et des solutions cloud.',
      image: 'https://meyaosee.github.io/hosp/os2.jpg',
      gradient: 'from-cyan-500 to-cyan-600',
    },
    {
      name: 'Paul Kasongo',
      role: 'Responsable Énergie',
      position: 'Ingénieur énergies renouvelables',
      bio: 'Ingénieur en énergies renouvelables, il pilote nos projets solaires et d’efficacité énergétique.',
      image: 'https://randomuser.me/api/portraits/men/45.jpg',
      gradient: 'from-amber-500 to-amber-600',
    },
    {
      name: 'Claire Mbenza',
      role: 'Lead Développement',
      position: 'Développeuse full-stack',
      bio: 'Développeuse full-stack, elle conçoit des applications web et mobiles sur mesure.',
      image: 'https://randomuser.me/api/portraits/women/50.jpg',
      gradient: 'from-purple-500 to-purple-600',
    }
  ];

  return (
    <>
      <style>{globalStyles}</style>

      {/* ==================== HERO SECTION ==================== */}
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white overflow-hidden pt-28 pb-16">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />

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
              <span className="text-blue-300 font-semibold text-xs tracking-wide font-syne">Qui sommes-nous ?</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight mb-5 font-syne"
            >
              À propos{' '}
              <span className="relative inline-block">
                <span className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 blur-2xl opacity-50" />
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400">
                  d’OMDEVE
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
              Leader en solutions IT, énergétiques et digitales en République Démocratique du Congo.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link to="/contact" className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all hover:scale-105 hover:shadow-xl">
                Nous contacter <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/realisations" className="group border-2 border-white/30 hover:border-white px-6 py-3 rounded-xl font-semibold text-white hover:bg-white/10 transition-all hover:scale-105">
                Voir nos réalisations <CheckCircle size={18} />
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







      {/* ==================== HISTOIRE & MISSION ==================== */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                  <Calendar size={24} className="text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white font-syne">Notre histoire</h2>
              </div>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Fondée en 2018 à Kinshasa, <strong className="text-blue-400">OMDEVE Services</strong> est née de la volonté de répondre aux défis numériques et énergétiques de la RDC.
                  Partant d'une petite équipe de 3 passionnés d'informatique, nous avons rapidement grandi pour devenir un acteur incontournable du secteur.
                </p>
                <p>
                  En 2020, nous avons élargi nos compétences aux énergies renouvelables, puis au développement digital en 2022.
                  Aujourd'hui, nous accompagnons plus de 150 entreprises congolaises dans leur transformation technologique.
                </p>
                <p>
                  Notre mot d'ordre : <strong className="text-blue-400">innovation locale, standards internationaux</strong>.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                  <Target size={24} className="text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white font-syne">Notre mission</h2>
              </div>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  <strong className="text-amber-400">Accélérer la digitalisation et la transition énergétique des entreprises congolaises</strong> en leur fournissant des solutions fiables, sécurisées et adaptées à leur environnement.
                </p>
                <p>
                  Nous croyons que la technologie doit être accessible à tous. C'est pourquoi nous proposons des services sur mesure, avec un accompagnement de proximité et une veille technologique constante.
                </p>
                <p>
                  Notre engagement : <strong className="text-amber-400">zéro panne non anticipée, zéro vulnérabilité négligée, zéro projet sans formation</strong>.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ==================== CHIFFRES CLÉS ==================== */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/10">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-4">
              <TrendingUp size={16} className="text-blue-400" />
              <span className="text-blue-300 text-sm font-semibold">Quelques chiffres</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-syne">OMDEVE en quelques données</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center transition-all hover:-translate-y-2 hover:border-blue-500/50"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Icon size={20} className="text-blue-400" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-white font-syne">{stat.value}</div>
                  <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* ==================== NOS VALEURS ==================== */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/10">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-4">
              <Heart size={16} className="text-blue-400" />
              <span className="text-blue-300 text-sm font-semibold">Nos piliers</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-syne">Nos valeurs</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valeurs.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center transition-all hover:-translate-y-2 hover:border-blue-500/50"
                >
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-r ${v.gradient} flex items-center justify-center`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{v.title}</h3>
                  <p className="text-gray-300 text-sm">{v.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ==================== NOTRE EXPERTISE ==================== */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/10">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-4">
              <Zap size={16} className="text-blue-400" />
              <span className="text-blue-300 text-sm font-semibold">Notre savoir-faire</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-syne">Notre expertise</h2>
            <p className="text-gray-400 mt-3">7 domaines de compétences au service de votre croissance</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertises.map((exp, i) => {
              const Icon = exp.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group bg-white/5 border border-white/10 rounded-2xl p-6 transition-all hover:-translate-y-2 hover:border-blue-500/50"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${exp.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{exp.title}</h3>
                  <p className="text-gray-400 text-sm">{exp.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ==================== NOS ENGAGEMENTS ==================== */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/10">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-4">
              <Award size={16} className="text-blue-400" />
              <span className="text-blue-300 text-sm font-semibold">Nos promesses</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-syne">Notre engagement</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {engagements.map((eng, i) => {
              const Icon = eng.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 transition-all hover:-translate-y-2 hover:border-blue-500/50"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${eng.gradient} flex items-center justify-center mb-4`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{eng.title}</h3>
                  <p className="text-gray-400 text-sm">{eng.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ==================== NOTRE ÉQUIPE ==================== */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/10">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-4">
              <Users size={16} className="text-blue-400" />
              <span className="text-blue-300 text-sm font-semibold">Notre équipe</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-syne">Des experts passionnés</h2>
            <p className="text-gray-400 mt-3">Une équipe multidisciplinaire dédiée à votre réussite</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500/50"
              >
                <div className="relative overflow-hidden h-72">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${member.gradient} text-white shadow-lg`}>
                      {member.role}
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white font-syne mb-1">{member.name}</h3>
                  <p className="text-blue-400 text-xs font-semibold mb-3">{member.position}</p>
                  <p className="text-gray-400 text-xs leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid place-items-center mt-12">
        <Link
          to="/experts"
          className="group inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-amber-500/20"
        >
          <Rocket size={20} className="group-hover:rotate-12 transition-transform duration-300" />
          <span>Rencontrer toute l'équipe</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>



      {/* ==================== CONTACT INFO CARD ==================== */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/10">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 rounded-2xl border border-white/10 overflow-hidden"
          >
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white font-syne mb-6">Contactez-nous</h2>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Phone size={18} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Téléphone</p>
                      <p className="text-white font-semibold">+243 816 590 788</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Mail size={18} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white font-semibold">omedevservices@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <MapPin size={18} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Adresse</p>
                      <p className="text-white font-semibold">Avenue Kabmabre n°75, Lingwala, Kinshasa, RDC</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 md:p-12 text-white flex flex-col justify-center">
                <div className="text-4xl md:text-5xl font-bold mb-4 font-syne">+243 816 590 788</div>
                <div className="text-xl mb-6">Kinshasa, RDC</div>
                <p className="text-blue-100">Disponible du lundi au vendredi, 8h - 18h</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ==================== CTA FINALE (DOUBLE) ==================== */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/5">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, rgba(59,130,246,0.3) 0%, transparent 60%),
                            radial-gradient(circle at 80% 70%, rgba(6,182,212,0.2) 0%, transparent 60%)`
        }} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/50 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110">
                <Target size={28} className="text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white font-syne mb-3">Audit gratuit</h3>
              <p className="text-gray-300 mb-6">
                Bénéficiez d'un diagnostic complet de vos infrastructures sans engagement.
              </p>
              <Link to="/audit-gratuit" className="inline-flex items-center gap-2 bg-white/10 border border-white/20 hover:bg-white/20 text-white px-6 py-2.5 rounded-xl font-semibold transition-all hover:scale-105">
                Demander un audit <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/20 hover:border-amber-500/50 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110">
                <Handshake size={28} className="text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white font-syne mb-3">Devis personnalisé</h3>
              <p className="text-gray-300 mb-6">
                Recevez une proposition sur mesure adaptée à vos besoins et votre budget.
              </p>
              <Link to="/demander-devis" className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-all hover:scale-105">
                Demander un devis <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;






import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Shield,
  Server,
  Zap,
  Users,
  Building,
  AlertCircle,
  Download,
  Mail,
  Phone,
  User,
  TrendingUp,
  ArrowRight,
  Clock,
  Briefcase,
  MapPin,
  Euro,
  FileUp,
  Send,
  X,
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
  
  @keyframes slow-zoom {
    0% { transform: scale(1); }
    100% { transform: scale(1.1); }
  }
  
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-pulse-ring { animation: pulse-ring 2s ease-out infinite; }
  .animate-slow-zoom { animation: slow-zoom 20s ease-out forwards; }
`;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const Devis = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    services: [],
    description: '',
    budget: '',
    location: '',
    fullName: '',
    email: '',
    phone: '',
    company: '',
    notes: ''
  })
  const [files, setFiles] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedRequest, setSubmittedRequest] = useState(null)
  const fileInputRef = useRef(null)
  const { register, handleSubmit, formState: { errors }, trigger, setValue, watch } = useForm()

  // Liste des services disponibles
  const serviceOptions = [
    { id: 'reseau', label: 'Réseau & Infrastructure', icon: Server },
    { id: 'securite', label: 'Sécurité informatique', icon: Shield },
    { id: 'web', label: 'Développement web', icon: Zap },
    { id: 'cloud', label: 'Cloud & Hébergement', icon: TrendingUp },
    { id: 'energie', label: 'Solutions énergétiques', icon: Building },
    { id: 'formation', label: 'Formation IT', icon: Users },
    { id: 'audit', label: 'Audit de sécurité', icon: AlertCircle },
    { id: 'conseil', label: 'Conseil stratégique IT', icon: Briefcase }
  ]

  const budgetRanges = ['< 5 000 €', '5 000 - 15 000 €', '15 000 - 30 000 €', '30 000 - 50 000 €', '> 50 000 €', 'À déterminer']

  const handleServiceToggle = (serviceId) => {
    setFormData(prev => {
      const updated = prev.services.includes(serviceId)
        ? prev.services.filter(s => s !== serviceId)
        : [...prev.services, serviceId]
      setValue('services', updated)
      return { ...prev, services: updated }
    })
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setValue(field, value)
  }

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files)
    setFiles(prev => [...prev, ...selected])
  }

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const nextStep = async () => {
    let isValid = true
    if (step === 1) isValid = formData.services.length > 0
    if (step === 2) isValid = await trigger('description')
    if (step === 3) isValid = formData.budget !== '' && formData.location !== ''
    if (step === 4) isValid = true // fichiers optionnels
    if (isValid) {
      setStep(step + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (step === 1 && !isValid) {
      alert('Veuillez sélectionner au moins un service.')
    } else if (step === 3 && !isValid) {
      alert('Veuillez renseigner le budget estimé et la localisation.')
    }
  }

  const prevStep = () => {
    setStep(step - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Génération d'un numéro de demande unique DEV-XXXXXX
  const generateRequestNumber = () => {
    const timestamp = Date.now().toString().slice(-6)
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `DEV-${timestamp}${random}`
  }

  // Simulation d'envoi d'email à l'équipe
  const sendEmailToTeam = async (requestNumber, data, filesList) => {
    // Dans un vrai projet, on enverrait ces données à un endpoint backend
    console.log('📧 Envoi email à l\'équipe OMDEVE', {
      requestNumber,
      ...data,
      files: filesList.map(f => f.name)
    })
    // Simulation d'un appel API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Email envoyé avec succès' })
      }, 500)
    })
  }

  // Relance programmée (simulation - backend réel requis)
  const scheduleReminder = (requestNumber, email) => {
    console.log(`⏰ Relance programmée pour ${email} (dossier ${requestNumber}) dans 48h si pas de réponse.`)
    // Ici, on enverrait une requête à un backend qui planifie un job cron
    // Pour la démo, on affiche simplement un message dans la console.
  }

  const onSubmit = async () => {
    if (formData.services.length === 0) {
      alert('Veuillez sélectionner au moins un service.')
      return
    }
    if (!formData.description) {
      alert('Veuillez décrire votre besoin.')
      return
    }
    if (!formData.budget || !formData.location) {
      alert('Veuillez renseigner le budget et la localisation.')
      return
    }
    setIsSubmitting(true)
    
    try {
      const requestNumber = generateRequestNumber()
      // Simuler l'envoi de l'email à l'équipe
      await sendEmailToTeam(requestNumber, formData, files)
      // Simuler la planification d'une relance (backend)
      scheduleReminder(requestNumber, formData.email)
      
      // Ici vous pouvez également envoyer les fichiers vers un serveur via FormData
      // const formDataToSend = new FormData()
      // files.forEach(file => formDataToSend.append('files', file))
      // etc.
      
      setSubmittedRequest({ number: requestNumber, email: formData.email })
      setStep(6) // écran de confirmation
    } catch (error) {
      console.error('Erreur lors de l\'envoi :', error)
      alert('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const steps = [
    { number: 1, title: 'Service', icon: Briefcase },
    { number: 2, title: 'Description', icon: FileText },
    { number: 3, title: 'Budget & Lieu', icon: Euro },
    { number: 4, title: 'Fichiers', icon: FileUp },
    { number: 5, title: 'Confirmation', icon: Send }
  ]

  // Écran de confirmation après soumission
  if (submittedRequest && step === 6) {
    return (
      <>
        <style>{globalStyles}</style>
        <div className="pt-24 pb-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 min-h-screen">
          <div className="container mx-auto max-w-4xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden text-center p-8"
            >
              <div className="w-20 h-20 mx-auto bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-emerald-400" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white font-syne mb-2">Demande envoyée !</h1>
              <p className="text-gray-300 mb-4">
                Votre demande de devis a bien été enregistrée sous le numéro :
              </p>
              <div className="text-3xl font-mono font-bold text-blue-400 bg-white/10 inline-block px-6 py-2 rounded-xl mb-6">
                {submittedRequest.number}
              </div>
              <p className="text-gray-300 max-w-md mx-auto">
                Un email de confirmation a été envoyé à <strong>{submittedRequest.email}</strong>. Notre équipe vous recontactera dans les plus brefs délais.
              </p>
              <div className="mt-8 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 text-sm text-gray-300">
                ⏰ <strong>Relance automatique :</strong> Si vous n’avez pas de réponse sous 48h, un email de relance vous sera envoyé.
              </div>
              <div className="mt-8 flex justify-center gap-4">
                <Link to="/" className="px-6 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition">
                  Retour à l'accueil
                </Link>
                <Link to="/solutions" className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl hover:from-blue-600 hover:to-blue-700 transition">
                  Découvrir nos solutions
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </>
    )
  }

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
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-ring" />
              <span className="text-blue-300 font-semibold text-xs tracking-wide font-syne">Demande de devis personnalisé</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tight mb-6 font-syne"
            >
              Devis{' '}
              <span className="relative inline-block">
                <span className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 blur-2xl opacity-50" />
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400">
                  Sur-Mesure
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
              Remplissez ce formulaire intelligent et recevez un devis adapté à vos besoins en moins de 48h.
            </motion.p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 text-white/10">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* Progress Steps */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 -mt-16 relative z-10 pb-8">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="flex justify-between items-center relative">
            {steps.map((s, idx) => (
              <div key={s.number} className="flex-1 relative">
                <div className="flex flex-col items-center">
                  <motion.div
                    initial={false}
                    animate={{
                      scale: step === s.number ? 1.1 : 1,
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all shadow-md ${
                      step > s.number
                        ? 'bg-emerald-500 text-white'
                        : step === s.number
                        ? 'bg-blue-600 text-white ring-4 ring-blue-500/30'
                        : 'bg-white/10 text-gray-400 border border-white/20'
                    }`}
                  >
                    {step > s.number ? <CheckCircle className="w-5 h-5" /> : s.number}
                  </motion.div>
                  <span className="text-xs mt-2 text-gray-400 hidden sm:block">{s.title}</span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`absolute top-5 left-1/2 w-full h-0.5 transition-all duration-300 ${
                      step > s.number ? 'bg-emerald-500' : 'bg-white/20'
                    }`}
                    style={{ right: '-50%' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Formulaire */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto max-w-4xl px-4 pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
            >
              <div className="p-6 md:p-8">
                {/* Step 1 - Sélection du service */}
                {step === 1 && (
                  <div>
                    <h2 className="text-xl font-bold mb-6 text-white flex items-center">
                      <Briefcase className="w-6 h-6 mr-2 text-blue-400" />
                      Quel service vous intéresse ?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {serviceOptions.map(service => (
                        <label
                          key={service.id}
                          className={`flex items-center p-3 rounded-xl border cursor-pointer transition-all ${
                            formData.services.includes(service.id)
                              ? 'bg-blue-600/20 border-blue-500 shadow-md'
                              : 'bg-white/5 border-white/20 hover:bg-white/10'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.services.includes(service.id)}
                            onChange={() => handleServiceToggle(service.id)}
                            className="mr-3 text-blue-600 rounded"
                          />
                          <service.icon className="w-5 h-5 mr-2 text-blue-400" />
                          <span className="text-gray-200">{service.label}</span>
                        </label>
                      ))}
                    </div>
                    {formData.services.length === 0 && (
                      <p className="text-amber-400 text-sm mt-4">Sélectionnez au moins un service</p>
                    )}
                  </div>
                )}

                {/* Step 2 - Description détaillée */}
                {step === 2 && (
                  <div>
                    <h2 className="text-xl font-bold mb-6 text-white flex items-center">
                      <FileText className="w-6 h-6 mr-2 text-blue-400" />
                      Décrivez votre besoin
                    </h2>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Description détaillée <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        {...register('description', { required: 'Ce champ est requis' })}
                        rows={6}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                        placeholder="Objectifs, contraintes techniques, délais, etc."
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                      />
                      {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
                    </div>
                    <div className="mt-5">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Informations complémentaires (optionnel)
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                        placeholder="Références, prérequis, etc."
                        value={formData.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {/* Step 3 - Budget & Localisation */}
                {step === 3 && (
                  <div>
                    <h2 className="text-xl font-bold mb-6 text-white flex items-center">
                      <Euro className="w-6 h-6 mr-2 text-blue-400" />
                      Budget estimé et localisation
                    </h2>
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Budget envisagé <span className="text-red-400">*</span>
                        </label>
                        <select
                          value={formData.budget}
                          onChange={(e) => handleInputChange('budget', e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        >
                          <option value="" className="bg-slate-800">Sélectionnez une tranche</option>
                          {budgetRanges.map(b => (
                            <option key={b} value={b} className="bg-slate-800">{b}</option>
                          ))}
                        </select>
                        {!formData.budget && <p className="text-amber-400 text-xs mt-1">Champ requis</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Localisation géographique <span className="text-red-400">*</span>
                        </label>
                        <div className="flex gap-3">
                          <MapPin className="w-5 h-5 text-gray-400 mt-3" />
                          <input
                            type="text"
                            placeholder="Ville, Pays"
                            value={formData.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                          />
                        </div>
                        {!formData.location && <p className="text-amber-400 text-xs mt-1">Champ requis</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4 - Upload de fichiers */}
                {step === 4 && (
                  <div>
                    <h2 className="text-xl font-bold mb-6 text-white flex items-center">
                      <FileUp className="w-6 h-6 mr-2 text-blue-400" />
                      Documents joints (optionnel)
                    </h2>
                    <div className="border-2 border-dashed border-white/30 rounded-xl p-6 text-center hover:border-blue-500 transition">
                      <input
                        type="file"
                        multiple
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-2 rounded-xl transition">
                        <FileUp size={18} />
                        Sélectionner des fichiers
                      </label>
                      <p className="text-xs text-gray-400 mt-2">PDF, DOC, XLS, JPG, PNG (max 10 Mo par fichier)</p>
                    </div>
                    {files.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <p className="text-sm font-medium text-gray-300">Fichiers sélectionnés :</p>
                        {files.map((file, idx) => (
                          <div key={idx} className="flex justify-between items-center bg-white/5 p-2 rounded-lg">
                            <span className="text-sm truncate">{file.name}</span>
                            <button type="button" onClick={() => removeFile(idx)} className="text-red-400 hover:text-red-300">
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Step 5 - Confirmation et coordonnées */}
                {step === 5 && (
                  <div>
                    <h2 className="text-xl font-bold mb-6 text-white flex items-center">
                      <Send className="w-6 h-6 mr-2 text-blue-400" />
                      Confirmation & coordonnées
                    </h2>
                    <div className="space-y-4">
                      <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <h3 className="font-semibold text-white mb-2">Récapitulatif</h3>
                        <p><strong>Services :</strong> {formData.services.map(s => serviceOptions.find(opt => opt.id === s)?.label).join(', ') || 'Aucun'}</p>
                        <p><strong>Description :</strong> {formData.description.substring(0, 100)}...</p>
                        <p><strong>Budget :</strong> {formData.budget}</p>
                        <p><strong>Localisation :</strong> {formData.location}</p>
                        <p><strong>Fichiers joints :</strong> {files.length} fichier(s)</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Nom complet <span className="text-red-400">*</span></label>
                        <input
                          {...register('fullName', { required: 'Champ requis' })}
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl"
                          placeholder="omedev services"
                        />
                        {errors.fullName && <p className="text-red-400 text-xs">{errors.fullName.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Email <span className="text-red-400">*</span></label>
                        <input
                          type="email"
                          {...register('email', { required: 'Champ requis', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Email invalide' } })}
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl"
                          placeholder="contact@omdeve.com"
                        />
                        {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Téléphone <span className="text-red-400">*</span></label>
                        <input
                          {...register('phone', { required: 'Champ requis' })}
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl"
                          placeholder="+243 XXX XXX XXX"
                        />
                        {errors.phone && <p className="text-red-400 text-xs">{errors.phone.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Entreprise / Organisation</label>
                        <input
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl"
                          placeholder="OMDEVE Services"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="px-6 md:px-8 py-4 bg-white/5 border-t border-white/10 flex justify-between">
                {step > 1 && (
                  <button type="button" onClick={prevStep} className="flex items-center px-5 py-2.5 border border-white/20 rounded-xl font-medium text-white hover:bg-white/10 transition">
                    <ChevronLeft className="w-4 h-4 mr-1" /> Précédent
                  </button>
                )}
                {step < 5 && (
                  <button type="button" onClick={nextStep} className="flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition ml-auto">
                    Suivant <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                )}
                {step === 5 && (
                  <button
                    type="button"
                    onClick={onSubmit}
                    disabled={isSubmitting}
                    className="flex items-center px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-medium hover:from-emerald-600 hover:to-emerald-700 transition ml-auto disabled:opacity-50"
                  >
                    {isSubmitting ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>Envoi...</> : <>Envoyer la demande <Send className="w-4 h-4 ml-2" /></>}
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Trust Badges */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8 text-center">
            <p className="text-sm text-gray-400 mb-3">Devis sous 48h • Accompagnement personnalisé</p>
            <div className="flex justify-center gap-6">
              <span className="text-xs text-gray-500">🔒 Données confidentielles</span>
              <span className="text-xs text-gray-500">⚡ Réponse rapide</span>
              <span className="text-xs text-gray-500">💯 Sans engagement</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Double (identique à AuditGratuit) */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/5">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, rgba(59,130,246,0.3) 0%, transparent 60%),
                            radial-gradient(circle at 80% 70%, rgba(6,182,212,0.2) 0%, transparent 60%)`
        }} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/50 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110">
                <Shield size={28} className="text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white font-syne mb-3">Sécurisez votre entreprise</h3>
              <p className="text-gray-300 mb-6">
                Découvrez nos solutions de cybersécurité adaptées à votre secteur d'activité.
              </p>
              <Link to="/solutions" className="inline-flex items-center gap-2 bg-white/10 border border-white/20 hover:bg-white/20 text-white px-6 py-2.5 rounded-xl font-semibold transition-all hover:scale-105">
                Voir les solutions <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/20 hover:border-amber-500/50 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110">
                <Users size={28} className="text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white font-syne mb-3">Accompagnement expert</h3>
              <p className="text-gray-300 mb-6">
                Bénéficiez d'un accompagnement personnalisé par nos experts en IT et énergie.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-all hover:scale-105">
                Prendre rendez-vous <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Devis


// src/pages/Contact.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  ArrowRight, CheckCircle, MapPin, Phone, Mail, MessageCircle, Clock,
  Shield, Star, Briefcase, Handshake, Calendar
} from 'lucide-react';
import { Headphones, FileText } from 'lucide-react';
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

const Contact = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    phone: '',
    objet: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation d'envoi (à remplacer par votre API)
    setTimeout(() => {
      console.log('Formulaire soumis :', formData);
      setSubmitStatus('success');
      setFormData({ nom: '', email: '', phone: '', objet: '', message: '' });
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1200);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Adresse',
      content: 'Avenue Kabmabre n°75, Lingwala, Kinshasa',
      link: 'https://maps.google.com/?q=Kinshasa+Lingwala',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: Phone,
      title: 'Téléphone',
      content: '+243 555 503 59',
      link: 'tel:+24355550359',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'omedevservices@gmail.com',
      link: 'mailto:omedevservices@gmail.com',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      content: '+243 555 503 59',
      link: 'https://wa.me/24355550359',
      gradient: 'from-emerald-500 to-emerald-600'
    }
  ];

  const hours = [
    { day: 'Lundi – Vendredi', time: '8h – 18h', open: true },
    { day: 'Samedi', time: '9h – 13h', open: true },
    { day: 'Dimanche', time: 'Fermé', open: false }
  ];

  const engagements = [
    { icon: Shield, text: '100% confidentiel' },
    { icon: Star, text: '4.9/5 satisfaction client' },
    { icon: Briefcase, text: '+150 projets IT livrés' },
    { icon: Handshake, text: 'Accompagnement sans engagement' }
  ];

  return (
    <>
      <style>{globalStyles}</style>

      {/* Hero Section (identique aux services/blog) */}
     {/* Hero Section - Contact */}{/* Hero Section - Contact */}
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
        <span className="text-blue-300 font-semibold text-xs tracking-wide font-syne">Contactez-nous</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight mb-5 font-syne"
      >
        On reste{' '}
        <span className="relative inline-block">
          <span className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 blur-2xl opacity-50" />
          <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400">
            en contact
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
        Une question, un projet ? Notre équipe IT, Énergie & Infrastructure est là pour vous répondre.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="flex flex-wrap gap-4 justify-center"
      >
        <Link to="/contact" className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all hover:scale-105 hover:shadow-xl">
          Nous écrire <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link to="/audit" className="group border-2 border-white/30 hover:border-white px-6 py-3 rounded-xl font-semibold text-white hover:bg-white/10 transition-all hover:scale-105">
          Audit gratuit <CheckCircle size={18} />
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




      {/* Cartes d'informations (style glassmorphisme) */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 -mt-16 relative z-10 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {contactInfo.map((info, i) => {
              const Icon = info.icon;
              return (
                <motion.a
                  key={i}
                  variants={fadeUp}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white/5 border border-white/10 rounded-2xl p-6 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500/50 hover:bg-white/10"
                >
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${info.gradient} flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{info.title}</h3>
                  <p className="text-gray-300 text-sm">{info.content}</p>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Formulaire + Sidebar */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulaire - prend 2 colonnes */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm"
              >
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
                    ✉️ Message
                  </div>
                  <h2 className="text-2xl font-bold text-white font-syne">Parlons de votre projet</h2>
                </div>

                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-sm text-green-300 font-medium transition-all">
                    ✅ Message envoyé avec succès ! Nous vous répondrons sous 24h.
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wide mb-1.5">
                        Nom complet <span className="text-red-400 ml-0.5">*</span>
                      </label>
                      <input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                        placeholder="Jean Dupont"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wide mb-1.5">
                        Email <span className="text-red-400 ml-0.5">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                        placeholder="jean@exemple.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wide mb-1.5">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                        placeholder="+243 555 503 59"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wide mb-1.5">
                        Objet <span className="text-red-400 ml-0.5">*</span>
                      </label>
                      <input
                        type="text"
                        name="objet"
                        value={formData.objet}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                        placeholder="Demande de devis / Support / Partenariat"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wide mb-1.5">
                      Message <span className="text-red-400 ml-0.5">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      rows="5"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all resize-y"
                      placeholder="Bonjour, je souhaiterais..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3.5 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>✈️ Envoyer le message</>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>

            {/* Sidebar - 1 colonne */}
            <div className="space-y-6">
              {/* Horaires */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-36 h-36 bg-blue-600/20 rounded-full blur-2xl" />
                <div className="flex items-center gap-2 text-white font-bold text-lg mb-4 relative z-10">
                  <Clock size={20} className="text-blue-400" />
                  Horaires d'ouverture
                </div>
                {hours.map((h, i) => (
                  <div key={i} className="flex justify-between items-center py-2.5 border-b border-white/10 last:border-b-0">
                    <span className="text-sm text-gray-300 font-medium">{h.day}</span>
                    <span className={`text-sm font-bold ${h.open ? 'text-white' : 'text-gray-500'}`}>{h.time}</span>
                  </div>
                ))}
                <div className="mt-4 pt-3 border-t border-white/10 text-xs text-gray-400 leading-relaxed">
                  Assistance technique 24/7<br />
                  <strong className="text-blue-400">+243 555 503 59</strong>
                </div>
              </motion.div>

              {/* Engagements */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 text-white font-bold text-lg mb-4">
                  <Shield size={20} className="text-blue-400" />
                  Nos engagements
                </div>
                {engagements.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-3 py-2.5 border-b border-white/10 last:border-b-0">
                      <Icon size={16} className="text-blue-400" />
                      <span className="text-sm text-gray-300">{item.text}</span>
                    </div>
                  );
                })}
              </motion.div>

              {/* Réponse rapide */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/30 rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 text-white font-bold text-lg mb-2">
                  ⚡ Réponse rapide
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Notre équipe s'engage à répondre sous{' '}
                  <strong className="text-blue-400">24h ouvrées</strong>. Pour une urgence, appelez-nous directement.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Carte (avec style cohérent) */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/10">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm"
          >
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
                🗺️ Nous trouver
              </div>
              <h2 className="text-2xl font-bold text-white font-syne">Notre siège à Kinshasa</h2>
              <p className="text-gray-400 mt-1">Avenue Kabmabre n°75, Commune de Lingwala</p>
            </div>

            <div className="w-full h-[400px] rounded-xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 mb-6 flex items-center justify-center relative">
              <div className="text-center">
                <div className="text-6xl drop-shadow-xl animate-pulse">📍</div>
                <div className="mt-4 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20">
                  <div className="font-bold text-white text-sm">OMDEVE Services</div>
                  <div className="text-xs text-gray-300">Avenue Kabmabre n°75, Lingwala</div>
                  <div className="text-xs text-green-400 font-bold mt-1">● Ouvert aujourd'hui</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { icon: '🚗', title: 'En voiture', desc: 'Parking gratuit sur place' },
                { icon: '🚌', title: 'Transport', desc: 'Bus : arrêt Lingwala (lignes 12, 23)' },
                { icon: '♿', title: 'Accessibilité', desc: 'Entrée adaptée aux PMR' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-lg">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{item.title}</div>
                    <div className="text-xs text-gray-400">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

            {/* CTA double - Assistance et Devis */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/5">
        {/* Effets d'arrière-plan */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, rgba(59,130,246,0.3) 0%, transparent 60%),
                            radial-gradient(circle at 80% 70%, rgba(6,182,212,0.2) 0%, transparent 60%)`
        }} />
        <div className="absolute w-96 h-96 bg-blue-600/20 top-20 left-1/4 rounded-full filter blur-[100px] animate-float" />
        <div className="absolute w-72 h-72 bg-cyan-500/10 bottom-10 right-1/3 rounded-full filter blur-[80px] animate-float" style={{ animationDelay: '3s' }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Carte 1 : Assistance immédiate */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/50"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/0 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:from-blue-500/5 group-hover:via-blue-500/10 group-hover:to-blue-500/5 pointer-events-none" />
              
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

            {/* Carte 2 : Devis & Projets */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/50"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/0 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:from-blue-500/5 group-hover:via-blue-500/10 group-hover:to-blue-500/5 pointer-events-none" />
              
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110">
                  <FileText size={28} className="text-white" />
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

export default Contact;


import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Users, Award, Target, ArrowRight, Headphones, Briefcase,
  Calendar, Star, Handshake
} from 'lucide-react';

import { FaLinkedin, FaGithub, FaTwitter, FaInstagram, FaBehance } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

import expert1 from '/src/assets/images/experts/os1.jpg';
import expert2 from '/src/assets/images/experts/os2.jpg';
import expert3 from '/src/assets/images/experts/os3.jpg';
import expert4 from '/src/assets/images/experts/os4.jpg';
import expert5 from '/src/assets/images/experts/os5.jpeg';
import expert6 from '/src/assets/images/experts/fido.jpeg';
import expert7 from '/src/assets/images/experts/am.jpeg';
import expert8 from '/src/assets/images/experts/ro.jpeg';
import expert9 from '/src/assets/images/experts/glo.jpeg';

/* ─────────────────────────────────────────────────────────────
   STYLES GLOBAUX
───────────────────────────────────────────────────────────── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: #0f172a;
    color: #e2e8f0;
    overflow-x: hidden;
  }

  /* ── Animations ── */
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-20px); }
  }
  @keyframes pulse-ring {
    0%   { transform: scale(0.8); opacity: 1; }
    70%  { transform: scale(1.3); opacity: 0; }
    100% { transform: scale(0.8); opacity: 0; }
  }
  @keyframes slow-zoom {
    0%   { transform: scale(1);   }
    100% { transform: scale(1.1); }
  }
  @keyframes shimmer {
    0%   { background-position: -1000px 0; }
    100% { background-position:  1000px 0; }
  }
  @keyframes borderGlow {
    0%   { border-color: rgba(59,130,246,0.3); box-shadow: 0 0 0   0 rgba(59,130,246,0.2); }
    50%  { border-color: rgba(59,130,246,0.8); box-shadow: 0 0 25px 5px rgba(59,130,246,0.5); }
    100% { border-color: rgba(59,130,246,0.3); box-shadow: 0 0 0   0 rgba(59,130,246,0.2); }
  }
  @keyframes gradientShift {
    0%   { background-position: 0%   50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0%   50%; }
  }
  @keyframes rotateGlow {
    0%   { transform: rotate(0deg);   }
    100% { transform: rotate(360deg); }
  }

  .animate-float       { animation: float       6s  ease-in-out infinite; }
  .animate-pulse-ring  { animation: pulse-ring  2s  ease-out   infinite; }
  .animate-slow-zoom   { animation: slow-zoom   20s ease-out   forwards; }

  .shimmer {
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
    background-size: 1000px 100%;
    animation: shimmer 2s infinite;
  }

  /* ──────────────────────────────────────────
     PHOTO : ratio 3/4 portrait, recadrage tête
  ────────────────────────────────────────── */
  .expert-image-container {
    position: relative;
    width: 100%;
    padding-top: 100%;   /* carré parfait – change en 75% pour 4/3 paysage */
    overflow: hidden;
    border-radius: 0;    /* les coins arrondis sont portés par la carte parente */
  }

  .expert-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* Position par défaut : cadrer le haut (visages) */
    object-position: center 10%;
    transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    filter: brightness(0.92) contrast(1.05);
  }

  /* Légère compensation par expert si nécessaire */
  .expert-image.pos1 { object-position: center 5%;  }
  .expert-image.pos2 { object-position: center 8%;  }
  .expert-image.pos3 { object-position: center 10%; }
  .expert-image.pos4 { object-position: center 12%; }
  .expert-image.pos5 { object-position: center 5%;  }
  .expert-image.pos6 { object-position: center 8%;  }
  .expert-image.pos7 { object-position: center 10%; }
  .expert-image.pos8 { object-position: center 8%;  }
  .expert-image.pos9 { object-position: center 10%; }

  .expert-card:hover .expert-image {
    transform: scale(1.08);
    filter: brightness(1) contrast(1.05);
  }

  /* Overlay coloré au survol */
  .image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(59,130,246,0.45), rgba(139,92,246,0.45));
    opacity: 0;
    transition: opacity 0.5s ease;
    z-index: 2;
  }
  .expert-card:hover .image-overlay { opacity: 1; }

  /* Effet brillance (shine) */
  .image-shine {
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
    transition: left 0.75s ease;
    z-index: 3;
    pointer-events: none;
  }
  .expert-card:hover .image-shine { left: 100%; }

  /* Dégradé bas de l'image pour fondu avec le corps de la carte */
  .image-bottom-fade {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 55%;
    background: linear-gradient(to top, #0f172a 0%, rgba(15,23,42,0.6) 55%, transparent 100%);
    z-index: 4;
  }

  /* Anneau lumineux rotatif */
  .glow-ring {
    position: absolute;
    inset: -4px;
    border-radius: inherit;
    background: conic-gradient(from 0deg, transparent, #3b82f6, transparent, #8b5cf6, transparent);
    opacity: 0;
    transition: opacity 0.35s ease;
    z-index: 0;
    pointer-events: none;
  }
  .expert-card:hover .glow-ring {
    opacity: 0.5;
    animation: rotateGlow 2.5s linear infinite;
  }

  /* ── Icônes réseaux sociaux ── */
  .social-icon {
    transform: translateY(18px);
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  .expert-card:hover .social-icon { transform: translateY(0); opacity: 1; }
  .social-icon:nth-child(1) { transition-delay: 0.04s; }
  .social-icon:nth-child(2) { transition-delay: 0.09s; }
  .social-icon:nth-child(3) { transition-delay: 0.14s; }
  .social-icon:nth-child(4) { transition-delay: 0.19s; }
  .social-icon:nth-child(5) { transition-delay: 0.24s; }

  /* ── Badge rôle ── */
  .role-badge {
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    z-index: 10;
  }
  .expert-card:hover .role-badge {
    transform: scale(1.07);
    box-shadow: 0 0 18px rgba(59,130,246,0.55);
  }

  /* ── Tags compétences ── */
  .skill-tag { transition: all 0.25s ease; }
  .skill-tag:hover {
    transform: translateY(-2px) scale(1.05);
    background: rgba(59,130,246,0.28) !important;
    border-color: rgba(59,130,246,0.75) !important;
  }

  /* ── Carte ── */
  .expert-card {
    transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    position: relative;
    background: linear-gradient(135deg, rgba(255,255,255,0.055), rgba(255,255,255,0.018));
    backdrop-filter: blur(3px);
  }
  .expert-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 28px 48px -18px rgba(59,130,246,0.38);
    border-color: rgba(59,130,246,0.65) !important;
  }

  /* ── Bio & nom ── */
  .expert-bio { transition: color 0.3s ease; }
  .expert-card:hover .expert-bio { color: #cbd5e1; }

  .expert-name { transition: all 0.3s ease; }
  .expert-card:hover .expert-name {
    background: linear-gradient(135deg, #60a5fa, #a78bfa);
    background-size: 200% 200%;
    animation: gradientShift 2s ease infinite;
  }
`;

/* ─────────────────────────────────────────────────────────────
   VARIANTS FRAMER-MOTION
───────────────────────────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};
const staggerContainer = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

/* ─────────────────────────────────────────────────────────────
   COMPOSANT PRINCIPAL
───────────────────────────────────────────────────────────── */
const Experts = () => {

  const experts = [
    {
      id: 1,
      name: 'Meya Dorodoro',
      role: 'CEO & Fondateur',
      position: 'Expert en Informatique Appliquée & Développeur Full-Stack',
      bio: "Plus de 15 ans d'expérience en infrastructure IT et cybersécurité en Afrique centrale. Visionnaire et passionné par l'innovation technologique.",
      image: expert1,
      gradient: 'from-blue-500 to-blue-700',
      posClass: 'pos1',
      socials: {
        linkedin: 'https://linkedin.com/in/meya-dorodoro',
        github:   'https://github.com/meyadorodoro',
        twitter:  'https://twitter.com/meyadorodoro',
        email:    'oseedoro@gmail.com'
      },
      skills: ['Cybersécurité', 'Infrastructure IT', 'Cloud Computing', 'Leadership'],
      certifications: ['CISSP', 'PMP', 'AWS Solutions Architect']
    },
    {
      id: 2,
      name: 'Osee Mbongo',
      role: 'Directrice Technique',
      position: 'Ingénieur Télécoms',
      bio: "Ingénieur en télécommunications, spécialiste des réseaux haut débit et des solutions cloud. Elle pilote l'innovation technique et la R&D.",
      image: expert2,
      gradient: 'from-cyan-500 to-cyan-700',
      posClass: 'pos2',
      socials: {
        linkedin: 'https://linkedin.com/in/osee-mbongo',
        github:   'https://github.com/oseembongo',
        twitter:  'https://twitter.com/oseembongo',
        email:    'osee.mbongo@omedev.com'
      },
      skills: ['Réseaux', 'Télécommunications', 'Cloud', '5G', 'IoT'],
      certifications: ['CCNP', 'Azure Administrator', '5G Specialist']
    },
    {
      id: 3,
      name: 'Paul Kasongo',
      role: 'Responsable Énergie',
      position: 'Ingénieur Énergies Renouvelables',
      bio: "Ingénieur en énergies renouvelables, il pilote nos projets solaires et d'efficacité énergétique. Expert en solutions photovoltaïques.",
      image: expert3,
      gradient: 'from-amber-500 to-orange-600',
      posClass: 'pos3',
      socials: {
        linkedin: 'https://linkedin.com/in/paul-kasongo',
        twitter:  'https://twitter.com/paulkasongo',
        email:    'paul.kasongo@omedev.com'
      },
      skills: ['Solaire photovoltaïque', 'Efficacité énergétique', 'Stockage batterie', 'Micro-grids'],
      certifications: ['PV Design Expert', 'Energy Manager', 'HSE']
    },
    {
      id: 4,
      name: 'Stéphane',
      role: 'Développement',
      position: 'Développeuse Full-Stack',
      bio: 'Développeuse full-stack, elle conçoit des applications web et mobiles sur mesure. Spécialisée en React, Node.js et architecture cloud-native.',
      image: expert4,
      gradient: 'from-violet-500 to-purple-700',
      posClass: 'pos4',
      socials: {
        linkedin:  'https://linkedin.com/in/claire-mbenza',
        github:    'https://github.com/clairembenza',
        twitter:   'https://twitter.com/clairembenza',
        instagram: 'https://instagram.com/claire.dev',
        email:     'claire.mbenza@omedev.com'
      },
      skills: ['React', 'Node.js', 'Flutter', 'MongoDB', 'AWS'],
      certifications: ['Meta Frontend Developer', 'AWS Cloud Practitioner']
    },
    {
      id: 5,
      name: 'Rodric Kasway',
      role: 'Expert Cybersécurité',
      position: 'Pentester & Consultant Sécurité',
      bio: "Spécialiste en sécurité offensive et défensive. Il réalise des audits de sécurité, tests d'intrusion et accompagne les entreprises dans leur conformité.",
      image: expert5,
      gradient: 'from-red-500 to-rose-700',
      posClass: 'pos5',
      socials: {
        linkedin: 'https://linkedin.com/in/yannick-tshibangu',
        github:   'https://github.com/yannicksec',
        twitter:  'https://twitter.com/yannick_sec',
        email:    'yannick.tshibangu@omedev.com'
      },
      skills: ['Pentest', 'Audit sécurité', 'SOC', 'ISO 27001', 'Forensics'],
      certifications: ['CEH', 'OSCP', 'CISA']
    },
    {
      id: 6,
      name: 'Fido Makayabu',
      role: 'Admin. Réseau',
      position: 'Expert Télécommunications & Administration Réseau',
      bio: "Certifié dans le domaine des télécommunications et de l'administration réseau, il conçoit et maintient des infrastructures réseau robustes et sécurisées.",
      image: expert6,
      gradient: 'from-teal-500 to-emerald-700',
      posClass: 'pos6',
      socials: {
        linkedin:  'https://linkedin.com/in/fido-makayabu',
        instagram: 'https://instagram.com/fido.tech',
        behance:   'https://behance.net/fidomakayabu',
        email:     'fido.makayabu@omedev.com'
      },
      skills: ['Networking', 'Cisco', 'Juniper', 'Linux', 'Windows Server'],
      certifications: ['CCNA', 'CCNP', 'MCSE']
    },
    {
      id: 7,
      name: 'Amosi Aristote',
      role: 'Resp. Climatisation',
      position: 'Expert en Installation & Maintenance HVAC',
      bio: "Certifié dans le domaine de la climatisation, il intervient sur l'installation, la maintenance et la réparation des systèmes de climatisation et de réfrigération.",
      image: expert7,
      gradient: 'from-sky-500 to-blue-700',
      posClass: 'pos7',
      socials: {
        linkedin:  'https://linkedin.com/in/amosi-aristote',
        instagram: 'https://instagram.com/amosi.clim',
        email:     'amosi.aristote@omedev.com'
      },
      skills: ['Climatisation', 'HVAC', 'Installation', 'Maintenance', 'Réparation'],
      certifications: ['Certificat Climatisation', 'Maintenance HVAC', 'Technicien Réfrigération']
    },
    {
      id: 8,
      name: 'Rodric Kasway',
      role: 'Resp. Vidéosurveillance',
      position: 'Expert en Vidéosurveillance & Configuration Serveurs',
      bio: "Spécialiste en vidéosurveillance et configuration de serveurs, il conçoit et maintient des systèmes de surveillance robustes et sécurisés pour nos clients.",
      image: expert8,
      gradient: 'from-indigo-500 to-indigo-700',
      posClass: 'pos8',
      socials: {
        linkedin:  'https://linkedin.com/in/rodric-kasway',
        instagram: 'https://instagram.com/rodric.tech',
        email:     'rodric.kasway@omedev.com'
      },
      skills: ['Vidéosurveillance', 'NVR/DVR', 'IP Cameras', 'Configuration réseau', 'Câblage'],
      certifications: ['Certificat Vidéosurveillance', 'Technicien Sécurité Électronique']
    },
    {
      id: 9,
      name: 'Glody Ntudi',
      role: 'Infographie & IT',
      position: 'Expert en Infographie & Informatique',
      bio: "Certifié en informatique et graphisme, il conçoit des solutions visuelles et numériques innovantes : identité visuelle, supports de communication et outils informatiques.",
      image: expert9,
      gradient: 'from-fuchsia-500 to-pink-700',
      posClass: 'pos9',
      socials: {
        linkedin:  'https://linkedin.com/in/glody-ntudi',
        instagram: 'https://instagram.com/glody.design',
        behance:   'https://behance.net/glodyntudi',
        email:     'glody.ntudi@omedev.com'
      },
      skills: ['Photoshop', 'Illustrator', 'InDesign', 'Identité visuelle', 'Web Design'],
      certifications: ['Adobe Certified', 'Technicien Infographiste', 'Web Designer']
    },
  ];

  const stats = [
    { value: '8+',   label: "Années d'expertise",  icon: Calendar  },
    { value: '150+', label: 'Projets réalisés',     icon: Briefcase },
    { value: '98%',  label: 'Clients satisfaits',   icon: Star      },
    { value: '24/7', label: 'Support technique',    icon: Headphones },
  ];

  const getSocialUrl = (platform, url) =>
    platform === 'email' ? `mailto:${url}` : url;

  const SocialIcon = ({ platform, url }) => {
    const icons = {
      linkedin: FaLinkedin,
      github:   FaGithub,
      twitter:  FaTwitter,
      instagram: FaInstagram,
      behance:  FaBehance,
      email:    MdEmail
    };
    const Icon = icons[platform];
    if (!url || !Icon) return null;
    return (
      <a
        href={getSocialUrl(platform, url)}
        target={platform === 'email' ? '_self' : '_blank'}
        rel={platform === 'email' ? '' : 'noopener noreferrer'}
        className="social-icon w-9 h-9 rounded-full bg-white/15 flex items-center justify-center
                   transition-all duration-300 hover:scale-115 hover:bg-white/35 group"
      >
        <Icon size={15} className="text-gray-300 group-hover:text-white transition-colors" />
      </a>
    );
  };

  return (
    <>
      <style>{globalStyles}</style>

      {/* ══════════════════════════ HERO ══════════════════════════ */}
      <section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 animate-slow-zoom"
            style={{
              backgroundImage: `url('https://img.freepik.com/photos-gratuite/contexte-energie-nucleaire-ia-innovation-future-technologie-rupture_53876-129783.jpg?semt=ais_hybrid&w=740&q=80')`
            }}
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-900/50 to-indigo-900/20" />
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
        <div className="absolute w-96 h-96 bg-blue-600/20 top-20 -left-48 rounded-full filter blur-[100px] animate-float" />
        <div className="absolute w-80 h-80 bg-indigo-700/15 bottom-20 right-10 rounded-full filter blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute w-60 h-60 bg-cyan-500/10 top-1/2 left-1/2 -translate-x-1/2 rounded-full filter blur-[100px] animate-float" style={{ animationDelay: '4s' }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full bg-blue-600/20 border border-blue-500/30 backdrop-blur-sm"
            >
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-ring" />
              <span className="text-blue-300 font-semibold text-sm tracking-wide font-syne">Notre équipe d'élite</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tight mb-6 font-syne"
            >
              Des{' '}
              <span className="relative inline-block">
                <span className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 blur-2xl opacity-50" />
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400">
                  experts passionnés
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
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-gray-300 text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Une équipe multidisciplinaire dédiée à votre réussite technologique et énergétique.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link to="/contact" className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg">
                Nous contacter <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/realisations" className="group border-2 border-white/30 hover:border-white px-8 py-3 rounded-xl font-semibold text-white hover:bg-white/10 transition-all duration-300 hover:scale-105">
                Voir nos réalisations
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 text-slate-950/20">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════ STATS ══════════════════════════ */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="relative group bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl p-6 text-center transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Icon size={24} className="text-white" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-white font-syne">{stat.value}</div>
                    <div className="text-sm text-gray-400 mt-1 font-medium">{stat.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════ GRILLE EXPERTS ══════════════════════════ */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/10">
        <div className="container mx-auto px-4 py-20">

          {/* Titre section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-5 py-2 mb-5">
              <Users size={16} className="text-blue-400" />
              <span className="text-blue-300 text-sm font-semibold tracking-wide">Notre équipe</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white font-syne mb-4">Rencontrez nos experts</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Des professionnels qualifiés à votre service</p>
          </motion.div>

          {/* Cartes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experts.map((expert, i) => (
              <motion.div
                key={expert.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="expert-card group border border-white/10 rounded-2xl overflow-hidden"
              >
                {/* Anneau lumineux */}
                <div className="glow-ring" />

                {/* ── Zone photo ── */}
                <div className="expert-image-container">
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className={`expert-image ${expert.posClass}`}
                    loading="lazy"
                  />

                  {/* Couches d'effets */}
                  <div className="image-overlay" />
                  <div className="image-shine" />
                  <div className="image-bottom-fade" />

                  {/* Badge rôle — coin supérieur droit */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className={`role-badge px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r ${expert.gradient} text-white shadow-lg backdrop-blur-sm`}>
                      {expert.role}
                    </div>
                  </div>

                  {/* Réseaux sociaux — bas de photo, centré */}
                  <div className="absolute bottom-4 left-0 right-0 flex gap-2 justify-center z-10 px-4">
                    {Object.entries(expert.socials).map(([platform, url]) => (
                      <SocialIcon key={platform} platform={platform} url={url} />
                    ))}
                  </div>
                </div>

                {/* ── Corps de la carte ── */}
                <div className="p-6">
                  {/* Nom */}
                  <h3 className="expert-name text-xl font-bold font-syne mb-1
                                 bg-gradient-to-r from-white to-white bg-clip-text text-transparent
                                 transition-all duration-300">
                    {expert.name}
                  </h3>

                  {/* Poste */}
                  <p className={`text-xs font-semibold mb-3 bg-gradient-to-r ${expert.gradient} bg-clip-text text-transparent uppercase tracking-wide`}>
                    {expert.position}
                  </p>

                  {/* Bio */}
                  <p className="expert-bio text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3 transition-all duration-300">
                    {expert.bio}
                  </p>

                  {/* Séparateur */}
                  <div className="w-full h-px bg-white/5 mb-4" />

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {expert.skills.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="skill-tag text-xs px-2.5 py-1 rounded-full bg-white/8 text-gray-300 border border-white/10 cursor-default"
                        style={{ background: 'rgba(255,255,255,0.06)' }}
                      >
                        {skill}
                      </span>
                    ))}
                    {expert.skills.length > 3 && (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/20">
                        +{expert.skills.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Certifications */}
                  <details className="mt-1 group/det">
                    <summary className="text-xs text-blue-400 cursor-pointer hover:text-blue-300 transition-colors flex items-center gap-1.5 select-none">
                      <Award size={12} />
                      Certifications ({expert.certifications.length})
                    </summary>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {expert.certifications.map((cert, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/25">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </details>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════ CTA ══════════════════════════ */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/5">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, rgba(59,130,246,0.3) 0%, transparent 60%),
                            radial-gradient(circle at 80% 70%, rgba(6,182,212,0.2) 0%, transparent 60%)`
        }} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/30 hover:border-blue-500/50 text-center"
            >
              <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-blue-500/50">
                <Target size={32} className="text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white font-syne mb-3">Audit gratuit</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Bénéficiez d'un diagnostic complet de vos infrastructures sans engagement.
              </p>
              <Link to="/audit-gratuit" className="inline-flex items-center gap-2 bg-white/10 border border-white/20 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Demander un audit <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/30 hover:border-amber-500/50 text-center"
            >
              <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-amber-500/50">
                <Handshake size={32} className="text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white font-syne mb-3">Devis personnalisé</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Recevez une proposition sur mesure adaptée à vos besoins et votre budget.
              </p>
              <Link to="/demander-devis" className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-amber-500/30">
                Demander un devis <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Experts;


// src/data/projetsData.js
export const projetsData = [
  {
    id: 1,
    titre: "Installation réseau haut débit - Hôtel Méridien",
    slug: "installation-reseau-hotel-meridien",
    categorie: "IT",
    imagePrincipale: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600",
    galerieImages: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800",
    ],
    descriptionCourte: "Déploiement d’une infrastructure réseau complète (fibre, switches, WiFi6) pour un hôtel 5 étoiles.",
    descriptionLongue: "L’hôtel Méridien souffrait de coupures réseau et d’une couverture WiFi inégale. OMDEVE a installé 24 points d’accès Ubiquiti, un routage VLAN, et une liaison fibre optique redondante. Résultat : débit monté à 1 Gbps, roaming parfait, satisfaction client +95%.",
    technologies: ["Ubiquiti", "Fibre optique", "VLAN", "WiFi 6", "pfSense"],
    client: {
      nom: "Hôtel Méridien",
      logo: "https://via.placeholder.com/80?text=Meridien",
      temoignage: "OMDEVE a transformé notre réseau. Plus aucune plainte client, et l’équipe technique est réactive.",
      clientNom: "Jean-Paul K.",
      clientPoste: "Directeur des opérations",
      note: 5,
      photoClient: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    featured: true,
    date: "2024-02-15"
  },
  {
    id: 2,
    titre: "Audit cybersécurité & mise en place firewall - Banque Atlantique",
    slug: "audit-cybersecurite-banque-atlantique",
    categorie: "Securite",
    imagePrincipale: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600",
    galerieImages: ["https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800"],
    descriptionCourte: "Audit complet, tests d’intrusion et installation d’une solution firewall haute sécurité.",
    descriptionLongue: "La Banque Atlantique a fait appel à OMDEVE pour sécuriser son système de transactions en ligne. Nous avons réalisé un audit externe/interne, corrigé 12 vulnérabilités critiques, et installé un cluster de firewalls Fortinet avec IPS/IDS. Aucune intrusion depuis 6 mois.",
    technologies: ["Fortinet", "Nessus", "Wireshark", "IDS/IPS", "VPN IPSec"],
    client: {
      nom: "Banque Atlantique",
      temoignage: "Un travail minutieux et une équipe très professionnelle. Rapport d’audit clair et actions rapides.",
      clientNom: "Rachel M.",
      clientPoste: "RSSI",
      note: 5,
      photoClient: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    featured: false,
    date: "2024-01-10"
  },
  {
    id: 3,
    titre: "Site e-commerce complet - Boutique 'Mode & Co'",
    slug: "site-ecommerce-mode-co",
    categorie: "Digital",
    imagePrincipale: "https://images.unsplash.com/photo-1523475496153-3b2c5a7c9b1a?w=600",
    galerieImages: ["https://images.unsplash.com/photo-1523475496153-3b2c5a7c9b1a?w=800"],
    descriptionCourte: "Développement d’une plateforme e-commerce avec paiement intégré, gestion de stock et SEO.",
    descriptionLongue: "Création d’un site sur mesure (React + Node.js) pour une marque de vêtements. Paiement Stripe, dashboard fournisseur, recommandations produits par IA. +230% de ventes en 3 mois.",
    technologies: ["React", "Node.js", "Stripe", "MongoDB", "Elasticsearch"],
    client: {
      nom: "Mode & Co",
      temoignage: "Notre boutique en ligne explose grâce à l’expertise d’OMDEVE. Interface fluide et support impeccable.",
      clientNom: "Sophie L.",
      clientPoste: "Fondatrice",
      note: 5,
      photoClient: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    featured: true,
    date: "2023-11-20"
  },
  {
    id: 4,
    titre: "Installation panneaux solaires - Immeuble Green Tower",
    slug: "panneaux-solaires-green-tower",
    categorie: "Energie",
    imagePrincipale: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600",
    galerieImages: ["https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800"],
    descriptionCourte: "Étude, fourniture et installation de 120 panneaux photovoltaïques pour un immeuble de bureaux.",
    descriptionLongue: "Green Tower souhaitait réduire sa facture énergétique. OMDEVE a réalisé un audit solaire, installé des panneaux monocristallins 400Wc et un système de monitoring. Économie annuelle : 35% sur l’électricité.",
    technologies: ["Panneaux solaires", "Onduleurs Huawei", "Monitoring IoT", "Batteries Lithium"],
    client: {
      nom: "Green Tower",
      temoignage: "Un projet mené de A à Z, dans les délais et le budget. L’équipe OMDEVE est très compétente.",
      clientNom: "Koffi A.",
      clientPoste: "Gérant",
      note: 5,
      photoClient: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    featured: false,
    date: "2023-09-05"
  },
  {
    id: 5,
    titre: "Formation cybersécurité - Équipe ministère",
    slug: "formation-cybersecurite-ministere",
    categorie: "Formation",
    imagePrincipale: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600",
    galerieImages: ["https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800"],
    descriptionCourte: "Formation certifiante pour 50 agents sur les bonnes pratiques de cybersécurité.",
    descriptionLongue: "Ateliers pratiques, phishing simulation, gestion des mots de passe et chiffrement. Taux de réussite 98%, et baisse de 70% des incidents signalés.",
    technologies: ["E-learning", "Simulateur phishing", "Certification ISO 27001"],
    client: {
      nom: "Ministère des Postes",
      temoignage: "Une formation concrète et adaptée à nos métiers. Les agents sont désormais vigilants.",
      clientNom: "Paul D.",
      clientPoste: "DRH",
      note: 4.8,
      photoClient: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    featured: false,
    date: "2024-03-01"
  }
];






















































































