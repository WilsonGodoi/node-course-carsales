const config = require("../config");
const md5 = require("md5");
const User = require("../models/User");

module.exports = {
  async createAdmin() {
    try {
      const user = {
        login: "admin",
        name: "admin",
        password: md5("admin" + config.privateKey),
        type: "ADMINISTRADOR",
        active: true,
        roles: ["ADMINISTRADOR"]
      };

      if (await User.findOne({ login: user.login, name: user.name })) {
        return;
      }

      await User.create(user);
    } catch (error) {
      console.log(error);
    }
  },

  async create(req, res) {
    try {
      const { login, name, password, type, active } = req.body;

      userSearch = await User.findOne({ login, name });
      if (userSearch) {
        return res.status(400).send({ message: "Usuário já cadastrado!" });
      }

      user = await User.create({
        login,
        name,
        password: md5(password + config.privateKey),
        type,
        active,
        roles: [type]
      });
      user.save();
      return res.status(201).send(user);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async list(req, res) {
    try {
      users = await User.find({}, "login name type active");
      users.map(user => (user.id = user._id));
      return res.status(200).send(users);
    } catch (error) {
      return res
        .status(400)
        .send({ message: "Não foi possível listar os usuários!" });
    }
  },

  async edit(req, res) {
    const { login, name, password, type, active } = req.body;
    try {
      await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            login,
            name,
            password: md5(password + config.privateKey),
            type,
            active
          }
        }
      );
      return res.status(200).send({ message: "Usuário alterado com sucesso!" });
    } catch (error) {
      return res.status(400).send({ message: "Falha ao alterar usuário!" });
    }
  },

  async delete(req, res) {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(400).json({ message: "Falha ao remover usuário!" });
    }
    await User.deleteOne({ _id: user._id });
    return res.status(200).json({ message: "Usuário removido" });
  }
};
