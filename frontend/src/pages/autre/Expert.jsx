import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Users, Award, Target, ArrowRight, Headphones, Briefcase,
  Calendar, Star, Handshake, ChevronRight
} from 'lucide-react';

import { FaLinkedin, FaGithub, FaTwitter, FaInstagram, FaBehance } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import PublicHero from '../../components/Public/PublicHero';
import CTASection from '../../components/Public/CTASection';

import expert1 from '/src/assets/images/experts/os5.jpeg';
import expert2 from '/src/assets/images/experts/ms.jpeg';
import expert3 from '/src/assets/images/experts/os3.jpeg';
import expert4 from '/src/assets/images/experts/st.jpeg';
import expert5 from '/src/assets/images/experts/os1.jpg';

import expert6 from '/src/assets/images/experts/fido.jpeg';
import expert7 from '/src/assets/images/experts/am.jpeg';
import expert8 from '/src/assets/images/experts/ro.jpeg';
import expert9 from '/src/assets/images/experts/glo.jpeg';
import expert10 from '/src/assets/images/experts/ops.jpeg';

/* ─────────────────────────────────────────────
   DESIGN SYSTEM — identique à Home (navy/electric/gold)
   Le bloc `.omedev-home` ci-dessous reprend exactement
   les tokens (couleurs, boutons, cards, sections, animations)
   définis sur la page Home pour garantir une cohérence visuelle totale.
   ───────────────────────────────────────────── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  .omedev-home {
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
    overflow: hidden;
  }

  .omedev-home .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .omedev-home .section-badge {
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

  .omedev-home .section-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -.03em;
    margin-bottom: 1rem;
    font-family: 'Syne', sans-serif;
    color: #053876;
  }

  .omedev-home .section-subtitle {
    font-size: 1rem;
    color: #25364A;
    max-width: 52ch;
    margin: 0 auto;
    line-height: 1.7;
  }

  .omedev-home .divider {
    width: 64px;
    height: 4px;
    background: linear-gradient(90deg, #0B74C1, #2AACB2, #55DDB5);
    border-radius: 99px;
    margin: 1rem auto 1.5rem;
  }

  .omedev-home .btn-primary,
  .omedev-home .btn-accent {
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

  .omedev-home .btn-primary:hover,
  .omedev-home .btn-accent:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 36px rgba(42,172,178,.28);
  }

  .omedev-home .btn-outline {
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

  .omedev-home .btn-outline:hover {
    border-color: #2AACB2;
    color: #0B74C1;
    background: rgba(85,221,181,.08);
    transform: translateY(-3px);
  }

  .omedev-home .card-hover {
    transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease;
    background: #fff;
    border: 1px solid rgba(5,56,118,.09);
    border-radius: 18px;
    box-shadow: 0 10px 30px rgba(5,56,118,.06);
  }

  .omedev-home .card-hover:hover {
    transform: translateY(-7px);
    box-shadow: 0 22px 48px rgba(11,116,193,.14);
    border-color: rgba(42,172,178,.35);
  }

  .omedev-home .grid-bg {
    background-image: linear-gradient(rgba(11,116,193,.055) 1px, transparent 1px),
      linear-gradient(90deg, rgba(11,116,193,.055) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  .omedev-home .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
  }

  .omedev-home .omedev-hero {
    background: linear-gradient(135deg, #053876 0%, #1D5B9B 35%, #4681B7 60%, #72A5CE 80%, #A6C3D7 100%);
    position: relative;
  }

  .omedev-home .omedev-light-section {
    background: #F6F6F7;
  }

  .omedev-home .omedev-white-section {
    background: #fff;
  }

  .omedev-home .omedev-energy-section {
    background: linear-gradient(135deg, #0B74C1 0%, #2AACB2 55%, #55DDB5 100%);
  }

  .omedev-home .omedev-dark-section {
    background: linear-gradient(135deg, #053876 0%, #1D5B9B 55%, #0B74C1 100%);
  }

  .omedev-home .hero-grid {
    background-image: linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px);
    background-size: 56px 56px;
  }

  .omedev-home .hero-glass {
    background: rgba(255,255,255,.12);
    border: 1px solid rgba(255,255,255,.28);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 0 24px 60px rgba(5,56,118,.25);
  }

  .omedev-home .hero-glass-item {
    background: rgba(255,255,255,.10);
    border: 1px solid rgba(255,255,255,.20);
    backdrop-filter: blur(10px);
  }

  .omedev-home .energy-icon {
    background: rgba(85,221,181,.14);
    color: #2AACB2;
    border: 1px solid rgba(42,172,178,.20);
  }

  .omedev-home .light-card {
    background: #fff;
    border: 1px solid rgba(5,56,118,.08);
    box-shadow: 0 14px 36px rgba(5,56,118,.07);
  }

  .omedev-home .dark-section .text-white,
  .omedev-home .omedev-dark-section .text-white,
  .omedev-home .omedev-energy-section .text-white,
  .omedev-home .omedev-hero .text-white { color: #fff !important; }

  .omedev-home .light-content .text-white,
  .omedev-home .omedev-light-section .text-white,
  .omedev-home .omedev-white-section .text-white { color: #0B1213 !important; }

  .omedev-home .light-content .text-[#25364A],
  .omedev-home .omedev-light-section .text-[#25364A],
  .omedev-home .omedev-white-section .text-[#25364A] { color: #25364A !important; }

  .omedev-home .light-content .text-blue-400,
  .omedev-home .omedev-light-section .text-blue-400,
  .omedev-home .omedev-white-section .text-blue-400 { color: #0B74C1 !important; }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-16px); }
  }
  .omedev-home .animate-float { animation: float 6s ease-in-out infinite; }

  @media (max-width: 768px) {
    .omedev-home .container { padding: 0 1rem; }
  }

  /* ═══════════════════════════════════════════
     SPÉCIFIQUE PAGE EXPERT — cartes équipe
     Adapté au système Home : cards claires (#fff),
     bordures/ombres navy, accents énergie/turquoise.
  ═══════════════════════════════════════════ */

  @keyframes shimmer {
    0%   { background-position: -1000px 0; }
    100% { background-position:  1000px 0; }
  }
  @keyframes gradientShift {
    0%   { background-position: 0%   50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0%   50%; }
  }
  @keyframes rotateGlow {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .shimmer {
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
    background-size: 1000px 100%;
    animation: shimmer 2s infinite;
  }

  /* Photo carrée */
  .expert-image-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    flex-shrink: 0;
    background: #053876;
  }

  .expert-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    object-position: center 15%;
    transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                filter 0.4s ease;
    filter: brightness(0.92) contrast(1.05);
  }

  .expert-image.pos1 { object-position: center 8%;  }
  .expert-image.pos2 { object-position: center 10%; }
  .expert-image.pos3 { object-position: center 12%; }
  .expert-image.pos4 { object-position: center 10%; }
  .expert-image.pos5 { object-position: center 8%;  }
  .expert-image.pos6 { object-position: center 10%; }
  .expert-image.pos7 { object-position: center 12%; }
  .expert-image.pos8 { object-position: center 8%;  }
  .expert-image.pos9 { object-position: center 10%; }
  .expert-image.pos10 { object-position: center 12%; }

  .expert-card:hover .expert-image {
    transform: scale(1.07);
    filter: brightness(1) contrast(1.05);
  }

  /* Fondu bas de la photo (teinte navy, cohérente avec la marque) */
  .expert-image-wrapper::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 90px;
    background: linear-gradient(to top, rgba(5,56,118,0.75) 0%, transparent 100%);
    pointer-events: none;
    z-index: 2;
  }

  .image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(11,116,193,0.35), rgba(42,172,178,0.35));
    opacity: 0;
    transition: opacity 0.5s ease;
    z-index: 3;
    pointer-events: none;
  }
  .expert-card:hover .image-overlay { opacity: 1; }

  .image-shine {
    position: absolute;
    top: 0; left: -100%;
    width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent);
    transition: left 0.7s ease;
    z-index: 4;
    pointer-events: none;
    transform: skewX(-15deg);
  }
  .expert-card:hover .image-shine { left: 150%; }

  /* Anneau lumineux (survol) — reprend la palette énergie de Home */
  .glow-ring {
    position: absolute;
    inset: -3px;
    border-radius: inherit;
    background: conic-gradient(from 0deg, transparent, #0B74C1, transparent, #2AACB2, transparent);
    opacity: 0;
    transition: opacity 0.35s ease;
    z-index: 0;
    pointer-events: none;
  }
  .expert-card:hover .glow-ring {
    opacity: 0.4;
    animation: rotateGlow 2.5s linear infinite;
  }

  /* Icônes réseaux sociaux (sur la photo) */
  .social-icon {
    transform: translateY(14px);
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  .expert-card:hover .social-icon { transform: translateY(0); opacity: 1; }
  .social-icon:nth-child(1) { transition-delay: 0.04s; }
  .social-icon:nth-child(2) { transition-delay: 0.09s; }
  .social-icon:nth-child(3) { transition-delay: 0.14s; }
  .social-icon:nth-child(4) { transition-delay: 0.19s; }
  .social-icon:nth-child(5) { transition-delay: 0.24s; }

  /* Badge rôle (sur la photo) */
  .role-badge {
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    z-index: 10;
  }
  .expert-card:hover .role-badge {
    transform: scale(1.06);
    box-shadow: 0 0 16px rgba(11,116,193,0.5);
  }

  /* Tags compétences — version claire */
  .skill-tag {
    transition: all 0.25s ease;
    color: #053876;
    background: rgba(11,116,193,0.07);
    border: 1px solid rgba(5,56,118,0.12);
  }
  .skill-tag:hover {
    transform: translateY(-2px) scale(1.05);
    background: rgba(11,116,193,0.16) !important;
    border-color: rgba(11,116,193,0.5) !important;
    color: #0B74C1;
  }

  /* Carte expert — reprend .card-hover (fond blanc, ombre navy) */
  .expert-card {
    transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease;
    position: relative;
    background: #fff;
    border: 1px solid rgba(5,56,118,.09);
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(5,56,118,.06);
    display: flex;
    flex-direction: column;
  }
  .expert-card:hover {
    transform: translateY(-9px);
    box-shadow: 0 24px 50px rgba(11,116,193,.16);
    border-color: rgba(42,172,178,.4);
  }

  .expert-card-body {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .expert-bio { color: #25364A; transition: color 0.3s ease; }
  .expert-card:hover .expert-bio { color: #0B1213; }

  .expert-name { color: #053876; transition: all 0.3s ease; }
  .expert-card:hover .expert-name {
    background: linear-gradient(135deg, #0B74C1, #2AACB2);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradientShift 2s ease infinite;
  }

  .experts-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 2rem;
    align-items: start;
  }
  @media (min-width: 768px) {
    .experts-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (min-width: 1024px) {
    .experts-grid { grid-template-columns: repeat(3, 1fr); }
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

const Counter = ({ end, suffix, duration = 2.2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const inc = end / (duration * 60);
    const timer = setInterval(() => {
      start += inc;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
};

const Experts = () => {

  const experts = [
    {
      id: 1,
      name: 'Meya Dorodoro',
      role: 'CEO & Fondateur',
      position: 'Expert en Informatique Appliquée & Développeur Full-Stack',
      bio: "Plus de 4 ans d'expérience en infrastructure IT et cybersécurité en Afrique centrale. Visionnaire et passionné par l'innovation technologique.",
      image: expert1,
      gradient: 'from-[#0B74C1] to-[#053876]',
      posClass: 'pos1',
      socials: { linkedin: 'https://linkedin.com/in/meya-dorodoro', github: 'https://github.com/meyadorodoro', twitter: 'https://twitter.com/meyadorodoro', email: 'oseedoro@gmail.com' },
      skills: ['Cybersécurité', 'Infrastructure IT', 'Cloud Computing', 'Leadership'],
      certifications: ['CISSP', 'PMP', 'AWS Solutions Architect']
    },
    {
      id: 2,
      name: 'Maswa Arthur ',
      role: 'Directeur  Technique',
      position: 'Ingénieur Télécoms',
      bio: "Ingénieur en télécommunications, spécialiste des réseaux haut débit et des solutions cloud. Elle pilote l'innovation technique et la R&D.",
      image: expert2,
      gradient: 'from-[#72A5CE] to-[#1D5B9B]',
      posClass: 'pos2',
      socials: { linkedin: 'https://linkedin.com/in/osee-mbongo', github: 'https://github.com/oseembongo', twitter: 'https://twitter.com/oseembongo', email: 'osee.mbongo@omedev.com' },
      skills: ['Réseaux', 'Télécommunications', 'Cloud', '5G', 'IoT'],
      certifications: ['CCNP', 'Azure Administrator', '5G Specialist']
    },
    {
      id: 3,
      name: 'Adine Munoko',
      role: 'Responsable Énergie',
      position: 'Ingénieur Énergies Renouvelables',
      bio: "Ingénieur en énergies renouvelables, il pilote nos projets solaires et d'efficacité énergétique. Expert en solutions photovoltaïques.",
      image: expert3,
      gradient: 'from-[#55DDB5] to-[#2AACB2]',
      posClass: 'pos3',
      socials: { linkedin: 'https://linkedin.com/in/paul-kasongo', twitter: 'https://twitter.com/paulkasongo', email: 'paul.kasongo@omedev.com' },
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
      gradient: 'from-[#1D5B9B] to-[#053876]',
      posClass: 'pos4',
      socials: { linkedin: 'https://linkedin.com/in/claire-mbenza', github: 'https://github.com/clairembenza', twitter: 'https://twitter.com/clairembenza', instagram: 'https://instagram.com/claire.dev', email: 'claire.mbenza@omedev.com' },
      skills: ['React', 'Node.js', 'Flutter', 'MongoDB', 'AWS'],
      certifications: ['Meta Frontend Developer', 'AWS Cloud Practitioner']
    },
    {
      id: 5,
      name: 'Fido Makayabu',
      role: 'Admin. Réseau',
      position: 'Expert Télécommunications & Administration Réseau',
      bio: "Certifié dans le domaine des télécommunications et de l'administration réseau, il conçoit et maintient des infrastructures réseau robustes et sécurisées.",
      image: expert6,
      gradient: 'from-[#2AACB2] to-[#1D5B9B]',
      posClass: 'pos6',
      socials: { linkedin: 'https://linkedin.com/in/fido-makayabu', instagram: 'https://instagram.com/fido.tech', behance: 'https://behance.net/fidomakayabu', email: 'fido.makayabu@omedev.com' },
      skills: ['Networking', 'Cisco', 'Juniper', 'Linux', 'Windows Server'],
      certifications: ['CCNA', 'CCNP', 'MCSE']
    },
    {
      id: 6,
      name: 'Amosi Aristote',
      role: 'Resp Climatisation',
      position: 'Expert en Installation & Maintenance,  Responsable du support technique',
      bio: "Certifié dans le domaine de la climatisation, il intervient sur l'installation, la maintenance et la réparation des systèmes de climatisation.",
      image: expert7,
      gradient: 'from-[#72A5CE] to-[#053876]',
      posClass: 'pos7',
      socials: { linkedin: 'https://linkedin.com/in/amosi-aristote', instagram: 'https://instagram.com/amosi.clim', email: 'amosi.aristote@omedev.com' },
      skills: ['Climatisation', 'HVAC', 'Installation', 'Maintenance', 'Réparation'],
      certifications: ['Certificat Climatisation', 'Maintenance HVAC', 'Technicien Réfrigération']
    },
    {
      id: 7,
      name: 'Rodric Kasway',
      role: 'chargé technique des l’infrastructures réseau',
      position: 'Administration et supervision des équipements réseau (routeurs, switchs, firewalls), ',
      bio: "Spécialiste en Réseaux et configuration de serveurs, il conçoit et maintient des systèmes de surveillance robustes et sécurisés pour nos clients.",
      image: expert8,
      gradient: 'from-[#4681B7] to-[#1D5B9B]',
      posClass: 'pos8',
      socials: { linkedin: 'https://linkedin.com/in/rodric-kasway', instagram: 'https://instagram.com/rodric.tech', email: 'rodric.kasway@omedev.com' },
      skills: ['Création réseau', 'IP Cameras', 'Configuration réseau', 'Câblage'],
      certifications: ['Certificat Cisco', 'Technicien Sécurité Électronique']
    },
    {
      id: 8,
      name: 'Glody Ntudi',
      role: 'Infographie & IT',
      position: 'Expert en Infographie & Informatique',
      bio: "Certifié en informatique et graphisme, il conçoit des solutions visuelles et numériques innovantes : identité visuelle, supports de communication et outils informatiques.",
      image: expert9,
      gradient: 'from-[#2AACB2] to-[#053876]',
      posClass: 'pos9',
      socials: { linkedin: 'https://linkedin.com/in/glody-ntudi', instagram: 'https://instagram.com/glody.design', behance: 'https://behance.net/glodyntudi', email: 'glody.ntudi@omedev.com' },
      skills: ['Photoshop', 'Illustrator', 'InDesign', 'Identité visuelle', 'Web Design'],
      certifications: ['Adobe Certified', 'Technicien Infographiste', 'Web Designer']
    },

     {
      id: 9,
      name: 'Emanuel Kitoko',
      role: 'Analyste Programmeur ',
      position: 'un programmeur analyste spécialisé en développement de logiciels et applications.',
      bio: "Certifié en informatique de gestion, il conçoit des solutions logicielles personnalisées pour répondre aux besoins spécifiques de nos clients, en assurant performance et fiabilité.",
      image: expert10,
      gradient: 'from-[#55DDB5] to-[#0B74C1]',
      posClass: 'pos10',
      socials: { linkedin: 'https://linkedin.com/in/glody-ntudi', instagram: 'https://instagram.com/glody.design', behance: 'https://behance.net/glodyntudi', email: 'glody.ntudi@omedev.com' },
      skills: ['Photoshop', 'Illustrator', 'InDesign', 'Identité visuelle', 'Web Design'],
      certifications: ['Adobe Certified', 'Technicien Infographiste', 'Web Designer']
    },
  ];

  const stats = [
    { value: 4,   suffix: '+', label: "Années d'expertise", icon: Calendar   },
    { value: 15,  suffix: '+', label: 'Projets réalisés',    icon: Briefcase  },
    { value: 98,  suffix: '%', label: 'Clients satisfaits',  icon: Star       },
    { value: 24,  suffix: '/7', label: 'Support technique',  icon: Headphones },
  ];

  const getSocialUrl = (platform, url) =>
    platform === 'email' ? `mailto:${url}` : url;

  const SocialIcon = ({ platform, url }) => {
    const icons = {
      linkedin:  FaLinkedin,
      github:    FaGithub,
      twitter:   FaTwitter,
      instagram: FaInstagram,
      behance:   FaBehance,
      email:     MdEmail
    };
    const Icon = icons[platform];
    if (!url || !Icon) return null;
    return (
      <a
        href={getSocialUrl(platform, url)}
        target={platform === 'email' ? '_self' : '_blank'}
        rel={platform === 'email' ? '' : 'noopener noreferrer'}
        className="social-icon w-9 h-9 rounded-full bg-white/15 flex items-center justify-center
                   transition-all duration-300 hover:scale-110 hover:bg-white/35 group"
      >
        <Icon size={15} className="text-white/80 group-hover:text-white transition-colors" />
      </a>
    );
  };

  return (
    <div className="omedev-home">
      <style>{globalStyles}</style>

      {/* ==================== HERO ==================== */}
      <PublicHero
        badge="Notre équipe d'élite"
        title="Des experts passionnés"
        highlight="experts passionnés"
        subtitle="Une équipe multidisciplinaire dédiée à votre réussite technologique et énergétique, de l'audit au déploiement."
        primaryAction={{ label: 'Nous contacter', to: '/contact' }}
        secondaryAction={{ label: 'Voir nos réalisations', to: '/realisations' }}
      />

      {/* ==================== STATS ==================== */}
      <section className="omedev-dark-section py-20">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -3 }}
                className="relative group p-6 rounded-2xl backdrop-blur-md overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#2AACB2]/0 via-[#2AACB2]/5 to-[#2AACB2]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer" />
                <div className="relative z-10">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                    style={{ background: 'linear-gradient(135deg, #4681B7, #053876)' }}
                  >
                    <stat.icon size={24} className="text-white" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-1">
                    <Counter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== GRILLE EXPERTS ==================== */}
      <section className="omedev-light-section light-content py-24">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}
          >
            <motion.div variants={fadeUp}><span className="section-badge">Notre équipe</span></motion.div>
            <motion.h2 variants={fadeUp} className="section-title">Rencontrez nos experts</motion.h2>
            <motion.div variants={fadeUp} className="divider" />
            <motion.p variants={fadeUp} className="section-subtitle">Des professionnels qualifiés, certifiés et passionnés à votre service</motion.p>
          </motion.div>

          {/* ── Grille de cartes ── */}
          <div className="experts-grid">
            {experts.map((expert, i) => (
              <motion.div
                key={expert.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.08 }}
                className="expert-card group"
              >
                {/* Anneau lumineux */}
                <div className="glow-ring" />

                {/* Zone photo — ratio 1:1 */}
                <div className="expert-image-wrapper">

                  <img
                    src={expert.image}
                    alt={expert.name}
                    className={`expert-image ${expert.posClass}`}
                    loading="lazy"
                  />

                  <div className="image-overlay" />
                  <div className="image-shine" />

                  {/* Badge rôle */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className={`role-badge inline-block px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r ${expert.gradient} text-white shadow-lg backdrop-blur-sm`}>
                      {expert.role}
                    </span>
                  </div>

                  {/* Réseaux sociaux */}
                  <div className="absolute bottom-4 left-0 right-0 flex gap-2 justify-center z-10 px-4">
                    {Object.entries(expert.socials).map(([platform, url]) => (
                      <SocialIcon key={platform} platform={platform} url={url} />
                    ))}
                  </div>
                </div>

                {/* Corps de la carte */}
                <div className="expert-card-body p-6">
                  <h3 className="expert-name text-xl font-bold font-syne mb-1">
                    {expert.name}
                  </h3>

                  <p className={`text-xs font-semibold mb-3 bg-gradient-to-r ${expert.gradient} bg-clip-text text-transparent uppercase tracking-wide`}>
                    {expert.position}
                  </p>

                  <p className="expert-bio text-sm leading-relaxed mb-4 line-clamp-3">
                    {expert.bio}
                  </p>

                  <div className="w-full h-px bg-[rgba(5,56,118,0.08)] mb-4" />

                  <div className="flex flex-wrap gap-2 mb-4">
                    {expert.skills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="skill-tag text-xs px-2.5 py-1 rounded-full cursor-default">
                        {skill}
                      </span>
                    ))}
                    {expert.skills.length > 3 && (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-[rgba(11,116,193,0.10)] text-[#0B74C1] border border-[rgba(11,116,193,0.25)]">
                        +{expert.skills.length - 3}
                      </span>
                    )}
                  </div>

                  <details className="mt-auto">
                    <summary className="text-xs text-[#0B74C1] cursor-pointer hover:text-[#2AACB2] transition-colors flex items-center gap-1.5 select-none font-semibold">
                      <Award size={12} />
                      Certifications ({expert.certifications.length})
                    </summary>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {expert.certifications.map((cert, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 rounded-full bg-[rgba(11,116,193,0.08)] text-[#0B74C1] border border-[rgba(11,116,193,0.2)]">
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
      </section>

      {/* ==================== CTA FINALE ==================== */}
      <CTASection
        badge="Envie de travailler avec nous ?"
        title="Rencontrez l'équipe qui portera votre projet"
        highlight="votre projet"
        subtitle="Bénéficiez d'un diagnostic gratuit de vos infrastructures ou recevez une proposition sur mesure adaptée à vos besoins."
        backgroundImage="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=80"
        primaryAction={{ label: 'Demander un devis', to: '/demander-devis' }}
        secondaryAction={{ label: 'Audit gratuit', to: '/audit-gratuit' }}
      />
    </div>
  );
};

export default Experts;
