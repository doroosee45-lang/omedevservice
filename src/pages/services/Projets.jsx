import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
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

// ==================== DONNÉES CENTRALISÉES ====================
const projectsData = [
  {
    id: 1,
    title: "Plateforme E-commerce KinShop",
    client: "KinShop SARL",
    description: "Solution e-commerce complète avec paiement mobile, gestion de stock et livraison en temps réel.",
    longDescription: "KinShop souhaitait digitaliser son activité de vente en ligne. Nous avons développé une plateforme e-commerce sur mesure avec catalogue produits, panier d'achat, passerelle de paiement intégrant Mobile Money (M-Pesa, Orange Money), et un système de suivi des livraisons en temps réel. L'application est responsive et optimisée pour les connexions mobiles.",
    category: "web",
    technologies: ["React.js", "Node.js", "MongoDB", "Mobile Money API", "TailwindCSS"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    year: "2024",
    link: "https://kinshop.omedev.com",       // ← remplace par ton vrai lien
    github: "https://github.com/omedev/kinshop",
    features: ["Paiement mobile intégré", "Gestion de stock automatique", "Tableau de bord vendeur", "Suivi de livraison GPS"],
    testimonial: "L'équipe d'Omedev a su comprendre nos besoins et nous livrer une solution parfaitement adaptée."
  },
  {
    id: 2,
    title: "Infrastructure Réseau Hôtel Congo Palace",
    client: "Congo Palace Hôtel",
    description: "Déploiement d'un réseau WiFi haute densité couvrant 120 chambres + espaces communs.",
    longDescription: "L'Hôtel Congo Palace avait besoin d'une infrastructure réseau fiable pour ses 120 chambres, salles de conférence et espaces communs. Nous avons déployé une solution WiFi professionnelle avec points d'accès Ubiquiti, contrôleur centralisé, VLAN de segmentation par zone, et un système de captif portal personnalisé.",
    category: "infrastructure",
    technologies: ["Ubiquiti UniFi", "VLAN", "Captive Portal", "Firewall PFsense", "RADIUS"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    year: "2023",
    link: null,                               // ← pas de lien pour ce projet
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
    link: "https://play.google.com/store/apps/medcare", // ← remplace par ton vrai lien Play Store
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
    link: null,                               // ← pas de lien pour ce projet
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
    link: "https://numerique.gouv.cd",        // ← remplace par ton vrai lien
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
    link: null,                               // ← pas de lien pour ce projet
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
    link: null,                               // ← pas de lien pour ce projet
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
    link: null,                               // ← pas de lien pour ce projet
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
    link: "https://eduplus.omedev.com",       // ← remplace par ton vrai lien
    features: ["Cours vidéo", "Quizz interactifs", "Certificats automatiques", "Messagerie intégrée"],
    testimonial: "Une plateforme intuitive qui a dépassé nos attentes."
  }
];

// Configuration des catégories
const categories = [
  { id: 'all', label: 'Tous', icon: Globe, color: '#2563eb' },
  { id: 'web', label: 'Web', icon: Globe, color: '#2563eb' },
  { id: 'mobile', label: 'Mobile', icon: Smartphone, color: '#7c3aed' },
  { id: 'infrastructure', label: 'Infrastructure', icon: Zap, color: '#d97706' },
  { id: 'securite', label: 'Sécurité', icon: Shield, color: '#16a34a' },
  { id: 'energie', label: 'Énergie', icon: Sun, color: '#ea580c' },
  { id: 'digital', label: 'Digital', icon: TrendingUp, color: '#0891b2' }
];

// Statistiques
const stats = [
  { value: '150+', label: 'Projets réalisés' },
  { value: '120+', label: 'Clients satisfaits' },
  { value: '8+', label: "Années d'expérience" },
  { value: '98%', label: 'Taux de recommandation' }
];

// ==================== ANIMATIONS ====================
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

// ==================== STYLES GLOBAUX ====================
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'DM Sans', sans-serif; background: #F8FAFF; color: #111827; overflow-x: hidden; }
  .font-syne { font-family: 'Syne', sans-serif; }
  @keyframes slow-zoom { 0% { transform: scale(1); } 100% { transform: scale(1.1); } }
  @keyframes pulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
  .animate-slow-zoom { animation: slow-zoom 20s ease-out forwards; }
  .animate-pulse { animation: pulse 2s ease-in-out infinite; }
  .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
`;

// ==================== COMPOSANT PRINCIPAL ====================
const Projets = () => {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const getCategoryColor = (categoryId) =>
    categories.find(c => c.id === categoryId)?.color || '#2563eb';

  const getCategoryLabel = (categoryId) =>
    categories.find(c => c.id === categoryId)?.label || categoryId;

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

  // ── Carte projet ──
  const ProjectCard = ({ project }) => (
    <motion.div
      variants={fadeUp}
      className="group relative rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <button
          onClick={() => openModal(project)}
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
        <div className="flex items-center gap-1 text-xs font-semibold text-blue-600 mb-2">
          <User size={12} />
          {project.client}
        </div>
        <h3 className="font-syne font-bold text-lg text-gray-900 mb-2">{project.title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{project.description}</p>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-3 text-xs text-gray-400">
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
                className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-semibold rounded-lg hover:bg-blue-100 transition-all"
              >
                <ExternalLink size={12} /> Voir le projet
              </a>
            )}
            <button
              onClick={() => openModal(project)}
              className="text-blue-600 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
            >
              Détails <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // ── Modal projet ──
  const ProjectModal = () => (
    <AnimatePresence>
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: 'spring', damping: 25 }}
            className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-3xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Bouton fermer */}
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
            >
              <X size={20} />
            </button>

            <div className="grid md:grid-cols-2 h-full">
              {/* Image + carrousel */}
              <div className="relative bg-gray-900 h-80 md:h-full">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Infos */}
              <div className="p-6 overflow-y-auto max-h-[90vh]">
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-4"
                  style={{ background: getCategoryColor(selectedProject.category) }}
                >
                  {getCategoryLabel(selectedProject.category)}
                </span>

                <h2 className="text-2xl font-bold text-gray-900 font-syne mb-2">{selectedProject.title}</h2>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><User size={14} />{selectedProject.client}</span>
                  <span className="flex items-center gap-1"><Calendar size={14} />{selectedProject.year}</span>
                </div>

                <div className="mb-5">
                  <h3 className="text-sm font-bold text-gray-700 uppercase mb-2">Description</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{selectedProject.longDescription}</p>
                </div>

                {selectedProject.features && (
                  <div className="mb-5">
                    <h3 className="text-sm font-bold text-gray-700 uppercase mb-2">Fonctionnalités</h3>
                    <ul className="grid grid-cols-2 gap-2">
                      {selectedProject.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle size={12} className="text-green-500" />{f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedProject.technologies && (
                  <div className="mb-5">
                    <h3 className="text-sm font-bold text-gray-700 uppercase mb-2">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((t, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">{t}</span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProject.testimonial && (
                  <div className="mb-5 p-4 bg-blue-50 rounded-xl">
                    <p className="text-gray-600 text-sm italic">"{selectedProject.testimonial}"</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
                  {/* ✅ Bouton "Voir le site" — s'affiche uniquement si link est défini */}
                  {selectedProject.link && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
                    >
                      <ExternalLink size={14} /> Voir le site
                    </a>
                  )}

                  {/* ✅ Bouton "Code source" — Code2 à la place de Github */}
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 transition"
                    >
                      <Code2 size={14} /> Code source
                    </a>
                  )}

                  <Link
                    to="/contact"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition"
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

  return (
    <>
      <style>{globalStyles}</style>

      <HeroSection />

      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          {/* Filtres */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold font-syne transition-all ${
                    filter === cat.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-200'
                  }`}
                >
                  <Icon size={14} /> {cat.label}
                </button>
              );
            })}
          </div>

          {/* Grille projets */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500">Aucun projet dans cette catégorie.</p>
            </div>
          )}
        </div>
      </div>

      <StatsSection />
      <CTASection />
      <ProjectModal />
    </>
  );
};

