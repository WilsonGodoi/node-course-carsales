const vehicleRepository = require('../repository/vehicle-repository');

module.exports = {
  async create(req, res) {
    try {
      const vehicle = req.body;

      const newVehicle = await vehicleRepository.create(vehicle);
      return res.status(201).json(newVehicle);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  async savePicture(req, res) {
    try {
      const picture = req.body;

      await vehicleRepository.savePicture(req.params.id, picture);
      return res.status(201).json('Imagem inserida com sucesso!');
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  async deletePicture(req, res) {
    try {
      await vehicleRepository.deletePicture(
        req.params.id,
        req.params.pictureId
      );
      return res.status(200).json('Imagem removida com sucesso!');
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  async list(req, res) {
    try {
      const vehicles = await vehicleRepository.list();
      return res.status(200).json(vehicles);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  async listPictures(req, res) {
    try {
      const pictures = await vehicleRepository.listPictures(req.params.id);
      return res.status(200).json(pictures);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};
