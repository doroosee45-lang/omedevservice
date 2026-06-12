const VenteMaterielProduct = require('../models/VenteMaterielProduct');
const VenteMaterielOrder   = require('../models/VenteMaterielOrder');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

const sendMail = (opts) => transporter.sendMail(opts).catch(e => console.error('Email erreur:', e.message));

// Produits par défaut si catalogue vide
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

const getProducts = async (req, res) => {
  try {
    let products = await VenteMaterielProduct.find({ isActive: true }).sort({ category: 1, name: 1 });
    if (products.length === 0) {
      products = await VenteMaterielProduct.insertMany(DEFAULT_PRODUCTS);
    }
    res.json(products);
  } catch (error) {
    console.error('getProducts:', error.message);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await VenteMaterielProduct.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('getAllProducts:', error.message);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, category, description, price, stock, image, specifications, isActive } = req.body;
    if (!name || !description || !price) {
      return res.status(400).json({ success: false, message: 'Nom, description et prix sont requis' });
    }
    const product = await VenteMaterielProduct.create({ name, category, description, price, stock, image, specifications, isActive });
    res.status(201).json(product);
  } catch (error) {
    console.error('createProduct:', error.message);
    res.status(500).json({ success: false, message: error.message || 'Erreur serveur' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await VenteMaterielProduct.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Produit non trouvé' });
    const fields = ['name', 'category', 'description', 'price', 'stock', 'image', 'specifications', 'isActive'];
    fields.forEach(f => { if (req.body[f] !== undefined) product[f] = req.body[f]; });
    const updated = await product.save();
    res.json(updated);
  } catch (error) {
    console.error('updateProduct:', error.message);
    res.status(500).json({ success: false, message: error.message || 'Erreur serveur' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await VenteMaterielProduct.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Produit non trouvé' });
    await product.deleteOne();
    res.json({ message: 'Produit supprimé' });
  } catch (error) {
    console.error('deleteProduct:', error.message);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

// ==================== COMMANDES ====================

const createOrder = async (req, res) => {
  try {
    const { productId, quantity, fullName, email, phone, address, city, postalCode, country, paymentMethod } = req.body;

    if (!productId || !fullName || !email || !phone || !address || !city) {
      return res.status(400).json({ success: false, message: 'Champs obligatoires manquants' });
    }

    const product = await VenteMaterielProduct.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: 'Produit non trouvé' });
    if (!product.isActive) return res.status(400).json({ success: false, message: 'Produit indisponible' });

    const qty = Math.max(1, parseInt(quantity) || 1);
    const unitPrice  = product.price;
    const totalPrice = unitPrice * qty;

    const order = await VenteMaterielOrder.create({
      product:         product._id,
      productSnapshot: { name: product.name, category: product.category, price: product.price, reference: product.reference },
      quantity:        qty,
      unitPrice,
      totalPrice,
      fullName,
      email,
      phone,
      address,
      city,
      postalCode:    postalCode || '',
      country:       country || 'RDC',
      paymentMethod: paymentMethod || 'mobile',
      user:          req.user?._id,
    });

    // Décrémenter le stock
    product.stock = Math.max(0, product.stock - qty);
    await product.save();

    // Email client
    sendMail({
      from:    `"OMDEVE Services" <${process.env.EMAIL_USER}>`,
      to:      email,
      subject: `Confirmation de commande ${order.orderNumber}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#2563eb">Commande confirmée !</h2>
          <p>Bonjour ${fullName},</p>
          <p>Votre commande a été enregistrée avec succès.</p>
          <table style="width:100%;border-collapse:collapse;margin:16px 0">
            <tr><td style="padding:8px;background:#f3f4f6"><strong>N° de commande</strong></td>
                <td style="padding:8px"><strong style="color:#2563eb;font-size:18px">${order.orderNumber}</strong></td></tr>
            <tr><td style="padding:8px;background:#f3f4f6"><strong>Produit</strong></td>
                <td style="padding:8px">${product.name}</td></tr>
            <tr><td style="padding:8px;background:#f3f4f6"><strong>Quantité</strong></td>
                <td style="padding:8px">${qty}</td></tr>
            <tr><td style="padding:8px;background:#f3f4f6"><strong>Total</strong></td>
                <td style="padding:8px">${totalPrice.toLocaleString('fr-FR')} €</td></tr>
          </table>
          <p>Notre équipe vous contactera sous 24h pour finaliser la livraison.</p>
          <hr style="margin:20px 0">
          <p style="font-size:12px;color:#666">OMDEVE Services</p>
        </div>
      `,
    });

    // Email admin
    sendMail({
      from:    `"OMDEVE Services" <${process.env.EMAIL_USER}>`,
      to:      process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
      subject: `Nouvelle commande — ${order.orderNumber}`,
      html:    `<p><strong>${order.orderNumber}</strong> | ${fullName} | ${email} | ${phone}</p><p>Produit: ${product.name} × ${qty} = ${totalPrice} €</p><p>Livraison: ${address}, ${city}, ${country || 'RDC'}</p>`,
    });

    res.status(201).json(order);
  } catch (error) {
    console.error('createOrder:', error.message);
    res.status(500).json({ success: false, message: error.message || 'Erreur serveur' });
  }
};

const trackOrder = async (req, res) => {
  try {
    const order = await VenteMaterielOrder.findOne({ orderNumber: req.params.orderNumber });
    if (!order) return res.status(404).json({ success: false, message: 'Commande introuvable' });
    res.json({
      orderNumber: order.orderNumber,
      status:      order.status,
      productSnapshot: order.productSnapshot,
      quantity:    order.quantity,
      totalPrice:  order.totalPrice,
      customer:    { city: order.city, country: order.country },
      createdAt:   order.createdAt,
    });
  } catch (error) {
    console.error('trackOrder:', error.message);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await VenteMaterielOrder.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('getMyOrders:', error.message);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

const getStats = async (req, res) => {
  try {
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
    res.json({ total, pending, confirmed, processing, shipped, delivered, cancelled, revenue: revenueAgg[0]?.total || 0, productsCount });
  } catch (error) {
    console.error('getStats:', error.message);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const { status, search, page = 1, limit = 50 } = req.query;
    const query = {};
    if (status && status !== 'all') query.status = status;
    if (search) {
      query.$or = [
        { orderNumber: { $regex: search, $options: 'i' } },
        { fullName:    { $regex: search, $options: 'i' } },
        { email:       { $regex: search, $options: 'i' } },
      ];
    }
    const orders = await VenteMaterielOrder.find(query)
      .populate('product', 'name category reference')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(orders);
  } catch (error) {
    console.error('getAllOrders:', error.message);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await VenteMaterielOrder.findById(req.params.id).populate('product', 'name category reference price');
    if (!order) return res.status(404).json({ success: false, message: 'Commande introuvable' });
    res.json(order);
  } catch (error) {
    console.error('getOrderById:', error.message);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await VenteMaterielOrder.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Commande introuvable' });
    const { status, paymentStatus, adminNotes } = req.body;
    if (status)              order.status        = status;
    if (paymentStatus)       order.paymentStatus = paymentStatus;
    if (adminNotes !== undefined) order.adminNotes = adminNotes;
    const updated = await order.save();
    res.json(updated);
  } catch (error) {
    console.error('updateOrderStatus:', error.message);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await VenteMaterielOrder.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Commande introuvable' });
    await order.deleteOne();
    res.json({ message: 'Commande supprimée' });
  } catch (error) {
    console.error('deleteOrder:', error.message);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

module.exports = {
  getProducts, getAllProducts, createProduct, updateProduct, deleteProduct,
  createOrder, trackOrder, getMyOrders, getStats, getAllOrders, getOrderById, updateOrderStatus, deleteOrder,
};
