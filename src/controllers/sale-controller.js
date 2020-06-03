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
      return res.status(201).json(newSale);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async list(req, res) {
    try {
      const sales = await saleRepository.list();
      return res.status(200).json(sales);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
};
