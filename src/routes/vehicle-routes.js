const { Router } = require('express');
const authService = require('../services/auth-service');
const VehicleController = require('../controllers/vehicle-controller');

const routes = Router();

routes.get('/', authService.authorize, VehicleController.list);

routes.post('/', authService.isAdmin, VehicleController.create);

module.exports = app => app.use('/api/auth/admin/vehicles', routes);
