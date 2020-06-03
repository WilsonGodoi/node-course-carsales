const md5 = require('md5');
const config = require('../config');
const User = require('../models/User');
const userRepository = require('../repository/user-repository');
const { UserTypes } = require('../enums/user-types');

module.exports = {
  async createAdmin() {
    try {
      const user = {
        login: 'admin',
        name: 'admin',
        password: 'admin',
        type: UserTypes.ADMINISTRATOR,
        active: true,
        roles: [UserTypes.ADMINISTRATOR],
      };

      if (await userRepository.getByLogin(user.login)) {
        return;
      }

      await userRepository.create(user);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  },

  async create(req, res) {
    try {
      const { login, name, password, type, active } = req.body;
      const user = { login, name, password, type, active };

      const userSearch = await userRepository.getByLogin(login);
      if (userSearch) {
        return res.status(400).json('Usuário já cadastrado!');
      }

      const newUser = await userRepository.create(user);
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async saveAvatar(req, res) {
    try {
      const { imageBase64 } = req.body;
      const currentUser = await userRepository.getCurrent(req);

      await userRepository.saveAvatar(currentUser.id, imageBase64);

      return res.status(201).json('Avatar alterado com sucesso!');
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async getCurrent(req, res) {
    try {
      const currentUser = await userRepository.getCurrent(req);
      return res.status(200).json(currentUser);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async list(req, res) {
    try {
      const users = await userRepository.list();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async edit(req, res) {
    try {
      await userRepository.update(req.params.id, req.body);
      return res.status(200).json('Usuário alterado com sucesso!');
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async changePassword(req, res) {
    try {
      const { currentPassword, newPassword, confirmPassword } = req.body;
      const user = await userRepository.getCurrent(req);
      if (!user) {
        return res.status(400).json('Usuário não encontrado!');
      }
      if (newPassword != confirmPassword) {
        return res
          .status(400)
          .json('A nova senha e confirmação devem ser iguais!');
      }
      if (!userRepository.passwordMatches(req, currentPassword)) {
        return res.status(400).json('Senha atual inválida!');
      }
      await userRepository.updateOwnPassword(req, newPassword);
      return res.status(200).json('Senha alterada com sucesso!');
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
};
