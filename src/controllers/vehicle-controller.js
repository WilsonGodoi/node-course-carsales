const vehicleRepository = require('../repository/vehicle-repository');

module.exports = {
  async create(req, res) {
    try {
      const vehicle = req.body;

      const newVehicle = await vehicleRepository.create(vehicle);
      return res.status(201).send(newVehicle);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async savePicture(req, res) {
    try {
      const picture = req.body;

      await vehicleRepository.savePicture(req.params.id, picture);
      return res.status(201).send('Imagem inserida com sucesso!');
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async deletePicture(req, res) {
    try {
      await vehicleRepository.deletePicture(
        req.params.id,
        req.params.pictureId
      );
      return res.status(200).send('Imagem removida com sucesso!');
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async list(req, res) {
    try {
      const vehicles = await vehicleRepository.list();
      return res.status(200).send(vehicles);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async listPictures(req, res) {
    try {
      const pictures = await vehicleRepository.listPictures(req.params.id);
      return res.status(200).send(pictures);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};
