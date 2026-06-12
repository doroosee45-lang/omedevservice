







import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, Rocket, Star, Shield, Wrench,
  Settings, Building2, Home, ShoppingBag, Hotel, Utensils,
  BookOpen, Heart, Phone, ChevronRight,
  Hammer, Layers, Eye, Package, Users, Clock, Award,
  Loader2, AlertCircle,
} from 'lucide-react';
import { quoteRequests as quoteApi } from '../services/api';

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: #0f172a;
    color: #e2e8f0;
    overflow-x: hidden;
  }

  .font-syne { font-family: 'Syne', sans-serif; }

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

  .service-img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    display: block;
    transition: transform 0.6s ease;
  }
  .group:hover .service-img {
    transform: scale(1.07);
  }
`;

// ─── DATA ───────────────────────────────────────────────────────────────────

const ferronnerieCategories = [
  {
    id: 'ferronnerie-metallique',
    name: 'Ferronnerie Métallique',
    icon: Hammer,
    gradient: 'from-orange-500 to-orange-600',
    bgLight: 'bg-orange-500/10',
    textLight: 'text-orange-400',
    borderLight: 'border-orange-500/30',
    description: 'Fabrication et installation de toutes structures métalliques sur mesure pour votre espace',
    services: [
      {
        name: 'Portes métalliques',
        description: 'Portes métalliques modernes et portes blindées fabriquées sur mesure selon vos dimensions et finitions souhaitées.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVC-Ydppn6ibRy7S_LSDWWgJs_HdAvGTXBaw&s',
      },
      {
        name: 'Portails & Clôtures',
        description: 'Portails coulissants et battants, clôtures et barrières robustes pour sécuriser et embellir vos espaces extérieurs.',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=85',
      },
      {
        name: 'Fenêtres',
        description: 'Fenêtres aluminium et fer forgé, simples ou double vitrage, coulissantes ou à la française, sur mesure.',
        image: 'https://images.unsplash.com/photo-1523413363574-c40a0cf48a50?w=800&q=85',
      },
      {
        name: 'Escaliers & Garde-corps',
        description: 'Escaliers métalliques design et garde-corps élégants, conçus pour allier sécurité, solidité et esthétique moderne.',
        image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=85',
      },
      {
        name: 'Structures métalliques',
        description: 'Réalisation de structures métalliques complexes pour charpentes, hangars, abris et bâtiments industriels.',
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=85',
      },
    ],
  },
  {
    id: 'mobilier-moderne',
    name: 'Mobilier Moderne',
    icon: Layers,
    gradient: 'from-amber-500 to-amber-600',
    bgLight: 'bg-amber-500/10',
    textLight: 'text-amber-400',
    borderLight: 'border-amber-500/30',
    description: 'Conception et fabrication de mobilier métallique haut de gamme pour particuliers et professionnels',
    services: [
      {
        name: 'Salons VIP',
        description: 'Salons VIP et salons de bureau raffinés, disponibles en 5 et 7 places, entièrement sur mesure selon votre espace.',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=85',
      },
      {
        name: 'Lits & Chambres',
        description: 'Lits modernes simples, doubles et king size, avec ou sans rangements intégrés. Chambres complètes disponibles.',
        image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&q=85',
      },
      {
        name: 'Tables',
        description: 'Tables à manger, tables de conférence et tables basses au design contemporain et épuré, fabriquées sur mesure.',
        image: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=800&q=85',
      },
      {
        name: 'Chaises design',
        description: 'Chaises modernes, chaises de bureau, chaises restaurant et chaises VIP fabriquées sur mesure avec finitions soignées.',
        image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=85',
      },
      {
        name: 'Mobilier professionnel',
        description: 'Tout type de mobilier métallique professionnel adapté à vos locaux commerciaux, tertiaires ou institutionnels.',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=85',
      },
    ],
  },
  {
    id: 'vitrines-commerciales',
    name: 'Vitrines Commerciales',
    icon: Eye,
    gradient: 'from-cyan-500 to-cyan-600',
    bgLight: 'bg-cyan-500/10',
    textLight: 'text-cyan-400',
    borderLight: 'border-cyan-500/30',
    description: "Solutions de vitrine et d'agencement commercial pour valoriser vos produits et votre image de marque",
    services: [
      {
        name: 'Vitrines de magasins',
        description: 'Vitrines sur mesure pour boutiques et commerces de détail, alliant esthétique, visibilité et fonctionnalité optimale.',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=85',
      },
      {
        name: 'Vitrines spécialisées',
        description: 'Vitrines dédiées pour pharmacies, bijouteries et commerces de luxe avec fermetures sécurisées et éclairage intégré.',
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=85',
      },
      {
        name: 'Comptoirs commerciaux',
        description: "Comptoirs d'accueil et de vente en aluminium et verre, fabriqués selon vos dimensions et contraintes précises.",
        image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=85',
      },
      {
        name: 'Structures aluminium',
        description: "Façades et structures aluminium et verre pour une image professionnelle et moderne de votre espace commercial.",
        image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=85',
      },
    ],
  },
];

const advantages = [
  { icon: Settings, title: 'Fabrication Sur Mesure', description: 'Chaque projet est conçu selon vos dimensions, vos préférences et votre budget.', gradient: 'from-orange-500 to-orange-600' },
  { icon: Shield, title: 'Qualité Professionnelle', description: 'Matériaux résistants et durables garantissant la longévité de chaque réalisation.', gradient: 'from-amber-500 to-amber-600' },
  { icon: Wrench, title: 'Installation Complète', description: "Nos équipes assurent la fabrication, le transport et l'installation sur site.", gradient: 'from-cyan-500 to-cyan-600' },
  { icon: Users, title: 'Accompagnement Personnalisé', description: "Conseil depuis l'étude du projet jusqu'à sa réalisation finale.", gradient: 'from-blue-500 to-blue-600' },
  { icon: Clock, title: 'Service Après-Vente', description: 'Support technique et maintenance disponibles selon les besoins du client.', gradient: 'from-green-500 to-green-600' },
];

const sectors = [
  { icon: Home, label: 'Résidentiel' },
  { icon: ShoppingBag, label: 'Commercial' },
  { icon: Building2, label: 'Industriel' },
  { icon: Hotel, label: 'Hôtellerie' },
  { icon: Utensils, label: 'Restauration' },
  { icon: BookOpen, label: 'Établissements scolaires' },
  { icon: Heart, label: 'Centres de santé' },
  { icon: Award, label: 'Administrations publiques' },
];

const realisations = [
  'Portes modernes', 'Portails automatiques', 'Fenêtres aluminium',
  'Escaliers métalliques', 'Garde-corps', 'Salons VIP',
  'Lits modernes', 'Vitrines commerciales', 'Mobilier sur mesure',
];

// ─── SERVICE CARD ────────────────────────────────────────────────────────────

const ServiceCard = ({ service, gradient, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.07 }}
    className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-orange-500/40 flex flex-col"
  >
    {/* ── Image ── */}
    <div className="relative overflow-hidden" style={{ height: '220px' }}>
      <img
        src={service.image}
        alt={service.name}
        className="service-img"
        loading="lazy"
      />
      {/* Overlay bas */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(8,14,26,0.80) 0%, rgba(8,14,26,0.20) 55%, transparent 100%)',
        }}
      />
      {/* Badge "Sur devis" */}
      <span className="absolute top-3 right-3 text-xs font-semibold text-orange-300 bg-black/50 backdrop-blur-sm border border-orange-500/40 px-3 py-1 rounded-full">
        Sur devis
      </span>
      {/* Icône gradient en bas-gauche de l'image */}
      <div
        className={`absolute bottom-3 left-4 w-9 h-9 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}
      >
        <CheckCircle size={18} className="text-white" />
      </div>
    </div>

    {/* ── Contenu ── */}
    <div className="p-6 flex flex-col flex-1">
      <h3 className="text-lg font-bold text-white font-syne mb-2 group-hover:text-orange-300 transition-colors leading-snug">
        {service.name}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1 group-hover:text-gray-300 transition-colors">
        {service.description}
      </p>
      <Link
        to="/demander-devis"
        className="inline-flex items-center gap-2 text-orange-400 text-sm font-semibold group-hover:text-orange-300 transition-all group-hover:gap-3 mt-auto"
      >
        Demander un devis <ArrowRight size={14} />
      </Link>
    </div>
  </motion.div>
);

