// src/controllers/articleController.js - Gestion des articles de blog
const https = require('https');
const Article = require('../models/Article');
const { sendArticleNotification } = require('./newsletterController');
const cloudinary = require('../config/cloudinary');

// Cloudinary signe chaque upload avec un timestamp et rejette toute
// requête dont l'horloge s'écarte de plus d'une heure de l'heure réelle
// ("stale request"). L'horloge système de ce serveur n'est pas fiable à
// 100% (observé en dev), donc plutôt que de faire confiance à Date.now(),
// on récupère l'heure réelle directement depuis l'en-tête Date de la
// réponse HTTPS de Cloudinary lui-même juste avant l'upload - fiable, et
// ça évite toute dépendance à un service tiers. Si ce contrôle échoue
// (réseau indisponible...), on retombe sur l'horloge locale plutôt que
// de bloquer complètement l'upload.
const getReliableTimestamp = () =>
  new Promise((resolve) => {
    const req = https.request(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/ping`,
      { method: 'HEAD', timeout: 5000 },
      (res) => {
        const real = Date.parse(res.headers.date);
        resolve(Number.isNaN(real) ? Math.floor(Date.now() / 1000) : Math.floor(real / 1000));
      }
    );
    req.on('error', () => resolve(Math.floor(Date.now() / 1000)));
    req.on('timeout', () => { req.destroy(); resolve(Math.floor(Date.now() / 1000)); });
    req.end();
  });

// Les images d'articles uploadées sont stockées en chemin RELATIF
// ("/uploads/articles/xxx.jpg") - jamais avec un hôte figé en base. La
// base de données est partagée entre l'environnement local et la
// production (même cluster MongoDB Atlas) : une URL absolue enregistrée
// au moment de l'upload (ex. http://localhost:5000/...) resterait
// cassée pour toujours dès que l'article est lu depuis un autre
// environnement. On reconstruit donc l'URL absolue à la LECTURE, avec
// l'hôte réel de la requête en cours - qui est toujours le bon, quel que
// soit l'environnement d'où la lecture a lieu. Ça gère aussi
// automatiquement les anciennes valeurs déjà figées sur un hôte de dev.
//
// Important : on ne réécrit QUE (a) un chemin déjà relatif, ou (b) une
// URL absolue dont l'HÔTE est localhost/127.0.0.1 - jamais en cherchant
// juste la sous-chaîne "/uploads/" n'importe où dans l'URL. Beaucoup de
// sites tiers utilisent eux-mêmes un chemin "/uploads/" (ex. WordPress :
// "wp-content/uploads/..."), donc une simple recherche de sous-chaîne
// détournerait par erreur une vraie image externe vers notre propre
// backend, où elle n'existe pas.
const resolveImageUrl = (req, image) => {
  if (!image) return image;
  if (image.startsWith('/uploads/')) {
    return `${req.protocol}://${req.get('host')}${image}`;
  }
  try {
    const parsed = new URL(image);
    if (/^(localhost|127\.0\.0\.1)$/i.test(parsed.hostname) && parsed.pathname.startsWith('/uploads/')) {
      return `${req.protocol}://${req.get('host')}${parsed.pathname}${parsed.search}`;
    }
  } catch { /* pas une URL absolue valide : laisser tel quel */ }
  return image;
};

const withResolvedImage = (req, doc) => {
  const obj = typeof doc.toObject === 'function' ? doc.toObject() : doc;
  return { ...obj, image: resolveImageUrl(req, obj.image) };
};

const slugify = (str) =>
  (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

// @desc    Obtenir tous les articles publiés
// @route   GET /api/blog
// @access  Public
const getPublishedArticles = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 9;
  const category = req.query.category;
  const search = req.query.search;

  let query = { status: 'published' };
  if (category && category !== 'Tous') {
    query.category = category;
  }
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { excerpt: { $regex: search, $options: 'i' } },
    ];
  }

  const articles = await Article.find(query)
    .sort('-publishedAt')
    .limit(limit)
    .skip((page - 1) * limit);

  const total = await Article.countDocuments(query);

  res.json({
    articles: articles.map((a) => withResolvedImage(req, a)),
    page,
    pages: Math.ceil(total / limit),
    total,
  });
};

// @desc    Obtenir un article par son slug
// @route   GET /api/blog/:slug
// @access  Public
const getArticleBySlug = async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug, status: 'published' });

  if (article) {
    // Incrémenter le nombre de vues
    article.views += 1;
    await article.save();
    res.json(withResolvedImage(req, article));
  } else {
    return res.status(404).json({ success: false, message: 'Article non trouvé' });
  }
};

// @desc    Obtenir tous les articles (Admin)
// @route   GET /api/blog/all
// @access  Private/Admin
const getAllArticles = async (req, res) => {
  const articles = await Article.find({}).sort('-createdAt');
  res.json(articles.map((a) => withResolvedImage(req, a)));
};

