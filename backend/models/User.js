// src/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Veuillez ajouter un nom'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Veuillez ajouter un email'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Veuillez ajouter un email valide',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Veuillez ajouter un numéro de téléphone'],
    },
    password: {
      type: String,
      required: [true, 'Veuillez ajouter un mot de passe'],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ['client', 'manager', 'admin', 'super_admin', 'visitor'],
      default: 'client',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    avatar: {
      type: String,
      default: '',
    },
    companyName: { type: String },
    address:     { type: String },
    city:        { type: String },
    country:     { type: String, default: 'RDC' },
    notificationPreferences: {
      email:      { type: Boolean, default: true },
      devis:      { type: Boolean, default: true },
      projets:    { type: Boolean, default: true },
      messages:   { type: Boolean, default: true },
      newsletter: { type: Boolean, default: false },
    },
    stripeCustomerId: { type: String },
    // Statut réel de l'email d'activation envoyé à la création du compte —
    // sans ça, un échec d'envoi (ex. restriction Resend) était invisible :
    // l'admin voyait juste "compte créé" sans savoir que le client n'a
    // jamais reçu son lien. Même schéma que Inscription.emailStatus.
    activationEmailStatus: {
      type: String,
      enum: ['sent', 'failed', 'pending'],
      default: 'pending',
    },
    activationEmailSentAt: { type: Date },
    activationEmailError: { type: String },
  },
  { timestamps: true }
);

// Hash du mot de passe avant sauvegarde
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Méthode de comparaison du mot de passe
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;