const { Router } = require('express');
const BrandController = require('../controllers/brand-controller');
const authService = require('../services/auth-service');

const routes = Router();

routes.get(
  '/api/auth/admin/brands',
  authService.authorize,
  BrandController.list
);

routes.post(
  '/api/auth/admin/brands',
  authService.isAdmin,
  BrandController.create
);

routes.put(
  '/api/auth/admin/brands/:id',
  authService.isAdmin,
  BrandController.edit
);

routes.delete(
  '/api/auth/admin/brands/:id',
  authService.isAdmin,
  BrandController.delete
);

module.exports = routes;
