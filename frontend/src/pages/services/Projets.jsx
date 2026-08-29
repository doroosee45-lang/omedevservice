import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import PublicHero from '../../components/Public/PublicHero';
import {
  ExternalLink,
  Calendar,
  User,
  ArrowRight,
  X,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Globe,
  Smartphone,
  Shield,
  Zap,
  Sun,
  TrendingUp,
  Briefcase,
  Code2
} from 'lucide-react';

// ==================== DONNÉES ====================
const projectsData = [
  {
    id: 1,
    title: "Plateforme E-commerce KinShop",
    client: "KinShop SARL",
    description: "Solution e-commerce complète avec paiement mobile, gestion de stock et livraison en temps réel.",
    longDescription: "KinShop souhaitait digitaliser son activité de vente en ligne. Nous avons développé une plateforme e-commerce sur mesure avec catalogue produits, panier d'achat, passerelle de paiement intégrant Mobile Money (M-Pesa, Orange Money), et un système de suivi des livraisons en temps réel.",
    category: "web",
    technologies: ["React.js", "Node.js", "MongoDB", "Mobile Money API", "TailwindCSS"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    year: "2024",
    link: "https://kinshop.omedev.com",
    github: "https://github.com/omedev/kinshop",
    features: ["Paiement mobile intégré", "Gestion de stock automatique", "Tableau de bord vendeur", "Suivi de livraison GPS"],
    testimonial: "L'équipe d'Omedev a su comprendre nos besoins et nous livrer une solution parfaitement adaptée."
  },
  {
    id: 2,
    title: "Infrastructure Réseau Hôtel Congo Palace",
    client: "Congo Palace Hôtel",
    description: "Déploiement d'un réseau WiFi haute densité couvrant 120 chambres + espaces communs.",
    longDescription: "L'Hôtel Congo Palace avait besoin d'une infrastructure réseau fiable pour ses 120 chambres, salles de conférence et espaces communs. Nous avons déployé une solution WiFi professionnelle avec points d'accès Ubiquiti, contrôleur centralisé, VLAN de segmentation par zone.",
    category: "infrastructure",
    technologies: ["Ubiquiti UniFi", "VLAN", "Captive Portal", "Firewall PFsense", "RADIUS"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    year: "2023",
    link: null,
    features: ["Couverture 100%", "Portail captif personnalisé", "Sécurité renforcée", "Monitoring en temps réel"],
    testimonial: "Depuis l'installation, nos clients sont ravis de la connexion WiFi."
  },
  {
    id: 3,
    title: "Application Mobile Clinique MedCare",
    client: "MedCare RDC",
    description: "Application de prise de rendez-vous médicaux, téléconsultation et gestion des dossiers patients.",
    longDescription: "MedCare souhaitait digitaliser son parcours patient. Nous avons développé une application mobile permettant la prise de rendez-vous en ligne, la téléconsultation par visio, l'accès aux résultats d'analyses et la messagerie sécurisée.",
    category: "mobile",
    technologies: ["React Native", "Node.js", "PostgreSQL", "WebRTC", "JWT"],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    year: "2024",
    link: "https://play.google.com/store/apps/medcare",
    features: ["Prise de rendez-vous", "Téléconsultation vidéo", "Dossiers médicaux numériques", "Notifications push"],
    testimonial: "Nos patients adorent la simplicité d'utilisation."
  },
  {
    id: 4,
    title: "Installation Solaire - Usine TEXKIN",
    client: "TEXKIN Industries",
    description: "Installation de 150kWc de panneaux solaires avec stockage batterie pour une usine textile.",
    longDescription: "TEXKIN Industries cherchait à réduire sa dépendance au réseau électrique. Nous avons conçu et installé une centrale solaire de 150kWc avec batteries de stockage lithium-ion de 200kWh, permettant une autonomie de 8 heures.",
    category: "energie",
    technologies: ["Panneaux monocristallins 550W", "Onduleurs hybrides", "Batteries Lithium", "Supervision IoT"],
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
    year: "2023",
    link: null,
    features: ["Économie de 65% sur facture", "Autonomie 8h", "Monitoring à distance", "Garantie 10 ans"],
    testimonial: "Nos économies sont significatives depuis l'installation."
  },
  {
    id: 5,
    title: "Site Institutionnel - Ministère du Numérique",
    client: "Ministère du Numérique RDC",
    description: "Refonte complète du site institutionnel avec portail citoyen et actualités.",
    longDescription: "Le Ministère a confié à Omedev la refonte de son site web. Nous avons développé un site moderne, responsive et accessible, intégrant un portail citoyen pour les démarches administratives en ligne.",
    category: "web",
    technologies: ["WordPress", "PHP", "MySQL", "TailwindCSS", "A11Y"],
    image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800&q=80",
    year: "2024",
    link: "https://numerique.gouv.cd",
    features: ["Portail citoyen", "Gestion de contenu", "Espace presse", "Accessibilité RGAA"],
    testimonial: "Un travail professionnel et dans les délais."
  },
  {
    id: 6,
    title: "Vidéosurveillance AI - Supermarché Jambo",
    client: "Jambo Supermarché",
    description: "Installation de 32 caméras 4K avec détection intelligente et comptage de personnes.",
    longDescription: "Pour sécuriser son point de vente, Jambo Supermarché a fait appel à Omedev. Nous avons installé un système de vidéosurveillance avec 32 caméras 4K, un NVR 48 voies, et des analytics AI.",
    category: "securite",
    technologies: ["Caméras Hikvision 4K", "NVR 48 voies", "Deep Learning", "Application mobile"],
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&q=80",
    year: "2024",
    link: null,
    features: ["Détection intrusion", "Comptage de personnes", "Accès distant", "Alarmes personnalisables"],
    testimonial: "Notre sécurité s'est nettement améliorée."
  },
  {
    id: 7,
    title: "ERP Sur Mesure - Groupe BOSCO",
    client: "Groupe BOSCO",
    description: "Développement d'un ERP complet pour la gestion des stocks, ventes, RH et comptabilité.",
    longDescription: "Le Groupe BOSCO avait besoin d'un ERP unifié. Nous avons développé une solution sur mesure avec modules : gestion des stocks (multi-dépôts), ventes, achats, RH (paie, congés), comptabilité et reporting.",
    category: "digital",
    technologies: ["Laravel", "Vue.js", "MySQL", "Redis", "Docker"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    year: "2023-2024",
    link: null,
    features: ["Multi-dépôts", "Gestion RH complète", "Tableaux de bord", "Export fiscal"],
    testimonial: "Aujourd'hui, notre gestion est optimisée."
  },
  {
    id: 8,
    title: "CyberSécurité - Banque Internationale",
    client: "Banque Internationale",
    description: "Audit de sécurité, déploiement de firewall nouvelle génération et formation des équipes.",
    longDescription: "Cette banque de premier plan nous a mandatés pour un audit complet de son infrastructure. Nous avons réalisé des tests d'intrusion, déployé des firewalls Fortinet nouvelle génération, mis en place une solution SIEM, et formé les équipes.",
    category: "securite",
    technologies: ["Fortinet FortiGate", "SIEM", "Pentest", "ISO 27001"],
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80",
    year: "2024",
    link: null,
    features: ["Audit complet", "Firewall NGFW", "SIEM", "Formation cyber"],
    testimonial: "La banque nous a renouvelé sa confiance."
  },
  {
    id: 9,
    title: "Plateforme E-learning - EDU+",
    client: "EDU+",
    description: "Application web et mobile pour cours en ligne, certifications et suivi des apprenants.",
    longDescription: "EDU+ souhaitait lancer une plateforme de formation en ligne. Nous avons développé une solution complète avec gestion des cours (vidéos, quizzes, ressources), système de certification, suivi des progrès.",
    category: "digital",
    technologies: ["React.js", "Django", "PostgreSQL", "Docker", "Stripe"],
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80",
    year: "2024",
    link: "https://eduplus.omedev.com",
    features: ["Cours vidéo", "Quizz interactifs", "Certificats automatiques", "Messagerie intégrée"],
    testimonial: "Une plateforme intuitive qui a dépassé nos attentes."
  }
];

const categories = [
  { id: 'all', label: 'Tous', icon: Globe, color: '#0B74C1' },
  { id: 'web', label: 'Web', icon: Globe, color: '#0B74C1' },
  { id: 'mobile', label: 'Mobile', icon: Smartphone, color: '#1D5B9B' },
  { id: 'infrastructure', label: 'Infrastructure', icon: Zap, color: '#4681B7' },
  { id: 'securite', label: 'Sécurité', icon: Shield, color: '#053876' },
  { id: 'energie', label: 'Énergie', icon: Sun, color: '#55DDB5' },
  { id: 'digital', label: 'Digital', icon: TrendingUp, color: '#2AACB2' }
];

const stats = [
  { value: '15+', label: 'Projets réalisés' },
  { value: '120+', label: 'Clients satisfaits' },
  { value: '4+', label: "Années d'expérience" },
  { value: '98%', label: 'Taux de recommandation' }
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');
  .omedev-projets { font-family: 'DM Sans', sans-serif; background: #F6F6F7; color: #0B1213; overflow-x: hidden; }
  .omedev-projets .font-syne { font-family: 'Syne', sans-serif; }
  .omedev-projets .hero-grid {
    background-image: linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px);
    background-size: 56px 56px;
  }
  .omedev-projets .card-hover {
    transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease;
    background: #fff; border: 1px solid rgba(5,56,118,.09); border-radius: 18px;
    box-shadow: 0 10px 30px rgba(5,56,118,.06);
  }
  .omedev-projets .card-hover:hover {
    box-shadow: 0 22px 48px rgba(11,116,193,.14); border-color: rgba(42,172,178,.35);
  }
  @keyframes slow-zoom { 0% { transform: scale(1); } 100% { transform: scale(1.1); } }
  @keyframes pulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-16px); } }
  .omedev-projets .animate-slow-zoom { animation: slow-zoom 20s ease-out forwards; }
  .omedev-projets .animate-pulse { animation: pulse 2s ease-in-out infinite; }
  .omedev-projets .animate-float { animation: float 6s ease-in-out infinite; }
  .omedev-projets .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
`;

// Helpers (à l'extérieur des composants)
const getCategoryColor = (id) => categories.find(c => c.id === id)?.color || '#2563eb';
const getCategoryLabel = (id) => categories.find(c => c.id === id)?.label || id;

// ==================== CARTE PROJET — EN DEHORS DE Projets() ====================
const ProjectCard = ({ project, onOpen }) => (
  <motion.div
    variants={fadeUp}
    className="card-hover group relative overflow-hidden hover:-translate-y-2"
  >
    <div className="relative h-56 overflow-hidden">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <button
        onClick={() => onOpen(project)}
        className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/40"
      >
        <ZoomIn size={18} />
      </button>
      <span
        className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg"
        style={{ background: getCategoryColor(project.category) }}
      >
        {getCategoryLabel(project.category)}
      </span>
    </div>

    <div className="p-5">
      <div className="flex items-center gap-1 text-xs font-semibold text-[#0B74C1] mb-2">
        <User size={12} /> {project.client}
      </div>
      <h3 className="font-syne font-bold text-lg text-[#053876] mb-2">{project.title}</h3>
      <p className="text-[#25364A] text-sm leading-relaxed line-clamp-2">{project.description}</p>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#053876]/10">
        <div className="flex items-center gap-3 text-xs text-[#25364A]/60">
          <span className="flex items-center gap-1"><Calendar size={12} />{project.year}</span>
          {project.technologies && (
            <span className="flex items-center gap-1"><Briefcase size={12} />{project.technologies[0]}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 bg-[#0B74C1]/10 text-[#0B74C1] text-xs font-semibold rounded-lg hover:bg-[#0B74C1]/20 transition-all"
            >
              <ExternalLink size={12} /> Voir le projet
            </a>
          )}
          <button
            onClick={() => onOpen(project)}
            className="text-[#0B74C1] text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
          >
            Détails <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  </motion.div>
);

// ==================== MODAL — EN DEHORS DE Projets() ====================
const ProjectModal = ({ project, onClose, onNext, onPrev }) => (
  <AnimatePresence>
    {project && (
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ scale: 0.92, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden"
          style={{ maxHeight: '90vh' }}
          onClick={e => e.stopPropagation()}
        >
          {/* Bouton fermeture ✅ */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 bg-white rounded-full p-2 shadow-lg hover:bg-[#0B74C1]/10 hover:text-[#0B74C1] transition-all"
          >
            <X size={20} />
          </button>

          <div className="grid md:grid-cols-2" style={{ maxHeight: '90vh' }}>
            {/* Image */}
            <div className="relative bg-[#053876]" style={{ minHeight: 320 }}>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                style={{ maxHeight: '90vh' }}
              />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />
              <button
                onClick={onPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={onNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Infos */}
            <div className="overflow-y-auto p-6" style={{ maxHeight: '90vh' }}>
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-4"
                style={{ background: getCategoryColor(project.category) }}
              >
                {getCategoryLabel(project.category)}
              </span>

              <h2 className="text-2xl font-bold text-[#053876] font-syne mb-2">{project.title}</h2>

              <div className="flex flex-wrap items-center gap-4 text-sm text-[#25364A]/70 mb-5">
                <span className="flex items-center gap-1"><User size={14} />{project.client}</span>
                <span className="flex items-center gap-1"><Calendar size={14} />{project.year}</span>
              </div>

              <div className="mb-5">
                <h3 className="text-xs font-bold text-[#25364A]/70 uppercase tracking-wider mb-2">Description</h3>
                <p className="text-[#25364A] text-sm leading-relaxed">{project.longDescription}</p>
              </div>

              {project.features && (
                <div className="mb-5">
                  <h3 className="text-xs font-bold text-[#25364A]/70 uppercase tracking-wider mb-3">Fonctionnalités</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {project.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#25364A]">
                        <CheckCircle size={13} className="text-[#55DDB5] mt-0.5 flex-shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.technologies && (
                <div className="mb-5">
                  <h3 className="text-xs font-bold text-[#25364A]/70 uppercase tracking-wider mb-3">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((t, i) => (
                      <span key={i} className="px-2 py-1 bg-[#F6F6F7] text-[#25364A] text-xs rounded-md font-medium">{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {project.testimonial && (
                <div className="mb-5 p-4 bg-[#0B74C1]/5 border-l-4 border-[#2AACB2] rounded-r-xl">
                  <p className="text-[#25364A] text-sm italic">"{project.testimonial}"</p>
                </div>
              )}

              <div className="flex flex-wrap gap-3 pt-4 border-t border-[#053876]/10">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
                    style={{ background: 'linear-gradient(135deg, #0B74C1 0%, #2AACB2 55%, #55DDB5 100%)' }}
                  >
                    <ExternalLink size={14} /> Voir le site
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border border-[#053876]/20 text-[#053876] rounded-full text-sm font-semibold hover:border-[#2AACB2] hover:text-[#0B74C1] transition-all"
                  >
                    <Code2 size={14} /> Code source
                  </a>
                )}
                <Link
                  to="/contact"
                  onClick={onClose}
                  className="flex items-center gap-2 px-4 py-2 bg-[#053876] text-white rounded-full text-sm font-semibold hover:bg-[#1D5B9B] transition-all"
                >
                  Projet similaire
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// ==================== HERO ====================
const HeroSection = () => (
  <PublicHero
    badge="Nos réalisations"
    title="Nos réalisations"
    highlight="réalisations"
    subtitle="Découvrez nos projets menés avec succès pour nos clients en RDC et à l'international."
    compact
  />
);

// ==================== STATS ====================
const StatsSection = () => (
  <div className="bg-white border-y border-[#053876]/10">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
            <div className="text-3xl md:text-4xl font-bold text-[#0B74C1] font-syne">{stat.value}</div>
            <div className="text-[#25364A]/70 text-sm mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

// ==================== CTA ====================
const CTASection = () => (
  <section className="py-16 sm:py-20" style={{ background: 'linear-gradient(135deg, #053876 0%, #0B74C1 55%, #2AACB2 100%)' }}>
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold text-white font-syne mb-3">Vous avez un projet ?</h2>
      <p className="text-[#A6C3D7] mb-6">Confiez-nous votre projet et bénéficiez de notre expertise.</p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/contact" className="flex items-center gap-2 bg-white text-[#053876] px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:-translate-y-0.5 shadow-lg hover:shadow-2xl">
          Discuter de mon projet <ArrowRight size={18} />
        </Link>
        <Link to="/about" className="flex items-center gap-2 border border-white/30 hover:border-white/60 px-6 py-3 rounded-full font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10">
          En savoir plus
        </Link>
      </div>
    </div>
  </section>
);

// ==================== COMPOSANT PRINCIPAL ====================
const Projets = () => {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredProjects = filter === 'all'
    ? projectsData
    : projectsData.filter(p => p.category === filter);

  const openModal = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => setCurrentImageIndex(prev => (prev + 1) % 3);
  const prevImage = () => setCurrentImageIndex(prev => (prev - 1 + 3) % 3);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedProject) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  return (
    <div className="omedev-projets">
      <style>{globalStyles}</style>

      <HeroSection />

      <div className="bg-[#F6F6F7]">
        <div className="container mx-auto px-4 py-16">

          {/* Filtres */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold font-syne transition-all duration-300 ${
                    filter === cat.id
                      ? 'text-white shadow-lg'
                      : 'bg-white text-[#25364A] hover:bg-[#0B74C1]/5 border border-[#053876]/15'
                  }`}
                  style={filter === cat.id ? { background: 'linear-gradient(135deg, #0B74C1 0%, #2AACB2 55%, #55DDB5 100%)', boxShadow: '0 10px 24px rgba(11,116,193,0.25)' } : undefined}
                >
                  <Icon size={14} /> {cat.label}
                </button>
              );
            })}
          </div>

          {/* Grille */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={openModal}
              />
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#25364A]/70">Aucun projet dans cette catégorie.</p>
            </div>
          )}
        </div>
      </div>

      <StatsSection />
      <CTASection />

      {/* Modal reçoit les données via props — pas re-créé à chaque render */}
      <ProjectModal
        project={selectedProject}
        onClose={closeModal}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </div>
  );
};

export default Projets;