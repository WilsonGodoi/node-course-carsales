const mongoose = require('mongoose');
const autoIncrementModelID = require('./Counter');
const Image = require('./Image');

const UserSchema = new mongoose.Schema({
  id: {
    type: Number,
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
  image: {
    type: { Image },
  },
});

UserSchema.pre('save', function (next) {
  if (!this.isNew) {
    next();
    return;
  }
  autoIncrementModelID('User', this, next);
});

module.exports = mongoose.model('User', UserSchema);
