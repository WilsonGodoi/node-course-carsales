const { Router } = require('express');
const PingController = require('../controllers/ping-controller');

const routes = Router();

routes.get('/', PingController.ping);

module.exports = app => app.use('/api/ping', routes);
