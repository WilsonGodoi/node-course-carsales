const md5 = require('md5');
const config = require('../config');
const User = require('../models/User');
const userRepository = require('../repository/user-repository');

module.exports = {
  async createAdmin() {
    try {
      const user = {
        login: 'admin',
        name: 'admin',
        password: 'admin',
        type: 'ADMINISTRADOR',
        active: true,
        roles: ['ADMINISTRADOR'],
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
        return res.status(400).send('Usuário já cadastrado!');
      }

      const newUser = await userRepository.create(user);
      return res.status(201).send(newUser);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async saveAvatar(req, res) {
    try {
      const { imageBase64 } = req.body;
      const currentUser = await userRepository.getCurrent(req);

      await User.findOneAndUpdate(
        { _id: currentUser.id },
        {
          $set: {
            imageBase64,
          },
        }
      );
      return res.status(200).send('Avatar alterado com sucesso!');
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async getCurrent(req, res) {
    try {
      const currentUser = await userRepository.getCurrent(req);
      return res.status(200).send(currentUser);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async list(req, res) {
    try {
      const users = await userRepository.list();
      return res.status(200).send(users);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async edit(req, res) {
    try {
      const { login, name, password, type, active } = req.body;
      await User.findOneAndUpdate(
        { id: req.params.id },
        {
          $set: {
            login,
            name,
            password: md5(password + config.privateKey),
            type,
            active,
          },
        }
      );
      return res.status(200).send('Usuário alterado com sucesso!');
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async delete(req, res) {
    try {
      const user = await User.findOne({ id: req.params.id });
      if (!user) {
        return res.status(400).send('Falha ao remover usuário!');
      }
      await User.deleteOne({ id: user.id });
      return res.status(200).send('Usuário removido');
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async changePassword(req, res) {
    try {
      const { currentPassword, newPassword, confirmPassword } = req.body;
      const user = await userRepository.getCurrent(req);
      if (!user) {
        return res.status(400).send('Usuário não encontrado!');
      }
      if (newPassword != confirmPassword) {
        return res
          .status(400)
          .send('A nova senha e confirmação devem ser iguais!');
      }
      if (!userRepository.passwordMatches(req, currentPassword)) {
        return res.status(400).send('Senha atual inválida!');
      }
      await userRepository.updateOwnPassword(req, newPassword);
      return res.status(200).send('Senha alterada com sucesso!');
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};
