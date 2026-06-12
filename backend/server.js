// server.js - Point d'entrée principal du serveur
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Charger les variables d'environnement
dotenv.config();

// Connexion à la base de données
connectDB();

const app = express();

// CORS — accepte toutes les origines (répondre aux preflight OPTIONS inclus)
const corsOptions = {
  origin: (origin, callback) => callback(null, true),
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
app.use('/api/audit-requests', require('./routes/auditRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/settings', require('./routes/settingRoutes'));
app.use('/api/history', require('./routes/historyRoutes'));
app.use('/api/ferronnerie-projects', require('./routes/ferronnerieProjectRoutes'));
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

// Gestion des erreurs non capturées
process.on('unhandledRejection', (err, promise) => {
  console.log(`❌ Erreur: ${err.message}`);
  server.close(() => process.exit(1));
});