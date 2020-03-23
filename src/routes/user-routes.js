const { Router } = require("express");
const authService = require("../services/auth-service");
const UserController = require("../controllers/user-controller");

const routes = Router();

routes.get("/api/auth/admin/users", authService.authorize, UserController.list);

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

routes.delete(
  "/api/auth/admin/users/:id",
  authService.isAdmin,
  UserController.delete
);

module.exports = routes;
