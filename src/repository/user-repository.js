"use strict";
const User = require("../models/User");
const md5 = require("md5");
const config = require("../config");

exports.getByLogin = login => {
  return User.findOne({ login });
};

exports.create = user => {
  const { login, name, password, type, active } = user;
  return User.create({
    login,
    name,
    password: md5(password + config.privateKey),
    type,
    active,
    roles: [type]
  });
};
