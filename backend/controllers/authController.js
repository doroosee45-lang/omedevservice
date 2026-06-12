// // src/controllers/authController.js - Version complète
// const User = require('../models/User');
// const generateToken = require('../utils/generateToken');
// const jwt = require('jsonwebtoken');

// // @desc    Inscription d'un nouvel utilisateur
// // @route   POST /api/auth/register
// // @access  Public
// const registerUser = async (req, res) => {
//   const { name, email, phone, password, role } = req.body;
// if (req.body.notificationPreferences) {
//   user.notificationPreferences = { ...user.notificationPreferences, ...req.body.notificationPreferences };
// }
//   // Vérifier si l'utilisateur existe déjà
//   const userExists = await User.findOne({ email });
//   if (userExists) {
//     res.status(400);
//     throw new Error('Cet utilisateur existe déjà');
//   }

//   // Le premier utilisateur devient Super Admin (pratique pour le dev)
//   const userCount = await User.countDocuments();
//   const assignedRole = userCount === 0 ? 'super_admin' : role || 'client';

//   // Créer l'utilisateur
//   const user = await User.create({
//     name,
//     email,
//     phone,
//     password,
//     role: assignedRole,
//   });

//   if (user) {
//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       phone: user.phone,
//       role: user.role,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(400);
//     throw new Error('Données utilisateur invalides');
//   }
// };

// // @desc    Connexion d'un utilisateur
// // @route   POST /api/auth/login
// // @access  Public
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   // Chercher l'utilisateur et sélectionner le mot de passe (car il est 'select: false')
//   const user = await User.findOne({ email }).select('+password');

//   if (user && (await user.matchPassword(password))) {
//     // Vérifier si le compte est actif
//     if (!user.isActive) {
//       res.status(401);
//       throw new Error('Votre compte a été désactivé. Veuillez contacter un administrateur.');
//     }

//     // Stocker le refresh token (optionnel - pour plus de sécurité)
//     const refreshToken = jwt.sign(
//       { id: user._id },
//       process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
//       { expiresIn: '7d' }
//     );

//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       phone: user.phone,
//       role: user.role,
//       token: generateToken(user._id),
//       refreshToken,
//     });
//   } else {
//     res.status(401);
//     throw new Error('Email ou mot de passe incorrect');
//   }
// };

// // @desc    Déconnexion (invalide le token côté client)
// // @route   POST /api/auth/logout
// // @access  Private
// const logoutUser = async (req, res) => {
//   // Le client doit supprimer le token localement
//   // Le serveur peut optionnellement blacklister le token
//   res.json({ message: 'Déconnexion réussie' });
// };

// // @desc    Obtenir le profil de l'utilisateur connecté
// // @route   GET /api/auth/profile
// // @access  Private
// const getUserProfile = async (req, res) => {
//   const user = await User.findById(req.user._id).select('-password');
//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404);
//     throw new Error('Utilisateur non trouvé');
//   }
// };

// // @desc    Mettre à jour le profil de l'utilisateur connecté
// // @route   PUT /api/auth/profile
// // @access  Private
// const updateUserProfile = async (req, res) => {
//   const user = await User.findById(req.user._id);

//   if (user) {
//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;
//     user.phone = req.body.phone || user.phone;
//     user.companyName = req.body.companyName || user.companyName;
//     user.address = req.body.address || user.address;
//     user.city = req.body.city || user.city;
//     user.country = req.body.country || user.country;
//     user.avatar = req.body.avatar || user.avatar;

//     const updatedUser = await user.save();
//     res.json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       phone: updatedUser.phone,
//       role: updatedUser.role,
//       companyName: updatedUser.companyName,
//       address: updatedUser.address,
//       city: updatedUser.city,
//       country: updatedUser.country,
//       avatar: updatedUser.avatar,
//       token: generateToken(updatedUser._id),
//     });
//   } else {
//     res.status(404);
//     throw new Error('Utilisateur non trouvé');
//   }
// };

// // @desc    Changer le mot de passe
// // @route   PUT /api/auth/change-password
// // @access  Private
// const changePassword = async (req, res) => {
//   const { currentPassword, newPassword } = req.body;
//   const user = await User.findById(req.user._id).select('+password');

//   if (user && (await user.matchPassword(currentPassword))) {
//     user.password = newPassword;
//     await user.save();
//     res.json({ message: 'Mot de passe changé avec succès' });
//   } else {
//     res.status(401);
//     throw new Error('Mot de passe actuel incorrect');
//   }
// };

// // @desc    Demander la réinitialisation du mot de passe
// // @route   POST /api/auth/forgot-password
// // @access  Public
// const forgotPassword = async (req, res) => {
//   const { email } = req.body;
//   const user = await User.findOne({ email });

//   if (!user) {
//     res.status(404);
//     throw new Error('Aucun utilisateur avec cet email');
//   }

//   // Générer un token de réinitialisation (valable 1 heure)
//   const resetToken = jwt.sign(
//     { id: user._id },
//     process.env.JWT_SECRET,
//     { expiresIn: '1h' }
//   );

//   // Ici, envoyer un email avec le lien de réinitialisation
//   // Lien: `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`
  
//   // Pour le développement, on retourne le token (à supprimer en production)
//   res.json({
//     message: 'Email de réinitialisation envoyé',
//     resetToken: process.env.NODE_ENV === 'development' ? resetToken : undefined,
//   });
// };

