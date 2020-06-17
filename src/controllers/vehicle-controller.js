const vehicleRepository = require('../repository/vehicle-repository');
const { VehicleStatuses } = require('../enums/vehicle-statuses');

module.exports = {
  async create(req, res) {
    try {
      const vehicle = req.body;

      const newVehicle = await vehicleRepository.create(vehicle);
      return res.status(201).json(newVehicle);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async update(req, res) {
    try {
      const currentVehicle = await vehicleRepository.get(req.params.id);
      if (currentVehicle.status === VehicleStatuses.SOLD) {
        throw new Error('Veículo já vendido!');
      }

      const vehicle = req.body;
      const newVehicle = await vehicleRepository.update(req.params.id, vehicle);

      return res.status(200).json(newVehicle);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async delete(req, res) {
    try {
      const currentVehicle = await vehicleRepository.get(req.params.id);
      if (currentVehicle.status === VehicleStatuses.SOLD) {
        throw new Error('Veículo já vendido!');
      }

      await vehicleRepository.delete(req.params.id);

      return res.status(200).json('Veículo removido com sucesso!');
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async savePicture(req, res) {
    try {
      const picture = req.body;

      await vehicleRepository.savePicture(req.params.id, picture);
      return res.status(201).json('Imagem inserida com sucesso!');
    } catch (error) {
      return res.status(400).json({ message: error.message });
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
      return res.status(400).json({ message: error.message });
    }
  },

  async list(req, res) {
    try {
      const vehicles = await vehicleRepository.list();
      return res.status(200).json(vehicles);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async listPictures(req, res) {
    try {
      const pictures = await vehicleRepository.listPictures(req.params.id);
      return res.status(200).json(pictures);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
};
