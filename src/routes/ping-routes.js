const { Router } = require('express');
const PingController = require('../controllers/ping-controller');

const routes = Router();

routes.get('/', PingController.publicPing);

module.exports = app => app.use('/api/loja/ping', routes);
