const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

// Duplicate the ID field.
SaleSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
SaleSchema.set('toJSON', {
  virtuals: true,
});

// // Getter value
// SaleSchema.path('value').get(num => (num / 100).toFixed(2));
//
// // Setter value
// SaleSchema.path('value').set(num => num.toFixed(2));

module.exports = mongoose.model('Sale', SaleSchema);
