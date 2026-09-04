import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, Clock, DollarSign, Headphones, Sparkles,
  Rocket, ChevronRight, Phone, Layers, X, Building2, ShoppingCart,
  Smartphone, Sun, GraduationCap as Graduation, Camera, Snowflake, Wrench,
} from 'lucide-react';
import PublicHero from '../components/Public/PublicHero';
import CTASection from '../components/Public/CTASection';
import useDocumentMeta from '../hooks/useDocumentMeta';

/* ─────────────────────────────────────────────
   DESIGN SYSTEM — identique à la page About
   (navy/electric/turquoise/energy)
   ───────────────────────────────────────────── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  .omedev-solutions {
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

  .omedev-solutions .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .omedev-solutions .section-badge {
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

  .omedev-solutions .section-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -.03em;
    margin-bottom: 1rem;
    font-family: 'Syne', sans-serif;
    color: #053876;
  }

  .omedev-solutions .section-subtitle {
    font-size: 1rem;
    color: #25364A;
    max-width: 56ch;
    margin: 0 auto;
    line-height: 1.7;
  }

  .omedev-solutions .divider {
    width: 64px;
    height: 4px;
    background: linear-gradient(90deg, #0B74C1, #2AACB2, #55DDB5);
    border-radius: 99px;
    margin: 1rem auto 1.5rem;
  }

  .omedev-solutions .btn-primary {
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

  .omedev-solutions .btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 36px rgba(42,172,178,.28);
  }

  .omedev-solutions .btn-outline {
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

  .omedev-solutions .btn-outline:hover {
    border-color: #2AACB2;
    color: #0B74C1;
    background: rgba(85,221,181,.08);
    transform: translateY(-3px);
  }

  .omedev-solutions .card-hover {
    transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease;
    background: #fff;
    border: 1px solid rgba(5,56,118,.09);
    border-radius: 18px;
    box-shadow: 0 10px 30px rgba(5,56,118,.06);
  }

  .omedev-solutions .card-hover:hover {
    transform: translateY(-7px);
    box-shadow: 0 22px 48px rgba(11,116,193,.14);
    border-color: rgba(42,172,178,.35);
  }

  .omedev-solutions .omedev-hero {
    background: linear-gradient(135deg, #053876 0%, #1D5B9B 35%, #4681B7 60%, #72A5CE 80%, #A6C3D7 100%);
    position: relative;
  }

  .omedev-solutions .omedev-light-section { background: #F6F6F7; }
  .omedev-solutions .omedev-white-section { background: #fff; }
  .omedev-solutions .omedev-dark-section {
    background: linear-gradient(135deg, #053876 0%, #1D5B9B 55%, #0B74C1 100%);
  }

  .omedev-solutions .hero-grid {
    background-image: linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px);
    background-size: 56px 56px;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-16px); }
  }
  .omedev-solutions .animate-float { animation: float 6s ease-in-out infinite; }

  /* ── Pack card ── */
  .omedev-solutions .pack-card {
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
  .omedev-solutions .pack-card:hover {
    transform: translateY(-9px);
    border-color: rgba(42,172,178,.35);
    box-shadow: 0 22px 48px rgba(11,116,193,.16);
  }
  .omedev-solutions .pack-photo-wrap {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    flex-shrink: 0;
    background: #D5DCE1;
  }
  .omedev-solutions .pack-photo-wrap img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform .8s cubic-bezier(.4,0,.2,1);
  }
  .omedev-solutions .pack-card:hover .pack-photo-wrap img { transform: scale(1.07); }
  .omedev-solutions .pack-photo-wrap::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(5,56,118,0) 40%, rgba(5,56,118,.55) 100%);
  }
  .omedev-solutions .pack-badge {
    position: absolute;
    top: 14px;
    right: 14px;
    z-index: 3;
    padding: 5px 12px;
    border-radius: 50px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: .06em;
    text-transform: uppercase;
    color: #053876;
    background: linear-gradient(135deg, #55DDB5, #A6C3D7);
    box-shadow: 0 4px 16px rgba(5,56,118,.25);
  }
  .omedev-solutions .pack-icon-badge {
    position: absolute;
    bottom: -26px;
    left: 24px;
    z-index: 3;
    width: 56px;
    height: 56px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    box-shadow: 0 10px 24px rgba(5,56,118,.28);
  }
  .omedev-solutions .pack-price-wrap {
    position: absolute;
    bottom: 14px;
    right: 18px;
    z-index: 3;
    text-align: right;
  }
  .omedev-solutions .pack-price {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 1.15rem;
    color: #fff;
    line-height: 1.15;
  }
  .omedev-solutions .pack-price-range {
    font-size: 11px;
    color: rgba(255,255,255,.75);
  }
  .omedev-solutions .pack-bottom-bar {
    height: 3px;
    width: 100%;
  }
  .omedev-solutions .pack-info {
    padding: 40px 24px 26px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .omedev-solutions .pack-name {
    font-family: 'Syne', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: #053876;
    margin-bottom: 4px;
  }
  .omedev-solutions .pack-tagline {
    font-size: 12px;
    font-weight: 700;
    margin-bottom: 12px;
    letter-spacing: .02em;
  }
  .omedev-solutions .pack-desc {
    font-size: 13.5px;
    line-height: 1.65;
    color: #25364A;
    margin-bottom: 18px;
  }
  .omedev-solutions .pack-feature-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 18px;
  }
  .omedev-solutions .pack-feature-item {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-size: 12.5px;
    color: #25364A;
    line-height: 1.5;
  }
  .omedev-solutions .pack-more {
    font-size: 11.5px;
    color: #4681B7;
    font-weight: 600;
    margin-top: 2px;
  }
  .omedev-solutions .pack-bonus {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 12px 14px;
    border-radius: 14px;
    margin-bottom: 20px;
  }
  .omedev-solutions .pack-actions {
    display: flex;
    gap: 10px;
    margin-top: auto;
  }
  .omedev-solutions .pack-cta {
    flex: 1;
    text-align: center;
    color: #fff;
    font-weight: 700;
    font-size: 13.5px;
    padding: .8rem 1rem;
    border-radius: 12px;
    text-decoration: none;
    font-family: 'Syne', sans-serif;
    transition: all .3s ease;
    box-shadow: 0 8px 20px rgba(5,56,118,.16);
  }
  .omedev-solutions .pack-cta:hover { transform: translateY(-3px); }
  .omedev-solutions .pack-call {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 46px;
    border-radius: 12px;
    border: 1px solid rgba(5,56,118,.15);
    color: #053876;
    transition: all .3s ease;
  }
  .omedev-solutions .pack-call:hover {
    border-color: #2AACB2;
    background: rgba(42,172,178,.08);
    transform: translateY(-3px);
  }

  /* ── Comparison card ── */
  .omedev-solutions .compare-card {
    background: #fff;
    border: 1px solid rgba(5,56,118,.09);
    border-radius: 16px;
    overflow: hidden;
    transition: all .35s ease;
    display: flex;
    flex-direction: column;
  }
  .omedev-solutions .compare-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 18px 40px rgba(11,116,193,.14);
    border-color: rgba(42,172,178,.3);
  }
  .omedev-solutions .compare-head {
    padding: 16px;
    border-bottom: 1px solid rgba(5,56,118,.08);
  }
  .omedev-solutions .compare-icon {
    width: 38px;
    height: 38px;
    border-radius: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    flex-shrink: 0;
  }
  .omedev-solutions .compare-body {
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
  }
  .omedev-solutions .compare-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .omedev-solutions .compare-foot {
    padding: 14px 16px;
    border-top: 1px solid rgba(5,56,118,.08);
  }
  .omedev-solutions .compare-cta {
    display: block;
    text-align: center;
    color: #fff;
    font-weight: 700;
    font-size: 11.5px;
    padding: .6rem 1rem;
    border-radius: 10px;
    text-decoration: none;
    transition: opacity .3s ease;
  }
  .omedev-solutions .compare-cta:hover { opacity: .88; }

  .omedev-solutions .pack-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 2rem;
  }
  @media (min-width: 1024px) {
    .omedev-solutions .pack-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 768px) {
    .omedev-solutions .container { padding: 0 1rem; }
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

const CURRENCY = 'FC'; // Changez à '$' pour dollars

/* ── Packs (contenu inchangé, styles alignés sur la palette About) ── */
const packs = [
  {
    id: 'entreprise',
    name: 'Pack Entreprise',
    tagline: 'La solution complète pour les grandes entreprises',
    icon: Building2,
    accent: colors.blue,
    gradientBg: `linear-gradient(135deg, ${colors.blue}, ${colors.turquoise})`,
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
      "Téléphonie d'entreprise VoIP",
    ],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop',
    bonus: '✅ Audit de sécurité offert',
  },
  {
    id: 'ecommerce',
    name: 'Pack E-commerce',
    tagline: 'Vendez en ligne avec une boutique professionnelle',
    icon: ShoppingCart,
    accent: colors.blueLight,
    gradientBg: `linear-gradient(135deg, ${colors.blueLight}, ${colors.navy})`,
    price: CURRENCY === 'FC' ? 'À partir de 1 500 000 FC' : 'À partir de 750 $',
    priceRange: CURRENCY === 'FC' ? '1.5M - 5M FC' : '750 - 2 500 $',
    popular: false,
    description: 'Une boutique en ligne performante pour développer vos ventes sur internet.',
    features: [
      "Site e-commerce complet (jusqu'à 1000 produits)",
      'Design responsive et moderne',
      'Paiement sécurisé (Mobile Money, Carte, Orange Money)',
      'Gestion des stocks et commandes',
      'Dashboard administrateur',
      'SEO optimisé pour le référencement',
      'Intégration des réseaux sociaux',
      "Formation à l'administration du site",
    ],
    image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=800&h=500&fit=crop',
    bonus: '✅ 3 mois de maintenance offerts',
  },
  {
    id: 'digital',
    name: 'Pack Digital Complet',
    tagline: 'La transformation digitale totale de votre entreprise',
    icon: Smartphone,
    accent: colors.turquoise,
    gradientBg: `linear-gradient(135deg, ${colors.turquoise}, ${colors.energy})`,
    price: CURRENCY === 'FC' ? 'À partir de 8 000 000 FC' : 'À partir de 4 000 $',
    priceRange: CURRENCY === 'FC' ? '8M - 30M FC' : '4 000 - 15 000 $',
    popular: true,
    description: "Une solution tout-en-un pour digitaliser l'ensemble de vos processus.",
    features: [
      'Site web vitrine + Application mobile',
      'CRM et ERP intégrés',
      'Solution cloud complète',
      'Cybersécurité avancée',
      'Stratégie digitale et SEO',
      'Formation complète des équipes',
      'Support prioritaire 24/7',
      'Dashboard de pilotage en temps réel',
    ],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
    bonus: '✅ Audit digital offert + 6 mois de maintenance',
  },
  {
    id: 'energie',
    name: 'Pack Énergie Solaire',
    tagline: 'Économisez avec une énergie propre et durable',
    icon: Sun,
    accent: colors.turquoise,
    gradientBg: `linear-gradient(135deg, ${colors.energy}, ${colors.cyan})`,
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
      'Financement possible',
    ],
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=500&fit=crop',
    bonus: '✅ Énergie gratuite pendant 25 ans',
  },
  {
    id: 'formation',
    name: 'Pack Formation',
    tagline: 'Montez en compétences avec nos formations certifiantes',
    icon: Graduation,
    accent: colors.navy,
    gradientBg: `linear-gradient(135deg, ${colors.navy}, ${colors.blueDark})`,
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
      "Accès à la plateforme e-learning",
      'Suivi personnalisé',
    ],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop',
    bonus: '✅ 5 places offertes pour 10 inscrits',
  },
  {
    id: 'camera',
    name: 'Pack Caméra de Surveillance',
    tagline: 'Protection 360° pour votre entreprise',
    icon: Camera,
    accent: colors.blueDark,
    gradientBg: `linear-gradient(135deg, ${colors.blueDark}, ${colors.blueLight})`,
    price: CURRENCY === 'FC' ? 'À partir de 2 000 000 FC' : 'À partir de 1 000 $',
    priceRange: CURRENCY === 'FC' ? '2M - 8M FC' : '1 000 - 4 000 $',
    popular: false,
    description: 'Un système de surveillance complet pour sécuriser vos locaux 24h/24 et 7j/7.',
    features: [
      'Caméras IP 4K (4 à 16 caméras selon configuration)',
      'Enregistreur vidéo (NVR) haute capacité',
      "Vision nocturne jusqu'à 30 mètres",
      'Détection de mouvement et alertes en temps réel',
      'Accès à distance via application mobile',
      'Stockage cloud sécurisé (30 jours)',
      'Installation et câblage professionnel',
      'Support technique inclus',
    ],
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&h=500&fit=crop',
    bonus: '✅ 1 an de stockage cloud offert',
  },
  {
    id: 'climatisation',
    name: 'Pack Climatisation',
    tagline: "Confort thermique et économies d'énergie",
    icon: Snowflake,
    accent: colors.blue,
    gradientBg: `linear-gradient(135deg, ${colors.blue}, ${colors.blueLight})`,
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
      "Filtres antibactériens et purification d'air",
      'Consommation énergétique optimisée',
      'Support après-vente réactif',
    ],
    image: 'https://images.unsplash.com/photo-1757219525975-03b5984bc6e8?w=800&h=500&fit=crop',
    bonus: '✅ 2 ans de maintenance gratuite',
  },
  {
    id: 'salle-informatique',
    name: 'Pack Installation de salle informatique',
    tagline: 'Performance, fiabilité et sécurité pour votre infrastructure IT',
    icon: Wrench,
    accent: colors.blueLight,
    gradientBg: `linear-gradient(135deg, ${colors.cyan}, ${colors.turquoise})`,
    price: CURRENCY === 'FC' ? 'À partir de 4 500 000 FC' : 'À partir de 2 300 $',
    priceRange: CURRENCY === 'FC' ? '4.5M - 15M FC' : '2 300 - 7 500 $',
    popular: false,
    description: "Solutions complètes pour l'aménagement et l'équipement de salles informatiques professionnelles.",
    features: [
      "Câblage structuré cuivre / fibre optique (jusqu'à 24 points)",
      'Baies de brassage et armoires serveur 19 pouces',
      'Postes de travail complets (PC, écrans, claviers, souris)',
      'Switch réseau PoE + routeur professionnel',
      'Onduleurs avec régulation de tension',
      'Système de refroidissement adapté (climatisation / ventilation)',
      'Mise en conformité électrique (prises, disjoncteurs, parafoudre)',
      'Support technique pendant 1 an',
    ],
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&h=500&fit=crop',
    bonus: "✅ Audit gratuit de la salle avant installation",
  },
];

