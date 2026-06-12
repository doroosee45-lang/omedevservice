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