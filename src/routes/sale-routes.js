const { Router } = require('express');
const authService = require('../services/auth-service');
const SaleController = require('../controllers/sale-controller');

const routes = Router();

/**
 * @swagger
 * /api/auth/sales:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Use to list sales.
 *      tags:
 *          - name: Sales
 *      responses:
 *          '200':
 *              description: A succesful response
 *              examples:
 *                    application/json:
 *                      [
 *                        {
 *                          customer: { _id: string, name: string, email: string, telephone: string },
 *                          seller: { _id: string, login: string, name: string, type: string, active: boolean },
 *                          vehicle: { _id: string, brand: string, model: string, modelYear: string, manufactureYear: string, color: string, mileage: string, onlyOwner: boolean, status: string, price: number },
 *                          value: number,
 *                          date: Date
 *                        }
 *                      ]
 */
routes.get('/', authService.authorize, SaleController.list);

routes.post('/', authService.authorize, SaleController.create);

module.exports = app => app.use('/api/auth/sales', routes);
