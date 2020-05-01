const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
  imageBase64: {
    type: String,
  },
});

// Duplicate the ID field.
UserSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
UserSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('User', UserSchema);
