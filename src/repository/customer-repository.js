const Customer = require('../models/Customer');

exports.getByEmail = async email => {
  return await Customer.findOne({ email });
};

exports.list = async () => {
  return await Customer.find({});
};

exports.create = async customer => {
  const { name, email, telephone } = customer;
  return await Customer.create({
    name,
    email,
    telephone,
  });
};
