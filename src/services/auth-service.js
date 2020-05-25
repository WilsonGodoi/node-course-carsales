'use strict';
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');

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
      res.status(403).send('Acesso restrito!');
    } else {
      jwt.verify(
        token.replace('Bearer ', ''),
        config.privateKey,
        async (error, decoded) => {
          if (error) {
            return res.status(403).send('Token inválido!');
          } else {
            const user = await User.findById({ _id: decoded._id });
            if (user && decoded.lastTimeLogin != user.lastTimeLogin) {
              return res
                .status(401)
                .send(
                  'Sessão expirada! Realize um novo login para continuar utilizando a plataforma'
                );
            }
            req.userId = decoded._id;
            next();
          }
        }
      );
    }
  } catch (error) {
    return res.status(401).send(error);
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    let token = req.headers['authorization'];
    if (!token) {
      return res.status(403).send('Acesso restrito!');
    } else {
      jwt.verify(
        token.replace('Bearer ', ''),
        config.privateKey,
        async (error, decoded) => {
          if (error) {
            return res.status(403).send('Token inválido!');
          } else {
            if (decoded.roles.includes('ADMINISTRADOR')) {
              const user = await User.findById({ _id: decoded._id });
              if (user && decoded.lastTimeLogin != user.lastTimeLogin) {
                return res
                  .status(401)
                  .send(
                    'Sessão expirada! Realize um novo login para continuar utilizando a plataforma'
                  );
              }
              req.userId = decoded._id;
              next();
            } else {
              return res
                .status(401)
                .send('Funcionalidade restrita para administradores!');
            }
          }
        }
      );
    }
  } catch (error) {
    return res.status(401).send(error);
  }
};
