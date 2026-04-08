// Realisations.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  ArrowRight, CheckCircle, Rocket, Star, Calendar, MapPin, Briefcase, Clock,
  Eye, X, Search, Quote, ThumbsUp, Award, Users,
  Network, Shield, Code, Cloud, Sun, Monitor, BookOpen,
  Wifi, GraduationCap, Filter, ChevronRight, Heart, Headphones,
  Grid, Camera
} from 'lucide-react';

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }
  
  body {
    font-family: 'DM Sans', sans-serif;
    background: #0f172a;
    color: #e2e8f0;
    overflow-x: hidden;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes pulse-ring {
    0% { transform: scale(0.8); opacity: 1; }
    70% { transform: scale(1.3); opacity: 0; }
    100% { transform: scale(0.8); opacity: 0; }
  }
  
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-pulse-ring { animation: pulse-ring 2s ease-out infinite; }
`;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

// Données des projets (conservées et corrigées)
const projects = [
  // IT & Réseau -> catégorie 'reseau'
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
      content: 'OMDEVE a réalisé un travail exceptionnel. Notre infrastructure réseau est désormais performante, sécurisée et fiable.',
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
  // Digital -> catégorie 'developpement'
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
  // Énergie -> catégorie 'energie'
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
  // Sécurité -> catégorie 'securite'
  {
    id: 7,
    title: 'Vidéosurveillance Aéroport Ndjili',
    category: 'securite',
    categoryName: 'Sécurité & Surveillance',
    image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=800&h=500&fit=crop',
    client: 'Régie des Voies Aériennes',
    location: 'Kinshasa, RDC',
    year: '2024',
    duration: '6 semaines',
    description: 'Installation d\'un système de vidéosurveillance IP avec 200 caméras 4K.',
    fullDescription: `Déploiement d'un système de vidéosurveillance complet pour l'aéroport international de Ndjili.`,
    technologies: ['Caméras Hikvision 4K', 'NVR 64 canaux', 'Stockage 30 jours', 'Accès mobile'],
    testimonial: {
      author: 'Général Kabila',
      position: 'Directeur Sécurité Aéroportuaire',
      content: 'La sécurité de l\'aéroport a été considérablement renforcée.',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg'
    },
    stats: [
      { label: 'Caméras', value: '200+' },
      { label: 'Couverture', value: '100%' },
      { label: 'Stockage', value: '30 jours' }
    ]
  },
  {
    id: 8,
    title: 'Cybersécurité Société Générale',
    category: 'securite',
    categoryName: 'Sécurité & Surveillance',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=500&fit=crop',
    client: 'Société Générale RDC',
    location: 'Kinshasa, RDC',
    year: '2024',
    duration: '4 semaines',
    description: 'Audit de cybersécurité et mise en place d\'un SOC interne.',
    fullDescription: `Audit complet et déploiement d'un Security Operations Center.`,
    technologies: ['Fortinet', 'CrowdStrike', 'Splunk', 'EDR', 'MFA'],
    testimonial: {
      author: 'Marc Lumbala',
      position: 'RSSI, Société Générale',
      content: 'Aucune faille critique détectée après l\'audit.',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/men/8.jpg'
    },
    stats: [
      { label: 'Vulnérabilités', value: '0 critique' },
      { label: 'Conformité', value: '100%' },
      { label: 'Temps réponse', value: '< 15min' }
    ]
  },
  // Formation -> catégorie 'formation'
  {
    id: 9,
    title: 'Certification IT 500 employés',
    category: 'formation',
    categoryName: 'Formation & Accompagnement',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop',
    client: 'Ministère du Numérique',
    location: 'Kinshasa, RDC',
    year: '2024',
    duration: '6 mois',
    description: 'Programme de certification pour 500 agents publics en bureautique et cybersécurité.',
    fullDescription: `Programme de formation massif pour certifier 500 agents du Ministère du Numérique.`,
    technologies: ['Microsoft Office', 'Cybersécurité', 'Administration réseau', 'E-learning'],
    testimonial: {
      author: 'Aline Kabamba',
      position: 'Secrétaire Générale',
      content: 'Le taux de certification a atteint 92%. Un projet d\'envergure parfaitement exécuté.',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/women/9.jpg'
    },
    stats: [
      { label: 'Apprenants', value: '500' },
      { label: 'Certifiés', value: '92%' },
      { label: 'Satisfaction', value: '4.8/5' }
    ]
  },
  {
    id: 10,
    title: 'Lab IoT Université Kinshasa',
    category: 'formation',
    categoryName: 'Formation & Accompagnement',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=500&fit=crop',
    client: 'Université de Kinshasa',
    location: 'Kinshasa, RDC',
    year: '2024',
    duration: '3 mois',
    description: 'Mise en place d\'un laboratoire IoT et formation des enseignants.',
    fullDescription: `Création d'un laboratoire IoT et formation des enseignants.`,
    technologies: ['Arduino', 'Raspberry Pi', 'Capteurs IoT', 'Python'],
    testimonial: {
      author: 'Prof. Mbungu',
      position: 'Doyen, Faculté des Sciences',
      content: 'Nos étudiants peuvent désormais se former aux technologies de pointe.',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/men/10.jpg'
    },
    stats: [
      { label: 'Étudiants formés', value: '200+' },
      { label: 'Projets réalisés', value: '35' },
      { label: 'Lab fonctionnel', value: '24/7' }
    ]
  }
];

