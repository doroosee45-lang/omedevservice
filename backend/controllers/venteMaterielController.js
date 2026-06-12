const VenteMaterielProduct = require('../models/VenteMaterielProduct');
const VenteMaterielOrder = require('../models/VenteMaterielOrder');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

// Produits par défaut pour initialisation du catalogue
const DEFAULT_PRODUCTS = [
  { name: 'Ordinateur Portable Professionnel', category: 'Ordinateurs', description: 'PC portable 15.6" Intel Core i7, 16 Go RAM, SSD 512 Go', price: 899, stock: 10, image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=250&fit=crop' },
  { name: 'Climatiseur Mobile 12000 BTU', category: 'Climatisation', description: 'Climatiseur monobloc, mode froid/chauffage, télécommande', price: 449, stock: 5, image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=250&fit=crop' },
  { name: 'Caméra de Surveillance 4K', category: 'Sécurité', description: 'Caméra IP extérieure, vision nocturne, détection mouvement', price: 129, stock: 20, image: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=400&h=250&fit=crop' },
  { name: 'Switch Gigabit 24 ports', category: 'Réseau', description: 'Switch administrable, 24 ports Gigabit, PoE+', price: 349, stock: 8, image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop' },
  { name: 'SSD NVMe 1 To', category: 'Composants', description: 'Disque SSD ultra-rapide, lecture 7000 Mo/s', price: 109, stock: 30, image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=250&fit=crop' },
  { name: 'Souris & Clavier sans fil', category: 'Accessoires', description: 'Set ergonomique, connexion 2.4 GHz, longue autonomie', price: 49, stock: 25, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=250&fit=crop' },
  { name: 'Serveur Tour Dell PowerEdge', category: 'Serveurs', description: 'Intel Xeon, 32 Go RAM, 4 baies SAS, RAID intégré', price: 1899, stock: 3, image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&h=250&fit=crop' },
  { name: 'Kit Caméras Wi-Fi (4 caméras)', category: 'Sécurité', description: 'Pack 4 caméras intérieures, vision 360°, app mobile', price: 199, stock: 12, image: 'https://images.unsplash.com/photo-1580128665081-1fbf9b8a1c3d?w=400&h=250&fit=crop' },
  { name: 'Climatiseur Réversible Gainable', category: 'Climatisation', description: 'Puissance 18000 BTU, discret, haute efficacité énergétique', price: 2290, stock: 2, image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=250&fit=crop' },
];

// ==================== PRODUITS ====================

// @desc    Lister les produits actifs (public) — seed auto si vide
// @route   GET /api/vente-materiel/products
// @access  Public
const getProducts = async (req, res) => {
  let products = await VenteMaterielProduct.find({ isActive: true }).sort({ category: 1, name: 1 });

  if (products.length === 0) {
    products = await VenteMaterielProduct.insertMany(DEFAULT_PRODUCTS);
  }

  res.json(products);
};

// @desc    Tous les produits (admin, y compris inactifs)
// @route   GET /api/vente-materiel/products/all
// @access  Admin
const getAllProducts = async (req, res) => {
  const products = await VenteMaterielProduct.find().sort({ createdAt: -1 });
  res.json(products);
};

// @desc    Créer un produit
// @route   POST /api/vente-materiel/products
// @access  Admin
const createProduct = async (req, res) => {
  const { name, category, description, price, stock, image, specifications } = req.body;
  const product = await VenteMaterielProduct.create({ name, category, description, price, stock, image, specifications });
  res.status(201).json(product);
};

// @desc    Modifier un produit
// @route   PUT /api/vente-materiel/products/:id
// @access  Admin
const updateProduct = async (req, res) => {
  const product = await VenteMaterielProduct.findById(req.params.id);
  if (!product) { res.status(404); throw new Error('Produit non trouvé'); }
  const { name, category, description, price, stock, image, specifications, isActive } = req.body;
  if (name !== undefined) product.name = name;
  if (category !== undefined) product.category = category;
  if (description !== undefined) product.description = description;
  if (price !== undefined) product.price = price;
  if (stock !== undefined) product.stock = stock;
  if (image !== undefined) product.image = image;
  if (specifications !== undefined) product.specifications = specifications;
  if (isActive !== undefined) product.isActive = isActive;
  const updated = await product.save();
  res.json(updated);
};

// @desc    Supprimer un produit
// @route   DELETE /api/vente-materiel/products/:id
// @access  Admin
const deleteProduct = async (req, res) => {
  const product = await VenteMaterielProduct.findById(req.params.id);
  if (!product) { res.status(404); throw new Error('Produit non trouvé'); }
  await product.deleteOne();
  res.json({ message: 'Produit supprimé' });
};

// ==================== COMMANDES ====================

// @desc    Créer une commande (public)
// @route   POST /api/vente-materiel/orders
// @access  Public
const createOrder = async (req, res) => {
  const { productId, quantity, fullName, email, phone, address, city, postalCode, country, paymentMethod } = req.body;

  const product = await VenteMaterielProduct.findById(productId);
  if (!product) { res.status(404); throw new Error('Produit non trouvé'); }
  if (!product.isActive) { res.status(400); throw new Error('Produit indisponible'); }

  const unitPrice = product.price;
  const totalPrice = unitPrice * (quantity || 1);

  const order = await VenteMaterielOrder.create({
    product: product._id,
    productSnapshot: { name: product.name, category: product.category, price: product.price, reference: product.reference },
    quantity: quantity || 1,
    unitPrice,
    totalPrice,
    fullName,
    email,
    phone,
    address,
    city,
    postalCode,
    country: country || 'RDC',
    paymentMethod: paymentMethod || 'card',
    user: req.user?._id,
  });

  // Décrémenter le stock
  if (product.stock > 0) {
    product.stock = Math.max(0, product.stock - (quantity || 1));
    await product.save();
  }

  // Email client
  try {
    await transporter.sendMail({
      from: `"OMDEVE Services" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Confirmation de commande ${order.orderNumber}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#2563eb">Commande confirmée !</h2>
          <p>Bonjour ${fullName},</p>
          <p>Votre commande a été enregistrée avec succès.</p>
          <table style="width:100%;border-collapse:collapse;margin:16px 0">
            <tr><td style="padding:8px;background:#f3f4f6"><strong>N° de commande</strong></td><td style="padding:8px"><strong style="color:#2563eb;font-size:18px">${order.orderNumber}</strong></td></tr>
            <tr><td style="padding:8px;background:#f3f4f6"><strong>Produit</strong></td><td style="padding:8px">${product.name}</td></tr>
            <tr><td style="padding:8px;background:#f3f4f6"><strong>Quantité</strong></td><td style="padding:8px">${quantity || 1}</td></tr>
            <tr><td style="padding:8px;background:#f3f4f6"><strong>Total</strong></td><td style="padding:8px">${totalPrice.toLocaleString('fr-FR')} €</td></tr>
            <tr><td style="padding:8px;background:#f3f4f6"><strong>Paiement</strong></td><td style="padding:8px">${paymentMethod || 'card'}</td></tr>
          </table>
          <p>Notre équipe vous contactera sous 24h pour finaliser la livraison.</p>
          <hr style="margin:20px 0">
          <p style="font-size:12px;color:#666">OMDEVE Services — contact@omedev.com</p>
        </div>
      `,
    });
  } catch (e) { console.error('Email erreur:', e); }

  // Email admin
  try {
    await transporter.sendMail({
      from: `"OMDEVE Services" <${process.env.EMAIL_USER}>`,
      to: process.env.SALES_EMAIL || process.env.EMAIL_USER,
      subject: `Nouvelle commande matériel — ${order.orderNumber}`,
      html: `<p><strong>${order.orderNumber}</strong> | ${fullName} | ${email} | ${phone}</p><p>Produit: ${product.name} × ${quantity || 1} = ${totalPrice} €</p><p>Livraison: ${address}, ${city}, ${country}</p>`,
    });
  } catch (e) { console.error('Email admin erreur:', e); }

  res.status(201).json(order);
};

// @desc    Suivre une commande par numéro (public)
// @route   GET /api/vente-materiel/orders/track/:orderNumber
// @access  Public
const trackOrder = async (req, res) => {
  const order = await VenteMaterielOrder.findOne({ orderNumber: req.params.orderNumber });
  if (!order) { res.status(404); throw new Error('Commande introuvable'); }
  res.json({ orderNumber: order.orderNumber, status: order.status, productName: order.productSnapshot?.name, totalPrice: order.totalPrice, createdAt: order.createdAt });
};

// @desc    Mes commandes (client connecté)
// @route   GET /api/vente-materiel/orders/my-orders
// @access  Private
const getMyOrders = async (req, res) => {
  const orders = await VenteMaterielOrder.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
};

// @desc    Stats pour admin
// @route   GET /api/vente-materiel/orders/stats
// @access  Admin
const getStats = async (req, res) => {
  const [total, pending, confirmed, processing, shipped, delivered, cancelled, revenueAgg, productsCount] = await Promise.all([
    VenteMaterielOrder.countDocuments(),
    VenteMaterielOrder.countDocuments({ status: 'pending' }),
    VenteMaterielOrder.countDocuments({ status: 'confirmed' }),
    VenteMaterielOrder.countDocuments({ status: 'processing' }),
    VenteMaterielOrder.countDocuments({ status: 'shipped' }),
    VenteMaterielOrder.countDocuments({ status: 'delivered' }),
    VenteMaterielOrder.countDocuments({ status: 'cancelled' }),
    VenteMaterielOrder.aggregate([{ $match: { status: { $ne: 'cancelled' } } }, { $group: { _id: null, total: { $sum: '$totalPrice' } } }]),
    VenteMaterielProduct.countDocuments({ isActive: true }),
  ]);

  const revenue = revenueAgg[0]?.total || 0;
  res.json({ total, pending, confirmed, processing, shipped, delivered, cancelled, revenue, productsCount });
};

// @desc    Toutes les commandes (admin)
// @route   GET /api/vente-materiel/orders
// @access  Admin
const getAllOrders = async (req, res) => {
  const { status, search, page = 1, limit = 50 } = req.query;
  const query = {};
  if (status && status !== 'all') query.status = status;
  if (search) {
    query.$or = [
      { orderNumber: { $regex: search, $options: 'i' } },
      { fullName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }
  const orders = await VenteMaterielOrder.find(query)
    .populate('product', 'name category reference')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));
  res.json(orders);
};

// @desc    Une commande par ID (admin)
// @route   GET /api/vente-materiel/orders/:id
// @access  Admin
const getOrderById = async (req, res) => {
  const order = await VenteMaterielOrder.findById(req.params.id).populate('product', 'name category reference price');
  if (!order) { res.status(404); throw new Error('Commande introuvable'); }
  res.json(order);
};

// @desc    Modifier le statut d'une commande
// @route   PUT /api/vente-materiel/orders/:id/status
// @access  Admin
const updateOrderStatus = async (req, res) => {
  const { status, paymentStatus, adminNotes } = req.body;
  const order = await VenteMaterielOrder.findById(req.params.id);
  if (!order) { res.status(404); throw new Error('Commande introuvable'); }
  if (status) order.status = status;
  if (paymentStatus) order.paymentStatus = paymentStatus;
  if (adminNotes !== undefined) order.adminNotes = adminNotes;
  const updated = await order.save();
  res.json(updated);
};

// @desc    Supprimer une commande
// @route   DELETE /api/vente-materiel/orders/:id
// @access  Admin
const deleteOrder = async (req, res) => {
  const order = await VenteMaterielOrder.findById(req.params.id);
  if (!order) { res.status(404); throw new Error('Commande introuvable'); }
  await order.deleteOne();
  res.json({ message: 'Commande supprimée' });
};

module.exports = {
  getProducts, getAllProducts, createProduct, updateProduct, deleteProduct,
  createOrder, trackOrder, getMyOrders, getStats, getAllOrders, getOrderById, updateOrderStatus, deleteOrder,
};
