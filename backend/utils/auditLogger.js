// const AuditLog = require('../models/AuditLog');

// const logAction = async ({ action, entityType, entityId, entityName, changes, req }) => {
//   try {
//     await AuditLog.create({
//       action,
//       entityType,
//       entityId,
//       entityName,
//       changes,
//       user: req.user._id,
//       userName: req.user.name,
//       userRole: req.user.role,
//       ip: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress,
//     });
//   } catch (error) {
//     console.error('Erreur lors de l\'écriture du log:', error);
//   }
// };

// module.exports = logAction;


// models/AuditLog.js
const mongoose = require('mongoose');

const auditLogSchema = mongoose.Schema({
  action: { type: String, required: true },
  entityType: { type: String, required: true },
  entityId: { type: mongoose.Schema.Types.ObjectId },
  entityName: { type: String },
  changes: { type: Object },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userName: { type: String },
  userRole: { type: String },
  ip: { type: String },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('AuditLog', auditLogSchema);