// Catégories
const categories = [
  { id: 'all', name: 'Tous', icon: CheckCircle, gradient: 'from-gray-500 to-gray-600', bgLight: 'bg-gray-500/10', textLight: 'text-gray-400', borderLight: 'border-gray-500/30' },
  { id: 'reseau', name: 'Réseau & Télécom', icon: Network, gradient: 'from-blue-500 to-blue-600', bgLight: 'bg-blue-500/10', textLight: 'text-blue-400', borderLight: 'border-blue-500/30' },
  { id: 'securite', name: 'Sécurité & Surveillance', icon: Shield, gradient: 'from-cyan-500 to-cyan-600', bgLight: 'bg-cyan-500/10', textLight: 'text-cyan-400', borderLight: 'border-cyan-500/30' },
  { id: 'developpement', name: 'Développement Digital', icon: Code, gradient: 'from-amber-500 to-amber-600', bgLight: 'bg-amber-500/10', textLight: 'text-amber-400', borderLight: 'border-amber-500/30' },
  { id: 'cloud', name: 'Cloud & Hébergement', icon: Cloud, gradient: 'from-blue-500 to-blue-600', bgLight: 'bg-blue-500/10', textLight: 'text-blue-400', borderLight: 'border-blue-500/30' },
  { id: 'energie', name: 'Énergie', icon: Sun, gradient: 'from-orange-500 to-orange-600', bgLight: 'bg-orange-500/10', textLight: 'text-orange-400', borderLight: 'border-orange-500/30' },
  { id: 'formation', name: 'Formation & Accompagnement', icon: BookOpen, gradient: 'from-green-500 to-green-600', bgLight: 'bg-green-500/10', textLight: 'text-green-400', borderLight: 'border-green-500/30' }
];

