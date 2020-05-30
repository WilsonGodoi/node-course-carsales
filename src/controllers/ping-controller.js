module.exports = {
  async ping(req, res) {
    res.status(200).json('Car Sales Pong!');
  },
};
