const Brand = require('../models/Brand');

exports.getById = async id => {
  return await Brand.findOne({ id: id });
};

exports.getByName = async name => {
  return await Brand.findOne({ name });
};

exports.list = async () => {
  return await Brand.find({});
};

exports.create = async data => {
  const { name, active } = data;
  return await Brand.create({
    name,
    active,
  });
};

exports.edit = async data => {
  await Brand.findOneAndUpdate(
    { id: data.id },
    {
      $set: {
        name: data.name,
        active: data.active,
      },
    }
  );
  return await this.getById(data.id);
};

exports.delete = async brand => {
  return await Brand.deleteOne(brand);
};
