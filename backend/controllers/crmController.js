// src/controllers/crmController.js - Contrôleur pour le CRM (gestion des prospects)
const Prospect = require('../models/Prospect');

// @desc    Obtenir tous les prospects
// @route   GET /api/crm
// @access  Private/Admin
const getAllProspects = async (req, res) => {
  const { stage, assignedTo, search, sortBy = '-createdAt' } = req.query;
  let query = {};
  
  if (stage) query.stage = stage;
  if (assignedTo) query.assignedTo = assignedTo;
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { contact: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }
  
  const prospects = await Prospect.find(query)
    .populate('assignedToId', 'name email')
    .sort(sortBy);
  res.json(prospects);
};

// @desc    Obtenir les prospects par étape (pour le Kanban)
// @route   GET /api/crm/by-stage
// @access  Private/Admin
const getProspectsByStage = async (req, res) => {
  const stages = ['lead', 'contact', 'proposition', 'negociation', 'signe'];
  const result = {};
  
  for (const stage of stages) {
    result[stage] = await Prospect.find({ stage })
      .populate('assignedToId', 'name')
      .sort('-updatedAt');
  }
  
  res.json(result);
};

// @desc    Obtenir les statistiques CRM
// @route   GET /api/crm/stats
// @access  Private/Admin
const getCRMStats = async (req, res) => {
  const stages = ['lead', 'contact', 'proposition', 'negociation', 'signe'];
  const byStage = {};
  
  for (const stage of stages) {
    byStage[stage] = await Prospect.countDocuments({ stage });
  }
  
  const totalValue = await Prospect.aggregate([
    { $match: { stage: 'signe' } },
    { $group: { _id: null, total: { $sum: '$valueAmount' } } }
  ]);
  
  // Taux de conversion
  const totalLeads = await Prospect.countDocuments({ stage: { $in: ['lead', 'contact', 'proposition', 'negociation'] } });
  const totalSigned = await Prospect.countDocuments({ stage: 'signe' });
  const conversionRate = totalLeads > 0 ? ((totalSigned / totalLeads) * 100).toFixed(1) : 0;
  
  // Valeur moyenne des deals signés
  const signedDeals = await Prospect.find({ stage: 'signe', valueAmount: { $exists: true } });
  const avgValue = signedDeals.length > 0 
    ? signedDeals.reduce((sum, p) => sum + (p.valueAmount || 0), 0) / signedDeals.length 
    : 0;
  
  res.json({
    byStage,
    totalClosedValue: totalValue[0]?.total || 0,
    totalProspects: await Prospect.countDocuments(),
    conversionRate: parseFloat(conversionRate),
    averageDealValue: avgValue,
  });
};

// @desc    Créer un prospect
// @route   POST /api/crm
// @access  Private/Admin
const createProspect = async (req, res) => {
  const { name, contact, email, phone, value, valueAmount, stage, source, notes, assignedTo, assignedToId } = req.body;
  
  const prospect = await Prospect.create({
    name,
    contact,
    email,
    phone,
    value,
    valueAmount,
    stage: stage || 'lead',
    source,
    notes,
    assignedTo,
    assignedToId,
  });
  
  res.status(201).json(prospect);
};

// @desc    Obtenir un prospect par ID
// @route   GET /api/crm/:id
// @access  Private/Admin
const getProspectById = async (req, res) => {
  const prospect = await Prospect.findById(req.params.id)
    .populate('assignedToId', 'name email');
  
  if (prospect) {
    res.json(prospect);
  } else {
    res.status(404);
    throw new Error('Prospect non trouvé');
  }
};

// @desc    Mettre à jour un prospect
// @route   PUT /api/crm/:id
// @access  Private/Admin
const updateProspect = async (req, res) => {
  const prospect = await Prospect.findById(req.params.id);
  
  if (prospect) {
    // Mettre à jour les champs
    const allowedUpdates = ['name', 'contact', 'email', 'phone', 'value', 'valueAmount', 'stage', 'source', 'notes', 'assignedTo', 'assignedToId'];
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        prospect[field] = req.body[field];
      }
    });
    
    const updated = await prospect.save();
    res.json(updated);
  } else {
    res.status(404);
    throw new Error('Prospect non trouvé');
  }
};

// @desc    Ajouter une interaction à un prospect
// @route   POST /api/crm/:id/interactions
// @access  Private/Admin
const addInteraction = async (req, res) => {
  const { type, description, nextFollowUp } = req.body;
  const prospect = await Prospect.findById(req.params.id);
  
  if (prospect) {
    prospect.interactions.push({
      type,
      description,
      user: req.user.name,
      date: new Date(),
      nextFollowUp: nextFollowUp || null,
    });
    prospect.lastContact = new Date();
    await prospect.save();
    res.json(prospect);
  } else {
    res.status(404);
    throw new Error('Prospect non trouvé');
  }
};

