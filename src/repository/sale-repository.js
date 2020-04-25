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
