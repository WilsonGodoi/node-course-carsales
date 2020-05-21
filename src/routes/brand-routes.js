const { Router } = require('express');
const BrandController = require('../controllers/brand-controller');
const authService = require('../services/auth-service');

const routes = Router();

/**
 * @swagger
 * /api/auth/admin/brands:
 *  get:
 *      description: Use to request all brands
 *      tags:
 *          - name: Brands
 *      responses:
 *          '200':
 *              description: A succesful response
 */
routes.get('/', authService.authorize, BrandController.list);

/**
 * @swagger
 * /api/auth/admin/brands:
 *  post:
 *      description: Use to request all customers
 *      tags:
 *          - name: Brands
 *      responses:
 *          '200':
 *              description: A succesful response
 */
routes.post('/', authService.isAdmin, BrandController.create);

routes.put('/:id', authService.isAdmin, BrandController.edit);

routes.delete('/:id', authService.isAdmin, BrandController.delete);

module.exports = app => app.use('/api/auth/admin/brands', routes);
