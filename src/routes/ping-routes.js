const { Router } = require("express");
const PingController = require("../controllers/ping-controller");

const routes = Router();

routes.get("/api/loja/ping", PingController.publicPing);

module.exports = routes;
