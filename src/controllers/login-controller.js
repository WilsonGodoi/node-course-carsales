const User = require('../models/User');
const md5 = require('md5');
const config = require('../config');
const authService = require('../services/auth-service');

module.exports = {
  async doLogin(req, res) {
    try {
      const user = await User.findOne({
        login: req.body.login,
        password: md5(req.body.password + config.privateKey),
      });
      if (!user) {
        return res.status(404).json({ message: 'Usuário ou senha inválidos!' });
      }
      if (!user.active) {
        return res
          .status(404)
          .json('Usuário inativo, entre em contato com um administrador!');
      }
      const lastTimeLogin = Date.now();
      const jwt = await authService.generateToken({
        name: user.name,
        login: user.login,
        roles: user.roles,
        _id: user._id,
        lastTimeLogin,
      });
      await User.findByIdAndUpdate(
        { _id: user._id },
        {
          $set: {
            lastTimeLogin,
          },
        }
      );
      res.status(201).json({ jwt });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
};
