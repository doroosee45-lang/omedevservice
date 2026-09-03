import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Users, Award, Target, Globe, Zap, Shield, Lightbulb, TrendingUp,
  ArrowRight, Headphones, CheckCircle, Rocket, Heart, Briefcase,
  Calendar, MapPin, Star, Phone, Mail, Handshake, ChevronRight
} from 'lucide-react';

import PublicHero from '../components/Public/PublicHero';
import CTASection from '../components/Public/CTASection';
import meyaImg from '../assets/images/experts/os5.jpeg';
import oseeImg from '../assets/images/experts/fido.jpeg';
import paulImg from '../assets/images/experts/ro.jpeg';
import claireImg from '../assets/images/experts/st.jpeg';

/* ─────────────────────────────────────────────
   DESIGN SYSTEM — identique à la page Home
   (navy/electric/turquoise/energy)
   ───────────────────────────────────────────── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  .omedev-about {
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

  .omedev-about .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .omedev-about .section-badge {
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

  .omedev-about .section-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -.03em;
    margin-bottom: 1rem;
    font-family: 'Syne', sans-serif;
    color: #053876;
  }

  .omedev-about .section-subtitle {
    font-size: 1rem;
    color: #25364A;
    max-width: 52ch;
    margin: 0 auto;
    line-height: 1.7;
  }

  .omedev-about .divider {
    width: 64px;
    height: 4px;
    background: linear-gradient(90deg, #0B74C1, #2AACB2, #55DDB5);
    border-radius: 99px;
    margin: 1rem auto 1.5rem;
  }

  .omedev-about .btn-primary,
  .omedev-about .btn-accent {
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

  .omedev-about .btn-primary:hover,
  .omedev-about .btn-accent:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 36px rgba(42,172,178,.28);
  }

  .omedev-about .btn-outline {
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

  .omedev-about .btn-outline:hover {
    border-color: #2AACB2;
    color: #0B74C1;
    background: rgba(85,221,181,.08);
    transform: translateY(-3px);
  }

  .omedev-about .card-hover {
    transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease;
    background: #fff;
    border: 1px solid rgba(5,56,118,.09);
    border-radius: 18px;
    box-shadow: 0 10px 30px rgba(5,56,118,.06);
  }

  .omedev-about .card-hover:hover {
    transform: translateY(-7px);
    box-shadow: 0 22px 48px rgba(11,116,193,.14);
    border-color: rgba(42,172,178,.35);
  }

  .omedev-about .omedev-hero {
    background: linear-gradient(135deg, #053876 0%, #1D5B9B 35%, #4681B7 60%, #72A5CE 80%, #A6C3D7 100%);
    position: relative;
  }

  .omedev-about .omedev-light-section { background: #F6F6F7; }
  .omedev-about .omedev-white-section { background: #fff; }
  .omedev-about .omedev-energy-section {
    background: linear-gradient(135deg, #0B74C1 0%, #2AACB2 55%, #55DDB5 100%);
  }
  .omedev-about .omedev-dark-section {
    background: linear-gradient(135deg, #053876 0%, #1D5B9B 55%, #0B74C1 100%);
  }

  .omedev-about .hero-grid {
    background-image: linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px);
    background-size: 56px 56px;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-16px); }
  }
  .omedev-about .animate-float { animation: float 6s ease-in-out infinite; }

  /* ── Carte équipe, déclinée en version claire ── */
  .omedev-about .team-card {
    position: relative;
    border-radius: 18px;
    overflow: hidden;
    background: #fff;
    border: 1px solid rgba(5,56,118,.09);
    box-shadow: 0 10px 30px rgba(5,56,118,.06);
    transition: all .4s cubic-bezier(.4,0,.2,1);
    display: flex;
    flex-direction: column;
  }
  .omedev-about .team-card:hover {
    transform: translateY(-9px);
    border-color: rgba(42,172,178,.35);
    box-shadow: 0 22px 48px rgba(11,116,193,.16);
  }
  .omedev-about .team-photo-wrap {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    flex-shrink: 0;
    background: #D5DCE1;
  }
  .omedev-about .team-photo-wrap img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
    transition: transform .8s cubic-bezier(.4,0,.2,1);
  }
  .omedev-about .team-card:hover .team-photo-wrap img { transform: scale(1.07); }
  .omedev-about .team-photo-fallback {
    position: absolute;
    inset: 0;
    display: none;
    align-items: center;
    justify-content: center;
    font-family: 'Syne', sans-serif;
    font-size: 56px;
    font-weight: 800;
    color: rgba(255,255,255,.75);
  }
  .omedev-about .team-role-badge {
    position: absolute;
    top: 14px;
    left: 14px;
    z-index: 3;
    padding: 4px 11px;
    border-radius: 50px;
    font-size: 9.5px;
    font-weight: 700;
    letter-spacing: .06em;
    text-transform: uppercase;
    color: white;
    box-shadow: 0 4px 16px rgba(5,56,118,.25);
  }
  .omedev-about .team-number {
    position: absolute;
    bottom: 8px;
    right: 14px;
    z-index: 3;
    font-family: 'Syne', sans-serif;
    font-size: 52px;
    font-weight: 800;
    color: rgba(255,255,255,.55);
    line-height: 1;
    pointer-events: none;
    user-select: none;
  }
  .omedev-about .team-bottom-bar {
    height: 3px;
    width: 100%;
  }
  .omedev-about .team-info {
    padding: 18px 20px 22px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .omedev-about .team-name {
    font-family: 'Syne', sans-serif;
    font-size: 17px;
    font-weight: 700;
    color: #053876;
    margin-bottom: 3px;
  }
  .omedev-about .team-position {
    font-size: 10.5px;
    font-weight: 700;
    color: #0B74C1;
    margin-bottom: 10px;
    letter-spacing: .04em;
    text-transform: uppercase;
  }
  .omedev-about .team-bio {
    font-size: 12.5px;
    line-height: 1.65;
    color: #25364A;
  }

  .omedev-about .team-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1.5rem;
  }
  @media (min-width: 640px) {
    .omedev-about .team-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (min-width: 1024px) {
    .omedev-about .team-grid { grid-template-columns: repeat(4, 1fr); }
  }

  @media (max-width: 768px) {
    .omedev-about .container { padding: 0 1rem; }
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

const About = () => {

  const valeurs = [
    { icon: Target, title: 'Excellence', text: "Nous visons l'excellence dans chaque projet, avec des standards internationaux.", color: colors.blue },
    { icon: Shield, title: 'Sécurité', text: 'La protection de vos données et infrastructures est notre priorité absolue.', color: colors.navy },
    { icon: Lightbulb, title: 'Innovation', text: 'Nous anticipons les besoins futurs pour vous offrir des solutions modernes et évolutives.', color: colors.turquoise },
    { icon: Users, title: 'Proximité', text: 'Un accompagnement humain et personnalisé, proche de vos réalités terrain.', color: colors.blueLight },
  ];

  const expertises = [
    { icon: Globe, title: 'Réseau & Infrastructure', desc: 'Câblage, WiFi pro, VLAN, parcs informatiques', color: colors.blue },
    { icon: Shield, title: 'Cybersécurité', desc: 'Audit, vidéosurveillance, firewalls, formations', color: colors.blueLight },
    { icon: Zap, title: 'Développement Digital', desc: 'Sites web, e-commerce, apps mobiles, ERP', color: colors.turquoise },
    { icon: TrendingUp, title: 'Cloud & Hébergement', desc: 'Solutions haute disponibilité et migration', color: colors.navy },
    { icon: Lightbulb, title: 'Énergie Solaire', desc: 'Panneaux photovoltaïques et optimisation énergétique', color: colors.energy },
    { icon: Award, title: 'Formation & Coaching', desc: 'Formations certifiantes et e-learning', color: colors.blue },
  ];

  const stats = [
    { value: '4+', label: "Années d'expertise", icon: Calendar },
    { value: '15+', label: 'Projets réalisés', icon: Briefcase },
    { value: '95%', label: 'Clients satisfaits', icon: Star },
    { value: '24/7', label: 'Support technique', icon: Headphones },
  ];

  const engagements = [
    { icon: Award, title: 'Qualité Certifiée', desc: 'Solutions conformes aux meilleures pratiques internationales.', color: colors.turquoise },
    { icon: Target, title: 'Résultats Mesurables', desc: 'Nous nous engageons sur des objectifs concrets et vérifiables.', color: colors.blue },
    { icon: Users, title: 'Accompagnement Continu', desc: 'Support technique et formation tout au long de votre projet.', color: colors.blueLight },
  ];

  const team = [
    {
      name: 'Meya Dorodoro',
      role: 'CEO & Fondateur',
      position: 'Informatique & Full-Stack',
      bio: "Expert en infrastructure IT et cybersécurité avec plus de 6 ans d'expérience en domaines d'informatique.",
      image: meyaImg,
      gradientBg: 'linear-gradient(135deg, #0B74C1, #2AACB2)',
      number: '01',
      initial: 'M',
    },
    {
      name: 'Fido makayabu',
      role: 'Directeur Technique',
      position: 'Experte réseaux & Telecommunication',
      bio: 'Spécialiste des réseaux haut débit et des solutions cloud.',
      image: oseeImg,
      gradientBg: 'linear-gradient(135deg, #2AACB2, #55DDB5)',
      number: '02',
      initial: 'O',
    },
    {
      name: 'Kasway Rodrick',
      role: 'Responsable de parcs',
      position: 'Ingénieur en maintenance',
      bio: 'Ingénieur en maintenance Informatique.',
      image: paulImg,
      gradientBg: 'linear-gradient(135deg, #4681B7, #053876)',
      number: '03',
      initial: 'P',
    },
    {
      name: 'Stephane',
      role: 'Lead Développement',
      position: 'Développeuse Full-Stack',
      bio: 'Développeuse full-stack, elle conçoit des applications web et mobiles sur mesure.',
      image: claireImg,
      gradientBg: 'linear-gradient(135deg, #053876, #1D5B9B)',
      number: '04',
      initial: 'C',
    },
  ];

  return (
    <div className="omedev-about">
      <style>{globalStyles}</style>

      {/* ==================== HERO ==================== */}
      <PublicHero
        badge="Qui sommes-nous ?"
        title="À propos d'OMEDEV Services"
        highlight="d'OMEDEV Services"
        subtitle="Leader en solutions IT, énergétiques et digitales en République Démocratique du Congo."
        primaryAction={{ label: 'Nous contacter', to: '/contact' }}
        secondaryAction={{ label: 'Voir nos réalisations', to: '/realisations' }}
      />

      {/* ==================== HISTOIRE & MISSION ==================== */}
      <section className="omedev-white-section py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card-hover p-8 sm:p-10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${colors.blue}20`, color: colors.blue }}>
                  <Calendar size={24} />
                </div>
                <h2 className="font-syne text-2xl md:text-3xl font-bold" style={{ color: colors.navy }}>Notre histoire</h2>
              </div>
              <div className="space-y-4 text-[#25364A] leading-relaxed text-sm sm:text-base">
                <p>Fondée en 2022 à Kinshasa, <strong style={{ color: colors.blue }}>OMEDEV Services</strong> est née de la volonté de répondre aux défis numériques et énergétiques de la RDC.</p>
                <p>En 2022, nous avons élargi nos compétences aux énergies renouvelables, puis au développement digital en 2024. Aujourd'hui, nous accompagnons plus de 5 entreprises congolaises dans leur transformation technologique.</p>
                <p>Notre mot d'ordre : <strong style={{ color: colors.blue }}>innovation locale, standards internationaux</strong>.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="card-hover p-8 sm:p-10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${colors.turquoise}20`, color: colors.turquoise }}>
                  <Target size={24} />
                </div>
                <h2 className="font-syne text-2xl md:text-3xl font-bold" style={{ color: colors.navy }}>Notre mission</h2>
              </div>
              <div className="space-y-4 text-[#25364A] leading-relaxed text-sm sm:text-base">
                <p><strong style={{ color: colors.turquoise }}>Accélérer la digitalisation et la transition énergétique des entreprises congolaises</strong> en leur fournissant des solutions fiables, sécurisées et adaptées à leur environnement.</p>
                <p>Nous croyons que la technologie doit être accessible à tous. C'est pourquoi nous proposons des services sur mesure, avec un accompagnement de proximité et une veille technologique constante.</p>
                <p>Notre engagement : <strong style={{ color: colors.turquoise }}>zéro panne non anticipée, zéro vulnérabilité négligée, zéro projet sans formation</strong>.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== CHIFFRES CLÉS ==================== */}
      <section className="omedev-dark-section py-20">
        <div className="container">
          <SectionHeader badge="Quelques chiffres" title="OMEDEV en quelques données" light />
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

      {/* ==================== NOS VALEURS ==================== */}
      <section className="omedev-white-section py-24">
        <div className="container">
          <SectionHeader badge="Nos piliers" title="Nos valeurs" subtitle="Les principes qui guident chacune de nos décisions" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valeurs.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="card-hover p-6 text-center"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center" style={{ background: `${v.color}20`, color: v.color }}>
                    <Icon size={24} />
                  </div>
                  <h3 className="font-syne font-bold text-lg mb-2" style={{ color: colors.navy }}>{v.title}</h3>
                  <p className="text-[#25364A] text-sm leading-relaxed">{v.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== NOTRE EXPERTISE ==================== */}
      <section className="omedev-light-section py-24">
        <div className="container">
          <SectionHeader badge="Notre savoir-faire" title="Notre expertise" subtitle="6 domaines de compétences au service de votre croissance" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertises.map((exp, i) => {
              const Icon = exp.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="card-hover p-6"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${exp.color}20`, color: exp.color }}>
                    <Icon size={22} />
                  </div>
                  <h3 className="font-syne font-bold text-lg mb-2" style={{ color: colors.navy }}>{exp.title}</h3>
                  <p className="text-[#25364A] text-sm">{exp.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== NOS ENGAGEMENTS ==================== */}
      <section className="omedev-white-section py-24">
        <div className="container">
          <SectionHeader badge="Nos promesses" title="Notre engagement" subtitle="Ce sur quoi vous pouvez compter à chaque étape" />
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
                  className="card-hover p-6"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${eng.color}20`, color: eng.color }}>
                    <Icon size={22} />
                  </div>
                  <h3 className="font-syne font-bold text-lg mb-2" style={{ color: colors.navy }}>{eng.title}</h3>
                  <p className="text-[#25364A] text-sm">{eng.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== NOTRE ÉQUIPE ==================== */}
      <section className="omedev-light-section py-24">
        <div className="container">
          <SectionHeader
            badge="Notre équipe"
            title="Des experts passionnés"
            subtitle="Une équipe multidisciplinaire unie par une seule mission : votre réussite technologique."
          />

          <div className="team-grid">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="team-card"
              >
                <div className="team-photo-wrap">
                  <img
                    src={member.image}
                    alt={member.name}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div className="team-photo-fallback" style={{ background: member.gradientBg }}>
                    {member.initial}
                  </div>
                  <div className="team-role-badge" style={{ background: member.gradientBg }}>
                    {member.role}
                  </div>
                  <div className="team-number">{member.number}</div>
                </div>

                <div className="team-bottom-bar" style={{ background: member.gradientBg }} />

                <div className="team-info">
                  <div className="team-name">{member.name}</div>
                  <div className="team-position">{member.position}</div>
                  <div className="team-bio">{member.bio}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mt-14"
          >
            <Link to="/experts" className="btn-primary">
              <Rocket size={18} /> Rencontrer toute l'équipe <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ==================== CONTACT INFO CARD ==================== */}
      <section className="omedev-white-section py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="card-hover overflow-hidden"
          >
            <div className="grid md:grid-cols-2">
              {/* LEFT */}
              <div className="p-10 md:p-14">
                <h2 className="font-syne text-3xl md:text-4xl font-bold mb-10 tracking-tight" style={{ color: colors.navy }}>
                  Contactez-nous
                </h2>
                <div className="space-y-6">
                  {[
                    { icon: Phone, label: 'Téléphone', value: '+243 816 590 788', link: 'tel:+243816590788' },
                    { icon: Mail, label: 'Email', value: 'omedevservices@gmail.com', link: 'mailto:omedevservices@gmail.com' },
                    { icon: MapPin, label: 'Adresse', value: 'Avenue Kabmabre n°75, Lingwala, Kinshasa, RDC' },
                  ].map(({ icon: Icon, label, value, link }) => (
                    <div key={label + value} className="group flex items-center gap-4 p-4 rounded-xl hover:bg-[#F6F6F7] transition">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${colors.blue}15`, color: colors.blue }}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <p className="text-[#25364A]/70 text-xs uppercase tracking-wider">{label}</p>
                        {link ? (
                          <a href={link} className="font-medium text-lg hover:opacity-70 transition break-words" style={{ color: colors.navy }}>{value}</a>
                        ) : (
                          <p className="font-medium text-lg break-words" style={{ color: colors.navy }}>{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT */}
              <div
                className="relative p-10 md:p-14 flex flex-col justify-center"
                style={{ background: 'linear-gradient(135deg, #053876 0%, #0B74C1 55%, #2AACB2 100%)' }}
              >
                <div className="relative z-10 space-y-6">
                  <div className="text-4xl md:text-5xl font-bold text-white font-syne tracking-tight leading-tight">
                    <a href="tel:+243816590788" className="hover:opacity-80 transition">+243 816 590 788</a>
                  </div>
                  <div className="text-lg text-white/85">Kinshasa, RDC</div>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Disponible du lundi au vendredi<br />
                    <span className="text-white font-medium">8h - 18h</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== CTA FINALE ==================== */}
      <CTASection
        badge="Envie de collaborer ?"
        title="Faisons connaissance et parlons de votre projet"
        highlight="votre projet"
        subtitle="Bénéficiez d'un diagnostic gratuit de vos infrastructures ou recevez une proposition sur mesure adaptée à vos besoins."
        backgroundImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80"
        primaryAction={{ label: 'Demander un devis', to: '/demander-devis' }}
        secondaryAction={{ label: 'Audit gratuit', to: '/audit-gratuit' }}
      />
    </div>
  );
};

export default About;