const brandRepository = require("../repository/brand-repository");

module.exports = {
  async list(req, res) {
    try {
      const brands = await brandRepository.list();
      return res.status(200).send(brands);
    } catch (error) {
      console.log(error);
      return res.status(400).json("Não foi possível listar os marcas!");
    }
  },

  async create(req, res) {
    try {
      const { brand, active } = req.body;

      const brandSearch = await brandRepository.getByBrand(brand);
      if (brandSearch) {
        return res.status(400).json("Marca já cadastrada!");
      }

      const newBrand = await brandRepository.create({ brand, active });
      return res.status(201).send(newBrand);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
};
