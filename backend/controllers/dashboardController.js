// controllers/dashboardController.js
const User = require('../models/User');
const Devis = require('../models/Devis');
const Project = require('../models/Project');
const Ticket = require('../models/Ticket');
const QuoteRequest = require('../models/QuoteRequest');
const AuditRequest = require('../models/AuditRequest');
const ContactMessage = require('../models/ContactMessage');

// ==================== ADMIN DASHBOARD ====================

// @desc    Statistiques globales (admin)
// @route   GET /api/dashboard/admin/stats
// @access  Private/Admin
const getAdminStats = async (req, res) => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const [
    approvedDevis,
    newClients,
    openDevis,
    projectsInProgress,
    pendingAudits,
    totalAudits,
    pendingQuoteRequests,
    totalQuoteRequests,
    unreadContacts,
    totalContacts,
  ] = await Promise.all([
    Devis.find({ status: 'approved' }),
    User.countDocuments({ createdAt: { $gte: thirtyDaysAgo }, role: 'client' }),
    Devis.countDocuments({ status: { $in: ['pending', 'processing'] } }),
    Project.countDocuments({ status: { $in: ['progress', 'review'] } }),
    AuditRequest.countDocuments({ status: 'pending' }),
    AuditRequest.countDocuments(),
    QuoteRequest.countDocuments({ status: 'pending' }),
    QuoteRequest.countDocuments(),
    ContactMessage.countDocuments({ isRead: false }),
    ContactMessage.countDocuments(),
  ]);

  const totalRevenue = approvedDevis.reduce((sum, d) => sum + (d.estimatedAmount || 0), 0);

  res.json({
    revenue: totalRevenue,
    revenueFormatted: `${totalRevenue.toLocaleString('fr-FR')}€`,
    newClients,
    openDevis,
    projectsInProgress,
    audits: {
      total: totalAudits,
      pending: pendingAudits,
    },
    quoteRequests: {
      total: totalQuoteRequests,
      pending: pendingQuoteRequests,
    },
    contacts: {
      total: totalContacts,
      unread: unreadContacts,
    },
    trends: {
      revenue: 15,
      newClients: 8,
      openDevis: -2,
      projectsInProgress: 25,
    },
  });
};

// @desc    Évolution CA mensuel (admin)
// @route   GET /api/dashboard/admin/revenue
// @access  Private/Admin
const getAdminRevenue = async (req, res) => {
  const year = parseInt(req.query.year) || new Date().getFullYear();
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31, 23, 59, 59);

  const revenueByMonth = await Devis.aggregate([
    {
      $match: {
        status: 'approved',
        estimatedAmount: { $exists: true, $ne: null },
        createdAt: { $gte: startDate, $lte: endDate },
      },
    },
    { $group: { _id: { $month: '$createdAt' }, total: { $sum: '$estimatedAmount' } } },
    { $sort: { _id: 1 } },
  ]);

  const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
  const revenueData = months.map((month, idx) => {
    const found = revenueByMonth.find(r => r._id === idx + 1);
    return { month, revenus: found ? found.total : 0 };
  });

  const maxRevenue = Math.max(...revenueData.map(r => r.revenus), 20000);
  revenueData.forEach(r => { r.maxRevenue = maxRevenue; });

  res.json(revenueData);
};

// @desc    Activités récentes (admin)
// @route   GET /api/dashboard/admin/activities
// @access  Private/Admin
const getAdminActivities = async (req, res) => {
  const limit = 5;

  const [newUsers, recentDevis, recentProjects, recentTickets, recentAudits, recentContacts] = await Promise.all([
    User.find({ role: 'client' }).sort('-createdAt').limit(limit).select('name email createdAt'),
    Devis.find().sort('-createdAt').limit(limit).populate('user', 'name').select('requestNumber status createdAt user'),
    Project.find().sort('-updatedAt').limit(limit).select('name status updatedAt'),
    Ticket.find().sort('-createdAt').limit(limit).select('ticketId subject status createdAt'),
    AuditRequest.find().sort('-createdAt').limit(3).select('requestNumber companyName name status createdAt'),
    ContactMessage.find().sort('-createdAt').limit(3).select('nom objet createdAt isRead'),
  ]);

  const activities = [];

  newUsers.forEach(u => activities.push({
    id: `user-${u._id}`,
    action: 'Nouveau client inscrit',
    user: u.name,
    date: u.createdAt,
    type: 'client',
    link: '/admin/clients',
  }));

  recentDevis.forEach(d => activities.push({
    id: `devis-${d._id}`,
    action: `Devis ${d.requestNumber} ${d.status === 'approved' ? 'validé' : 'reçu'}`,
    user: d.user?.name || 'Client',
    date: d.createdAt,
    type: 'devis',
    link: '/admin/devis',
  }));

  recentProjects.forEach(p => activities.push({
    id: `project-${p._id}`,
    action: `Projet "${p.name}" ${p.status === 'done' ? 'terminé' : 'mis à jour'}`,
    user: 'Système',
    date: p.updatedAt,
    type: 'projet',
    link: '/admin/projets',
  }));

  recentTickets.forEach(t => activities.push({
    id: `ticket-${t._id}`,
    action: `Ticket ${t.ticketId} ${t.status === 'resolved' ? 'résolu' : 'créé'}`,
    user: 'Client',
    date: t.createdAt,
    type: 'ticket',
    link: '/admin/crm',
  }));

  recentAudits.forEach(a => activities.push({
    id: `audit-${a._id}`,
    action: `Audit ${a.requestNumber} reçu`,
    user: a.companyName || a.name || 'Client',
    date: a.createdAt,
    type: 'audit',
    link: '/admin/audits',
  }));

  recentContacts.forEach(c => activities.push({
    id: `contact-${c._id}`,
    action: `Message contact : ${c.objet}`,
    user: c.nom,
    date: c.createdAt,
    type: 'contact',
    link: '/admin/contacts',
  }));

  activities.sort((a, b) => new Date(b.date) - new Date(a.date));

  const formatted = activities.slice(0, 12).map(a => ({
    ...a,
    date: new Date(a.date).toLocaleString('fr-FR'),
  }));

  res.json(formatted);
};