// @desc    Obtenir un article par ID (Admin)
// @route   GET /api/blog/admin/:id
// @access  Private/Admin
const getArticleById = async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (article) {
    res.json(withResolvedImage(req, article));
  } else {
    return res.status(404).json({ success: false, message: 'Article non trouvé' });
  }
};

// @desc    Créer un article
// @route   POST /api/blog
// @access  Private/Admin
const createArticle = async (req, res) => {
  const { title, slug, excerpt, content, category, image, metaTitle, metaDescription, tags, status } = req.body;

  let article;
  try {
    article = await Article.create({
      title,
      slug: slugify(slug) || slugify(title),
      excerpt,
      content,
      category,
      image,
      author: req.user.name,
      authorId: req.user._id,
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || excerpt,
      tags,
      status,
      publishedAt: status === 'published' ? new Date() : null,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const message = Object.values(error.errors).map((e) => e.message).join(', ');
      return res.status(400).json({ success: false, message });
    }
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Un article avec ce titre ou ce slug existe déjà' });
    }
    console.error('Erreur création article:', error);
    return res.status(500).json({ success: false, message: 'Une erreur est survenue. Veuillez réessayer plus tard.' });
  }

  const resolved = withResolvedImage(req, article);

  // Notify newsletter subscribers if published immediately (avec l'image
  // déjà résolue en URL absolue : un email n'a pas de "page d'origine"
  // pour résoudre un chemin relatif, contrairement au frontend).
  if (article.status === 'published') {
    sendArticleNotification(resolved).catch(() => {});
  }
  res.status(201).json(resolved);
};

// @desc    Mettre à jour un article
// @route   PUT /api/blog/:id
// @access  Private/Admin
const updateArticle = async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (!article) {
    return res.status(404).json({ success: false, message: 'Article non trouvé' });
  }

  article.title = req.body.title || article.title;
  article.slug = req.body.slug ? slugify(req.body.slug) : article.slug;
  article.excerpt = req.body.excerpt || article.excerpt;
  article.content = req.body.content || article.content;
  article.category = req.body.category || article.category;
  // req.body.image !== undefined (pas ||) : une chaîne vide doit pouvoir
  // effacer volontairement l'image existante, pas retomber dessus.
  article.image = req.body.image !== undefined ? req.body.image : article.image;
  article.metaTitle = req.body.metaTitle || article.metaTitle;
  article.metaDescription = req.body.metaDescription || article.metaDescription;
  article.tags = req.body.tags || article.tags;

  const oldStatus = article.status;
  article.status = req.body.status || article.status;

  const justPublished = oldStatus !== 'published' && article.status === 'published';
  if (justPublished) {
    article.publishedAt = new Date();
  }

  let updatedArticle;
  try {
    updatedArticle = await article.save();
  } catch (error) {
    if (error.name === 'ValidationError') {
      const message = Object.values(error.errors).map((e) => e.message).join(', ');
      return res.status(400).json({ success: false, message });
    }
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Un article avec ce titre ou ce slug existe déjà' });
    }
    console.error('Erreur mise à jour article:', error);
    return res.status(500).json({ success: false, message: 'Une erreur est survenue. Veuillez réessayer plus tard.' });
  }

  const resolved = withResolvedImage(req, updatedArticle);

  // Send newsletter notification when article goes from draft/hidden → published
  if (justPublished) {
    sendArticleNotification(resolved).catch(() => {});
  }

  res.json(resolved);
};

// @desc    Supprimer un article
// @route   DELETE /api/blog/:id
// @access  Private/Admin
const deleteArticle = async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (article) {
    await article.deleteOne();
    res.json({ message: 'Article supprimé' });
  } else {
    return res.status(404).json({ success: false, message: 'Article non trouvé' });
  }
};

// @desc    Téléverser une image de couverture d'article
// @route   POST /api/blog/upload-image
// @access  Private/Admin
//
// Uploadée vers Cloudinary (stockage durable) plutôt qu'écrite sur le
// disque local : le disque de l'hébergeur est éphémère et perd tout
// fichier au redémarrage/redéploiement du service, ce qui rendait les
// images d'articles imprévisiblement cassées quel que soit le correctif
// apporté à la construction de l'URL. L'URL Cloudinary renvoyée est
// stable et absolue - resolveImageUrl la laisse déjà passer telle
// quelle, comme n'importe quelle image externe.
const uploadArticleImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Aucun fichier reçu' });
  }
  try {
    const dataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    const timestamp = await getReliableTimestamp();
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: 'omedev/articles',
      resource_type: 'image',
      timestamp,
    });
    res.status(201).json({ success: true, url: result.secure_url });
  } catch (error) {
    console.error('Erreur upload Cloudinary:', error);
    res.status(500).json({ success: false, message: "Échec de l'envoi de l'image. Veuillez réessayer." });
  }
};

module.exports = {
  getPublishedArticles,
  getArticleBySlug,
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  uploadArticleImage,
};
