const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  id: {
    type: String
  },
  brand: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  active: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Brand", schema);
