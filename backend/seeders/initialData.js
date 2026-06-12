// src/seeders/initialData.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Service = require('../models/Service');
const Article = require('../models/Article');
require('dotenv').config();

const initialUsers = [
  {
    name: 'Super Admin',
    email: 'admin@omdeve.com',
    phone: '+243 000 000 000',
    password: 'admin123',
    role: 'super_admin',
    isActive: true,
  },
  {
    name: 'Jean Client',
    email: 'client@omdeve.com',
    phone: '+243 000 000 001',
    password: 'client123',
    role: 'client',
    isActive: true,
  },
];

const initialServices = [
  { name: 'Réseau & Infrastructure', category: 'reseau', description: 'Installation et maintenance de réseaux informatiques', shortDescription: 'Réseaux haut débit, câblage structuré', price: 'Sur devis', order: 1, isActive: true, features: ['Câblage', 'WiFi entreprise', 'Fibre optique'] },
  { name: 'Sécurité & Cybersécurité', category: 'securite', description: 'Protection des données et cybersécurité', shortDescription: 'Sécurité avancée', price: 'Sur devis', order: 2, isActive: true, features: ['Vidéosurveillance', 'Firewall', 'Audit'] },
  { name: 'Développement Digital', category: 'developpement', description: 'Sites web, applications, ERP', shortDescription: 'Solutions digitales sur mesure', price: 'Sur devis', order: 3, isActive: true, features: ['Sites web', 'E-commerce', 'Applications mobiles'] },
  { name: 'Cloud & Hébergement', category: 'cloud', description: 'Solutions cloud et hébergement', shortDescription: 'Cloud scalable', price: 'Sur devis', order: 4, isActive: true, features: ['Hébergement', 'Migration cloud', 'SaaS'] },
  { name: 'Énergie & Équipements', category: 'energie', description: 'Panneaux solaires, climatisation', shortDescription: 'Solutions énergétiques', price: 'Sur devis', order: 5, isActive: true, features: ['Panneaux solaires', 'Climatisation', 'Audit énergétique'] },
  { name: 'Formation IT', category: 'formation', description: 'Formations certifiantes', shortDescription: 'Formez vos équipes', price: 'Sur devis', order: 6, isActive: true, features: ['Cybersécurité', 'Cloud', 'Développement'] },
];

const initialArticles = [
  {
    title: 'Comment sécuriser son réseau d\'entreprise',
    slug: 'securiser-reseau-entreprise',
    excerpt: 'Découvrez les bonnes pratiques pour protéger votre infrastructure réseau.',
    content: 'Contenu complet de l\'article...',
    category: 'Sécurité',
    author: 'Super Admin',
    status: 'published',
    publishedAt: new Date(),
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600',
  },
  {
    title: 'Les avantages du cloud pour les PME',
    slug: 'avantages-cloud-pme',
    excerpt: 'Pourquoi migrer vers le cloud ? Économies, flexibilité et sécurité.',
    content: 'Contenu complet...',
    category: 'Cloud',
    author: 'Super Admin',
    status: 'published',
    publishedAt: new Date(),
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600',
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connecté à MongoDB pour seeding');

    // Nettoyer les collections existantes (optionnel)
    await User.deleteMany();
    await Service.deleteMany();
    await Article.deleteMany();
    console.log('Anciennes données supprimées');

    // Insérer les utilisateurs
    const createdUsers = [];
    for (const user of initialUsers) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const newUser = await User.create({ ...user, password: hashedPassword });
      createdUsers.push(newUser);
    }
    console.log(`${createdUsers.length} utilisateurs créés`);

    // Insérer les services
    const services = await Service.insertMany(initialServices);
    console.log(`${services.length} services créés`);

    // Insérer les articles
    const articles = await Article.insertMany(initialArticles);
    console.log(`${articles.length} articles créés`);

    console.log('✅ Base de données initialisée avec succès');
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors du seeding:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedDatabase();
}

// dans seeders/initialData.js, ajouter :
const defaultSettings = [
  { key: 'siteName', value: 'OMDEVE Services', description: 'Nom du site' },
  { key: 'siteEmail', value: 'contact@omdeve.com', description: 'Email de contact' },
  { key: 'sitePhone', value: '+243 555 503 59', description: 'Téléphone' },
  { key: 'siteAddress', value: 'Avenue Kabmabre n°75, Lingwala, Kinshasa', description: 'Adresse' },
  { key: 'facebook', value: 'https://facebook.com/omdeve', description: 'Facebook' },
  { key: 'linkedin', value: 'https://linkedin.com/company/omdeve', description: 'LinkedIn' },
  { key: 'twitter', value: 'https://twitter.com/omdeve', description: 'Twitter' },
  { key: 'vatRate', value: 16, description: 'TVA (%)' },
  { key: 'currency', value: 'EUR', description: 'Devise' },
  { key: 'seoTitle', value: 'OMDEVE - Solutions IT, Énergie & Digital en RDC', description: 'Titre SEO' },
  { key: 'seoDesc', value: 'Leader en solutions informatiques, énergétiques et digitales en République Démocratique du Congo', description: 'Description SEO' },
];
await Setting.insertMany(defaultSettings);

module.exports = seedDatabase;