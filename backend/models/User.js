// // src/models/User.js - Modèle pour les utilisateurs (clients, admins)
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, 'Veuillez ajouter un nom'],
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: [true, 'Veuillez ajouter un email'],
//       unique: true,
//       lowercase: true,
//       match: [
//         /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
//         'Veuillez ajouter un email valide',
//       ],
//     },
//     phone: {
//       type: String,
//       required: [true, 'Veuillez ajouter un numéro de téléphone'],
//     },
//     password: {
//       type: String,
//       required: [true, 'Veuillez ajouter un mot de passe'],
//       minlength: 6,
//       select: false,
//     },
//     role: {
//       type: String,
//       enum: ['client', 'admin', 'super_admin'],
//       default: 'client',
//     },
//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//     avatar: {
//       type: String,
//       default: '',
//     },
//     // Informations supplémentaires pour l'espace client
//     companyName: {
//       type: String,
//     },
//     address: {
//       type: String,
//     },
//     city: {
//       type: String,
//     },
//     country: {
//       type: String,
//       default: 'RDC',
//     },
//     // Préférences de notification
//     notificationPreferences: {
//       email: { type: Boolean, default: true },
//       devis: { type: Boolean, default: true },
//       projets: { type: Boolean, default: true },
//       messages: { type: Boolean, default: true },
//       newsletter: { type: Boolean, default: false },
//     },
//     // ID client Stripe (optionnel)
//     stripeCustomerId: { type: String },
//   },
//   {
//     timestamps: true,
//   }
// );

// // Middleware Mongoose pour hasher le mot de passe avant sauvegarde
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     return next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// // Méthode pour comparer le mot de passe entré avec celui de la base de données
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// const User = mongoose.model('User', userSchema);
// module.exports = User;


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
      enum: ['client', 'admin', 'super_admin'],
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