// // @desc    Réinitialiser le mot de passe
// // @route   POST /api/auth/reset-password
// // @access  Public
// const resetPassword = async (req, res) => {
//   const { token, newPassword } = req.body;

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id);

//     if (!user) {
//       res.status(400);
//       throw new Error('Token invalide');
//     }

//     user.password = newPassword;
//     await user.save();

//     res.json({ message: 'Mot de passe réinitialisé avec succès' });
//   } catch (error) {
//     res.status(400);
//     throw new Error('Token invalide ou expiré');
//   }
// };

// // @desc    Rafraîchir le token JWT
// // @route   POST /api/auth/refresh-token
// // @access  Public
// const refreshToken = async (req, res) => {
//   const { refreshToken } = req.body;

//   if (!refreshToken) {
//     res.status(401);
//     throw new Error('Refresh token requis');
//   }

//   try {
//     const decoded = jwt.verify(
//       refreshToken,
//       process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET
//     );
//     const user = await User.findById(decoded.id);

//     if (!user) {
//       res.status(401);
//       throw new Error('Utilisateur non trouvé');
//     }

//     res.json({
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     res.status(401);
//     throw new Error('Refresh token invalide ou expiré');
//   }
// };

// module.exports = {
//   registerUser,
//   loginUser,
//   logoutUser,
//   getUserProfile,
//   updateUserProfile,
//   changePassword,
//   forgotPassword,
//   resetPassword,
//   refreshToken,
// };


// src/controllers/authController.js
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const jwt = require('jsonwebtoken');

// @desc    Inscription d'un nouvel utilisateur
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, phone, password, role } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('Cet utilisateur existe déjà');
  }

  // Le premier utilisateur inscrit devient automatiquement super_admin
  const userCount = await User.countDocuments();
  const assignedRole = userCount === 0 ? 'super_admin' : role || 'client';

  const user = await User.create({ name, email, phone, password, role: assignedRole });

  if (user) {
    res.status(201).json({
      _id:   user._id,
      name:  user.name,
      email: user.email,
      phone: user.phone,
      role:  user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Données utilisateur invalides');
  }
};

// @desc    Connexion d'un utilisateur
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (user && (await user.matchPassword(password))) {
    if (!user.isActive) {
      res.status(401);
      throw new Error('Votre compte a été désactivé. Veuillez contacter un administrateur.');
    }

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      _id:          user._id,
      name:         user.name,
      email:        user.email,
      phone:        user.phone,
      role:         user.role,
      token:        generateToken(user._id),
      refreshToken,
    });
  } else {
    res.status(401);
    throw new Error('Email ou mot de passe incorrect');
  }
};

// @desc    Déconnexion
// @route   POST /api/auth/logout
// @access  Private
const logoutUser = async (req, res) => {
  res.json({ message: 'Déconnexion réussie' });
};

// @desc    Obtenir le profil de l'utilisateur connecté
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('Utilisateur non trouvé');
  }
};

// @desc    Mettre à jour le profil
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name        = req.body.name        || user.name;
    user.email       = req.body.email       || user.email;
    user.phone       = req.body.phone       || user.phone;
    user.companyName = req.body.companyName || user.companyName;
    user.address     = req.body.address     || user.address;
    user.city        = req.body.city        || user.city;
    user.country     = req.body.country     || user.country;
    user.avatar      = req.body.avatar      || user.avatar;

    if (req.body.notificationPreferences) {
      user.notificationPreferences = {
        ...user.notificationPreferences,
        ...req.body.notificationPreferences,
      };
    }

    const updatedUser = await user.save();
    res.json({
      _id:         updatedUser._id,
      name:        updatedUser.name,
      email:       updatedUser.email,
      phone:       updatedUser.phone,
      role:        updatedUser.role,
      companyName: updatedUser.companyName,
      address:     updatedUser.address,
      city:        updatedUser.city,
      country:     updatedUser.country,
      avatar:      updatedUser.avatar,
      token:       generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('Utilisateur non trouvé');
  }
};

// @desc    Changer le mot de passe
// @route   PUT /api/auth/change-password
// @access  Private
const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id).select('+password');

  if (user && (await user.matchPassword(currentPassword))) {
    user.password = newPassword;
    await user.save();
    res.json({ message: 'Mot de passe changé avec succès' });
  } else {
    res.status(401);
    throw new Error('Mot de passe actuel incorrect');
  }
};

// @desc    Demander la réinitialisation du mot de passe
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error('Aucun utilisateur avec cet email');
  }

  const resetToken = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  // TODO (production) : envoyer un email avec le lien suivant :
  // `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`

  res.json({
    message: 'Email de réinitialisation envoyé',
    // Exposé uniquement en développement pour les tests
    resetToken: process.env.NODE_ENV === 'development' ? resetToken : undefined,
  });
};

// @desc    Réinitialiser le mot de passe via token
// @route   POST /api/auth/reset-password
// @access  Public
const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(400);
      throw new Error('Token invalide');
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Mot de passe réinitialisé avec succès' });
  } catch (error) {
    res.status(400);
    throw new Error('Token invalide ou expiré');
  }
};

// @desc    Rafraîchir le token JWT
// @route   POST /api/auth/refresh-token
// @access  Public
const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(401);
    throw new Error('Refresh token requis');
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET
    );
    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(401);
      throw new Error('Utilisateur non trouvé');
    }

    res.json({ token: generateToken(user._id) });
  } catch (error) {
    res.status(401);
    throw new Error('Refresh token invalide ou expiré');
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  refreshToken,
};