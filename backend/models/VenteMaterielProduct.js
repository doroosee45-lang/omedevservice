const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    reference: { type: String, unique: true },
    name: { type: String, required: [true, 'Nom du produit requis'] },
    category: {
      type: String,
      required: true,
      enum: ['Ordinateurs', 'Climatisation', 'Sécurité', 'Réseau', 'Composants', 'Accessoires', 'Serveurs', 'Autre'],
    },
    description: { type: String, required: [true, 'Description requise'] },
    price: { type: Number, required: [true, 'Prix requis'], min: 0 },
    stock: { type: Number, default: 0, min: 0 },
    image: { type: String, default: '' },
    specifications: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

productSchema.pre('validate', async function (next) {
  if (!this.reference) {
    const count = await mongoose.model('VenteMaterielProduct').countDocuments();
    this.reference = `PROD-${(count + 1).toString().padStart(4, '0')}`;
  }
  next();
});

const VenteMaterielProduct = mongoose.model('VenteMaterielProduct', productSchema);
module.exports = VenteMaterielProduct;
