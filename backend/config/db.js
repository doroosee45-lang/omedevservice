// src/config/db.js - Connexion à MongoDB avec Mongoose
const mongoose = require('mongoose');

const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  if (!MONGO_URI) {
    console.error('❌ MONGO_URI manquant dans les variables d\'environnement');
    process.exit(1);
  }
  const opts = {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  };
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      const conn = await mongoose.connect(MONGO_URI, opts);
      console.log(`✅ MongoDB Connecté: ${conn.connection.host}`);
      return;
    } catch (error) {
      console.error(`❌ MongoDB tentative ${attempt}/5: ${error.message}`);
      if (attempt === 5) { process.exit(1); }
      await new Promise(r => setTimeout(r, attempt * 2000));
    }
  }
};

module.exports = connectDB;