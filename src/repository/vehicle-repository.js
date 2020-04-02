const Vehicle = require('../models/Vehicle');

exports.list = async () => {
  return await Vehicle.find({}, '-_id -__v');
};

exports.create = async vehicle => {
  return await Vehicle.create(vehicle);
};
