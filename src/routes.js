const { Router } = require("express");
const LoginController = require("./controllers/login-controller");
const PingController = require("./controllers/ping-controller");
const UserController = require("./controllers/user-controller");

const routes = Router();

routes.post("/api/loja/login", LoginController.doLogin);

routes.get("/api/loja/ping", PingController.publicPing);

routes.post("/api/auth/admin/users", UserController.create);
routes.put("/api/auth/admin/users/:id", UserController.edit);
routes.get("/api/auth/admin/users", UserController.list);
routes.delete("/api/auth/admin/users/:id", UserController.delete);

module.exports = routes;
