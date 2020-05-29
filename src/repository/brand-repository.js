const Brand = require('../models/Brand');

exports.getById = async id => {
  return await Brand.findById(id);
};

exports.getByName = async name => {
  return await Brand.findOne({ name });
};

exports.list = async () => {
  return await Brand.find({});
};

exports.create = async data => {
  const { name } = data;
  return await Brand.create({
    name,
  });
};

exports.edit = async data => {
  const { id, name } = data;
  await Brand.findByIdAndUpdate(id, {
    $set: {
      name,
    },
  });
  return this.getById(id);
};
