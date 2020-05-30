const { Router } = require('express');
const LoginController = require('../controllers/login-controller');

const routes = Router();

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Use to do a login.
 *     tags:
 *       - name: Login
 *     consumes:
 *       - application/json
 *     parameters:
 *      - in: body
 *        name: user
 *        description: The user to login.
 *        schema:
 *          type: object
 *          properties:
 *            login:
 *              type: string
 *            password:
 *              type: string
 *     responses:
 *       201:
 *         description: Logged
 *         examples:
 *              application/json:
 *                  {
 *                    jwt: string,
 *                  }
 */
routes.post('/', LoginController.doLogin);

module.exports = app => app.use('/api/login', routes);
