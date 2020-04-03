const mongoose = require('mongoose');
const autoIncrementModelID = require('./Counter');

const schema = new mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    uppercase: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
});

schema.pre('save', function (next) {
  if (!this.isNew) {
    next();
    return;
  }

  autoIncrementModelID('Brand', this, next);
});

module.exports = mongoose.model('Brand', schema);
