const { Router } = require('express');
const LogoutController = require('../controllers/logout-controller.js');
const authService = require('../services/auth-service');

const routes = Router();

routes.post('/', authService.authorize, LogoutController.doLogout);

module.exports = app => app.use('/api/auth/users/logout', routes);
