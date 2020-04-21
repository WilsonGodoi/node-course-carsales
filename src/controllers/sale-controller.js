const saleRepository = require('../repository/sale-repository');
const userRepository = require('../repository/user-repository');

module.exports = {
  async create(req, res) {
    try {
      const { customer, vehicle, value } = req.body;
      const { _id, login } = await userRepository.getCurrent(req);
      const seller = { _id, login };
      vehicle._id = vehicle.id;
      vehicle.id = undefined;
      const sale = { customer, seller, vehicle, value };

      // const saleSearch = await saleRepository.getByVehicleId(login);
      // if (saleSearch) {
      //   return res.status(400).json('Veículo já vendido!');
      // }
      //console.log(sale);
      const newSale = await saleRepository.create(sale);
      return res.status(201).send(newSale);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  },
};
