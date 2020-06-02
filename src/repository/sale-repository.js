const Sale = require('../models/Sale');
const vehicleRepository = require('../repository/vehicle-repository');
const { VehicleStatuses } = require('../enums/vehicle-statuses');

exports.create = async sale => {
  const session = await Sale.startSession();
  session.startTransaction();
  try {
    const { customerId, sellerId, vehicleId, value } = sale;

    const vehicle = await vehicleRepository.get(vehicleId);
    if (vehicle.status === VehicleStatuses.SOLD) {
      throw 'Veículo já foi vendido!';
    }
    await Sale.create({
      customer: customerId,
      seller: sellerId,
      vehicle: vehicleId,
      value,
      date: new Date(),
    });
    const newSale = await vehicleRepository.changeStatusToSold(sale.vehicleId);

    await session.commitTransaction();
    session.endSession();

    return newSale;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

exports.list = async () => {
  return await Sale.find({})
    .populate('seller', '-imageBase64 -password -roles -lastTimeLogin')
    .populate('customer', '-image')
    .populate('vehicle', '-pictures');
};
