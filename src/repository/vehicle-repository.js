const Vehicle = require('../models/Vehicle');

exports.list = async () => {
  return await Vehicle.find({}, '-_id -__v -pictures');
};

exports.listPictures = async vehicleId => {
  const { pictures } = await Vehicle.findOne({ id: vehicleId });
  return pictures;
};

exports.create = async vehicle => {
  return await Vehicle.create(vehicle);
};

exports.savePicture = async (vehicleId, picture) => {
  const vehicle = await Vehicle.findOne({ id: vehicleId });
  let { pictures } = vehicle;
  pictures.push(picture);
  return await Vehicle.findOneAndUpdate(
    { id: vehicleId },
    {
      $set: {
        pictures,
      },
    }
  );
};

exports.deletePicture = async (vehicleId, pictureId) => {
  return await Vehicle.findOneAndUpdate(
    { id: vehicleId },
    {
      $pull: {
        pictures: { _id: pictureId },
      },
    }
  );
};
