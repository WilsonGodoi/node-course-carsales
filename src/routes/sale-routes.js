const { Router } = require('express');
const authService = require('../services/auth-service');
const SaleController = require('../controllers/sale-controller');

const routes = Router();

routes.get('/sales', authService.authorize, SaleController.list);
routes.post('/sales', authService.authorize, SaleController.create);

module.exports = app => app.use('/api/auth', routes);
