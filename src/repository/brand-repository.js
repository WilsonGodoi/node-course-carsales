const Brand = require("../models/Brand");

exports.list = async () => {
  const brands = await Brand.find({}, "id brand active");
  // brands.map(user => (user.id = user._id));
  return brands;
};
