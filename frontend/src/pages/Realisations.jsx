// Realisations.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  ArrowRight, CheckCircle, Rocket, Star, Calendar, MapPin, Briefcase, Clock,
  Eye, X, Search, Quote, ThumbsUp, Award, Users,
  Network, Shield, Code, Cloud, Sun, BookOpen, Camera, Grid
} from 'lucide-react';
import PublicHero from '../components/Public/PublicHero';
import CTASection from '../components/Public/CTASection';

/* ─────────────────────────────────────────────
   DESIGN SYSTEM — identique à la page About
   (navy/electric/turquoise/energy)
   ───────────────────────────────────────────── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  .omedev-realisations {
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
    font-family: 'DM Sans', sans-serif;
  }

  .omedev-realisations .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .omedev-realisations .section-badge {
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

  .omedev-realisations .section-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -.03em;
    margin-bottom: 1rem;
    font-family: 'Syne', sans-serif;
    color: #053876;
  }

  .omedev-realisations .section-subtitle {
    font-size: 1rem;
    color: #25364A;
    max-width: 56ch;
    margin: 0 auto;
    line-height: 1.7;
  }

  .omedev-realisations .divider {
    width: 64px;
    height: 4px;
    background: linear-gradient(90deg, #0B74C1, #2AACB2, #55DDB5);
    border-radius: 99px;
    margin: 1rem auto 1.5rem;
  }

  .omedev-realisations .btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: .6rem;
    background: linear-gradient(135deg, #0B74C1 0%, #2AACB2 55%, #55DDB5 100%);
    color: #fff;
    font-size: .9rem;
    font-weight: 700;
    padding: .9rem 1.7rem;
    border-radius: 999px;
    text-decoration: none;
    transition: all .3s ease;
    cursor: pointer;
    border: none;
    font-family: 'Syne', sans-serif;
    box-shadow: 0 10px 28px rgba(11,116,193,.20);
  }

  .omedev-realisations .btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 36px rgba(42,172,178,.28);
  }

  .omedev-realisations .btn-outline-light {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: .6rem;
    background: transparent;
    color: #fff;
    font-size: .9rem;
    font-weight: 700;
    padding: .85rem 1.7rem;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,.3);
    text-decoration: none;
    transition: all .3s ease;
    cursor: pointer;
    font-family: 'Syne', sans-serif;
  }

  .omedev-realisations .btn-outline-light:hover {
    border-color: rgba(255,255,255,.7);
    background: rgba(255,255,255,.1);
    transform: translateY(-3px);
  }

  .omedev-realisations .btn-soft {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: .5rem;
    background: #fff;
    color: #053876;
    font-size: .85rem;
    font-weight: 700;
    padding: .75rem 1.4rem;
    border-radius: 999px;
    border: 1px solid rgba(5,56,118,.14);
    transition: all .3s ease;
    cursor: pointer;
    font-family: 'Syne', sans-serif;
  }

  .omedev-realisations .btn-soft:hover {
    border-color: #2AACB2;
    color: #0B74C1;
    background: rgba(85,221,181,.08);
    transform: translateY(-2px);
  }

  .omedev-realisations .card-hover {
    transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease;
    background: #fff;
    border: 1px solid rgba(5,56,118,.09);
    border-radius: 18px;
    box-shadow: 0 10px 30px rgba(5,56,118,.06);
  }

  .omedev-realisations .card-hover:hover {
    transform: translateY(-7px);
    box-shadow: 0 22px 48px rgba(11,116,193,.14);
    border-color: rgba(42,172,178,.35);
  }

  .omedev-realisations .omedev-hero {
    background: linear-gradient(135deg, #053876 0%, #1D5B9B 35%, #4681B7 60%, #72A5CE 80%, #A6C3D7 100%);
    position: relative;
  }

  .omedev-realisations .omedev-light-section { background: #F6F6F7; }
  .omedev-realisations .omedev-white-section { background: #fff; }
  .omedev-realisations .omedev-dark-section {
    background: linear-gradient(135deg, #053876 0%, #1D5B9B 55%, #0B74C1 100%);
  }

  .omedev-realisations .hero-grid {
    background-image: linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px);
    background-size: 56px 56px;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-16px); }
  }
  .omedev-realisations .animate-float { animation: float 6s ease-in-out infinite; }

  /* ── Barre de filtres ── */
  .omedev-realisations .filter-bar {
    position: sticky;
    top: 0;
    z-index: 40;
    background: rgba(255,255,255,.92);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid rgba(5,56,118,.08);
  }

  .omedev-realisations .filter-pill {
    display: inline-flex;
    align-items: center;
    gap: .45rem;
    font-size: .8rem;
    font-weight: 700;
    padding: .55rem 1.05rem;
    border-radius: 999px;
    border: 1px solid rgba(5,56,118,.14);
    background: #fff;
    color: #25364A;
    transition: all .25s ease;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
  }
  .omedev-realisations .filter-pill:hover {
    border-color: rgba(42,172,178,.4);
    transform: translateY(-1px);
  }
  .omedev-realisations .filter-pill.active {
    color: #fff;
    border-color: transparent;
    box-shadow: 0 8px 20px rgba(11,116,193,.22);
  }

  .omedev-realisations .search-input {
    padding: .6rem .95rem .6rem 2.3rem;
    border-radius: 999px;
    font-size: .85rem;
    background: #F6F6F7;
    border: 1px solid rgba(5,56,118,.12);
    color: #0B1213;
    outline: none;
    transition: border-color .25s ease;
  }
  .omedev-realisations .search-input:focus { border-color: #2AACB2; }

  /* ── Carte projet ── */
  .omedev-realisations .project-card {
    position: relative;
    border-radius: 18px;
    overflow: hidden;
    background: #fff;
    border: 1px solid rgba(5,56,118,.09);
    box-shadow: 0 10px 30px rgba(5,56,118,.06);
    transition: all .4s cubic-bezier(.4,0,.2,1);
    cursor: pointer;
    display: flex;
    flex-direction: column;
  }
  .omedev-realisations .project-card:hover {
    transform: translateY(-8px);
    border-color: rgba(42,172,178,.35);
    box-shadow: 0 22px 48px rgba(11,116,193,.16);
  }
  .omedev-realisations .project-photo-wrap {
    position: relative;
    width: 100%;
    height: 220px;
    overflow: hidden;
    flex-shrink: 0;
    background: #D5DCE1;
  }
  .omedev-realisations .project-photo-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform .8s cubic-bezier(.4,0,.2,1);
  }
  .omedev-realisations .project-card:hover .project-photo-wrap img { transform: scale(1.08); }
  .omedev-realisations .project-category-badge {
    position: absolute;
    top: 14px;
    left: 14px;
    z-index: 3;
    padding: 5px 12px;
    border-radius: 50px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: .04em;
    color: white;
    box-shadow: 0 4px 16px rgba(5,56,118,.25);
  }
  .omedev-realisations .project-year-badge {
    position: absolute;
    top: 14px;
    right: 14px;
    z-index: 3;
    padding: 4px 10px;
    border-radius: 50px;
    font-size: 10px;
    font-weight: 700;
    background: rgba(5,56,118,.55);
    color: #fff;
    display: flex;
    align-items: center;
    gap: 4px;
    backdrop-filter: blur(4px);
  }
  .omedev-realisations .project-hover-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(11,116,193,.45), rgba(42,172,178,.45));
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity .3s ease;
  }
  .omedev-realisations .project-card:hover .project-hover-overlay { opacity: 1; }
  .omedev-realisations .project-info {
    padding: 20px 22px 22px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .omedev-realisations .project-title {
    font-family: 'Syne', sans-serif;
    font-size: 17px;
    font-weight: 700;
    color: #053876;
    margin-bottom: 8px;
    line-height: 1.3;
  }
  .omedev-realisations .project-desc {
    font-size: 13px;
    line-height: 1.65;
    color: #25364A;
    margin-bottom: 14px;
  }
  .omedev-realisations .tech-tag {
    font-size: 11px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 999px;
    background: rgba(11,116,193,.08);
    color: #0B74C1;
  }
  .omedev-realisations .project-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 12px;
    margin-top: auto;
    border-top: 1px solid rgba(5,56,118,.08);
    font-size: 11.5px;
    color: #25364A;
  }

  .omedev-realisations .projects-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1.75rem;
  }
  @media (min-width: 768px) {
    .omedev-realisations .projects-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (min-width: 1024px) {
    .omedev-realisations .projects-grid { grid-template-columns: repeat(3, 1fr); }
  }

  /* ── Stat card (section chiffres, sur fond clair) ── */
  .omedev-realisations .stat-card {
    padding: 1.6rem 1rem;
    text-align: center;
  }
  .omedev-realisations .stat-icon {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto .9rem;
  }
  .omedev-realisations .stat-value {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 2rem;
    color: #053876;
    margin-bottom: .2rem;
  }
  .omedev-realisations .stat-label {
    font-size: .82rem;
    color: #25364A;
  }

  /* ── Modal ── */
  .omedev-realisations .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(5,15,25,.65);
    backdrop-filter: blur(6px);
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    overflow-y: auto;
  }
  .omedev-realisations .modal-card {
    background: #fff;
    border-radius: 22px;
    max-width: 940px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 30px 80px rgba(5,20,40,.35);
  }
  .omedev-realisations .modal-stat {
    text-align: center;
    padding: .9rem;
    border-radius: 14px;
    background: #F6F6F7;
    border: 1px solid rgba(5,56,118,.08);
  }
  .omedev-realisations .modal-info-card {
    border-radius: 16px;
    background: #F6F6F7;
    border: 1px solid rgba(5,56,118,.08);
    padding: 1.3rem;
  }
  .omedev-realisations .modal-testimonial-card {
    border-radius: 16px;
    background: linear-gradient(135deg, rgba(11,116,193,.07), rgba(42,172,178,.07));
    border: 1px solid rgba(11,116,193,.16);
    padding: 1.3rem;
  }

  /* ── Galerie ── */
  .omedev-realisations .gallery-thumb {
    position: relative;
    overflow: hidden;
    border-radius: 18px;
    cursor: pointer;
  }
  .omedev-realisations .gallery-thumb img {
    transition: transform .5s ease;
  }
  .omedev-realisations .gallery-thumb:hover img { transform: scale(1.08); }
  .omedev-realisations .gallery-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(5,56,118,.6), transparent 60%);
    opacity: 0;
    transition: opacity .3s ease;
    display: flex;
    align-items: flex-end;
    padding: 1rem;
  }
  .omedev-realisations .gallery-thumb:hover .gallery-overlay { opacity: 1; }

  @media (max-width: 768px) {
    .omedev-realisations .container { padding: 0 1rem; }
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
  blueDark: '#1D5B9B',
  blue: '#0B74C1',
  blueLight: '#4681B7',
  cyan: '#72A5CE',
  turquoise: '#2AACB2',
  energy: '#55DDB5',
};

