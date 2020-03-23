const { Router } = require("express");
const LoginController = require("./controllers/login-controller");
const PingController = require("./controllers/ping-controller");
const UserController = require("./controllers/user-controller");
const authService = require("./services/auth-service");

const routes = Router();

routes.post("/api/loja/login", LoginController.doLogin);

routes.get("/api/loja/ping", PingController.publicPing);

routes.post(
  "/api/auth/admin/users",
  authService.isAdmin,
  UserController.create
);
routes.put(
  "/api/auth/admin/users/:id",
  authService.isAdmin,
  UserController.edit
);
routes.get("/api/auth/admin/users", authService.authorize, UserController.list);
routes.delete(
  "/api/auth/admin/users/:id",
  authService.isAdmin,
  UserController.delete
);

module.exports = routes;
