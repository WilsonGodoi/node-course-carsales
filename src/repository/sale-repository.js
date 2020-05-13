const Sale = require('../models/Sale');
const vehicleRepository = require('../repository/vehicle-repository');

exports.create = async sale => {
  const { customerId, sellerId, vehicleId, value } = sale;
  await Sale.create({
    customer: customerId,
    seller: sellerId,
    vehicle: vehicleId,
    value,
    date: new Date(),
  });
  await vehicleRepository.changeStatusToSold(sale.vehicleId);
  return;
};

exports.list = async () => {
  return await Sale.find({})
    .populate('seller', '-imageBase64')
    .populate('customer', '-image')
    .populate('vehicle', '-pictures');
};
