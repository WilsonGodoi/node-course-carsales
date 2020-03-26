const { Router } = require('express');
const LoginController = require('../controllers/login-controller');

const routes = Router();

routes.post('/', LoginController.doLogin);

module.exports = app => app.use('/api/loja/login', routes);
