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

module.exports = mongoose.model('Brand', BrandSchema);
