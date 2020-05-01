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
  await vehicleRepository.changeStatusToVENDIDO(sale.vehicleId);
  return;
};

exports.list = async () => {
  const sales = await Sale.find({})
    .populate('seller', '-imageBase64')
    .populate('customer', '-image')
    .populate('vehicle', '-pictures');
  console.log(sales);
  return sales;
};
