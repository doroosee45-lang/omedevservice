const Project = require('../models/Project');
const Devis = require('../models/Devis');
const AuditRequest = require('../models/AuditRequest');

// @desc    Obtenir l'historique complet du client (projets terminés, devis acceptés, audits)
// @route   GET /api/history/my-history
// @access  Private
const getMyHistory = async (req, res) => {
  const userId = req.user._id;

  // Projets terminés
  const completedProjects = await Project.find({
    client: userId,
    status: 'done',
  }).select('name description startDate endDate progress assignee');

  // Devis acceptés (validés)
  const acceptedDevis = await Devis.find({
    user: userId,
    status: 'approved',
  }).select('requestNumber services description estimatedAmount createdAt');

  // Audits réalisés
  const audits = await AuditRequest.find({
    user: userId,
    status: 'completed',
  }).select('requestNumber auditLevel auditScore createdAt pdfReportUrl');

  // Formater pour l'affichage
  const history = [
    ...completedProjects.map(p => ({
      type: 'projet',
      id: p._id,
      name: p.name,
      description: p.description,
      date: p.endDate,
      status: 'Terminé',
      details: { progression: p.progress, responsable: p.assignee },
      pdfUrl: null,
    })),
    ...acceptedDevis.map(d => ({
      type: 'devis',
      id: d._id,
      name: `Devis ${d.requestNumber}`,
      description: d.services?.join(', ') || 'Prestation',
      date: d.createdAt,
      status: 'Validé',
      details: { montant: d.estimatedAmount },
      pdfUrl: `/api/devis/${d._id}/pdf`,
    })),
    ...audits.map(a => ({
      type: 'audit',
      id: a._id,
      name: `Audit ${a.requestNumber}`,
      description: `Niveau ${a.auditLevel} - Score ${a.auditScore}/100`,
      date: a.createdAt,
      status: 'Rapport disponible',
      details: {},
      pdfUrl: a.pdfReportUrl,
    })),
  ];

  // Trier par date décroissante
  history.sort((a, b) => new Date(b.date) - new Date(a.date));
  res.json(history);
};

module.exports = { getMyHistory };