// src/middleware/errorMiddleware.js - Capture toutes les erreurs de l'API
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Gérer les erreurs spécifiques de Mongoose
  if (err.name === 'CastError') {
    message = 'Ressource non trouvée';
    statusCode = 404;
  }

  if (err.code === 11000) {
    message = 'Donnée en doublon entrée';
    statusCode = 400;
  }

  if (err.name === 'ValidationError') {
    message = Object.values(err.errors).map(val => val.message).join(', ');
    statusCode = 400;
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { errorHandler };