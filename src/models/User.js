const mongoose = require('mongoose');
const { UserTypes } = require('../enums/user-types');

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
    enum: [UserTypes.ADMINISTRATOR, UserTypes.SELLER],
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
      enum: [UserTypes.ADMINISTRATOR, UserTypes.SELLER],
      default: UserTypes.SELLER,
    },
  ],
  lastTimeLogin: {
    type: String,
  },
  imageBase64: {
    type: String,
  },
});

module.exports = mongoose.model('User', UserSchema);
