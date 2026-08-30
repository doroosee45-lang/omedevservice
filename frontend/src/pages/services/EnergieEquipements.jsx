import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PublicHero from '../../components/Public/PublicHero';
import TestimonialsCarousel from '../../components/Public/TestimonialsCarousel';
import CTASection from '../../components/Public/CTASection';
import {
  Sun,
  Wind,
  Battery,
  Thermometer,
  Laptop,
  Smartphone,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Zap,
  Star,
  Clock,
  Headphones,
  Phone,
  MessageCircle,
  Rocket,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   DESIGN SYSTEM — identique à la page About
   (navy/electric/turquoise/energy)
   ───────────────────────────────────────────── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  .omedev-energie {
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
  }

  .omedev-energie .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .omedev-energie .section-badge {
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

  .omedev-energie .section-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -.03em;
    margin-bottom: 1rem;
    font-family: 'Syne', sans-serif;
    color: #053876;
  }

  .omedev-energie .section-subtitle {
    font-size: 1rem;
    color: #25364A;
    max-width: 52ch;
    margin: 0 auto;
    line-height: 1.7;
  }

  .omedev-energie .divider {
    width: 64px;
    height: 4px;
    background: linear-gradient(90deg, #0B74C1, #2AACB2, #55DDB5);
    border-radius: 99px;
    margin: 1rem auto 1.5rem;
  }

  .omedev-energie .btn-primary {
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

  .omedev-energie .btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 36px rgba(42,172,178,.28);
  }

  .omedev-energie .btn-outline {
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

  .omedev-energie .btn-outline:hover {
    border-color: #2AACB2;
    color: #0B74C1;
    background: rgba(85,221,181,.08);
    transform: translateY(-3px);
  }

  .omedev-energie .btn-ghost-light {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: .6rem;
    background: rgba(255,255,255,.10);
    color: #fff;
    font-size: .9rem;
    font-weight: 700;
    padding: .85rem 1.7rem;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,.28);
    text-decoration: none;
    transition: all .3s ease;
    cursor: pointer;
    font-family: 'Syne', sans-serif;
  }

  .omedev-energie .btn-ghost-light:hover {
    background: rgba(255,255,255,.18);
    transform: translateY(-3px);
  }

  .omedev-energie .card-hover {
    transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease;
    background: #fff;
    border: 1px solid rgba(5,56,118,.09);
    border-radius: 18px;
    box-shadow: 0 10px 30px rgba(5,56,118,.06);
  }

  .omedev-energie .card-hover:hover {
    transform: translateY(-7px);
    box-shadow: 0 22px 48px rgba(11,116,193,.14);
    border-color: rgba(42,172,178,.35);
  }

  .omedev-energie .omedev-hero {
    background: linear-gradient(135deg, #053876 0%, #1D5B9B 35%, #4681B7 60%, #72A5CE 80%, #A6C3D7 100%);
    position: relative;
  }

  .omedev-energie .omedev-light-section { background: #F6F6F7; }
  .omedev-energie .omedev-white-section { background: #fff; }
  .omedev-energie .omedev-dark-section {
    background: linear-gradient(135deg, #053876 0%, #1D5B9B 55%, #0B74C1 100%);
  }

  .omedev-energie .hero-grid {
    background-image: linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px);
    background-size: 56px 56px;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-16px); }
  }
  .omedev-energie .animate-float { animation: float 6s ease-in-out infinite; }

  .omedev-energie .price-pill {
    font-size: .68rem;
    font-weight: 700;
    padding: .3rem .8rem;
    border-radius: 999px;
    letter-spacing: .02em;
  }

  .omedev-energie .equip-row {
    display: flex;
    gap: .9rem;
    align-items: flex-start;
    background: #fff;
    border: 1px solid rgba(5,56,118,.09);
    border-radius: 14px;
    padding: 1rem 1.1rem;
    transition: all .3s ease;
  }
  .omedev-energie .equip-row:hover {
    border-color: rgba(42,172,178,.35);
    box-shadow: 0 14px 32px rgba(11,116,193,.10);
    transform: translateY(-4px);
  }

  .omedev-energie .gallery-tile {
    border-radius: 18px;
    overflow: hidden;
    border: 1px solid rgba(5,56,118,.09);
    box-shadow: 0 10px 30px rgba(5,56,118,.06);
    position: relative;
  }
  .omedev-energie .gallery-tile img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    display: block;
    transition: transform .7s cubic-bezier(.4,0,.2,1);
  }
  .omedev-energie .gallery-tile:hover img { transform: scale(1.08); }

  .omedev-energie .quote-mark {
    font-family: 'Syne', sans-serif;
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1;
    color: rgba(11,116,193,.15);
  }

  @media (max-width: 768px) {
    .omedev-energie .container { padding: 0 1rem; }
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

const SectionHeader = ({ badge, title, subtitle, light }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={staggerContainer}
    style={{ textAlign: 'center', marginBottom: '3rem' }}
  >
    {badge && (
      <motion.div variants={fadeUp}>
        <span
          className="section-badge"
          style={light ? { background: 'rgba(255,255,255,.14)', color: '#fff', borderColor: 'rgba(255,255,255,.28)' } : {}}
        >
          {badge}
        </span>
      </motion.div>
    )}
    <motion.h2 variants={fadeUp} className="section-title" style={light ? { color: '#fff' } : {}}>
      {title}
    </motion.h2>
    <motion.div variants={fadeUp} className="divider" />
    {subtitle && (
      <motion.p variants={fadeUp} className="section-subtitle" style={light ? { color: 'rgba(255,255,255,.78)' } : {}}>
        {subtitle}
      </motion.p>
    )}
  </motion.div>
);

const colors = {
  navy: '#053876',
  blue: '#0B74C1',
  blueLight: '#4681B7',
  turquoise: '#2AACB2',
  energy: '#55DDB5',
};

/* ─────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────── */
const energyServices = [
  { icon: Sun, title: 'Panneaux photovoltaïques', desc: 'Étude, installation et maintenance de centrales solaires pour particuliers et entreprises.', color: colors.blue, price: 'Sur devis', priceType: 'paid' },
  { icon: Thermometer, title: 'Climatisation (split system)', desc: 'Installation, réparation et entretien de climatiseurs réversibles.', color: colors.turquoise, price: 'Sur devis', priceType: 'paid' },
  { icon: TrendingUp, title: 'Audit énergétique', desc: 'Diagnostic complet de votre consommation et optimisation des coûts.', color: colors.navy, price: 'Gratuit', priceType: 'free' },
  { icon: Battery, title: "Stockage d'énergie", desc: 'Batteries domestiques et industrielles pour autoconsommation.', color: colors.blueLight, price: 'Sur devis', priceType: 'paid' },
];

const equipmentSales = [
  { icon: Laptop, title: 'Ordinateurs professionnels', desc: 'PC, Mac, laptops haute performance – marques certifiées.', color: colors.blue },
  { icon: Smartphone, title: 'Smartphones & tablettes', desc: 'iPhone, Samsung, Huawei – neuf et reconditionné.', color: colors.turquoise },
  { icon: Thermometer, title: 'Climatiseurs', desc: 'Split, mural, gainable – toutes marques.', color: colors.navy },
  { icon: Sun, title: 'Panneaux solaires', desc: 'Monocristallins, polycristallins, kits complets.', color: colors.blueLight },
];

const stats = [
  { value: '200+', label: 'Installations solaires', icon: Sun },
  { value: '150+', label: 'Climatisations posées', icon: Thermometer },
  { value: '98%', label: 'Clients satisfaits', icon: Star },
  { value: '24/7', label: 'Support technique', icon: Clock },
];

const testimonials = [
  {
    name: 'Jean-Paul M.',
    role: 'Propriétaire, Maison individuelle',
    quote: 'OMEDEV a installé 12 panneaux solaires chez moi. En un an, j\u2019ai réduit ma facture d\u2019électricité de 60%.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  },
  {
    name: 'Catherine D.',
    role: 'Directrice, Hôtel 3 étoiles',
    quote: 'Ils ont remplacé toute notre climatisation en 3 jours, avec un suivi impeccable.',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
  },
];

const benefits = [
  { icon: CheckCircle, text: 'Installateurs certifiés RGE (Reconnu Garant de l\u2019Environnement)' },
  { icon: CheckCircle, text: 'Matériel de marques premium (LG, Daikin, SunPower)' },
  { icon: CheckCircle, text: 'Suivi de chantier et garantie décennale' },
  { icon: CheckCircle, text: 'Aide au montage des dossiers de subventions' },
  { icon: CheckCircle, text: 'Service après-vente réactif' },
];

const galleryImages = [
  'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=500&fit=crop',
];

const auditItems = [
  'Analyse complète de vos consommations',
  'Détection des fuites et gaspillages',
  'Recommandations sur mesure (isolation, équipements)',
  'Simulation de rentabilité pour panneaux solaires',
  'Accompagnement aux aides financières (MaPrimeRénov, CEE)',
];

const EnergieEquipements = () => {
  return (
    <div className="omedev-energie">
      <style>{globalStyles}</style>

      {/* ==================== HERO ==================== */}
      <PublicHero
        badge="Énergie & Équipements"
        title="Solutions énergétiques durables"
        highlight="durables"
        subtitle="Panneaux solaires, climatisation, audit énergétique et vente de matériel high-tech."
        primaryAction={{ label: 'Audit énergétique gratuit', to: '/audit-gratuit' }}
        secondaryAction={{ label: 'Demander un devis', to: '/contact' }}
      />

      {/* ==================== SERVICES ÉNERGIE ==================== */}
      <section className="omedev-white-section py-24">
        <div className="container">
          <SectionHeader badge="Nos prestations" title="Services énergétiques" subtitle="Des solutions complètes, de l'étude à la maintenance" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {energyServices.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="card-hover p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${service.color}20`, color: service.color }}>
                      <Icon size={22} />
                    </div>
                    <span
                      className="price-pill"
                      style={
                        service.priceType === 'free'
                          ? { color: colors.energy, background: `${colors.energy}20` }
                          : { color: colors.blue, background: `${colors.blue}12` }
                      }
                    >
                      {service.price}
                    </span>
                  </div>
                  <h3 className="font-syne font-bold text-lg mb-2" style={{ color: colors.navy }}>{service.title}</h3>
                  <p className="text-[#25364A] text-sm leading-relaxed mb-5">{service.desc}</p>
                  <Link to="/demander-devis" className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: colors.blue }}>
                    Demander un devis <ArrowRight size={14} />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== VENTE DE MATÉRIEL ==================== */}
      <section className="omedev-light-section py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-badge">Matériel</span>
              <h2 className="section-title mt-4">Vente de matériel</h2>
              <div className="divider" style={{ margin: '1rem 0 1.5rem' }} />
              <p className="text-[#25364A] mb-6 leading-relaxed">
                Équipez votre entreprise ou votre foyer avec du matériel neuf ou reconditionné, garanti 1 an.
              </p>
              <div className="grid grid-cols-1 gap-4">
                {equipmentSales.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="equip-row"
                    >
                      <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${item.color}20`, color: item.color }}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <h4 className="font-syne font-bold text-base" style={{ color: colors.navy }}>{item.title}</h4>
                        <p className="text-[#25364A] text-sm">{item.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <Link to="/demander-devis" className="btn-primary mt-8">
                Commander du matériel <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative"
            >
              <div className="card-hover overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&h=600&fit=crop"
                  alt="Matériel informatique"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div
                className="absolute -bottom-5 -right-5 w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                style={{ background: 'linear-gradient(135deg, #0B74C1, #2AACB2)' }}
              >
                <Zap size={24} className="text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== AUDIT ÉNERGÉTIQUE ==================== */}
      <section className="omedev-white-section py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1 card-hover overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=600&fit=crop"
                alt="Audit énergétique"
                className="w-full h-auto object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="order-1 lg:order-2"
            >
              <span className="section-badge">Diagnostic</span>
              <h2 className="section-title mt-4">Audit énergétique et optimisation</h2>
              <div className="divider" style={{ margin: '1rem 0 1.5rem' }} />
              <div className="space-y-4">
                {auditItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle size={20} style={{ color: colors.turquoise, marginTop: 2, flexShrink: 0 }} />
                    <span className="text-[#25364A] text-sm sm:text-base">{item}</span>
                  </motion.div>
                ))}
              </div>
              <Link to="/audit-gratuit" className="btn-primary mt-8">
                Bénéficier d'un audit gratuit <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== CHIFFRES CLÉS ==================== */}
      <section className="omedev-dark-section py-20">
        <div className="container">
          <SectionHeader badge="Quelques chiffres" title="OMEDEV Énergie en données" light />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl text-center"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)' }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: 'linear-gradient(135deg, #4681B7, #053876)' }}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white font-syne mb-1">{stat.value}</div>
                  <div className="text-white/70 text-xs sm:text-sm">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== GALERIE ==================== */}
      <section className="omedev-light-section py-24">
        <div className="container">
          <SectionHeader badge="Portfolio" title="Nos réalisations" subtitle="Un aperçu de nos installations solaires et climatiques" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="gallery-tile"
              >
                <img src={img} alt="Installation énergie" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TÉMOIGNAGES ==================== */}
      <section className="omedev-white-section py-24">
        <div className="container">
          <TestimonialsCarousel
            badge="Témoignages"
            title="Ils nous font confiance"
            subtitle="La satisfaction de nos clients, notre meilleure référence"
            items={testimonials.map((t) => ({ name: t.name, role: t.role, content: t.quote, avatar: t.photo }))}
          />
        </div>
      </section>

      {/* ==================== POURQUOI OMEDEV ÉNERGIE ==================== */}
      <section className="omedev-light-section py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-badge">Pourquoi nous</span>
              <h2 className="section-title mt-4">Pourquoi OMEDEV Énergie ?</h2>
              <div className="divider" style={{ margin: '1rem 0 1.5rem' }} />
              <div className="space-y-4">
                {benefits.map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-start gap-3"
                    >
                      <Icon size={20} style={{ color: colors.turquoise, marginTop: 2, flexShrink: 0 }} />
                      <span className="text-[#25364A] text-sm sm:text-base">{b.text}</span>
                    </motion.div>
                  );
                })}
              </div>
              <Link to="/demander-devis" className="btn-primary mt-8">
                Demander un devis personnalisé <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="card-hover p-10 text-center"
              style={{ background: 'linear-gradient(135deg, rgba(11,116,193,.06), rgba(85,221,181,.08))' }}
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #0B74C1, #2AACB2)' }}>
                <Sun size={28} className="text-white" />
              </div>
              <p className="text-[#25364A] italic leading-relaxed">
                "Économisez jusqu'à 70% sur votre facture d'électricité avec nos solutions solaires."
              </p>
              <p className="text-sm mt-4" style={{ color: colors.blue, fontWeight: 700 }}>— Étude de cas, Client résidentiel</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== CTA FINALE ==================== */}
      <CTASection
        badge="Un projet sur mesure ?"
        title="Assistance immédiate, 24h/24 et 7j/7"
        highlight="24h/24 et 7j/7"
        subtitle="Étudions ensemble votre besoin et obtenez un devis personnalisé sans engagement, ou contactez directement notre support technique."
        backgroundImage="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1920&q=80"
        primaryAction={{ label: 'Demander un devis', to: '/contact' }}
        secondaryAction={{ label: 'Appeler maintenant', href: 'tel:+24355550359', icon: <Phone size={16} /> }}
      />
    </div>
  );
};

export default EnergieEquipements;