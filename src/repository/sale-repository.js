const Sale = require('../models/Sale');

exports.create = async sale => {
  const { customer, seller, vehicle, value } = sale;
  return await Sale.create({
    customer,
    seller,
    vehicle,
    value,
    date: new Date(),
  });
};
