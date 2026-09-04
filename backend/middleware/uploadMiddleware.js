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

// Les pièces jointes sont stockées sur disque et servies telles quelles par
// express.static('uploads') (voir server.js) : express.static déduit le
// Content-Type renvoyé au navigateur de l'EXTENSION du fichier, pas du
// mimetype d'origine de l'upload. Ne valider que file.mimetype (contrôlé par
// le client, donc trivialement falsifiable) laisserait passer un fichier
// envoyé avec un Content-Type "image/jpeg" usurpé mais nommé "x.html" - le
// fichier serait alors stocké et re-servi comme text/html, exécutant tout
// script qu'il contient dans l'origine de l'API si le lien est ouvert
// directement. D'où la double vérification mimetype + extension ici.
const allowedMimeToExt = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
};

const fileFilter = (req, file, cb) => {
  const allowedExts = allowedMimeToExt[file.mimetype];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExts && allowedExts.includes(ext)) cb(null, true);
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