const mongoose = require("mongoose");

const LoginResponseSchema = new mongoose.Schema({
  jwt: String
});

module.exports = mongoose.model("LoginResponse", LoginResponseSchema);
