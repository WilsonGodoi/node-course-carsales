const md5 = require('md5');
const User = require('../models/User');
const config = require('../config');

exports.getByLogin = async login => {
  return await User.findOne({ login });
};

exports.getCurrent = async req => {
  return await User.findById(
    req.userId,
    'id login name type active imageBase64'
  );
};

getCurrentPrivate = async req => {
  return await User.findById(req.userId);
};

exports.invalidSession = async req => {
  await User.findByIdAndUpdate(
    { _id: req.userId },
    {
      $set: {
        lastTimeLogin: undefined,
      },
    }
  );
};

exports.passwordMatches = async (req, password) => {
  const currentUser = await this.getCurrentPrivate(req);
  return md5(password + config.privateKey) == currentUser.password;
};

exports.updateOwnPassword = async (req, newPassword) => {
  const currentUser = await this.getCurrentPrivate(req);
  if (md5(newPassword + config.privateKey) == currentUser.password) {
    throw new Error('A nova senha deve ser diferente da senha atual!');
  }
  await User.findByIdAndUpdate(
    { _id: req.userId },
    {
      $set: {
        password: md5(password + config.privateKey),
      },
    }
  );
};

exports.list = async () => {
  return await User.find({}, 'id login name type active image');
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
