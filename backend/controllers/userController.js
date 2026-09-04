// controllers/userController.js - Gestion des utilisateurs (Admin)
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logAction = require('../utils/auditLogger');
const { sendAccountActivation } = require('../utils/emailService');

const ROLES = ['client', 'manager', 'admin', 'super_admin', 'visitor'];

// @desc    Créer un utilisateur (réservé au SuperAdministrateur)
//          Un mot de passe temporaire aléatoire est généré côté serveur
//          (jamais transmis) ; le compte reste inactif jusqu'à ce que le
//          nouvel utilisateur active son compte via le lien reçu par email.
// @route   POST /api/users
// @access  Private/SuperAdmin
const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const createUser = async (req, res) => {
  try {
    const { name, email, phone, role, companyName, address, city, country } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, message: 'Nom, email et téléphone sont obligatoires' });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ success: false, message: 'Adresse email invalide' });
    }

    if (role && !ROLES.includes(role)) {
      return res.status(400).json({ success: false, message: 'Rôle invalide' });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Un utilisateur avec cet email existe déjà' });
    }

    // Mot de passe temporaire aléatoire — jamais communiqué : l'utilisateur
    // définit son propre mot de passe via le lien d'activation.
    const tempPassword = crypto.randomBytes(20).toString('hex');

    const user = await User.create({
      name,
      email,
      phone,
      password: tempPassword,
      role: role || 'client',
      isActive: false,
      companyName,
      address,
      city,
      country,
    });

    const activationToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    const activationLink = `${process.env.FRONTEND_URL}/#/activate-account?token=${activationToken}`;

    let emailSent = true;
    try {
      await sendAccountActivation(user.email, user.name, user.role, activationLink);
      user.activationEmailStatus = 'sent';
      user.activationEmailSentAt = new Date();
      user.activationEmailError = undefined;
    } catch (error) {
      emailSent = false;
      user.activationEmailStatus = 'failed';
      user.activationEmailError = error.message;
      console.error(`Erreur d'envoi de l'email d'activation à ${user.email}:`, error);
    }
    await user.save();

    await logAction({
      action: 'create',
      entityType: 'user',
      entityId: user._id,
      entityName: user.name,
      changes: { new: { role: user.role, email: user.email } },
      req,
    });

    res.status(201).json({
      _id:      user._id,
      name:     user.name,
      email:    user.email,
      phone:    user.phone,
      role:     user.role,
      isActive: user.isActive,
      emailSent,
      activationEmailStatus: user.activationEmailStatus,
      activationEmailError: user.activationEmailError,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message || 'Erreur lors de la création de l\'utilisateur' });
  }
};

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
    // La création de compte est réservée au SuperAdministrateur (voir
    // createUser ci-dessus) : la modification de rôle doit suivre la même
    // règle, sinon un simple admin pourrait s'auto-promouvoir (ou promouvoir
    // n'importe qui) super_admin via cette route, qui n'exige que
    // authorize('admin','super_admin'). Un simple admin ne peut pas non
    // plus toucher un compte déjà super_admin (rôle, statut...).
    if (req.body.role && req.body.role !== user.role && req.user.role !== 'super_admin') {
      return res.status(403).json({ success: false, message: 'Seul un Super Administrateur peut modifier le rôle d\'un utilisateur.' });
    }
    if (user.role === 'super_admin' && req.user.role !== 'super_admin') {
      return res.status(403).json({ success: false, message: 'Seul un Super Administrateur peut modifier ce compte.' });
    }

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
    if (user.role === 'super_admin' && req.user.role !== 'super_admin') {
      return res.status(403).json({ success: false, message: 'Seul un Super Administrateur peut supprimer ce compte.' });
    }
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
    if (user.role === 'super_admin' && req.user.role !== 'super_admin') {
      return res.status(403).json({ success: false, message: 'Seul un Super Administrateur peut modifier ce compte.' });
    }
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

// @desc    Renvoyer l'email d'activation d'un compte (ex: échec initial)
// @route   POST /api/users/:id/resend-activation
// @access  Private/Admin
const resendActivationEmail = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
  }
  if (user.isActive) {
    return res.status(400).json({ success: false, message: 'Ce compte est déjà activé.' });
  }

  const activationToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  const activationLink = `${process.env.FRONTEND_URL}/#/activate-account?token=${activationToken}`;

  try {
    await sendAccountActivation(user.email, user.name, user.role, activationLink);
    user.activationEmailStatus = 'sent';
    user.activationEmailSentAt = new Date();
    user.activationEmailError = undefined;
    await user.save();
    return res.json({ success: true, message: 'Email d\'activation renvoyé avec succès.', activationEmailStatus: 'sent' });
  } catch (error) {
    user.activationEmailStatus = 'failed';
    user.activationEmailError = error.message;
    await user.save();
    console.error(`Erreur de renvoi de l'email d'activation à ${user.email}:`, error);
    return res.status(502).json({ success: false, message: "L'envoi de l'email a échoué.", activationEmailStatus: 'failed', activationEmailError: error.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  toggleUserStatus,
  resendActivationEmail,
};