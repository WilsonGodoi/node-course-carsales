const vehicleRepository = require('../repository/vehicle-repository');

module.exports = {
  async create(req, res) {
    try {
      const vehicle = req.body;

      const newVehicle = await vehicleRepository.create(vehicle);
      return res.status(201).send(newVehicle);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  },

  async list(req, res) {
    try {
      const vehicles = await vehicleRepository.list();
      return res.status(200).send(vehicles);
    } catch (error) {
      return res.status(400).json('Não foi possível listar os veículos!');
    }
  },
};
