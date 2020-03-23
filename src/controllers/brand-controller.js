const brandRepository = require("../repository/brand-repository");

module.exports = {
  async list(req, res) {
    try {
      const brands = await brandRepository.list();
      return res.status(200).send(brands);
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .send({ message: "Não foi possível listar os marcas!" });
    }
  }
};
