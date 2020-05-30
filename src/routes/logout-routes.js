const { Router } = require('express');
const LogoutController = require('../controllers/logout-controller.js');
const authService = require('../services/auth-service');

const routes = Router();

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Use to do a logout.
 *     tags:
 *       - name: Logout
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: Logout
 */
routes.post('/', authService.authorize, LogoutController.doLogout);

module.exports = app => app.use('/api/auth/logout', routes);
