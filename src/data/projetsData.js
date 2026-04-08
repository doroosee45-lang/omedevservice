// src/data/projetsData.js
export const projetsData = [
  {
    id: 1,
    titre: "Installation réseau haut débit - Hôtel Méridien",
    slug: "installation-reseau-hotel-meridien",
    categorie: "IT",
    imagePrincipale: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600",
    galerieImages: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
      "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800",
    ],
    descriptionCourte: "Déploiement d’une infrastructure réseau complète (fibre, switches, WiFi6) pour un hôtel 5 étoiles.",
    descriptionLongue: "L’hôtel Méridien souffrait de coupures réseau et d’une couverture WiFi inégale. OMDEVE a installé 24 points d’accès Ubiquiti, un routage VLAN, et une liaison fibre optique redondante. Résultat : débit monté à 1 Gbps, roaming parfait, satisfaction client +95%.",
    technologies: ["Ubiquiti", "Fibre optique", "VLAN", "WiFi 6", "pfSense"],
    client: {
      nom: "Hôtel Méridien",
      logo: "https://via.placeholder.com/80?text=Meridien",
      temoignage: "OMDEVE a transformé notre réseau. Plus aucune plainte client, et l’équipe technique est réactive.",
      clientNom: "Jean-Paul K.",
      clientPoste: "Directeur des opérations",
      note: 5,
      photoClient: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    featured: true,
    date: "2024-02-15"
  },
  {
    id: 2,
    titre: "Audit cybersécurité & mise en place firewall - Banque Atlantique",
    slug: "audit-cybersecurite-banque-atlantique",
    categorie: "Securite",
    imagePrincipale: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600",
    galerieImages: ["https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800"],
    descriptionCourte: "Audit complet, tests d’intrusion et installation d’une solution firewall haute sécurité.",
    descriptionLongue: "La Banque Atlantique a fait appel à OMDEVE pour sécuriser son système de transactions en ligne. Nous avons réalisé un audit externe/interne, corrigé 12 vulnérabilités critiques, et installé un cluster de firewalls Fortinet avec IPS/IDS. Aucune intrusion depuis 6 mois.",
    technologies: ["Fortinet", "Nessus", "Wireshark", "IDS/IPS", "VPN IPSec"],
    client: {
      nom: "Banque Atlantique",
      temoignage: "Un travail minutieux et une équipe très professionnelle. Rapport d’audit clair et actions rapides.",
      clientNom: "Rachel M.",
      clientPoste: "RSSI",
      note: 5,
      photoClient: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    featured: false,
    date: "2024-01-10"
  },
  {
    id: 3,
    titre: "Site e-commerce complet - Boutique 'Mode & Co'",
    slug: "site-ecommerce-mode-co",
    categorie: "Digital",
    imagePrincipale: "https://images.unsplash.com/photo-1523475496153-3b2c5a7c9b1a?w=600",
    galerieImages: ["https://images.unsplash.com/photo-1523475496153-3b2c5a7c9b1a?w=800"],
    descriptionCourte: "Développement d’une plateforme e-commerce avec paiement intégré, gestion de stock et SEO.",
    descriptionLongue: "Création d’un site sur mesure (React + Node.js) pour une marque de vêtements. Paiement Stripe, dashboard fournisseur, recommandations produits par IA. +230% de ventes en 3 mois.",
    technologies: ["React", "Node.js", "Stripe", "MongoDB", "Elasticsearch"],
    client: {
      nom: "Mode & Co",
      temoignage: "Notre boutique en ligne explose grâce à l’expertise d’OMDEVE. Interface fluide et support impeccable.",
      clientNom: "Sophie L.",
      clientPoste: "Fondatrice",
      note: 5,
      photoClient: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    featured: true,
    date: "2023-11-20"
  },
  {
    id: 4,
    titre: "Installation panneaux solaires - Immeuble Green Tower",
    slug: "panneaux-solaires-green-tower",
    categorie: "Energie",
    imagePrincipale: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600",
    galerieImages: ["https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800"],
    descriptionCourte: "Étude, fourniture et installation de 120 panneaux photovoltaïques pour un immeuble de bureaux.",
    descriptionLongue: "Green Tower souhaitait réduire sa facture énergétique. OMDEVE a réalisé un audit solaire, installé des panneaux monocristallins 400Wc et un système de monitoring. Économie annuelle : 35% sur l’électricité.",
    technologies: ["Panneaux solaires", "Onduleurs Huawei", "Monitoring IoT", "Batteries Lithium"],
    client: {
      nom: "Green Tower",
      temoignage: "Un projet mené de A à Z, dans les délais et le budget. L’équipe OMDEVE est très compétente.",
      clientNom: "Koffi A.",
      clientPoste: "Gérant",
      note: 5,
      photoClient: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    featured: false,
    date: "2023-09-05"
  },
  {
    id: 5,
    titre: "Formation cybersécurité - Équipe ministère",
    slug: "formation-cybersecurite-ministere",
    categorie: "Formation",
    imagePrincipale: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600",
    galerieImages: ["https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800"],
    descriptionCourte: "Formation certifiante pour 50 agents sur les bonnes pratiques de cybersécurité.",
    descriptionLongue: "Ateliers pratiques, phishing simulation, gestion des mots de passe et chiffrement. Taux de réussite 98%, et baisse de 70% des incidents signalés.",
    technologies: ["E-learning", "Simulateur phishing", "Certification ISO 27001"],
    client: {
      nom: "Ministère des Postes",
      temoignage: "Une formation concrète et adaptée à nos métiers. Les agents sont désormais vigilants.",
      clientNom: "Paul D.",
      clientPoste: "DRH",
      note: 4.8,
      photoClient: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    featured: false,
    date: "2024-03-01"
  }
];