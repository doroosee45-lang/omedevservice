import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle,
  Building2,
  ShoppingBag,
  Globe,
  Sun,
  GraduationCap,
  Shield,
  Wifi,
  Database,
  Smartphone,
  BarChart3,
  CreditCard,
  Cloud,
  Users,
  Headphones,
  Zap,
  TrendingUp,
  Award,
  Clock,
  X,
  Server,
  Lock,
  Code,
  Camera,
  Thermometer,
  HardDrive,
  Eye,
  Home,
  Factory,
  ShoppingCart,
  Truck,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Star,
  Package,
  Rocket,
  Sparkles,
  Video,
  Cpu,
  Battery,
  Leaf,
  Settings,
  Briefcase,
  DollarSign,
  Percent,
  ThumbsUp,
  FileText,
  Download,
  Send
} from 'lucide-react';

const SolutionDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    solution: '',
    message: ''
  });

  // Base de données complète des solutions détaillées
  const solutionsDatabase = {
    'pack-entreprise': {
      id: 'pack-entreprise',
      name: 'Pack Entreprise',
      tagline: 'La solution complète pour les entreprises établies',
      color: 'blue',
      bgGradient: 'from-blue-600 to-indigo-700',
      icon: Building2,
      heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=600&fit=crop',
      price: 'Sur devis personnalisé',
      priceRange: 'À partir de 8 500€',
      duration: '4 à 8 semaines',
      overview: 'Le Pack Entreprise est une solution complète conçue pour les PME et grandes entreprises souhaitant digitaliser l\'ensemble de leur infrastructure. Ce pack inclut l\'installation réseau complète, la sécurité, un ERP sur mesure et un support technique 24/7.',
      detailedDescription: `Notre Pack Entreprise transforme votre infrastructure informatique en un écosystème performant, sécurisé et évolutif. Nous prenons en charge l'ensemble de votre digitalisation : du réseau à la gestion d'entreprise.

**Ce que comprend le Pack Entreprise :**

**1. Installation réseau complète**
- Câblage structuré (RJ45/Fibre optique)
- Installation de switches professionnels managed
- Configuration de routeurs haute performance
- Déploiement WiFi entreprise (points d'accès WiFi 6)
- Configuration VLAN et segmentation réseau
- Tests de performance et certification

**2. Sécurité avancée**
- Installation de vidéosurveillance (CCTV/IP)
  - Caméras 4K avec vision nocturne
  - Enregistrement 24/7 avec stockage 30 jours
  - Accès mobile et web sécurisé
- Mise en place de firewall nouvelle génération
- Protection anti-intrusion (IPS/IDS)
- Audit de cybersécurité initial
- Formation cybersécurité pour les équipes

**3. ERP sur mesure**
- Analyse de vos processus métier
- Développement d'un ERP adapté
- Modules : ventes, achats, stocks, production, RH
- Tableaux de bord et KPI temps réel
- Reporting avancé et exports

**4. Support technique 24/7**
- Hotline dédiée
- Intervention sous 4h pour les urgences
- Maintenance préventive
- Monitoring 24/7

**5. CRM intégré**
- Gestion des clients et prospects
- Pipeline commercial
- Suivi des opportunités
- Historique des interactions`,
      features: [
        { icon: Wifi, title: 'Réseau & Infrastructure', description: 'Installation réseau complète, WiFi pro, VLAN' },
        { icon: Camera, title: 'Vidéosurveillance', description: 'Caméras IP 4K, vision nocturne, accès mobile' },
        { icon: Shield, title: 'Cybersécurité', description: 'Firewall NGFW, IPS/IDS, audit sécurité' },
        { icon: Database, title: 'ERP sur mesure', description: 'Solution adaptée à vos processus métier' },
        { icon: Users, title: 'CRM intégré', description: 'Gestion clients, prospects, pipeline' },
        { icon: Headphones, title: 'Support 24/7', description: 'Assistance technique permanente' },
        { icon: Cloud, title: 'Hébergement cloud', description: 'Infrastructure haute disponibilité' },
        { icon: TrendingUp, title: 'Analytics', description: 'Tableaux de bord et KPIs' }
      ],
      includedServices: [
        'Audit initial gratuit',
        'Installation et configuration complète',
        'Formation des équipes (2 jours)',
        'Documentation technique',
        'Garantie 2 ans sur l\'installation',
        'Maintenance préventive incluse'
      ],
      process: [
        { step: 1, title: 'Audit et diagnostic', description: 'Analyse de vos besoins et de votre infrastructure existante' },
        { step: 2, title: 'Conception', description: 'Proposition d\'architecture sur mesure' },
        { step: 3, title: 'Installation', description: 'Déploiement réseau, caméras, serveurs' },
        { step: 4, title: 'Configuration', description: 'Paramétrage ERP, firewall, CRM' },
        { step: 5, title: 'Formation', description: 'Prise en main des équipes' },
        { step: 6, title: 'Support', description: 'Suivi et maintenance continue' }
      ],
      benefits: [
        { title: 'Productivité accrue', description: '+40% d\'efficacité opérationnelle', icon: TrendingUp },
        { title: 'Sécurité renforcée', description: 'Protection complète contre les cyberattaques', icon: Shield },
        { title: 'ROI rapide', description: 'Retour sur investissement sous 12 mois', icon: DollarSign }
      ],
      technicalSpecs: [
        'Jusqu\'à 200 utilisateurs simultanés',
        'Bande passante jusqu\'à 10 Gbps',
        'Stockage jusqu\'à 50 To',
        'SLA 99.9% uptime',
        'Sauvegardes quotidiennes'
      ],
      caseStudies: [
        { company: 'Groupe Congo Telecom', result: 'Réduction de 45% des coûts IT' },
        { company: 'Banque Internationale', result: 'Sécurité renforcée, 0 incident en 18 mois' }
      ],
      recommendedFor: 'PME et grandes entreprises de +20 employés'
    },

    'pack-ecommerce': {
      id: 'pack-ecommerce',
      name: 'Pack E-commerce',
      tagline: 'Vendez en ligne avec une boutique performante',
      color: 'green',
      bgGradient: 'from-green-600 to-emerald-700',
      icon: ShoppingBag,
      heroImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop',
      price: 'À partir de 3 500€',
      priceRange: '3 500€ - 12 000€',
      duration: '3 à 6 semaines',
      overview: 'Le Pack E-commerce vous permet de lancer votre boutique en ligne avec toutes les fonctionnalités nécessaires : catalogue, panier, paiement sécurisé, gestion des stocks et SEO optimisé.',
      detailedDescription: `Notre Pack E-commerce est la solution idéale pour les commerçants et entrepreneurs souhaitant vendre en ligne. Nous développons une plateforme performante, sécurisée et facile à gérer.

**Ce que comprend le Pack E-commerce :**

**1. Site e-commerce complet**
- Design personnalisé responsive
- Catalogue produits illimité
- Fiches produits optimisées
- Moteur de recherche avancé

**2. Paiement intégré**
- Stripe, PayPal, Mobile Money
- Paiement en plusieurs fois
- Facturation automatique
- Sécurité PCI DSS

**3. Gestion des stocks**
- Synchronisation temps réel
- Alertes stock bas
- Gestion des fournisseurs
- Import/export Excel

**4. SEO optimisé**
- Structure URL optimisée
- Balises meta dynamiques
- Sitemap automatique
- Intégration Google Analytics

**5. Support client**
- Chat en ligne intégré
- Gestion des tickets
- Historique commandes
- Programme fidélité`,
      features: [
        { icon: ShoppingBag, title: 'Boutique en ligne', description: 'Catalogue produits, panier, checkout' },
        { icon: CreditCard, title: 'Paiement sécurisé', description: 'Stripe, PayPal, Mobile Money' },
        { icon: Database, title: 'Gestion des stocks', description: 'Suivi temps réel des inventaires' },
        { icon: TrendingUp, title: 'SEO optimisé', description: 'Référencement naturel performant' },
        { icon: BarChart3, title: 'Analytics', description: 'Statistiques de vente et comportement' },
        { icon: Smartphone, title: 'Mobile-first', description: 'Expérience optimale sur mobile' },
        { icon: Shield, title: 'Sécurité', description: 'Certificat SSL, protection des données' },
        { icon: Headphones, title: 'Support', description: 'Assistance technique 30 jours' }
      ],
      includedServices: [
        'Nom de domaine offert (1 an)',
        'Hébergement inclus (6 mois)',
        'Certificat SSL gratuit',
        'Formation à l\'administration',
        'Support 30 jours post-livraison'
      ],
      process: [
        { step: 1, title: 'Brief', description: 'Définition de votre identité et objectifs' },
        { step: 2, title: 'Maquettes', description: 'Design de l\'interface utilisateur' },
        { step: 3, title: 'Développement', description: 'Création de la plateforme e-commerce' },
        { step: 4, title: 'Intégration paiement', description: 'Configuration des moyens de paiement' },
        { step: 5, title: 'Tests', description: 'Validation des fonctionnalités' },
        { step: 6, title: 'Lancement', description: 'Mise en production' }
      ],
      benefits: [
        { title: 'Ventes 24/7', description: 'Boutique ouverte en permanence', icon: Clock },
        { title: 'Commission 0%', description: 'Sans commission sur vos ventes', icon: Percent },
        { title: 'Croissance', description: 'Évolutivité selon votre activité', icon: TrendingUp }
      ],
      technicalSpecs: [
        'Support jusqu\'à 100 000 produits',
        'Jusqu\'à 10 000 commandes/jour',
        'Temps de chargement < 2 secondes',
        'Paiements en 10+ devises'
      ],
      recommendedFor: 'Commerçants, artisans, PME commerciales'
    },

    'pack-digital': {
      id: 'pack-digital',
      name: 'Pack Digital Complet',
      tagline: 'La transformation digitale 360°',
      color: 'purple',
      bgGradient: 'from-purple-600 to-pink-700',
      icon: Globe,
      heroImage: 'https://images.unsplash.com/photo-1551434678-e076c2236a9a?w=1200&h=600&fit=crop',
      price: 'Sur devis personnalisé',
      priceRange: '12 000€ - 35 000€',
      duration: '8 à 16 semaines',
      overview: 'Le Pack Digital Complet offre une transformation digitale 360° : site web, application mobile, infrastructure cloud, analytics avancés et accompagnement stratégique.',
      detailedDescription: `Le Pack Digital Complet est notre offre premium pour les entreprises souhaitant une présence digitale complète et performante.

**Ce que comprend le Pack Digital Complet :**

**1. Site web + Application mobile**
- Site web institutionnel ou e-commerce
- Application mobile iOS et Android
- Synchronisation temps réel
- Notifications push

**2. Infrastructure cloud scalable**
- Hébergement AWS/Vercel haute disponibilité
- CDN mondial
- Sauvegardes automatiques
- Monitoring 24/7

**3. Analytics avancé & Data Lake**
- Collecte de données cross-canal
- Tableaux de bord personnalisés
- Machine learning prédictif
- Reporting automatique

**4. CRM + Marketing automation**
- Gestion complète des clients
- Campagnes email automatisées
- Segmentation avancée
- Scoring des leads

**5. Sécurité renforcée**
- WAF (Web Application Firewall)
- Protection DDoS
- Chiffrement des données
- Audit de sécurité régulier

**6. Accompagnement stratégique**
- Consultant dédié
- Stratégie digitale
- Formation des équipes
- Support prioritaire`,
      features: [
        { icon: Code, title: 'Site web + App mobile', description: 'Présence sur tous les canaux' },
        { icon: Cloud, title: 'Cloud scalable', description: 'Infrastructure hautement disponible' },
        { icon: BarChart3, title: 'Analytics avancé', description: 'Data Lake et ML prédictif' },
        { icon: Users, title: 'CRM + Marketing auto', description: 'Gestion client automatisée' },
        { icon: Shield, title: 'Sécurité renforcée', description: 'WAF, DDoS, chiffrement' },
        { icon: Rocket, title: 'Accompagnement', description: 'Consultant dédié' }
      ],
      includedServices: [
        'Nom de domaine personnalisé',
        'Hébergement cloud 12 mois',
        'Certificat SSL Wildcard',
        'Formation approfondie (3 jours)',
        'Support prioritaire 24/7',
        'Rapports mensuels personnalisés'
      ],
      process: [
        { step: 1, title: 'Stratégie', description: 'Définition de la feuille de route digitale' },
        { step: 2, title: 'UX/UI Design', description: 'Conception des interfaces' },
        { step: 3, title: 'Développement', description: 'Création web et mobile' },
        { step: 4, title: 'Intégration', description: 'CRM, Analytics, Cloud' },
        { step: 5, title: 'Tests', description: 'Validation fonctionnelle et sécurité' },
        { step: 6, title: 'Déploiement', description: 'Mise en production' }
      ],
      benefits: [
        { title: 'Vision 360°', description: 'Vue globale de votre activité digitale', icon: Globe },
        { title: 'Croissance accélérée', description: 'Outils pour scaler votre business', icon: Rocket },
        { title: 'Innovation', description: 'Technologies de pointe', icon: Sparkles }
      ],
      technicalSpecs: [
        'Architecture micro-services',
        'API RESTful documentées',
        'Support multi-devises',
        'Scalabilité horizontale'
      ],
      recommendedFor: 'Entreprises en forte croissance et ETI'
    },

    'pack-energie': {
      id: 'pack-energie',
      name: 'Pack Énergie Solaire',
      tagline: 'Économisez sur votre facture énergétique',
      color: 'orange',
      bgGradient: 'from-orange-600 to-yellow-700',
      icon: Sun,
      heroImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=600&fit=crop',
      price: 'À partir de 5 000€',
      priceRange: '5 000€ - 25 000€',
      duration: '2 à 4 semaines',
      overview: 'Le Pack Énergie Solaire inclut l\'étude, l\'installation et la maintenance de panneaux photovoltaïques, ainsi que l\'installation de climatisation pour un confort thermique optimal.',
      detailedDescription: `Le Pack Énergie Solaire est une solution clé en main pour votre transition énergétique. Nous prenons en charge l'ensemble de votre projet solaire et climatisation.

**Ce que comprend le Pack Énergie Solaire :**

**1. Audit énergétique personnalisé**
- Analyse de votre consommation
- Étude d'ensoleillement
- Dimensionnement optimal
- Calcul du ROI

**2. Installation de panneaux photovoltaïques**
- Panneaux haute efficacité (monocristallins)
- Onduleurs nouvelle génération
- Structure de fixation adaptée
- Raccordement au réseau

**3. Installation de climatisation (split system)**
- Étude des besoins thermiques
- Installation de climatiseurs réversibles
- Classe énergétique A+++
- Garantie 5 ans

**4. Suivi de production mobile**
- Application de monitoring
- Alertes en temps réel
- Statistiques de production
- Historique des économies

**5. Maintenance préventive**
- Nettoyage des panneaux
- Vérification des connexions
- Contrôle des onduleurs
- Entretien climatisation`,
      features: [
        { icon: Sun, title: 'Panneaux solaires', description: 'Installation clé en main' },
        { icon: Thermometer, title: 'Climatisation', description: 'Split system réversible' },
        { icon: Battery, title: 'Stockage optionnel', description: 'Batteries pour autoconsommation' },
        { icon: TrendingUp, title: 'Suivi production', description: 'Application mobile dédiée' },
        { icon: Shield, title: 'Garantie 10 ans', description: 'Sur les panneaux' },
        { icon: Settings, title: 'Maintenance', description: 'Entretien préventif' }
      ],
      includedServices: [
        'Audit énergétique gratuit',
        'Étude de faisabilité',
        'Demande d\'aides financières',
        'Installation professionnelle',
        'Mise en service',
        'Suivi de production 1 an'
      ],
      process: [
        { step: 1, title: 'Audit', description: 'Analyse de votre consommation et du site' },
        { step: 2, title: 'Dimensionnement', description: 'Calcul de la puissance nécessaire' },
        { step: 3, title: 'Installation panneaux', description: 'Pose des panneaux solaires' },
        { step: 4, title: 'Installation clim', description: 'Mise en place des climatiseurs' },
        { step: 5, title: 'Raccordement', description: 'Connexion au réseau électrique' },
        { step: 6, title: 'Formation', description: 'Prise en main du suivi mobile' }
      ],
      benefits: [
        { title: 'Économies durables', description: 'Réduction de 60% de votre facture', icon: DollarSign },
        { title: 'Confort thermique', description: 'Climatisation réversible été/hiver', icon: Thermometer },
        { title: 'Valorisation', description: '+15% de valeur immobilière', icon: TrendingUp }
      ],
      technicalSpecs: [
        'Puissance : 3 kWc à 36 kWc',
        'Production : 4 500 à 54 000 kWh/an',
        'Économie : 500€ à 6 000€/an',
        'Amortissement : 5 à 8 ans'
      ],
      recommendedFor: 'Entreprises, industries, collectivités, particuliers'
    },

    'pack-formation': {
      id: 'pack-formation',
      name: 'Pack Formation',
      tagline: 'Formez vos équipes aux nouvelles technologies',
      color: 'indigo',
      bgGradient: 'from-indigo-600 to-blue-700',
      icon: GraduationCap,
      heroImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop',
      price: 'À partir de 2 400€',
      priceRange: '2 400€ - 8 000€',
      duration: '3 à 15 jours',
      overview: 'Le Pack Formation propose des programmes certifiants en nouvelles technologies : réseau, sécurité, développement, bureautique, avec accompagnement personnalisé.',
      detailedDescription: `Le Pack Formation est conçu pour monter en compétences vos équipes sur les technologies clés. Formations certifiantes, coaching personnalisé et suivi post-formation.

**Formations disponibles :**

**1. Réseau & Infrastructure**
- Administration réseau (Cisco CCNA)
- Configuration VLAN et routage
- Déploiement WiFi professionnel
- Maintenance parc informatique

**2. Cybersécurité**
- Sensibilisation à la sécurité
- Tests d'intrusion (CEH)
- Mise en place de firewalls
- RGPD et conformité

**3. Développement**
- Création sites web (HTML/CSS/JS)
- Développement React/Node.js
- Applications mobiles
- E-commerce

**4. Bureautique & Digital**
- Excel avancé (TCD, macros)
- PowerPoint professionnel
- Outils collaboratifs (Teams, Slack)
- Marketing digital

**5. Maintenance informatique**
- Dépannage matériel/logiciel
- Installation et configuration
- Gestion des incidents`,
      features: [
        { icon: Award, title: 'Certification', description: 'Examens officiels inclus' },
        { icon: Users, title: 'Coaching', description: 'Accompagnement personnalisé' },
        { icon: Globe, title: 'E-learning', description: 'Plateforme accessible 24/7' },
        { icon: Smartphone, title: 'Ateliers pratiques', description: 'Mise en situation réelle' },
        { icon: TrendingUp, title: 'Suivi compétences', description: 'Évaluations régulières' },
        { icon: Headphones, title: 'Support', description: 'Aide post-formation' }
      ],
      includedServices: [
        'Supports de cours numériques',
        'Accès plateforme e-learning',
        'Examens de certification',
        'Attestation de formation',
        'Suivi personnalisé 3 mois'
      ],
      process: [
        { step: 1, title: 'Positionnement', description: 'Évaluation du niveau initial' },
        { step: 2, title: 'Programme', description: 'Définition du parcours' },
        { step: 3, title: 'Formation', description: 'Cours théoriques et pratiques' },
        { step: 4, title: 'Certification', description: 'Passage des examens' },
        { step: 5, title: 'Suivi', description: 'Accompagnement post-formation' }
      ],
      benefits: [
        { title: 'Certification reconnue', description: 'Valorisez les compétences', icon: Award },
        { title: 'Financement possible', description: 'CPF, OPCO, Pôle Emploi', icon: DollarSign },
        { title: 'Flexibilité', description: 'Formation intra ou inter', icon: Calendar }
      ],
      technicalSpecs: [
        'Groupes de 4 à 12 personnes',
        'Formateurs certifiés',
        'Lab technique dédié',
        'Support 6 mois'
      ],
      recommendedFor: 'Toute entreprise souhaitant former ses équipes IT'
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (solutionsDatabase[id]) {
        setSolution(solutionsDatabase[id]);
      } else {
        setSolution(null);
      }
      setLoading(false);
    }, 100);
  }, [id]);

  const handleQuoteRequest = () => {
    setFormData({ ...formData, solution: solution?.name });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`✅ Demande envoyée pour :\n${formData.solution}\n\n📧 Un email de confirmation a été envoyé à ${formData.email}\n📞 Notre équipe commerciale vous contactera sous 24h.`);
    setShowModal(false);
    setFormData({ name: '', email: '', phone: '', company: '', solution: '', message: '' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de la solution...</p>
        </div>
      </div>
    );
  }

  if (!solution) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <X size={48} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Solution non trouvée</h2>
          <p className="text-gray-600 mb-6">La solution que vous recherchez n'existe pas.</p>
          <Link to="/solutions" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Voir toutes les solutions <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = solution.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={solution.heroImage} alt={solution.name} className="w-full h-full object-cover" />
          <div className={`absolute inset-0 bg-gradient-to-r ${solution.bgGradient} opacity-85`}></div>
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-white/80 text-sm mb-4">
              <Link to="/solutions" className="hover:text-white transition">Solutions</Link>
              <span>/</span>
              <span className="text-white">{solution.name}</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <IconComponent size={18} className="text-white" />
              <span className="text-white text-sm">{solution.tagline}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{solution.name}</h1>
            <p className="text-xl text-white/90 mb-8">{solution.overview}</p>
            <div className="flex flex-wrap gap-4">
              <button onClick={handleQuoteRequest} className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center gap-2">
                Demander ce pack <ArrowRight size={18} />
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all flex items-center gap-2">
                Audit gratuit <CheckCircle size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="sticky top-0 bg-white shadow-md z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-1 py-3">
            {['overview', 'features', 'process', 'specs', 'benefits'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? `bg-${solution.color}-600 text-white`
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab === 'overview' && 'Aperçu'}
                {tab === 'features' && 'Services inclus'}
                {tab === 'process' && 'Processus'}
                {tab === 'specs' && 'Caractéristiques'}
                {tab === 'benefits' && 'Avantages'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Description détaillée</h2>
                <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-line">
                  {solution.detailedDescription}
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Informations clés</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between pb-2 border-b border-gray-100">
                    <span className="text-gray-500">Fourchette tarifaire</span>
                    <span className="font-semibold text-gray-900">{solution.priceRange}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-gray-100">
                    <span className="text-gray-500">Durée estimée</span>
                    <span className="font-semibold text-gray-900">{solution.duration}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-gray-100">
                    <span className="text-gray-500">Public cible</span>
                    <span className="font-semibold text-gray-900 text-sm">{solution.recommendedFor}</span>
                  </div>
                </div>
                <button onClick={handleQuoteRequest} className={`w-full bg-${solution.color}-600 text-white py-3 rounded-xl font-semibold hover:bg-${solution.color}-700 transition-all flex items-center justify-center gap-2 mb-3`}>
                  Demander un devis <ArrowRight size={18} />
                </button>
                <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-2">Inclus dans le pack</h4>
                  <ul className="space-y-1">
                    {solution.includedServices.slice(0, 4).map((service, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle size={14} className="text-green-500" />
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features Tab */}
        {activeTab === 'features' && (
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Services inclus dans le pack</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {solution.features.map((feature, idx) => {
                const FeatureIcon = feature.icon;
                return (
                  <div key={idx} className={`bg-${solution.color}-50 rounded-xl p-5`}>
                    <div className={`w-12 h-12 rounded-xl bg-${solution.color}-100 flex items-center justify-center mb-4`}>
                      <FeatureIcon size={24} className={`text-${solution.color}-600`} />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Process Tab */}
        {activeTab === 'process' && (
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Notre processus de déploiement</h2>
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block"></div>
              <div className="space-y-8">
                {solution.process.map((step) => (
                  <div key={step.step} className="relative flex flex-col md:flex-row gap-6">
                    <div className={`w-16 h-16 rounded-full bg-${solution.color}-100 text-${solution.color}-700 flex items-center justify-center text-xl font-bold flex-shrink-0 z-10`}>
                      {step.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Specs Tab */}
        {activeTab === 'specs' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Caractéristiques techniques</h2>
              <ul className="space-y-3">
                {solution.technicalSpecs.map((spec, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle size={20} className={`text-${solution.color}-500`} />
                    <span className="text-gray-700">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Services inclus</h2>
              <ul className="space-y-3">
                {solution.includedServices.map((service, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-green-500" />
                    <span className="text-gray-700">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Benefits Tab */}
        {activeTab === 'benefits' && (
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Avantages exclusifs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {solution.benefits.map((benefit, idx) => {
                const BenefitIcon = benefit.icon;
                return (
                  <div key={idx} className="text-center">
                    <div className={`w-20 h-20 rounded-full bg-${solution.color}-100 flex items-center justify-center mx-auto mb-4`}>
                      <BenefitIcon size={32} className={`text-${solution.color}-600`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* CTA Bottom */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Prêt à démarrer avec {solution.name} ?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Contactez-nous dès maintenant pour un devis personnalisé et un accompagnement dédié
          </p>
          <button onClick={handleQuoteRequest} className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all inline-flex items-center gap-2">
            Demander un devis <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-fade-in-up">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-5 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Demander {solution.name}</h3>
                <p className="text-sm text-gray-500">Remplissez ce formulaire</p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">Solution sélectionnée</label>
                <input type="text" value={formData.solution} readOnly className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-700 text-sm font-medium" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">Nom complet *</label>
                <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">Email *</label>
                <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">Téléphone *</label>
                <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">Entreprise</label>
                <input type="text" name="company" value={formData.company} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">Message</label>
                <textarea name="message" rows="3" value={formData.message} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none resize-none"></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                Envoyer la demande <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default SolutionDetailPage;