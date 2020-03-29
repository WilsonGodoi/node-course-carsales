const md5 = require('md5');
const config = require('../config');
const User = require('../models/User');
const userRepository = require('../repository/user-repository');

module.exports = {

    async create(req, res) {
        try {
            return res.status(201).send("Vehicle created");
        } catch (error) {
            return res.status(400).json(error);
        }
    },

    async list(req, res) {
        try {
            return res.status(201).send({});
        } catch (error) {
            return res.status(400).json(error);
        }
    },

};
