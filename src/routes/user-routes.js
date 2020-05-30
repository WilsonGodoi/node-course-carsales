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

routes.post('/', authService.isAdmin, UserController.create);

routes.put('/:id', authService.isAdmin, UserController.edit);

routes.delete('/:id', authService.isAdmin, UserController.delete);

/**
 * @swagger
 * /api/auth/users/current:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: Use to get a current user.
 *      tags:
 *          - name: Users
 *      responses:
 *          '200':
 *              description: A succesful response
 *              examples:
 *                    application/json:
 *                        {
 *                          id: string,
 *                          login: string,
 *                          name: string,
 *                          type: string,
 *                          active: boolean,
 *                          imageBase64: string
 *                        }
 */
routes.get('/current', authService.authorize, UserController.getCurrent);

routes.post('/avatar', authService.authorize, UserController.saveAvatar);

routes.put(
  '/current/password',
  authService.authorize,
  UserController.changePassword
);

module.exports = app => app.use('/api/auth/users', routes);
