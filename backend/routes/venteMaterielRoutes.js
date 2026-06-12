const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  getProducts, getAllProducts, createProduct, updateProduct, deleteProduct,
  createOrder, trackOrder, getMyOrders, getStats, getAllOrders, getOrderById, updateOrderStatus, deleteOrder,
} = require('../controllers/venteMaterielController');

// ===== PRODUITS =====
router.get('/products', getProducts);                                              // Public — catalogue actif (+ seed auto)
router.get('/products/all', protect, authorize('admin', 'super_admin'), getAllProducts); // Admin — tous produits

router.route('/products/:id')
  .put(protect, authorize('admin', 'super_admin'), updateProduct)
  .delete(protect, authorize('admin', 'super_admin'), deleteProduct);

router.post('/products', protect, authorize('admin', 'super_admin'), createProduct);

// ===== COMMANDES =====
router.post('/orders', createOrder);                                               // Public — passer une commande
router.get('/orders/track/:orderNumber', trackOrder);                              // Public — suivi par numéro
router.get('/orders/my-orders', protect, getMyOrders);                             // Client — ses commandes
router.get('/orders/stats', protect, authorize('admin', 'super_admin'), getStats); // Admin — statistiques

router.get('/orders', protect, authorize('admin', 'super_admin'), getAllOrders);   // Admin — toutes commandes

router.route('/orders/:id')
  .get(protect, authorize('admin', 'super_admin'), getOrderById)
  .delete(protect, authorize('admin', 'super_admin'), deleteOrder);

router.put('/orders/:id/status', protect, authorize('admin', 'super_admin'), updateOrderStatus);

module.exports = router;
