// seed.js — Crée ou corrige le compte SuperAdministrateur unique.
// Il n'existe plus de comptes de démonstration : l'inscription publique est
// désactivée, seul le SuperAdministrateur peut créer de nouveaux comptes
// depuis l'espace d'administration.
// Usage : node seed.js
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const superAdmin = {
  name:     'Super Administrateur',
  email:    'oseedoro@gmail.com',
  phone:    '+243 555 503 59',
  password: 'meya1212',
  role:     'super_admin',
};

const seed = async () => {
  await connectDB();

  const exists = await User.findOne({ email: superAdmin.email });

  if (exists) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(superAdmin.password, salt);

    await User.findByIdAndUpdate(exists._id, {
      name:     superAdmin.name,
      role:     'super_admin',
      password: hashedPassword,
      isActive: true,
    });
    console.log(`Compte SuperAdministrateur mis à jour : ${superAdmin.email}`);
  } else {
    await User.create(superAdmin);
    console.log(`Compte SuperAdministrateur créé : ${superAdmin.email}`);
  }

  console.log('Seed terminé.');
  process.exit(0);
};

seed().catch(err => {
  console.error('Erreur seed :', err);
  process.exit(1);
});
