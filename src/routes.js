const { Router } = require("express");
const LoginController = require("./controllers/login-controller");
const PingController = require("./controllers/ping-controller");

const routes = Router();

routes.post("/api/loja/login", LoginController.doLogin);

routes.get("/api/loja/ping", PingController.publicPing);

module.exports = routes;
