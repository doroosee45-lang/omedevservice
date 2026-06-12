const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    orderNumber: { type: String, unique: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'VenteMaterielProduct' },
    productSnapshot: {
      name: String,
      category: String,
      price: Number,
      reference: String,
    },
    quantity: { type: Number, required: true, min: 1 },
    unitPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    fullName: { type: String, required: [true, 'Nom complet requis'] },
    email: { type: String, required: [true, 'Email requis'], lowercase: true },
    phone: { type: String, required: [true, 'Téléphone requis'] },
    address: { type: String, required: [true, 'Adresse requise'] },
    city: { type: String, required: [true, 'Ville requise'] },
    postalCode: { type: String, default: '' },
    country: { type: String, default: 'RDC' },
    paymentMethod: {
      type: String,
      enum: ['card', 'mobile', 'bank'],
      default: 'card',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    adminNotes: { type: String, default: '' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

orderSchema.pre('validate', async function (next) {
  if (!this.orderNumber) {
    const date = new Date();
    const yy = date.getFullYear().toString().slice(-2);
    const mm = (date.getMonth() + 1).toString().padStart(2, '0');
    const count = await mongoose.model('VenteMaterielOrder').countDocuments();
    this.orderNumber = `CMD-${yy}${mm}-${(count + 1).toString().padStart(4, '0')}`;
  }
  next();
});

const VenteMaterielOrder = mongoose.model('VenteMaterielOrder', orderSchema);
module.exports = VenteMaterielOrder;
