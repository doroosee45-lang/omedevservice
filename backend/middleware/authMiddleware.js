// // src/middleware/authMiddleware.js - Vérification du token JWT
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// // Middleware pour protéger les routes
// const protect = async (req, res, next) => {
//   let token;

//   // Vérifier si le token est présent dans le header Authorization
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     try {
//       // Extraire le token
//       token = req.headers.authorization.split(' ')[1];

//       // Vérifier le token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // Récupérer l'utilisateur sans son mot de passe et l'ajouter à la requête
//       req.user = await User.findById(decoded.id).select('-password');

//       if (!req.user) {
//         res.status(401);
//         throw new Error('Utilisateur non trouvé avec ce token');
//       }

//       next();
//     } catch (error) {
//       console.error(error);
//       res.status(401);
//       throw new Error('Non autorisé, token invalide');
//     }
//   }

//   if (!token) {
//     res.status(401);
//     throw new Error('Non autorisé, pas de token');
//   }
// };

// // Middleware pour restreindre l'accès à certains rôles
// const authorize = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({
//         success: false,
//         message: `Le rôle ${req.user.role} n'est pas autorisé à accéder à cette ressource`,
//       });
//     }
//     next();
//   };
// };

// module.exports = { protect, authorize };


// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware pour protéger les routes (token JWT requis)
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        res.status(401);
        throw new Error('Utilisateur non trouvé avec ce token');
      }

      return next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Non autorisé, token invalide');
    }
  }

  res.status(401);
  throw new Error('Non autorisé, pas de token');
};

// Middleware pour restreindre l'accès à certains rôles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Le rôle "${req.user.role}" n'est pas autorisé à accéder à cette ressource`,
      });
    }
    next();
  };
};

module.exports = { protect, authorize };