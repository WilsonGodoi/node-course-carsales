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

module.exports = mongoose.model('Customer', CustomerSchema);
