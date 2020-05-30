const { Router } = require('express');
const authService = require('../services/auth-service');
const CustomerController = require('../controllers/customer-controller');

const routes = Router();

/**
 * @swagger
 * /api/auth/customers:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Use to list customers.
 *      tags:
 *          - name: Customers
 *      responses:
 *          '200':
 *              description: A succesful response
 *              examples:
 *                    application/json:
 *                      [
 *                        {
 *                          id: string,
 *                          name: string,
 *                          email: string,
 *                          telephone: string
 *                        },
 *                        {
 *                          id: string,
 *                          name: string,
 *                          email: string,
 *                          telephone: string
 *                        }
 *                      ]
 */
routes.get('/customers', authService.authorize, CustomerController.list);

/**
 * @swagger
 * /api/auth/customers:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      summary: Use to create a customer.
 *      tags:
 *          - name: Customers
 *      parameters:
 *          - in: body
 *            name: customer
 *            description: The customer to update.
 *            schema:
 *              type: object
 *              required:
 *                - userName
 *              properties:
 *                name:
 *                  type: string
 *                email:
 *                  type: string
 *                telephone:
 *                  type: string
 *      responses:
 *          '201':
 *              description: A succesful response
 *              examples:
 *                    application/json:
 *                        {
 *                          id: string,
 *                          name: string,
 *                          email: string,
 *                          telephone: string
 *                        }
 */
routes.post('/customers', authService.authorize, CustomerController.create);

/**
 * @swagger
 * /api/auth/customers/{id}:
 *   put:
 *     security:
 *          - bearerAuth: []
 *     summary: Use to update a customer.
 *     tags:
 *       - name: Customers
 *     consumes:
 *       - application/json
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *         type: string
 *        description: The customer ID to update
 *      - in: body
 *        name: customer
 *        description: The customer to update.
 *        schema:
 *          type: object
 *          required:
 *            - userName
 *          properties:
 *            name:
 *              type: string
 *            email:
 *              type: string
 *            telephone:
 *              type: string
 *     responses:
 *       200:
 *         description: Updated
 *         examples:
 *              {
 *                 id: string,
 *                 name: string,
 *                 email: string,
 *                 telephone: string
 *              }
 */
routes.put('/customers/:id', authService.authorize, CustomerController.edit);

module.exports = app => app.use('/api/auth', routes);
