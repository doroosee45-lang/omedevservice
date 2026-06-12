// controllers/ticketController.js - Contrôleur pour les tickets support
const Ticket = require('../models/Ticket');
const path = require('path');

// ==================== FONCTIONS CLIENT ====================

// @desc    Créer un ticket (client)
// @route   POST /api/tickets
// @access  Private
const createTicket = async (req, res) => {
  const { subject, priority, category, message } = req.body;
  
  const ticket = await Ticket.create({
    subject,
    client: req.user._id,
    clientName: req.user.name,
    clientEmail: req.user.email,
    priority: priority || 'normale',
    category: category || 'technique',
    messages: [{
      sender: req.user.name,
      senderId: req.user._id,
      message,
    }],
  });
  
  res.status(201).json(ticket);
};

// @desc    Obtenir mes tickets (client)
// @route   GET /api/tickets/my-tickets
// @access  Private
const getMyTickets = async (req, res) => {
  const { status, priority } = req.query;
  let query = { client: req.user._id };
  
  if (status) query.status = status;
  if (priority) query.priority = priority;
  
  const tickets = await Ticket.find(query).sort('-createdAt');
  res.json(tickets);
};

// @desc    Obtenir un ticket par ID (client - vérification propriétaire)
// @route   GET /api/tickets/my-tickets/:id
// @access  Private
const getMyTicketById = async (req, res) => {
  const ticket = await Ticket.findOne({ 
    _id: req.params.id, 
    client: req.user._id 
  });
  
  if (ticket) {
    res.json(ticket);
  } else {
    res.status(404);
    throw new Error('Ticket non trouvé');
  }
};

// @desc    Ajouter un message à mon ticket (client) - avec gestion de fichier joint
// @route   POST /api/tickets/:id/messages
// @access  Private
const addMessageToTicket = async (req, res) => {
  const { message } = req.body;
  const ticket = await Ticket.findById(req.params.id);
  
  if (!ticket) {
    return res.status(404).json({ error: 'Ticket non trouvé' });
  }
  
  // Vérifier que le ticket appartient au client (sauf si admin)
  if (ticket.client.toString() !== req.user._id.toString() && req.user.role === 'client') {
    return res.status(403).json({ error: 'Non autorisé' });
  }
  
  const newMessage = {
    sender: req.user.name,
    senderId: req.user._id,
    message,
    createdAt: new Date(),
    attachments: [],
  };
  
  // Gestion du fichier joint
  if (req.file) {
    newMessage.attachments.push({
      name: req.file.originalname,
      url: `/uploads/tickets/${req.file.filename}`,
    });
  }
  
  ticket.messages.push(newMessage);
  
  // Réouvrir le ticket si il était fermé/résolu
  if (ticket.status === 'resolved' || ticket.status === 'closed') {
    ticket.status = 'open';
  }
  
  await ticket.save();
  res.json(ticket);
};

// @desc    Obtenir le nombre de tickets non lus pour le client
// @route   GET /api/tickets/unread-count
// @access  Private
const getUnreadCount = async (req, res) => {
  const tickets = await Ticket.find({ client: req.user._id });
  
  let unreadCount = 0;
  tickets.forEach(ticket => {
    const unreadMessages = ticket.messages.filter(msg => 
      msg.senderId && msg.senderId.toString() !== req.user._id.toString() && !msg.isRead
    );
    unreadCount += unreadMessages.length;
  });
  
  res.json({ unreadCount });
};

// @desc    Marquer un message comme lu
// @route   PUT /api/tickets/:ticketId/messages/:messageId/read
// @access  Private
const markMessageAsRead = async (req, res) => {
  const ticket = await Ticket.findById(req.params.ticketId);
  
  if (!ticket) {
    res.status(404);
    throw new Error('Ticket non trouvé');
  }
  
  const message = ticket.messages.id(req.params.messageId);
  if (message) {
    message.isRead = true;
    await ticket.save();
    res.json({ success: true });
  } else {
    res.status(404);
    throw new Error('Message non trouvé');
  }
};

