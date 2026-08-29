import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PublicHero from '../../components/Public/PublicHero';
import TestimonialsCarousel from '../../components/Public/TestimonialsCarousel';
import CTASection from '../../components/Public/CTASection';
import {
  GraduationCap,
  Users,
  BookOpen,
  Award,
  Clock,
  Calendar,
  Star,
  Shield,
  Cloud,
  Code,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
} from 'lucide-react';

/* Photo d'étudiants utilisée comme arrière-plan général de la page
   (fixe, discrète, avec voile clair pour garder tout le contenu lisible). */
const PAGE_BG_IMAGE =
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80';

/* ─────────────────────────────────────────────
   DESIGN SYSTEM — identique à la page About
   (navy/electric/turquoise/energy)
   ───────────────────────────────────────────── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  .omedev-formation {
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
    position: relative;
    /* Nécessaire pour que le fond absolute ci-dessous se cale sur TOUTE
       la hauteur de la page (et pas seulement le viewport). */
    isolation: isolate;
    color: #0B1213;
    /* Le fond uni sert de secours tant que l'image de fond n'est pas
       encore visible (ex. lecteurs sans JS/CSS avancé). */
    background: #F6F6F7;
  }

  /* ── Photo d'étudiants en arrière-plan général de la page ──
     Remarque technique : on utilise position:absolute (calé sur
     .omedev-formation, qui englobe tout le contenu) plutôt que
     position:fixed. Avec Framer Motion utilisé un peu partout sur le
     site, un ancêtre porte presque toujours une transform (même neutre),
     ce qui casse totalement position:fixed (l'élément se recale sur cet
     ancêtre au lieu du viewport et devient invisible). absolute + inset:0
     sur un parent en position:relative n'a pas ce problème. */
  .omedev-formation .omedev-page-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    /* Hauteur fixe (pas inset:0 sur toute la page) : avec object-fit:cover,
       étirer une seule photo sur toute la hauteur scrollable (plusieurs
       milliers de px) force un zoom énorme qui rend l'image quasi
       invisible (un simple aplat de couleur). On garde donc une bande
       fixe en haut de page, qui se fond ensuite dans le fond uni. */
    height: 900px;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
  }
  .omedev-formation .omedev-page-bg img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
  }
  .omedev-formation .omedev-page-bg::after {
    content: '';
    position: absolute;
    inset: 0;
    /* Voile clair en dégradé : l'image reste identifiable en filigrane en
       haut de page, puis se fond progressivement dans le fond uni
       (#F6F6F7) pour ne jamais gêner la lecture du contenu par-dessus. */
    background: linear-gradient(to bottom, rgba(246, 246, 247, 0.55) 0%, rgba(246, 246, 247, 0.88) 55%, rgba(246, 246, 247, 1) 100%);
  }

  /* Tout le contenu réel passe au-dessus du fond fixe */
  .omedev-formation > *:not(.omedev-page-bg) {
    position: relative;
    z-index: 1;
  }

  .omedev-formation .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .omedev-formation .section-badge {
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

  .omedev-formation .section-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -.03em;
    margin-bottom: 1rem;
    font-family: 'Syne', sans-serif;
    color: #053876;
  }

  .omedev-formation .section-subtitle {
    font-size: 1rem;
    color: #25364A;
    max-width: 52ch;
    margin: 0 auto;
    line-height: 1.7;
  }

  .omedev-formation .divider {
    width: 64px;
    height: 4px;
    background: linear-gradient(90deg, #0B74C1, #2AACB2, #55DDB5);
    border-radius: 99px;
    margin: 1rem auto 1.5rem;
  }

  .omedev-formation .btn-primary {
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

  .omedev-formation .btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 36px rgba(42,172,178,.28);
  }

  .omedev-formation .btn-outline {
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

  .omedev-formation .btn-outline:hover {
    border-color: #2AACB2;
    color: #0B74C1;
    background: rgba(85,221,181,.08);
    transform: translateY(-3px);
  }

  .omedev-formation .btn-ghost-light {
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

  .omedev-formation .btn-ghost-light:hover {
    background: rgba(255,255,255,.18);
    transform: translateY(-3px);
  }

  .omedev-formation .card-hover {
    transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease;
    background: #fff;
    border: 1px solid rgba(5,56,118,.09);
    border-radius: 18px;
    box-shadow: 0 10px 30px rgba(5,56,118,.06);
  }

  .omedev-formation .card-hover:hover {
    transform: translateY(-7px);
    box-shadow: 0 22px 48px rgba(11,116,193,.14);
    border-color: rgba(42,172,178,.35);
  }

  .omedev-formation .omedev-hero {
    background: linear-gradient(135deg, #053876 0%, #1D5B9B 35%, #4681B7 60%, #72A5CE 80%, #A6C3D7 100%);
    position: relative;
  }

  /* Sections claires rendues semi-transparentes pour laisser deviner la
     photo d'étudiants fixée en arrière-plan de la page. */
  .omedev-formation .omedev-light-section { background: rgba(246, 246, 247, 0.82); }
  .omedev-formation .omedev-white-section { background: rgba(255, 255, 255, 0.88); }
  /* La section sombre garde un fond plein : le contraste blanc sur photo
     serait illisible, on privilégie la lisibilité à cet endroit. */
  .omedev-formation .omedev-dark-section {
    background: linear-gradient(135deg, #053876 0%, #1D5B9B 55%, #0B74C1 100%);
  }

  .omedev-formation .hero-grid {
    background-image: linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px);
    background-size: 56px 56px;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-16px); }
  }
  .omedev-formation .animate-float { animation: float 6s ease-in-out infinite; }

  /* ── Carte formation, image + contenu ── */
  .omedev-formation .formation-card {
    border-radius: 18px;
    overflow: hidden;
    background: #fff;
    border: 1px solid rgba(5,56,118,.09);
    box-shadow: 0 10px 30px rgba(5,56,118,.06);
    transition: all .4s cubic-bezier(.4,0,.2,1);
    display: flex;
    flex-direction: column;
  }
  .omedev-formation .formation-card:hover {
    transform: translateY(-9px);
    border-color: rgba(42,172,178,.35);
    box-shadow: 0 22px 48px rgba(11,116,193,.16);
  }
  .omedev-formation .formation-photo-wrap {
    position: relative;
    width: 100%;
    height: 190px;
    overflow: hidden;
    flex-shrink: 0;
    background: #D5DCE1;
  }
  .omedev-formation .formation-photo-wrap img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform .8s cubic-bezier(.4,0,.2,1);
  }
  .omedev-formation .formation-card:hover .formation-photo-wrap img { transform: scale(1.08); }

  /* ── Session accélérée ── */
  .omedev-formation .session-row {
    background: #fff;
    border: 1px solid rgba(5,56,118,.09);
    border-radius: 14px;
    padding: 1.1rem 1.3rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: .75rem;
    transition: all .3s ease;
  }
  .omedev-formation .session-row:hover {
    border-color: rgba(42,172,178,.35);
    box-shadow: 0 14px 32px rgba(11,116,193,.10);
    transform: translateY(-4px);
  }

  /* ── Centre de formation ── */
  .omedev-formation .center-card {
    background: #fff;
    border: 1px solid rgba(5,56,118,.09);
    border-radius: 18px;
    padding: 1.75rem;
    transition: all .35s ease;
  }
  .omedev-formation .center-card:hover {
    transform: translateY(-7px);
    border-color: rgba(42,172,178,.35);
    box-shadow: 0 22px 48px rgba(11,116,193,.14);
  }

  .omedev-formation .quote-mark {
    font-family: 'Syne', sans-serif;
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1;
    color: rgba(11,116,193,.15);
  }

  .omedev-formation .map-frame {
    border-radius: 18px;
    overflow: hidden;
    border: 1px solid rgba(5,56,118,.09);
    box-shadow: 0 10px 30px rgba(5,56,118,.06);
  }

  @media (max-width: 768px) {
    .omedev-formation .container { padding: 0 1rem; }
    /* background-attachment "fixed" simulé via position:fixed est parfois
       capricieux sur mobile (barre d'adresse qui bouge) ; on garde le
       voile un peu plus opaque pour éviter tout souci de lisibilité. */
    .omedev-formation .omedev-page-bg::after { background: rgba(246, 246, 247, 0.92); }
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
const formationCards = [
  {
    title: 'Réseaux & Infrastructure',
    desc: 'Cisco, MikroTik, conception et dépannage avancé',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
    icon: BookOpen,
    color: colors.blue,
  },
  {
    title: 'Cybersécurité',
    desc: 'Protection des données, pare-feu, sensibilisation',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop',
    icon: Shield,
    color: colors.navy,
  },
  {
    title: 'Cloud & Virtualisation',
    desc: 'AWS, Azure, VMware, Docker',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop',
    icon: Cloud,
    color: colors.turquoise,
  },
  {
    title: 'Développement DevOps',
    desc: 'CI/CD, Git, Python, automatisation',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop',
    icon: Code,
    color: colors.blueLight,
  },
  {
    title: 'Soft skills IT',
    desc: 'Gestion de projet agile, leadership technique',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop',
    icon: Users,
    color: colors.energy,
  },
  {
    title: 'Préparation certifications',
    desc: 'CCNA, Security+, Cloud Practitioner',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop',
    icon: Award,
    color: colors.blue,
  },
];

const acceleratedTrainings = [
  { title: 'Bootcamp Réseaux (5 jours)', duration: '40h', price: '1 490€ HT', start: '14 avril 2025', spots: 8 },
  { title: 'Cybersécurité intensive', duration: '35h', price: '1 790€ HT', start: '5 mai 2025', spots: 6 },
  { title: 'DevOps en 4 jours', duration: '32h', price: '1 590€ HT', start: '2 juin 2025', spots: 10 },
];

const testimonials = [
  {
    name: 'Sophie Martin',
    role: 'Responsable Infrastructure',
    company: 'Groupe Logistique France',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    quote: "La formation Réseaux a complètement monté en compétence mon équipe. Les cas pratiques sur du vrai matériel ont fait la différence.",
    rating: 5,
  },
  {
    name: 'Thomas Lefebvre',
    role: 'Admin Sys',
    company: 'Digital Solutions',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    quote: 'Formation Cybersécurité très concrète. Le formateur est un expert du terrain, je recommande vivement.',
    rating: 5,
  },
  {
    name: 'Amel Benali',
    role: 'DevOps Engineer',
    company: 'Startup Innov',
    photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop',
    quote: "Le bootcamp DevOps m'a permis d'être opérationnelle en moins d'une semaine. Un vrai accélérateur de carrière.",
    rating: 5,
  },
];

const stats = [
  { value: '1 200+', label: 'Élèves formés', icon: Users },
  { value: '98%', label: 'Taux de satisfaction', icon: Star },
  { value: '45+', label: 'Sessions par an', icon: Calendar },
  { value: '15', label: 'Formateurs experts', icon: Award },
];

const centers = [
  { city: 'Kinshasa', address: '123 Avenue du Commerce, Gombe, Kinshasa', phone: '+243 81 234 5678', email: 'kinshasa@omdeve.com' },
  { city: 'Lubumbashi', address: '45 Avenue Kamanyola, Lubumbashi', phone: '+243 97 456 7890', email: 'lubumbashi@omdeve.com' },
  { city: 'Bulungu', address: "78 Avenue de l'Indépendance, Bulungu, Kwilu", phone: '+243 82 567 8901', email: 'bulungu@omdeve.com' },
  { city: 'Kikwit', address: '12 Avenue Mama Yemo, Kikwit, Kwilu', phone: '+243 89 123 4567', email: 'kikwit@omdeve.com' },
  { city: 'Bandundu', address: '34 Avenue du 4 Janvier, Bandundu-Ville', phone: '+243 85 234 5678', email: 'bandundu@omdeve.com' },
  { city: 'Moanda', address: '9 Avenue du Port, Moanda, Kongo Central', phone: '+243 84 345 6789', email: 'moanda@omdeve.com' },
  { city: 'Matadi', address: '56 Avenue Lumumba, Matadi, Kongo Central', phone: '+243 83 456 7890', email: 'matadi@omdeve.com' },
];

const Formation = () => {
  return (
    <div className="omedev-formation">
      <style>{globalStyles}</style>

      {/* Photo d'étudiants fixée en arrière-plan de toute la page */}
      <div className="omedev-page-bg" aria-hidden="true">
        <img src={PAGE_BG_IMAGE} alt="" />
      </div>

      {/* ==================== HERO ==================== */}
      <PublicHero
        badge="Formation IT professionnelle"
        title="Montez en compétences avec nos experts"
        highlight="avec nos experts"
        subtitle="Formations techniques et soft skills, en présentiel ou à distance, pour vos équipes IT."
        primaryAction={{ label: 'Voir le catalogue', to: '/formations/catalogue' }}
        secondaryAction={{ label: 'Parler à un conseiller', to: '/contact' }}
      />

      {/* ==================== NOS FORMATIONS ==================== */}
      <section className="omedev-white-section py-24">
        <div className="container">
          <SectionHeader badge="Nos formations" title="Nos formations" subtitle="6 domaines de compétences pour faire évoluer vos équipes IT" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formationCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="formation-card"
                >
                  <div className="formation-photo-wrap">
                    <img src={card.image} alt={card.title} />
                  </div>
                  <div className="p-6">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3" style={{ background: `${card.color}20`, color: card.color }}>
                      <Icon size={20} />
                    </div>
                    <h3 className="font-syne font-bold text-lg mb-2" style={{ color: colors.navy }}>{card.title}</h3>
                    <p className="text-[#25364A] text-sm mb-4">{card.desc}</p>
                    <Link to="/inscription" className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: colors.blue }}>
                      S'inscrire <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== CHIFFRES CLÉS ==================== */}
      <section className="omedev-dark-section py-20">
        <div className="container">
          <SectionHeader badge="Chiffres clés" title="Nos élèves en chiffres" light />
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

      {/* ==================== FORMATIONS ACCÉLÉRÉES ==================== */}
      <section className="omedev-light-section py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-badge">Accéléré</span>
              <h2 className="section-title mt-4">Formations accélérées</h2>
              <div className="divider" style={{ margin: '1rem 0 1.5rem' }} />
              <p className="text-[#25364A] mb-6 leading-relaxed">
                Des bootcamps intensifs de 2 à 5 jours pour monter en compétences rapidement.
                Travaux pratiques sur cas réels, formateurs experts et petit groupe.
              </p>
              <div className="space-y-4">
                {acceleratedTrainings.map((training, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="session-row"
                  >
                    <div>
                      <h4 className="font-syne font-bold" style={{ color: colors.navy }}>{training.title}</h4>
                      <div className="flex flex-wrap gap-3 text-sm text-[#25364A] mt-1">
                        <span className="flex items-center gap-1"><Clock size={14} /> {training.duration}</span>
                        <span className="flex items-center gap-1"><Calendar size={14} /> {training.start}</span>
                        <span>{training.spots} places</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold" style={{ color: colors.blue }}>{training.price}</span>
                      <Link to="/inscription" style={{ color: colors.blue }}>
                        <ArrowRight size={18} />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Link to="/formations-accelerees" className="btn-primary mt-8">
                Voir toutes nos sessions <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="card-hover overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="Session de formation en présentiel"
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== TÉMOIGNAGES ==================== */}
      <section className="omedev-white-section py-24">
        <div className="container">
          <TestimonialsCarousel
            badge="Témoignages"
            title="Ils ont suivi nos formations"
            subtitle="La réussite de nos apprenants, notre meilleure référence"
            items={testimonials.map((t) => ({
              name: t.name,
              role: `${t.role}, ${t.company}`,
              content: t.quote,
              avatar: t.photo,
              rating: t.rating,
            }))}
          />
        </div>
      </section>

      {/* ==================== CTA DOUBLE : INSCRIPTION + CATALOGUE ==================== */}
      <section className="omedev-light-section py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card-hover p-8 text-center"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center" style={{ background: `${colors.blue}20`, color: colors.blue }}>
                <GraduationCap size={26} />
              </div>
              <h3 className="font-syne text-2xl font-bold mb-2" style={{ color: colors.navy }}>Inscription en centre</h3>
              <p className="text-[#25364A] mb-6 text-sm">Rejoignez nos sessions en présentiel à Kinshasa, Lubumbashi ou Bulungu.</p>
              <Link to="/inscription" className="btn-primary">
                Je m'inscris <ArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="card-hover p-8 text-center"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center" style={{ background: `${colors.turquoise}20`, color: colors.turquoise }}>
                <BookOpen size={26} />
              </div>
              <h3 className="font-syne text-2xl font-bold mb-2" style={{ color: colors.navy }}>Catalogue complet</h3>
              <p className="text-[#25364A] mb-6 text-sm">Consultez la liste complète de nos formations en ligne.</p>
              <Link to="/formations/catalogue" className="btn-primary">
                Voir le catalogue <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== NOS CENTRES DE FORMATION ==================== */}
      <section className="omedev-white-section py-24">
        <div className="container">
          <SectionHeader badge="Nous trouver" title="Nos centres de formation" subtitle="Sept centres répartis en République Démocratique du Congo" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {centers.map((center, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="center-card"
              >
                <div className="w-12 h-12 mb-3 rounded-xl flex items-center justify-center" style={{ background: `${colors.blue}20`, color: colors.blue }}>
                  <MapPin size={22} />
                </div>
                <h3 className="font-syne font-bold text-lg" style={{ color: colors.navy }}>{center.city}</h3>
                <p className="text-[#25364A] text-sm mt-2">{center.address}</p>
                <div className="mt-4 space-y-2">
                  <a href={`tel:${center.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-sm" style={{ color: colors.blue }}>
                    <Phone size={14} /> <span>{center.phone}</span>
                  </a>
                  <a href={`mailto:${center.email}`} className="flex items-center gap-2 text-sm" style={{ color: colors.blue }}>
                    <Mail size={14} /> <span>{center.email}</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="map-frame mt-12"
          >
            <iframe
              title="Carte des centres OMEDEV"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63800.05399612767!2d15.276786!3d-4.322447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a6a33ce0946a6f7%3A0x841c5ce35b8af2fb!2sKinshasa%2C%20R%C3%A9publique%20d%C3%A9mocratique%20du%20Congo!5e0!3m2!1sfr!2scd!4v1647863945678!5m2!1sfr!2scd"
              width="100%"
              height="300"
              style={{ border: 0, display: 'block' }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* ==================== CTA FINALE ==================== */}
      <CTASection
        badge="Prêt à vous lancer ?"
        title="Développez vos compétences dès aujourd'hui"
        highlight="compétences"
        subtitle="Choisissez une formation adaptée à vos objectifs et préparez-vous aux opportunités du monde professionnel."
        primaryAction={{ label: 'Voir le catalogue', to: '/formations/catalogue' }}
        secondaryAction={{ label: 'Contacter un expert', to: '/contact' }}
      />
    </div>
  );
};

export default Formation;