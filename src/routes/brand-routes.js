const { Router } = require('express');
const BrandController = require('../controllers/brand-controller');
const authService = require('../services/auth-service');

const routes = Router();

/**
 * @swagger
 * /api/auth/admin/brands:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      description: Use to list brands
 *      tags:
 *          - name: Brands
 *      responses:
 *          '200':
 *              description: A succesful response
 *              examples:
 *                    application/json:
 *                      [
 *                        {
 *                          id: string,
 *                          name: string,
 *                        },
 *                        {
 *                          id: string,
 *                          name: string,
 *                        }
 *                      ]
 */
routes.get('/', authService.authorize, BrandController.list);

/**
 * @swagger
 * /api/auth/admin/brands:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      description: Use to create a brand
 *      tags:
 *          - name: Brands
 *      parameters:
 *       - in: body
 *         properties:
 *          name:
 *              type: string
 *      responses:
 *          '201':
 *              description: A succesful response
 *              examples:
 *                    application/json:
 *                        {
 *                          id: string,
 *                          name: string,
 *                        }
 */
routes.post('/', authService.isAdmin, BrandController.create);

/**
 * @swagger
 * /api/auth/admin/brands/{id}:
 *  put:
 *      security:
 *          - bearerAuth: []
 *      description: Use to update a brand
 *      tags:
 *          - name: Brands
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *          type: string
 *         description: The brand ID to update
 *       - in: body
 *         properties:
 *          name:
 *              type: string
 *      responses:
 *          '200':
 *              description: A succesful response
 *              examples:
 *                    application/json:
 *                        {
 *                          id: string,
 *                          name: string,
 *                        }
 */
routes.put('/:id', authService.isAdmin, BrandController.edit);

module.exports = app => app.use('/api/auth/admin/brands', routes);
