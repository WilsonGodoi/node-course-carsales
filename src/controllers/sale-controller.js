const saleRepository = require('../repository/sale-repository');
const userRepository = require('../repository/user-repository');

module.exports = {
  async create(req, res) {
    try {
      const { customerId, vehicleId, value } = req.body;
      const { _id } = await userRepository.getCurrent(req);
      const sellerId = _id;
      const sale = { customerId, sellerId, vehicleId, value };

      const newSale = await saleRepository.create(sale);
      return res.status(201).send(newSale);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  },
};
