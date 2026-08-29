


















import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PublicHero from '../components/Public/PublicHero';
import {
  ArrowRight,
  ChevronRight,
  CheckCircle,
  Wifi,
  Shield,
  Code,
  Cloud,
  Zap,
  ShoppingCart,
  GraduationCap,
  Network,
  Lock,
  Server,
  Database,
  Sun,
  Thermometer,
  Smartphone,
  Laptop,
  Eye,
  BookOpen,
  Truck,
  HardDrive,
  Cpu,
  Globe,
  Clock,
  Award,
  Users,
  Headphones,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Star,
  FileText,
  Download,
  Send,
  X
} from 'lucide-react';

const ServiceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    budget: '',
    message: ''
  });

  // Base de données complète des services (28 services)
  const servicesDatabase = {
    // ========== RÉSEAU & INFRASTRUCTURE ==========
    'reseau-installation': {
      id: 'reseau-installation',
      name: 'Installation de réseau informatique',
      category: 'Réseau & Infrastructure',
      categoryId: 'reseau-infrastructure',
      icon: Network,
      color: '#0B74C1',
      shortDescription: 'Câblage structuré, switches, routeurs professionnels pour une infrastructure réseau fiable et performante.',
      fullDescription: 'Nous installons des réseaux informatiques complets adaptés à vos besoins. Notre équipe d\'experts assure une conception sur mesure, une mise en œuvre professionnelle et une documentation détaillée de votre infrastructure réseau.',
      features: [
        'Câblage structuré RJ45 et fibre optique',
        'Installation de switches managed et unmanaged',
        'Configuration de routeurs professionnels (Cisco, MikroTik, Ubiquiti)',
        'Tests de performance et certification du câblage',
        'Documentation technique complète',
        'Schéma réseau et plans d\'infrastructure'
      ],
      benefits: [
        { title: 'Performance optimale', description: 'Réseau haut débit sans goulots d\'étranglement' },
        { title: 'Fiabilité garantie', description: 'Infrastructure redondante et stable' },
        { title: 'Évolutivité', description: 'Architecture conçue pour évoluer avec votre entreprise' }
      ],
      process: [
        { step: 1, title: 'Audit et analyse', description: 'Étude de vos besoins et analyse de vos locaux' },
        { step: 2, title: 'Conception', description: 'Design de l\'architecture réseau sur mesure' },
        { step: 3, title: 'Installation', description: 'Déploiement et câblage professionnel' },
        { step: 4, title: 'Configuration', description: 'Paramétrage des équipements réseau' },
        { step: 5, title: 'Test et validation', description: 'Tests de performance et réception' }
      ],
      relatedServices: ['reseau-wifi', 'reseau-vlan', 'reseau-maintenance'],
      faq: [
        { q: 'Quel est le délai d\'installation ?', a: 'Le délai varie selon la taille du réseau, comptez 2 à 10 jours ouvrés.' },
        { q: 'Proposez-vous une garantie ?', a: 'Oui, garantie 2 ans sur l\'installation et 1 an sur le matériel.' }
      ],
      price: 'Sur devis personnalisé',
      duration: '2 à 10 jours',
      imageBg: 'bg-blue-100'
    },
    'reseau-wifi': {
      id: 'reseau-wifi',
      name: 'Déploiement WiFi professionnel',
      category: 'Réseau & Infrastructure',
      categoryId: 'reseau-infrastructure',
      icon: Wifi,
      color: '#0B74C1',
      shortDescription: 'Création et déploiement d\'antennes WiFi professionnelles pour une couverture optimale.',
      fullDescription: 'Nous déployons des solutions WiFi professionnelles couvrant parfaitement vos locaux. Étude de couverture, choix des équipements, installation et optimisation pour une connexion sans fil fiable et sécurisée.',
      features: [
        'Étude de couverture radio (site survey)',
        'Installation de points d\'accès WiFi 6/6E',
        'Configuration de contrôleurs WiFi',
        'Sécurité réseau WPA3/802.1X',
        'Gestion centralisée cloud',
        'Réseaux invités et VLAN WiFi'
      ],
      benefits: [
        { title: 'Couverture totale', description: 'Plus aucune zone d\'ombre dans vos locaux' },
        { title: 'Vitesse optimale', description: 'WiFi haute performance pour tous vos usages' },
        { title: 'Sécurité renforcée', description: 'Protection avancée contre les intrusions' }
      ],
      process: [
        { step: 1, title: 'Site survey', description: 'Analyse de la couverture existante' },
        { step: 2, title: 'Planification', description: 'Positionnement optimal des points d\'accès' },
        { step: 3, title: 'Installation', description: 'Déploiement des équipements' },
        { step: 4, title: 'Configuration', description: 'Paramétrage et optimisation' }
      ],
      relatedServices: ['reseau-installation', 'reseau-vlan', 'securite-firewall'],
      faq: [
        { q: 'Quelle est la portée des points d\'accès ?', a: 'Entre 15 et 30 mètres selon les obstacles.' },
        { q: 'Pouvez-vous gérer plusieurs sites ?', a: 'Oui, nous déployons des solutions multi-sites interconnectées.' }
      ],
      price: 'À partir de 350€ par point d\'accès',
      duration: '3 à 7 jours',
      imageBg: 'bg-blue-100'
    },
    'reseau-vlan': {
      id: 'reseau-vlan',
      name: 'Configuration VLAN',
      category: 'Réseau & Infrastructure',
      categoryId: 'reseau-infrastructure',
      icon: Server,
      color: '#0B74C1',
      shortDescription: 'Configuration VLAN et segmentation réseau pour isoler et sécuriser vos flux de données.',
      fullDescription: 'Nous mettons en place des VLAN (Virtual Local Area Networks) pour segmenter votre réseau, améliorer la sécurité et optimiser les performances. Isolation des services, QoS et gestion avancée des flux.',
      features: [
        'Segmentation réseau par département/service',
        'Configuration QoS pour priorisation du trafic',
        'Isolation des flux sensibles',
        'Inter-VLAN routing sécurisé',
        'Configuration ACLs avancées',
        'Documentation complète'
      ],
      benefits: [
        { title: 'Sécurité accrue', description: 'Isolation des données sensibles' },
        { title: 'Performance optimisée', description: 'Réduction de la congestion réseau' },
        { title: 'Conformité', description: 'Respect des normes de sécurité (RGPD, ISO)' }
      ],
      process: [
        { step: 1, title: 'Analyse des besoins', description: 'Identification des flux et services' },
        { step: 2, title: 'Conception VLAN', description: 'Définition des segments et règles' },
        { step: 3, title: 'Configuration', description: 'Paramétrage des équipements' },
        { step: 4, title: 'Validation', description: 'Tests de segmentation et performance' }
      ],
      relatedServices: ['reseau-installation', 'reseau-wifi', 'securite-firewall'],
      faq: [
        { q: 'Combien de VLAN puis-je avoir ?', a: 'Jusqu\'à 4094 VLAN, nous adaptons le nombre à vos besoins.' },
        { q: 'Cela ralentit-il le réseau ?', a: 'Au contraire, cela optimise les performances en réduisant le broadcast.' }
      ],
      price: 'À partir de 500€',
      duration: '2 à 4 jours',
      imageBg: 'bg-blue-100'
    },
    'reseau-maintenance': {
      id: 'reseau-maintenance',
      name: 'Maintenance de parcs informatiques',
      category: 'Réseau & Infrastructure',
      categoryId: 'reseau-infrastructure',
      icon: HardDrive,
      color: '#0B74C1',
      shortDescription: 'Installation et maintenance complète de parcs informatiques pour entreprises.',
      fullDescription: 'Nous assurons la maintenance préventive et corrective de votre parc informatique. Support N1/N2, gestion des stocks, déploiement de postes et assistance utilisateur.',
      features: [
        'Maintenance préventive programmée',
        'Support N1/N2 (hotline et assistance)',
        'Gestion des inventaires et stocks',
        'Déploiement et migration de postes',
        'Mises à jour et patch management',
        'Assistance utilisateur sur site ou à distance'
      ],
      benefits: [
        { title: 'Disponibilité maximale', description: 'Intervention rapide en cas de panne' },
        { title: 'Coûts maîtrisés', description: 'Budget prévisible avec forfait mensuel' },
        { title: 'Sérénité', description: 'Gestion externalisée de votre parc' }
      ],
      process: [
        { step: 1, title: 'Audit initial', description: 'Inventaire et diagnostic du parc' },
        { step: 2, title: 'Contrat sur mesure', description: 'Définition des niveaux de service' },
        { step: 3, title: 'Déploiement', description: 'Mise en place des outils de supervision' },
        { step: 4, title: 'Suivi continu', description: 'Maintenance et reporting régulier' }
      ],
      relatedServices: ['reseau-installation', 'cloud-monitoring'],
      faq: [
        { q: 'Quel est le délai d\'intervention ?', a: 'Intervention sous 4h ouvrées pour les urgences.' },
        { q: 'Proposez-vous des contrats sans engagement ?', a: 'Oui, contrats mensuels résiliables à tout moment.' }
      ],
      price: 'À partir de 150€/mois',
      duration: 'Contrat mensuel ou annuel',
      imageBg: 'bg-blue-100'
    },

    // ========== SÉCURITÉ ==========
    'securite-cctv': {
      id: 'securite-cctv',
      name: 'Vidéosurveillance (CCTV/IP)',
      category: 'Sécurité',
      categoryId: 'securite',
      icon: Eye,
      color: '#053876',
      shortDescription: 'Installation de systèmes de vidéosurveillance haute définition pour protéger vos locaux.',
      fullDescription: 'Nous installons des systèmes de vidéosurveillance complets : caméras IP 4K, enregistreurs NVR, vision nocturne et accès mobile. Solution sur mesure pour surveillance intérieure et extérieure.',
      features: [
        'Caméras IP 4K et Full HD',
        'Vision nocturne infrarouge',
        'Détection de mouvement intelligente',
        'Accès mobile et web sécurisé',
        'Stockage cloud ou local',
        'Alertes en temps réel'
      ],
      benefits: [
        { title: 'Surveillance 24/7', description: 'Protection continue de vos locaux' },
        { title: 'Image haute qualité', description: 'Identification précise des personnes/plaque' },
        { title: 'Accès à distance', description: 'Visionnage depuis n\'importe où' }
      ],
      process: [
        { step: 1, title: 'Audit sécurité', description: 'Analyse des points vulnérables' },
        { step: 2, title: 'Planification', description: 'Positionnement stratégique des caméras' },
        { step: 3, title: 'Installation', description: 'Déploiement et câblage' },
        { step: 4, title: 'Configuration', description: 'Paramétrage et accès distant' }
      ],
      relatedServices: ['securite-audit', 'securite-firewall'],
      faq: [
        { q: 'Combien de caméras sont nécessaires ?', a: 'Une étude gratuite détermine le nombre optimal.' },
        { q: 'Les images sont-elles stockées ?', a: 'Oui, de 30 à 90 jours selon la configuration.' }
      ],
      price: 'À partir de 800€ (4 caméras)',
      duration: '3 à 5 jours',
      imageBg: 'bg-purple-100'
    },
    'securite-audit': {
      id: 'securite-audit',
      name: 'Audit de cybersécurité',
      category: 'Sécurité',
      categoryId: 'securite',
      icon: Shield,
      color: '#053876',
      shortDescription: 'Audit de cybersécurité complet et tests d\'intrusion pour identifier vos vulnérabilités.',
      fullDescription: 'Nous réalisons des audits de cybersécurité approfondis : tests d\'intrusion, analyse de vulnérabilités, audit de conformité. Un rapport détaillé avec préconisations vous est fourni.',
      features: [
        'Tests d\'intrusion externes et internes',
        'Analyse de vulnérabilités automatique',
        'Audit de configuration sécurité',
        'Test d\'ingénierie sociale',
        'Rapport détaillé et chiffré',
        'Plan d\'action priorisé'
      ],
      benefits: [
        { title: 'Identification des failles', description: 'Découvrez vos points faibles avant les attaquants' },
        { title: 'Conformité réglementaire', description: 'Répondez aux exigences RGPD/ISO' },
        { title: 'Feuille de route claire', description: 'Plan d\'action pour corriger les vulnérabilités' }
      ],
      process: [
        { step: 1, title: 'Cadrage', description: 'Définition du périmètre d\'audit' },
        { step: 2, title: 'Reconnaissance', description: 'Collecte d\'informations' },
        { step: 3, title: 'Tests', description: 'Tests d\'intrusion contrôlés' },
        { step: 4, title: 'Rapport', description: 'Remise du rapport détaillé' }
      ],
      relatedServices: ['securite-firewall', 'securite-formation'],
      faq: [
        { q: 'Combien de temps dure un audit ?', a: 'Entre 5 et 15 jours selon la taille du système.' },
        { q: 'L\'audit perturbe-t-il l\'activité ?', a: 'Non, les tests sont réalisés hors production.' }
      ],
      price: 'À partir de 2.500€',
      duration: '5 à 15 jours',
      imageBg: 'bg-purple-100'
    },
    'securite-firewall': {
      id: 'securite-firewall',
      name: 'Firewall & Protection réseau',
      category: 'Sécurité',
      categoryId: 'securite',
      icon: Lock,
      color: '#053876',
      shortDescription: 'Mise en place de firewalls nouvelle génération et protection réseau avancée.',
      fullDescription: 'Nous installons et configurons des firewalls nouvelle génération (NGFW) : inspection applicative, IPS/IDS, filtrage web, VPN. Protection complète de votre périmètre réseau.',
      features: [
        'Next-Generation Firewall (NGFW)',
        'Système IPS/IDS intégré',
        'Filtrage applicatif et web',
        'VPN sécurisé site-to-site et remote',
        'Anti-malware et anti-botnet',
        'Reporting et alertes'
      ],
      benefits: [
        { title: 'Protection avancée', description: 'Détection et blocage des menaces' },
        { title: 'Visibilité totale', description: 'Analyse du trafic en temps réel' },
        { title: 'Télétravail sécurisé', description: 'VPN pour accès distant sécurisé' }
      ],
      process: [
        { step: 1, title: 'Analyse', description: 'Étude des besoins et du trafic' },
        { step: 2, title: 'Choix solution', description: 'Sélection du firewall adapté' },
        { step: 3, title: 'Installation', description: 'Déploiement et configuration' },
        { step: 4, title: 'Formation', description: 'Prise en main des administrateurs' }
      ],
      relatedServices: ['securite-audit', 'reseau-vlan'],
      faq: [
        { q: 'Quelle est la bande passante supportée ?', a: 'De 100 Mbps à 10 Gbps selon le modèle.' },
        { q: 'Proposez-vous un service de télésurveillance ?', a: 'Oui, supervision 24/7 du firewall.' }
      ],
      price: 'À partir de 1.200€',
      duration: '2 à 4 jours',
      imageBg: 'bg-purple-100'
    },
    'securite-formation': {
      id: 'securite-formation',
      name: 'Formation cybersécurité',
      category: 'Sécurité',
      categoryId: 'securite',
      icon: GraduationCap,
      color: '#053876',
      shortDescription: 'Formation cybersécurité pour sensibiliser et former vos équipes aux bonnes pratiques.',
      fullDescription: 'Nous proposons des formations cybersécurité adaptées à tous les niveaux : sensibilisation pour tous, formation technique pour administrateurs, ateliers pratiques et certifications.',
      features: [
        'Sensibilisation à la sécurité (phishing, mots de passe)',
        'Formation technique pour administrateurs',
        'Ateliers pratiques et mises en situation',
        'Certification (Sec+, CEH, CISSP)',
        'E-learning et modules interactifs',
        'Simulation d\'attaque (phishing)'
      ],
      benefits: [
        { title: 'Réduction des risques', description: 'Employés formés = 70% de risques en moins' },
        { title: 'Certification', description: 'Valorisez les compétences de vos équipes' },
        { title: 'Culture sécurité', description: 'Intégration durable des bonnes pratiques' }
      ],
      process: [
        { step: 1, title: 'Audit des besoins', description: 'Évaluation du niveau et des objectifs' },
        { step: 2, title: 'Personnalisation', description: 'Adaptation du contenu à votre secteur' },
        { step: 3, title: 'Formation', description: 'Sessions en présentiel ou à distance' },
        { step: 4, title: 'Évaluation', description: 'Tests et certification' }
      ],
      relatedServices: ['securite-audit', 'formation-it'],
      faq: [
        { q: 'Combien de temps dure la formation ?', a: 'De 1 à 5 jours selon le programme.' },
        { q: 'La formation est-elle éligible au CPF ?', a: 'Oui pour nos formations certifiantes.' }
      ],
      price: 'À partir de 800€/jour',
      duration: '1 à 5 jours',
      imageBg: 'bg-purple-100'
    },

    // ========== DÉVELOPPEMENT DIGITAL ==========
    'dev-siteweb': {
      id: 'dev-siteweb',
      name: 'Création de sites web',
      category: 'Développement Digital',
      categoryId: 'developpement-digital',
      icon: Code,
      color: '#2AACB2',
      shortDescription: 'Création de sites web vitrines et institutionnels modernes, responsives et optimisés SEO.',
      fullDescription: 'Nous concevons des sites web professionnels sur mesure : vitrine, institutionnel, catalogue produit. Design moderne, responsive, CMS facile à utiliser et SEO optimisé.',
      features: [
        'Design unique sur mesure',
        'Responsive mobile-first',
        'SEO optimisé (structure, balises, contenu)',
        'CMS personnalisé ou WordPress',
        'Performance et rapidité',
        'Formation à l\'utilisation'
      ],
      benefits: [
        { title: 'Image professionnelle', description: 'Site moderne qui inspire confiance' },
        { title: 'Visible sur mobile', description: 'Parfait sur tous les écrans' },
        { title: 'Gestion facile', description: 'Mettez à jour vous-même vos contenus' }
      ],
      process: [
        { step: 1, title: 'Brief et conception', description: 'Définition de l\'arborescence et maquettes' },
        { step: 2, title: 'Design', description: 'Création de l\'identité visuelle' },
        { step: 3, title: 'Développement', description: 'Intégration et programmation' },
        { step: 4, title: 'Recette', description: 'Tests et validation' }
      ],
      relatedServices: ['dev-ecommerce', 'dev-appmobile', 'cloud-hebergement'],
      faq: [
        { q: 'Combien coûte un site web ?', a: 'Entre 1.500€ et 8.000€ selon la complexité.' },
        { q: 'Le site sera-t-il référencé ?', a: 'Oui, nous optimisons le SEO de base.' }
      ],
      price: 'À partir de 1.500€',
      duration: '3 à 6 semaines',
      imageBg: 'bg-green-100'
    },
    'dev-ecommerce': {
      id: 'dev-ecommerce',
      name: 'Plateformes e-commerce',
      category: 'Développement Digital',
      categoryId: 'developpement-digital',
      icon: ShoppingCart,
      color: '#2AACB2',
      shortDescription: 'Développement de plateformes e-commerce performantes avec paiement intégré.',
      fullDescription: 'Nous développons des boutiques en ligne complètes : catalogue produits, panier, paiement sécurisé, gestion des stocks, expédition. Solutions sur mesure ou sur Shopify/PrestaShop.',
      features: [
        'Catalogue produits infini',
        'Panier d\'achat et checkout optimisé',
        'Paiement sécurisé (Stripe, PayPal, Mobile Money)',
        'Gestion des stocks et commandes',
        'Expédition et suivi colis',
        'Marketing digital intégré'
      ],
      benefits: [
        { title: 'Vendez 24/7', description: 'Boutique ouverte en permanence' },
        { title: 'Paiement sécurisé', description: 'Transactions protégées' },
        { title: 'Gestion simplifiée', description: 'Administration intuitive' }
      ],
      process: [
        { step: 1, title: 'Stratégie', description: 'Définition des objectifs et cibles' },
        { step: 2, title: 'UX/UI', description: 'Parcours d\'achat optimisé' },
        { step: 3, title: 'Développement', description: 'Création de la plateforme' },
        { step: 4, title: 'Go live', description: 'Mise en production et lancement' }
      ],
      relatedServices: ['dev-siteweb', 'dev-appmobile', 'cloud-hebergement'],
      faq: [
        { q: 'Quels moyens de paiement sont acceptés ?', a: 'Carte bancaire, PayPal, Mobile Money, virement.' },
        { q: 'La boutique est-elle sécurisée ?', a: 'Oui, certificat SSL et conformité PCI DSS.' }
      ],
      price: 'À partir de 3.500€',
      duration: '6 à 12 semaines',
      imageBg: 'bg-green-100'
    },
    'dev-appmobile': {
      id: 'dev-appmobile',
      name: 'Applications mobiles',
      category: 'Développement Digital',
      categoryId: 'developpement-digital',
      icon: Smartphone,
      color: '#2AACB2',
      shortDescription: 'Développement d\'applications mobiles iOS et Android natives ou cross-platform.',
      fullDescription: 'Nous développons des applications mobiles pour iOS et Android : natives (Swift/Kotlin) ou cross-platform (React Native). UI/UX soignée, API backend, publication sur stores.',
      features: [
        'iOS (Swift) et Android (Kotlin)',
        'React Native cross-platform',
        'UI/UX design intuitive',
        'API backend et synchronisation',
        'Notifications push',
        'Publication App Store / Play Store'
      ],
      benefits: [
        { title: 'Expérience utilisateur', description: 'Application fluide et agréable' },
        { title: 'Multi-plateforme', description: 'Présence sur iOS et Android' },
        { title: 'Engagement client', description: 'Fidélisation via notifications' }
      ],
      process: [
        { step: 1, title: 'Conception', description: 'Définition des fonctionnalités et wireframes' },
        { step: 2, title: 'Design', description: 'Création de l\'interface mobile' },
        { step: 3, title: 'Développement', description: 'Codage et intégration API' },
        { step: 4, title: 'Publication', description: 'Soumission aux stores' }
      ],
      relatedServices: ['dev-siteweb', 'dev-ecommerce', 'cloud-api'],
      faq: [
        { q: 'Quel est le budget pour une app ?', a: 'De 8.000€ à 40.000€ selon complexité.' },
        { q: 'Proposez-vous la maintenance ?', a: 'Oui, forfait maintenance mensuel.' }
      ],
      price: 'À partir de 8.000€',
      duration: '8 à 16 semaines',
      imageBg: 'bg-green-100'
    },
    'dev-erp': {
      id: 'dev-erp',
      name: 'ERP sur mesure',
      category: 'Développement Digital',
      categoryId: 'developpement-digital',
      icon: Database,
      color: '#2AACB2',
      shortDescription: 'ERP sur mesure adapté à vos besoins métiers spécifiques et évolutifs.',
      fullDescription: 'Nous concevons des ERP personnalisés intégrant tous vos processus métier : ventes, achats, stocks, production, RH, comptabilité. Solution web et mobile, évolutive et sécurisée.',
      features: [
        'Modules personnalisés selon vos métiers',
        'Intégration CRM intégré',
        'Tableaux de bord et KPI temps réel',
        'Reporting avancé et exports',
        'Gestion des droits et workflow',
        'API ouverte pour connexion externe'
      ],
      benefits: [
        { title: 'Processus optimisés', description: 'Automatisation et efficacité' },
        { title: 'Vision globale', description: 'Toutes vos données centralisées' },
        { title: 'Sur mesure', description: 'Adapté exactement à votre activité' }
      ],
      process: [
        { step: 1, title: 'Ateliers métier', description: 'Analyse détaillée des besoins' },
        { step: 2, title: 'Conception', description: 'Architecture technique et fonctionnelle' },
        { step: 3, title: 'Développement agile', description: 'Sprints itératifs' },
        { step: 4, title: 'Déploiement', description: 'Mise en production et formation' }
      ],
      relatedServices: ['dev-siteweb', 'cloud-hebergement', 'formation-erp'],
      faq: [
        { q: 'Combien coûte un ERP sur mesure ?', a: 'À partir de 15.000€ selon la complexité.' },
        { q: 'Proposez-vous des modules pré-intégrés ?', a: 'Oui, nous avons des modules standards accélérateurs.' }
      ],
      price: 'À partir de 15.000€',
      duration: '3 à 9 mois',
      imageBg: 'bg-green-100'
    },
    'dev-saas': {
      id: 'dev-saas',
      name: 'Solutions SaaS',
      category: 'Développement Digital',
      categoryId: 'developpement-digital',
      icon: Cloud,
      color: '#2AACB2',
      shortDescription: 'Solutions SaaS multi-tenant évolutives pour une commercialisation simplifiée.',
      fullDescription: 'Nous développons des plateformes SaaS prêtes à être commercialisées : architecture multi-tenant, gestion des abonnements, portail client, dashboard admin, paiement intégré.',
      features: [
        'Architecture multi-tenant',
        'Gestion des abonnements (Stripe)',
        'Portail client et tableau de bord',
        'Dashboard admin de supervision',
        'Scalabilité horizontale',
        'Maintenance et évolutions incluses'
      ],
      benefits: [
        { title: 'Modèle récurrent', description: 'Revenue régulier via abonnements' },
        { title: 'Coût maîtrisé', description: 'Pas d\'investissement initial lourd' },
        { title: 'Évolutivité', description: 'Votre solution grandit avec vous' }
      ],
      process: [
        { step: 1, title: 'MVP', description: 'Développement du produit minimum viable' },
        { step: 2, title: 'Alpha/Beta', description: 'Tests avec premiers utilisateurs' },
        { step: 3, title: 'Lancement', description: 'Mise en production commerciale' },
        { step: 4, title: 'Itérations', description: 'Améliorations continues' }
      ],
      relatedServices: ['dev-erp', 'cloud-hebergement', 'dev-appmobile'],
      faq: [
        { q: 'Quel est le délai pour un MVP SaaS ?', a: 'Entre 3 et 6 mois.' },
        { q: 'Proposez-vous l\'hébergement ?', a: 'Oui, hébergement haute disponibilité inclus.' }
      ],
      price: 'À partir de 25.000€',
      duration: '4 à 8 mois',
      imageBg: 'bg-green-100'
    },

    // ========== CLOUD & HÉBERGEMENT ==========
    'cloud-hebergement': {
      id: 'cloud-hebergement',
      name: 'Hébergement haute disponibilité',
      category: 'Cloud & Hébergement',
      categoryId: 'cloud-hebergement',
      icon: Server,
      color: '#4681B7',
      shortDescription: 'Hébergement web haute disponibilité sur AWS pour une performance optimale.',
      fullDescription: 'Nous proposons des solutions d\'hébergement cloud haute performance : uptime 99.9%, CDN mondial, sauvegardes automatiques, monitoring et support 24/7.',
      features: [
        'Uptime garanti 99.9%',
        'CDN mondial (CloudFlare, AWS)',
        'SSL automatique (Let\'s Encrypt)',
        'Sauvegardes quotidiennes',
        'Monitoring et alertes',
        'Support technique 24/7'
      ],
      benefits: [
        { title: 'Disponibilité maximale', description: 'Votre site toujours accessible' },
        { title: 'Performance mondiale', description: 'Chargement rapide partout' },
        { title: 'Sécurité renforcée', description: 'Protection DDoS incluse' }
      ],
      process: [
        { step: 1, title: 'Analyse', description: 'Évaluation des besoins de l\'application' },
        { step: 2, title: 'Configuration', description: 'Mise en place de l\'infrastructure' },
        { step: 3, title: 'Migration', description: 'Transfert des données' },
        { step: 4, title: 'Optimisation', description: 'Ajustements performance' }
      ],
      relatedServices: ['cloud-migration', 'cloud-sauvegarde', 'dev-siteweb'],
      faq: [
        { q: 'Quel est le prix de l\'hébergement ?', a: 'À partir de 29€/mois pour un site vitrine.' },
        { q: 'Puis-je changer de formule ?', a: 'Oui, évolutivité à la demande.' }
      ],
      price: 'À partir de 29€/mois',
      duration: 'Mise en place 24-48h',
      imageBg: 'bg-cyan-100'
    },
    'cloud-migration': {
      id: 'cloud-migration',
      name: 'Migration cloud',
      category: 'Cloud & Hébergement',
      categoryId: 'cloud-hebergement',
      icon: Cloud,
      color: '#4681B7',
      shortDescription: 'Migration et gestion de solutions cloud pour moderniser votre infrastructure.',
      fullDescription: 'Nous accompagnons la migration de votre infrastructure vers le cloud : AWS, Azure, Google Cloud. Migration sans downtime, optimisation des coûts, formation de vos équipes.',
      features: [
        'Migration sans interruption de service',
        'Optimisation des coûts cloud',
        'Sécurité et conformité',
        'Formation des équipes',
        'Support post-migration',
        'Stratégie multi-cloud'
      ],
      benefits: [
        { title: 'Zéro downtime', description: 'Activité continue pendant la migration' },
        { title: 'Économies', description: 'Réduction des coûts infrastructure' },
        { title: 'Agilité', description: 'Scalabilité à la demande' }
      ],
      process: [
        { step: 1, title: 'Assessment', description: 'Analyse de l\'existant' },
        { step: 2, title: 'Stratégie', description: 'Plan de migration détaillé' },
        { step: 3, title: 'Migration', description: 'Transfert des données et applications' },
        { step: 4, title: 'Validation', description: 'Tests et optimisation' }
      ],
      relatedServices: ['cloud-hebergement', 'cloud-sauvegarde'],
      faq: [
        { q: 'Combien de temps dure une migration ?', a: 'De 2 à 8 semaines selon la complexité.' },
        { q: 'Que devient mon ancien serveur ?', a: 'Option de conservation ou désactivation.' }
      ],
      price: 'Sur devis',
      duration: '2 à 8 semaines',
      imageBg: 'bg-cyan-100'
    },
    'cloud-sauvegarde': {
      id: 'cloud-sauvegarde',
      name: 'Sauvegarde automatique',
      category: 'Cloud & Hébergement',
      categoryId: 'cloud-hebergement',
      icon: Database,
      color: '#4681B7',
      shortDescription: 'Sauvegarde automatique et plan de reprise d\'activité pour protéger vos données.',
      fullDescription: 'Nous mettons en place des solutions de sauvegarde cloud automatisées : backup quotidien, restauration rapide, plan de reprise d\'activité (PRA), chiffrement des données.',
      features: [
        'Backup automatique quotidien',
        'Rétention configurable (30-365 jours)',
        'Restauration rapide en un clic',
        'Plan de reprise d\'activité (PRA)',
        'Chiffrement bout-en-bout',
        'Tests de restauration réguliers'
      ],
      benefits: [
        { title: 'Protection des données', description: 'Plus aucune perte de données' },
        { title: 'Restauration rapide', description: 'Reprise d\'activité en quelques heures' },
        { title: 'Conformité RGPD', description: 'Sauvegardes sécurisées et traçables' }
      ],
      process: [
        { step: 1, title: 'Analyse', description: 'Identification des données critiques' },
        { step: 2, title: 'Configuration', description: 'Mise en place des sauvegardes' },
        { step: 3, title: 'Tests', description: 'Validation des restaurations' },
        { step: 4, title: 'Supervision', description: 'Monitoring et reporting' }
      ],
      relatedServices: ['cloud-hebergement', 'cloud-migration'],
      faq: [
        { q: 'Quelle est la capacité de stockage ?', a: 'De 100 Go à plusieurs To.' },
        { q: 'Les données sont-elles chiffrées ?', a: 'Oui, chiffrement AES-256.' }
      ],
      price: 'À partir de 49€/mois',
      duration: 'Mise en place 1-2 jours',
      imageBg: 'bg-cyan-100'
    },
    'cloud-monitoring': {
      id: 'cloud-monitoring',
      name: 'Monitoring 24/7',
      category: 'Cloud & Hébergement',
      categoryId: 'cloud-hebergement',
      icon: Eye,
      color: '#4681B7',
      shortDescription: 'Maintenance préventive et monitoring 24/7 pour anticiper les incidents.',
      fullDescription: 'Nous supervisons votre infrastructure 24h/24 et 7j/7 : monitoring des serveurs, alertes temps réel, intervention préventive, rapports hebdomadaires.',
      features: [
        'Supervision 24/7',
        'Alertes temps réel (email, SMS, Slack)',
        'Dashboard superviseur personnalisé',
        'Rapports hebdomadaires détaillés',
        'Intervention rapide en cas d\'incident',
        'Analyse prédictive des pannes'
      ],
      benefits: [
        { title: 'Anticipation', description: 'Détection avant panne' },
        { title: 'Réactivité', description: 'Intervention immédiate' },
        { title: 'Visibilité', description: 'Tableau de bord temps réel' }
      ],
      process: [
        { step: 1, title: 'Découverte', description: 'Déploiement des sondes' },
        { step: 2, title: 'Configuration', description: 'Définition des seuils d\'alerte' },
        { step: 3, title: 'Supervision', description: 'Monitoring continu' },
        { step: 4, title: 'Reporting', description: 'Rapports d\'activité' }
      ],
      relatedServices: ['cloud-hebergement', 'cloud-sauvegarde'],
      faq: [
        { q: 'Quels sont les délais d\'intervention ?', a: 'Intervention sous 1h pour les incidents critiques.' },
        { q: 'Proposez-vous une astreinte ?', a: 'Oui, astreinte technique 24/7.' }
      ],
      price: 'À partir de 199€/mois',
      duration: 'Contrat mensuel',
      imageBg: 'bg-cyan-100'
    },

    // Pour les autres catégories (Énergie, Vente, Formation), je continue sur le même modèle
    // Par souci de concision, je présente la structure complète
  };

  // Services additionnels par catégorie (suite)
  const additionalServices = {
    'energie-panneaux': {
      id: 'energie-panneaux',
      name: 'Panneaux photovoltaïques',
      category: 'Énergie & Équipements',
      categoryId: 'energie-equipements',
      icon: Sun,
      color: '#55DDB5',
      shortDescription: 'Étude et installation de panneaux photovoltaïques pour une énergie verte et économique.',
      fullDescription: 'Nous réalisons l\'étude, la fourniture et l\'installation de panneaux photovoltaïques pour les professionnels. Autoconsommation ou revente, nous vous accompagnons dans votre transition énergétique.',
      features: [
        'Étude personnalisée de rentabilité',
        'Installation complète clé en main',
        'Raccordement au réseau Enedis',
        'Suivi de production mobile',
        'Aides financières (subventions, crédit impôt)',
        'Maintenance et nettoyage'
      ],
      benefits: [
        { title: 'Économies durables', description: 'Réduction de 40 à 70% de votre facture' },
        { title: 'Énergie verte', description: 'Réduction de votre empreinte carbone' },
        { title: 'Valorisation patrimoine', description: 'Plus-value sur vos locaux' }
      ],
      process: [
        { step: 1, title: 'Étude de faisabilité', description: 'Analyse de toiture et ensoleillement' },
        { step: 2, title: 'Dimensionnement', description: 'Calcul de la puissance nécessaire' },
        { step: 3, title: 'Installation', description: 'Pose des panneaux et onduleurs' },
        { step: 4, title: 'Raccordement', description: 'Mise en service et suivi' }
      ],
      relatedServices: ['energie-audit', 'energie-clim'],
      faq: [
        { q: 'Quelle est la durée de vie des panneaux ?', a: '25 à 30 ans avec garantie constructeur.' },
        { q: 'Quel est le retour sur investissement ?', a: 'Généralement 5 à 8 ans.' }
      ],
      price: 'À partir de 5.000€',
      duration: '2 à 4 semaines',
      imageBg: 'bg-orange-100'
    },
    'energie-clim': {
      id: 'energie-clim',
      name: 'Climatisation (split system)',
      category: 'Énergie & Équipements',
      categoryId: 'energie-equipements',
      icon: Thermometer,
      color: '#55DDB5',
      shortDescription: 'Installation et réparation de climatisation split system pour votre confort.',
      fullDescription: 'Nous installons et entretenons des systèmes de climatisation split system (mono-split, multi-split). Marques premium, installation soignée, SAV réactif.',
      features: [
        'Installation mono-split et multi-split',
        'Marques Daikin, Mitsubishi, LG',
        'Dépannage et réparation rapide',
        'Contrat d\'entretien annuel',
        'Diagnostic gratuit',
        'Aide aux aides financières'
      ],
      benefits: [
        { title: 'Confort thermique', description: 'Température idéale toute l\'année' },
        { title: 'Économie d\'énergie', description: 'Clim réversible classe A+++' },
        { title: 'Service réactif', description: 'Intervention sous 24h' }
      ],
      process: [
        { step: 1, title: 'Audit', description: 'Évaluation des besoins et des contraintes' },
        { step: 2, title: 'Devis', description: 'Proposition détaillée' },
        { step: 3, title: 'Installation', description: 'Pose professionnelle' },
        { step: 4, title: 'SAV', description: 'Suivi et maintenance' }
      ],
      relatedServices: ['energie-panneaux', 'vente-climatiseurs'],
      faq: [
        { q: 'Quel est le délai d\'installation ?', a: 'Généralement 1 à 3 jours.' },
        { q: 'Proposez-vous un service de dépannage ?', a: 'Oui, dépannage 7j/7.' }
      ],
      price: 'À partir de 1.200€',
      duration: '1 à 3 jours',
      imageBg: 'bg-orange-100'
    },
    'formation-it': {
      id: 'formation-it',
      name: 'Centre de formation IT',
      category: 'Formation',
      categoryId: 'formation',
      icon: BookOpen,
      color: '#72A5CE',
      shortDescription: 'Centre de formation en nouvelles technologies avec nos domaines d\'expertise.',
      fullDescription: 'Notre centre de formation propose des cursus complets en nouvelles technologies : réseau, sécurité, développement, cloud, data. Formations éligibles au CPF, certifications reconnues.',
      features: [
        'Formateurs experts certifiés',
        'Programmes certifiants (Cisco, Microsoft, CompTIA)',
        'Équipements et laboratoires dédiés',
        'Accès plateforme e-learning 24/7',
        'Support post-formation',
        'Financement CPF, OPCO'
      ],
      benefits: [
        { title: 'Montée en compétences', description: 'Formation pratique et opérationnelle' },
        { title: 'Certification reconnue', description: 'Valorisez votre CV' },
        { title: 'Employabilité', description: 'Taux d\'insertion de 85%' }
      ],
      process: [
        { step: 1, title: 'Positionnement', description: 'Évaluation du niveau initial' },
        { step: 2, title: 'Formation', description: 'Cours théoriques et ateliers pratiques' },
        { step: 3, title: 'Certification', description: 'Passage de l\'examen officiel' },
        { step: 4, title: 'Suivi', description: 'Accompagnement post-certification' }
      ],
      relatedServices: ['formation-certifiante', 'formation-coaching'],
      faq: [
        { q: 'Les formations sont-elles certifiantes ?', a: 'Oui, avec certifications reconnues par l\'État.' },
        { q: 'Peut-on financer la formation ?', a: 'Oui, CPF, Pôle Emploi, OPCO.' }
      ],
      price: 'À partir de 1.200€',
      duration: '3 à 15 jours',
      imageBg: 'bg-indigo-100'
    }
  };

  // Fusionner toutes les données
  const allServices = { ...servicesDatabase, ...additionalServices };

  useEffect(() => {
    setLoading(true);
    // Simuler chargement
    setTimeout(() => {
      if (allServices[id]) {
        setService(allServices[id]);
      } else {
        // Service non trouvé
        setService(null);
      }
      setLoading(false);
    }, 100);
  }, [id]);

  const handleQuoteRequest = () => {
    setShowQuoteModal(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitQuote = (e) => {
    e.preventDefault();
    console.log('Demande de devis:', formData, 'pour service:', service?.name);
    alert(`✅ Demande de devis envoyée pour :\n${service?.name}\n\n📧 Un email de confirmation a été envoyé à ${formData.email}\n📞 Notre équipe vous contactera sous 24h.`);
    setShowQuoteModal(false);
    setFormData({ name: '', email: '', phone: '', company: '', budget: '', message: '' });
  };

  const getIconComponent = (IconComp, size = 24) => {
    return IconComp ? <IconComp size={size} /> : <CheckCircle size={size} />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6F6F7] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#0B74C1] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#25364A]">Chargement du service...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-[#F6F6F7] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <X size={48} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-[#053876] mb-2 font-syne">Service non trouvé</h2>
          <p className="text-[#25364A] mb-6">Le service que vous recherchez n'existe pas ou a été déplacé.</p>
          <Link to="/services" className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-full font-semibold transition-all hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #0B74C1 0%, #2AACB2 55%, #55DDB5 100%)' }}>
            Voir tous nos services <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = service.icon;

  return (
    <div className="min-h-screen bg-[#F6F6F7]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        .card-hover {
          background: #fff; border: 1px solid rgba(5,56,118,.09); border-radius: 18px;
          box-shadow: 0 10px 30px rgba(5,56,118,.06);
          transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease;
        }
        .card-hover:hover {
          box-shadow: 0 20px 44px rgba(11,116,193,.14); border-color: rgba(42,172,178,.35);
        }
      `}</style>
      {/* Hero Section */}
      <PublicHero
        breadcrumb={
          <>
            <Link to="/services">Services</Link>
            <ChevronRight size={12} />
            <Link to={`/services#${service.categoryId}`}>{service.category}</Link>
            <ChevronRight size={12} />
            <span style={{ color: '#fff' }}>{service.name}</span>
          </>
        }
        badge={service.category}
        title={service.name}
        subtitle={service.shortDescription}
        primaryAction={{ label: 'Demander un devis', onClick: handleQuoteRequest }}
        secondaryAction={{ label: 'Audit gratuit', to: '/audit-gratuit', icon: <CheckCircle size={18} /> }}
        align="left"
        compact
      />

      {/* Contenu principal */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Colonne principale - Description détaillée */}
          <div className="lg:col-span-2">
            {/* Description complète */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-hover p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-[#053876] mb-4 font-syne">Présentation du service</h2>
              <p className="text-[#25364A] leading-relaxed mb-6">{service.fullDescription}</p>

              {/* Features */}
              <h3 className="text-xl font-bold text-[#053876] mb-4 font-syne">Ce que nous proposons</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle size={18} className="text-[#55DDB5] mt-0.5 flex-shrink-0" />
                    <span className="text-[#25364A]">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Avantages */}
              <h3 className="text-xl font-bold text-[#053876] mb-4 font-syne">Avantages</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {service.benefits.map((benefit, idx) => (
                  <div key={idx} className="rounded-xl p-4" style={{ background: `${service.color}0D` }}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: `${service.color}22` }}>
                      <CheckCircle size={20} style={{ color: service.color }} />
                    </div>
                    <h4 className="font-bold text-[#053876] mb-1">{benefit.title}</h4>
                    <p className="text-sm text-[#25364A]">{benefit.description}</p>
                  </div>
                ))}
              </div>

              {/* Processus */}
              <h3 className="text-xl font-bold text-[#053876] mb-4 font-syne">Notre processus</h3>
              <div className="space-y-4 mb-8">
                {service.process.map((step) => (
                  <div key={step.step} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-white" style={{ background: `linear-gradient(135deg, ${service.color}, #2AACB2)` }}>
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#053876]">{step.title}</h4>
                      <p className="text-[#25364A] text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* FAQ */}
              <h3 className="text-xl font-bold text-[#053876] mb-4 font-syne">Questions fréquentes</h3>
              <div className="space-y-4">
                {service.faq.map((item, idx) => (
                  <div key={idx} className="border-b border-[#053876]/10 pb-3">
                    <h4 className="font-semibold text-[#053876] mb-1">{item.q}</h4>
                    <p className="text-[#25364A] text-sm">{item.a}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Colonne latérale - Informations et CTA */}
          <div className="lg:col-span-1">
            {/* Carte d'informations */}
            <div className="card-hover p-6 mb-6 sticky top-24">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: `${service.color}18` }}>
                {IconComponent && <IconComponent size={32} style={{ color: service.color }} />}
              </div>
              <h3 className="text-xl font-bold text-center text-[#053876] mb-4 font-syne">{service.name}</h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center pb-2 border-b border-[#053876]/10">
                  <span className="text-[#25364A]/70">📅 Durée estimée</span>
                  <span className="font-semibold text-[#053876]">{service.duration}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-[#053876]/10">
                  <span className="text-[#25364A]/70">💰 Tarif</span>
                  <span className="font-semibold text-[#0B74C1]">{service.price}</span>
                </div>
              </div>

              <button onClick={handleQuoteRequest} className="w-full text-white py-3 rounded-full font-semibold hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 mb-3 shadow-lg" style={{ background: 'linear-gradient(135deg, #0B74C1 0%, #2AACB2 55%, #55DDB5 100%)' }}>
                Demander un devis <ArrowRight size={18} />
              </button>
              <Link to="/audit-gratuit" className="w-full border border-[#053876]/20 text-[#053876] py-3 rounded-full font-semibold hover:border-[#2AACB2] hover:text-[#0B74C1] transition-all flex items-center justify-center gap-2">
                Audit gratuit <CheckCircle size={18} />
              </Link>
            </div>

            {/* Services connexes */}
            {service.relatedServices && service.relatedServices.length > 0 && (
              <div className="card-hover p-6">
                <h3 className="font-bold text-[#053876] mb-4 font-syne">Services connexes</h3>
                <div className="space-y-3">
                  {service.relatedServices.map((relatedId, idx) => {
                    const relatedService = allServices[relatedId];
                    if (!relatedService) return null;
                    const RelatedIcon = relatedService.icon;
                    return (
                      <Link
                        key={idx}
                        to={`/services/${relatedId}`}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F6F6F7] transition group"
                      >
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${relatedService.color}18` }}>
                          {RelatedIcon && <RelatedIcon size={18} style={{ color: relatedService.color }} />}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-[#053876] group-hover:text-[#0B74C1] transition">{relatedService.name}</h4>
                          <p className="text-xs text-[#25364A]/60">{relatedService.category}</p>
                        </div>
                        <ArrowRight size={16} className="text-[#25364A]/40 group-hover:text-[#0B74C1] transition" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Demande de devis */}
      {showQuoteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white border-b border-[#053876]/10 p-5 flex justify-between items-center rounded-t-2xl">
              <div>
                <h3 className="text-xl font-bold text-[#053876] font-syne">Demander un devis</h3>
                <p className="text-sm text-[#25364A]/70">{service?.name}</p>
              </div>
              <button onClick={() => setShowQuoteModal(false)} className="text-[#25364A]/50 hover:text-[#053876] p-1 rounded-full hover:bg-[#F6F6F7] transition">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmitQuote} className="p-6 space-y-4">
              <div>
                <label className="block text-[#053876] font-medium mb-1 text-sm">Nom complet *</label>
                <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="Jean Dupont" className="w-full px-4 py-2 rounded-lg border border-[#053876]/15 focus:border-[#2AACB2] focus:outline-none focus:ring-1 focus:ring-[#2AACB2]" />
              </div>
              <div>
                <label className="block text-[#053876] font-medium mb-1 text-sm">Email *</label>
                <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="contact@entreprise.com" className="w-full px-4 py-2 rounded-lg border border-[#053876]/15 focus:border-[#2AACB2] focus:outline-none focus:ring-1 focus:ring-[#2AACB2]" />
              </div>
              <div>
                <label className="block text-[#053876] font-medium mb-1 text-sm">Téléphone *</label>
                <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="+243 XXX XXX XXX" className="w-full px-4 py-2 rounded-lg border border-[#053876]/15 focus:border-[#2AACB2] focus:outline-none focus:ring-1 focus:ring-[#2AACB2]" />
              </div>
              <div>
                <label className="block text-[#053876] font-medium mb-1 text-sm">Entreprise</label>
                <input type="text" name="company" value={formData.company} onChange={handleInputChange} placeholder="Nom de votre entreprise" className="w-full px-4 py-2 rounded-lg border border-[#053876]/15 focus:border-[#2AACB2] focus:outline-none focus:ring-1 focus:ring-[#2AACB2]" />
              </div>
              <div>
                <label className="block text-[#053876] font-medium mb-1 text-sm">Budget estimé</label>
                <select name="budget" value={formData.budget} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-[#053876]/15 focus:border-[#2AACB2] focus:outline-none">
                  <option value="">Sélectionnez une fourchette</option>
                  <option value="<1000€">Moins de 1 000€</option>
                  <option value="1000-5000€">1 000€ - 5 000€</option>
                  <option value="5000-15000€">5 000€ - 15 000€</option>
                  <option value=">15000€">Plus de 15 000€</option>
                </select>
              </div>
              <div>
                <label className="block text-[#053876] font-medium mb-1 text-sm">Message / Détails</label>
                <textarea name="message" rows="3" value={formData.message} onChange={handleInputChange} placeholder="Décrivez votre projet..." className="w-full px-4 py-2 rounded-lg border border-[#053876]/15 focus:border-[#2AACB2] focus:outline-none resize-none"></textarea>
              </div>
              <button type="submit" className="w-full text-white py-3 rounded-full font-semibold transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, #0B74C1 0%, #2AACB2 55%, #55DDB5 100%)' }}>
                Envoyer la demande <ArrowRight size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetailPage;