const Sale = require('../models/Sale');
const vehicleRepository = require('../repository/vehicle-repository');

exports.create = async sale => {
  await vehicleRepository.changeStatusToVENDIDO(sale.vehicleId);
  const { customerId, sellerId, vehicleId, value } = sale;
  return await Sale.create({
    customer: customerId,
    seller: sellerId,
    vehicle: vehicleId,
    value,
    date: new Date(),
  });
};

exports.list = async () => {
  const sales = await Sale.find({})
    .populate('seller', '-image')
    .populate('customer', '-image')
    .populate('vehicle', '-pictures');
  console.log(sales);
  return sales;
};
