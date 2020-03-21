const User = require("../models/User");

module.exports = {
  async create(req, res) {
    try {
      const { login, name, password, type, active } = req.body;
      user = await User.create({
        login,
        name,
        password,
        type,
        active
      });
      user.save();
      return res.status(201).send(user);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async list(req, res) {
    try {
      users = await User.find({});
      users.map(user => (user.id = user._id));
      return res.status(200).send(users);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async edit(req, res) {
    const { login, name, password, type, active } = req.body;
    try {
      await User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { login, name, password, type, active } }
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
