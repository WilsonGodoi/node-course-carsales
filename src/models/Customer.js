const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  telephone: {
    type: String,
    required: true,
    trim: true,
  },
});

// Duplicate the ID field.
CustomerSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
CustomerSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('Customer', CustomerSchema);
