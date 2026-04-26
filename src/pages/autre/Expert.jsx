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