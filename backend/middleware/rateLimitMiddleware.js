// src/middleware/rateLimitMiddleware.js - Limitation de débit sur les
// endpoints publics/sensibles, pour limiter le brute-force, le spam de
// formulaires et l'abus de l'assistant IA (facturé à l'appel côté Anthropic).
// Seuils choisis pour rester invisibles à un usage normal (voir commentaires
// par limiteur) tout en rendant l'automatisation abusive peu rentable.
const rateLimit = require('express-rate-limit');

// Réponse JSON cohérente avec le reste de l'API (errorMiddleware.js) plutôt
// que le texte brut renvoyé par défaut par express-rate-limit.
const jsonHandler = (message) => (req, res) => {
  res.status(429).json({ success: false, message });
};

// Connexion : une erreur de frappe légitime prend rarement plus de 2-3
// essais ; 10 essais / 15 min laisse largement cette marge tout en rendant
// le brute-force d'un mot de passe (même faible) impraticable (960/jour max).
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: jsonHandler('Trop de tentatives de connexion. Veuillez réessayer dans quelques minutes.'),
});

// Mot de passe oublié : un utilisateur légitime redemande rarement plus
// d'une ou deux fois par heure. Limite basse pour empêcher le bombardement
// d'emails vers une victime tierce et l'énumération d'adresses par timing.
const forgotPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: jsonHandler('Trop de demandes de réinitialisation. Veuillez réessayer plus tard.'),
});

// Formulaires publics (contact, inscription, devis, audit, newsletter,
// commandes) : 20/heure couvre largement plusieurs demandes légitimes
// (ex. plusieurs membres d'un même bureau derrière la même IP) tout en
// bloquant un envoi automatisé en masse.
const publicFormLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  handler: jsonHandler('Trop de soumissions depuis cette adresse. Veuillez réessayer plus tard.'),
});

// Assistant IA : chaque message appelle l'API Anthropic (facturée à l'usage).
// 15 messages / 15 min correspond à une conversation active normale (un
// message toutes les ~1 minute) tout en bornant le coût d'un abus.
const assistantLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 15,
  standardHeaders: true,
  legacyHeaders: false,
  handler: jsonHandler('Trop de messages envoyés à l\'assistant. Veuillez patienter quelques minutes.'),
});

module.exports = { loginLimiter, forgotPasswordLimiter, publicFormLimiter, assistantLimiter };
