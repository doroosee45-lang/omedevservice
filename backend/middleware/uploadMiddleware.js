// middleware/uploadMiddleware.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/tickets/');
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error('Type de fichier non autorisé'), false);
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB

// ── Images d'articles de blog ────────────────────────────────────────────
// Stockage en mémoire (pas sur le disque local) : le disque de
// l'hébergeur (Render) est éphémère et remis à zéro à chaque redéploiement
// ou redémarrage - un fichier écrit avec multer.diskStorage y disparaît
// silencieusement. Le buffer en mémoire est envoyé à Cloudinary (stockage
// durable) par le contrôleur juste après - voir articleController.js.
const imageFileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error('Format d\'image non supporté (JPEG, PNG, WEBP ou GIF uniquement)'), false);
};

const uploadArticleImage = multer({
  storage: multer.memoryStorage(),
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

module.exports = { upload, uploadArticleImage };