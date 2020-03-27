const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  login: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['ADMINISTRADOR', 'VENDEDOR'],
    trim: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  roles: [
    {
      type: String,
      require: true,
      enum: ['ADMINISTRADOR', 'VENDEDOR'],
      default: 'VENDEDOR',
    },
  ],
  lastTimeLogin: {
    type: String,
  },
});

module.exports = mongoose.model('User', UserSchema);
