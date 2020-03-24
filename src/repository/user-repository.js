const md5 = require('md5');
const User = require('../models/User');
const config = require('../config');

exports.getByLogin = async login => {
  return await User.findOne({ login });
};

exports.list = async () => {
  const users = await User.find({}, 'login name type active');
  users.map(user => (user.id = user._id));
  return users;
};

exports.create = async user => {
  const { login, name, password, type, active } = user;
  return await User.create({
    login,
    name,
    password: md5(password + config.privateKey),
    type,
    active,
    roles: [type],
  });
};
