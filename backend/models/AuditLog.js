const mongoose = require('mongoose');

const auditLogSchema = mongoose.Schema({
  action: {
    type: String,
    required: true,
    enum: ['create', 'update', 'delete', 'status_change', 'role_change'],
  },
  entityType: {
    type: String,
    required: true,
    enum: ['user', 'devis', 'project', 'ticket', 'prospect', 'service', 'article'],
  },
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  entityName: {
    type: String,
  },
  changes: {
    type: Object,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userRole: {
    type: String,
  },
  ip: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('AuditLog', auditLogSchema);