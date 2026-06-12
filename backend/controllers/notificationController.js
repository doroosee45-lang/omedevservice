// controllers/notificationController.js
const Ticket = require('../models/Ticket');

const getMyNotifications = async (req, res) => {
  const userId = req.user._id;
  // Compter les messages non lus dans les tickets
  const tickets = await Ticket.find({ client: userId });
  let unreadCount = 0;
  tickets.forEach(ticket => {
    unreadCount += ticket.messages.filter(m => m.senderId && m.senderId.toString() !== userId && !m.isRead).length;
  });
  // On peut aussi ajouter d'autres notifications (devis, projets)
  res.json({ unreadCount, notifications: [] }); // à enrichir
};

module.exports = { getMyNotifications };