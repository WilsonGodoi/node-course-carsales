const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: {
    type: String
  },
  login: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ["ADMINISTRADOR", "VENDEDOR"],
    trim: true
  },
  active: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model("User", UserSchema);