// Données des projets (contenu conservé)
const projects = [
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
      content: 'OMEDEV a réalisé un travail exceptionnel. Notre infrastructure réseau est désormais performante, sécurisée et fiable.',
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
];

// Catégories — recolorées avec la palette OMEDEV
const categories = [
  { id: 'all', name: 'Tous', icon: CheckCircle, hex: colors.navy, gradient: `linear-gradient(135deg, ${colors.navy}, ${colors.blueLight})` },
  { id: 'reseau', name: 'Réseau & Télécom', icon: Network, hex: colors.blue, gradient: `linear-gradient(135deg, ${colors.blue}, ${colors.blueLight})` },
  { id: 'securite', name: 'Sécurité & Surveillance', icon: Shield, hex: colors.navy, gradient: `linear-gradient(135deg, ${colors.navy}, ${colors.blueDark})` },
  { id: 'developpement', name: 'Développement Digital', icon: Code, hex: colors.turquoise, gradient: `linear-gradient(135deg, ${colors.turquoise}, ${colors.energy})` },
  { id: 'cloud', name: 'Cloud & Hébergement', icon: Cloud, hex: colors.blueLight, gradient: `linear-gradient(135deg, ${colors.blueLight}, ${colors.cyan})` },
  { id: 'energie', name: 'Énergie', icon: Sun, hex: colors.energy, gradient: `linear-gradient(135deg, ${colors.turquoise}, ${colors.energy})` },
  { id: 'formation', name: 'Formation & Accompagnement', icon: BookOpen, hex: colors.cyan, gradient: `linear-gradient(135deg, ${colors.blue}, ${colors.cyan})` }
];

