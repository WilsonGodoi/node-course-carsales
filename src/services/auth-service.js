'use strict';
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');
const { UserTypes } = require('../enums/user-types');

exports.generateToken = async data => {
  return jwt.sign(data, config.privateKey, { expiresIn: '1d' });
};

exports.decodeToken = token => {
  let data = jwt.verify(token, config.privateKey);
  return data;
};

exports.authorize = (req, res, next) => {
  try {
    let token = req.headers['authorization'];
    if (!token) {
      res.status(403).json({ message: 'Acesso restrito!' });
    } else {
      jwt.verify(
        token.replace('Bearer ', ''),
        config.privateKey,
        async (error, decoded) => {
          if (error) {
            return res.status(403).json({ message: 'Token inválido!' });
          } else {
            const user = await User.findById(decoded._id);
            if (user && decoded.lastTimeLogin != user.lastTimeLogin) {
              return res.status(401).json({
                message:
                  'Sessão expirada! Realize um novo login para continuar utilizando a plataforma',
              });
            }
            req.userId = decoded._id;
            next();
          }
        }
      );
    }
  } catch (error) {
    return res.status(401).json(error);
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    let token = req.headers['authorization'];
    if (!token) {
      return res.status(403).json({ message: 'Acesso restrito!' });
    } else {
      jwt.verify(
        token.replace('Bearer ', ''),
        config.privateKey,
        async (error, decoded) => {
          if (error) {
            return res.status(403).json({ message: 'Token inválido!' });
          } else {
            if (decoded.roles.includes(UserTypes.ADMINISTRATOR)) {
              const user = await User.findById(decoded._id);
              if (user && decoded.lastTimeLogin != user.lastTimeLogin) {
                return res.status(401).json({
                  message:
                    'Sessão expirada! Realize um novo login para continuar utilizando a plataforma',
                });
              }
              req.userId = decoded._id;
              next();
            } else {
              return res.status(401).json({
                message: 'Funcionalidade restrita para administradores!',
              });
            }
          }
        }
      );
    }
  } catch (error) {
    return res.status(401).json(error);
  }
};
