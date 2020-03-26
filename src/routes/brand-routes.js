const { Router } = require('express');
const BrandController = require('../controllers/brand-controller');
const authService = require('../services/auth-service');

const routes = Router();

routes.get('/', authService.authorize, BrandController.list);

routes.post('/', authService.isAdmin, BrandController.create);

routes.put('/:id', authService.isAdmin, BrandController.edit);

routes.delete('/:id', authService.isAdmin, BrandController.delete);

module.exports = app => app.use('/api/auth/admin/brands', routes);
