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
  },

  async edit(req, res) {
    try {
      const { brand, active } = req.body;

      const brandSearch = await brandRepository.getById(req.params.id);
      if (!brandSearch) {
        return res.status(400).json("Marca não cadastrada!");
      }
      const editedBrand = await brandRepository.edit({
        brand,
        active,
        id: req.params.id
      });
      return res.status(201).send(editedBrand);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  async delete(req, res) {
    const brand = await brandRepository.getById(req.params.id);
    if (!brand) {
      return res.status(400).json("Falha ao remover a marca!");
    }
    await brandRepository.delete(brand);
    return res.status(200).send({ message: "Marca removida" });
  }
};