// ─── CATEGORY SECTION ────────────────────────────────────────────────────────

const CategorySection = ({ category, index }) => (
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
          <span className="text-sm text-gray-500">{category.services.length} services disponibles</span>
        </div>
        <p className="text-gray-400 text-base max-w-3xl">{category.description}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.services.map((service, idx) => (
          <ServiceCard key={idx} service={service} gradient={category.gradient} index={idx} />
        ))}
      </div>
    </div>
  </section>
);

// ─── PAGE ────────────────────────────────────────────────────────────────────

const INIT_FORM = { fullName: '', phone: '', email: '', ferronnerieType: '', dimensions: '', description: '' };

const FerronneriePage = () => {
  const [form, setForm] = useState(INIT_FORM);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.phone || !form.description) {
      setError('Veuillez remplir les champs obligatoires.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await quoteApi.create({ ...form, serviceType: 'ferronnerie' });
      setSent(true);
      setForm(INIT_FORM);
    } catch (err) {
      setError(err?.response?.data?.message || 'Une erreur est survenue. Réessayez.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{globalStyles}</style>

      {/* ══ HERO ══ */}
      <section className="relative text-white overflow-hidden" style={{ minHeight: '60vh' }}>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=90')` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom,
              rgba(8,14,26,0.65) 0%,
              rgba(8,14,26,0.25) 30%,
              rgba(8,14,26,0.25) 60%,
              rgba(8,14,26,0.90) 100%
            )`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 75% 40%, rgba(234,88,12,0.14) 0%, transparent 55%)' }}
        />

        <div
          className="relative z-10 container mx-auto px-4 flex flex-col items-center justify-center text-center"
          style={{ minHeight: '60vh', paddingTop: '5rem', paddingBottom: '3rem' }}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-orange-500/30 backdrop-blur-sm"
            style={{ background: 'rgba(234,88,12,0.12)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse-ring" />
            <span className="text-orange-300 font-semibold text-[11px] tracking-widest font-syne uppercase">
              Fabrication & Installation Sur Mesure
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-syne font-extrabold leading-[1.1] mb-4"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 4.8rem)', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
          >
            Ferronnerie &{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(90deg, #fb923c, #fbbf24, #fde68a)' }}
            >
              Mobilier
            </span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="w-16 h-[3px] rounded-full mb-5 mx-auto"
            style={{ background: 'linear-gradient(90deg, #f97316, #fbbf24)' }}
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-200 text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed"
            style={{ textShadow: '0 1px 10px rgba(0,0,0,0.7)' }}
          >
            Conception, fabrication et installation de{' '}
            <strong className="text-white font-semibold">portes, portails, mobilier moderne</strong>{' '}
            et ouvrages métalliques sur mesure.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-3 justify-center mb-12"
          >
            <Link
              to="/demander-devis"
              className="group inline-flex items-center gap-2 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105 hover:shadow-xl"
              style={{ background: 'linear-gradient(90deg, #f97316, #f59e0b)' }}
            >
              Demander un devis gratuit
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/realisations"
              className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 backdrop-blur-sm bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105"
            >
              <CheckCircle size={15} /> Voir nos réalisations
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.52 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {[
              { val: '3',    label: 'Catégories',      color: '#fb923c' },
              { val: '14+',  label: "Types d'ouvrages", color: '#fbbf24' },
              { val: '100%', label: 'Sur mesure',       color: '#34d399' },
              { val: '24/7', label: 'Support SAV',      color: '#60a5fa' },
            ].map((s, i) => (
              <div
                key={i}
                className="flex flex-col items-center px-4 py-2.5 rounded-xl border border-white/10 backdrop-blur-sm"
                style={{ background: 'rgba(255,255,255,0.05)' }}
              >
                <span className="font-syne font-bold text-xl" style={{ color: s.color }}>{s.val}</span>
                <span className="text-gray-400 text-[11px] mt-0.5">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0" style={{ color: '#0f172a' }}>
          <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="w-full h-10 md:h-14">
            <path d="M0,40 C200,80 400,0 600,40 C800,80 1000,0 1200,40 L1200,80 L0,80 Z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section className="py-12 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: '3',    label: 'Catégories de services', color: 'text-orange-400' },
              { val: '14+',  label: "Types d'ouvrages",       color: 'text-amber-400'  },
              { val: '100%', label: 'Fabrication sur mesure', color: 'text-cyan-400'   },
              { val: '24/7', label: 'Support & SAV',          color: 'text-emerald-400'},
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:scale-105 hover:bg-white/10 transition-all duration-300">
                <div className={`text-3xl font-bold ${stat.color} font-syne`}>{stat.val}</div>
                <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ INTRO ══ */}
      <section className="py-16 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-300 text-sm font-semibold">
              <Package size={16} /> Présentation
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 font-syne">
              Omedev Services — Ferronnerie & Mobilier Moderne
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Omedev Services vous accompagne dans la{' '}
              <strong className="text-white">conception, la fabrication et l'installation</strong> de solutions de
              ferronnerie et de mobilier moderne sur mesure pour les particuliers, entreprises, commerces et
              institutions. Nous réalisons des portes métalliques, fenêtres, portails, vitrines commerciales, salons
              VIP, lits modernes, tables, chaises et divers ouvrages métalliques adaptés à vos besoins.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══ QUICK NAV ══ */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 pb-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {ferronnerieCategories.map((cat, idx) => (
              <a
                key={idx}
                href={`#${cat.id}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${cat.bgLight} ${cat.textLight} border ${cat.borderLight} hover:scale-105 hover:brightness-110`}
              >
                {cat.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ══ CATEGORIES ══ */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4 py-4">
          {ferronnerieCategories.map((category, idx) => (
            <div key={idx} id={category.id}>
              <CategorySection category={category} index={idx} />
            </div>
          ))}
        </div>
      </div>

      {/* ══ POURQUOI NOUS ══ */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm font-semibold">
              <Star size={16} /> Nos engagements
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-syne">
              Pourquoi choisir{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                Omedev Services ?
              </span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {advantages.map((adv, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:-translate-y-2 hover:bg-white/10 hover:border-orange-500/30 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${adv.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <adv.icon size={22} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-white font-syne mb-2 group-hover:text-orange-300 transition-colors">
                  {adv.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                  {adv.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ RÉALISATIONS ══ */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-sm font-semibold">
              <Eye size={16} /> Portfolio
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-syne">Nos Réalisations</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto mt-4 mb-4" />
            <p className="text-gray-400 max-w-xl mx-auto">
              Découvrez l'étendue de notre savoir-faire à travers nos différents types de projets réalisés.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto mb-12">
            {realisations.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2.5 hover:bg-orange-500/10 hover:border-orange-500/30 hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <CheckCircle size={14} className="text-orange-400 group-hover:text-orange-300" />
                <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">{item}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-gray-500 text-sm mb-4">Galerie photos et vidéos disponibles sur demande</p>
            <Link
              to="/ferronnerie/projets"
              className="inline-flex items-center gap-2 text-orange-400 font-semibold hover:text-orange-300 transition-colors hover:gap-3"
            >
              Voir toutes les réalisations <ChevronRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══ SECTEURS ══ */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm font-semibold">
              <Building2 size={16} /> Secteurs d'intervention
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-syne">Nous intervenons partout</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {sectors.map((sector, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-blue-500/10 hover:border-blue-500/30 hover:scale-105 transition-all duration-300 text-center cursor-pointer"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:scale-110 transition-all">
                  <sector.icon size={22} />
                </div>
                <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">
                  {sector.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DEVIS FORM ══ */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm font-semibold">
                <Rocket size={16} /> Devis gratuit
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white font-syne mb-4">Vous avez un projet ?</h2>
              <p className="text-gray-400">
                Remplissez le formulaire ci-dessous et notre équipe vous répondra dans les meilleurs délais.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8"
            >
              {sent ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-syne mb-2">Demande envoyée !</h3>
                  <p className="text-gray-400 text-sm mb-6">Notre équipe vous contactera dans les plus brefs délais.</p>
                  <button
                    onClick={() => setSent(false)}
                    className="text-orange-400 text-sm font-medium hover:text-orange-300 transition-colors"
                  >
                    Envoyer une autre demande
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-gray-400 text-sm font-medium mb-2">Nom complet *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="Votre nom"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm font-medium mb-2">Téléphone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+216 XX XXX XXX"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-400 text-sm font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="votre@email.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm font-medium mb-2">Type de projet</label>
                      <select
                        name="ferronnerieType"
                        value={form.ferronnerieType}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-all"
                        style={{ background: '#1e293b' }}
                      >
                        <option value="">Sélectionner...</option>
                        <option value="Porte métallique">Porte métallique</option>
                        <option value="Portail / Clôture">Portail / Clôture</option>
                        <option value="Fenêtre aluminium">Fenêtre aluminium</option>
                        <option value="Escalier / Garde-corps">Escalier / Garde-corps</option>
                        <option value="Salon VIP">Salon VIP</option>
                        <option value="Lit moderne">Lit moderne</option>
                        <option value="Table / Chaise">Table / Chaise</option>
                        <option value="Vitrine commerciale">Vitrine commerciale</option>
                        <option value="Autre">Autre</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm font-medium mb-2">Dimensions (optionnel)</label>
                      <input
                        type="text"
                        name="dimensions"
                        value={form.dimensions}
                        onChange={handleChange}
                        placeholder="Ex : 2m x 1m"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-400 text-sm font-medium mb-2">Description détaillée *</label>
                      <textarea
                        rows={4}
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Décrivez votre projet en détail..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all resize-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-400 text-sm font-medium mb-2">
                        Photo ou plan du projet (optionnel)
                      </label>
                      <div className="w-full bg-white/5 border border-dashed border-white/20 rounded-xl px-4 py-8 text-center hover:border-orange-500/40 transition-all cursor-pointer">
                        <Package size={28} className="text-gray-500 mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">
                          Glissez votre fichier ici ou <span className="text-orange-400">parcourir</span>
                        </p>
                        <p className="text-gray-600 text-xs mt-1">PNG, JPG, PDF jusqu'à 10MB</p>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="mt-4 flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                      <AlertCircle size={16} />
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:scale-[1.01] hover:shadow-xl"
                  >
                    {loading ? (
                      <><Loader2 size={18} className="animate-spin" /> Envoi en cours...</>
                    ) : (
                      <>Demander un devis gratuit <ArrowRight size={18} /></>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ CTA FINAL ══ */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/5">
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: `radial-gradient(circle at 20% 50%, rgba(249,115,22,0.3) 0%, transparent 50%)` }}
        />
        <div className="absolute w-96 h-96 bg-orange-600/20 bottom-0 left-1/2 -translate-x-1/2 rounded-full filter blur-[100px]" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6 text-amber-300 text-sm font-semibold">
              <Rocket size={16} /> Concrétisez votre projet aujourd'hui
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-syne">
              Prêt à démarrer votre projet ?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Notre équipe d'experts est à votre écoute pour étudier votre besoin et vous proposer une solution sur
              mesure adaptée à votre budget.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-xl"
              >
                Contactez-nous <ArrowRight size={18} />
              </Link>
              <a
                href="tel:+21600000000"
                className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white px-8 py-4 rounded-xl font-semibold text-white hover:bg-white/10 transition-all hover:scale-105"
              >
                <Phone size={18} /> Appeler maintenant
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default FerronneriePage;