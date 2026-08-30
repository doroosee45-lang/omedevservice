// config/cloudinary.js - Stockage durable des images uploadées.
// Le disque local de l'hébergeur (Render) est éphémère : tout fichier
// écrit à l'exécution disparaît au prochain redémarrage/redéploiement du
// conteneur. Cloudinary sert de stockage persistant pour les images
// d'articles de blog, avec une URL stable qui ne dépend d'aucun
// environnement.
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
