const User = require('../models/User');
const md5 = require('md5');
const config = require('../config');
const authService = require('../services/auth-service');

module.exports = {
  async doLogin(req, res) {
    const user = await User.findOne({
      login: req.body.login,
      password: md5(req.body.password + config.privateKey),
    });
    if (!user) {
      return res.status(404).json('Usuário ou senha inválidos!');
    }
    const jwt = await authService.generateToken({
      name: user.name,
      login: user.login,
      roles: user.roles,
      _id: user._id,
    });
    res.status(201).send({ jwt });
  },
};
