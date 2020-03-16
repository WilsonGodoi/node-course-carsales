const express = require("express");
const router = express.Router();

/**
 * doLogin
 */
router.post("/", (req, res, next) => {
  if (req.body.login === "admin" && req.body.password === "admin") {
    res.status(200).send({ jwt: "abc" });
  }
  res.status(409).send("Usuário ou senha inválidos!");
});

module.exports = router;
