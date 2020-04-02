const Vehicle = require('../models/Vehicle');

exports.list = async () => {
  return await Vehicle.find({});
};

exports.create = async vehicle => {
  return await Vehicle.create(vehicle);
};
