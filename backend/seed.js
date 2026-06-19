// seed.js — Crée les comptes de démonstration en base de données
// Usage : node seed.js
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db');
const User = require('./models/User');

const demoUsers = [
  {
    name:     'Admin Démo',
    email:    'admin@omdeve.com',
    phone:    '+243 81 000 0001',
    password: 'admin123',
    role:     'admin',
  },
  {
    name:     'Client Démo',
    email:    'client@omdeve.com',
    phone:    '+243 81 000 0002',
    password: 'client123',
    role:     'client',
  },
];

const seed = async () => {
  await connectDB();

  for (const data of demoUsers) {
    const exists = await User.findOne({ email: data.email });
    if (exists) {
      console.log(`⚠️  Compte déjà présent : ${data.email} (ignoré)`);
      continue;
    }
    await User.create(data);
    console.log(`✅ Compte créé : ${data.email} | rôle : ${data.role}`);
  }

  console.log('\n🎉 Seed terminé.');
  process.exit(0);
};

seed().catch(err => {
  console.error('❌ Erreur seed :', err);
  process.exit(1);
});
