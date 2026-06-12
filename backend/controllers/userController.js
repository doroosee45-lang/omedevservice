// controllers/userController.js - Gestion des utilisateurs (Admin)
const User = require('../models/User');
const logAction = require('../utils/auditLogger');

// @desc    Obtenir tous les utilisateurs
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  const users = await User.find({}).select('-password');
  res.json(users);
};

// @desc    Obtenir un utilisateur par ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('Utilisateur non trouvé');
  }
};

// @desc    Mettre à jour un utilisateur
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    // Sauvegarde des anciennes valeurs pour l'audit
    const oldData = { role: user.role, isActive: user.isActive, name: user.name, email: user.email };

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.role = req.body.role || user.role;
    user.isActive = req.body.isActive !== undefined ? req.body.isActive : user.isActive;
    user.companyName = req.body.companyName || user.companyName;
    user.address = req.body.address || user.address;
    user.city = req.body.city || user.city;
    user.country = req.body.country || user.country;

    const updatedUser = await user.save();

    // Journalisation de l'action
    await logAction({
      action: 'update',
      entityType: 'user',
      entityId: user._id,
      entityName: user.name,
      changes: { old: oldData, new: { role: user.role, isActive: user.isActive, name: user.name, email: user.email } },
      req,
    });

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      role: updatedUser.role,
      isActive: updatedUser.isActive,
      companyName: updatedUser.companyName,
      address: updatedUser.address,
      city: updatedUser.city,
      country: updatedUser.country,
    });
  } else {
    res.status(404);
    throw new Error('Utilisateur non trouvé');
  }
};

// @desc    Supprimer un utilisateur
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.deleteOne();
    await logAction({ action: 'delete', entityType: 'user', entityId: user._id, entityName: user.name, req });
    res.json({ message: 'Utilisateur supprimé' });
  } else {
    res.status(404);
    throw new Error('Utilisateur non trouvé');
  }
};

// @desc    Changer le statut d'un utilisateur (activer/désactiver)
// @route   PUT /api/users/:id/toggle-status
// @access  Private/Admin
const toggleUserStatus = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    const oldStatus = user.isActive;
    user.isActive = !user.isActive;
    await user.save();
    await logAction({ action: 'toggle-status', entityType: 'user', entityId: user._id, entityName: user.name, changes: { old: oldStatus, new: user.isActive }, req });
    res.json({ message: `Utilisateur ${user.isActive ? 'activé' : 'désactivé'}`, isActive: user.isActive });
  } else {
    res.status(404);
    throw new Error('Utilisateur non trouvé');
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  toggleUserStatus,
};