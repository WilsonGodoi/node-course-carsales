const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'O nome é obrigatório!'],
    trim: true,
    unique: true,
    uppercase: true,
  },
});

module.exports = mongoose.model('Brand', BrandSchema);
