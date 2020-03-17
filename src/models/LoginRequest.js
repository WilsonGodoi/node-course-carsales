const mongoose = require("mongoose");

const LoginRequestSchema = new mongoose.Schema({
  login: String,
  password: String
});

module.exports = mongoose.model("LoginRequest", LoginRequestSchema);
