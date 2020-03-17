module.exports = {
  async doLogin(req, res) {
    if (req.body.login === "admin" && req.body.password === "admin") {
      res.status(200).send({ jwt: "abc" });
    }
    res.status(409).send("Usuário ou senha inválidos!");
  }
};
