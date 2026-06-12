const mongoose = require('mongoose');

const auditRequestSchema = mongoose.Schema(
  {
    requestNumber: { type: String, unique: true },
    companyName: { type: String, required: [true, 'Veuillez indiquer le nom de votre entreprise'] },
    sector: { type: String, required: [true, 'Veuillez indiquer votre secteur'] },
    employeeCount: { type: String, required: [true, 'Veuillez indiquer le nombre d\'employés'] },
    hasNetwork: { type: String, enum: ['yes', 'no', 'partial', ''] },
    hasServer: { type: String, enum: ['yes', 'no', 'cloud', ''] },
    hasFirewall: { type: String, enum: ['yes', 'no', 'basic', ''] },
    internetSpeed: { type: String },
    hasAntivirus: { type: String, enum: ['yes', 'no', 'basic', ''] },
    hasBackup: { type: String, enum: ['yes', 'no', 'partial', ''] },
    hasCyberPolicy: { type: String, enum: ['yes', 'no', 'inprogress', ''] },
    lastAudit: { type: String, enum: ['moins-6-mois', '6-12-mois', '1-2-ans', 'plus-2-ans', 'jamais', ''] },
    mainIssues: [{ type: String }],
    priorityServices: [{ type: String }],
    budget: { type: String },
    name: { type: String, required: [true, 'Veuillez indiquer votre nom'] },
    email: { type: String, required: [true, 'Veuillez indiquer votre email'], lowercase: true },
    phone: { type: String, required: [true, 'Veuillez indiquer votre téléphone'] },
    position: { type: String },
    preferredContact: { type: String, enum: ['email', 'phone', ''], default: 'email' },
    newsletter: { type: Boolean, default: false },
    auditScore: { type: Number, min: 0, max: 100 },
    auditLevel: { type: String, enum: ['Critique', 'Moyen', 'Bon', 'Excellent'] },
    recommendations: [{ type: String }],
    pdfReportUrl: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['pending', 'processing', 'completed', 'contacted'], default: 'pending' },
  },
  { timestamps: true }
);

auditRequestSchema.pre('validate', async function(next) {
  if (!this.requestNumber) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const count = await mongoose.model('AuditRequest').countDocuments();
    this.requestNumber = `AUD-${year}${month}-${(count + 1).toString().padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model('AuditRequest', auditRequestSchema);