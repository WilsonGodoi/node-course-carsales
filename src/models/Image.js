const mongoose = require('mongoose');
const autoIncrementModelID = require('./Counter');

const ImageSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  base64: {
    type: String,
    required: true,
    trim: true,
  },
  refId: {
    type: String,
    required: true,
    trim: true,
  },
});

ImageSchema.pre('save', function (next) {
  if (!this.isNew) {
    next();
    return;
  }
  autoIncrementModelID('Image', this, next);
});

module.exports = mongoose.model('Image', ImageSchema);
