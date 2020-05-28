const userRepository = require('../repository/user-repository');

module.exports = {
  async doLogout(req, res) {
    try {
      await userRepository.invalidSession(req);
      return res.status(200).json();
    } catch (error) {
      return res.status(401).json(error);
    }
  },
};
