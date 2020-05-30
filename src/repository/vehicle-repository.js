const Vehicle = require('../models/Vehicle');
const { VehicleStatuses } = require('../enums/vehicle-statuses');

exports.list = async () => {
  return await Vehicle.find(
    { status: VehicleStatuses.AVAILABLE },
    '-pictures'
  ).populate('brand');
};

exports.changeStatusToSold = async id => {
  return await Vehicle.findByIdAndUpdate(id, {
    $set: {
      status: VehicleStatuses.SOLD,
    },
  });
};

exports.listPictures = async vehicleId => {
  const { pictures } = await Vehicle.findById(vehicleId);
  return pictures;
};

exports.create = async vehicle => {
  return await Vehicle.create(vehicle);
};

exports.savePicture = async (vehicleId, picture) => {
  const { pictures } = await Vehicle.findById(vehicleId);
  pictures.push(picture);
  return await Vehicle.findByIdAndUpdate(vehicleId, {
    $set: {
      pictures,
    },
  });
};

exports.deletePicture = async (vehicleId, pictureId) => {
  return await Vehicle.findByIdAndUpdate(vehicleId, {
    $pull: {
      pictures: { _id: pictureId },
    },
  });
};
