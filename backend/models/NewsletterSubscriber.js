// backend/models/NewsletterSubscriber.js
const mongoose = require('mongoose');
const crypto = require('crypto');

const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email requis'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
    unsubscribeToken: {
      type: String,
      unique: true,
      default: () => crypto.randomBytes(32).toString('hex'),
    },
    source: {
      type: String,
      enum: ['footer', 'blog', 'popup', 'admin'],
      default: 'footer',
    },
    subscribedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

subscriberSchema.index({ email: 1 });
subscriberSchema.index({ isActive: 1 });

const NewsletterSubscriber = mongoose.model('NewsletterSubscriber', subscriberSchema);
module.exports = NewsletterSubscriber;
