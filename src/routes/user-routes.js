const { Router } = require('express');
const authService = require('../services/auth-service');
const UserController = require('../controllers/user-controller');

const routes = Router();

/**
 * @swagger
 * /api/auth/users:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Use to list users, only administrators can access.
 *      tags:
 *          - name: Users
 *      responses:
 *          '200':
 *              description: A succesful response
 *              examples:
 *                    application/json:
 *                      [
 *                        {
 *                          id: string,
 *                          login: string,
 *                          name: string,
 *                          type: string,
 *                          active: boolean,
 *                          imageBase64: string
 *                        },
 *                        {
 *                          id: string,
 *                          login: string,
 *                          name: string,
 *                          type: string,
 *                          active: boolean,
 *                          imageBase64: string
 *                        }
 *                      ]
 */
routes.get('/', authService.isAdmin, UserController.list);

routes.get('/current', authService.authorize, UserController.getCurrent);

routes.post('/', authService.isAdmin, UserController.create);

routes.post('/avatar', authService.authorize, UserController.saveAvatar);

routes.put('/:id', authService.isAdmin, UserController.edit);

routes.put(
  '/current/password',
  authService.authorize,
  UserController.changePassword
);

routes.delete('/:id', authService.isAdmin, UserController.delete);

module.exports = app => app.use('/api/auth/users', routes);
