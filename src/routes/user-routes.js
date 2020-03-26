const { Router } = require('express');
const authService = require('../services/auth-service');
const UserController = require('../controllers/user-controller');

const routes = Router();

routes.get('/', authService.authorize, UserController.list);

routes.post('/', authService.isAdmin, UserController.create);

routes.put('/:id', authService.isAdmin, UserController.edit);

routes.delete('/:id', authService.isAdmin, UserController.delete);

module.exports = app => app.use('/api/auth/admin/users', routes);
