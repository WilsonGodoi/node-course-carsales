"use strict";
const jwt = require("jsonwebtoken");
const config = require("../config");

exports.generateToken = async data => {
  return jwt.sign(data, config.privateKey, { expiresIn: "1d" });
};

exports.decodeToken = token => {
  let data = jwt.verify(token, config.privateKey);
  return data;
};

exports.authorize = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    res.status(401).json("Acesso restrito!");
  } else {
    jwt.verify(
      token.replace("Bearer ", ""),
      config.privateKey,
      (error, decoded) => {
        if (error) {
          res.status(401).json("Token inválido!");
        } else {
          next();
        }
      }
    );
  }
};

exports.isAdmin = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    res.status(401).json("Acesso restrito!");
  } else {
    jwt.verify(
      token.replace("Bearer ", ""),
      config.privateKey,
      (error, decoded) => {
        if (error) {
          res.status(401).json("Token inválido!");
        } else {
          if (decoded.roles.includes("ADMINISTRADOR")) {
            next();
          } else {
            res
              .status(401)
              .json("Funcionalidade restrita para administradores!");
          }
        }
      }
    );
  }
};