// @desc    Alertes système (admin)
// @route   GET /api/dashboard/admin/alerts
// @access  Private/Admin
const getAdminAlerts = async (req, res) => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const today = new Date();

  const [oldPendingDevis, urgentTickets, overdueProjects, unreadContacts, pendingAudits] = await Promise.all([
    Devis.countDocuments({ status: 'pending', createdAt: { $lt: sevenDaysAgo } }),
    Ticket.countDocuments({ priority: 'urgente', status: { $in: ['open', 'in_progress'] } }),
    Project.countDocuments({ endDate: { $lt: today }, status: { $ne: 'done' } }),
    ContactMessage.countDocuments({ isRead: false }),
    AuditRequest.countDocuments({ status: 'pending' }),
  ]);

  const alerts = [];

  if (oldPendingDevis > 0) alerts.push({
    id: 1,
    message: `${oldPendingDevis} devis en attente depuis plus de 7 jours`,
    detail: 'Voir les devis',
    type: 'warning',
    icon: 'Clock',
    link: '/admin/devis',
  });

  if (urgentTickets > 0) alerts.push({
    id: 2,
    message: `${urgentTickets} tickets support urgents non traités`,
    detail: 'Voir le CRM',
    type: 'error',
    icon: 'AlertCircle',
    link: '/admin/crm',
  });

  if (overdueProjects > 0) alerts.push({
    id: 3,
    message: `${overdueProjects} projets en retard`,
    detail: 'Voir les projets',
    type: 'info',
    icon: 'CheckCircle',
    link: '/admin/projets',
  });

  if (unreadContacts > 0) alerts.push({
    id: 4,
    message: `${unreadContacts} message${unreadContacts > 1 ? 's' : ''} de contact non lu${unreadContacts > 1 ? 's' : ''}`,
    detail: 'Voir les messages',
    type: 'warning',
    icon: 'Mail',
    link: '/admin/contacts',
  });

  if (pendingAudits > 0) alerts.push({
    id: 5,
    message: `${pendingAudits} demande${pendingAudits > 1 ? 's' : ''} d'audit en attente`,
    detail: 'Voir les audits',
    type: 'info',
    icon: 'ClipboardCheck',
    link: '/admin/audits',
  });

  res.json(alerts);
};

// ==================== CLIENT DASHBOARD ====================

const getClientStats = async (req, res) => {
  const userId = req.user._id;

  const [demandesEnCours, projetsActifs, enAttente, approvedDevis] = await Promise.all([
    Devis.countDocuments({ user: userId, status: { $in: ['pending', 'processing'] } }),
    Project.countDocuments({ client: userId, status: { $in: ['progress', 'review'] } }),
    Devis.countDocuments({ user: userId, status: 'pending' }),
    Devis.find({ user: userId, status: 'approved', estimatedAmount: { $exists: true } }),
  ]);

  const totalFacture = approvedDevis.reduce((sum, d) => sum + (d.estimatedAmount || 0), 0);

  res.json({
    demandesEnCours,
    projetsActifs,
    enAttente,
    totalFacture,
    totalFactureFormatted: `${totalFacture.toLocaleString('fr-FR')}€`,
  });
};

const getClientRecentDemands = async (req, res) => {
  const userId = req.user._id;
  const demands = await Devis.find({ user: userId })
    .sort('-createdAt')
    .limit(3)
    .select('requestNumber services description status createdAt estimatedAmount');

  const formatted = demands.map(d => ({
    id: d.requestNumber,
    service: d.services ? d.services.join(', ') : 'Non spécifié',
    date: d.createdAt.toLocaleDateString('fr-FR'),
    status: d.status,
    amount: d.estimatedAmount ? `${d.estimatedAmount.toLocaleString('fr-FR')}€` : 'Sur devis',
  }));
  res.json(formatted);
};

const getClientActiveProjects = async (req, res) => {
  const userId = req.user._id;
  const projects = await Project.find({
    client: userId,
    status: { $in: ['progress', 'review'] },
  }).sort('-updatedAt').select('name progress status endDate');

  const formatted = projects.map(p => ({
    id: p._id,
    name: p.name,
    progress: p.progress || 0,
    status: p.status,
    nextMilestone: p.endDate
      ? `Livraison prévue le ${p.endDate.toLocaleDateString('fr-FR')}`
      : 'Date non définie',
  }));
  res.json(formatted);
};

module.exports = {
  getAdminStats,
  getAdminRevenue,
  getAdminActivities,
  getAdminAlerts,
  getClientStats,
  getClientRecentDemands,
  getClientActiveProjects,
};
