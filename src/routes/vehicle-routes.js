const { Router } = require('express');
const authService = require('../services/auth-service');
const VehicleController = require('../controllers/vehicle-controller');

const routes = Router();

routes.get('/', authService.authorize, VehicleController.list);
routes.get(
  '/:id/pictures',
  authService.authorize,
  VehicleController.listPictures
);

routes.post('/', authService.isAdmin, VehicleController.create);
routes.post(
  '/:id/pictures',
  authService.isAdmin,
  VehicleController.savePicture
);

module.exports = app => app.use('/api/auth/admin/vehicles', routes);
