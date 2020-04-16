const { Router } = require('express');
const authService = require('../services/auth-service');
const CustomerController = require('../controllers/customer-controller');

const routes = Router();

routes.get('/customers', authService.authorize, CustomerController.list);

routes.post('/customers', authService.authorize, CustomerController.create);

module.exports = app => app.use('/api/auth', routes);
