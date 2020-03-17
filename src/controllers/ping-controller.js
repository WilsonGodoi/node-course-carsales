module.exports = {
  async publicPing(req, res) {
    res.status(200).send("Public Pong!");
  }
};
