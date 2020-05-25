const brandRepository = require('../repository/brand-repository');

module.exports = {
  async list(req, res) {
    try {
      const brands = await brandRepository.list();
      return res.status(200).send(brands);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async create(req, res) {
    try {
      const { name } = req.body;

      const newBrand = await brandRepository.create({ name });
      return res.status(201).send(newBrand);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async edit(req, res) {
    try {
      const { name } = req.body;

      const brandSearch = await brandRepository.getById(req.params.id);
      if (!brandSearch) {
        return res.status(400).send('Marca não cadastrada!');
      }
      const editedBrand = await brandRepository.edit({
        name,
        id: req.params.id,
      });
      return res.status(200).send(editedBrand);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async delete(req, res) {
    try {
      const brand = await brandRepository.getById(req.params.id);
      if (!brand) {
        return res.status(400).send('Falha ao remover a marca!');
      }
      await brandRepository.delete(brand);
      return res.status(200).send('Marca removida!');
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};
