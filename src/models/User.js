const mongoose = require('mongoose');
const mongooseHidden = require('mongoose-hidden')({
  hidden: { _id: true, __v: true },
});
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

// Duplicate the ID field.
UserSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
UserSchema.set('toJSON', {
  virtuals: true,
});

UserSchema.plugin(mongooseHidden);

module.exports = mongoose.model('User', UserSchema);
