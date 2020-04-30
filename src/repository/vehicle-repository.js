const Vehicle = require('../models/Vehicle');

exports.list = async () => {
  return await Vehicle.find({ status: 'DISPONIVEL' }, '-__v -pictures');
};

exports.changeStatusToVENDIDO = async _id => {
  return await Vehicle.findOneAndUpdate(
    { _id },
    {
      $set: {
        status: 'VENDIDO',
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