// @desc    Obtenir toutes les interactions d'un prospect
// @route   GET /api/crm/:id/interactions
// @access  Private/Admin
const getInteractions = async (req, res) => {
  const prospect = await Prospect.findById(req.params.id);
  
  if (prospect) {
    res.json(prospect.interactions.sort((a, b) => b.date - a.date));
  } else {
    res.status(404);
    throw new Error('Prospect non trouvé');
  }
};

// @desc    Déplacer un prospect vers une autre étape
// @route   PUT /api/crm/:id/move
// @access  Private/Admin
const moveProspect = async (req, res) => {
  const { stage } = req.body;
  const prospect = await Prospect.findById(req.params.id);
  
  if (prospect) {
    const oldStage = prospect.stage;
    prospect.stage = stage;
    
    // Ajouter une interaction automatique pour le changement d'étape
    prospect.interactions.push({
      type: 'system',
      description: `Projet déplacé de "${oldStage}" vers "${stage}"`,
      user: req.user.name,
      date: new Date(),
    });
    
    // Si on passe à "signé", ajouter une interaction spécifique
    if (stage === 'signe' && oldStage !== 'signe') {
      prospect.interactions.push({
        type: 'meeting',
        description: 'Contrat signé - Félicitations !',
        user: req.user.name,
        date: new Date(),
      });
    }
    
    await prospect.save();
    res.json(prospect);
  } else {
    res.status(404);
    throw new Error('Prospect non trouvé');
  }
};

// @desc    Planifier un rappel / relance
// @route   POST /api/crm/:id/reminder
// @access  Private/Admin
const scheduleReminder = async (req, res) => {
  const { date, description } = req.body;
  const prospect = await Prospect.findById(req.params.id);
  
  if (prospect) {
    prospect.interactions.push({
      type: 'reminder',
      description: `Rappel planifié: ${description}`,
      user: req.user.name,
      date: new Date(),
      nextFollowUp: new Date(date),
    });
    await prospect.save();
    res.json({ message: 'Rappel planifié avec succès', nextFollowUp: date });
  } else {
    res.status(404);
    throw new Error('Prospect non trouvé');
  }
};

// @desc    Obtenir les rappels à venir
// @route   GET /api/crm/reminders/upcoming
// @access  Private/Admin
const getUpcomingReminders = async (req, res) => {
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);
  
  const prospects = await Prospect.find({
    'interactions.nextFollowUp': { $gte: today, $lte: nextWeek }
  }).select('name contact interactions');
  
  const reminders = [];
  prospects.forEach(prospect => {
    prospect.interactions.forEach(interaction => {
      if (interaction.nextFollowUp && interaction.nextFollowUp >= today && interaction.nextFollowUp <= nextWeek) {
        reminders.push({
          prospectId: prospect._id,
          prospectName: prospect.name,
          contact: prospect.contact,
          date: interaction.nextFollowUp,
          description: interaction.description,
        });
      }
    });
  });
  
  res.json(reminders.sort((a, b) => a.date - b.date));
};

// @desc    Supprimer un prospect
// @route   DELETE /api/crm/:id
// @access  Private/Admin
const deleteProspect = async (req, res) => {
  const prospect = await Prospect.findById(req.params.id);
  
  if (prospect) {
    await prospect.deleteOne();
    res.json({ message: 'Prospect supprimé avec succès' });
  } else {
    res.status(404);
    throw new Error('Prospect non trouvé');
  }
};

// @desc    Obtenir le pipeline (résumé des étapes avec valeurs)
// @route   GET /api/crm/pipeline
// @access  Private/Admin
const getPipeline = async (req, res) => {
  const stages = ['lead', 'contact', 'proposition', 'negociation', 'signe'];
  const pipeline = [];
  
  for (const stage of stages) {
    const prospects = await Prospect.find({ stage });
    const totalValue = prospects.reduce((sum, p) => sum + (p.valueAmount || 0), 0);
    
    pipeline.push({
      stage,
      count: prospects.length,
      totalValue,
      prospects: prospects.map(p => ({
        id: p._id,
        name: p.name,
        contact: p.contact,
        value: p.value,
        valueAmount: p.valueAmount,
      })),
    });
  }
  
  res.json(pipeline);
};

module.exports = {
  getAllProspects,
  getProspectsByStage,
  getCRMStats,
  createProspect,
  getProspectById,
  updateProspect,
  addInteraction,
  getInteractions,
  moveProspect,
  scheduleReminder,
  getUpcomingReminders,
  deleteProspect,
  getPipeline,
};