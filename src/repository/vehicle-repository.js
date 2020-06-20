const Vehicle = require('../models/Vehicle');
const { VehicleStatuses } = require('../enums/vehicle-statuses');

exports.list = async () => {
  return await Vehicle.find(
    { status: VehicleStatuses.AVAILABLE },
    '-pictures'
  ).populate('brand');
};

exports.get = async id => {
  return await Vehicle.findById(id);
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

exports.update = async (_id, vehicle) => {
  const {
    brand,
    model,
    modelYear,
    manufactureYear,
    color,
    mileage,
    onlyOwner,
    price,
  } = vehicle;
  await Vehicle.findByIdAndUpdate(_id, {
    $set: {
      brand,
      model,
      modelYear,
      manufactureYear,
      color,
      mileage,
      onlyOwner,
      price,
    },
  });
  return this.get(_id);
};

exports.delete = async _id => {
  return await Vehicle.findByIdAndDelete(_id);
};

exports.savePicture = async (vehicleId, picture) => {
  const { pictures } = await Vehicle.findById(vehicleId);
  if (pictures.length > 2) {
    throw new Error('Limite excedido, máximo de 3 imagens!');
  }
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
