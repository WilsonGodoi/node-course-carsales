const Vehicle = require('../models/Vehicle');
const { VehicleStatusEnum } = require('../enums/vehicle-status-enum');

exports.list = async () => {
  return await Vehicle.find(
    { status: VehicleStatusEnum.AVAILABLE },
    '-__v -pictures'
  ).populate('brand', '-__v');
};

exports.changeStatusToSold = async _id => {
  return await Vehicle.findOneAndUpdate(
    { _id },
    {
      $set: {
        status: VehicleStatusEnum.SOLD,
      },
    }
  );
};

exports.listPictures = async vehicleId => {
  const { pictures } = await Vehicle.findOne({ _id: vehicleId });
  return pictures;
};

exports.create = async vehicle => {
  return await Vehicle.create(vehicle);
};

exports.savePicture = async (vehicleId, picture) => {
  const { pictures } = await Vehicle.findOne({ _id: vehicleId });
  pictures.push(picture);
  return await Vehicle.findOneAndUpdate(
    { _id: vehicleId },
    {
      $set: {
        pictures,
      },
    }
  );
};

exports.deletePicture = async (vehicleId, pictureId) => {
  return await Vehicle.findOneAndUpdate(
    { _id: vehicleId },
    {
      $pull: {
        pictures: { _id: pictureId },
      },
    }
  );
};
