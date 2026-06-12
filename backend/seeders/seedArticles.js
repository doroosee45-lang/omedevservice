// seeders/seedArticles.js (version finale avec catégories du frontend)
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Article = require('../models/Article');

dotenv.config();

const articles = [
  {
    title: "Comment sécuriser votre réseau d'entreprise en 2026 : Guide complet",
    slug: "securiser-reseau-entreprise-2026",
    excerpt: "Découvrez les meilleures pratiques et outils pour protéger votre infrastructure réseau contre les cybermenaces actuelles.",
    content: "Contenu complet de l'article sur la sécurité réseau...",
    category: "Cybersécurité",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=500&fit=crop",
    author: "Jean Meya",
    status: "published",
    publishedAt: new Date("2026-03-28"),
    readTime: 8,
    tags: ["sécurité", "réseau", "firewall"],
    metaTitle: "Sécuriser son réseau d'entreprise en 2026 - Guide complet",
    metaDescription: "Guide complet pour sécuriser votre réseau d'entreprise contre les cybermenaces en 2026."
  },
  {
    title: "Installation de panneaux solaires en RDC : Rentabilité et retour sur investissement",
    slug: "panneaux-solaires-rdc-rentabilite",
    excerpt: "Analyse détaillée des coûts, avantages et retour sur investissement des systèmes photovoltaïques en milieu congolais.",
    content: "Contenu complet sur l'énergie solaire en RDC...",
    category: "Énergie",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=500&fit=crop",
    author: "Dr. Amina Kabongo",
    status: "published",
    publishedAt: new Date("2026-03-25"),
    readTime: 12,
    tags: ["solaire", "énergie", "RDC"],
    metaTitle: "Panneaux solaires en RDC : rentabilité et retour sur investissement",
    metaDescription: "Analyse des coûts et bénéfices des panneaux solaires pour les entreprises congolaises."
  },
  {
    title: "Pourquoi passer à un ERP sur mesure en 2026 ? Avantages et cas d'usage",
    slug: "erp-sur-mesure-avantages-2026",
    excerpt: "Comment un ERP personnalisé peut transformer la gestion de votre entreprise au Congo.",
    content: "Contenu complet sur les ERP...",
    category: "Digital",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    author: "Meya Dorodoro",
    status: "published",
    publishedAt: new Date("2026-03-20"),
    readTime: 6,
    tags: ["ERP", "gestion", "digitalisation"],
    metaTitle: "Avantages d'un ERP sur mesure en 2026",
    metaDescription: "Pourquoi opter pour un ERP personnalisé ? Découvrez les bénéfices et cas d'usage."
  },
  {
    title: "Formation cybersécurité : Pourquoi c'est devenu indispensable pour vos équipes",
    slug: "formation-cybersecurite-indispensable",
    excerpt: "Les formations en cybersécurité réduisent de 70% les risques d'attaques humaines.",
    content: "Contenu complet sur la formation en cybersécurité...",
    category: "Formation",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop",
    author: "Sarah Nsimba",
    status: "published",
    publishedAt: new Date("2026-03-15"),
    readTime: 5,
    tags: ["formation", "cybersécurité"],
    metaTitle: "Formation cybersécurité : indispensable pour vos équipes",
    metaDescription: "Pourquoi former vos employés à la cybersécurité ? Réduction des risques humains."
  },
  {
    title: "Déploiement WiFi professionnel : Erreurs à éviter en entreprise",
    slug: "wifi-professionnel-erreurs-eviter",
    excerpt: "Guide pratique pour une couverture WiFi optimale et sécurisée dans vos locaux.",
    content: "Contenu complet sur le WiFi professionnel...",
    category: "Réseau",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=500&fit=crop",
    author: "Paul Kabila",
    status: "published",
    publishedAt: new Date("2026-03-10"),
    readTime: 7,
    tags: ["wifi", "réseau"],
    metaTitle: "Erreurs à éviter lors du déploiement WiFi professionnel",
    metaDescription: "Guide pour une couverture WiFi performante et sécurisée en entreprise."
  },
  {
    title: "Cloud hybride : l'avenir des entreprises africaines",
    slug: "cloud-hybride-avantages-entreprises",
    excerpt: "Découvrez comment le cloud hybride combine flexibilité et sécurité pour les entreprises en Afrique.",
    content: "Contenu complet sur le cloud hybride...",
    category: "Cloud",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop",
    author: "Claire Mbenza",
    status: "published",
    publishedAt: new Date("2026-03-05"),
    readTime: 9,
    tags: ["cloud", "hybride", "stockage"],
    metaTitle: "Cloud hybride : l'avenir des entreprises africaines",
    metaDescription: "Pourquoi adopter le cloud hybride ? Flexibilité, sécurité et économies."
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connecté à MongoDB');

    await Article.deleteMany({});
    console.log('Anciens articles supprimés');

    const inserted = await Article.insertMany(articles);
    console.log(`${inserted.length} articles ajoutés avec succès !`);

    process.exit(0);
  } catch (error) {
    console.error('Erreur lors du seed :', error);
    process.exit(1);
  }
};

seedDatabase();