// ==================== FONCTIONS ADMIN ====================

// @desc    Obtenir tous les tickets (admin)
// @route   GET /api/tickets
// @access  Private/Admin
const getAllTickets = async (req, res) => {
  const { status, priority, assignedTo, category, search } = req.query;
  let query = {};
  
  if (status) query.status = status;
  if (priority) query.priority = priority;
  if (assignedTo) query.assignedTo = assignedTo;
  if (category) query.category = category;
  if (search) {
    query.$or = [
      { subject: { $regex: search, $options: 'i' } },
      { clientName: { $regex: search, $options: 'i' } },
      { ticketId: { $regex: search, $options: 'i' } },
    ];
  }
  
  const tickets = await Ticket.find(query)
    .populate('client', 'name email phone')
    .populate('assignedToId', 'name email')
    .sort('-createdAt');
  
  res.json(tickets);
};

// @desc    Obtenir les statistiques des tickets (admin)
// @route   GET /api/tickets/stats
// @access  Private/Admin
const getTicketStats = async (req, res) => {
  const stats = {
    open: await Ticket.countDocuments({ status: 'open' }),
    in_progress: await Ticket.countDocuments({ status: 'in_progress' }),
    resolved: await Ticket.countDocuments({ status: 'resolved' }),
    closed: await Ticket.countDocuments({ status: 'closed' }),
    urgent: await Ticket.countDocuments({ priority: 'urgente', status: { $ne: 'closed' } }),
    high: await Ticket.countDocuments({ priority: 'haute', status: { $ne: 'closed' } }),
  };
  
  // Temps moyen de résolution (en heures)
  const resolvedTickets = await Ticket.find({ 
    status: 'resolved', 
    resolvedAt: { $exists: true } 
  });
  
  let avgResolutionTime = 0;
  if (resolvedTickets.length > 0) {
    const totalHours = resolvedTickets.reduce((sum, ticket) => {
      const resolutionTime = (ticket.resolvedAt - ticket.createdAt) / (1000 * 60 * 60);
      return sum + resolutionTime;
    }, 0);
    avgResolutionTime = totalHours / resolvedTickets.length;
  }
  
  // Tickets par catégorie
  const byCategory = await Ticket.aggregate([
    { $group: { _id: '$category', count: { $sum: 1 } } }
  ]);
  
  res.json({
    ...stats,
    avgResolutionTime: avgResolutionTime.toFixed(1),
    byCategory: byCategory.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {}),
  });
};

// @desc    Obtenir un ticket par ID (admin)
// @route   GET /api/tickets/:id
// @access  Private/Admin
const getTicketById = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id)
    .populate('client', 'name email phone companyName')
    .populate('assignedToId', 'name email');
  
  if (ticket) {
    res.json(ticket);
  } else {
    res.status(404);
    throw new Error('Ticket non trouvé');
  }
};

// @desc    Mettre à jour le statut d'un ticket (admin)
// @route   PUT /api/tickets/:id/status
// @access  Private/Admin
const updateTicketStatus = async (req, res) => {
  const { status, resolution } = req.body;
  const ticket = await Ticket.findById(req.params.id);
  
  if (!ticket) {
    res.status(404);
    throw new Error('Ticket non trouvé');
  }
  
  const oldStatus = ticket.status;
  ticket.status = status;
  
  if (status === 'resolved' && oldStatus !== 'resolved') {
    ticket.resolvedAt = new Date();
    ticket.resolution = resolution;
    ticket.messages.push({
      sender: 'Système',
      senderId: null,
      message: `Ticket résolu par ${req.user.name}. ${resolution ? `Solution: ${resolution}` : ''}`,
      createdAt: new Date(),
    });
  }
  
  if (status === 'closed' && oldStatus !== 'closed') {
    ticket.messages.push({
      sender: 'Système',
      senderId: null,
      message: `Ticket fermé par ${req.user.name}.`,
      createdAt: new Date(),
    });
  }
  
  if (status === 'open' && (oldStatus === 'resolved' || oldStatus === 'closed')) {
    ticket.messages.push({
      sender: 'Système',
      senderId: null,
      message: `Ticket réouvert par ${req.user.name}.`,
      createdAt: new Date(),
    });
    ticket.resolvedAt = null;
    ticket.resolution = null;
  }
  
  await ticket.save();
  res.json(ticket);
};

