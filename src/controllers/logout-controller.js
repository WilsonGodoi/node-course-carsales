const userRepository = require('../repository/user-repository');

module.exports = {
  async doLogout(req, res) {
    try {
      await userRepository.invalidSession(req);
      return res.status(200).send();
    } catch (error) {
      return res.status(401).send(error);
    }
  },
};
