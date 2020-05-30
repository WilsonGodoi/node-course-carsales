const { Router } = require('express');
const BrandController = require('../controllers/brand-controller');
const authService = require('../services/auth-service');

const routes = Router();

/**
 * @swagger
 * /api/auth/brands:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Use to list brands.
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
 * /api/auth/brands:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      summary: Use to create a brand, only administrators can access.
 *      tags:
 *          - name: Brands
 *      parameters:
 *      - in: body
 *        name: user
 *        description: The brand to create.
 *        schema:
 *          type: object
 *          properties:
 *            name:
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
 * /api/auth/brands/{id}:
 *  put:
 *      security:
 *          - bearerAuth: []
 *      summary: Use to update a brand, only administrators can access.
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
 *         name: user
 *         description: The brand to update.
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
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

module.exports = app => app.use('/api/auth/brands', routes);
