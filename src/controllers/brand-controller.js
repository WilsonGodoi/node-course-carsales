const brandRepository = require('../repository/brand-repository');

module.exports = {
  async list(req, res) {
    try {
      const brands = await brandRepository.list();
      return res.status(200).json(brands);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async create(req, res) {
    try {
      const { name } = req.body;

      const newBrand = await brandRepository.create({ name });
      return res.status(201).json(newBrand);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async edit(req, res) {
    try {
      const { name } = req.body;

      const brandSearch = await brandRepository.getById(req.params.id);
      if (!brandSearch) {
        return res.status(400).json('Marca não cadastrada!');
      }
      const editedBrand = await brandRepository.edit({
        name,
        id: req.params.id,
      });
      return res.status(200).json(editedBrand);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
};
