const Brand = require("../models/Brand");

exports.getByBrand = brand => {
  return Brand.findOne({ brand });
};

exports.list = async () => {
  const brands = await Brand.find({}, "brand active");
  brands.map(user => (user.id = user._id));
  return brands;
};

exports.create = data => {
  const { brand, active } = data;
  return Brand.create({
    brand,
    active
  });
};