const ProjectCard = ({ project, index, onOpenModal }) => {
  const cat = categories.find(c => c.id === project.category) || categories[0];

  return (
    <motion.div
      variants={fadeUp}
      onClick={() => onOpenModal(project)}
      className="project-card"
    >
      <div className="project-photo-wrap">
        <img src={project.image} alt={project.title} />
        <div className="project-category-badge" style={{ background: cat.gradient }}>
          {project.categoryName}
        </div>
        <div className="project-year-badge">
          <Calendar size={11} /> {project.year}
        </div>
        <div className="project-hover-overlay">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center" style={{ color: colors.blue }}>
            <Eye size={22} />
          </div>
        </div>
      </div>

      <div className="project-info">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech, i) => (
            <span key={i} className="tech-tag">{tech}</span>
          ))}
          {project.technologies.length > 3 && (
            <span className="tech-tag">+{project.technologies.length - 3}</span>
          )}
        </div>

        <div className="project-footer">
          <div className="flex items-center gap-1.5">
            <MapPin size={12} />
            <span>{project.location}</span>
          </div>
          <div className="flex items-center gap-1" style={{ color: '#D9A441' }}>
            <Star size={13} fill="currentColor" />
            <span className="font-semibold">{project.testimonial.rating}.0</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Icône Download (inline, style lucide)
