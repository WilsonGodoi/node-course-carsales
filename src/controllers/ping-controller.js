module.exports = {
  async publicPing(req, res) {
    res.status(200).json('Public Pong!');
  },
};
