import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Users, Award, Target, Globe, Zap, Shield, Lightbulb, TrendingUp,
  ArrowRight, Headphones, CheckCircle, Rocket, Heart, Briefcase,
  Calendar, MapPin, Star, Phone, Mail, Handshake
} from 'lucide-react';

import meyaImg from '../Assets/images/experts/mm.jpeg';
import oseeImg from '../Assets/images/experts/mab.jpeg';
import paulImg from '../Assets/images/experts/ro.jpeg';
import claireImg from '../Assets/images/experts/st.jpeg';

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
  @keyframes slow-zoom {
    0% { transform: scale(1); }
    100% { transform: scale(1.1); }
  }

  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-pulse-ring { animation: pulse-ring 2s ease-out infinite; }
  .animate-slow-zoom { animation: slow-zoom 20s ease-out forwards; }

  /* ===== TEAM CARD ===== */
  .team-card {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    background: linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
    border: 1px solid rgba(255,255,255,0.08);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .team-card:hover {
    transform: translateY(-12px);
    border-color: rgba(99,179,237,0.4);
    box-shadow: 0 40px 70px -15px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,179,237,0.15);
  }

  /* Photo zone */
  .team-photo-wrap {
    position: relative;
    height: 290px;
    overflow: hidden;
  }
  .team-photo-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), filter 0.5s ease;
    filter: saturate(0.85) brightness(0.95);
  }
  .team-card:hover .team-photo-wrap img {
    transform: scale(1.07);
    filter: saturate(1.05) brightness(1);
  }

  /* Gradient overlay sur la photo */
  .team-photo-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(15,23,42,0) 35%,
      rgba(15,23,42,0.55) 65%,
      rgba(15,23,42,0.97) 100%
    );
    transition: opacity 0.4s ease;
    z-index: 1;
  }

  /* Badge rôle */
  .team-role-badge {
    position: absolute;
    top: 14px;
    left: 14px;
    z-index: 2;
    padding: 4px 11px;
    border-radius: 50px;
    font-size: 9.5px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: white;
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.25);
    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
  }

  /* Numéro décoratif */
  .team-number {
    position: absolute;
    bottom: 10px;
    right: 14px;
    z-index: 2;
    font-family: 'Syne', sans-serif;
    font-size: 56px;
    font-weight: 800;
    color: rgba(255,255,255,0.05);
    line-height: 1;
    pointer-events: none;
    transition: color 0.4s ease;
    user-select: none;
  }
  .team-card:hover .team-number {
    color: rgba(255,255,255,0.09);
  }

  /* Ligne colorée bas de carte */
  .team-bottom-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 3;
  }
  .team-card:hover .team-bottom-bar {
    opacity: 1;
  }

  /* Info block */
  .team-info {
    padding: 18px 20px 22px;
    position: relative;
  }
  .team-info::before {
    content: '';
    position: absolute;
    top: 0;
    left: 20px;
    right: 20px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent);
  }
  .team-name {
    font-family: 'Syne', sans-serif;
    font-size: 17px;
    font-weight: 700;
    color: #f1f5f9;
    margin-bottom: 3px;
    letter-spacing: -0.01em;
  }
  .team-position {
    font-size: 10.5px;
    font-weight: 600;
    color: #60a5fa;
    margin-bottom: 10px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .team-bio {
    font-size: 12.5px;
    line-height: 1.65;
    color: rgba(148, 163, 184, 0.8);
  }

  /* Fallback si image absente */
  .team-photo-fallback {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Syne', sans-serif;
    font-size: 64px;
    font-weight: 800;
    color: rgba(255,255,255,0.3);
  }
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

  const valeurs = [
    { icon: Target, title: 'Excellence', text: "Nous visons l'excellence dans chaque projet, avec des standards internationaux.", gradient: 'from-blue-500 to-blue-600' },
    { icon: Shield, title: 'Sécurité', text: 'La protection de vos données et infrastructures est notre priorité absolue.', gradient: 'from-emerald-500 to-emerald-600' },
    { icon: Lightbulb, title: 'Innovation', text: 'Nous anticipons les besoins futurs pour vous offrir des solutions modernes et évolutives.', gradient: 'from-amber-500 to-amber-600' },
    { icon: Users, title: 'Proximité', text: 'Un accompagnement humain et personnalisé, proche de vos réalités terrain.', gradient: 'from-purple-500 to-purple-600' }
  ];

  const expertises = [
    { icon: Globe, title: "Réseau & Infrastructure", desc: "Câblage, WiFi pro, VLAN, parcs informatiques", gradient: "from-blue-500 to-blue-600" },
    { icon: Shield, title: "Cybersécurité", desc: "Audit, vidéosurveillance, firewalls, formations", gradient: "from-cyan-500 to-cyan-600" },
    { icon: Zap, title: "Développement Digital", desc: "Sites web, e-commerce, apps mobiles, ERP", gradient: "from-amber-500 to-amber-600" },
    { icon: TrendingUp, title: "Cloud & Hébergement", desc: "Solutions haute disponibilité et migration", gradient: "from-indigo-500 to-indigo-600" },
    { icon: Lightbulb, title: "Énergie Solaire", desc: "Panneaux photovoltaïques et optimisation énergétique", gradient: "from-orange-500 to-orange-600" },
    { icon: Award, title: "Formation & Coaching", desc: "Formations certifiantes et e-learning", gradient: "from-green-500 to-green-600" },
  ];

  const stats = [
    { value: '8+', label: "Années d'expertise", icon: Calendar },
    { value: '150+', label: 'Projets réalisés', icon: Briefcase },
    { value: '95%', label: 'Clients satisfaits', icon: Star },
    { value: '24/7', label: 'Support technique', icon: Headphones },
  ];

  const engagements = [
    { icon: Award, title: 'Qualité Certifiée', desc: 'Solutions conformes aux meilleures pratiques internationales.', gradient: 'from-green-500 to-green-600' },
    { icon: Target, title: 'Résultats Mesurables', desc: 'Nous nous engageons sur des objectifs concrets et vérifiables.', gradient: 'from-blue-500 to-blue-600' },
    { icon: Users, title: 'Accompagnement Continu', desc: 'Support technique et formation tout au long de votre projet.', gradient: 'from-amber-500 to-amber-600' },
  ];

  const team = [
    {
      name: 'Meya Dorodoro',
      role: 'CEO & Fondateur',
      position: 'Informatique & Full-Stack',
      bio: "Expert en infrastructure IT et cybersécurité avec plus de 7 ans d'expérience en domaines d'informatique.",
      image: meyaImg,
      gradientBg: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
      gradientTw: 'from-blue-500 to-cyan-500',
      number: '01',
      initial: 'M',
    },
    {
      name: 'Maboko Alida',
      role: 'Directrice Technique en Données',
      position: 'Experte en réseaux et solutions cloud',
      bio: "Spécialiste des réseaux haut débit et des solutions cloud.",
      image: oseeImg,
      gradientBg: 'linear-gradient(135deg, #06b6d4, #14b8a6)',
      gradientTw: 'from-cyan-500 to-teal-500',
      number: '02',
      initial: 'O',
    },
    {
      name: 'Kasway Rodrick',
      role: 'Responsable Énergie',
      position: 'Ingénieur Énergies Renouvelables',
      bio: "Ingénieur en énergies renouvelables, il pilote nos projets solaires et d'efficacité énergétique.",
      image: paulImg,
      gradientBg: 'linear-gradient(135deg, #f59e0b, #f97316)',
      gradientTw: 'from-amber-500 to-orange-500',
      number: '03',
      initial: 'P',
    },
    {
      name: 'Stephane ',
      role: 'Lead Développement',
      position: 'Développeuse Full-Stack',
      bio: "Développeuse full-stack, elle conçoit des applications web et mobiles sur mesure.",
      image: claireImg,
      gradientBg: 'linear-gradient(135deg, #a855f7, #ec4899)',
      gradientTw: 'from-purple-500 to-pink-500',
      number: '04',
      initial: 'C',
    }
  ];

  return (
    <>
      <style>{globalStyles}</style>

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
                  d'OMDEVE
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
              <Link to="/realisations" className="group border-2 border-white/30 hover:border-white px-6 py-3 rounded-xl font-semibold text-white hover:bg-white/10 transition-all hover:scale-105 flex items-center gap-2">
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
                <p>Fondée en 2018 à Kinshasa, <strong className="text-blue-400">OMDEVE Services</strong> est née de la volonté de répondre aux défis numériques et énergétiques de la RDC. Partant d'une petite équipe de 3 passionnés d'informatique, nous avons rapidement grandi pour devenir un acteur incontournable du secteur.</p>
                <p>En 2020, nous avons élargi nos compétences aux énergies renouvelables, puis au développement digital en 2022. Aujourd'hui, nous accompagnons plus de 150 entreprises congolaises dans leur transformation technologique.</p>
                <p>Notre mot d'ordre : <strong className="text-blue-400">innovation locale, standards internationaux</strong>.</p>
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
                <p><strong className="text-amber-400">Accélérer la digitalisation et la transition énergétique des entreprises congolaises</strong> en leur fournissant des solutions fiables, sécurisées et adaptées à leur environnement.</p>
                <p>Nous croyons que la technologie doit être accessible à tous. C'est pourquoi nous proposons des services sur mesure, avec un accompagnement de proximité et une veille technologique constante.</p>
                <p>Notre engagement : <strong className="text-amber-400">zéro panne non anticipée, zéro vulnérabilité négligée, zéro projet sans formation</strong>.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ==================== CHIFFRES CLÉS ==================== */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/10">
        <div className="container mx-auto px-4 py-16">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-4">
              <TrendingUp size={16} className="text-blue-400" />
              <span className="text-blue-300 text-sm font-semibold">Quelques chiffres</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-syne">OMDEVE en quelques données</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div key={i} variants={fadeUp} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center transition-all hover:-translate-y-2 hover:border-blue-500/50">
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
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
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
                <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center transition-all hover:-translate-y-2 hover:border-blue-500/50">
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
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
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
                <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="group bg-white/5 border border-white/10 rounded-2xl p-6 transition-all hover:-translate-y-2 hover:border-blue-500/50">
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
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
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
                <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white/5 border border-white/10 rounded-2xl p-6 transition-all hover:-translate-y-2 hover:border-blue-500/50">
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
        <div className="container mx-auto px-4 py-20">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-4">
              <Users size={14} className="text-blue-400" />
              <span className="text-blue-300 text-xs font-semibold tracking-wider uppercase">Notre équipe</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-syne mb-4">
              Des experts{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                passionnés
              </span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">
              Une équipe multidisciplinaire unie par une seule mission : votre réussite technologique.
            </p>
          </motion.div>

          {/* Grille de cartes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="team-card"
              >
                {/* Zone photo */}
                <div className="team-photo-wrap">
                  <img
                    src={member.image}
                    alt={member.name}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback initiale */}
                  <div
                    className="team-photo-fallback"
                    style={{ display: 'none', background: member.gradientBg }}
                  >
                    {member.initial}
                  </div>

                  {/* Overlay dégradé */}
                  <div className="team-photo-overlay" />

                  {/* Badge rôle */}
                  <div className="team-role-badge" style={{ background: member.gradientBg }}>
                    {member.role}
                  </div>

                  {/* Numéro décoratif */}
                  <div className="team-number">{member.number}</div>
                </div>

                {/* Barre colorée en bas */}
                <div className="team-bottom-bar" style={{ background: member.gradientBg }} />

                {/* Infos membre */}
                <div className="team-info">
                  <div className="team-name">{member.name}</div>
                  <div className="team-position">{member.position}</div>
                  <div className="team-bio">{member.bio}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA équipe */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mt-14"
          >
            <Link
              to="/experts"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-amber-500/25"
            >
              <Rocket size={20} className="group-hover:rotate-12 transition-transform duration-300" />
              <span>Rencontrer toute l'équipe</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </div>



      {/* ==================== CONTACT INFO CARD ==================== */}
     <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-black border-t border-white/10 overflow-hidden">
  
  {/* soft glow */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

  <div className="container relative mx-auto px-4 py-24">
    
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
    >
      
      <div className="grid md:grid-cols-2">
        
        {/* LEFT */}
        <div className="p-10 md:p-14">
          
          <h2 className="text-3xl md:text-4xl font-bold text-white font-syne mb-10 tracking-tight">
            Contactez-nous
          </h2>

          <div className="space-y-6">
            {[
              { icon: Phone, label: 'Téléphone', value: '+243 816 590 788', link: 'tel:+243816590788' },
              { icon: Mail, label: 'Email', value: 'omedevservices@gmail.com', link: 'mailto:omedevservices@gmail.com' },
              { icon: MapPin, label: 'Adresse', value: 'Avenue Kabmabre n°75, Lingwala, Kinshasa, RDC' },
            ].map(({ icon: Icon, label, value, link }) => (
              
              <div
                key={label + value}
                className="group flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition"
              >
                
                <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition">
                  <Icon size={18} className="text-gray-300 group-hover:scale-110 transition-transform" />
                </div>

                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">
                    {label}
                  </p>

                  {link ? (
                    <a
                      href={link}
                      className="text-white font-medium text-lg hover:opacity-70 transition break-words"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-white font-medium text-lg break-words">
                      {value}
                    </p>
                  )}
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* RIGHT */}
        <div className="relative p-10 md:p-14 flex flex-col justify-center bg-white/5 border-l border-white/10">
          
          <div className="absolute inset-0 bg-black/20" />

          <div className="relative z-10 space-y-6">
            
            <div className="text-4xl md:text-5xl font-bold text-white font-syne tracking-tight leading-tight">
              <a href="tel:+243816590788" className="hover:opacity-70 transition">
                +243 816 590 788
              </a>
            </div>

            <div className="text-lg text-gray-300">
              Kinshasa, RDC
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">
              Disponible du lundi au vendredi  
              <br />
              <span className="text-white font-medium">8h - 18h</span>
            </p>

          </div>

        </div>

      </div>
    </motion.div>

  </div>
</div>















      {/* ==================== CTA FINALE ==================== */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/5">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, rgba(59,130,246,0.3) 0%, transparent 60%),
                            radial-gradient(circle at 80% 70%, rgba(6,182,212,0.2) 0%, transparent 60%)`
        }} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/50 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Target size={28} className="text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white font-syne mb-3">Audit gratuit</h3>
              <p className="text-gray-300 mb-6">Bénéficiez d'un diagnostic complet de vos infrastructures sans engagement.</p>
              <Link to="/audit-gratuit" className="inline-flex items-center gap-2 bg-white/10 border border-white/20 hover:bg-white/20 text-white px-6 py-2.5 rounded-xl font-semibold transition-all hover:scale-105">
                Demander un audit <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/20 hover:border-amber-500/50 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Handshake size={28} className="text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white font-syne mb-3">Devis personnalisé</h3>
              <p className="text-gray-300 mb-6">Recevez une proposition sur mesure adaptée à vos besoins et votre budget.</p>
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