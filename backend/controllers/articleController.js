// src/controllers/articleController.js - Gestion des articles de blog
const Article = require('../models/Article');
const { sendArticleNotification } = require('./newsletterController');

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
    articles,
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
    res.json(article);
  } else {
    res.status(404);
    throw new Error('Article non trouvé');
  }
};

// @desc    Obtenir tous les articles (Admin)
// @route   GET /api/blog/all
// @access  Private/Admin
const getAllArticles = async (req, res) => {
  const articles = await Article.find({}).sort('-createdAt');
  res.json(articles);
};

// @desc    Obtenir un article par ID (Admin)
// @route   GET /api/blog/admin/:id
// @access  Private/Admin
const getArticleById = async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (article) {
    res.json(article);
  } else {
    res.status(404);
    throw new Error('Article non trouvé');
  }
};

// @desc    Créer un article
// @route   POST /api/blog
// @access  Private/Admin
const createArticle = async (req, res) => {
  const { title, slug, excerpt, content, category, image, metaTitle, metaDescription, tags, status } = req.body;

  const article = await Article.create({
    title,
    slug,
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

  if (article) {
    // Notify newsletter subscribers if published immediately
    if (status === 'published') {
      sendArticleNotification(article).catch(() => {});
    }
    res.status(201).json(article);
  } else {
    res.status(400);
    throw new Error('Données d\'article invalides');
  }
};

// @desc    Mettre à jour un article
// @route   PUT /api/blog/:id
// @access  Private/Admin
const updateArticle = async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (article) {
    article.title = req.body.title || article.title;
    article.slug = req.body.slug || article.slug;
    article.excerpt = req.body.excerpt || article.excerpt;
    article.content = req.body.content || article.content;
    article.category = req.body.category || article.category;
    article.image = req.body.image || article.image;
    article.metaTitle = req.body.metaTitle || article.metaTitle;
    article.metaDescription = req.body.metaDescription || article.metaDescription;
    article.tags = req.body.tags || article.tags;
    
    const oldStatus = article.status;
    article.status = req.body.status || article.status;
    
    const justPublished = oldStatus !== 'published' && article.status === 'published';
    if (justPublished) {
      article.publishedAt = new Date();
    }

    const updatedArticle = await article.save();

    // Send newsletter notification when article goes from draft/hidden → published
    if (justPublished) {
      sendArticleNotification(updatedArticle).catch(() => {});
    }

    res.json(updatedArticle);
  } else {
    res.status(404);
    throw new Error('Article non trouvé');
  }
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
    res.status(404);
    throw new Error('Article non trouvé');
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
};