// ==================== COMPOSANTS SÉPARÉS ====================

const HeroSection = () => (
  <section className="relative text-white overflow-hidden pt-28 pb-20 bg-gradient-to-br from-slate-900 via-blue-900 to-blue-700">
    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600')] bg-cover bg-center opacity-20 animate-slow-zoom" />
    <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-transparent" />
    <div className="container mx-auto px-4 relative z-10 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
        <span className="text-sm font-semibold">Nos réalisations</span>
      </div>
      <h1 className="text-5xl md:text-6xl font-extrabold font-syne mb-4">
        Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">réalisations</span>
      </h1>
      <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mx-auto mb-6" />
      <p className="text-gray-300 text-lg max-w-2xl mx-auto">
        Découvrez nos projets menés avec succès pour nos clients en RDC et à l'international.
      </p>
    </div>
  </section>
);

const StatsSection = () => (
  <div className="bg-white border-y border-gray-100">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="text-3xl md:text-4xl font-bold text-blue-600 font-syne">{stat.value}</div>
            <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const CTASection = () => (
  <section className="py-16 bg-gradient-to-r from-blue-700 to-blue-600">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold text-white font-syne mb-3">Vous avez un projet ?</h2>
      <p className="text-blue-100 mb-6">Confiez-nous votre projet et bénéficiez de notre expertise.</p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/contact" className="flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
          Discuter de mon projet <ArrowRight size={18} />
        </Link>
        <Link to="/about" className="flex items-center gap-2 border-2 border-white/30 hover:border-white px-6 py-3 rounded-xl font-semibold text-white transition">
          En savoir plus
        </Link>
      </div>
    </div>
  </section>
);

export default Projets;