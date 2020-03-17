const User = require("../models/User");

module.exports = {
  async create(req, res) {
    const { login, name, password, type, active } = req.body;

    user = await User.create({
      login,
      name,
      password,
      type,
      active
    });
    return res.json(user);
  }
};
