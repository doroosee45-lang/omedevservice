// server.js - Point d'entrée principal du serveur
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');

// Charger les variables d'environnement
dotenv.config();

// Express 4 ne transmet pas automatiquement les rejets de Promise d'un
// handler async à errorHandler (contrairement à Express 5) : sans ce patch,
// une erreur async (ex. CastError sur un ObjectId invalide, ValidationError,
// doublon Mongo) laisse la requête sans réponse jusqu'au timeout du client
// au lieu de renvoyer l'erreur JSON propre attendue par errorMiddleware.js
// - confirmé en conditions réelles (GET avec ID malformé -> connexion qui
// reste ouverte indéfiniment) avant ce correctif.
require('express-async-errors');

// Connexion à la base de données
connectDB();

const app = express();

// Render (et la plupart des hébergeurs) termine le TLS en amont et transmet
// en HTTP simple au serveur : sans "trust proxy", req.protocol renvoie
// toujours "http" même quand le site public est en https, ce qui casse
// (contenu mixte) toute URL absolue reconstruite à partir de req.protocol
// (ex: URLs d'images uploadées, voir articleController.js).
app.set('trust proxy', 1);

// En-têtes de sécurité HTTP (HSTS, X-Content-Type-Options, X-Frame-Options,
// Referrer-Policy...). CSP désactivée volontairement : cette API ne sert que
// du JSON et des fichiers statiques dans /uploads (jamais de HTML applicatif
// autre que la route de health-check ci-dessous), donc une CSP stricte
// n'apporte pas de protection réelle ici et risquerait de bloquer sans
// bénéfice le chargement cross-origin des pièces jointes/images par le
// frontend. crossOriginResourcePolicy en "cross-origin" pour la même raison :
// le frontend (autre origine) doit pouvoir charger les fichiers de /uploads.
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

// CORS — restreint à l'origine réelle du frontend en production.
// FRONTEND_URL est déjà la source de vérité utilisée ailleurs dans l'app
// (liens d'activation, de suivi de dossier, de désabonnement...) : elle doit
// donc déjà pointer vers la bonne URL de production sur Render, ce qui évite
// d'avoir à deviner un domaine ici. En développement (NODE_ENV !== 'production'),
// on reste permissif comme avant pour ne pas gêner le travail local (ports
// Vite variables, plusieurs instances locales, etc.).
const normalizeOrigin = (url) => (url || '').replace(/\/+$/, '');
const allowedOrigins = [normalizeOrigin(process.env.FRONTEND_URL)].filter(Boolean);
const corsOptions = {
  origin: (origin, callback) => {
    // Pas d'en-tête Origin (requêtes serveur-à-serveur, health check Render,
    // curl...) : rien à restreindre, ce n'est jamais un navigateur tiers.
    if (!origin) return callback(null, true);
    if (process.env.NODE_ENV !== 'production') return callback(null, true);
    if (allowedOrigins.includes(normalizeOrigin(origin))) return callback(null, true);
    return callback(new Error('Origine non autorisée par la politique CORS'), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // preflight pour toutes les routes

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques (ex: pour les PDFs générés)
app.use('/uploads', express.static('uploads'));

// Route racine (health check)
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'OMEDEV Services API' });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/devis', require('./routes/devisRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/blog', require('./routes/articleRoutes'));
app.use('/api/crm', require('./routes/crmRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));
app.use('/api/quote-requests', require('./routes/quoteRoutes'));
app.use('/api/inscriptions', require('./routes/inscriptionRoutes'));
app.use('/api/audit-requests', require('./routes/auditRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/settings', require('./routes/settingRoutes'));
app.use('/api/history', require('./routes/historyRoutes'));
app.use('/api/assistant', require('./routes/assistantRoutes'));
app.use('/api/newsletter', require('./routes/newsletterRoutes'));
app.use('/api/vente-materiel', require('./routes/venteMaterielRoutes'));

// Middleware de gestion d'erreurs global (à placer après toutes les routes)
const { errorHandler } = require('./middleware/errorMiddleware');
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur le port ${PORT} en mode ${process.env.NODE_ENV}`);
});

// Log les erreurs non capturées sans tuer le serveur
process.on('unhandledRejection', (err) => {
  console.error(`❌ UnhandledRejection: ${err.message}`);
});
process.on('uncaughtException', (err) => {
  console.error(`❌ UncaughtException: ${err.message}`);
});