const Download = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
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
    { value: '15+', label: 'Projets réalisés', icon: Briefcase },
    { value: '95+', label: 'Clients satisfaits', icon: Users },
    { value: '4+', label: "Années d'expérience", icon: Award },
    { value: '98%', label: 'Taux de satisfaction', icon: ThumbsUp }
  ];

  const galleryImages = projects.slice(0, 5).map(p => p.image);
  const mainImage = galleryImages[0];
  const thumbnails = galleryImages.slice(1, 5);

  return (
    <div className="omedev-realisations">
      <style>{globalStyles}</style>

      {/* ==================== HERO ==================== */}
      <PublicHero
        badge="Nos réalisations"
        title="Nos Réalisations"
        highlight="Réalisations"
        subtitle="Découvrez des projets concrets qui ont transformé nos clients en leaders de leur secteur."
        primaryAction={{ label: 'Nous écrire', to: '/contact' }}
        secondaryAction={{ label: 'Audit gratuit', to: '/audit' }}
      />

      {/* ==================== CHIFFRES CLÉS ==================== */}
      <section className="omedev-white-section py-24">
        <div className="container">
          <SectionHeader badge="Nos résultats" title="OMEDEV en quelques données" subtitle="Une expertise éprouvée sur des projets concrets à travers la RDC" />
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
                  className="card-hover stat-card"
                >
                  <div className="stat-icon" style={{ background: `linear-gradient(135deg, ${colors.blueLight}, ${colors.navy})` }}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== FILTRES & RECHERCHE ==================== */}
      <div className="filter-bar py-5">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveFilter(cat.id)}
                    className={`filter-pill ${isActive ? 'active' : ''}`}
                    style={isActive ? { background: cat.gradient } : {}}
                  >
                    <Icon size={15} />
                    {cat.name}
                  </button>
                );
              })}
            </div>
            <div className="relative">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: colors.blue }} />
              <input
                type="text"
                placeholder="Rechercher un projet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#25364A]/60 hover:text-[#053876]">
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ==================== GRILLE DES PROJETS ==================== */}
      <section className="omedev-light-section py-16">
        <div className="container">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: 'rgba(11,116,193,.08)' }}>
                <Search size={36} style={{ color: colors.blue }} />
              </div>
              <h3 className="font-syne text-xl font-bold mb-2" style={{ color: colors.navy }}>Aucun projet trouvé</h3>
              <p className="text-[#25364A]">Aucun projet ne correspond à vos critères de recherche.</p>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="projects-grid"
            >
              {filteredProjects.map((project, idx) => (
                <ProjectCard key={project.id} project={project} index={idx} onOpenModal={openModal} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ==================== MODAL DÉTAILS PROJET ==================== */}
      {showModal && selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-64 md:h-80">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" style={{ borderRadius: '22px 22px 0 0' }} />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,56,118,.85), transparent 55%)', borderRadius: '22px 22px 0 0' }} />
              <button onClick={closeModal} className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition">
                <X size={22} className="text-white" />
              </button>
              <div className="absolute bottom-6 left-6 right-6">
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-2"
                  style={{ background: (categories.find(c => c.id === selectedProject.category) || categories[0]).gradient }}
                >
                  {selectedProject.categoryName}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white font-syne">{selectedProject.title}</h2>
                <p className="text-white/80">{selectedProject.client}</p>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h3 className="font-syne text-xl font-bold mb-4" style={{ color: colors.navy }}>Description du projet</h3>
                  <div className="text-[#25364A] whitespace-pre-line mb-6 leading-relaxed text-sm">
                    {selectedProject.fullDescription}
                  </div>
                  <h3 className="font-syne text-xl font-bold mb-4" style={{ color: colors.navy }}>Technologies utilisées</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-tag" style={{ fontSize: '12px', padding: '6px 12px' }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-syne text-xl font-bold mb-4" style={{ color: colors.navy }}>Résultats clés</h3>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {selectedProject.stats.map((stat, idx) => (
                      <div key={idx} className="modal-stat">
                        <div className="text-2xl font-bold font-syne" style={{ color: colors.blue }}>{stat.value}</div>
                        <div className="text-xs text-[#25364A]">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="modal-info-card mb-6">
                    <h3 className="font-syne font-bold mb-4" style={{ color: colors.navy }}>Informations client</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-[#25364A]">
                        <Briefcase size={16} style={{ color: colors.blue }} />
                        <span>{selectedProject.client}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#25364A]">
                        <MapPin size={16} style={{ color: colors.blue }} />
                        <span>{selectedProject.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#25364A]">
                        <Calendar size={16} style={{ color: colors.blue }} />
                        <span>{selectedProject.year}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#25364A]">
                        <Clock size={16} style={{ color: colors.blue }} />
                        <span>Durée: {selectedProject.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="modal-testimonial-card">
                    <div className="flex items-center gap-2 mb-3">
                      <Quote size={18} style={{ color: colors.blue }} />
                      <h3 className="font-syne font-bold" style={{ color: colors.navy }}>Témoignage client</h3>
                    </div>
                    <p className="text-[#25364A] text-sm italic mb-4">"{selectedProject.testimonial.content}"</p>
                    <div className="flex items-center gap-3">
                      <img src={selectedProject.testimonial.avatar} alt={selectedProject.testimonial.author} className="w-10 h-10 rounded-full object-cover" style={{ border: `2px solid ${colors.blue}` }} />
                      <div>
                        <div className="font-semibold text-sm" style={{ color: colors.navy }}>{selectedProject.testimonial.author}</div>
                        <div className="text-xs text-[#25364A]">{selectedProject.testimonial.position}</div>
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
              <div className="flex flex-wrap gap-4 mt-8 pt-6" style={{ borderTop: '1px solid rgba(5,56,118,.08)' }}>
                <Link to="/contact" className="btn-primary">
                  Demander un projet similaire <ArrowRight size={18} />
                </Link>
                <button className="btn-soft">
                  Télécharger l'étude de cas <Download size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== GALERIE D'IMAGES ==================== */}
      <section className="omedev-white-section py-24">
        <div className="container">
          <SectionHeader badge="Notre galerie" title="Dernières réalisations en images" subtitle="Découvrez en un coup d'œil la qualité de nos interventions" />

          <div className="flex flex-col lg:flex-row gap-6 items-stretch">
            <div className="lg:w-1/2">
              <div className="grid grid-cols-2 gap-4 h-full">
                {thumbnails.map((img, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="gallery-thumb aspect-square"
                    onClick={() => window.open(img, '_blank')}
                  >
                    <img src={img} alt={`Galerie ${idx + 2}`} className="w-full h-full object-cover" />
                    <div className="gallery-overlay">
                      <Eye size={20} className="text-white" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="gallery-thumb h-full min-h-[300px] lg:min-h-full"
                onClick={() => window.open(mainImage, '_blank')}
              >
                <img src={mainImage} alt="Galerie principale" className="w-full h-full object-cover" />
                <div className="gallery-overlay">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <Eye size={22} />
                    <span>Voir en grand</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mt-10"
          >
            <button className="btn-soft">
              <Grid size={17} />
              Voir toute la galerie
            </button>
            <Link to="/contact" className="btn-primary">
              Demander un devis <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ==================== CTA FINALE ==================== */}
      <CTASection
        badge="Prêt à donner vie à votre projet ?"
        title="Construisons ensemble votre succès"
        highlight="votre succès"
        subtitle="Profitez d'un accompagnement sur-mesure et de solutions innovantes adaptées à votre secteur, du premier échange à la livraison."
        backgroundImage="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1920&q=80"
        primaryAction={{ label: 'Devenir partenaire', to: '/contact' }}
        secondaryAction={{ label: 'Voir nos projets', to: '/projets' }}
      />
    </div>
  );
};

export default RealisationsPage;