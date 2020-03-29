const { Router } = require('express');
const authService = require('../services/auth-service');
const UserController = require('../controllers/user-controller');

const routes = Router();

routes.get('/admin/users', authService.authorize, UserController.list);

routes.post('/admin/users', authService.isAdmin, UserController.create);

routes.put('/admin/users/:id', authService.isAdmin, UserController.edit);

routes.put(
  '/users/current/password',
  authService.authorize,
  UserController.changePassword
);

routes.delete('/admin/users/:id', authService.isAdmin, UserController.delete);

module.exports = app => app.use('/api/auth', routes);
