const { Router } = require('express');
const LoginController = require('../controllers/login-controller');

const routes = Router();

routes.post('/api/loja/login', LoginController.doLogin);

module.exports = routes;