// @desc    Assigner un ticket à un technicien (admin)
// @route   PUT /api/tickets/:id/assign
// @access  Private/Admin
const assignTicket = async (req, res) => {
  const { assignedTo, assignedToId } = req.body;
  const ticket = await Ticket.findById(req.params.id);
  
  if (!ticket) {
    res.status(404);
    throw new Error('Ticket non trouvé');
  }
  
  const oldAssignee = ticket.assignedTo;
  ticket.assignedTo = assignedTo;
  ticket.assignedToId = assignedToId;
  
  if (ticket.status === 'open') {
    ticket.status = 'in_progress';
  }
  
  ticket.messages.push({
    sender: 'Système',
    senderId: null,
    message: `Ticket assigné à ${assignedTo}${oldAssignee ? ` (précédemment assigné à ${oldAssignee})` : ''}`,
    createdAt: new Date(),
  });
  
  await ticket.save();
  res.json(ticket);
};

// @desc    Ajouter une note interne (admin seulement)
// @route   POST /api/tickets/:id/notes
// @access  Private/Admin
const addInternalNote = async (req, res) => {
  const { note } = req.body;
  const ticket = await Ticket.findById(req.params.id);
  
  if (!ticket) {
    res.status(404);
    throw new Error('Ticket non trouvé');
  }
  
  ticket.messages.push({
    sender: req.user.name,
    senderId: req.user._id,
    message: `[NOTE INTERNE] ${note}`,
    createdAt: new Date(),
  });
  
  await ticket.save();
  res.json(ticket);
};

// @desc    Supprimer un ticket (admin)
// @route   DELETE /api/tickets/:id
// @access  Private/Admin
const deleteTicket = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  
  if (ticket) {
    await ticket.deleteOne();
    res.json({ message: 'Ticket supprimé avec succès' });
  } else {
    res.status(404);
    throw new Error('Ticket non trouvé');
  }
};

// @desc    Exporter les tickets (CSV)
// @route   GET /api/tickets/export/csv
// @access  Private/Admin
const exportTicketsCSV = async (req, res) => {
  const { startDate, endDate } = req.query;
  let query = {};
  
  if (startDate || endDate) {
    query.createdAt = {};
    if (startDate) query.createdAt.$gte = new Date(startDate);
    if (endDate) query.createdAt.$lte = new Date(endDate);
  }
  
  const tickets = await Ticket.find(query)
    .populate('client', 'name email')
    .sort('-createdAt');
  
  let csv = 'ID,Sujet,Client,Email,Priorité,Statut,Date création,Date résolution\n';
  tickets.forEach(ticket => {
    csv += `"${ticket.ticketId}","${ticket.subject.replace(/"/g, '""')}","${ticket.clientName.replace(/"/g, '""')}","${ticket.clientEmail}","${ticket.priority}","${ticket.status}","${ticket.createdAt.toISOString()}","${ticket.resolvedAt ? ticket.resolvedAt.toISOString() : ''}"\n`;
  });
  
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=tickets.csv');
  res.send(csv);
};

module.exports = {
  createTicket,
  getMyTickets,
  getMyTicketById,
  addMessageToTicket,
  getUnreadCount,
  markMessageAsRead,
  getAllTickets,
  getTicketStats,
  getTicketById,
  updateTicketStatus,
  assignTicket,
  addInternalNote,
  deleteTicket,
  exportTicketsCSV,
};