const { Router } = require('express');
const LoginController = require('../controllers/login-controller');

const routes = Router();

/**
 * @swagger
 * /api/login:
 *  post:
 *      summary: Use to do a login.
 *      tags:
 *          - name: Login
 *      parameters:
 *       - in: body
 *         properties:
 *          login:
 *              type: string
 *          password:
 *              type: string
 *         value:
 *          login: teste
 *      responses:
 *          '201':
 *              description: A succesful response
 *              examples:
 *                    application/json:
 *                        {
 *                          jwt: string,
 *                        }
 */
routes.post('/', LoginController.doLogin);

module.exports = app => app.use('/api/login', routes);