const comparisonFeatures = [
  'Infrastructure réseau', 'Sécurité avancée', 'Application mobile',
  'ERP intégré', 'Support 24/7', 'Formation incluse', 'Maintenance', 'Cloud',
  'Vidéosurveillance', 'Climatisation', 'Énergie solaire',
];

const PackCard = ({ pack, index }) => {
  const Icon = pack.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="pack-card"
    >
      <div className="pack-photo-wrap">
        <img src={pack.image} alt={pack.name} />
        {pack.popular && <div className="pack-badge">⭐ Populaire</div>}
        <div className="pack-icon-badge" style={{ background: pack.gradientBg }}>
          <Icon size={26} />
        </div>
      </div>

      <div className="pack-bottom-bar" style={{ background: pack.gradientBg }} />

      <div className="pack-info">
        <div className="pack-name">{pack.name}</div>
        <div className="pack-tagline" style={{ color: pack.accent }}>{pack.tagline}</div>
        <p className="pack-desc">{pack.description}</p>

        <div className="pack-feature-list">
          {pack.features.slice(0, 6).map((feature, i) => (
            <div key={i} className="pack-feature-item">
              <CheckCircle size={15} style={{ color: pack.accent, flexShrink: 0, marginTop: 1 }} />
              <span>{feature}</span>
            </div>
          ))}
          {pack.features.length > 6 && (
            <div className="pack-more">+{pack.features.length - 6} autres services</div>
          )}
        </div>

        <div className="pack-bonus" style={{ background: `${pack.accent}12`, border: `1px solid ${pack.accent}33` }}>
          <Sparkles size={16} style={{ color: pack.accent, flexShrink: 0, marginTop: 1 }} />
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, color: pack.accent, textTransform: 'uppercase', letterSpacing: '.04em' }}>
              Offre spéciale
            </span>
            <p style={{ color: colors.navy, fontSize: 13, marginTop: 2 }}>{pack.bonus}</p>
          </div>
        </div>

        <div className="pack-actions">
          <Link to="/demander-devis" className="pack-cta" style={{ background: pack.gradientBg }}>
            Demander un devis
          </Link>
          <Link to="/contact" className="pack-call">
            <Phone size={17} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const ComparisonCard = ({ pack, index }) => {
  const Icon = pack.icon;
  const hasFeature = (feature) => {
    return pack.features.some(
      (f) =>
        f.toLowerCase().includes(feature.toLowerCase()) ||
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
      className="compare-card"
    >
      <div className="compare-head">
        <div className="flex items-center gap-3">
          <div className="compare-icon" style={{ background: pack.gradientBg }}>
            <Icon size={17} />
          </div>
          <div>
            <h3 className="font-syne font-bold text-sm" style={{ color: colors.navy }}>{pack.name}</h3>
          </div>
        </div>
      </div>
      <div className="compare-body">
        {comparisonFeatures.map((feature, idx) => (
          <div key={idx} className="compare-row">
            <span className="text-xs" style={{ color: '#25364A' }}>{feature}</span>
            {hasFeature(feature) ? (
              <CheckCircle size={14} style={{ color: pack.accent }} />
            ) : (
              <X size={14} style={{ color: '#D5DCE1' }} />
            )}
          </div>
        ))}
      </div>
      <div className="compare-foot">
        <Link to="/demander-devis" className="compare-cta" style={{ background: pack.gradientBg }}>
          Demander un devis
        </Link>
      </div>
    </motion.div>
  );
};

const SolutionsPage = () => {
  useDocumentMeta({
    title: 'Solutions Clé en Main',
    description: "Des solutions IT et énergie prêtes à déployer pour les entreprises en RDC : installation rapide, tarifs transparents et support inclus 24/7.",
    path: '/solutions',
  });

  const pourquoi = [
    { icon: CheckCircle, title: 'Clé en main', desc: 'Solutions prêtes à déployer', color: colors.blue },
    { icon: Clock, title: 'Déploiement rapide', desc: 'Installation en quelques jours', color: colors.blueLight },
    { icon: DollarSign, title: 'Tarifs transparents', desc: `Sans frais cachés (en ${CURRENCY})`, color: colors.turquoise },
    { icon: Headphones, title: 'Support inclus', desc: 'Assistance 24/7', color: colors.navy },
  ];

  return (
    <div className="omedev-solutions">
      <style>{globalStyles}</style>

      {/* ==================== HERO ==================== */}
      <PublicHero
        badge="Solutions clé en main"
        title="Nos Solutions"
        highlight="Solutions"
        subtitle="Des packs complets et prêts à déployer pour accélérer la croissance de votre entreprise."
        primaryAction={{ label: 'Tous nos packs', to: '/contact' }}
        secondaryAction={{ label: 'Audit gratuit', to: '/audit' }}
      />

      {/* ==================== POURQUOI CHOISIR NOS PACKS ==================== */}
      <section className="omedev-white-section py-24">
        <div className="container">
          <SectionHeader badge="Nos avantages" title="Pourquoi choisir nos packs ?" subtitle="Des solutions pensées pour un déploiement simple, rapide et sans surprise" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pourquoi.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="card-hover p-6 text-center"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center" style={{ background: `${item.color}20`, color: item.color }}>
                    <Icon size={24} />
                  </div>
                  <h3 className="font-syne font-bold text-lg mb-2" style={{ color: colors.navy }}>{item.title}</h3>
                  <p className="text-[#25364A] text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== GRILLE DES PACKS ==================== */}
      <section className="omedev-light-section py-24">
        <div className="container">
          <SectionHeader badge="Nos offres" title="8 packs prêts à déployer" subtitle="Choisissez le pack adapté à votre besoin, ou demandez une formule sur mesure" />
          <div className="pack-grid">
            {packs.map((pack, idx) => (
              <PackCard key={pack.id} pack={pack} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== COMPARAISON ==================== */}
      <section className="omedev-white-section py-24">
        <div className="container">
          <SectionHeader badge="Comparaison" title="Comparez nos packs" subtitle="Trouvez la solution qui correspond le mieux à vos besoins avec notre tableau comparatif" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {packs.map((pack, idx) => (
              <ComparisonCard key={pack.id} pack={pack} index={idx} />
            ))}
          </div>

          <div className="flex justify-center gap-8 mt-10 text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle size={14} style={{ color: colors.turquoise }} />
              <span style={{ color: '#25364A' }}>Inclus</span>
            </div>
            <div className="flex items-center gap-2">
              <X size={14} style={{ color: '#D5DCE1' }} />
              <span style={{ color: '#25364A' }}>Non inclus</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CTA FINALE ==================== */}
      <CTASection
        badge="Besoin d'un pack personnalisé ?"
        title="Vous avez un besoin spécifique ?"
        highlight="besoin spécifique"
        subtitle="Notre équipe peut créer un pack sur mesure adapté exactement à vos besoins et à votre budget."
        backgroundImage="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1920&q=80"
        primaryAction={{ label: 'Demander un devis', to: '/demander-devis' }}
        secondaryAction={{ label: 'Voir tous les services', to: '/services' }}
      />
    </div>
  );
};

export default SolutionsPage;