const ProjectCard = ({ project, index, onOpenModal }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cat = categories.find(c => c.id === project.category) || categories[0];

  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpenModal(project)}
      className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500/50 hover:bg-white/10 cursor-pointer"
    >
      <div className="relative overflow-hidden h-56">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${cat.gradient} text-white shadow-lg`}>
            {project.categoryName}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="px-2 py-1 rounded-full bg-black/50 text-white text-xs flex items-center gap-1 backdrop-blur-sm">
            <Calendar size={12} /> {project.year}
          </span>
        </div>
        <div className={`absolute inset-0 bg-blue-600/30 flex items-center justify-center transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="bg-white text-blue-600 p-3 rounded-full hover:scale-110 transition-transform">
            <Eye size={24} />
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white font-syne mb-2 group-hover:text-blue-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.technologies.slice(0, 3).map((tech, i) => (
            <span key={i} className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-full">
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-full">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <MapPin size={12} />
            <span>{project.location}</span>
          </div>
          <div className="flex items-center gap-1 text-amber-400">
            <Star size={14} fill="currentColor" />
            <span className="text-xs font-semibold">{project.testimonial.rating}.0</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Composant Download (factice)
const Download = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" x2="12" y1="15" y2="3"/>
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
    { value: '120+', label: 'Projets réalisés', icon: Briefcase },
    { value: '95+', label: 'Clients satisfaits', icon: Users },
    { value: '8+', label: "Années d'expérience", icon: Award },
    { value: '98%', label: 'Taux de satisfaction', icon: ThumbsUp }
  ];

  // Images pour la galerie (utilisation des 5 premières images des projets)
  const galleryImages = projects.slice(0, 5).map(p => p.image);
  const mainImage = galleryImages[0];
  const thumbnails = galleryImages.slice(1, 5);

  return (
    <>
      <style>{globalStyles}</style>

      {/* Hero Section */}
     {/* ==================== HERO SECTION - RÉALISATIONS ==================== */}

<section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white overflow-hidden pt-28 pb-16">
  <div className="absolute inset-0 opacity-20" style={{
    backgroundImage: `linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)`,
    backgroundSize: '60px 60px'
  }} />
  
  {/* Image d'arrière-plan avec overlay */}
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
        <span className="text-blue-300 font-semibold text-xs tracking-wide font-syne">Contactez-nous</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight mb-5 font-syne"
      >
        Nos{' '}
        <span className="relative inline-block">
          <span className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 blur-2xl opacity-50" />
          <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400">
           Réalisations
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
        Découvrez des projets concrets qui ont transformé nos clients en <strong className="text-white">clients en leaders de leur secteur</strong>
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="flex flex-wrap gap-4 justify-center"
      >
        <Link to="/contact" className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all hover:scale-105 hover:shadow-xl">
          Nous écrire <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link to="/audit" className="group border-2 border-white/30 hover:border-white px-6 py-3 rounded-xl font-semibold text-white hover:bg-white/10 transition-all hover:scale-105">
          Audit gratuit <CheckCircle size={18} />
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





































































      {/* Statistiques clés */}
      <section className="py-12 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/5 border-b border-white/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          >
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div key={idx} variants={fadeUp} className="p-4 rounded-xl bg-white/5 border border-white/10 transition-all duration-300 hover:scale-105 hover:bg-white/10">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Icon size={24} className="text-blue-400" />
                  </div>
                  <div className="text-3xl font-bold text-blue-400 font-syne">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Filtres et recherche */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 sticky top-0 z-40 py-4 border-b border-white/10 backdrop-blur-xl bg-opacity-80">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveFilter(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                      activeFilter === cat.id
                        ? `bg-gradient-to-r ${cat.gradient} text-white shadow-lg`
                        : `${cat.bgLight} ${cat.textLight} border ${cat.borderLight} hover:scale-105 hover:brightness-110`
                    }`}
                  >
                    <Icon size={16} />
                    {cat.name}
                  </button>
                );
              })}
            </div>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un projet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-2 rounded-full text-sm bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Grille des projets */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4 py-12">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                <Search size={40} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Aucun projet trouvé</h3>
              <p className="text-gray-400">Aucun projet ne correspond à vos critères de recherche.</p>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, idx) => (
                <ProjectCard key={project.id} project={project} index={idx} onOpenModal={openModal} />
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Modal Détails Projet */}
      {showModal && selectedProject && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={closeModal}>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-64 md:h-80">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover rounded-t-2xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent rounded-t-2xl"></div>
              <button onClick={closeModal} className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm rounded-full p-2 hover:bg-white/20 transition">
                <X size={24} className="text-white" />
              </button>
              <div className="absolute bottom-6 left-6">
                <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${categories.find(c => c.id === selectedProject.category)?.gradient} text-white shadow-lg`}>
                  {selectedProject.categoryName}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white mt-2">{selectedProject.title}</h2>
                <p className="text-gray-300">{selectedProject.client}</p>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h3 className="text-xl font-bold text-white mb-4">Description du projet</h3>
                  <div className="text-gray-300 whitespace-pre-line mb-6 leading-relaxed">
                    {selectedProject.fullDescription}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Technologies utilisées</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.technologies.map((tech, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-white/10 text-gray-300 rounded-lg text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Résultats clés</h3>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {selectedProject.stats.map((stat, idx) => (
                      <div key={idx} className="text-center p-3 bg-white/5 rounded-xl border border-white/10">
                        <div className="text-2xl font-bold text-blue-400">{stat.value}</div>
                        <div className="text-xs text-gray-400">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="bg-white/5 rounded-xl p-5 mb-6 border border-white/10">
                    <h3 className="font-bold text-white mb-4">Informations client</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Briefcase size={16} className="text-blue-400" />
                        <span>{selectedProject.client}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <MapPin size={16} className="text-blue-400" />
                        <span>{selectedProject.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Calendar size={16} className="text-blue-400" />
                        <span>{selectedProject.year}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Clock size={16} className="text-blue-400" />
                        <span>Durée: {selectedProject.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-xl p-5 border border-blue-500/20">
                    <div className="flex items-center gap-2 mb-3">
                      <Quote size={18} className="text-blue-400" />
                      <h3 className="font-bold text-white">Témoignage client</h3>
                    </div>
                    <p className="text-gray-300 text-sm italic mb-4">"{selectedProject.testimonial.content}"</p>
                    <div className="flex items-center gap-3">
                      <img src={selectedProject.testimonial.avatar} alt={selectedProject.testimonial.author} className="w-10 h-10 rounded-full object-cover border border-blue-500" />
                      <div>
                        <div className="font-semibold text-white text-sm">{selectedProject.testimonial.author}</div>
                        <div className="text-xs text-gray-400">{selectedProject.testimonial.position}</div>
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
              <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-white/10">
                <Link to="/contact" className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all flex items-center gap-2">
                  Demander un projet similaire <ArrowRight size={18} />
                </Link>
                <button className="border border-white/20 text-gray-300 px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all flex items-center gap-2">
                  Télécharger l'étude de cas <Download size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========== NOUVELLE SECTION : GALERIE D'IMAGES (1 droite, 4 gauche) ========== */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-4">
              <Camera size={16} className="text-blue-400" />
              <span className="text-blue-300 text-sm font-semibold">Notre galerie</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-syne mb-3">
              Dernières réalisations en images
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Découvrez en un coup d’œil la qualité de nos interventions.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-6 items-stretch">
            {/* Gauche : grille 2x2 de 4 images */}
            <div className="lg:w-1/2">
              <div className="grid grid-cols-2 gap-4 h-full">
                {thumbnails.map((img, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative group overflow-hidden rounded-2xl aspect-square cursor-pointer"
                    onClick={() => window.open(img, '_blank')}
                  >
                    <img
                      src={img}
                      alt={`Galerie ${idx + 2}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
                      <Eye size={20} className="text-white" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Droite : grande image principale */}
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative group overflow-hidden rounded-2xl h-full min-h-[300px] lg:min-h-full cursor-pointer"
                onClick={() => window.open(mainImage, '_blank')}
              >
                <img
                  src={mainImage}
                  alt="Galerie principale"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-6">
                  <div className="flex items-center gap-2 text-white">
                    <Eye size={24} />
                    <span className="font-semibold">Voir en grand</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Boutons de la galerie */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mt-10"
          >
            <button className="group bg-white/10 border border-white/20 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all hover:scale-105">
              <Grid size={18} />
              Voir toute la galerie
            </button>
            <Link
              to="/contact"
              className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all hover:scale-105"
            >
              Demander un devis
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>




            {/* SECTION CTA DOUBLE : les deux blocs en parallèle */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        {/* Arrière-plan commun */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(59,130,246,0.3) 0%, transparent 50%)`
        }} />
        <div className="absolute w-96 h-96 bg-blue-600/20 bottom-0 left-1/2 -translate-x-1/2 rounded-full filter blur-[100px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
            
            {/* Bloc CTA gauche : Construisons ensemble votre succès */}
            <div className="flex-1 bg-gradient-to-br from-slate-900/50 via-blue-900/30 to-indigo-900/30 rounded-2xl border border-white/10 backdrop-blur-sm p-8 md:p-10 transition-all duration-300 hover:shadow-2xl hover:border-blue-500/30">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6 text-amber-300 text-sm font-semibold">
                  <Rocket size={16} /> Prêt à transformer vos idées ?
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 font-syne">
                  Construisons ensemble votre succès
                </h2>
                <p className="text-white/80 text-base md:text-lg mb-8 max-w-md mx-auto">
                  Profitez d’un accompagnement sur-mesure et de solutions innovantes adaptées à votre secteur.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-xl"
                  >
                    Devenir partenaire <ArrowRight size={18} />
                  </Link>
                  <Link
                    to="/audit"
                    className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 hover:bg-white/10"
                  >
                    Audit gratuit <CheckCircle size={18} />
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Bloc CTA droite : Vous avez un projet similaire ? */}
            <div className="flex-1 bg-gradient-to-br from-slate-900/50 via-indigo-900/30 to-blue-900/30 rounded-2xl border border-white/10 backdrop-blur-sm p-8 md:p-10 transition-all duration-300 hover:shadow-2xl hover:border-amber-500/30">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6 text-amber-300 text-sm font-semibold">
                  <Rocket size={16} /> Vous avez un projet similaire ?
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 font-syne">
                  Prêt à donner vie à votre projet ?
                </h2>
                <p className="text-white/80 text-base md:text-lg mb-8 max-w-md mx-auto">
                  Contactez-nous pour discuter de votre besoin et obtenir un devis personnalisé.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-xl"
                >
                  Contactez-nous <ArrowRight size={18} />
                </Link>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default RealisationsPage;