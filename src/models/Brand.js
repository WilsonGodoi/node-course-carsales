const mongoose = require('mongoose');
const mongooseHidden = require('mongoose-hidden');

const BrandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    uppercase: true,
  },
});

// This will add `id` in toJSON
BrandSchema.set('toJSON', {
  virtuals: true,
});

// This will remove `_id` and `__v` from all queries
BrandSchema.plugin(mongooseHidden());

module.exports = mongoose.model('Brand', BrandSchema);
