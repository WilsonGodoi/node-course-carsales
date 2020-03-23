const config = require("../config");
const md5 = require("md5");
const User = require("../models/User");
const userRepository = require("../repository/user-repository");

module.exports = {
  async createAdmin() {
    try {
      const user = {
        login: "admin",
        name: "admin",
        password: "admin",
        type: "ADMINISTRADOR",
        active: true,
        roles: ["ADMINISTRADOR"]
      };

      if (await userRepository.getByLogin(user.login)) {
        return;
      }

      await userRepository.create(user);
    } catch (error) {
      console.log(error);
    }
  },

  async create(req, res) {
    try {
      const { login, name, password, type, active } = req.body;
      const user = { login, name, password, type, active };

      const userSearch = await userRepository.getByLogin(login);
      if (userSearch) {
        return res.status(400).json("Usuário já cadastrado!");
      }

      const newUser = await userRepository.create(user);
      return res.status(201).send(newUser);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  async list(req, res) {
    try {
      users = await userRepository.list();
      return res.status(200).send(users);
    } catch (error) {
      return res.status(400).json("Não foi possível listar os usuários!");
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
      return res.status(400).json("Falha ao alterar usuário!");
    }
  },

  async delete(req, res) {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(400).json("Falha ao remover usuário!");
    }
    await User.deleteOne({ _id: user._id });
    return res.status(200).json({ message: "Usuário removido" });
  }
};
