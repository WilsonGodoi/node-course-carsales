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

/**
 * @swagger
 * /api/auth/users:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      summary: Use to create a user, only administrators can access.
 *      tags:
 *          - name: Users
 *      parameters:
 *      - in: body
 *        name: user
 *        description: The user to create.
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            login:
 *              type: string
 *            password:
 *              type: string
 *            type:
 *              type: string
 *              enum:
 *                - SELLER
 *                - ADMINISTRATOR
 *            active:
 *              type: boolean
 *      responses:
 *          '201':
 *              description: A succesful response
 */
routes.post('/', authService.isAdmin, UserController.create);

/**
 * @swagger
 * /api/auth/users/{id}:
 *  put:
 *      security:
 *          - bearerAuth: []
 *      summary: Use to update a user, only administrators can access.
 *      tags:
 *          - name: Users
 *      parameters:
 *      - in: body
 *        name: user
 *        description: The user to update.
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            login:
 *              type: string
 *            password:
 *              type: string
 *            type:
 *              type: string
 *              enum:
 *                - SELLER
 *                - ADMINISTRATOR
 *            active:
 *              type: boolean
 *      responses:
 *          '200':
 *              description: A succesful response
 */
routes.put('/:id', authService.isAdmin, UserController.edit);

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

/**
 * @swagger
 * /api/auth/users/avatar:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      summary: Use to save a user's avatar.
 *      tags:
 *          - name: Users
 *      parameters:
 *      - in: body
 *        name: user
 *        description: The avatar to save.
 *        schema:
 *          type: object
 *          properties:
 *            imageBase64:
 *              type: string
 *      responses:
 *          '201':
 *              description: A succesful response
 */
routes.post('/avatar', authService.authorize, UserController.saveAvatar);

/**
 * @swagger
 * /api/auth/users/current/password:
 *  put:
 *      security:
 *          - bearerAuth: []
 *      summary: Use to update a user's password.
 *      tags:
 *          - name: Users
 *      parameters:
 *      - in: body
 *        name: user
 *        description: The user's password to update.
 *        schema:
 *          type: object
 *          properties:
 *            currentPassword:
 *              type: string
 *            newPassword:
 *              type: string
 *            confirmPassword:
 *              type: string
 *      responses:
 *          '200':
 *              description: A succesful response
 */
routes.put(
  '/current/password',
  authService.authorize,
  UserController.changePassword
);

module.exports = app => app.use('/api/auth/users', routes);
