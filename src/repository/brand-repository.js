const Brand = require('../models/Brand');

exports.getById = async id => {
  return await Brand.findOne({ _id: id });
};

exports.getByBrand = async brand => {
  return await Brand.findOne({ brand });
};

exports.list = async () => {
  const brands = await Brand.find({}, 'brand active');
  brands.map(user => (user.id = user._id));
  return brands;
};

exports.create = async data => {
  const { brand, active } = data;
  return await Brand.create({
    brand,
    active,
  });
};

exports.edit = async data => {
  await Brand.findByIdAndUpdate(
    { _id: data.id },
    {
      $set: {
        brand: data.brand,
        active: data.active,
      },
    }
  );
  return await this.getById(data.id);
};

exports.delete = async brand => {
  return await Brand.deleteOne(brand);
};
